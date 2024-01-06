import { createContext, useState } from "react";

export const userContext = createContext(null)

export function useUser(initValue) {
    const [info, setInfo] = useState(initValue)
    const updateInfo = (value) => setInfo(value)
    return { info, updateInfo }
}