import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/router.js';
import store from '@/store'
import mixinAccess from "@/mixins/access.js";
import mixinRoutes from "@/mixins/routerLink.js";
import vSelect from 'vue-select'
import Notifications from '@kyvg/vue3-notification'

import components from "@/components/UI";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app
    .component('v-select', vSelect)
    .use(router)
    .use(store)
    .use(Notifications)
    .mixin(mixinAccess)
    .mixin(mixinRoutes)
    .mount('#app');
