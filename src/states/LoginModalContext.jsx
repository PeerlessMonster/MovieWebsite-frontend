import { createContext, useState } from "react";

export function LoginModalProvider({ children }) {
    const loginModal = useLoginModal()
    return (
        <LoginModalContext.Provider value={loginModal}>
            {children}
        </LoginModalContext.Provider>
    )
}

export const LoginModalContext = createContext(null)

function useLoginModal() {
    const [opened, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    return { opened, open, close }
}