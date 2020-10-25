import authReducer from './authReducer'
import todoReducer from './todoReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers ({
    todoReducer: todoReducer,
    authReducer: authReducer,
})

export default rootReducer