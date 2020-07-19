<template>
  <div>
    <span class="title-1">{{name}}</span>
    <Linee v-if="datacollection" :chart-data="datacollection" :styles="myStyles" :options="options"></Linee>
  </div>
</template>

<script>
import Linee from "@/components/chartsJS/Line.js";
import moment from "moment";
import { colors } from "@/components/common/chartsMixins/mixins";

export default {
  name: "Scatter",
  data() {
    return {
      datacollection: null,
      options: null,
    };
  },
  mixins: [colors],
  components: {
    Linee
  },
  computed: {
    myStyles() {
      return {
        height: `300px`,
        position: "relative"
      };
    },
  },
  watch: {
    data() {
      this.setDataset();
    },
    "$store.state.transparency"() {
      this.setDataset();
    },
    "$store.state.legend"() {
      this.updateOptions();
    },
    "$store.state.minVersion"() {
      this.setDataset();
    },
    "$store.state.maxVersion"() {
      this.setDataset();
    },
    "$store.state.betweenVersionsTime"() {
      this.setDataset();
    },
    "$store.state.incomingLinks"() {
      this.setDataset();
    },
    "$store.state.outgoingLinks"() {
      this.setDataset();
    },
    "$store.state.yearsOfLife"() {
      this.setDataset();
    },
    derivativeFunction() {
      this.setDataset();
    }
  },
  props: {
    data: {},
    name: {},
    isDate: {
      default: false
    }
  },
  mounted() {
    this.updateOptions();
    this.setDataset();
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
              ticks: this.isDate 
              ? {
                userCallback: function(label) {
                  return moment(label).format("DD.MM.YYYY");
                }
              }
              : {
                userCallback: function(label) {
                  return label;
                }
              },
            }
          ]
        }
      };
    },
    setDataset() {
      let datasets = [];
      Object.entries(this.data).forEach((voc, i) => {
        datasets.push({
          label: voc[0],
          data: voc[1],
          cubicInterpolationMode: "monotone",
          backgroundColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.background,
          borderColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.line,
          borderWidth: this.$store.state.lineWidth,
        });
      });
      if (this.derivativeFunction) {
        datasets.push({
          label: "f(x)=0",
          data: [
            {
              x: 0,
              y: 0
            },
            {
              x: 1,
              y: 0
            }
          ],
          borderColor: "#000000a0"
        });
      }
      this.datacollection = {
        datasets: datasets
      };
    }
  }
};
</script>