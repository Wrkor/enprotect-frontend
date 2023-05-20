import { userService } from '@/services';
import router from '@/router/router.js';

export const authentication = {
    namespaced: true,
    state: {
        loggedIn: null, 
        user: null, 
        link: '/', 
        linkBack: '/',
    },
    getters: {
        login(state) {
            return(state.loggedIn);
        },
        accesses(state) {
            if (state.user && state.user.accesses)
                return(state.user.accesses);
            else 
                return [];
        }
    },
    actions: {
        auth({ state, dispatch, commit }) {
            userService.auth()
                .then(
                    request  => {
                        const response =  JSON.parse(request);

                        if (response.result) {
                            const userData = JSON.parse(response.data);

                            commit('loginSuccess', userData);
                            dispatch('account/accountData',  null, { root: true });
                            router.push(state.link);
                        }

                        else {
                            commit('loginFailure');
                        }
                    }
                );
        },
        async login({ state, dispatch, commit }, { username, password }) {
            await userService.login(username, password)
                .then(
                    user => {
                        const response =  JSON.parse(user);

                        if (response.result) {
                            const userData = JSON.parse(response.data);
    
                            commit('loginSuccess', userData);
                            dispatch('account/accountData',  null, { root: true });
                            router.push(state.link);
                            dispatch('alert/success', "Успешная авторизация", { root: true });
                        }

                        else {
                            commit('loginFailure');
                            dispatch('alert/error', response.message , { root: true });
                        }
                    }
                )
        },
        
        async logout({ commit }) {
            await userService.logout()
            .then(() => {
                    commit('logout');
                    router.go(0);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.loggedIn = true ;
            state.user = user;
        },
        loginFailure(state) {
            state.loggedIn = null;
            state.user = null;
        },
        logout(state) {
            state.loggedIn = null;
            state.user = null;
        },
        link(state, path) {
            state.link = path;
        },
        linkBack(state, path) {
            state.linkBack = path;
        },
    }
}
