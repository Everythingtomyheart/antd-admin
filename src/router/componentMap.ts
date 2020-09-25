const componentMap = {
  login: () => import(/* webpackChunkName: "login" */ '@/views/auth/login.vue'),
  login1: () => import(/* webpackChunkName: "login" */ '@/views/auth/login.vue')
};
type ComponentMapType = keyof typeof componentMap;
// const map: ComponentMap = (componentMap as unknown) as ComponentMap;
export default componentMap;
// const login = {
//   name: 'login'
// };
// map[login.name];
