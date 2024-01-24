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

export function checkPassword(data) {
    const path = basePath + "/passwords"
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

export function getInformation() {
    const options = {
        method: "GET"
    }
    return fetchData(basePath, options)
}

export function changeInformation(data) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetchData(basePath, options)
}

export function changePassword(data) {
    const path = basePath + "/passwords"
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetchData(path, options)
}

export function upgradeVip() {
    const path = basePath + "/vips"
    const options = {
        method: "PUT"
    }
    return fetchData(path, options)
}