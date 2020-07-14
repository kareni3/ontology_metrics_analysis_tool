<template>
  <div class="chart">
    <div>
      <span class="text__warn">* logarithmic data</span>
      <Radar
        v-if="datacollection"
        :chart-data="datacollection"
        :styles="myStyles"
        :options="options"
      ></Radar>
    </div>
  </div>
</template>

<script>
import Radar from "@/components/chartsJS/Radar.js";
import { colors } from "@/components/common/chartsMixins/mixins";

export default {
  name: "radars",
  data() {
    return {
      datacollection: null,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: this.$store.state.legend
        }
      },
    };
  },
  components: {
    Radar
  },
  mixins: [colors],
  computed: {
    myStyles() {
      return {
        height: `1200px`,
        position: "relative"
      };
    },
    dataset() {
      let dataset = [];
      Object.entries(this.radar).forEach((el, i) => {
        dataset.push({
          label: el[0],
          data: el[1].Y.filter((e, i) => {
            return this.list.includes(el[1].X[i]);
          }),
          backgroundColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.background,
          borderColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.line,
            borderWidth: this.$store.state.lineWidth,
        });
      });
      return dataset;
    }
  },
  watch: {
    dataset() {
      this.datacollection = {
        labels: this.radar[
          Object.keys(this.radar)[0]
        ].X.filter(el => this.list.includes(el)),
        datasets: this.dataset
      };
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
    "$store.state.incomingLinks"() {
      this.setDataset();
    },
    "$store.state.outgoingLinks"() {
      this.setDataset();
    },
    "$store.state.yearsOfLife"() {
      this.setDataset();
    },
  },
  props: ["radar", "list"],
  mounted() {
    this.setDataset();
  },
  methods: {
    updateOptions() {
      this.options = {
        maintainAspectRatio: false,
        legend: {
          display: this.$store.state.legend
        }
      };
    },
    setDataset() {
      this.datacollection = {
        labels: this.radar[
          Object.keys(this.radar)[0]
        ].X.filter(el => this.list.includes(el)),
        datasets: this.dataset
      };
    }
  }
};
</script>