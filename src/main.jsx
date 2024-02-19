import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import RankTab, { loader as rankTabLoader } from "./routes/Rank.jsx";
import CategoryTab, { loader as categoryTabLoader } from "./routes/Category.jsx";
import UserCenterTab from "./routes/UserCenter.jsx";
import DetailTab, { loader as detailTabLoader } from "./routes/Detail.jsx";

export const tabInfo = {
  INDEX: "rank",
  titleToPath: (function() {
    const map = new Map()
    map.set("rank", { title: "为你推荐", path: "/" })
    map.set("category", { title: "全部分类", path: "/category" })
    map.set("user", { title: "个人中心", path: "/user" })

    map.set("error", { title: "404" })
    return map
  })()
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <RankTab />,
            loader: rankTabLoader
          },

          {
            path: "/category",
            element: <CategoryTab />,
            loader: categoryTabLoader
          },

          {
            path: "/movie/:id",
            element: <DetailTab />,
            loader: detailTabLoader
          },

          {
            path: "/user",
            element: <UserCenterTab />
          },

          {
            path: "/*",
            element: <ErrorPage />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
