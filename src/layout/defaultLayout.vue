<template>
  <a-layout class="default-layout">
    <a-layout-sider class="default-layout-sider" :collapse="collapse" :width="siderWidth">
      <div class="layout-logo">
        A
      </div>
      <layout-menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="default-layout-header">
        <span @click="toggleCollapsed" class="default-layout-header__menuaction">
          <MenuUnfoldOutlined v-if="collapse" />
          <MenuFoldOutlined v-else />
        </span>
        <a-breadcrumb v-show="fixedbreadcrumb">
          <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
            <span v-if="item.children">{{ item.meta.title }}</span>
            <a v-else :href="item.path">{{ item.meta.title }}</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="default-layout-header__tools">
          <a-dropdown
            v-model="visible"
            class="default-layout-header__tools--action default-layout-header__user"
          >
            <a-space>
              <a-avatar>U</a-avatar>
              <span>肖清宇 </span>
            </a-space>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                  个人信息
                </a-menu-item>
                <a-menu-item key="3">
                  退出
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="default-layout-main">
        <a-breadcrumb class="default-layout-main__breadcrumb">
          <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
            <span v-if="item.children">{{ item.meta.title }}</span>
            <a v-else :href="item.path">{{ item.meta.title }}</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <section class="default-layout-main__wrap">
          <router-view />
        </section>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import LayoutMenu from './components/LayoutMenu.vue';
import MenuStore from '@/store/modules/menu';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  components: {
    LayoutMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  name: '',
  setup() {
    // setup
    const route = useRoute();
    const breadcrumbs = route.matched;
    const collapse = computed({
      get: () => MenuStore.collapse,
      set: val => MenuStore.setCollapse(val)
    });
    const toggleCollapsed = () => {
      collapse.value = !collapse.value;
    };
    const siderWidth = computed(() => (collapse.value ? '80px' : '200px'));
    const fixedbreadcrumb = ref(false);
    const scroll = (e: Event) => {
      const target = (e.target as Document).scrollingElement as HTMLElement;
      if (target.scrollTop >= 30) {
        fixedbreadcrumb.value = true;
      } else {
        fixedbreadcrumb.value = false;
      }
    };

    document.onscroll = scroll;
    return {
      fixedbreadcrumb,
      toggleCollapsed,
      collapse,
      breadcrumbs,
      siderWidth
    };
  }
});
</script>

<style lang="scss" scoped vars="{siderWidth}">
.default-layout {
  $header-height: 64px;
  &-sider {
    position: fixed;
    min-height: 100vh;
    color: #fff;
  }
  &-main {
    min-height: calc(100vh - #{$header-height});
    margin-top: $header-height;
    margin-left: var(--siderWidth);
    transition: all 0.2s;
    &__breadcrumb {
      padding: 10px 20px;
      background: #fff;
    }
    &__wrap {
      padding: 20px;
      padding-top: 0;
      margin-top: 10px;
    }
  }
  &-header {
    position: fixed;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    width: calc(100% - var(--siderWidth));
    padding: 0 10px;
    background: #fff;
    box-shadow: rgba(231, 231, 231, 1) 0 5px 5px -5px;
    transition: all 0.2s;
    &__menuaction {
      margin-right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
    &__tools {
      height: $header-height;
      margin-left: auto;

      &--action {
        display: inline-block;
        height: $header-height;
        line-height: $header-height;
      }
    }
    &__user {
      display: flex;
      align-items: center;
    }
  }
}
</style>
