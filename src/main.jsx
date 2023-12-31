import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import JumpToRankPage from "./default-page.jsx";
import RankTab from "./routes/Rank.jsx";
import CategoryTab from "./routes/Category.jsx";
import UserCenterTab, { loader as userLoader } from "./routes/UserCenter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <JumpToRankPage />,
      },
      {
        path: "/rank",
        element: <RankTab />,
      },

      {
        path: "/category",
        element: <CategoryTab />,
      },

      {
        path: "/user",
        element: <UserCenterTab />,
        loader: userLoader
      },
    ],
  },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
