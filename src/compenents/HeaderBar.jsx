import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

import logoImg from "../assets/video_icon.png";
import classes from "./HeaderBar.module.css"
import UserMenu from "./UserMenu";
import { pathToTitle } from "../routes/route_config";

export default function HeaderBar() {
  const pages = [
    {
      label: (
        <Link to={`/rank`}>{pathToTitle.get("rank")}</Link>
      ),
      key: "rank"
    },
    {
      label: (
        <Link to={`/category`}>{pathToTitle.get("category")}</Link>
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
