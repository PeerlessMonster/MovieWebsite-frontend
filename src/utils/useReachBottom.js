import { useEffect } from "react";

export default function useReachBottom(dependency, handler) {
    useEffect(() => {
        const listener = () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight
            if (scrollHeight - scrollTop === clientHeight) {
                handler()
            }
        }
        window.addEventListener("scroll", listener)
        return () => window.removeEventListener("scroll", listener)
    }, dependency)
}