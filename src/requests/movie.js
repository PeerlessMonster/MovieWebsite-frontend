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

// export const categories = ["科幻", "冒险", "灾难", "剧情", "悬疑", "犯罪", "喜剧", "历史", "战争", "动作", "西部", "惊悚", "传记", "奇幻", "动画", "儿童", "爱情", "音乐"]
export function getCategory() {
    const path = basePath + "/categories"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}

// export const regions = ["中国大陆", "中国香港", "中国澳门", "中国台湾", "美国", "英国", '德国', "加拿大", "法国", '意大利', '西班牙', '匈牙利', "荷兰", '捷克', '奥地利', '挪威', '摩洛哥', '墨西哥', '日本']
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