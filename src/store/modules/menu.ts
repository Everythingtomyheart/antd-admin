import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import store from '@/store';
@Module({ name: 'menu', dynamic: true, namespaced: true, store })
class MenuStore extends VuexModule {
  menus: object[] = [];
  collapse = false;
  @Mutation
  setMenus(menus: object[]) {
    this.menus = menus;
  }
  @Mutation
  setCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
}
export default getModule(MenuStore);
