<template>
  <div class="chart">
    <div class="maintext">{{vocabulary_name}}</div>
    |<span @click="changeversion_id(index)" class="aaa" v-for="(v,index) in Object.keys(versions)" :key="index">
      {{v}} | 
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
}
.aaa {
  cursor: pointer;
}
</style>
