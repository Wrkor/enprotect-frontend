import store from '@/store';

export const userService = {
    auth,
    login,
    logout,
    account,
    accountSave,
    username,
    userid,
    userimg,
    push,
    pushChecked,
    offers,
    offer,
    offerCreate,
    offerUpdate,
    offenses,
    offense,
    offenseCreate,
    offenseUpdate,
};

async function auth() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/auth`, requestOptions);
}

async function login(username, password) {
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login: username, password: password})
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/login`, requestOptions);
}

async function logout() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/logout`, requestOptions);
}

async function account() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/account`, requestOptions);
}

async function accountSave(saveData) {
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/account/save`, requestOptions);
}

async function username() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/username`, requestOptions);
}

async function userimg(userid) {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/userimg?userFoundId=${userid}`, requestOptions);
}

async function userid(sname) {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/userid?sname=${encodeURI(sname)}`, requestOptions);
}

async function push() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/push`, requestOptions);
}

async function pushChecked(pushid) {
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pushid })
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/push/checked`, requestOptions);
}

async function offers() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offer`, requestOptions);
}

async function offer(offerid) {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offer/${offerid}`, requestOptions);
}

async function offerUpdate(offerid, status) {
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({offerid, status})
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offer/update`, requestOptions);
}

async function offerCreate(title, description, imgs) {
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);

    imgs.forEach(element => {
        form.append("imgs", element);
    });
    
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        body: form
    };

    return await httpRequest(`${store.state.globalConstants.apiURL}/offer/create`, requestOptions);
}

async function offenses() {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offense`, requestOptions);
}

async function offense(offenseid) {
    const requestOptions = {
        method: 'get',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offense/${offenseid}`, requestOptions);
}

async function offenseCreate(employeeid, title, description, category, imgs) {
    const form = new FormData();
    form.append("employeeid", employeeid);
    form.append("title", title);
    form.append("description", description);
    form.append("category", category);

    imgs.forEach(element => {
        form.append("imgs", element);
    });
    
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        body: form
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offense/create`, requestOptions);
}

async function offenseUpdate(offenseid, status) {
    const requestOptions = {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({offenseid, status})
    };
    return await httpRequest(`${store.state.globalConstants.apiURL}/offense/update`, requestOptions);
}

function httpRequest(url, requestOptions) {
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            console.log(response);
            response.json().then((data) => {console.log(data);});
            return Promise.reject(error);
        }

        return data;
    });
}