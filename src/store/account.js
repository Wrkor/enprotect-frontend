import { userService } from '@/services';

export const account = {
    namespaced: true,
    state: {
        userData: null,
        pushData: null,
        offersData: null,
        offensesData: null,
        offensesDataByEmployee: null,
    },
    actions: {
        async accountData({dispatch, commit}) {
            await userService.account()
                .then(
                    user => {
                        const response =  JSON.parse(user);

                        if (response.result) {
                            const userData = JSON.parse(response.data);
                            commit('userDataSuccess', userData);
                        }

                        else {
                            dispatch('alert/error', response.message , { root: true });
                            dispatch('authentication/logout',  null, { root: true });
                        }
                    }
                )
        },
        async accountSaveData({dispatch, commit}, userData) {
            await userService.accountSave(userData)
                .then(
                    user => {
                        const response =  JSON.parse(user);

                        if (response.result) {
                            commit('userSaveDataSuccess', userData);
                            dispatch('alert/success', "Изменения сохранены", { root: true });
                        }

                        else {
                            dispatch('alert/error', response.message , { root: true });
                        }
                    }
                )
        },
        async pushData({dispatch, commit}) {
            await userService.push()
                .then(
                    push => {
                        const response =  JSON.parse(push);
                        if (response.result) {
                            const pushData = JSON.parse(response.data);
                            commit('pushDataSuccess', pushData);
                        }

                        else if (response.message === "NotFound") {
                            return;
                        }
                        
                        else {
                            dispatch('alert/error', response.message , { root: true });
                        }
                    }
                )
        },
        async offersData({dispatch, commit}) {
            await userService.offers()
                .then(
                    offer => {
                        const response =  JSON.parse(offer);

                        if (response.result) {
                            const offersData = JSON.parse(response.data);
                            offersData.forEach(el => {
                                el.imgs = JSON.parse(el.imgs);
                            });
                            commit('offersDataSuccess', offersData);
                        }

                        else if (response.message === "NotFound") {
                            return;
                        }

                        else {
                            dispatch('alert/error', response.message , { root: true });
                        }
                    },
                );
        },
        async offensesData({dispatch, commit}) {
            await userService.offenses()
                .then(
                    offense => {
                        const response =  JSON.parse(offense);

                        if (response.result) {
                            const offensesData = JSON.parse(response.data);

                            commit('offensesDataSuccess', offensesData);
                        }

                        else if (response.message === "NotFound") {
                            return;
                        }

                        else {
                            dispatch('alert/error', response.message , { root: true });
                        }
                    },
                )
        },
        async offensesDataByEmployee({dispatch, commit}) {
            await userService.offenses()
                .then(
                    offense => {
                        const response =  JSON.parse(offense);

                        if (response.result) {
                            const offensesData = JSON.parse(response.data);
                            commit('offensesDataByEmployeeSuccess', offensesData);
                        }

                        else if (response.message === "NotFound") {
                            return;
                        }

                        else {
                            dispatch('alert/error', response.message , { root: true });
                        }
                    },
                )
        },
    },
    mutations: {
        userDataSuccess(state, data) {
            state.userData = data;
        },
        userSaveDataSuccess(state, data) {
            state.userData.push_offer_email = data.push_offer_email;
            state.userData.push_offense_email =data.push_offense_email;
            state.userData.push_offense_sms = data.push_offense_sms;
        },
        pushDataSuccess(state, data) {
            state.pushData = data;
        },
        offersDataSuccess(state, data) {
            state.offersData = data;
        },
        offensesDataSuccess(state, data) {
            state.offensesData = data;
        },
        offensesDataByEmployeeSuccess(state, data) {
            state.offensesDataByEmployee = data;
        },
    }
}
