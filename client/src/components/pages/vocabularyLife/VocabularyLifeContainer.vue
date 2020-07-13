<template>
  <div>
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
      <div v-for="(data, ind) in preparedData" :key="data[0]">
        <ScatterPoints
          v-if="ind < $store.state.graphCount"
          :data="data[1]"
          :name="data[0]"
          :isDate="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ScatterPoints from "@/components/chartsVUE/ScatterPoints";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "VocabularyLife",
  components: {
    ScatterPoints,
    CheckboxList
  },
  data() {
    return {
      vocabularyList: {},
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: []
    };
  },
  computed: {
    preparedData() {
      return Object.entries(this.vocabularyList);
    }
  },
  watch: {
    enabledVocabularyMetricNames() {
      this.prepareData();
    },
    enabledVocabularyNames() {
      this.prepareData();
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.prepareData();
    this.setCheckboxNames();
    this.setIsEnabledList();
  },
  methods: {
    prepareData() {
      this.vocabularyList = new Object();
      Object.keys(this.$store.state.vocabularies[0]).forEach(metric => {
        if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric)) {
          if (!this.enabledVocabularyMetricNames.includes(metric)) return
          this.vocabularyList[metric] = {};
          this.vocabularyList[metric].data = [];
        }
      });
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (!this.enabledVocabularyNames.includes(vocabulary.name)) return
        Object.entries(vocabulary).forEach(metric => {
          if (!this.enabledVocabularyMetricNames.includes(metric[0])) return
          const date = new Date(vocabulary.version_name).getTime();
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
            this.vocabularyList[metric[0]].data.push({
              x: date,
              y: +metric[1]
            });
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

