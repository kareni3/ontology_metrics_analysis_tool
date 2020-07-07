<template>
  <div class="chart info_block__container">
    <div v-if="includeAverageNumbers && $store.state.averageMetrics" class="info_block">
      <div
        class="info_block__item"
        v-if="averageValue !== undefined"
      >Average Value = {{averageValue.toFixed(2)}}</div>
      <div
        class="info_block__item"
        v-if="averageMaxValue !== undefined"
      >Average MaxValue = {{averageMaxValue.toFixed(2)}}</div>
      <div
        class="info_block__item"
        v-if="averageMinValue !== undefined"
      >Average MinValue = {{averageMinValue.toFixed(2)}}</div>
      <div
        title="Average Change does not take into account vocabularies that started from ZERO"
        class="info_block__item"
        v-if="averagePercentageChange !== undefined"
      >
        Average Change* = {{averagePercentageChange.toFixed(2)}}%
        <span
          class="info_block__up"
          v-if="averagePercentageChange>0"
        >⇗</span>
        <span class="info_block__down" v-else-if="averagePercentageChange<0">⇘</span>
      </div>
      <div
        title="Average Change2.0 calculates percentage change from average value"
        class="info_block__item"
        v-if="averagePercentageChange2 !== undefined"
      >
        Average Change2.0* = {{averagePercentageChange2.toFixed(2)}}%
        <span
          class="info_block__up"
          v-if="averagePercentageChange2>0"
        >⇗</span>
        <span class="info_block__down" v-else-if="averagePercentageChange2<0">⇘</span>
      </div>
      <div class="info_block__item" v-if="averageChange !== undefined">
        Average Change = {{averageChange.toFixed(2)}}
        <span
          class="info_block__up"
          v-if="averageChange>0"
        >⇗</span>
        <span class="info_block__down" v-else-if="averageChange<0">⇘</span>
      </div>
    </div>
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
    averageValue() {
      return (
        Object.values(this.radar).reduce((acc, cur) => {
          acc += (cur.borders.max + cur.borders.min) / 2;
          return acc;
        }, 0) / Object.values(this.radar).length
      );
    },
    averageMaxValue() {
      return (
        Object.values(this.radar).reduce((acc, cur) => {
          acc += cur.borders.max;
          return acc;
        }, 0) / Object.values(this.radar).length
      );
    },
    averageMinValue() {
      return (
        Object.values(this.radar).reduce((acc, cur) => {
          acc += cur.borders.min;
          return acc;
        }, 0) / Object.values(this.radar).length
      );
    },
    averagePercentageChange() {
      let counter = 0;
      return (
        Object.values(this.radar).reduce((acc, cur) => {
          const n = +cur.arr[0].y;
          if (n) counter++;
          acc += n ? ((+cur.arr[cur.arr.length - 1].y - n) / n) * 100 : 0;
          return acc;
        }, 0) / counter
      );
    },
    averagePercentageChange2() {
      let counter = 0;
      return (
        Object.values(this.radar).reduce((acc, cur) => {
          const n = (cur.borders.max + cur.borders.min) / 2;
          counter++; // if (n) TODO: add checkbox to remove vocabulaies without changes
          acc += n ? ((+cur.arr[cur.arr.length - 1].y - n) / n) * 100 : 0;
          return acc;
        }, 0) / counter
      );
    },
    averageChange() {
      return (
        Object.values(this.radar).reduce((acc, cur) => {
          acc += +cur.arr[cur.arr.length - 1].y - +cur.arr[0].y;
          return acc;
        }, 0) / Object.values(this.radar).length
      );
    },
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
    "$store.state.transparency"() {
      this.asd();
    },
    "$store.state.legend"() {
      this.updateOptions();
    },
    derivativeFunction() {
      this.asd();
    }
  },
  props: {
    radar: {},
    namee: {},
    includeAverageNumbers: {
      default: true
    },
    derivativeFunction: {
      default: false
    }
  },
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
              position: "bottom"
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
          data: voc[1].arr.map((el, ind) => {
            let elY = 0;
            if (this.derivativeFunction) {
              elY = ind !== 0 ? +voc[1].arr[ind].y - voc[1].arr[ind - 1].y : 0;
              elY = elY >= 0 ? Math.log(elY + 1) : -Math.log(1 - elY);
            } else {
              elY =
                voc[1].borders.max === voc[1].borders.min
                  ? voc[1].borders.max === 0
                    ? 0
                    : 0.5
                  : (+el.y - voc[1].borders.min) /
                    (voc[1].borders.max - voc[1].borders.min);
            }
            return {
              y: elY,
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
.info_block {
  width: 260px;
  text-align: left;
  position: absolute;
  top: 24px;
  right: 12px;
  z-index: 1;
  font-weight: 600;
  background-color: #ffffff80;
  color: #000000d0;
  border-radius: 4px;
  border: 1px solid #00000060;
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
  color: #22aa22d0;
}
.info_block__down {
  color: #ff5555d0;
}
</style>
