<template>
  <div>
    <Scatter :data="preparedData" :name="name" :isDate="true" />
  </div>
</template>

<script>
import Scatter from "@/components/chartsVUE/Scatter";

export default {
  name: "AllVocabularies2",
  data() {
    return {
      preparedData: {}
    };
  },
  components: {
    Scatter
  },
  watch: {
    data() {
      console.log(123213213)
      this.prepareData();
    },
    log() {
      this.prepareData();
    },
    derivativeFunction() {
      this.prepareData();
    },
  },
  props: ["data", "name", "log", "derivativeFunction"],
  mounted() {
    this.prepareData();
  },
  methods: {
    prepareData() {
      this.preparedData = {};
      Object.entries(this.data).forEach((voc) => {
        this.preparedData[voc[0]] = voc[1].arr.map((el, ind) => {
          let elY = 0;
          if (this.derivativeFunction) {
            elY = ind !== 0 ? +voc[1].arr[ind].y - voc[1].arr[ind - 1].y : 0;
            elY = elY >= 0 ? Math.log(elY + 1) : -Math.log(1 - elY);
          } else {
            elY = this.log ? Math.log(+el.y + 1) : el.y
          }
          return {
            y: elY,
            x: el.x
          };
        });
      });
    }
  }
};
</script>
