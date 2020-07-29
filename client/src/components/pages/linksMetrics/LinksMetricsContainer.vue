<template>
  <div>
    <div>
      <input type="checkbox" class="qq1" v-model="checkboxIncomingLinks" /> incoming links
      <input type="checkbox" class="qq1" v-model="checkboxOutgoingLinks" /> outgoing links
    </div>
    <div class="checkboxes__container">
      <CheckboxList
        class="checkboxes__list mb-12"
        ref="CheckboxMetricsList"
        @updateEnabledMetricNames="onUpdateEnabledVocabularyMetricNames"
      />
      <CheckboxList
        class="checkboxes__list mb-12"
        ref="CheckboxVocabulariesList"
        @updateEnabledMetricNames="onUpdateEnabledVocabularyNames"
      />
    </div>
    <div>
      <span class="text__warn">* logarithmic data</span>
      <div v-for="(data, ind) in preparedData" :key="data[0]">
        <allvocsMetricsvsLinks
          v-if="ind < $store.state.graphCount"
          :radar="data[1]"
          :name="data[0]"
          :scaleLabels="{x: 'links', y: data[0]}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import allvocsMetricsvsLinks from "./allvocs_metricsvslinks.vue";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "linksMetricsContainer",
  components: {
    allvocsMetricsvsLinks,
    CheckboxList
  },
  data() {
    return {
      vocabularyList: null,
      metricList: {},
      checkboxIncomingLinks: true,
      checkboxOutgoingLinks: false,
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: []
    };
  },
  watch: {
    checkboxIncomingLinks(v) {
      if (v) {
        this.checkboxOutgoingLinks = false;
        this.checkboxvalueallvoca2 = false;
      }
      this.changeLinks();
      this.$store.dispatch("fetchGraphCount", 5);
    },
    checkboxOutgoingLinks(v) {
      if (v) {
        this.checkboxIncomingLinks = false;
        this.checkboxvalueallvoca2 = false;
      }
      this.changeLinks();
      this.$store.dispatch("fetchGraphCount", 5);
    }
  },
  computed: {
    preparedData() {
      const preparedData = [];
      Object.entries(this.metricList).forEach(metric => {
        if (this.enabledVocabularyMetricNames.includes(metric[0])) {
          const arr = Object.entries(metric[1]).reduce((acc, vocabulary) => {
            if (this.enabledVocabularyNames.includes(vocabulary[0])) {
              acc.push(vocabulary[1]);
            }
            return acc;
          }, []);
          preparedData.push([metric[0], arr]);
        }
      });
      return preparedData;
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.voc_links = {};
    this.vocabularyList = new Object();
    this.$store.state.vocabularies.forEach(vocabulary => {
      if (
        !Object.prototype.hasOwnProperty.call(
          this.vocabularyList,
          vocabulary.name
        )
      ) {
        this.vocabularyList[vocabulary.name] = {
          metrics: {}
        };
        Object.keys(this.$store.state.vocabularies[0]).forEach(metric => {
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric)) {
            this.vocabularyList[vocabulary.name].metrics[metric] = {
              X: [],
              Y: []
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
        if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
          this.vocabularyList[vocabulary.name].metrics[metric[0]].X.push(
            vocabulary.version_name
          );
          this.vocabularyList[vocabulary.name].metrics[metric[0]].Y.push(
            metric[1]
          );
        }
      });
    });

    this.changeLinks();
    this.setCheckboxNames();
    this.setIsEnabledList();
  },
  methods: {
    changeLinks() {
      this.metricList = {};
      Object.keys(
        this.vocabularyList[Object.keys(this.vocabularyList)[0]].metrics
      ).forEach(metric1 => {
        this.metricList[metric1] = {};
      });

      Object.entries(this.vocabularyList).forEach(voc => {
        Object.entries(voc[1].metrics).forEach(metric => {
          this.metricList[metric[0]][voc[0]] = {
            x: Math.log(
              +(this.checkboxOutgoingLinks
                ? this.voc_links[voc[0]].outgoing_links
                : this.voc_links[voc[0]].incoming_links) + 1
            ),
            y: Math.log(+metric[1].Y[metric[1].Y.length - 1] + 1)
          };
        });
      });
    },
    onUpdateEnabledVocabularyMetricNames(enabledVocabularyMetricNames) {
      this.enabledVocabularyMetricNames = enabledVocabularyMetricNames;
      localStorage.setItem(
        "vocabularyMetrics_isEnabledList",
        JSON.stringify({ data: enabledVocabularyMetricNames })
      );
    },
    onUpdateEnabledVocabularyNames(enabledVocabularyNames) {
      this.enabledVocabularyNames = enabledVocabularyNames;
      localStorage.setItem(
        "vocabularyNames_isEnabledList",
        JSON.stringify({ data: enabledVocabularyNames })
      );
    },
    setIsEnabledList() {
      if (localStorage.getItem("vocabularyMetrics_isEnabledList") !== null) {
        let arr = JSON.parse(
          localStorage.getItem("vocabularyMetrics_isEnabledList")
        ).data;
        this.$store.state.vocabularyMetricNames.forEach(el => {
          if (arr.includes(el)) {
            this.$refs.CheckboxMetricsList.isEnabledList.push(true);
          } else {
            this.$refs.CheckboxMetricsList.isEnabledList.push(false);
          }
        });
        arr = JSON.parse(
          localStorage.getItem("vocabularyNames_isEnabledList")
        ).data;
        this.$store.state.vocabularyNames.forEach(el => {
          if (arr.includes(el)) {
            this.$refs.CheckboxVocabulariesList.isEnabledList.push(true);
          } else {
            this.$refs.CheckboxVocabulariesList.isEnabledList.push(false);
          }
        });
      } else {
        this.$store.state.vocabularyMetricNames.forEach(() => {
          this.$refs.CheckboxMetricsList.isEnabledList.push(true);
        });
        this.$store.state.vocabularyNames.forEach(() => {
          this.$refs.CheckboxVocabulariesList.isEnabledList.push(true);
        });
      }
    },
    setCheckboxNames() {
      this.$refs.CheckboxMetricsList.checkboxNames = this.$store.state.vocabularyMetricNames;
      this.$refs.CheckboxVocabulariesList.checkboxNames = this.$store.state.vocabularyNames;
    }
  }
};
</script>

