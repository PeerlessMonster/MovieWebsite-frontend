import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

import logoImg from "../../assets/video_icon.png"
import classes from "./HeaderBar.module.css"
import UserMenu from "../interact/UserMenu";
import { tabInfo } from "../../main";

export default function HeaderBar() {
  const rankTabInfo = tabInfo.titleToPath.get("rank")
  const categoryTabInfo = tabInfo.titleToPath.get("category")
  const pages = [
    {
      label: (
        <Link to={rankTabInfo.path}>{rankTabInfo.title}</Link>
      ),
      key: rankTabInfo.path
    },
    {
      label: (
        <Link to={categoryTabInfo.path}>{categoryTabInfo.title}</Link>
      ),
      key: categoryTabInfo.path
    }
  ]

  const location = useLocation()
  const nowSelect = (function() {
    const path = location.pathname
    return pages.some((page) => path === page.key)
      ? path : null
  })()  

  return (
    <>
      <div>
        <img
          className={classes.logo}

          src={logoImg}
          alt="logo"
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        className={classes.menuEndofLogo}
        
        selectedKeys={[nowSelect]}
        items={pages}
      />
      <div className={classes.avatarEndofMenu}>
        <UserMenu />
      </div>
    </>
  )
}
