export const globalConstants = {
    namespaced: true,
    state: {
        routesLink: {
            main: '/',
            offer: '/offer',
            offer_post: '/offer/:id',
            offer_create: '/offer/create',
            offense: '/offense',
            offense_post: '/offense/:id',
            offense_create: '/offense/create',
            auth: '/auth',
            account: '/account',
            notice: '/notice',
            about: '/about',
            not_found: '/:pathMatch(.*)*',
        },

        apiURL: 'https://localhost:7059/api',

        ACCESS: {
            OFFENSE: "OFFENSE",
            OFFENSE_CREATE: "OFFENSE_CREATE",
            OFFENSE_EDIT: "OFFENSE_EDIT",
            OFFER: "OFFER", 
            OFFER_CREATE: "OFFER_CREATE", 
            OFFER_EDIT: "OFFER_EDIT",  
            OFFENSE_HAS: "OFFENSE_HAS",
            ACCOUNT: "ACCOUNT", 
        },
        
        list: {
            listOfferStatus: ['Зарегистрировано', 'На согласовании', 'В работе','Завершено','Нe согласовано'],
            listOffenseStatus: ['Зарегистрировано', 'В работе','Завершено','Отменено'],
            listCategory: ['Персонал', 'Оборудование'],
        },
        
        placeholders: {
            sname_employee: 'Фамилия сотрудника',
            name_employee: 'Имя сотрудника',
            mname_employee: 'Отчество сотрудника',
            sname_author: 'Фамилия автора',
            name_author: 'Имя автора',
            mname_author: 'Отчество автора',
            offer_title: 'Название предложения',
            offer_description: 'Опишите предложение',
            offense_title: 'Название инцидента',
            offense_description: 'Опишите инцидент',
            auth_login: '+7(777)-777-77-77',
            auth_password: '********',
        },
        
        localStorageKeys: {
            is_logged: 'is_logged'
        },
    },
}
