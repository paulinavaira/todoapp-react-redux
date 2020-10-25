const User = require('./model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { findOneAndUpdate } = require('./model')
const { all } = require('./routes')

const controller = {

    newUser: async(req, res) => {
        try {
            const { password } = req.body
            const newUser = await new User({ ...req.body })
            newUser.password = bcrypt.hashSync(password.trim(), 10)
            const saveUser = await newUser.save()
            const token = jwt.sign({...saveUser}, process.env.SECRETORKEY, {})
            if (!token) {
                res.json({
                    success: false,
                    error: 'Something went wrong'
                })
            } else {
                res.json({
                    success: true,
                    token,
                    username: saveUser.username,
                    email: saveUser.email,
                    todos: saveUser.todos
                })
            }

        } catch (err) {
            res.json({
                success: false, 
                error: err
            })
        }
    },

    logUser: async(req, res) => {
        try {

            const { email, password } = req.body
            const userExist = await User.findOne({ email })
            !userExist && res.json({ success: false, error: 'Incorrect email or password' })
            const passwordMatches = bcrypt.compareSync(password, userExist.password)

            !passwordMatches && res.json({ success: false, error: 'Incorrect email or password' })
            const token = jwt.sign({ ...userExist }, process.env.SECRETORKEY, {})
            if (!token) {
                res.json({
                    success: false,
                    error: 'Something went wrong'
                })
            } else {
                res.json({
                    success: true,
                    token,
                    username: userExist.username,
                    email: userExist.email,
                    todos: userExist.todos
                })
            }
        } catch (err) {
            res.json({
                success: false, 
                error: err
            })
        }
    },

    getUser: (req, res) => {
        const { username, email, todos } = req.user
		try {
            res.json({ 
                username,
                email,
                todos
            })
        } catch(err) {
            res.json({
                success: false, 
                error: err
            })
        }
    },
    addTodo: async (req, res) => {
        const { id ,description, done } = req.body
        const { _id } = req.user
        try{
            const addUserTodo = await User.findOneAndUpdate({ _id: _id }, { $push: {todos: { id: id, description: description, done: done }}})
            const updatedUser = await User.findOne({_id: _id})
            res.json({ 
                success: true,
                todos: updatedUser.todos
            })
        } catch(err) {
            res.json({
                success: false, 
                error: err
            })
        }
    },
    deleteTodo: async(req, res) => {
        const { idTodo } = req.body
        const { _id } = req.user
        try{
            const deleteUserTodo = await User.findOneAndUpdate({_id: _id}, {$pull:{ todos:{ id: idTodo }}})
            const updatedUser = await User.findOne({_id: _id})
            res.json({ 
                success: true,
                todos: updatedUser.todos,
            })
        } catch(err) {
            res.json({
                success: false,
                error: err
            })
        }
    }
}

module.exports = controller