<template>
  <div class="chart">
    <div class="maintext">
      <button class="big" @click="prevVoc">&lt;</button>
      <span>{{vocabulary_name}}</span>
      <button class="big" @click="nextVoc">&gt;</button>
    </div>
    <span class="aaas">
      <input type="checkbox" v-model="checkboxderivativeFunction" />derivative functions
    </span>
    <div v-if="metrics && timer">
      <div class="qweewq" v-for="(me,index) in arr" :key="vocabulary_name+index">
        <Chart
          :type="'line'"
          v-if="index < $store.state.graphCount"
          :includeAverageNumbers="true"
          :derivativeFunction="checkboxderivativeFunction"
          :metric="me[1]"
          :name="me[0]"
        ></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart_class.vue";

export default {
  name: "Chart5",
  data() {
    return {
      checkboxderivativeFunction: false,
      timer: true
    };
  },
  // watch: {
  //   checkboxderivativeFunction() {
  //     this.timer = false
  //     setTimeout(()=> {
  //       this.timer = true
  //     },0)
  //   }
  // },
  components: {
    Chart
  },
  computed: {
    arr() {
      return this.metrics
        ? Object.entries(this.metrics).filter((el) =>
            this.list.includes(el[0])
          )
        : [];
    }
  },
  methods: {
    prevVoc() {
      this.$emit('prevVoc')
    },
    nextVoc() {
      this.$emit('nextVoc')
    },
  },
  props: ["vocabulary_name", "metrics", "list"],
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
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
input[type="checkbox"] {
  transform: scale(1.5);
}
.maintext {
  font-size: 3em;
}
.maintext span {
  width: 200px;
  display: inline-block;
}
.big {
    height: 2.5rem;
    vertical-align: middle;
    width: 2.5rem;
    font-size: 2rem;
}
</style>
