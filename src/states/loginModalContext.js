import { createContext, useState } from "react";

export const loginModalContext = createContext(null)

export function useLoginModal() {
    const [opened, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    return { opened, open, close }
}