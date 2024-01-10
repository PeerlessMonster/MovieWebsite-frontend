import { useContext } from "react"
import { Link } from "react-router-dom"

import classes from "./JumpToDetailOrOpenLoginModal.module.css"
import { loginModalContext } from "../states/loginModalContext"
import { userContext } from "../states/userContext"

export default function JumpToDetailOrOpenLoginModalBox(props) {
    const user = useContext(userContext)
    const userInfo = user.info

    const loginModal = useContext(loginModalContext)
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