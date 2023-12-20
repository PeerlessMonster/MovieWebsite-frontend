import { Menu } from "antd";
import logo from "../assets/video_icon.png";
import UserMenu from "./UserMenu";

export default function HeaderBar() {
  const pages = [
    {
      label: "全部影片",
      key: "category",
    },
    {
      label: "影片排行",
      key: "rank",
    },
  ];
  const currentPage = (function () {
    const splitUrl = location.href.split("/");
    const key = splitUrl[splitUrl.length - 1];
    if (
      pages.some((page) => {
        return key == page.key;
      })
    ) {
      return key;
    } else {
      return "";
    }
  })();

  return (
    <>
      <div>
        <img
          src={logo}
          alt="logo"
          style={{
            // height: "",
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
        defaultSelectedKeys={[currentPage]}
        items={pages}
        onClick={(e) => {
          if (e.key != currentPage) {
            window.location.href = `./${e.key}`;
          }
        }}
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
