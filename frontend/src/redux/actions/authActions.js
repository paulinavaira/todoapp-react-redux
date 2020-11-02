import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var path = `http://localhost:4000/api`

const authActions = {
    newUser: newUser => {
        return async (dispatch, getState) => {
            let response = await axios.post(path + `/user/register`, newUser)
            if(response.data.success) {
                dispatch({
                    type:'LOG_USER',
                    payload: {token: response.data.token, username: response.data.username, email: response.data.email, todos: response.data.todos}
                })
            } else {
                toast.dark('🦄 Something went wrong')
            }
        }
    },
    logUser: logUser => {
        return async (dispatch, getState) => {
            let response = await axios.post(path + `/user/login`, logUser)
            console.log(response);
            if(response.data.success) {
                dispatch({
                    type:'LOG_USER',
                    payload: {token: response.data.token, username: response.data.username, email: response.data.email, todos: response.data.todos}
                })
            } else {
                toast.dark(`🦄 ${response.data.error}` )
            }
        }
    },
    forcedLogIn: tokenLS => {
        return async (dispatch, getState) => {
            const response = await axios.get(path + `/user/token`, {
                headers: {
                    Authorization: `Bearer ${tokenLS}`
                }
            })
            dispatch({
                type:'LOG_USER',
                payload: {token: tokenLS, username: response.data.username, email: response.data.email, todos: response.data.todos}
            })
        }
    },
    logOut: () => {
        return (dispatch, getState) => {
            dispatch({
                type: 'LOGOUT_USER'
            })
        }
    },
    addTodo: (todo, tokenLS) => {
        return async (dispatch, getState) => {
            const response = await axios.post(path + `/user/addtodo`, todo, {
                headers: {
                    Authorization: `Bearer ${tokenLS}`
                }
            })
            if(response.data.success) {
                dispatch({
                    type:'ADD_TODO',
                    payload: {todos: response.data.todos}
                })
            } else {
                alert(response.data.error)
            }
        }
    },
    deleteTodo: (idTodo, tokenLS) => {
        return async (dispatch, getState) => {
            const response = await axios.post(path + `/user/deletetodo`, {idTodo}, {
                headers: {
                    Authorization: `Bearer ${tokenLS}`
                }
            })
            if(response.data.success) {
                dispatch({
                    type:'ADD_TODO',
                    payload: {todos: response.data.todos}
                })
            } else {
                alert(response.data.error)
            }
        }
    },
    editTodo: (todo, tokenLS) => {
        return async (dispatch, getState) => {
            const response = await axios.put(path + `/user/edittodo`, todo, {
                headers: {
                    Authorization: `Bearer ${tokenLS}`
                }
            })
            if(response.data.success) {
                dispatch({
                    type:'ADD_TODO',
                    payload: {todos: response.data.todos}
                })
            } else {
                alert(response.data.error)
            }
        }
    }
}

export default authActions