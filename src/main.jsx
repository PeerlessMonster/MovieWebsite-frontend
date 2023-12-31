import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App, { loader as appLoader } from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import JumpToRankPage from "./default-page.jsx";
import RankTab, { loader as rankTabLoader } from "./routes/Rank.jsx";
import CategoryTab from "./routes/Category.jsx";
import UserCenterTab from "./routes/UserCenter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <JumpToRankPage />,
      },
      {
        path: "/rank",
        element: <RankTab />,
        loader: rankTabLoader
      },

      {
        path: "/category",
        element: <CategoryTab />,
      },

      {
        path: "/user",
        element: <UserCenterTab />
      },
    ],
  },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
