import { useEffect } from "react"
import LoginForm from "./components/LoginForm"
import { checkAuth } from './components/check';
import { useState } from "react";
import { useCookies } from "react-cookie";


function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  const [cookie, setCookie, removeCookie] = useCookies(['refreshToken']);

  useEffect(() => {
    if (localStorage.getItem('token')) {

      const refreshToken = checkAuth(cookie.refreshToken);

      refreshToken
        .then(data => {
          setCookie('refreshToken', data.refreshToken, {
            path: '/',
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
          })
          setUser(data.user);
          setAuth(true)
        })

    }
  }, [])


  return (
    <div className="App">
      {auth ? <h1>
        Hi, {user.email}
      </h1> : <LoginForm setAuth={setAuth} setUser={setUser} />}
    </div>
  )
}

export default App
