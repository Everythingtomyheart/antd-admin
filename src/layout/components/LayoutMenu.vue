<template>
  <a-menu theme="dark" :mode="mode" :inline-collapsed="collapse">
    <template v-for="item in menus">
      <layout-menu-sub :key="item.id" :menu="item" v-if="item.children" />
      <layout-menu-item :key="item.id" :menu="item" v-else />
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getNavigation } from '@/router/routes';
import MenuStore from '@/store/modules/menu';
import LayoutMenuSub from './LayoutMenuSub.vue';
import LayoutMenuItem from './LayoutMenuItem.vue';

export default defineComponent({
  name: 'LayoutMenu',
  components: {
    LayoutMenuSub,
    LayoutMenuItem
  },
  setup() {
    // setup

    const menus = getNavigation();
    const collapse = computed(() => MenuStore.collapse);
    const mode = computed(() => (collapse.value ? 'vertical' : 'inline'));
    return {
      menus,
      collapse,
      mode
    };
  }
});
</script>
