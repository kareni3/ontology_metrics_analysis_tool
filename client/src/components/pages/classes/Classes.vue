<template>
  <div class="charts">
    <div class="checkboxes__container">
      <CheckboxList
        class="mb-12"
        ref="CheckboxList"
        :inline="false"
        @updateEnabledMetricNames="onUpdateEnabledMetricNames"
      />
      <div class="checkbox__container mb-12">
        <input type="checkbox" v-model="checkboxEqualizeY" /> Equalize Y axes of charts
      </div>
      <div class="checkbox__container mb-12">
        <input type="checkbox" v-model="checkboxAllVocabulariesTogether" /> All vocabularies on one chart
      </div>
    </div>
    <div v-if="!checkboxAllVocabulariesTogether">
      <RawMetrics
        :maxMetricValue="maxMetricValue"
        :maxVocabularyLocalMetricValue="maxVocabularyLocalMetricValue"
        :checkboxEqualizeY="checkboxEqualizeY"
        :enabledMetricNames="enabledMetricNames"
        :vocabularyList="vocabularyList"
      />
    </div>
    <div v-else>
      <AllVocabulariesTogether :vocabularyList="vocabularyList" />
    </div>
  </div>
</template>

<script>
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import AllVocabulariesTogether from "@/components/pages/classes/allVocabulariesTogether/AllVocsTogetherChartsContainer";
import RawMetrics from "@/components/pages/classes/rawMetrics/RawMetricsChartsContainer";
import { CLASS_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "Classes",

  components: {
    CheckboxList,
    AllVocabulariesTogether,
    RawMetrics
  },

  data() {
    return {
      vocabularyList: null,
      maxMetricValue: {},
      maxVocabularyLocalMetricValue: {},
      checkboxEqualizeY: false,
      checkboxAllVocabulariesTogether: false,
      enabledMetricNames: []
    };
  },

  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.createVocabularyList();
    this.fillvocabularyListWithData();
    this.setIsEnabledList();
    this.$refs.CheckboxList.checkboxNames = this.$store.state.classMetricNames;
  },

  methods: {
    onUpdateEnabledMetricNames(enabledMetricNames) {
      this.enabledMetricNames = enabledMetricNames;
      localStorage.setItem(
        "class_isEnabledList",
        JSON.stringify({ data: enabledMetricNames })
      );
    },
    fillvocabularyListWithData() {
      this.$store.state.classes.forEach(cclass => {
        let vocabulary = this.$store.state.vocabularies.find(
          voc =>
            voc.name === cclass.vocabulary_name &&
            voc.version === cclass.vocabulary_version_number
        );
        if (!vocabulary) return
        Object.keys(
          this.vocabularyList[vocabulary.name].versions[vocabulary.version_name]
            .metrics
        ).forEach(metric => {
          this.pushClassMetrics(vocabulary, cclass, metric);
          this.setMaxMetricValue(cclass, metric);
          this.setMaxVocabularyLocalMetricValue(vocabulary, cclass, metric);
        });
      });
    },
    setIsEnabledList() {
      if (localStorage.getItem("class_isEnabledList") !== null) {
        const arrNames = JSON.parse(localStorage.getItem("class_isEnabledList"))
          .data;
        this.$store.state.classMetricNames.forEach(el => {
          if (arrNames.includes(el)) {
            this.$refs.CheckboxList.isEnabledList.push(true);
          } else {
            this.$refs.CheckboxList.isEnabledList.push(false);
          }
        });
      } else {
        this.$store.state.classMetricNames.forEach(() => {
          this.$refs.CheckboxList.isEnabledList.push(true);
        });
      }
    },
    setMaxMetricValue(cclass, metric) {
      if (this.maxMetricValue[metric] === undefined) {
        this.maxMetricValue[metric] = 0;
      }
      if (this.maxMetricValue[metric] < +cclass[metric]) {
        this.maxMetricValue[metric] = +cclass[metric];
      }
    },
    setMaxVocabularyLocalMetricValue(vocabulary, cclass, metric) {
      const name = vocabulary.name;
      if (this.maxVocabularyLocalMetricValue[name] === undefined) {
        this.maxVocabularyLocalMetricValue[name] = {};
      }
      if (this.maxVocabularyLocalMetricValue[name][metric] === undefined) {
        this.maxVocabularyLocalMetricValue[name][metric] = 0;
      }
      if (this.maxVocabularyLocalMetricValue[name][metric] < +cclass[metric]) {
        this.maxVocabularyLocalMetricValue[name][metric] = +cclass[metric];
      }
    },
    pushClassMetrics(vocabulary, cclass, metric) {
      this.vocabularyList[vocabulary.name].versions[
        vocabulary.version_name
      ].metrics[metric].X.push(cclass.name);
      this.vocabularyList[vocabulary.name].versions[
        vocabulary.version_name
      ].metrics[metric].Y.push(cclass[metric]);
    },
    createVocabularyList() {
      this.vocabularyList = new Object();
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (
          !Object.prototype.hasOwnProperty.call(
            this.vocabularyList,
            vocabulary.name
          )
        ) {
          this.vocabularyList[vocabulary.name] = {
            vocabulary_name: vocabulary.name,
            versions: new Object()
          };
        }
        this.vocabularyList[vocabulary.name].versions[
          vocabulary.version_name
        ] = {
          vocabulary_id: vocabulary.id,
          metrics: {}
        };
        Object.keys(this.$store.state.classes[0]).forEach(metricName => {
          if (CLASS_SPECIAL_COLUMNS.includes(metricName)) return;
          this.vocabularyList[vocabulary.name].versions[
            vocabulary.version_name
          ].metrics[metricName] = {
            X: [],
            Y: []
          };
        });
      });
    }
  }
};
</script>