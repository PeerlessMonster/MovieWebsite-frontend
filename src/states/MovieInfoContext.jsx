import { getCategory, getRegion } from "../requests/movie";
import { createCacheSync } from "../hooks/useLocalStorage";

/* 只在新页面打开时运行一次 */
if (typeof window !== "undefined") {
    await createCacheSync("categories", getCategory)
    await createCacheSync("regions", getRegion)
}

export default function MovieInfoProvider() {
    return null
}