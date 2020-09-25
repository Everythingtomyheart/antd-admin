<template>
  <div class="bfr-code">
    <a-input
      v-model:value="codeValue"
      placeholder="验证码"
      :class="{ 'is-error': iserror, 'is-success': issuccess }"
    >
      <template v-slot:addonAfter>
        <div @click="getCode">
          <i v-if="issuccess" class="success-icon el-icon-check" />
          <img class="img-body" :src="code.base64" />
        </div>
      </template>
    </a-input>
    <div v-if="iserror" class="bfr-code__error">{{ error }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import { getCode, validateCode } from '@/api/auth/login';
import { throttle } from 'lodash';
const throttleGetCode = throttle(getCode, 200) as typeof getCode;
const throttleValidateCode = throttle(validateCode, 500) as typeof validateCode;
export default defineComponent({
  name: 'ImgCode',
  props: {
    status: Boolean
  },
  emits: ['success', 'update:status'],
  setup(props, { emit }) {
    const codeValue = ref('');
    const iserror = ref(false);
    const issuccess = ref(false);
    const error = ref('');
    const code = ref({ base64: '', id: '' });

    async function getCode(): Promise<void> {
      const result = await throttleGetCode();
      if (result.issuccess) {
        code.value = result.data;
        issuccess.value = false;
      }
    }
    getCode();
    async function validator(): Promise<void> {
      const result = await throttleValidateCode(code.value.id, codeValue.value);
      if (result.issuccess) {
        emit('update:status', true);
        emit('success');
        issuccess.value = true;
      } else {
        iserror.value = true;
        error.value = (result.err as { reason: string }).reason;
        emit('update:status', false);
        getCode();
      }
    }
    watchEffect(() => {
      issuccess.value = false;
      const value = codeValue.value;
      if (value.length === 4) {
        iserror.value = false;
        validator();
      } else {
        if (value.length > 0) {
          iserror.value = true;
        }
      }
    });
    function clear(): void {
      issuccess.value = false;
      iserror.value = false;
      codeValue.value = '';
      getCode();
    }
    return {
      clear,
      getCode,
      issuccess: issuccess,
      iserror: iserror,
      code: code,
      codeValue: codeValue,
      error: error
    };
  }
});
</script>
<style lang="scss" scoped>
.img-body {
  display: block;
  width: 100px;
  height: 30px;
  object-fit: contain;
  margin: 0 -10px;
  text-align: center;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
</style>
