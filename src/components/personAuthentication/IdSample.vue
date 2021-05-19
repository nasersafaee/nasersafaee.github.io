<template>
  <div>
    <Header />
    <div class="container-parent">
      <div>
        <div :style="{ display: pageStatus }">
          <div class="header-title">
            گوشی تلفن را مطابق تصویر زیر در حالت عمودی نگه دارید و از کارت ملی
            یا گواهینامه رانندگی خود عکس بگیرید
          </div>
          <img class="id-image" src="@/assets/img/idCardSample.svg" alt="" />
          <div>
            <button class="primary-butt" @click="$refs.fileInput.click()">
              بعدی
            </button>
          </div>
          <input
            style="display: none"
            type="file"
            accept="image/*"
            capture
            @change="onFileSelected"
            ref="fileInput"
          />
        </div>
        <div :style="{ display: imagePreview }">
          <div class="image-preview-container">
            <img class="pre-image" :src="imageUrl" alt="captured-image" />
            <div class="spinner-container">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
          </div>
          <div class="uploading-message">
            در حال آپلود فایل {{ uploadedPercentage }}%
          </div>
          <b-alert
            v-model="errorAlert"
            class="alert-popUp"
            variant="danger"
            dismissible
            >خطایی رخ داده است
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../elements/header/header'
import axios from 'axios'

export default {
  components: {
    Header,
  },
  data() {
    return {
      selectedFile: [],
      pageStatus: 'block',
      imageUrl: '',
      imagePreview: 'none',
      uploadedPercentage: 0,
      errorAlert: false,
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.imagePreview = 'block'
      this.imageUrl = URL.createObjectURL(this.selectedFile)
      this.pageStatus = 'none'
      this.onUpload()
    },
    onUpload() {
      setTimeout(() => {
        const fd = new FormData()
        fd.append('picture', this.selectedFile)
        axios
          .post(
            'https://dev.cloudware.ir/BitbargIdentity/api/Authentication/UploadPicture',
            fd,
            {
              onUploadProgress: (uploadEvent) => {
                this.uploadedPercentage = Math.round(
                  (uploadEvent.loaded / uploadEvent.total) * 100,
                )
              },
            },
          )
          .then(() => {
            this.$router.push({ path: '/video-rules' })
          })
          .catch(() => {
            this.errorAlert = true
            setTimeout(() => {
              window.location.href =
                'https://bitpay.cloudbuilder.ir/action?key=value#data'
            }, 3000)
          })
      }, 2000)
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
.image-preview-container {
  width: 100%;
  height: 430px;
  padding: 10px;
  border: 1px dashed gray;
  border-radius: 15px;
  position: relative;
}
.pre-image {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  opacity: 0.5;
}
.uploading-message {
  display: block;
  text-align: center;
  font-family: IRANSans;
  font-size: 14px;
  margin-top: 20px;
}
.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
  background-color: white;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-popUp {
  min-width: 320px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: right;
  font-family: IRANSans;
}
</style>
