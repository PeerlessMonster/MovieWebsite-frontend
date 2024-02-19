import { createContext, useState } from "react";

import { getInformation } from "../requests/user";

let userInfo
/* 只在应用程序启动时运行一次 */
if (typeof window !== "undefined") {
    const response = await getInformation()
    if (!response.ok) {
        userInfo = null
    } else {
        userInfo = await response.json()
    }
}

export function UserProvider({ children }) {
    const user = useUser(userInfo)
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const UserContext = createContext(null)

export function useUser(initValue) {
    const [info, setInfo] = useState(initValue)
    const updateInfo = (value) => setInfo(value)
    return { info, updateInfo }
}