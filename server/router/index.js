const Router = require('express').Router;
const { registration, login, logout, getUsers, activate, refresh } = require('../controller/user-controller');

const router = new Router();

const auth = require('../middlewares/auth-middleware');

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/users', auth, getUsers);


module.exports = router;