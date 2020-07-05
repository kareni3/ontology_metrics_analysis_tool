import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    transparency: {
        background: '07',
        line: 'd0',
    },
    legend: true,
    averageMetrics: true,
    graphCount: 5,
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
  }
})

export default store;