<template>
  <div class="login">
    <div class="login__wrap">
      <div class="login__logo">antd-admin</div>
      <a-form :model="formdata" ref="loginform" :rules="loginRules">
        <a-form-item name="username">
          <a-input placeholder="账号" autocomplete="off" v-model:value="formdata.username" />
        </a-form-item>
        <a-form-item name="password">
          <a-input placeholder="密码" v-model:value="formdata.password" />
        </a-form-item>
        <a-form-item>
          <bfr-async-button type="primary" @click="loginSubmit" block default-text="登录"
        /></a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Form } from 'ant-design-vue';
import { postLogin } from '@/api/auth/login';
import { AsyncButtonEvent } from '@/components/AsyncButton/index.vue';

export default defineComponent({
  setup(props) {
    const formdata = reactive({ username: '', password: '' });
    const loginRules = Object.freeze({
      username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
      password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    });
    return {
      formdata,
      loginRules
    };
  },
  methods: {
    loginSubmit(e: AsyncButtonEvent) {
      (this.$refs.loginform as Form)
        .validate()
        .then(async () => {
          e.loading.start();
          const { issuccess } = await postLogin(this.formdata);
          if (issuccess) {
            e.success('登录成功');
            this.$router.push('/');
          } else {
            e.error('登录失败');
          }
        })
        .catch(() => null);
    }
  }
});
</script>
<style lang="scss" scoped>
.login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(rgb(66, 66, 66), rgb(46, 69, 87));
  &__logo {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  &__wrap {
    position: absolute;
    top: 40%;
    right: 20%;
    width: 300px;
    padding: 30px 20px;
    background-color: #fff;
    transform: translateY(-50%);
    &::before {
      position: absolute;
      top: -20px;
      left: -20px;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: ' ';
      background-color: rgba(255, 255, 255, 0.6);
    }
    &::after {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: ' ';
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}
</style>
