const Router = require('express').Router;
const { registration, login, logout, getUsers, activate } = require('../controller/user-controller');

const router = new Router();

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh');
router.get('/users', getUsers);


module.exports = router;