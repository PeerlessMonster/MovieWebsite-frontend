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
    const limit = 5

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

export function getCategory() {
    const path = basePath + "/categories"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}

export function getRegion() {
    const path = basePath + "/regions"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}

export const searches = [
    { value: "", label: " " },
    { value: "name", label: "名称" },
    { value: "director", label: "导演" },
    { value: "scriptwriter", label: "编剧" },
    { value: "actor", label: "主演" }
]
export const sorts = [
    { value: "release_time", label: "上映时间" },
    { value: "duration", label: "时长" },
    { value: "play_amount", label: "播放量" },
    { value: "score", label: "评分" }
]
export const orders = [
    { value: true, label: "降序" },
    { value: false, label: "升序" }
]