<template>
  <div class="chart">
    <div>
      <span class="asdds">{{namee}}</span>
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
      },
    };
  },
  components: {
    Linee
  },
  computed: {
    myStyles() {
      return {
        height: `600px`,
        position: "relative"
      };
    }
  },
  watch: {
    radar() {
      this.asd();
    },
    "$store.state.transparency"() {
      this.asd();
    },
    "$store.state.legend"() {
      this.updateOptions();
    }
  },
  props: {
    radar: {},
    namee: {},
  },
  mounted() {
    this.updateOptions();
    this.asd();
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
              position: "bottom",
              ticks: {
                userCallback: function(label) {
                  return Math.exp(+label).toFixed();
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                userCallback: function(label) {
                  return Math.exp(+label).toFixed();
                }
              }
            }
          ],
        }
      };
    },
    asd() {
      this.datacollection = {
        datasets: [{
          data: this.radar,
          backgroundColor: "#f8797900",
          borderColor: "#f8797900",
          pointBackgroundColor: "#f87979" + "c0",
          pointRadius: 4,
        }]
      };
    }
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
.asdds {
  font-size: 1.4em;
}
</style>
