import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import Messages from "./pages/messages.tsx";
import App from './App.tsx'
import Error from "./pages/error.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Error/>,
        children: [
            { index: true, element: <Navigate to="/messages" /> },
            { path: "/messages", element: <Messages/> }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
