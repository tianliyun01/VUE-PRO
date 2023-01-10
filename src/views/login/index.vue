<template>
  <div class="login-container">
    <div class="login-con">
      <img src="../../assets/images/login_con_left.png" class="login_con_left">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <div class="login_ciri">
          <div class="img_ciri" />
          <h3 class="login_word">统一登录平台</h3>
        </div>

        <el-form-item prop="userCode">
          <!-- <span class="svg-container">
            <svg-icon icon-class="user" />
          </span> -->
          <el-input
            ref="userCode"
            v-model="loginForm.userCode"
            placeholder="userCode"
            name="userCode"
            type="text"
            tabindex="1"
            autocomplete="on"
          >
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </el-input>
        </el-form-item>

        <el-form-item prop="passWord">
          <el-input
            :key="passwordType"
            ref="passWord"
            v-model="loginForm.passWord"
            :type="passwordType"
            placeholder="passWord"
            name="passWord"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >
            <span slot="prefix" class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="pictureCode">
          <div v-if="true" class="login-verifyCode">
            <el-input
              ref="pictureCode"
              v-model="loginForm.pictureCode"
              name="pictureCode"
              class="login-verify-input"
            >
              <span slot="prefix" class="svg-container">
                <svg-icon icon-class="password" />
              </span>
            </el-input>
            <img
              class="login-verifycode-img"
              style="width: 144px; height: 40px"
              :src="verifyimg"
              @click="refreshVerifyCode()"
            >
          </div>
        </el-form-item>
        <el-form-item prop="emailCode">
          <div v-if="true" class="login-verifyCode">
            <el-input
              ref="emailCode"
              v-model="loginForm.emailCode"
              name="emailCode"
              class="login-verify-input"
              placeholder="请输入验证码"
            >
              <span slot="prefix" class="svg-container">
                <svg-icon icon-class="password" />
              </span>
            </el-input>
            <el-button
              class="login-verifycode-img"
              style="width: 144px; height: 40px"
              type="primary"
              plain
              :disabled="!canGetMsg"
              @click="getVerifyCode()"
            >{{ secondsCount }}</el-button>
          </div>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-top:20px;height:40px" @click.native.prevent="handleLogin">Login</el-button>

      </el-form>

    </div>
  </div>
</template>

<script>
import { auth, redirectURL, verifyEmailCode } from '../../api/user'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userCode: '',
        pictureCode: '',
        emailCode: '',
        passWord: ''
      },
      loginRules: {
        userCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        passWord: [{ required: true, message: '不能为空', trigger: 'blur' }],
        pictureCode: [{ required: true, message: '不能为空', trigger: 'blur' }],
        emailCode: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      passwordType: 'password',
      verifyimg: '',
      canGetMsg: true,
      secondsCount: '获取验证码',
      verifyKey: '',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    this.refreshVerifyCode()
  },
  mounted() {
    if (this.loginForm.userCode === '') {
      this.$refs.userCode.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    refreshVerifyCode() {
      this.verifyimg = process.env.VUE_APP_BASE_API + '/api/sso/api/verifyPictureCode?timestamp=' + Math.random()
    },
    getVerifyCode() {
      if (!this.canGetMsg) return
      verifyEmailCode(this.loginForm).then((res) => {
        if (res.code === 200) {
          this.wxVerifyKey = res.data.wxVerifyKey
          this.userType = res.data.userType
          this.$message.success('验证码发送成功')
          this.msgCodeFun()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    msgCodeFun() {
      const self = this
      var time = 60
      this.canGetMsg = false
      var s = setInterval(() => {
        time--
        self.secondsCount = '重新发送(' + time + 's)'
        if (time <= 0) {
          self.secondsCount = '获取验证码'
          self.canGetMsg = true
          clearInterval(s)
        }
      }, 1000)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          auth(this.loginForm).then((res) => {
            if (res.retCode === '200') {
              redirectURL(res.redirectURLs[0]).then((_res) => {
                // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.$router.push({ path: '/dashboard' })
              })
            } else {
              this.refreshVerifyCode()
              this.$message.error(res.retMsg)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

// @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
//   .login-container .el-input input {
//     color: $cursor;
//   }
// }

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      background: transparent;
      // border: 0px;
      padding-left: 40px !important;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }

  .el-form-item {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: url("../../assets/images/login_bg.png");
  overflow: hidden;

  .login-form {
    width: 48%;
    height: 468px;
    background-color: #ffffff;
    position: absolute;
    z-index: 999;
    top: 80px;
    padding: 20px;
    left: 52%;
  }
  .login-con {
    width: 76%;
    min-width: 1024px;
    margin: 0 auto;
    position: relative;
  }
  .login_con_left {
    width: 52%;
    height: 468px;
    position: absolute;
    z-index: 999;
    top: 80px;
    left: 0;
}
.login_ciri {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;

    .login_word {
    font-size: 26px;
    line-height: 40px;
    letter-spacing: 0px;
    color: #444444;
    font-weight: normal;
    margin-left: 136px;
}
}
.login_ciri .img_ciri {
    width: 80px;
    height: 40px;
    background: url(../../assets/images/logo_ciri.png) no-repeat;
    position: absolute;
    margin-left: 56px;
}
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    height: 47px;
    line-height: 33px;
    display: inline-block;
  }
  .login-verifyCode {
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-top: 20px;
  }
  .login-verify-input {
    width: 80%;
    margin-right: 10px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
