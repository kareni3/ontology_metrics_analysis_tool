<template>
  <div>
    <span
      class="pointer"
      v-for="(v,index) in $store.state.vocabularyNames"
      :key="index"
      @click="changeversion_id(index,v)"
    >| {{v}} |</span>
    <div class="title-2">
      <button class="btn__nav" @click="prevVoc">&lt;</button>
      <span class="nav__title">{{vocabularyName}}</span>
      <button class="btn__nav" @click="nextVoc">&gt;</button>
    </div>
    <span>
      <input type="checkbox" v-model="checkboxderivativeFunction" /> derivative functions
    </span>
    <div>
      <div v-for="(data,index) in preparedData" :key="vocabularyName+index">
        <Chart
          :type="LINE"
          v-if="index < $store.state.graphCount"
          :includeAverageNumbers="true"
          :derivativeFunction="checkboxderivativeFunction"
          :data="data[1]"
          :name="data[0]"
        ></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/chartsVUE/NameChart";
import CHART_TYPE from "@/components/common/chartsMixins/mixins/CHART_TYPE";

export default {
  name: "Chart5",
  data() {
    return {
      checkboxderivativeFunction: false,
      vocabularyName: "",
    };
  },
  components: {
    Chart
  },
  mixins: [CHART_TYPE],
  computed: {
    preparedData() {
      if (!this.vocabularyName) return [];
      const metrics = this.vocabularyList[this.vocabularyName].metrics;
      return metrics
        ? Object.entries(metrics).filter(el => this.enabledVocabularyMetricNames.includes(el[0]))
        : [];
    }
  },
  methods: {
    nextVoc() {
      let ind = this.$store.state.vocabularyNames.indexOf(this.vocabularyName) + 1;
      if (!this.$store.state.vocabularyNames[ind]) return;
      this.vocabularyName = this.$store.state.vocabularyNames[ind];
    },
    prevVoc() {
      let ind = this.$store.state.vocabularyNames.indexOf(this.vocabularyName) - 1;
      if (!this.$store.state.vocabularyNames[ind]) return;
      this.vocabularyName = this.$store.state.vocabularyNames[ind];
    },
    changeversion_id(index, v) {
      this.vocabularyName = v;
    },
  },
  props: ["vocabularyList", "enabledVocabularyMetricNames"],
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.vocabularyName = this.$store.state.vocabularies[0].name;
  }
};
</script>