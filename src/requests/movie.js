import fetchData from "../fetch_config"

const basePath = "movies"
const options = {
    method: "GET"
}

export function getCarousel() {
    const path = basePath + "/carousels"
    return fetchData(path, options)
}

export function getLatest() {
    const path = basePath + "/latests"
    return fetchData(path, options)
}

export function getTopScore() {
    const path = basePath + "/topscores"
    return fetchData(path, options)
}

export function getPopular() {
    const path = basePath + "/populars"
    return fetchData(path, options)
}

export function searchOne(id) {
    const path = basePath + "/" + id
    return fetchData(path, options)
}

export function search(data, offset = 0) {
    const limit = 20

    const path = `${basePath}?offset=${offset}&limit=${limit}`
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetchData(path, options)
}