import { getCategory, getRegion } from "../requests/movie";

let categories = null
let regions = null

export async function pickMovieCategory() {
    if (!categories) {
        const response = await getCategory()
        if (response.ok) {
            categories = await response.json()
        }
    }
    return categories
}

export async function pickMovieRegion() {
    if (!regions) {
        const response = await getRegion()
        if (response.ok) {
            regions = await response.json()
        }
    }
    return regions
}