const initialState = { token: '', username: '', email: '', todos: []}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_USER':
                localStorage.setItem('token', action.payload.token)
                return {
                    ...state,
                    token: action.payload.token,
                    username: action.payload.username,
                    email: action.payload.email,
                    todos: action.payload.todos
                }
        case 'LOGOUT_USER': 
            localStorage.clear()
            return {
                ...state,
                ...initialState
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: action.payload.todos
            }
        default:
            return state
    }
}

export default authReducer