<template>
  <div>
    <span
      class="pointer"
      v-for="(v,index) in $store.state.vocabularyNames"
      :key="index"
      @click="changeVocabulary(index,v)"
    >| {{v}} |</span>
    <VersionsContainer
      ref="VocabularyComponent"
      v-if="vocabularyList && versions"
      :enabledDataList="enabledMetricNames"
      :maxMetricValue="maxMetricValueComputed"
      :vocabularyName="vocabularyName"
      :versions="versions"
      @prevVoc="prevVocabulary"
      @nextVoc="nextVocabulary"
    />
  </div>
</template>

<script>
import VersionsContainer from "./VersionsContainer";
export default {
  name: "RawMeticsComponent",
  components: {
    VersionsContainer
  },
  data() {
    return {
      versionID: 0,
      vocabularyName: ""
    };
  },
  props: {
    vocabularyList: {},
    enabledMetricNames: {},
    checkboxEqualizeY: {},
    maxMetricValue: {},
    maxVocabularyLocalMetricValue: {}
  },
  computed: {
    versions() {
      return this.vocabularyList[this.vocabularyName] ? this.vocabularyList[this.vocabularyName].versions : null
    }, 
    maxMetricValueComputed() {
      return this.checkboxEqualizeY
        ? this.maxMetricValue
        : this.maxVocabularyLocalMetricValue[this.vocabularyName];
    }
  },
  mounted() {
    this.vocabularyName = this.$store.state.vocabularyNames[0];
  },
  methods: {
    changeVocabulary(index, v) {
      this.$refs.VocabularyComponent.changeVersionID(0);
      this.versionID = index;
      this.vocabularyName = v;
    },
    nextVocabulary() {
      if (!this.$store.state.vocabularyNames[this.versionID + 1]) return;
      this.versionID += 1;
      this.vocabularyName = this.$store.state.vocabularyNames[this.versionID];
    },
    prevVocabulary() {
      if (!this.$store.state.vocabularyNames[this.versionID - 1]) return;
      this.versionID -= 1;
      this.vocabularyName = this.$store.state.vocabularyNames[this.versionID];
    }
  }
};
</script>