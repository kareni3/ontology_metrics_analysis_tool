<template>
  <div class="charts">
    <div class="aaas qq">
      <input type="checkbox" name="el" value="el" v-model="checkboxvalueradar" />radar
    </div>
    <div class="aaas qq">
      <input type="checkbox" name="el" value="el" v-model="checkboxvalueallvoca" />all vocabularies on one graph
    </div>
    <div v-if="checkboxvalueallvoca" class="aaas1 qq">
      <input type="checkbox" class="qq1" name="el" value="el" v-model="checkboxvalueallvoca2" /> year
      <input type="checkbox" class="qq1" name="el" value="el" v-model="checkboxvalueallvoca3" /> incoming links
      <input
        type="checkbox"
        class="qq1"
        name="el"
        value="el"
        v-model="checkboxvalueallvoca4"
      /> outgoing links
    </div>
    <div class="aaas qq">
      <input type="checkbox" name="el" value="el" v-model="checkboxvalueall" />all metrics
    </div>
    <div class="dfdf">
      <span class="aaas" v-for="(el,i) in list1" :key="el">
        <input type="checkbox" :name="el" :value="el" v-model="checkboxvalue[i]" />
        {{el}}
      </span>
    </div>
    <div v-if="checkboxvalueradar || checkboxvalueallvoca">
      <div class="aaas qq fdf">
        <input type="checkbox" name="el" value="el" v-model="voc_checkboxvalueall" />all vocabularies
      </div>
      <div class="dfdf">
        <span class="aaas" v-for="(el,i) in voc_list1" :key="el">
          <input type="checkbox" :name="el" :value="el" v-model="voc_checkboxvalue[i]" />
          {{el}}
        </span>
      </div>
    </div>
    <br />
    <div v-if="checkboxvalueallvoca && checkboxvalueallvoca2" class="aaas qq rewq">
      <input type="checkbox" name="el" value="el" v-model="log" /> Logarithmic data
    </div>
    <div v-if="checkboxvalueradar">
      <radars v-if="Object.keys(newradar).length" :list="arr12" :radar="newradar" />
    </div>
    <div
      v-if="checkboxvalueallvoca && !checkboxvalueallvoca2 && !(checkboxvalueallvoca3 || checkboxvalueallvoca4)"
    >
      <span class="aaas2">
        <input type="checkbox" v-model="checkboxderivativeFunction" />derivative functions
      </span>
      <div v-for="(el, ind) in arr14" :key="el[0]">
        <allvocs
          v-if="ind < $store.state.graphCount"
          :radar="el[1]"
          :namee="el[0]"
          :derivativeFunction="checkboxderivativeFunction"
        />
      </div>
    </div>
    <div v-else-if="checkboxvalueallvoca && checkboxvalueallvoca2">
      <div v-for="(el, ind) in arr142" :key="el[0]">
        <allvocs2 v-if="ind < $store.state.graphCount" :radar="el[1]" :log="log" :namee="el[0]" />
      </div>
    </div>
    <div v-else-if="checkboxvalueallvoca && (checkboxvalueallvoca3 || checkboxvalueallvoca4)">
      <span class="asdds">* logarithmic data</span>
      <div v-for="(el, ind) in arr143" :key="el[0]">
        <allvocsMetricsvsLinks
          v-if="ind < $store.state.graphCount"
          :radar="el[1]"
          :log="log"
          :namee="el[0]"
        />
      </div>
    </div>
    <div v-else-if="!checkboxvalueallvoca">
      <span
        @click="changeversion_id(index,v)"
        class="aaa"
        v-for="(v,index) in arr1"
        :key="index"
      >| {{v}} |</span>
      <graphs
        v-if="vocabularies_op"
        :list="arr12"
        @prevVoc="prevVoc"
        @nextVoc="nextVoc"
        :vocabulary_name="voc_name"
        :metrics="vocabularies_op[voc_name].metrics"
      />
    </div>
  </div>
</template>

