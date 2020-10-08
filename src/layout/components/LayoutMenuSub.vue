<template>
  <a-sub-menu>
    <template #title>
      {{ menu.title }}
    </template>
    <template v-for="item in menu.children">
      <layout-menu-sub :key="item.id" :menu="item" v-if="item.children" />
      <layout-menu-item :key="item.id" :menu="item" v-else />
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutMenuItem from './LayoutMenuItem.vue';
export default defineComponent({
  components: {
    LayoutMenuItem
  },
  name: 'LayoutMenuSub',
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>
