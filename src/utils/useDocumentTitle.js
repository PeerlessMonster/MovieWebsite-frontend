import { useEffect } from "react";

import { tabInfo } from "../main";

export default function useTabTitle(tab) {
    const info = tabInfo.titleToPath.get(tab)
    useDocumentTitle(info.title)
}

export function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title
    }, [])
}