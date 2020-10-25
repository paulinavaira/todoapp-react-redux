import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import authActions from '../../redux/actions/authActions';
import uuidv4 from '../../../node_modules/uuid/dist/v4'
import '../../styles/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (props) => {

    const [todo, setTodo] = useState({ id: '', description:'', done: false });

    useEffect(() => {
        props.addTodo()
    }, [props.todos]);

    const readInput = e => {
        setTodo({
            ...todo,
            id: uuidv4(),
            [e.target.name]: e.target.value,
        })
    }

    const limpiarFormulario = () => {
        document.getElementById("form").reset();
      }

    const addTodo = e => {
        e.preventDefault()
        todo.description.length === 0 ? toast.dark('🦄 I do not think you do invisible tasks, do you?') : props.addTodo(todo, props.token) && toast.dark('🦄 Todo added successfully!')
        limpiarFormulario()
    }

    const deleteTodo = e => {
        const id = e.target.id
        e.preventDefault()
        props.deleteTodo(id, props.token) && toast.dark('🦄 Todo deleted successfully!')
    }

    return ( 
    <>
        <div class="justify-content-center align-items-center h-100 mt-5">
            <h2 style={{color:'#ffffff'}} class="text-center">Todo List</h2>
            <div style={{display:'flex', justifyContent: 'center' }}>
                <form id="form" class="form-group col-md-4 row ">
                    <label style={{color:'#ffffff'}} class="mt-2">Add a task</label>
                    <input type='text' name='description' class="form-control" placeholder='Write your task here' onChange={readInput}></input>
                    <button type="submit" class="btn btn-dark mt-3 col-md-12" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={addTodo}>Add</button>
                    {props.todos === undefined ? 
                    <div class="justify-content-center align-items-center h-100 mt-5">
                        <h4 style={{color:'#ffffff'}} class="text-center">Air is essential, but add something else!</h4>
                    </div>
                    :
                    <div style={{display:'flex', flexDirection: 'column', width:'100%'}}>
                        {props.todos.map((x) => {
                        return (<div class=" align-items-center h-100 mt-5" style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                                    <h4 style={{color:'#ffffff'}}>{x.description}</h4>
                                    {x.description === undefined ? null :
                                    <div>
                                    {/* <button id={x.id}  type="submit" class="btn" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={completedTodo}>Completed</button> */}
                                        <button id={x.id}  type="submit" class="btn ml-2" style={{backgroundColor:'#6fffe9', color:'#3a506b'}} onClick={deleteTodo}>Delete</button>
                                    </div>
                                    }
                                </div>)
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
    deleteTodo: authActions.deleteTodo
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home)