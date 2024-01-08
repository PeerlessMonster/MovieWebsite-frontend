import fetchData from "../fetch_config"

const basePath = "movies"

export function getCarousel() {
    const path = basePath + "/carousels"
    const options = {
        method: "GET"
    }
    return fetchData(path, options)
}