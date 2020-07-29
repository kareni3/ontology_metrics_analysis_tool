<template>
  <div class="chart chart_metrics__container">
    <ChartMetrics
      class="chart_metrics"
      v-if="includeAverageNumbers && $store.state.averageMetrics"
      :metrics="chatMetrics"
    />
    <div v-if="type===BAR">
      <span class="title-2">{{name}}</span>
      <Bar 
        v-if="datacollection" 
        :chart-data="datacollection" 
        :styles="myStyles" 
        :options="options"
      ></Bar>
    </div>
    <div v-else-if="type===LINE">
      <span class="title-2">{{name}}</span>
      <Linee
        v-if="datacollection"
        :chart-data="datacollection"
        :styles="myStyles"
        :options="options"
      ></Linee>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/chartsJS/Bar.js";
import Linee from "@/components/chartsJS/Line.js";
import ChartMetrics from "@/components/common/chartsComponents/ChartMetrics";
import CHART_TYPE_CONSTANTS from "@/components/common/chartsMixins/mixins/CHART_TYPE"
import { CHART_TYPE } from "@/CONSTANTS"

export default {
  name: "NameChart",
  data() {
    return {
      options: undefined
    };
  },
  components: {
    Bar,
    Linee,
    ChartMetrics,
  },
  mixins: [CHART_TYPE_CONSTANTS],
  props: {
    data: {
      default() {
        return {
          X: [],
          Y: []
        };
      }
    },
    scaleLabels: {
      default: () => {
        return {
          x: "x-axes",
          y: "y-axes",
        };
      },
    },
    name: {
      default: "metric"
    },
    type: {
      default() {
        return CHART_TYPE.BAR;
      } 
    },
    derivativeFunction: {
      default: false
    },
    includeAverageNumbers: {
      default: false
    },
    maxMetricValue: {
      default: function() {
        return { metric: 1 };
      }
    },
    height: {
      default: 500
    },
  },
  watch: {
    maxMetricValue() {
      this.updateOptions();
    }
  },
  computed: {
    preparedX() {
      return this.data.X.filter(
        (x, i) => this.data.Y[i] !== null
      );
    },
    preparedY() {
      const arr = this.data.Y.filter(
        (as, i) => this.data.Y[i] !== null
      );
      return this.derivativeFunction
        ? arr.map((as, i) =>
            i !== 0
              ? this.data.Y[i] - this.data.Y[i - 1]
              : 0
          )
        : arr;
    },
    datacollection() {
      return {
        labels: this.preparedX,
        datasets: [
          {
            label: this.name,
            data: this.preparedY,
            backgroundColor: "#f87979"+this.$store.state.transparency.background,
            borderColor: "#f87979"+this.$store.state.transparency.line,
            borderWidth: this.$store.state.lineWidth,
            cubicInterpolationMode:
              this.type === CHART_TYPE.LINE ? "monotone" : undefined
          }
        ]
      };
    },
    chatMetrics() {
      return [
        {
          name: "Average Value",
          value: this.averageValue
        },
        {
          name: "Average Change",
          value: this.averageChange,
          toShowTrend: true
        }
      ];
    },
    averageValue() {
      let sum = 0;
      this.data.Y.forEach(el => {
        sum += +el;
      });
      return sum / this.data.Y.length;
    },
    averageChange() {
      let sum = 0;
      this.data.Y.forEach((el, i) => {
        if (i > 0)
          sum += +this.data.Y[i] - this.data.Y[i - 1];
      });
      return sum / (this.data.Y.length - 1);
    },
    myStyles() {
      return {
        height: `${this.height}px`,
        position: "relative"
      };
    },
  },
  mounted() {
    this.updateOptions();
  },
  methods: {
    updateOptions() {
      this.options = {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.scaleLabels.x,
                fontSize: 18,
              },
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.scaleLabels.y,
                fontSize: 18,
              },
              gridLines: {
                display: true
              },
              ticks: {
                min: this.derivativeFunction ? undefined : 0,
                max: this.maxv ? this.maxv[this.name] : undefined
              }
            }
          ]
        }
      };
    }
  },
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
