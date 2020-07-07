<template>
  <div class="charts">
    <div>
      <div class="aaas qq">
        <input type="checkbox" name="el" value="el" v-model="voc_checkboxvalueall" />all
      </div>
      <div class="dfdf">
        <span class="aaas" v-for="(el,i) in voc_list1" :key="el">
          <input type="checkbox" :name="el" :value="el" v-model="voc_checkboxvalue[i]" />
          {{el}}
        </span>
      </div>
    </div>
    <div class="aaas qq fdf">
      <input type="checkbox" name="el" value="el" v-model="checkboxvalueall" />all
    </div>
    <div class="dfdf">
      <span class="aaas" v-for="(el,i) in list1" :key="el">
        <input type="checkbox" :name="el" :value="el" v-model="checkboxvalue[i]" />
        {{el}}
      </span>
    </div>
    <graphs v-if="arr13 && time" :list="arr12" :version_name="'all'" :metrics="arr13" />
  </div>
</template>

<script>
import graphs from "./charts_class_versions.vue";
export default {
  name: "Graph1",
  components: {
    graphs
  },
  data() {
    return {
      vocabularies_op: null,
      list1: [],
      checkboxvalue: [],
      time: true,
      checkboxvalueall: true,
      voc_list1: [],
      voc_checkboxvalue: [],
      voc_checkboxvalueall: true,
      radar: {},
      checkboxvalueradar: false,
      differences: {}
    };
  },
  watch: {
    checkboxvalueall(r) {
      let arr = [];
      this.list1.forEach((el, i) => {
        arr[i] = r;
      });
      this.checkboxvalue = arr;
    },
    voc_checkboxvalueall(r) {
      let arr = [];
      this.voc_list1.forEach((el, i) => {
        arr[i] = r;
      });
      this.voc_checkboxvalue = arr;
    },
    arr13() {
      this.time = false;
      setTimeout(()=>{
        this.time = true
      }, 0)
    }
  },
  computed: {
    arr12() {
      return this.list1.filter((el, ind) => {
        return this.checkboxvalue[ind];
      });
    },
    arr13() {
      let vocabularies_op = new Object();
      Object.keys(this.vocabularies[0]).forEach(metric => {
        if (!["name", "id", "version", "version_name", "incoming_links", "outgoing_links",
              "vocabulary_name"].includes(metric)) {
          vocabularies_op[metric] = {
            class_names_list: [],
            class_names_lisclass_metrics_listt: []
          };
        }
      });
      let versions = {};
      this.vocabularies.forEach(vocabulary => {
        Object.entries(vocabulary).forEach(metric => {
          if (!["name", "id", "version", "version_name", "incoming_links", "outgoing_links"].includes(metric[0])) {
            let index = vocabularies_op[metric[0]].class_names_list.indexOf(
              vocabulary.name
            );
            if (
              this.voc_checkboxvalue[this.voc_list1.indexOf(vocabulary.name)]
            ) {
              if (index === -1) {
                vocabularies_op[metric[0]].class_names_list.push(
                  vocabulary.name
                );
                vocabularies_op[
                  metric[0]
                ].class_names_lisclass_metrics_listt.push(metric[1]);
                versions[vocabulary.name] = +vocabulary.version;
              } else if (+vocabulary.version > versions[vocabulary.name]) {
                versions[vocabulary.name] = +vocabulary.version;
                vocabularies_op[metric[0]].class_names_lisclass_metrics_listt[
                  index
                ] = metric[1];
              }
            }
          }
        });
      });
      return vocabularies_op;
    }
  },
  props: ["vocabularies"],
  mounted() {
    // let vocabularies = {
    //   vocabulary_name: {
    //     metrics: {
    //       metric_name1: {
    //             version_name_list: [], // разные названия словарей для последней версии
    //             version_metric_list: [] // разные значения метрик
    //           },
    //       metric_name2: {
    //             version_name_list: [], // все классы определенной версии
    //             version_metric_list: [] // все классы определенной версии
    //           }
    //       }
    //     }
    //   }
    // };
    this.vocabularies_op = new Object();
    Object.keys(this.vocabularies[0]).forEach(metric => {
      if (!["name", "id", "version", "version_name", "incoming_links", "outgoing_links",
              "vocabulary_name"].includes(metric)) {
        if (!this.list1.includes(metric)) {
          this.list1.push(metric);
          this.checkboxvalue.push(true);
        }
        this.vocabularies_op[metric] = {
          class_names_list: [],
          class_names_lisclass_metrics_listt: []
        };
      }
    });
    let versions = {};
    this.vocabularies.forEach(vocabulary => {
      Object.entries(vocabulary).forEach(metric => {
        if (!["name", "id", "version", "version_name", "incoming_links", "outgoing_links",
              "vocabulary_name"].includes(metric[0])) {
          let index = this.vocabularies_op[metric[0]].class_names_list.indexOf(
            vocabulary.name
          );
          if (index === -1) {
            this.vocabularies_op[metric[0]].class_names_list.push(
              vocabulary.name
            );
            this.vocabularies_op[
              metric[0]
            ].class_names_lisclass_metrics_listt.push(metric[1]);
            versions[vocabulary.name] = +vocabulary.version;
          } else if (+vocabulary.version > versions[vocabulary.name]) {
            versions[vocabulary.name] = +vocabulary.version;
            this.vocabularies_op[metric[0]].class_names_lisclass_metrics_listt[
              index
            ] = metric[1];
            if (!this.voc_list1.includes(vocabulary.name))
              this.voc_list1.push(vocabulary.name);
          }
        }
      });
    });
    this.voc_list1.forEach(() => {
      this.voc_checkboxvalue.push(true);
    });
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
  display: block !important;
  margin-left: 10%;
  margin-bottom: 12px;
}
.aaas {
  text-align: left;
  display: inline-block;
  width: 380px !important;
  min-width: 300px;
}
input[type="checkbox"] {
  transform: scale(1.5);
}
.fdf {
  margin-top: 24px;
}
.dfdf {
  max-height: 200px;
  overflow: auto;
  margin-left: 5%;
  margin-right: 5%;
  text-align: left;
}
</style>
