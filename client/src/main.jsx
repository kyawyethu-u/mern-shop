import ReactDOM from "react-dom/client"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"

import store from "./store/store.js"
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
   <PersistGate persistor={persistor}>
   <App/>
   </PersistGate>
   </Provider>
  </StrictMode>,
)
