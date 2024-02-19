import { createContext, useRef } from "react";

import { getCategory, getRegion } from "../requests/movie";

let categories = null
let regions = null
/* 只在应用程序启动时运行一次 */
if (typeof window !== "undefined") {
    let response = await getCategory()
    if (response.ok) {
        categories = await response.json()
    }

    response = await getRegion()
    if (response.ok) {
        regions = await response.json()
    }
}
const searches = [
    { value: "", label: " " },
    { value: "name", label: "名称" },
    { value: "director", label: "导演" },
    { value: "scriptwriter", label: "编剧" },
    { value: "actor", label: "主演" }
]
const sorts = [
    { value: "release_time", label: "上映时间" },
    { value: "duration", label: "时长" },
    { value: "play_amount", label: "播放量" },
    { value: "score", label: "评分" }
]
const orders = [
    { value: true, label: "降序" },
    { value: false, label: "升序" }
]

export function MovieInfoProvider({ children }) {
    const movieInfo = useMovieInfo({ categories, regions, searches, sorts, orders })
    return (
        <MovieInfoContext.Provider value={movieInfo}>
            {children}
        </MovieInfoContext.Provider>
    )
}

export const MovieInfoContext = createContext(null)

function useMovieInfo(initValue) {
    const infoRef = useRef(initValue)
    const info = infoRef.current
    return { info }
}