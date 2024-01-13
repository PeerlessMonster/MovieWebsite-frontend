import { useEffect, useRef, useSyncExternalStore } from "react";

export default function useArriveBottom() {
    const arrivedBottom = useRef(false)

    const position = useScrollStatus()
    useEffect(() => {
        const scrollTop = position.scrollTop
        const scrollHeight = position.scrollHeight
        const clientHeight = position.clientHeight
        if (scrollHeight - scrollTop === clientHeight) {
            arrivedBottom.current = true
        }
    }, [position])

    return arrivedBottom.current
}

function useScrollStatus() {
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