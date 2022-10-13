const userService = require("../services/user-service");

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            return res.status(200).json(userData)

        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);

        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            })
            return res.status(200).json(userData)

        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '456'])
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();