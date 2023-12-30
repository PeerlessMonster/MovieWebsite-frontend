import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import ErrorPage from './error-page.jsx'
import CategoryPage from './routes/category-page.jsx'
import RankPage from './routes/rank-page.jsx'
import JumpToCategoryPage from './default-page.jsx'
import UserPage from './routes/user-page.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <JumpToCategoryPage />
      },
      {
        path: "/rank",
        element: <RankPage />
      },

      {
        path: "/category",
        element: <CategoryPage />
      },

      {
        path: "/user",
        element: <UserPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
