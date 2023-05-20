import { notify } from "@kyvg/vue3-notification";
/* eslint-disable */
export const alert = {
    namespaced: true,
    actions: {
        success({}, message) {
            notify({
                title: "Уведомление",
                text: message,
                type: 'success',
                duration: 4000,
                speed: 100,
            });
        },
        error({dispatch}, typeError) {
            if (typeError === "Logout" || typeError === "Unauthorized") {
                dispatch('authentication/logout',  null, { root: true });
            }

            console.log(typeError)
            let error;
            switch (typeError) {
                case 'InvalidAuth': error = 'неправильный логин или пароль'; break;
                case 'InvalidData': error = 'неккоректные отправленные данные'; break;
                case 'Forbidden': error = 'доступ запрещён'; break;
                case 'NotFound': error = 'не найдено'; break;
                default: error = 'неизвестная ошибка';
            }
            notify({
                title: "Уведомление",
                text: "Ошибка: " + error,
                type: 'error',
                duration: 4000,
                speed: 100,
            });
        },
    },
}
