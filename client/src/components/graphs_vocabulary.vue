<template>
  <div class="chart">
    <div class="maintext">{{vocabulary_name}}</div> 
    <span class="aaas">
      <input type="checkbox" v-model="checkboxderivativeFunction">derivative functions
    </span>
    <div v-if="metrics && timer">
      <div class="qweewq" v-for="(me,index) in arr" :key="vocabulary_name+index">
        <Chart :type="'line'" v-if="list.includes(Object.keys(metrics)[index]) && index < $store.state.graphCount" :includeAverageNumbers="true" :derivativeFunction="checkboxderivativeFunction" :metric="me" :name="Object.keys(metrics)[index]"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart_class.vue";

export default {
  name: 'Chart5',
  data() {
    return {
      checkboxderivativeFunction: false,
      timer: true,
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
      return this.metrics ? Object.values(this.metrics): []
    }
  },
  props: ['vocabulary_name','metrics', 'list'],
  mounted () {
    this.$store.dispatch("fetchGraphCount", 5)
  }
}
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
  font-size: 2em;
}
</style>
