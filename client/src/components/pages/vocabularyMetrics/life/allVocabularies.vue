<template>
  <div class="chart chart_metrics__container">
    <ChartMetrics
      class="chart_metrics"
      ref="ChartMetricsRight"
      v-if="includeAverageNumbers && $store.state.averageMetrics"
      :metrics="chartMetrics"
      :disabledMetrics="disabledAverages"
      :sigmaMult="sigmaMult"
      name="Average of All Vocabularies"
      @changeDisabled="onChangeDisabled"
      @isClosed="onIsRightClosed"
    />
    <ChartMetrics
      class="chart_metrics chart_metrics__left"
      :class="isRightClosed && 'chart_metrics__left--r'"
      v-if="includeAverageNumbers && $store.state.averageMetrics"
      :metrics="chartMetricsMedians"
      :disabledMetrics="disabledMedians"
      :sigmaMult="sigmaMult"
      name="Medians of All Vocabularies"
      @changeDisabled="onChangeDisabledMedians"
    />
    <Scatter :data="preparedData" :scaleLabels="{x: 'vocabulary life', y: name}" :name="name" />
    <div
      class="text_right"
    >Number of Vocabularies with value equal to 0: {{zeroVocabularies[0]}} ({{zeroVocabularies[1]}}%), count of Versions: {{zeroVersions[0]}} ({{zeroVersions[1]}}%)</div>
    <div class="text_right">Number of Vocabularies with a value that has not changed: {{unchangedVocabularies[0]}} ({{unchangedVocabularies[1]}}%)</div>
  </div>
</template>

<script>
import ChartMetrics from "@/components/common/chartsComponents/ChartMetrics";
import Scatter from "@/components/chartsVUE/Scatter";
import indexes from "./mixins/indexes";

export default {
  name: "AllVocabularies",
  components: {
    ChartMetrics,
    Scatter,
  },
  mixins: [indexes],
  data() {
    return {
      preparedData: {},
      isRightClosed: false,
    };
  },
  props: {
    data: {},
    name: {},
    includeAverageNumbers: {
      default: true,
    },
    derivativeFunction: {
      default: false,
    },
    disabledMedians: {},
    disabledAverages: {},
  },
  watch: {
    data() {
      this.prepareData();
    },
    derivativeFunction() {
      this.prepareData();
    },
  },
  computed: {
    zeroVocabularies() {
      let count = 0;
      let g_count = 0
      Object.values(this.data).forEach((voc) => {
        g_count++
        let zero = true;
        voc.arr.forEach((point) => {
          if (+point.y !== 0) {
            zero = false;
          }
        });
        if (zero) {
          count++;
        }
      });
      return [count, (count/g_count * 100).toFixed()];
    },
    zeroVersions() {
      let count = 0;
      let g_count = 0
      Object.values(this.data).forEach((voc) => {
        voc.arr.forEach((point) => {
          g_count++
          if (+point.y === 0) {
            count++;
          }
        });
      });
      return [count, (count/g_count * 100).toFixed()];
    },
    unchangedVocabularies() {
      let count = 0;
      let g_count = 0
      Object.values(this.data).forEach((voc) => {
        g_count++
        let zero = true;
        let firstVersionY = +voc.arr[0].y
        voc.arr.forEach((point) => {
          if (+point.y !== firstVersionY) {
            zero = false;
          }
        });
        if (zero) {
          count++;
        }
      });
      return [count, (count/g_count * 100).toFixed()];
    },
  },
  mounted() {
    this.prepareData();
  },
  methods: {
    onIsRightClosed(v) {
      this.isRightClosed = v;
    },
    onChangeDisabled(disabled) {
      this.$emit("changeDisabled", disabled);
    },
    onChangeDisabledMedians(disabled) {
      this.$emit("changeDisabledMedians", disabled);
    },
    updateOptions() {
      this.options = {
        maintainAspectRatio: false,
        legend: {
          display: this.$store.state.legend,
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
            },
          ],
        },
      };
    },
    prepareData() {
      this.preparedData = {};
      Object.entries(this.data).forEach((voc) => {
        this.preparedData[voc[0]] = voc[1].arr.map((el, ind) => {
          let elY = 0;
          if (this.derivativeFunction) {
            elY = ind !== 0 ? +voc[1].arr[ind].y - voc[1].arr[ind - 1].y : 0;
            elY = elY >= 0 ? Math.log(elY + 1) : -Math.log(1 - elY);
          } else {
            elY =
              voc[1].borders.max === voc[1].borders.min
                ? voc[1].borders.max === 0
                  ? 0
                  : 0.5
                : (+el.y - voc[1].borders.min) /
                  (voc[1].borders.max - voc[1].borders.min);
          }
          return {
            y: elY,
            x: el.x,
          };
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.chart_metrics {
  position: absolute;
  top: 40px;
  right: 12px;
  z-index: 1;
  width: 400px;
  &__container {
    position: relative;
    margin-bottom: 42px;
  }
  &__left {
    right: 440px;
    &--r {
      right: 48px;
    }
  }
}
.text_right {
  text-align: end;
  padding-left: 62px;
  color: gray;
}
</style>
