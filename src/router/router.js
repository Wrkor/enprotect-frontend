import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

import TheMain from '@/views/TheMain.vue';
import TheAuth from '@/views/TheAuth.vue';
import TheNotice from '@/views/TheNotice.vue';
import TheOffer from '@/views/TheOffer.vue';
import TheOfferPost from '@/views/TheOfferPost.vue';
import TheOfferPostCreate from '@/views/TheOfferPostCreate.vue';
import TheOffense from '@/views/TheOffense.vue';
import TheOffensePost from '@/views/TheOffensePost.vue';
import TheOffensePostCreate from '@/views/TheOffensePostCreate.vue';
import TheAccount from '@/views/TheAccount.vue';
import TheAbout from '@/views/TheAbout.vue';
import TheError from '@/views/TheError.vue';

const routes = [
    {
        path: store.state.globalConstants.routesLink.main,
        component: TheMain,
    },
    {
        path: store.state.globalConstants.routesLink.offer,
        component: TheOffer,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.OFFER,
        },
    },
    {
        path: store.state.globalConstants.routesLink.offer_post,
        component: TheOfferPost,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.OFFER,
        },
    },
    {
        path: store.state.globalConstants.routesLink.offer_create,
        component: TheOfferPostCreate,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.OFFER,
        },
    },
    {
        path: store.state.globalConstants.routesLink.offense,
        component: TheOffense,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.OFFENSE,
        },
    },
    {
        path: store.state.globalConstants.routesLink.offense_post,
        component: TheOffensePost,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.OFFENSE,
        },
    },
    {
        path: store.state.globalConstants.routesLink.offense_create,
        component: TheOffensePostCreate,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.OFFENSE,
        },
    },
    {
        path: store.state.globalConstants.routesLink.account,
        component: TheAccount,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.ACCOUNT,
        },
    },
    {
        path: store.state.globalConstants.routesLink.notice,
        component: TheNotice,
        meta: { 
            requiresAuth: true,
            ACCESS: store.state.globalConstants.ACCESS.ACCOUNT,
        },
    },
    {
        path: store.state.globalConstants.routesLink.about,
        component: TheAbout,
    },
    {
        path: store.state.globalConstants.routesLink.auth,
        component: TheAuth,
    },
    {
        path: store.state.globalConstants.routesLink.not_found,
        component: TheError,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['authentication/login']) { 
            if (store.getters['authentication/accesses'] && store.getters['authentication/accesses'].includes(to.meta.ACCESS)) {
                store.dispatch('account/pushData');
                const arrayLinks = Object.values(store.state.globalConstants.routesLink);

                if (arrayLinks.includes(from.path) && from.path !== store.state.globalConstants.routesLink.auth)
                store.commit('authentication/linkBack', from.path);
                next();
                return;
            }
            else {
                next(from.path);
            }
        }
        else {
            store.commit('authentication/link', to.path);

            next(store.state.globalConstants.routesLink.auth); 
        }
    }

    else {
        if (to.path === store.state.globalConstants.routesLink.auth && store.getters['authentication/login']) {
            store.dispatch('authentication/logout');
        }

        else {
            next();
        }
    }
});

export default router;