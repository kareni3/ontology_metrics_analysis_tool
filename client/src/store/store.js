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
  }
})

export default store;