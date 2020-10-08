import { defineAsyncComponent } from 'vue';

const componentMap = {
  defaultLayout: defineAsyncComponent(() =>
    import(/* webpackChunkName: "defaultLayout" */ '@/layout/defaultLayout.vue')
  ),
  login: defineAsyncComponent(() =>
    import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  ),
  user: defineAsyncComponent(() =>
    import(/* webpackChunkName: "user" */ '@/views/auth/user/index.vue')
  )
};
type ComponentMapType = keyof typeof componentMap;

export function getComponent(name: ComponentMapType) {
  return componentMap[name];
}

export default componentMap;
