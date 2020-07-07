<template>
  <div class="chart info_block__container">
    <div v-if="includeAverageNumbers && $store.state.averageMetrics" class="info_block" >
      <div class="info_block__item" v-if="averageValue !== undefined">Average Value = {{averageValue}}</div>
      <div class="info_block__item" v-if="averageChange !== undefined">Average Change = {{averageChange}} 
        <span class="info_block__up" v-if="averageChange>0">⇗</span> <span class="info_block__down" v-else-if="averageChange<0">⇘</span></div>
    </div>
    <div v-if="type==='bar'">
      <Bar v-if="datacollection" :chart-data="datacollection" :styles="myStyles" :options="options"></Bar>
    </div>
    <div v-else-if="type==='line'">
      <span class="asddsa">
        {{name}}
      </span>
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
import Bar from "./Bar.js";
import Linee from "./Line.js";

export default {
  name: "Chart2",
  data() {
    return {
      options: undefined
    };
  },
  components: {
    Bar,
    Linee
  },
  watch: {
    maxv() {
      this.updateOptions()
    }
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
                min: this.derivativeFunction ? undefined : 0,
                max: this.maxv ? this.maxv[this.name] : undefined
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
        height: `400px`,
        position: "relative"
      };
    },
    averageValue() {
      let sum = 0;
      this.metric.class_names_lisclass_metrics_listt.forEach(el => {
        sum += +el;
      });
      return (sum / this.metric.class_names_lisclass_metrics_listt.length).toFixed(2);
    },
    averageChange() {
      let sum = 0;
      this.metric.class_names_lisclass_metrics_listt.forEach((el, i) => {
        if (i > 0)
          sum +=
            +this.metric.class_names_lisclass_metrics_listt[i] -
            this.metric.class_names_lisclass_metrics_listt[i - 1];
      });
      return (sum / (this.metric.class_names_lisclass_metrics_listt.length - 1)).toFixed(2);
    },
    new_list() {
      return this.metric.class_names_list.filter(
        (as, i) => this.metric.class_names_lisclass_metrics_listt[i] !== null
      );
    },
    new_list_1() {
      const arr = this.metric.class_names_lisclass_metrics_listt.filter(
        (as, i) => this.metric.class_names_lisclass_metrics_listt[i] !== null
      );
      return this.derivativeFunction
        ? arr.map((as, i) =>
            i !== 0
              ? this.metric.class_names_lisclass_metrics_listt[i] -
                this.metric.class_names_lisclass_metrics_listt[i - 1]
              : 0
          )
        : arr;
    },
    datacollection() {
      return {
        labels: this.new_list,
        datasets: [
          {
            label: this.name,
            data: this.new_list_1,
            backgroundColor: "#f8797950",
            borderColor: "#f87979",
            borderWidth: this.type === "bar" ? 1 : 3,
            cubicInterpolationMode:
              this.type === "line" ? "monotone" : undefined
          }
        ]
      };
    }
  },
  props: {
    metric: {
      default: function() {
        return {
          class_names_list: [],
          class_names_lisclass_metrics_listt: []
        };
      }
    },
    name: {
      default: "metric"
    },
    type: {
      default: "bar"
    },
    derivativeFunction: {
      default: false
    },
    includeAverageNumbers: {
      default: false
    },
    maxv: {
      default: function() {
        return { metric: 1 };
      }
    }
  },
  mounted() {
      this.updateOptions()
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
.info_block {
  width: 210px;
  text-align: left;
  position: absolute;
  top: 24px;
  right: 12px;
  z-index: 1;
  font-weight: 600;
  background-color: #ffffff40;
  color: #00000080;
  border-radius: 4px;
  border: 1px solid #00000040;
  padding: 12px;
}
.info_block:hover {
  background-color: #ffffffd0;
  color: #000000f0;
  border: 1px solid #00000080;
}
.info_block__container {
  position: relative;
}
.info_block__item {
  margin-bottom: 8px;
}
.info_block__up {
  color: #22aa22d0
}
.info_block__down {
  color: #ff5555d0
}
.asddsa {
  font-size: 2em;
}
</style>
