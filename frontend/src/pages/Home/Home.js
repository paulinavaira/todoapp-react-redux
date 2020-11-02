import React, { useState } from 'react';
import { connect } from 'react-redux'
import authActions from '../../redux/actions/authActions';
import uuidv4 from '../../../node_modules/uuid/dist/v4'
import '../../styles/styles.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (props) => {

    const [todo, setTodo] = useState({ id: '', description:'', done: false })
    const [edit, setEdit] = useState(false)

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`
    }

    const readInput = e => {
        setTodo({
            ...todo,
            id: uuidv4(),
            [e.target.name]: e.target.value,
        })
    }

    const cleanForm = () => {
        setTodo({ id: '', description:'', done: false })
        document.getElementById("form").reset()
    }

    const addTodo = e => {
        e.preventDefault()
        todo.description.length === 0 ? toast.dark('🦄 I do not think you do invisible tasks, do you?') : props.addTodo(todo, props.token) && toast.dark('🦄 Todo added successfully!') && cleanForm()
    }

    const deleteTodo = e => {
        const id = e.target.id
        e.preventDefault()
        props.deleteTodo(id, props.token) && toast.dark('🦄 Todo deleted successfully!')
    }

    const openToEdit = e => {
        const id = e.target.id
        setEdit(!edit)
        setTodo({
            ...todo,
            id: id
        })
    }

    const readEditTodo = e => {
        const id = e.target.id
        setTodo({
            ...todo,
            id: id,
            description: e.target.value,
        })
    }

    const editTodo = async e => {
        e.preventDefault()
        await props.editTodo(todo, props.token)
        setEdit(false)
    }
    return ( 
    <>
        <div className="justify-content-center align-items-center h-100 mt-5">
            <h2 style={{color:'#ffffff'}} className="text-center">Todo List</h2>
            <div style={{display:'flex', justifyContent: 'center' }}>
                <form id="form" className="form-group col-md-4 row ">
                    <label style={{color:'#ffffff'}} className="mt-2">Add a task</label>
                    <input type='text' name='description' className="form-control" placeholder='Write your task here' onChange={readInput}></input>
                    <button type="submit" className="btn btn-dark mt-3 col-md-12" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={addTodo}>Add</button>
                    {props.todos === undefined ? 
                    <div className="justify-content-center align-items-center h-100 mt-5">
                        <h4 style={{color:'#ffffff'}} className="text-center">Air is essential, but add something else!</h4>
                    </div>
                    :
                    <div style={{display:'flex', flexDirection: 'column', width:'100%'}}>
                        {props.todos.map((x) => {
                        return (x.description === undefined ? null :
                                (!edit ?
                                    <div className=" align-items-center h-100 mt-5" style={{display:'flex', justifyContent:'space-between', width:'100%'}} key={generateKey(x.id)}>
                                        <h4 style={{color:'#ffffff'}}>{x.description}</h4>
                                        <div>
                                            <button id={x.id}  type="submit" className="btn ml-2" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={deleteTodo}>Delete</button>
                                            <button id={x.id}  type="submit" className="btn ml-2" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={openToEdit}>Edit</button>
                                        </div>
                                    </div>
                                :
                                (todo.id === x.id &&
                                    <div className=" align-items-center h-100 mt-5" style={{display:'flex', justifyContent:'space-between', width:'100%'}} key={generateKey}>
                                    <input placeholder={x.description} id={x.id} onChange={readEditTodo}/>
                                    <button id={x.id}  type="submit" className="btn ml-2" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={editTodo}>Add</button>
                                </div>
                                )
                                )
                            )
                        })}
                    </div>
                    }
                </form>
                <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
            </div>
        </div>
    </> 
    );
}

const mapStateToProps = state => {
    return {
        todos: state.authReducer.todos,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {
    addTodo: authActions.addTodo,
    deleteTodo: authActions.deleteTodo,
    editTodo: authActions.editTodo
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home)