<template>
  <div class="charts">
    <div class="aaas qq">
    <input type="checkbox" name="el" value="el" v-model="checkboxvalueall">all
    </div>
    <div class="aaas" v-for="(el,i) in list1" :key="el" >
      <input type="checkbox" :name="el" :value="el" v-model="checkboxvalue[i]">{{el}}
    </div><br>
    <span
      @click="changeversion_id(index,v)"
      class="aaa"
      v-for="(v,index) in arr1"
      :key="index"
    >| {{v}} |</span>
    <Chart
      ref="ch"
      :list="arr12"
      :maxv="maxv"
      @prevVoc="prevVoc"
      @nextVoc="nextVoc"
      v-if="vocabularies_op"
      :vocabulary_name="version_name"
      :versions="vocabularies_op[version_name].versions"
    />
  </div>
</template>

<script>
import Chart from "./charts_class.vue";
export default {
  name: "Charts1",
  components: {
    Chart
  },
  data() {
    return {
      version_id: 0,
      version_name: "",
      vocabularies_op: null,
      maxv: {},
      arr1: [],
      list: [],
      list1: [],
      checkboxvalue: [],
      checkboxvalueall: true,
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
  methods: {
    nextVoc() {
      if (!this.arr1[this.version_id + 1]) return
      this.version_id += 1
      this.version_name = this.arr1[this.version_id];
    },
    prevVoc() {
      if (!this.arr1[this.version_id - 1]) return
      this.version_id -= 1
      this.version_name = this.arr1[this.version_id];
    },
    changeversion_id(index,v) {
      this.$refs.ch.changeversion_id(0)
      this.version_id = index;
      this.version_name = v;
    }
  },
  computed: {
    arr12() {
      return this.list1.filter((el, ind) => {
        return this.checkboxvalue[ind]
      })
    }
  },
  props: ["classes", "vocabularies"],
  mounted() {
    // let vocabularies = {
    //   vocabulary_name: {
    //     versions: {
    //       version_name: {
    //         vocabulary_id: "",
    //         metrics: {
    //           // список метрик
    //           metric_name1: {
    //             class_names_list: [], // все классы определенной версии
    //             class_names_lisclass_metrics_listt: [] // все классы определенной версии
    //           },
    //           metric_name2: {
    //             class_names_list: [],
    //             class_names_lisclass_metrics_listt: []
    //           }
    //         }
    //       }
    //     }
    //   }
    // };
    // console.log(vocabularies);
    this.vocabularies_op = new Object();
    this.vocabularies.forEach(vocabulary => {
      if (
        !Object.prototype.hasOwnProperty.call(
          this.vocabularies_op,
          vocabulary.name
        )
      ) {
        this.vocabularies_op[vocabulary.name] = {
          vocabulary_name: vocabulary.name,
          versions: new Object()
        };
      }
      this.vocabularies_op[vocabulary.name].versions[
        vocabulary.version_name
      ] = {
        vocabulary_id: vocabulary.id,
        metrics: {
          Classchildrencount: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classconnectivity: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classfulness: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classimportance: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classinheritancerichness: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classinstancescount: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classpropertiescount: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classreadability: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          },
          Classrelationshiprichness: {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          }
        }
      };
    });

    this.classes.forEach(cclass => {
      let vocabulary = this.vocabularies.find(
        voc => voc.name === cclass.vocabulary_name && voc.version === cclass.vocabulary_version_number
      );
      if (!this.arr1.includes(vocabulary.name)) this.arr1.push(vocabulary.name)
      for (let metric in this.vocabularies_op[vocabulary.name].versions[
        vocabulary.version_name
      ].metrics) {
        this.vocabularies_op[vocabulary.name].versions[
          vocabulary.version_name
        ].metrics[metric].class_names_list.push(cclass.name);
        this.vocabularies_op[vocabulary.name].versions[
          vocabulary.version_name
        ].metrics[metric].class_names_lisclass_metrics_listt.push(
          cclass[metric]
        );
        if (this.maxv[metric] === undefined) this.maxv[metric] = 0;
        if (!this.list.includes(metric)){
          this.list.push(metric)
          this.checkboxvalue.push(true)
        }
        if (this.maxv[metric] < +cclass[metric])
          this.maxv[metric] = +cclass[metric];
      }
    });
    this.version_name = this.arr1[0]
    this.list1 = this.list;
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
    margin-bottom: 12px;
}
.aaas {
    text-align: left;
    margin-left: 10%;
}
input[type=checkbox] {
    transform: scale(1.5);
}
</style>
