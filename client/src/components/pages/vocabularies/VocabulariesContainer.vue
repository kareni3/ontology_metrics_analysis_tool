<template>
  <div class="charts">
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
    <ChartList v-if="isTimeout" :name="'All Vocabularies'" :dataList="preparedDataList" />
  </div>
</template>

<script>
import ChartList from "@/components/chartsVUE/ChartList.vue";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "VocabulariesContainer",
  components: {
    ChartList,
    CheckboxList
  },
  data() {
    return {
      metricList: {},
      isTimeout: true,
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: []
    };
  },
  watch: {
    enabledVocabularyNames() {
      this.setMetricList();
    },
    preparedDataList() {
      this.isTimeout = false;
      setTimeout(() => {
        this.isTimeout = true;
      }, 0);
    }
  },
  computed: {
    preparedDataList() {
      let metricList = new Object();
      Object.entries(this.metricList).forEach(metric => {
        if (this.enabledVocabularyMetricNames.includes(metric[0])) {
          metricList[metric[0]] = metric[1];
        }
      });
      return metricList;
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.setMetricList();
    this.setCheckboxNames();
    this.setIsEnabledList();
  },
  methods: {
    setMetricList() {
      this.metricList = new Object();
      Object.keys(this.$store.state.vocabularies[0]).forEach(metric => {
        if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric)) {
          this.metricList[metric] = {
            X: [],
            Y: []
          };
        }
      });
      let versions = {};
      this.$store.state.vocabularies.forEach(vocabulary => {
        Object.entries(vocabulary).forEach(metric => {
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
            if (!this.enabledVocabularyNames.includes(vocabulary.name)) return;
            let index = this.metricList[metric[0]].X.indexOf(vocabulary.name);
            if (index === -1) {
              this.metricList[metric[0]].X.push(vocabulary.name);
              this.metricList[metric[0]].Y.push(metric[1]);
              versions[metric[0]] = {}
              versions[metric[0]][vocabulary.name] = +vocabulary.version;
            } else if (+vocabulary.version > versions[metric[0]][vocabulary.name]) {
              versions[metric[0]][vocabulary.name] = +vocabulary.version;
              this.metricList[metric[0]].Y[index] = metric[1];
            }
          }
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
        arr = JSON.parse(localStorage.getItem("vocabularyNames_isEnabledList"))
          .data;
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