export function createCache(key, genData) {
    let cache = accessCache(key)
    if (!cache) {
        cache = genData()

        const storage = JSON.stringify(cache)
        localStorage.setItem(key, storage)
    }
    return cache
}

export async function createCacheSync(key, fetchData) {
    let cache = accessCache(key)
    if (!cache) {
        const response = await fetchData()
        if (response.ok) {
            cache = await response.json()

            const storage = JSON.stringify(cache)
            localStorage.setItem(key, storage)
        }
    }
    return cache
}

export function accessCache(key) {
    let storage = localStorage.getItem(key)
    if (!storage) {
        return null
    }
    return JSON.parse(storage)
}