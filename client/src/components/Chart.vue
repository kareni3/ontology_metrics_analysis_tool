<template>
  <div class="chart">
    <Bar :chart-data="datacollection"></Bar>
  </div>
</template>

<script>
import Bar from './Bar.js'

export default {
  name: 'Chart3',
  data() {
    return {
      datacollection: null,
    };
  },
  components: {
    Bar
  },
  props: ['classOption'],
  mounted () {
    this.datacollection = {
          labels: [
            "Classchildrencount",
            "Classconnectivity",
            "Classfulness",
            "Classimportance",
            "Classinheritancerichness",
            "Classinstancescount",
            "Classpropertiescount",
            "Classreadability",
            "Classrelationshiprichness",
          ],
          datasets: [
            {
              label: "sad",
              data: [1,2,3,4,5,6,7,8],
            }, 
          ]
        }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
