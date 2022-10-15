import AuthService from "../services/AuthService";
import { makeAutoObservable } from 'mobx'
export default class Store {

    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.acccessToken);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e) {
            console.log(e.response.message);
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.acccessToken);
            console.log(response);

            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e) {
            console.log(e.response.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();

            localStorage.removeItem('token')

            this.setAuth(false);
            this.setUser({});

        } catch (e) {
            console.log(e.response.message);
        }
    }
}