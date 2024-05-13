import { createContext, useEffect, useState } from "react";

import { getInformation } from "../requests/user";

let userInfo
/* 只在新页面打开时运行一次 */
if (typeof window !== "undefined") {
    const response = await getInformation()
    if (!response.ok) {
        userInfo = null
    } else {
        userInfo = await response.json()
        
        const channel = new BroadcastChannel("session_expire")
        channel.postMessage(userInfo)
    }
}

export function UserProvider({ children }) {
    const user = useUser(userInfo)
    useEffect(() => {
        const handleMessage = (e) => {
            const data = e.data
            user.updateInfo(data)
        }

        const channel = new BroadcastChannel("session_expire")
        channel.addEventListener("message", handleMessage)
        return () => channel.removeEventListener("message", handleMessage)
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const UserContext = createContext(null)

function useUser(initValue) {
    const [info, setInfo] = useState(initValue)
    const updateInfo = (value) => setInfo(value)
    return { info, updateInfo }
}