import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./JumpToDetailBox.module.css";
import { LoginModalContext } from "../../states/LoginModalContext";
import { UserContext } from "../../states/UserContext";

export default function JumpToDetailBox({ children, urlParam }) {
  const user = useContext(UserContext)
  const userInfo = user.info

  const url = `/movie/${urlParam}`
  const Parent = userInfo
    ? ({ children }) => (
        <Link
          className={classes.boxWhole}
          target="_blank"
          
          to={url}
        >
          {children}
        </Link>
      )
    : ({ children }) => {
        const loginModal = useContext(LoginModalContext)
        const openLoginModal = loginModal.open

        return (
          <div
            className={classes.boxWhole}
            
            onClick={openLoginModal}
          >
            {children}
          </div>
        )
      }
  return (<Parent>{children}</Parent>)
}
