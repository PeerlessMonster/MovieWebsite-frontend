import { Menu } from "antd";
import logo from "../assets/video_icon.png";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

export default function HeaderBar() {
  const pages = [
    {
      label: (
        <Link to={`./rank`}>影片排行</Link>
      ),
      key: "rank"
    },
    {
      label: (
        <Link to={`./category`}>全部影片</Link>
      ),
      key: "category"
    }
  ];

  return (
    <>
      <div>
        <img
          src={logo}
          alt="logo"
          style={{
            height: "4em",
            verticalAlign: "middle",
          }}
        />
      </div>
      <Menu
        style={{
          marginLeft: "1vw"
        }}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["rank"]}
        items={pages}
      ></Menu>
      <div
        style={{
          marginLeft: "auto",
        }}
      >
        <UserMenu />
      </div>
    </>
  );
}
