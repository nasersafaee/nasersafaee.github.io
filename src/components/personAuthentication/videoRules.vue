<template>
  <div>
    <Header />
    <div class="container-parent">
      <div>
        <div class="header-title">
          جهت تکمیل فرآیند احراز هویت، گوشی را مطابق تصویر زیر در حالت عمودی نگه
          دارید و به مدت ۵ ثانیه پس از فشردن دکمه به دوربین سلفی گوشی خود نگاه
          کنید
        </div>
        <img class="id-image" src="@/assets/img/videoRulesImage.svg" alt="" />
        <div>
          <button class="primary-butt" @click="goForRecord">
            بعدی
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../elements/header/header'
export default {
  components: {
    Header,
  },
  data() {
    return {}
  },
  methods: {
    goForRecord() {
      this.$router.push({ path: 'video-record' })
    },
  },
}
</script>

<style>
.container-parent {
  background-color: white !important;
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
}
.header {
  padding: 40px 0;
}
.header-title {
  text-align: center;
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 25px;
  color: #686868;
}
.id-image {
  display: block;
  margin: 16px auto 24px auto;
}
.primary-butt {
  background: #30bfb4;
  border-radius: 8px;
  height: 48px;
  width: 100%;
  font-family: IRANSans;
  color: white;
  box-shadow: none !important;
  border-color: white;
  border-style: solid;
}
</style>
