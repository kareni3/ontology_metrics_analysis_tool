<template>
  <div class="chart chart_metrics__container">
    <ChartMetrics
      class="chart_metrics"
      v-if="includeAverageNumbers && $store.state.averageMetrics"
      :metrics="chartMetrics"
    />
    <Scatter :data="preparedData" :name="name" />
  </div>
</template>

<script>
import ChartMetrics from "@/components/common/chartsComponents/ChartMetrics";
import Scatter from "@/components/chartsVUE/Scatter";

export default { 
  name: "AllVocabularies",
  data() {
    return {
      preparedData: {}
    };
  },
  components: {
    ChartMetrics,
    Scatter
  },
  computed: {
    chartMetrics() {
      return [
        {
          name: "Average Value",
          value: this.averageValue
        },
        {
          name: "Average MaxValue",
          value: this.averageMaxValue
        },
        {
          name: "Average MinValue",
          value: this.averageMinValue
        },
        {
          name: "Average Change",
          value: this.averagePercentageChange,
          isPercentage: true,
          toShowTrend: true,
          hint:
            "Average Change does not take into account vocabularies that started from ZERO"
        },
        {
          name: "Average Change2.0",
          value: this.averagePercentageChange2,
          isPercentage: true,
          toShowTrend: true,
          hint:
            "Average Change2.0 calculates percentage change from average value"
        },
        {
          name: "Absolute Avg Change",
          value: this.averageChange,
          toShowTrend: true
        }
      ];
    },
    averageValue() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += (cur.borders.max + cur.borders.min) / 2;
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    averageMaxValue() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += cur.borders.max;
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    averageMinValue() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += cur.borders.min;
          return acc;
        }, 0) / Object.values(this.data).length
      );
    },
    averagePercentageChange() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          const n = +cur.arr[0].y;
          if (n) counter++;
          acc += n ? ((+cur.arr[cur.arr.length - 1].y - n) / n) * 100 : 0;
          return acc;
        }, 0) / counter
      );
    },
    averagePercentageChange2() {
      let counter = 0;
      return (
        Object.values(this.data).reduce((acc, cur) => {
          const n = (cur.borders.max + cur.borders.min) / 2;
          counter++; // if (n) TODO: add checkbox to remove vocabulaies without changes
          acc += n ? ((+cur.arr[cur.arr.length - 1].y - n) / n) * 100 : 0;
          return acc;
        }, 0) / counter
      );
    },
    averageChange() {
      return (
        Object.values(this.data).reduce((acc, cur) => {
          acc += +cur.arr[cur.arr.length - 1].y - +cur.arr[0].y;
          return acc;
        }, 0) / Object.values(this.data).length
      );
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
  props: {
    data: {},
    name: {},
    includeAverageNumbers: {
      default: true
    },
    derivativeFunction: {
      default: false
    }
  },
  mounted() {
    this.prepareData();
  },
  methods: {
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
  top: 24px;
  right: 12px;
  z-index: 1;
  &__container {
    position: relative;
  }
}
</style>
