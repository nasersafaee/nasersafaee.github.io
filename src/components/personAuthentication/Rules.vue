<template>
  <div>
    <Header />
    <div class="container-parent">
      <div>
        <img class="auth-logo" src="@/assets/img/authRulesLogo.svg" alt="" />
        <div class="page-title">فرآیند احراز هویت خود را تکمیل نمایید</div>
        <div class="page-description">
          احراز هویت در بیت برگ بعد از اولین خرید برای شما فعال میشود، و فرآیند
          احراز همه روزه حتی در ایام تعطیل در ساعات ۸:۰۰ صبح تا ۱۷:۰۰ توسط
          کارشناسان تیم احراز بررسی می گردد.
        </div>
        <div class="rules-title">مدارک و شرایط مورد نیاز:</div>
        <div class="page-rules">
          <div>1) سیمکارت باید بنام خودتان باشد.</div>
          <div>2) ارسال تصویر کارت ملی یا گواهینامه رانندگی.</div>
          <div>3) ارسال ویدئوی ۵ ثانیه ای از چهره خودتان .</div>
          <div>4) داشتن سن ۱۸ سال به بالا و کمتر از ۶۰ سال.</div>
        </div>
        <router-link to="/id-sample">
          <div class="route-button">
            <Button title="احراز هویت" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../elements/header/header'
import Button from '../../elements/button/Button'
import { setToken } from '../../services/jwt'
import API from '../../services/api'
export default {
  components: {
    Button,
    Header,
  },
  beforeCreate() {
    const token = this.$route.query.token
    setToken(token)
    API.addAuthorizationHeader()
  },
}
</script>

<style scoped lang="scss">
.container-parent {
  background-color: white !important;
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
}

.header {
  padding: 40px 0;
}
.auth-logo {
  display: block;
  margin: 0 auto 20px auto;
}
.page-title {
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #eb4137;
}
.page-description {
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: justify;
  color: #686868;
  margin-top: 20px;
  line-height: 25px;
}
.rules-title {
  font-family: IRANSans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
  color: #5d4e7b;
  margin: 30px 0;
}
.page-rules {
  font-family: IRANSans;
  text-align: right;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #686868;
  line-height: 25px;
}
.route-button {
  margin-top: 50px;
}
</style>
