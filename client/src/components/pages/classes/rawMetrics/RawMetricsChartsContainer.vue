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
      v-if="vocabularyList"
      :enabledDataList="enabledMetricNames"
      :maxMetricValue="maxMetricValueComputed"
      :vocabularyName="vocabularyName"
      :versions="vocabularyList[vocabularyName].versions"
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