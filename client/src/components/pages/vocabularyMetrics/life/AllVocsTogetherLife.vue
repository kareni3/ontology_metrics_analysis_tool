<template>
  <div>
    <div>
      <span class="scoped-1 mb-12">
        <input type="checkbox" v-model="checkboxderivativeFunction" /> derivative functions
      </span>
      <div v-for="(data, ind) in preparedData" :key="data[0]">
        <allVocabularies
          v-if="ind < $store.state.graphCount"
          :data="data[1]"
          :name="data[0]"
          :derivativeFunction="checkboxderivativeFunction"
          :disabledAverages="disabledAverages"
          :disabledMedians="disabledMedians"
          @changeDisabled="onChangeDisabled"
          @changeDisabledMedians="onChangeDisabledMedians"
        />
      </div>
    </div>
  </div>
</template>

<script>
import allVocabularies from "./allVocabularies.vue";

export default {
  name: "AllVocsTogether",
  components: {
    allVocabularies
  },
  data() {
    return {
      allVocabularies: {},
      checkboxderivativeFunction: false,
      disabledAverages: {},
      disabledMedians: {},
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
    this.setAllVocabularies();
  },
  methods: {
    onChangeDisabled(disabled) {
      this.disabledAverages = disabled;
    },
    onChangeDisabledMedians(disabled) {
      this.disabledMedians = disabled;
    },
    setAllVocabularies() {
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
              x: metric[1].X.length === 1 ? 0 : i / (metric[1].X.length - 1),
              y: metric[1].Y[i],
              weight: metric[1].weights[i],
            });
            if (metric[1].X.length === 1) {
              this.allVocabularies[metric[0]][voc[0]].arr.push({
                x: metric[1].X.length === 1 ? 1 : i / (metric[1].X.length - 1),
                y: metric[1].Y[i],
                weight: metric[1].weights[i],
              });
            }
            if (
              +metric[1].Y[i] <
              this.allVocabularies[metric[0]][voc[0]].borders.min
            )
              this.allVocabularies[metric[0]][voc[0]].borders.min = +metric[1]
                .Y[i];
            if (
              +metric[1].Y[i] >
              this.allVocabularies[metric[0]][voc[0]].borders.max
            )
              this.allVocabularies[metric[0]][voc[0]].borders.max = +metric[1]
                .Y[i];
          });
        });
      });
    }
  }
};
</script>

<style scoped>
.scoped-1 {
  text-align: center;
  display: inline-block;
  width: 380px !important;
  min-width: 300px;
}
</style>
