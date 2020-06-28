<template>
  <div class="chart">
    <div class="maintext">{{vocabulary_name}}</div>
    <div v-if="metrics">
      <div class="qweewq" v-for="(me,index) in arr" :key="vocabulary_name+index">
        <Chart :type="'line'" v-if="list.includes(Object.keys(metrics)[index])" :metric="me" :name="Object.keys(metrics)[index]"></Chart>
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
    };
  },
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
.maintext {
  font-size: 2em;
}
</style>
