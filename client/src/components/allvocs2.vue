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
import moment from "moment";

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
              position: "bottom",
              ticks: {
                userCallback: function(label) {
                  return moment(label).format("DD.MM.YYYY");
                }
              }
            }
          ]
        }
      },
      colors: [
        "#f8" + "79" + "79",
        "#f8" + "39" + "79",
        "#f8" + "00" + "79",
        "#f8" + "d0" + "79",
        "#f8" + "a0" + "79",
        "#f8" + "79" + "39",
        "#f8" + "79" + "00",
        "#f8" + "79" + "d0",
        "#f8" + "79" + "a0",
        "#d0" + "79" + "79",
        "#a0" + "79" + "79",
        "#79" + "79" + "79",
        "#39" + "79" + "79",
        "#d0" + "39" + "79",
        "#a0" + "00" + "79",
        "#79" + "d0" + "79",
        "#39" + "a0" + "79",
        "#f8" + "39" + "39",
        "#f8" + "00" + "00",
        "#f8" + "d0" + "d0",
        "#f8" + "a0" + "a0",
        "#00" + "00" + "00"
      ]
    };
  },
  components: {
    Linee
  },
  computed: {
    myStyles() {
      return {
        height: `300px`,
        position: "relative"
      };
    }
  },
  watch: {
    radar() {
      this.asd();
    },
    log() {
      this.asd();
    },
    "$store.state.transparency"() {
      this.asd();
    },
    "$store.state.legend"() {
      this.updateOptions();
    }
  },
  props: ["radar", "namee", "log"],
  mounted() {
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
                  return moment(label).format("DD.MM.YYYY");
                }
              }
            }
          ]
        }
      };
    },
    asd() {
      let datasets = [];
      Object.entries(this.radar).forEach((voc, i) => {
        datasets.push({
          label: voc[0],
          data: voc[1].arr.map(el => {
            return {
              y: this.log ? Math.log(el.y) : el.y,
              x: el.x
            };
          }),
          backgroundColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.background,
          borderColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.line
        });
      });
      this.datacollection = {
        datasets: datasets
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
