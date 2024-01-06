import fetchData from "../fetch_config"

const basePath = "user"

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
    const path = basePath + "/login"
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
    const path = basePath + "/logout"
    const options = {
        method: "POST"
    }
    return fetchData(path, options)
}

export function getUserInfo() {
    const options = {
        method: "GET"
    }
    return fetchData(basePath, options)
}