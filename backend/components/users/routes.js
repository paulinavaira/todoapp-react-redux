const express = require('express')
const controller = require('./controller')
const passport = require("../../config/passport")
const router = express.Router()

router.route('/register')
    .post(controller.newUser)

router.route('/login')
    .post(controller.logUser)

router.route('/token')
    .get(passport.authenticate('jwt', { session: false }), controller.getUser)

router.route('/addtodo')
    .post(passport.authenticate('jwt', { session: false }), controller.addTodo)

router.route('/deletetodo')
    .post(passport.authenticate('jwt', { session: false }), controller.deleteTodo)

router.route('/edittodo')
    .put(passport.authenticate('jwt', { session: false }), controller.editTodo)

module.exports = router