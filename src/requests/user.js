import fetchData from "../fetch_config"

const basePath = "users"

export function postRegister(data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetchData(basePath, options)
}

export function tryLogin(data) {
    const path = basePath + "/sessions"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetchData(path, options)
}

export function tryLogout() {
    const path = basePath + "/sessions"
    const options = {
        method: "DELETE"
    }
    return fetchData(path, options)
}

export function getUserInfo() {
    const options = {
        method: "GET"
    }
    return fetchData(basePath, options)
}