import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/Store.js'; // import store dari redux yang sudah kita configure
import {Provider} from "react-redux"; // import provider dari react redux

ReactDOM.createRoot(document.getElementById('root')).render(
  // Menggunakan provider dari redux
  <Provider store={store}>
    <App />
  </Provider>,
)
