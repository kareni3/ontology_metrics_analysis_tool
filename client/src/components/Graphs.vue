<template>
  <div class="charts">
    <div class="aaas qq">
    <input type="checkbox" name="el" value="el" v-model="checkboxvalueall">all
    </div>
    <div class="aaas qq">
    <input type="checkbox" name="el" value="el" v-model="checkboxvalueradar">radar
    </div>
    <div class="dfdf">
    <span class="aaas" v-for="(el,i) in list1" :key="el">
      <input type="checkbox" :name="el" :value="el" v-model="checkboxvalue[i]" />
      {{el}}
    </span>
    </div>
    <br />
    <div v-if="checkboxvalueradar">
    <radars v-if="radar"
    :list="arr12"
      :radar="radar" />
    </div>
    <span
      @click="changeversion_id(index,v)"
      class="aaa"
      v-for="(v,index) in arr1"
      :key="index"
    >| {{v}} |</span>
    <graphs v-if="vocabularies_op"
      :list="arr12" :vocabulary_name="voc_name" :metrics="vocabularies_op[voc_name].metrics" />
  </div>
</template>

<script>
import graphs from "./graphs_vocabulary.vue";
import radars from "./radars.vue";
export default {
  name: "Graph1",
  components: {
    graphs,
    radars,
  },
  data() {
    return {
      voc_name: "",
      vocabularies_op: null,
      arr1: [],
      list1: [],
      checkboxvalue: [],
      checkboxvalueall: true,
      radar: {},
      checkboxvalueradar: false,
    };
  },
  watch:{
    checkboxvalueall(r){
      let arr = []
      this.list1.forEach((el,i)=>{
        arr[i]=r
      })
      this.checkboxvalue = arr;
    }
  },
  computed: {
    arr12() {
      return this.list1.filter((el, ind) => {
        return this.checkboxvalue[ind]
      })
    }
  },
  methods: {
    changeversion_id(index, v) {
      this.voc_name = v;
    }
  },
  props: ["vocabularies"],
  mounted() {
    // let vocabularies = {
    //   vocabulary_name: {
    //     metrics: {
    //       metric_name1: {
    //             version_name_list: [], // разные версии / разные метрики для последней версии
    //             version_metric_list: [] // значение для одной и той же метрики / разные значения метрик
    //           },
    //       metric_name2: {
    //             version_name_list: [], // все классы определенной версии
    //             version_metric_list: [] // все классы определенной версии
    //           }
    //       }
    //     }
    //   }
    // };
    this.voc_name = this.vocabularies[0].name;
    this.vocabularies_op = new Object();
    this.vocabularies.forEach(vocabulary => {
      if (!this.arr1.includes(vocabulary.name)) this.arr1.push(vocabulary.name);
      if (
        !Object.prototype.hasOwnProperty.call(
          this.vocabularies_op,
          vocabulary.name
        )
      ) {
        this.vocabularies_op[vocabulary.name] = {
          metrics: {}
        };
        Object.keys(this.vocabularies[0]).forEach(metric => {
          if (!["name", "id", "version", "version_name"].includes(metric)) {
            if (!this.list1.includes(metric)) {
              this.list1.push(metric);
              this.checkboxvalue.push(true);
            }
            this.vocabularies_op[vocabulary.name].metrics[metric] = {
              class_names_list: [],
              class_names_lisclass_metrics_listt: []
            };
          }
        });
      }

      Object.entries(vocabulary).forEach(metric => {
        if (!["name", "id", "version", "version_name"].includes(metric[0])) {
          this.vocabularies_op[vocabulary.name].metrics[
            metric[0]
          ].class_names_list.push(vocabulary.version_name);
          this.vocabularies_op[vocabulary.name].metrics[
            metric[0]
          ].class_names_lisclass_metrics_listt.push(metric[1]);
        }
      });
    });
    this.radar = Object.entries(this.vocabularies_op).reduce((accumulator, currentVocabulary) => {
        let name_list = []
        let metric_list = []
        Object.entries(currentVocabulary[1].metrics).forEach(metric => {
          name_list.push(metric[0])
          metric_list.push(Math.log(metric[1].class_names_lisclass_metrics_listt[metric[1].class_names_lisclass_metrics_listt.length - 1]))
        })
        accumulator[currentVocabulary[0]] = {
          class_names_lisclass_metrics_listt: metric_list,
          class_names_list: name_list,
        };
        return accumulator
      }, {});
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
.aaa {
  cursor: pointer;
}
.qq {
    display: block!important;
    margin-left: 10%;
    margin-bottom: 12px;
}
.aaas {
    text-align: left;
    display: inline-block;
    width: 380px!important;
    min-width: 300px;
}
input[type="checkbox"] {
  transform: scale(1.5);
}
.dfdf {
  height: 200px;
  overflow: auto;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
