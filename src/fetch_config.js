export const baseUrl = "http://localhost:8080/"

export default function fetchData(path, options) {
    const url = baseUrl + path
    return fetch(url, {
        /* 让浏览器发送包含凭据的请求 */
        credentials: "include",
        ...options
    })
}