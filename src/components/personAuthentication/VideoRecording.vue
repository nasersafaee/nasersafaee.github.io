<template>
  <div>
    <Header />
    <div>
      <b-container>
        <div v-if="isCameraOpen" class="camera-box">
          <video
            ref="camera"
            :width="320"
            :height="489"
            autoplay
            src=""
          ></video>
        </div>
        <div class="recording-butt"></div>
        <div v-if="recording" class="counter">00:0{{ sec }}</div>
        <div v-else class="uploading-message">
          در حال آپلود فایل {{ uploadedPercentage }}%
        </div>
        <b-alert
          v-model="errorAlert"
          class="alert-popUp"
          variant="danger"
          dismissible
          >{{ alertMsg }}
        </b-alert>
        <b-modal
          hide-header
          hide-footer
          no-close-on-backdrop
          no-close-on-esc
          centered
          v-model="modalStatus"
        >
          <div class="main-container">
            <img class="img-success" src="@/assets/img/checked.svg" />
            <div class="title">مدارک شما با موفقیت ارسال شد</div>
            <div class="text">
              لازم به توضیح است که تصاویر ارسالی شما همه روزه به غیر از ایام
              تعطیل توسط کارشناسان بخش احراز هویت بررسی میشود و نتیجه بررسی از
              طریق پیامک خدمت شما اعلام خواهد شد.
            </div>
            <div class="subtitle">از صبر و شکیبایی شما سپاسگزاریم</div>
            <div @click="goToHome">
              <Button title="متوجه شدم" class="su-btn" />
            </div>
          </div>
        </b-modal>
      </b-container>
    </div>
  </div>
</template>

<script>
import Button from '../../elements/button/Button'
import Header from '../../elements/header/header'
import axios from 'axios'
import API from '../../services/api'
export default {
  components: {
    Button,
    Header,
  },
  data() {
    return {
      isCameraOpen: false,
      modalStatus: false,
      sec: 5,
      uploadedPercentage: 0,
      recording: true,
      errorAlert: false,
      alertMsg: '',
      globalStream: null,
    }
  },
  mounted() {
    this.isCameraOpen = true
    this.createCameraElement()
  },
  methods: {
    countDownTimer() {
      if (this.sec > 0) {
        setTimeout(() => {
          this.sec -= 1
          this.countDownTimer()
        }, 1000)
      }
    },
    goToHome() {
      this.modalStatus = false
      this.stopStream()
      window.location.href =
        'https://bitpay.cloudbuilder.ir/action?key=value#data'
    },
    stopStream() {
      if (this.globalStream.active) {
        var track = this.globalStream.getTracks()[0] // if only one media track
        track.stop()
      }
    },
    createCameraElement() {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: { facingMode: 'user' },
        })
        .then((stream) => {
          this.globalStream = stream
          this.$refs.camera.srcObject = stream
          const mediaRecorder = new MediaRecorder(stream)
          mediaRecorder.start()
          this.countDownTimer()
          setTimeout(() => {
            mediaRecorder.stop()
            this.recording = false
          }, 5000)
          mediaRecorder.addEventListener('dataavailable', (event) => {
            const blobFile = new File([event.data], 'movie.mpeg')
            const fd = new FormData()
            fd.append('movie', blobFile)
            axios
              .post(
                'https://dev.cloudware.ir/BitbargIdentity/api/Authentication/UploadMovie',
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
                this.modalStatus = true
                window.localStorage.removeItem('token')
                API.removeAuthorizationHeader()
              })
              .catch(() => {
                window.localStorage.removeItem('token')
                API.removeAuthorizationHeader()
                this.alertMsg = 'خطایی رخ داده است'
                this.errorAlert = true
                setTimeout(() => {
                  window.location.href =
                    'https://bitpay.cloudbuilder.ir/action?key=value#data'
                }, 3000)
              })
          })
        })
        .catch(() => {
          this.alertMsg = 'دسترسی به دوربین وجود ندارد'
          this.errorAlert = true
          setTimeout(() => {
            window.location.href =
              'https://bitpay.cloudbuilder.ir/action?key=value#data'
          }, 3000)
        })
    },
  },
}
</script>

<style>
.header {
  padding: 40px 0;
}
.camera-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  position: relative;
}
.main-container {
  width: 288px;
  padding: 16px;
  text-align: center;
  margin: 0 auto;
}
.img-success {
  display: block;
  margin: 0 auto;
  width: 65px;
  height: 65px;
}
.title {
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 16px 0 8px 0;
  color: #5d4e7b;
}
.text {
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #686868;
}
.subtitle {
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #30bfb4;

  margin: 8px 0 30px 0;
}
.counter {
  margin-right: 50px;
  text-align: center;
  position: absolute;
  top: 510px;
  left: 50%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.47);
  padding: 8px 10px;
  transform: translateX(-145px);
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-family: IRANSans;
}
.recording-butt {
  position: absolute;
  top: 513px;
  left: 50%;
  z-index: 100;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #eb4137;
  transform: translateX(-50%);
  border: 2px solid black;
}
.uploading-message {
  display: block;
  text-align: center;
  font-family: IRANSans;
  font-size: 14px;
  margin-top: 20px;
}
.alert-popUp {
  min-width: 320px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: IRANSans;
  text-align: right;
}
</style>
