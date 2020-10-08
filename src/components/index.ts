import { App } from 'vue';
import AsyncButton from './AsyncButton/index.vue';

const componentName = (name: string) => `bfr-${name}`;

export default {
  install(app: App) {
    app.component(componentName('async-button'), AsyncButton);
  }
};
