import { useSyncExternalStore } from "react";

export default function useScrollStatus() {
    const scrollTop = useSyncExternalStore(
        subscribe,
        () => document.documentElement.scrollTop
    )
    const scrollHeight = useSyncExternalStore(
        subscribe,
        () => document.documentElement.scrollHeight
    )
    const clientHeight = useSyncExternalStore(
        subscribe,
        () => document.documentElement.clientHeight
    )

    return { scrollTop, scrollHeight, clientHeight }
}

function subscribe(callback) {
    window.addEventListener("scroll", callback)
    return () => window.removeEventListener("scroll", callback)
}