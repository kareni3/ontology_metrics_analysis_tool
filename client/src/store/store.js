import Vue from 'vue'
import Vuex from 'vuex'
import mainApi from "@/api/mainApi"
import { CLASS_SPECIAL_COLUMNS, VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    classes: [],
    classMetricNames: [],
    vocabularies: [],
    vocabularyNames: [],
    minVersion: 1,
    vocabularyMetricNames: [],
    transparency: {
        background: '07',
        line: 'd0',
    },
    legend: true,
    averageMetrics: true,
    graphCount: 5,
    lineWidth: 1,
  },
  mutations: {
    fetchTransparency(state, transparency) {
      state.transparency = transparency;
    },
    fetchLegend(state, legend) {
      state.legend = legend;
    },
    fetchAverageMetrics(state, averageMetrics) {
      state.averageMetrics = averageMetrics;
    },
    fetchGraphCount(state, graphCount) {
      state.graphCount = graphCount;
    },
    fetchClasses(state, classes) {
      state.classes = classes;
    },
    fetchVocabularies(state, vocabularies) {
      state.vocabularies = vocabularies;
    },
    fetchVocabularyNames(state, vocabularyNames) {
      state.vocabularyNames = vocabularyNames;
    },
    fetchVocabularyMetricNames(state, vocabularyMetricNames) {
      state.vocabularyMetricNames = vocabularyMetricNames;
    },
    fetchClassMetricNames(state, classMetricNames) {
      state.classMetricNames = classMetricNames;
    },
    fetchMinVersion(state, minVersion) {
      state.minVersion = minVersion;
    },
    fetchLineWidth(state, width) {
      state.lineWidth = width;
    },
  },
  actions: {
    fetchTransparency({ commit }, transparency) {
      commit('fetchTransparency', transparency);
    },
    fetchLegend({ commit }, legend) {
      commit('fetchLegend', legend);
    },
    fetchAverageMetrics({ commit }, averageMetrics) {
      commit('fetchAverageMetrics', averageMetrics);
    },
    fetchGraphCount({ commit }, graphCount) {
      commit('fetchGraphCount', graphCount);
    },
    fetchLineWidth({ commit }, width) {
      commit('fetchLineWidth', width);
    },
    async fetchClasses({ commit }, minVersion) {
      const data = await mainApi.getClasses(minVersion);
      const classMetricNames = [];
      Object.keys(data.classes[0]).forEach(metricName => {
        if (CLASS_SPECIAL_COLUMNS.includes(metricName)) return;
        classMetricNames.push(metricName)
      })
      if (minVersion) commit('fetchMinVersion', minVersion);
      commit('fetchClasses', data.classes);
      commit('fetchClassMetricNames', classMetricNames);
    },
    async fetchVocabularies({ commit }, minVersion) {
      const data = await mainApi.getVocabularies(minVersion);
      const vocabularyNames = []
      data.vocabularies.forEach(vocabulary => {
        if (!vocabularyNames.includes(vocabulary.name)) vocabularyNames.push(vocabulary.name);
      })
      const vocabularyMetricNames = [];
      Object.keys(data.vocabularies[0]).forEach(metricName => {
        if (VOCABULARY_SPECIAL_COLUMNS.includes(metricName)) return;
        vocabularyMetricNames.push(metricName)
      })
      if (minVersion) commit('fetchMinVersion', minVersion);
      commit('fetchVocabularies', data.vocabularies);
      commit('fetchVocabularyNames', vocabularyNames);
      commit('fetchVocabularyMetricNames', vocabularyMetricNames);
    },
  }
})

export default store;