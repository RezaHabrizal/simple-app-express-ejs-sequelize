const router = require('express').Router();
const Controller = require('../controllers/controller');

const mid = (req, res, next) => {
    console.log(req.session)
    if (req.session.user) {
        next()
    } else {
        res.redirect('/fail?err=You Must Login First!')
    }
}

router.get('/login', Controller.loginPage)
router.post('/login', Controller.login)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)
router.get('/fail', Controller.showFail)
router.get('/', mid, Controller.showUserProducts)
router.get('/logout', Controller.logout)
router.get('/users/addReview/:id', mid, Controller.addReviewPage)
router.post('/users/addReview/:id', mid, Controller.addReviewPost)
router.get('/users/addProduct', mid, Controller.addProductPage)
router.post('/users/addProduct', mid, Controller.addProductPost)

module.exports = router