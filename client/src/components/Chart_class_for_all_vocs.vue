<template>
  <div class="chart">
    <br>
    <span class="title2">{{name}}</span>
    <div>
      <Bar v-if="datacollection" :chart-data="datacollection" :styles="myStyles" :options="options"></Bar>
    </div>
  </div>
</template>

<script>
import Bar from "./Bar.js";

export default {
  name: "Chart2",
  data() {
    return {
      options: undefined
    };
  },
  components: {
    Bar
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
          backgroundColor:
            "#000000" + this.fullnessPercentage[i],
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
  props: {
    metrics: {},
    name: {
      default: "metric"
    }
  },
  mounted() {
    this.updateOptions();
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.title2 {
  font-size: 2em;
}
</style>
