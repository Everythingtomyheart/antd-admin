import { App } from 'vue';
import ImgCode from './ImgCode/index.vue';
import BfrButton from './BfrButton/index.vue';
import BfrAsyncButton from './BfrAsyncButton/index.vue';

export default {
  install(app: App) {
    app.component('img-code', ImgCode);
    app.component('bfr-button', BfrButton);
    app.component('bfr-async-button', BfrAsyncButton);
  }
};
