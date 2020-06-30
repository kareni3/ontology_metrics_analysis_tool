<template>
  <div class="chart">
    <div>
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
              },
              
                type: 'linear',
                position: 'bottom'
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
    Linee,
  },
  computed: {
    myStyles() {
      return {
        height: `300px`,
        position: "relative"
      };
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
    maxv: {
      default: function () {
        return { metric: 1 }
      }
    }
  },
  mounted() {
    this.datacollection = {
      datasets: [
        {
          label: this.name,
          data: this.class_names_lisclass_metrics_listt,
          backgroundColor: "#f8797950",
          borderColor: '#f87979',
          cubicInterpolationMode: 'monotone',
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
