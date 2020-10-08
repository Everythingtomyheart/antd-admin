<template>
  <a-menu-item>{{ menu.title }}</a-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LayoutMenuItem',
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>
