const router = require('express').Router();
const userController = require('./user.controller');
const {auth} = require('../../utils/auth')

router.route('/').get(userController.list);
router.route('/').put(auth, userController.update);
router.route('/').delete(auth, userController.destroy);
router.route('/signup').post(userController.signup);
router.route('/login').post(userController.signin);

module.exports = router;
