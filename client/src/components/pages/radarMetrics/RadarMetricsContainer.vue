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
    <div>
      <radars
        v-if="Object.keys(preparedData).length"
        :list="enabledVocabularyMetricNames"
        :radar="preparedData"
      />
    </div>
  </div>
</template>

<script>
import radars from "./radars.vue";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "RadarMetricsContainer",
  components: {
    radars,
    CheckboxList
  },
  data() {
    return {
      radar: {},
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: []
    };
  },
  computed: {
    preparedData() {
      let preparedData = {};
      Object.entries(this.radar).forEach(vocabulary => {
        if (this.enabledVocabularyNames.includes(vocabulary[0]))
          preparedData[vocabulary[0]] = vocabulary[1];
      });
      return preparedData;
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    const vocabularyList = new Object();
    this.$store.state.vocabularies.forEach(vocabulary => {
      if (
        !Object.prototype.hasOwnProperty.call(vocabularyList, vocabulary.name)
      ) {
        vocabularyList[vocabulary.name] = {
          metrics: {}
        };
        Object.keys(this.$store.state.vocabularies[0]).forEach(metric => {
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric)) {
            vocabularyList[vocabulary.name].metrics[metric] = {
              X: [],
              Y: []
            };
          }
        });
      }

      Object.entries(vocabulary).forEach(metric => {
        if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
          vocabularyList[vocabulary.name].metrics[metric[0]].X.push(
            vocabulary.version_name
          );
          vocabularyList[vocabulary.name].metrics[metric[0]].Y.push(metric[1]);
        }
      });
    });

    this.radar = Object.entries(vocabularyList).reduce(
      (accumulator, currentVocabulary) => {
        let name_list = [];
        let metric_list = [];
        Object.entries(currentVocabulary[1].metrics).forEach(metric => {
          name_list.push(metric[0]);
          metric_list.push(Math.log(+metric[1].Y[metric[1].Y.length - 1] + 1));
        });
        accumulator[currentVocabulary[0]] = {
          Y: metric_list,
          X: name_list
        };
        return accumulator;
      },
      {}
    );
    this.setCheckboxNames();
    this.setIsEnabledList();
  },
  methods: {
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
