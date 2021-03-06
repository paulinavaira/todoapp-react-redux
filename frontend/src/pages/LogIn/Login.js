import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import authActions from '../../redux/actions/authActions';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = (props) => {
    
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const readInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sendUser = e => {
        e.preventDefault()
        user.email.length === 0 || user.password.lenght < 6 ? toast.dark('🦄 I need a good message for this') : props.logUser(user)
    }
    
    return ( 
    <>
        <div className="justify-content-center align-items-center h-100 mt-5">
            <h2 style={{color:'#ffffff'}} className="text-center">Log In</h2>
            <div style={{display:'flex', justifyContent: 'center' }}>
                <form className="form-group col-md-4">
                    <label style={{color:'#ffffff'}} className="mt-2">Email</label>
                    <input type='text' name='email' className="form-control" placeholder='Write your email here' onChange={readInput}/>
                    <label style={{color:'#ffffff'}} className="mt-2">Password</label>
                    <input type='password' name='password' className="form-control" placeholder='Write your password here' onChange={readInput}/>
                    <button style={{backgroundColor:'#6fffe9', color:'#3a506b'}} type="submit" className="btn btn-dark mt-3 col-md-12" onClick={sendUser}>Log In</button>
                </form>
            </div>
            <div style={{color:'#ffffff'}} className="text-center">You do not have an account? <NavLink style={{color:'#6fffe9'}} to="/signup">Create here</NavLink></div>
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
    </>
    );
}
 
const mapDispatchToProps = {
    logUser: authActions.logUser
}
 
export default connect(null, mapDispatchToProps)(LogIn)