import React from 'react';
import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useCookies } from 'react-cookie';

const LoginForm = ({ setAuth, setUser }) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies(['refreshToken']);


    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            setCookie('refreshToken', response.data.refreshToken, {
                path: '/',
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })

            setAuth(true);
            setUser(response.data.user);

        } catch (e) {
            console.log(e);
        }
    }

    const registration = async (email, password) => {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);

            setAuth(true);
            setUser(response.data.user);

        } catch (e) {
            console.log(e.response);
        }
    }

    const logout = async () => {
        try {
            await AuthService.logout();

            localStorage.removeItem('token')

            setAuth(false);
            setUser({});

        } catch (e) {
            console.log(e.response);
        }
    }



    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='email' />

            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="text"
                placeholder='password' />

            <button onClick={() => login(email, password)}>Login</button>
            <button onClick={() => registration(email, password)}>Registration</button>
            <button onClick={logout}>logout</button>
        </div>
    );
};


export default LoginForm;