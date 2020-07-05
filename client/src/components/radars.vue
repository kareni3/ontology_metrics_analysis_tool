<template>
  <div class="chart">
    <div>
      <span class="asdds">* logarithmic data</span>
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
import Radar from "./Radar.js";

export default {
  name: "Chart2",
  data() {
    return {
      datacollection: null,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: this.$store.state.legend
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
    Radar
  },
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
          data: el[1].class_names_lisclass_metrics_listt.filter((e, i) => {
            return this.list.includes(el[1].class_names_list[i]);
          }),
          backgroundColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.background,
          borderColor:
            this.colors[i % this.colors.length] +
            this.$store.state.transparency.line
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
        ].class_names_list.filter(el => this.list.includes(el)),
        datasets: this.dataset
      };
    },
    "$store.state.legend"() {
      this.updateOptions();
    }
  },
  props: ["radar", "list"],
  mounted() {
    this.asd();
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
    asd() {
      this.datacollection = {
        labels: this.radar[
          Object.keys(this.radar)[0]
        ].class_names_list.filter(el => this.list.includes(el)),
        datasets: this.dataset
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
  color: red;
  font-size: 1.4em;
}
</style>
