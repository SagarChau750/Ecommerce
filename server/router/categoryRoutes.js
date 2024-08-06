const router = require('express').Router();
const categoryCtrl = require('../controller/categoryCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');




// router.get('/category', categoryCtrl.getCategory);
// router.post('/category', categoryCtrl.createCategory);




router.route('/category', categoryCtrl)
.get(categoryCtrl.getCategory)
.post(auth, authAdmin, categoryCtrl.createCategory);

router.route('/category/:id')
.delete(auth, authAdmin, categoryCtrl.deleteCategory)
.put(auth, authAdmin, categoryCtrl.updateCategory);


module.exports = router;
