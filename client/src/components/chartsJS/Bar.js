import { Bar, mixins } from 'vue-chartjs'
import chartMixin from './mixins/chartMixin.js'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp, chartMixin],
}