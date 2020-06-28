<template>
  <div class="chart">
    <div v-if="type==='bar'">
    <Bar
      v-if="datacollection"
      :chart-data="datacollection"
      :styles="myStyles"
      :options="options"
    ></Bar>
    </div>
    <div v-else-if="type==='line'">
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
      datacollection: null,
      options: {
        maintainAspectRatio:false,
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
                min: 0,
                max: this.maxv[this.name]
              }
            }
          ]
        }
      }
    };
  },
  components: {
    Bar,Linee,
  },
  computed: {
    myStyles() {
      return {
        height: `300px`,
        position: "relative"
      };
    },
    new_list() {
      return this.metric.class_names_list.filter(
        (as, i) => this.metric.class_names_lisclass_metrics_listt[i] !== null
      );
    },
    new_list_1() {
      return this.metric.class_names_lisclass_metrics_listt.filter(
        (as, i) => this.metric.class_names_lisclass_metrics_listt[i] !== null
      );
    }
  },
  props: {
    metric: {
      default: function () {
        return {
              class_names_list: [],
              class_names_lisclass_metrics_listt: []
            }
      }
    },
    name: {
      default:"metric"
    },
    type: {
      default:"bar"
    },
    maxv: {
      default: function () {
        return { metric: 1 }
      }
    }
  },
  mounted() {
    this.datacollection = {
      labels: this.new_list,
      datasets: [
        {
          label: this.name,
          data: this.new_list_1,
          backgroundColor: "#f8797950",
          borderColor: '#f87979',
          borderWidth: this.type === 'bar' ? 1: 3,
          cubicInterpolationMode: this.type === 'line' ? 'monotone': undefined,
        }
      ]
    };
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
</style>
