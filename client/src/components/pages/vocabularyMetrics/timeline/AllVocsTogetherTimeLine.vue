<template>
  <div>
    <div class="mb-12">
      <input type="checkbox" v-model="checkboxderivativeFunction" /> derivative functions
    </div>
    <div class="mb-12">
      <input type="checkbox" v-model="log" /> Logarithmic data
    </div>
    <div>
      <div v-for="(data, ind) in preparedData" :key="data[0]">
        <allVocabularies
          v-if="ind < $store.state.graphCount"
          :data="data[1]"
          :log="log"
          :name="data[0]"
          :derivativeFunction="checkboxderivativeFunction"
        />
      </div>
    </div>
  </div>
</template>

<script>
import allVocabularies from "./allVocabularies.vue";

export default {
  name: "VocabularyMetricsContainer",
  components: {
    allVocabularies
  },
  data() {
    return {
      log: false,
      allVocabularies: {},
      checkboxderivativeFunction: false,
    };
  },
  props: {
    enabledVocabularyMetricNames: {},
    enabledVocabularyNames: {},
    vocabularyList: {}
  },
  computed: {
    preparedData() {
      let arr = [];
      arr = Object.entries(this.newAllVocabularies).filter(el => {
        return this.enabledVocabularyMetricNames.includes(el[0]);
      });
      return arr;
    },
    newAllVocabularies() {
      let newobj = {};
      Object.entries(this.allVocabularies).forEach(el => {
        newobj[el[0]] = {};
        Object.entries(el[1]).forEach(e => {
          if (this.enabledVocabularyNames.includes(e[0]))
            newobj[el[0]][e[0]] = e[1];
        });
      });
      return newobj;
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.allVocabularies = {};
    Object.keys(
      this.vocabularyList[Object.keys(this.vocabularyList)[0]].metrics
    ).forEach(metric1 => {
      this.allVocabularies[metric1] = {};
    });
    Object.keys(this.vocabularyList).forEach(metric => {
      Object.keys(this.allVocabularies).forEach(metric1 => {
        this.allVocabularies[metric1][metric] = {
          arr: [],
          borders: { min: Infinity, max: -Infinity }
        };
      });
    });

    Object.entries(this.vocabularyList).forEach(voc => {
      Object.entries(voc[1].metrics).forEach(metric => {
        Object.values(metric[1].X).forEach((el, i) => {
          this.allVocabularies[metric[0]][voc[0]].arr.push({
            x: new Date(metric[1].X[i]).getTime(),
            y: metric[1].Y[i]
          });
        });
      });
    });
  }
};
</script>
