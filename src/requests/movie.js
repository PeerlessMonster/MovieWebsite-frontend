import fetchData from "../fetch_config"

const basePath = "movies"

export function getCarousel() {
    const path = basePath + "/carousels"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}

export function getLatest() {
    const path = basePath + "/latests"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}

export function getTopScore() {
    const path = basePath + "/topscores"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}

export function getPopular() {
    const path = basePath + "/populars"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}