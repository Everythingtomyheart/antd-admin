<template>
  <a-button
    v-bind="$attrs"
    :type="type === 'text' ? 'link' : text"
    class="bfr-button bfr-button__default"
    :class="[{ 'bfr-button__block': block, 'is-danger': danger }, `bfr-button__${type}`]"
  >
    <slot />
  </a-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BfrButton',
  props: {
    type: {
      default: 'primary',
      type: String,
      validator: (value: string) => ['primary', 'cancel', 'text'].includes(value)
    },
    block: {
      default: false,
      type: Boolean
    },
    danger: {
      default: false,
      type: Boolean
    }
  }
});
</script>

<style lang="scss" scoped>
.bfr-button {
  &.bfr-button__default {
    color: #fff;
  }

  &.el-button {
    height: 40px;
  }

  &.el-button--medium {
    height: 36px;
  }

  &.el-button--mini {
    height: 30px;
  }

  &.el-button--small {
    height: 28px;
  }

  &.bfr-button__block {
    width: 100%;
  }

  &.bfr-button__primary {
    background: linear-gradient(180deg, rgba(81, 118, 155, 1) 0%, rgba(40, 65, 98, 1) 100%);
    border: none;

    &:focus,
    &:hover {
      color: #fff;
      background: linear-gradient(226deg, rgba(81, 118, 155, 1) 0%, rgba(40, 65, 98, 1) 100%);
      box-shadow: 0 2px 6px 0 rgba(40, 65, 98, 0.8);
    }

    &:active {
      color: #fff;
      background: linear-gradient(225deg, rgba(44, 69, 103, 1) 0%, rgba(4, 30, 52, 1) 100%);
    }

    &.is-danger {
      background: rgba(255, 77, 80, 1);
    }

    &.is-disabled {
      background: rgba(221, 221, 221, 1);
    }
  }

  &.bfr-button__cancel {
    color: rgba(6, 87, 149, 1);
    background-color: #fff;
    border: 1px solid rgba(6, 87, 149, 1);

    &:focus,
    &:hover {
      color: #fff;
      background: linear-gradient(226deg, rgba(81, 118, 155, 1) 0%, rgba(40, 65, 98, 1) 100%);
      box-shadow: 0 2px 6px 0 rgba(40, 65, 98, 0.8);
    }

    &:active {
      color: #fff;
      background: linear-gradient(225deg, rgba(44, 69, 103, 1) 0%, rgba(4, 30, 52, 1) 100%);
    }

    &.is-danger {
      border: 1px solid rgba(255, 77, 80, 1);
    }

    &.is-disabled {
      border: 1px solid rgba(221, 221, 221, 1);
    }
  }

  &.bfr-button__text {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: rgba(6, 87, 149, 1);

    &:focus,
    &:hover {
      color: rgba(36, 193, 247, 1);
    }

    &:active {
      color: rgba(40, 65, 98, 1);
    }

    &.is-danger {
      color: rgba(255, 77, 80, 1);
    }

    &.is-disabled {
      color: rgba(221, 221, 221, 1);
    }
  }
}
</style>
