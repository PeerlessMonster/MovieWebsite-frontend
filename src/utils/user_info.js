let userInfo

async function fetchUserInfo() {
    const response = await fetch("http://localhost:8080/user", {
        method: "GET",
        credentials: "include"
    })

    if (response.ok) {
        userInfo = await response.json()
    }
}

export default async function getUserInfo() {
    if (!userInfo) {
        await fetchUserInfo()
    }
    return userInfo
}