<template>
  <section class="login-wrap">
    <div class="login-form">
      <div class="form-wrap">
        <div class="login-logo" />
        <a-form
          ref="loginForm"
          class="form-content"
          :model="loginType == 1 ? phoneForm : loginForm"
          :rules="formRules"
        >
          <a-row>
            <a-col :span="18" :push="3">
              <a-form-item>
                <h3 class="form-title">登录</h3>
              </a-form-item>
              <template v-if="loginType == 0">
                <a-form-item key="userID" prop="userID">
                  <a-input v-model:value="loginForm.userID" placeholder="账号/邮箱" />
                </a-form-item>
                <a-form-item key="password" prop="password">
                  <a-input
                    v-model:value="loginForm.password"
                    show-password
                    placeholder="密码"
                    type="password"
                  />
                </a-form-item>
              </template>
              <a-form-item v-if="loginType == 1" key="phone" prop="phone">
                <a-input v-model:value="phoneForm.phone" placeholder="手机号" />
              </a-form-item>
              <img-code-input ref="imgCode" v-model:status="codeStatus" @success="imgCodeSuccess" />
              <!-- <a-form-item v-if="loginType == 1">
                <phone-code-input
                  key="code"
                  ref="phoneCode"
                  v-model="phoneForm.code"
                  :before-send="phoneCodeBeforeSend"
                  :phone="phoneForm.phone"
                  @send-success="sendSuccess"
                />
              </el-form-item> -->
              <a-form-item>
                <bfr-async-button
                  ref="loginBtn"
                  class="login-button"
                  type="primary"
                  block
                  @click="login"
                  >登录</bfr-async-button
                >
              </a-form-item>
              <p>
                <bfr-button type="text" native-type="button" @click="toggleLoginType">
                  {{ loginType == 1 ? '账号/邮箱' : '手机号' }}登录
                </bfr-button>
              </p>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FooterLogo from '@/components/FooterLogo.vue';
import { login, phoneLogin, getVerifyPhone } from '@/api/auth/index';
import { ElForm } from 'element-ui/types/form';
import { UserStoreModule } from '@/store/modules/user';
import PhoneCodeInput from '../../components/phoneCode/Input.vue';
import ImgCodeInput from '../../components/ImgCodeInput.vue';
import { MenuStoreModule } from '../../store/modules/menu';
import { getUserRouters } from '../../api/auth/router';
import { BtnClickEvent } from '../../components/BfrAsyncButton/index.vue';
async function phoneValidator(rules: object, value: string, callback: Function): Promise<void> {
  if (
    new RegExp(
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
    ).test(value)
  ) {
    const { issuccess, err } = await getVerifyPhone(value);
    issuccess ? callback() : callback(new Error((err as { reason: string }).reason));
  } else {
    callback(new Error('请输入有效手机号'));
  }
}
@Component({
  components: {
    FooterLogo
  }
})
export default class Login extends Vue {
  $refs!: {
    loginForm: ElForm;
    phoneCode: PhoneCodeInput;
    imgCode: ImgCodeInput;
    loginBtn: Vue;
  };
  formRules = {
    userID: [{ required: true, message: '请输入账号/邮箱' }],
    email: [{ required: true, message: '请输入账号/邮箱' }],
    phone: [{ validator: phoneValidator, trigger: 'change' }]
  };
  loginForm = {
    userID: '',
    email: '',
    password: ''
  };
  phoneForm = {
    phone: '',
    bliID: '',
    code: ''
  };
  loginType = 0; // 0 账号或邮箱 1 手机号
  codeStatus = false;
  @Watch('loginForm.userID')
  onChange(newval: string): void {
    this.loginForm.email = newval;
  }
  // @Watch('codeStatus')
  // codeStatusChange(newval: boolean): void {
  // }
  imgCodeSuccess(): void {
    if (this.loginType === 1) {
      this.$refs.phoneCode.send();
    } else {
      console.log(1);
      (this.$refs.loginBtn.$el as HTMLElement).click();
    }
  }
  toggleLoginType(): void {
    this.codeStatus = false;
    this.$refs.imgCode.clear();
    this.loginType = this.loginType === 1 ? 0 : 1;
  }
  phoneCodeBeforeSend(cb: Function): void {
    this.$refs.loginForm.validateField(['phone'], async (errorMessage: string) => {
      if (errorMessage.length > 0 || !this.codeStatus) {
        cb(false);
      } else {
        cb();
      }
    });
  }
  sendSuccess(bliID: string): void {
    this.phoneForm.bliID = bliID;
  }
  async login(btnf: BtnClickEvent): Promise<void> {
    btnf.loading.start();
    const bool = await this.$utils.form.validate(this.$refs.loginForm);
    console.log(this.codeStatus);
    if (!bool || !this.codeStatus) {
      btnf.loading.done();
      return;
    }
    const { issuccess, data } =
      this.loginType === 0 ? await login(this.loginForm) : await phoneLogin(this.phoneForm);
    if (issuccess) {
      UserStoreModule.login(data);
      const { issuccess, data: data1 } = await getUserRouters(data.userinfo.userID);
      if (issuccess) {
        MenuStoreModule.SET_ROUTERS(data1.routers);
        MenuStoreModule.SET_MENUS(data1.navigation);
        this.$router.push('/index');
        btnf.success('登录成功');
      }
    } else {
      btnf.error('登录失败');
    }
    btnf.loading.done();
  }
}
</script>
<style lang="scss" scoped>
.login-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-image: url('../../assets/images/auth/bg.png');
  background-image: image-set(
    url('../../assets/images/auth/bg.png') 1x,
    url('../../assets/images/auth/bg@2x.png') 2x
  );
  background-size: 100% 100%;

  .login-form {
    position: relative;
    flex: 1;

    .login-logo {
      width: 34.063vw;
      height: 2.448vw;
      margin-bottom: 1.042vw;
      background-image: url('../../assets/images/auth/system_logo.png');
      background-image: image-set(
        url('../../assets/images/auth/system_logo.png') 1x,
        url('../../assets/images/auth/system_logo@2x.png') 2x
      );
      background-size: 100% 100%;
    }

    .login-button {
      height: 60px;
      font-size: 24px;
      background: linear-gradient(225deg, rgba(81, 118, 155, 1) 0%, rgba(40, 65, 98, 1) 100%);
      border: none;
    }

    .form-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: translate(0, -50%);
    }

    .form-content {
      width: 25.208vw;
      padding: 2.521vw 0;
      margin-left: -1.823vw;
      background-color: #fff;
      border-radius: 0.26vw;
    }

    .form-title {
      font-family: HYYakuHei-FEW, HYYakuHei, sans-serif;
      font-size: 1.875vw;
      font-weight: normal;
      line-height: 2.396vw;
      color: rgba(6, 87, 149, 1);
      text-align: center;
      letter-spacing: 0.521vw;
    }
  }
}
</style>
