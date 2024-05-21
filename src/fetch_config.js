/* development */
// export const baseUrl = "http://localhost:8080/"
/* prodcution */
export const baseUrl = "http://localhost/api/"

export default function fetchData(path, options) {
    const url = baseUrl + path
    return fetch(url, {
        // mode: "cors",
        /* 即使是跨域的凭据（cookie），发送请求也包含 */
        credentials: "include",
        ...options
    })
}