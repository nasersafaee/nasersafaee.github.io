<template>
  <div class="d-flex">
    <button
      class="btn d-flex align-items-center justify-content-between linear text-white primary-button"
      :class="className"
      :disabled="disabled"
    >
      <div v-if="arrowVisible"></div>
      <div class="text">{{ title }}</div>
      <div v-if="arrowVisible">
        <img src="@/assets/img/forwardarrowwhite.svg" />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'primary-button',
  props: {
    title: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    arrowVisible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
* {
  padding: 0;
}
.primary-button {
  background: #30bfb4;
  border-radius: 8px;
  height: 48px;
  width: 100%;
  font-family: IRANSans;
}
button {
  width: 100%;
}
button div {
  flex: 1;
}
.text {
  flex: 2;
  color: white;
}
</style>
