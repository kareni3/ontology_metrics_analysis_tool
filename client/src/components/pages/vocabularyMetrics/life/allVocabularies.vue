<template>
  <div class="chart chart_metrics__container">
    <ChartMetrics
      class="chart_metrics"
      ref="ChartMetricsRight"
      v-if="includeAverageNumbers && $store.state.averageMetrics"
      :metrics="chartMetrics"
      :disabledMetrics="disabledAverages"
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
      name="Medians of All Vocabularies"
      @changeDisabled="onChangeDisabledMedians"
    />
    <Scatter :data="preparedData" :name="name" />
  </div>
</template>

<script>
import ChartMetrics from "@/components/common/chartsComponents/ChartMetrics";
import Scatter from "@/components/chartsVUE/Scatter";

export default {
  name: "AllVocabularies",
  components: {
    ChartMetrics,
    Scatter
  },
  data() {
    return {
      preparedData: {},
      isRightClosed: false
    };
  },
  props: {
    data: {},
    name: {},
    includeAverageNumbers: {
      default: true
    },
    derivativeFunction: {
      default: false
    },
    disabledMedians: {},
    disabledAverages: {}
  },
  computed: {
    chartMetrics() {
      return [
        {
          name: "Mean",
          value: this.avgMean
        },
        {
          name: "Weighted Mean",
          value: this.avgWeightedMean
        },
        {
          name: "Median",
          value: this.avgMedian
        },
        {
          name: "Max Value",
          value: this.avgMaxValue
        },
        {
          name: "Min Value",
          value: this.avgMinValue
        },
        {
          name: "Absolute Change",
          value: this.avgAbsoluteChange,
          toShowTrend: true
        },
        {
          name: "Absolute Weighted Change",
          value: this.avgAbsoluteWeightedChange,
          toShowTrend: true
        },
        {
          name: "Absolute Change per Version",
          value: this.avgAbsoluteChangePerVersion,
          toShowTrend: true
        },
        {
          name: "Abs-te W-ted Change per Version",
          value: this.avgAbsoluteWeightedChangePerVersion,
          toShowTrend: true
        },
        {
          name: "Relative Change",
          value: this.avgRelativeChange,
          isPercentage: true,
          toShowTrend: true
        },
        {
          name: "Relative Weighted Change",
          value: this.avgRelativeWeightedChange,
          isPercentage: true,
          toShowTrend: true
        },
        {
          name: "Relative Change Per Version",
          value: this.avgRelativeChangePerVersion,
          isPercentage: true,
          toShowTrend: true
        },
        {
          name: "Rel. W-ted Change Per Version",
          value: this.avgRelativeWeightedChangePerVersion,
          isPercentage: true,
          toShowTrend: true
        }
      ];
    },
    chartMetricsMedians() {
      return [
        {
          name: "Mean",
          value: this.medMean
        },
        {
          name: "Weighted Mean",
          value: this.medWeightedMean
        },
        {
          name: "Median",
          value: this.medMedian
        },
        {
          name: "Max Value",
          value: this.medMaxValue
        },
        {
          name: "Min Value",
          value: this.medMinValue
        },
        {
          name: "Absolute Change",
          value: this.medAbsoluteChange,
          toShowTrend: true
        },
        {
          name: "Absolute Weighted Change",
          value: this.medAbsoluteWeightedChange,
          toShowTrend: true
        },
        {
          name: "Absolute Change per Version",
          value: this.medAbsoluteChangePerVersion,
          toShowTrend: true
        },
        {
          name: "Abs-te W-ted Change per Version",
          value: this.medAbsoluteWeightedChangePerVersion,
          toShowTrend: true
        },
        {
          name: "Relative Change",
          value: this.medRelativeChange,
          isPercentage: true,
          toShowTrend: true
        },
        {
          name: "Relative Weighted Change",
          value: this.medRelativeWeightedChange,
          isPercentage: true,
          toShowTrend: true
        },
        {
          name: "Relative Change Per Version",
          value: this.medRelativeChangePerVersion,
          isPercentage: true,
          toShowTrend: true
        },
        {
          name: "Rel. W-ted Change Per Version",
          value: this.medRelativeWeightedChangePerVersion,
          isPercentage: true,
          toShowTrend: true
        }
      ];
    },
    avgMean() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += (cur.borders.max + cur.borders.min) / 2;
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    medMean() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push((cur.borders.max + cur.borders.min) / 2);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgWeightedMean() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          const val = cur.arr.reduce(
            (c_acc, c_cur) => {
              c_acc[0] += +c_cur.y * +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            acc += val[0] / val[1];
          }
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    medWeightedMean() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur) => {
            c_acc[0] += +c_cur.y * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgMedian() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          const arr = cur.arr.map(c_cur => c_cur.y);
          const arrSort = arr.sort();
          const len = arrSort.length;
          const mid = Math.ceil(len / 2);
          acc +=
            len % 2 == 0 && len > 1
              ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
              : +arrSort[mid - 1];
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    medMedian() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const arr = cur.arr.map(c_cur => c_cur.y);
        const arrSort = arr.sort();
        const len = arrSort.length;
        const mid = Math.ceil(len / 2);
        acc.push(
          len % 2 == 0 && len > 1
            ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
            : +arrSort[mid - 1]
        );
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgMaxValue() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += cur.borders.max;
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    medMaxValue() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(cur.borders.max);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgMinValue() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += cur.borders.min;
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    medMinValue() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(cur.borders.min);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgAbsoluteChange() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          if (cur.arr.length > 1) counter++;
          acc += +cur.arr[cur.arr.length - 1].y - +cur.arr[0].y;
          return acc;
        }, 0) / counter
      );
    },
    medAbsoluteChange() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(+cur.arr[cur.arr.length - 1].y - +cur.arr[0].y);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgAbsoluteWeightedChange() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          if (cur.arr.length > 1) counter++;
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0) return c_acc;
              c_acc[0] += (+c_cur.y - +cur.arr[i - 1].y) * +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            acc += val[0] / val[1];
          }
          return acc;
        }, 0) / counter
      );
    },
    medAbsoluteWeightedChange() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] += (+c_cur.y - +cur.arr[i - 1].y) * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgAbsoluteChangePerVersion() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          if (cur.arr.length > 1) counter++;
          acc +=
            (+cur.arr[cur.arr.length - 1].y - +cur.arr[0].y) /
            (cur.arr.length - 1);
          return acc;
        }, 0) / counter
      );
    },
    medAbsoluteChangePerVersion() {
      const arr =  Object.values(this.data).reduce((acc, cur) => {
          acc.push(
            (+cur.arr[cur.arr.length - 1].y - +cur.arr[0].y) /
            (cur.arr.length - 1));
          return acc;
        }, []) 
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgAbsoluteWeightedChangePerVersion() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          if (cur.arr.length > 1) counter++;
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0) return c_acc;
              c_acc[0] +=
                ((+c_cur.y - +cur.arr[i - 1].y) / (cur.arr.length - 1)) *
                +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            acc += val[0] / val[1];
          }
          return acc;
        }, 0) / counter
      );
    },
    medAbsoluteWeightedChangePerVersion() {
      const arr =  Object.values(this.data).reduce((acc, cur) => {
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0) return c_acc;
              c_acc[0] +=
                ((+c_cur.y - +cur.arr[i - 1].y) / (cur.arr.length - 1)) *
                +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            acc.push(val[0] / val[1]);
          }
          return acc;
        }, []) 
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgRelativeChange() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          let i = 0;
          let n = 0;
          while (!n) {
            try {
              n = +cur.arr[i++].y;
            } catch {
              break;
            }
          }
          if (n) {
            counter++;
            acc += ((+cur.arr[cur.arr.length - 1].y - n) / Math.abs(n)) * 100;
          }
          return acc;
        }, 0) / counter
      );
    },
    medRelativeChange() {
      const arr =  Object.values(this.data).reduce((acc, cur) => {
          let i = 0;
          let n = 0;
          while (!n) {
            try {
              n = +cur.arr[i++].y;
            } catch {
              break;
            }
          }
          if (n) {
            acc.push(((+cur.arr[cur.arr.length - 1].y - n) / Math.abs(n)) * 100);
          }
          return acc;
        }, []) 
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgRelativeWeightedChange() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
              c_acc[0] +=
                ((+c_cur.y - +cur.arr[i - 1].y) / Math.abs(+cur.arr[i - 1].y)) *
                100 *
                +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            counter++;
            acc += val[0] / val[1];
          }
          return acc;
        }, 0) / counter
      );
    },
    medRelativeWeightedChange() {
      const arr =  Object.values(this.data).reduce((acc, cur) => {
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
              c_acc[0] +=
                ((+c_cur.y - +cur.arr[i - 1].y) / Math.abs(+cur.arr[i - 1].y)) *
                100 *
                +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            acc.push(val[0] / val[1]);
          }
          return acc;
        }, []) 
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgRelativeChangePerVersion() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          let i = 0;
          let n = 0;
          while (!n) {
            try {
              n = +cur.arr[i++].y;
            } catch {
              break;
            }
          }
          if (n) {
            counter++;
            acc +=
              ((+cur.arr[cur.arr.length - 1].y - n) /
                Math.abs(n) /
                (cur.arr.length - 1)) *
              100;
          }
          return acc;
        }, 0) / counter
      );
    },
    medRelativeChangePerVersion() {
      const arr =  Object.values(this.data).reduce((acc, cur) => {
          let i = 0;
          let n = 0;
          while (!n) {
            try {
              n = +cur.arr[i++].y;
            } catch {
              break;
            }
          }
          if (n) {
            acc.push(
              ((+cur.arr[cur.arr.length - 1].y - n) /
                Math.abs(n) /
                (cur.arr.length - 1)) *
              100);
          }
          return acc;
        }, []) 
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    avgRelativeWeightedChangePerVersion() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
              c_acc[0] +=
                ((+c_cur.y - +cur.arr[i - 1].y) /
                  Math.abs(+cur.arr[i - 1].y) /
                  (cur.arr.length - 1)) *
                100 *
                +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            counter++;
            acc += val[0] / val[1];
          }
          return acc;
        }, 0) / counter
      );
    },
    medRelativeWeightedChangePerVersion() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
          const val = cur.arr.reduce(
            (c_acc, c_cur, i) => {
              if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
              c_acc[0] +=
                ((+c_cur.y - +cur.arr[i - 1].y) /
                  Math.abs(+cur.arr[i - 1].y) /
                  (cur.arr.length - 1)) *
                100 *
                +c_cur.weight;
              c_acc[1] += +c_cur.weight;
              return c_acc;
            },
            [0, 0]
          );
          if (val[1]) {
            acc.push(val[0] / val[1]);
          }
          return acc;
        }, []) 
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    }
  },
  watch: {
    data() {
      this.prepareData();
    },
    derivativeFunction() {
      this.prepareData();
    }
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
          display: this.$store.state.legend
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom"
            }
          ]
        }
      };
    },
    prepareData() {
      this.preparedData = {};
      Object.entries(this.data).forEach(voc => {
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
            x: el.x
          };
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.chart_metrics {
  position: absolute;
  top: 40px;
  right: 12px;
  z-index: 1;
  width: 350px;
  &__container {
    position: relative;
  }
  &__left {
    right: 392px;
    &--r {
      right: 48px;
    }
  }
}
</style>
