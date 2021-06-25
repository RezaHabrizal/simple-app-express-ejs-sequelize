const {User, Product, Review, ProductReview} = require('../models');
const {comparePasword} = require('../helpers/bcrypt');
const main = require('../helpers/nodemailer');
const averageRating = require('../helpers/rating');

class Controller {

    static loginPage(req, res) {
        if (req.query.err) {
            res.render('login_page', {error: req.query.err})
        } else {
            res.render('login_page', {error: req.query.err})
        }
    }

    static registerForm(req, res) {
        res.render('register')
    }

    static register(req, res) {
        let input = {
            name_user: req.body.name_user,
            password_user: req.body.password_user,
            email: req.body.email,
            address: req.body.address,
            age: req.body.age,
            gender: req.body.gender
        }
        User.create(input)
        .then(() => {
            main(input.email)
            res.redirect('/login')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static showUserProducts(req, res) {
        Product.findAll({
            include: [{
                model: Review
            }]
        })
        .then((data) => {
            res.render('products', {data, averageRating})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static login(req, res) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if(!req.body.password_user) {
                throw "Invalid Username/Password"
            }
            const correctPassword = comparePasword(req.body.password_user, user.password_user)
            if (user && correctPassword) {
                req.session.user = user.name_user
                res.redirect('/')
            } else {
                res.redirect('/login?err=invalid username/password')
            }
        })
        .catch((err) => {
            if (err === "Invalid Username/Password") {
                res.redirect('/login?err=invalid username/password')
            } else {
                res.send(err)
            }

        })
    }

    static showFail(req, res) {
        res.render('fail', {error: req.query.err})
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
    
    static addReviewPage(req, res) {
        Product.findOne({
            where: {
                id: +req.params.id
            }, 
            include: {
                model: Review
            },
            required: false
        })
        .then((data) => {
            res.render('add_review', {data: [data]})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addReviewPost(req, res) {
        let input = {
            rating: req.body.rating,
            comment: req.body.comment
        }
        Review.create(input)
        .then((data) => {
            return ProductReview.create({reviewId: data.id, productId: +req.params.id})
        })
        .then(() => {
            res.redirect(`/`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addProductPost(req, res) {
        let input = {
            name_product: req.body.name_product,
            brand_product: req.body.brand_product,
            retail_price: req.body.retail_price,
            photo: req.body.photo
        }
        Product.create(input)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            if (err.name === "SequelizeValidationError") {
                let errors = []
                for (let i = 0 ; i < err.errors.length ; i++) {
                    errors.push(err.errors[i].message)
                }
                res.send(errors)
            } else {
                res.send(err)
            }

        })
    }

    static addProductPage(req, res) {
        res.render('add_product')
    }

}

module.exports = Controller