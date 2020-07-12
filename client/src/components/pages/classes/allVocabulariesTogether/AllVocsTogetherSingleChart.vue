<template>
  <div>
    <span class="title-2">{{name}}</span>
    <div>
      <Bar v-if="datacollection" :chartData="datacollection" :styles="myStyles" :options="options"></Bar>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/chartsJS/Bar.js";

export default {
  name: "AllVocabulariesTogetherChartContainer",
  components: {
    Bar
  },
  data() {
    return {
      options: null
    };
  },
  props: {
    metrics: {},
    name: {
      default: "metric"
    }
  },
  computed: {
    myStyles() {
      return {
        height: `700px`,
        position: "relative"
      };
    },
    averageMetrics() {
      return Object.values(this.metrics.metricsList).map(vocMetrics => {
        let sum = 0;
        vocMetrics.forEach(el => {
          sum += el;
        });
        return sum / vocMetrics.length;
      });
    },
    vocNames() {
      return Object.keys(this.metrics.metricsList);
    },
    fullnessPercentage() {
      return Object.values(this.metrics.fullness).map(fullness => {
        let res = fullness.filledNumber + fullness.emptyNumber === 0
          ? 0
          : fullness.filledNumber /
            (fullness.filledNumber + fullness.emptyNumber);
        res = Math.ceil((res * 255)).toString(16);
        return (res.length === 1 ? "0" : "") + res
      });
    },
    dataset() {
      const dataset = [];
      this.vocNames.forEach((vocName, i) => {
        dataset.push({
          label: vocName,
          data: [this.averageMetrics[i]],
          backgroundColor: "#000000" + this.fullnessPercentage[i],
          borderColor: "#00000080",
          borderWidth: 1,
        });
      });
      return dataset;
    },
    datacollection() {
      return {
        labels: ["Last versions of vocabularies"],
        datasets: this.dataset
      };
    }
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
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                min: 0
              }
            }
          ]
        }
      };
    }
  },
};
</script>
