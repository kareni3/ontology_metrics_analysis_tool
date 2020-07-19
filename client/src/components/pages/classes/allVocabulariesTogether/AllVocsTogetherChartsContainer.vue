<template>
  <div>
    <div v-for="metrics in Object.entries(classMetricsOnOneGraph)" :key="metrics[0]">
      <ChartClassForAllVocs :metrics="metrics[1]" :name="metrics[0]" />
    </div>
  </div>
</template>

<script>
import ChartClassForAllVocs from "./AllVocsTogetherSingleChart";
import { CLASS_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "AllVocabulariesTogetherComponent",
  components: {
    ChartClassForAllVocs
  },
  data() {
    return {
      classMetricsOnOneGraph: {}
    };
  },
  props: {
    vocabularyList: {},
  },
  mounted() {
    this.classMetricsOnOneGraph = {};
    Object.keys(this.$store.state.classes[0]).forEach(metricName => {
      if (CLASS_SPECIAL_COLUMNS.includes(metricName)) return;
      this.classMetricsOnOneGraph[metricName] = {
        // for calculation
        _versionList: {},
        // names, last versions: average not null
        metricsList: {},
        // {
        //   filledNumber: 0,
        //   emptyNumber: 0
        // }
        fullness: {}
      };
    });

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
        if (
          !this.classMetricsOnOneGraph[metric]._versionList[vocabulary.name] ||
          vocabulary.version_name >
            this.classMetricsOnOneGraph[metric]._versionList[vocabulary.name]
        ) {
          this.classMetricsOnOneGraph[metric]._versionList[vocabulary.name] =
            vocabulary.version_name;
          this.classMetricsOnOneGraph[metric].metricsList[vocabulary.name] = [];
          this.classMetricsOnOneGraph[metric].fullness[vocabulary.name] = {
            filledNumber: 0,
            emptyNumber: 0
          };
        }

        if (+cclass[metric]) {
          this.classMetricsOnOneGraph[metric].metricsList[vocabulary.name].push(
            +cclass[metric]
          );
          this.classMetricsOnOneGraph[metric].fullness[vocabulary.name]
            .filledNumber++;
        } else {
          this.classMetricsOnOneGraph[metric].fullness[vocabulary.name]
            .emptyNumber++;
        }
      });
    });
  }
};
</script>