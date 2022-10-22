const router = require('express').Router();
const favoritesController = require('./favoriteList.controller');
const {auth} = require('../../utils/auth')

router.route('/').get(auth,favoritesController.list);
router.route('/:favListId').get(auth,favoritesController.show);
router.route('/').post(auth,favoritesController.create);
router.route('/:favListId').post(auth, favoritesController.createFav);
router.route('/:favListId').put(auth, favoritesController.update);
router.route('/:favListId').delete(auth, favoritesController.destroy);



module.exports = router;
