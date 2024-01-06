import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

import logoImg from "../assets/video_icon.png";
import classes from "./HeaderBar.module.css"
import UserMenu from "./UserMenu";

export default function HeaderBar() {
  const pages = [
    {
      label: (
        <Link to={`/rank`}>影片排行</Link>
      ),
      key: "rank"
    },
    {
      label: (
        <Link to={`/category`}>全部影片</Link>
      ),
      key: "category"
    }
  ];

  const location = useLocation()
  const nowSelect = (function() {
    const pathname = location.pathname
    const path = pathname.substring(1)

    return pages.some((page) => path == page.key)
      ? path : ""
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
      ></Menu>
      <div className={classes.avatarEndofMenu}>
        <UserMenu />
      </div>
    </>
  );
}