<script>
import graphs from "./graphs_vocabulary.vue";
import radars from "./radars.vue";
import allvocs from "./allvocs.vue";
import allvocs2 from "./allvocs2.vue";
import allvocsMetricsvsLinks from "./allvocs_metricsvslinks.vue";
export default {
  name: "Graph1",
  components: {
    graphs,
    radars,
    allvocs,
    allvocs2,
    allvocsMetricsvsLinks
  },
  data() {
    return {
      voc_name: "",
      vocabularies_op: null,
      arr1: [],
      list1: [],
      voc_list1: [],
      checkboxvalue: [],
      checkboxvalueall: true,
      voc_checkboxvalue: [],
      voc_checkboxvalueall: true,
      radar: {},
      allvocs: {},
      log: false,
      allvocs2: {},
      allvocs_metricsvslinks: {},
      checkboxvalueallvoca2: false,
      checkboxvalueradar: false,
      checkboxvalueallvoca: false,
      checkboxvalueallvoca3: false,
      checkboxvalueallvoca4: false,
      checkboxderivativeFunction: false
    };
  },
  watch: {
    checkboxvalueallvoca2(v) {
      if (v) {
        this.checkboxvalueallvoca3 = false;
        this.checkboxvalueallvoca4 = false;
      }
      this.$store.dispatch("fetchGraphCount", 5);
    },
    checkboxvalueallvoca3(v) {
      if (v) {
        this.checkboxvalueallvoca4 = false;
        this.checkboxvalueallvoca2 = false;
      }
      this.changeLinks();
      this.$store.dispatch("fetchGraphCount", 5);
    },
    checkboxvalueallvoca4(v) {
      if (v) {
        this.checkboxvalueallvoca3 = false;
        this.checkboxvalueallvoca2 = false;
      }
      this.changeLinks();
      this.$store.dispatch("fetchGraphCount", 5);
    },
    checkboxvalueallvoca() {
      this.$store.dispatch("fetchGraphCount", 5);
    },
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
    }
  },
  computed: {
    arr12() {
      return this.list1.filter((el, ind) => {
        return this.checkboxvalue[ind];
      });
    },
    arr14() {
      let arr = [];
      arr = Object.entries(this.newallvocs).filter((el, ind) => {
        return this.checkboxvalue[ind];
      });
      return arr;
    },
    arr143() {
      let arr = [];
      arr = Object.entries(this.allvocs_metricsvslinks).filter((el, ind) => {
        return this.checkboxvalue[ind];
      });
      return arr;
    },
    arr142() {
      let arr = [];
      arr = Object.entries(this.newallvocs2).filter((el, ind) => {
        return this.checkboxvalue[ind];
      });
      return arr;
    },
    newallvocs2() {
      let newobj = {};
      Object.entries(this.allvocs2).forEach(el => {
        newobj[el[0]] = {};
        Object.entries(el[1]).forEach((e, ind) => {
          if (this.voc_checkboxvalue[ind]) newobj[el[0]][e[0]] = e[1];
        });
      });
      return newobj;
    },
    newallvocs() {
      let newobj = {};
      Object.entries(this.allvocs).forEach(el => {
        newobj[el[0]] = {};
        Object.entries(el[1]).forEach((e, ind) => {
          if (this.voc_checkboxvalue[ind]) newobj[el[0]][e[0]] = e[1];
        });
      });
      return newobj;
    },
    newradar() {
      let newradar = {};

      Object.keys(this.radar).forEach((key, ind) => {
        if (this.voc_checkboxvalue[ind]) newradar[key] = this.radar[key];
      });

      return newradar;
    }
  },
  props: ["vocabularies"],
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
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
    this.voc_links = {};
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
          if (
            ![
              "name",
              "id",
              "version",
              "version_name",
              "incoming_links",
              "outgoing_links",
              "vocabulary_name"
            ].includes(metric)
          ) {
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
        if (["incoming_links", "outgoing_links"].includes(metric[0])) {
          if (!this.voc_links[vocabulary.name])
            this.voc_links[vocabulary.name] = {};
          this.voc_links[vocabulary.name][metric[0]] = metric[1];
        }
        if (
          ![
            "name",
            "id",
            "version",
            "version_name",
            "incoming_links",
            "outgoing_links",
            "vocabulary_name"
          ].includes(metric[0])
        ) {
          this.vocabularies_op[vocabulary.name].metrics[
            metric[0]
          ].class_names_list.push(vocabulary.version_name);
          this.vocabularies_op[vocabulary.name].metrics[
            metric[0]
          ].class_names_lisclass_metrics_listt.push(metric[1]);
        }
      });
    });

    this.voc_list1 = Object.keys(this.vocabularies_op);
    this.voc_list1.forEach(() => {
      this.voc_checkboxvalue.push(true);
    });

    this.radar = Object.entries(this.vocabularies_op).reduce(
      (accumulator, currentVocabulary) => {
        let name_list = [];
        let metric_list = [];
        Object.entries(currentVocabulary[1].metrics).forEach(metric => {
          name_list.push(metric[0]);
          metric_list.push(
            Math.log(
              +metric[1].class_names_lisclass_metrics_listt[
                metric[1].class_names_lisclass_metrics_listt.length - 1
              ] + 1
            )
          );
        });
        accumulator[currentVocabulary[0]] = {
          class_names_lisclass_metrics_listt: metric_list,
          class_names_list: name_list
        };
        return accumulator;
      },
      {}
    );

    this.allvocs = {};
    Object.keys(
      this.vocabularies_op[Object.keys(this.vocabularies_op)[0]].metrics
    ).forEach(metric1 => {
      this.allvocs[metric1] = {};
    });
    Object.keys(this.vocabularies_op).forEach(metric => {
      Object.keys(this.allvocs).forEach(metric1 => {
        this.allvocs[metric1][metric] = {
          arr: [],
          borders: { min: Infinity, max: -Infinity }
        };
      });
    });

    Object.entries(this.vocabularies_op).forEach(voc => {
      Object.entries(voc[1].metrics).forEach(metric => {
        Object.values(metric[1].class_names_list).forEach((el, i) => {
          this.allvocs[metric[0]][voc[0]].arr.push({
            x:
              metric[1].class_names_list.length === 1
                ? 0
                : i / (metric[1].class_names_list.length - 1),
            y: metric[1].class_names_lisclass_metrics_listt[i]
          });
          if (metric[1].class_names_list.length === 1) {
            this.allvocs[metric[0]][voc[0]].arr.push({
              x:
                metric[1].class_names_list.length === 1
                  ? 1
                  : i / (metric[1].class_names_list.length - 1),
              y: metric[1].class_names_lisclass_metrics_listt[i]
            });
          }
          if (
            +metric[1].class_names_lisclass_metrics_listt[i] <
            this.allvocs[metric[0]][voc[0]].borders.min
          )
            this.allvocs[metric[0]][voc[0]].borders.min = +metric[1]
              .class_names_lisclass_metrics_listt[i];
          if (
            +metric[1].class_names_lisclass_metrics_listt[i] >
            this.allvocs[metric[0]][voc[0]].borders.max
          )
            this.allvocs[metric[0]][voc[0]].borders.max = +metric[1]
              .class_names_lisclass_metrics_listt[i];
        });
      });
    });

    this.changeLinks();

    this.allvocs2 = {};
    Object.keys(
      this.vocabularies_op[Object.keys(this.vocabularies_op)[0]].metrics
    ).forEach(metric1 => {
      this.allvocs2[metric1] = {};
    });
    Object.keys(this.vocabularies_op).forEach(metric => {
      Object.keys(this.allvocs2).forEach(metric1 => {
        this.allvocs2[metric1][metric] = {
          arr: [],
          borders: { min: Infinity, max: -Infinity }
        };
      });
    });

    Object.entries(this.vocabularies_op).forEach(voc => {
      Object.entries(voc[1].metrics).forEach(metric => {
        Object.values(metric[1].class_names_list).forEach((el, i) => {
          this.allvocs2[metric[0]][voc[0]].arr.push({
            x: new Date(metric[1].class_names_list[i]).getTime(),
            y: metric[1].class_names_lisclass_metrics_listt[i]
          });
        });
      });
    });
  },
  methods: {
    nextVoc() {
      let ind = this.voc_list1.indexOf(this.voc_name) + 1
      if (!this.voc_list1[ind]) return
      this.voc_name = this.voc_list1[ind];
    },
    prevVoc() {
      let ind = this.voc_list1.indexOf(this.voc_name) - 1
      if (!this.voc_list1[ind]) return
      this.voc_name = this.voc_list1[ind];
    },
    changeversion_id(index, v) {
      this.voc_name = v;
    },
    changeLinks() {
      this.allvocs_metricsvslinks = {};
      Object.keys(
        this.vocabularies_op[Object.keys(this.vocabularies_op)[0]].metrics
      ).forEach(metric1 => {
        this.allvocs_metricsvslinks[metric1] = [];
      });

      Object.entries(this.vocabularies_op).forEach(voc => {
        Object.entries(voc[1].metrics).forEach(metric => {
          this.allvocs_metricsvslinks[metric[0]].push({
            x: Math.log(
              +(this.checkboxvalueallvoca4
                ? this.voc_links[voc[0]].outgoing_links
                : this.voc_links[voc[0]].incoming_links) + 1
            ),
            y: Math.log(
              +metric[1].class_names_lisclass_metrics_listt[
                metric[1].class_names_lisclass_metrics_listt.length - 1
              ] + 1
            )
          });
        });
      });
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
.fdf {
  margin-top: 24px;
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
.aaas1 {
  text-align: left;
  display: inline-block;
  min-width: 300px;
}
.aaas2 {
  text-align: center;
  display: inline-block;
  width: 380px !important;
  min-width: 300px;
}
input[type="checkbox"] {
  transform: scale(1.5);
}
.dfdf {
  max-height: 200px;
  overflow: auto;
  margin-left: 5%;
  margin-right: 5%;

  text-align: left;
}
.qq1 {
  margin-left: 32px;
}
.rewq {
  text-align: center !important;
  color: red;
  margin-left: 32%;
  font-size: 1.5em;
}
.asdds {
  color: red;
  font-size: 1.4em;
}
</style>
