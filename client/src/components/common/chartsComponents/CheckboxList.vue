<template>
  <div class="checkbox_list">
    <div class="checkbox__container mb-12" :class="!inline && 'checkbox__container--block'">
      <input type="checkbox" v-model="isAllEnabled" /> All
    </div>
    <div class="checkbox__list">
      <div
        class="checkbox__container"
        :class="!inline && 'checkbox__container--block'"
        v-for="(checkboxName,i) in checkboxNames"
        :key="checkboxName"
      >
        <input class="checkbox" type="checkbox" v-model="isEnabledList[i]" />
        {{checkboxName}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxList",
  data() {
    return {
      checkboxNames: [],
      isEnabledList: [],
      isAllEnabled: true
    };
  },
  props: {
    inline: {
      default: true
    }
  },
  watch: {
    isAllEnabled(v) {
      this.isEnabledList = this.checkboxNames.map(() => v);
    },
    isEnabledList(v) {
      const enabledMetricNames = this.checkboxNames.filter(
        (checkboxName, ind) => {
          return v[ind];
        }
      );
      this.$emit("updateEnabledMetricNames", enabledMetricNames);
    }
  }
};
</script>

<style scoped>
.checkbox_list {
  border: 1px solid rgba(30, 142, 255, 0.2);
  padding: 12px;
}
</style>