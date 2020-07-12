import { Line, mixins } from 'vue-chartjs'
import chartMixin from './mixins/chartMixin.js'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp, chartMixin],
}