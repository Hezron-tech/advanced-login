import $api from "../http";

export default class UserService {
    static async fetchUsers() {
        return $api.get('/users')
    }
}