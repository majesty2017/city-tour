import React from 'react'
import ReactDOM from 'react-dom/client'
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {Provider} from "react-redux";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </ContextProvider>
  </React.StrictMode>,
)
