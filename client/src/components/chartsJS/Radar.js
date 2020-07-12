import { Radar, mixins } from 'vue-chartjs'
import chartMixin from './mixins/chartMixin.js'
const { reactiveProp } = mixins

export default {
  extends: Radar,
  mixins: [reactiveProp, chartMixin],
}