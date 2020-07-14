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
    maxVersion: 100,
    incomingLinks: {
      min: 0,
      max: 1000,
    },
    outgoingLinks: {
      min: 0,
      max: 1000,
    },
    yearsOfLife: {
      min: '1970-01-01',
      max: '2030-01-01',
    },
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
    fetchMaxVersion(state, maxVersion) {
      state.maxVersion = maxVersion;
    },
    fetchIncomingLinks(state, incomingLinks) {
      state.incomingLinks = Object.assign({}, state.incomingLinks, incomingLinks)
    },
    fetchOutgoingLinks(state, outgoingLinks) {
      state.outgoingLinks = Object.assign({}, state.outgoingLinks, outgoingLinks)
    },
    fetchYearsOfLife(state, yearsOfLife) {
      state.yearsOfLife = Object.assign({}, state.yearsOfLife, yearsOfLife)
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
    async fetchClasses({ commit }, data) {
      const res = await mainApi.getClasses(data.minVersion, data.maxVersion, data.incomingLinks, data.outgoingLinks, data.yearsOfLife);
      const classMetricNames = [];
      if (res.classes[0]) Object.keys(res.classes[0]).forEach(metricName => {
        if (CLASS_SPECIAL_COLUMNS.includes(metricName)) return;
        classMetricNames.push(metricName)
      })
      if (data.minVersion) commit('fetchMinVersion', data.minVersion);
      if (data.maxVersion) commit('fetchMaxVersion', data.maxVersion);
      if (data.incomingLinks) commit('fetchIncomingLinks', data.incomingLinks);
      if (data.outgoingLinks) commit('fetchOutgoingLinks', data.outgoingLinks);
      if (data.yearsOfLife) commit('fetchYearsOfLife', data.yearsOfLife);
      commit('fetchClasses', res.classes);
      commit('fetchClassMetricNames', classMetricNames);
    },
    async fetchVocabularies({ commit }, data) {
      const res = await mainApi.getVocabularies(data.minVersion, data.maxVersion, data.incomingLinks, data.outgoingLinks, data.yearsOfLife);
      const vocabularyNames = []
      if (res.vocabularies[0]) res.vocabularies.forEach(vocabulary => {
        if (!vocabularyNames.includes(vocabulary.name)) vocabularyNames.push(vocabulary.name);
      })
      const vocabularyMetricNames = [];
      if (res.vocabularies[0]) Object.keys(res.vocabularies[0]).forEach(metricName => {
        if (VOCABULARY_SPECIAL_COLUMNS.includes(metricName)) return;
        vocabularyMetricNames.push(metricName)
      })
      if (data.minVersion) commit('fetchMinVersion', data.minVersion);
      if (data.maxVersion) commit('fetchMaxVersion', data.maxVersion);
      if (data.incomingLinks) commit('fetchIncomingLinks', data.incomingLinks);
      if (data.outgoingLinks) commit('fetchOutgoingLinks', data.outgoingLinks);
      if (data.yearsOfLife) commit('fetchYearsOfLife', data.yearsOfLife);
      commit('fetchVocabularies', res.vocabularies);
      commit('fetchVocabularyNames', vocabularyNames);
      commit('fetchVocabularyMetricNames', vocabularyMetricNames);
    },
  }
})

export default store;