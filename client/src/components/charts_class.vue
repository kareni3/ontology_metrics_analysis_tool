<template>
  <div class="chart">
    <div class="maintext">
      <button class="big" @click="prevVoc">&lt;</button>
      <span>{{vocabulary_name}}</span>
      <button class="big" @click="nextVoc">&gt;</button>
    </div>
    <span @click="changeversion_id(index)" class="aaa" v-for="(v,index) in Object.keys(versions)" :key="index">
      | {{v}} |
    </span>
    <Chart :list="list" :maxv="maxv" :version_name="Object.keys(versions)[version_id]" :metrics="versions[Object.keys(versions)[version_id]].metrics" />
  </div>
</template>

<script>
import Chart from "./charts_class_versions.vue";

export default {  
  name: 'Chart4',
  data() {
    return {
      version_id: 0,
    };
  },
  components: {
    Chart
  },
  props: ['vocabulary_name','versions','maxv','list'],
  mounted () {
    // Object.values(this.versions).forEach(el => {
    //   Object.entries(el.metrics).forEach((el1) => {
    //       Object.values(el1[1].class_names_lisclass_metrics_listt).forEach(el2 => {
    //         if (this.maxv[el1[0]] === undefined) this.maxv[el1[0]] = 0
    //         if (this.maxv[el1[0]] < el2) this.maxv[el1[0]] = el2
    //       })
    //   })
    // });
  },
  methods:{
    prevVoc() {
      this.$emit('prevVoc')
    },
    nextVoc() {
      this.$emit('nextVoc')
    },
    changeversion_id(index) {
        this.version_id= index
    }
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
  font-size: 3em;
  margin-bottom: 12px;
}
.aaa {
  cursor: pointer;
}
.big {
    height: 2.5rem;
    vertical-align: middle;
    width: 2.5rem;
    font-size: 2rem;
}
.maintext span {
  width: 200px;
  display: inline-block;
}
</style>
