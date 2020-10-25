// import axios from 'axios'

// var path = 'http://localhost:4000/api'

// const todoActions = {
//     addTodo: todo => {
//         console.log(todo);
//         return async (dispatch, getState) => {
//             // let response = await axios.post(path+'/todo/addtodo', todo)
//             if(todo !== '') {
//                 dispatch({
//                     type:'ADD_TODO',
//                     payload: todo,
//                 })
//             }
//             // switch (response.data.success) {
//             //     case false:
//             //         alert('Something went wrong')
//             //         break;
//             //     default:
//             //         dispatch({
//             //             type:'ADD_TODO',
//             //             payload: {todo: response.data.todo}
//             //         })
//             //         alert('Todo added successfully')
//             //         break;
//             // }
//         }
//     }
// }

// export default todoActions