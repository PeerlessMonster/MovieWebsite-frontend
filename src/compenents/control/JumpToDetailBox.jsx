import { useContext } from "react"
import { Link } from "react-router-dom"

import classes from "./JumpToDetailBox.module.css"
import { LoginModalContext } from "../../states/LoginModalContext"
import { UserContext } from "../../states/UserContext"

export default function JumpToDetailBox(props) {
    const user = useContext(UserContext)
    const userInfo = user.info

    const loginModal = useContext(LoginModalContext)
    const openLoginModal = loginModal.open

    const url = `/movie/${props.urlParam}`

    return userInfo ? (
        <Link
            className={classes.boxWhole}

            to={url}>
            {props.children}
        </Link>
    ) : (
        <div
            className={classes.boxWhole}
        
            onClick={openLoginModal}>
            {props.children}
        </div>
    )
}