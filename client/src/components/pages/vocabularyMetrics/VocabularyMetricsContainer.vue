<template>
  <div class="charts">
    <div class="scoped-1 scoped-4">
      <input type="checkbox" v-model="checkboxvalueallvoca" /> all vocabularies on one graph
    </div>
    <div v-if="checkboxvalueallvoca" class="scoped-2 scoped-4">
      <input type="checkbox" class="scoped-3" v-model="checkboxvalueallvoca2" /> year
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

    <div v-if="checkboxvalueallvoca && !checkboxvalueallvoca2">
      <AllVocsTogetherLife
        :vocabularyList="vocabularyList"
        :enabledVocabularyMetricNames="enabledVocabularyMetricNames"
        :enabledVocabularyNames="enabledVocabularyNames"
      />
    </div>
    <div v-else-if="checkboxvalueallvoca && checkboxvalueallvoca2">
      <AllVocsTogetherTimeLine
        :vocabularyList="vocabularyList"
        :enabledVocabularyMetricNames="enabledVocabularyMetricNames"
        :enabledVocabularyNames="enabledVocabularyNames"
      />
    </div>
    <div v-else-if="!checkboxvalueallvoca">
      <SingleVocabularyLife
        v-if="vocabularyList"
        :enabledVocabularyMetricNames="enabledVocabularyMetricNames"
        :vocabularyList="vocabularyList"
      />
    </div>
  </div>
</template>

<script>
import SingleVocabularyLife from "./SingleVocabularyLife.vue";
import AllVocsTogetherLife from "./life/AllVocsTogetherLife.vue";
import AllVocsTogetherTimeLine from "./timeline/AllVocsTogetherTimeLine.vue";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "VocabularyMetricsContainer",
  components: {
    SingleVocabularyLife,
    AllVocsTogetherLife,
    AllVocsTogetherTimeLine,
    CheckboxList
  },
  data() {
    return {
      vocabularyList: null,
      checkboxvalueallvoca2: false,
      checkboxvalueallvoca: false,
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: []
    };
  },
  watch: {
    checkboxvalueallvoca2() {
      this.$store.dispatch("fetchGraphCount", 5);
    },
    checkboxvalueallvoca() {
      this.$store.dispatch("fetchGraphCount", 5);
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.setVocabularyList();
    this.setCheckboxNames();
    this.setIsEnabledList();
  },
  methods: {
    setVocabularyList() {
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
                Y: [],
                weights: [],
              };
            }
          });
        }

        Object.entries(vocabulary).forEach(metric => {
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
            this.vocabularyList[vocabulary.name].metrics[metric[0]].X.push(
              vocabulary.version_name
            );
            this.vocabularyList[vocabulary.name].metrics[metric[0]].Y.push(
              metric[1]
            );
            this.vocabularyList[vocabulary.name].metrics[metric[0]].weights.push(
              vocabulary.period
            );
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

<style scoped>
.scoped-4 {
  display: block !important;
  margin-left: 10%;
  margin-bottom: 12px;
}
.scoped-1 {
  text-align: left;
  display: inline-block;
  width: 380px !important;
  min-width: 300px;
}
.scoped-2 {
  text-align: left;
  display: inline-block;
  min-width: 300px;
}
.scoped-3 {
  margin-left: 32px;
}
</style>
