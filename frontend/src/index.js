import React from 'react'
import ReactDOM from 'react-dom/client'
import {Helmet} from "react-helmet"
import App from './App'
import UserProvider from "./Context/UserContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>arthapass</title>
    </Helmet>
    <UserProvider>
      <App />
    </UserProvider>
  </>
  // </React.StrictMode>
)
