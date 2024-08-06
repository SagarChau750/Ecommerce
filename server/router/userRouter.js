const router = require('express').Router();
const userController = require('../controller/userControl');
const auth = require('../middleware/auth');


router.post('/register', userController.register);
router.post('/refresh_token', userController.refreshToken);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/infor', auth,userController.getUser);


module.exports = router;