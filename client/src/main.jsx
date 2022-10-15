import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CookiesProvider } from 'react-cookie';


const root = document.querySelector('#root');

function init() {
  return <CookiesProvider>
    <App />
  </CookiesProvider>
}

ReactDOM.createRoot(root).render(init())


