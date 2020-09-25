<template>
  <a-button
    v-bind="$attrs"
    :loading="loading"
    :disabled="$attrs.disabled || loading"
    @click.prevent="asyncClick"
  >
    {{ btnText }}
  </a-button>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import mitt from 'mitt';
const emiter = mitt();
export interface BtnClickEvent extends Event {
  loading: {
    start: () => void;
    done: () => void;
  };
  success: (text?: string) => void;
  error: (text?: string) => void;
}
export default defineComponent({
  name: 'AsyncButton',
  props: {
    defaultText: {
      type: String,
      default: '确定'
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const btnText = ref('');
    const loading = ref(false);
    watchEffect(() => {
      btnText.value = props.defaultText;
    });
    function btnTextFormat(text: string): void {
      btnText.value = text;
      const timer = setTimeout(() => {
        btnText.value = props.defaultText;
      }, 2000);
      emiter.on('hook:beforeDestory', () => {
        clearTimeout(timer);
      });
    }
    function asyncClick(e: Event): void {
      const btne = Object.assign(
        {
          loading: {
            start: (): void => {
              loading.value = true;
            },
            done: (): void => {
              loading.value = false;
            }
          },
          success: (text?: string): void => {
            btnTextFormat(text || '保存成功');
          },
          error: (text?: string): void => {
            btnTextFormat(text || '保存失败');
          }
        },
        e
      );
      emit('click', btne);
    }
    return {
      btnText,
      loading,
      asyncClick
    };
  }
});
</script>
