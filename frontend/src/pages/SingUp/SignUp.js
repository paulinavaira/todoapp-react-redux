import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import authActions from '../../redux/actions/authActions';
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {
    
    const [user, setUser] = useState({})

    const readInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sendUser = e => {
        e.preventDefault()
        user.username.length <2 || user.email.length === 0 || user.password.lenght < 6 ? toast.dark('🦄 I need a good message for this') : 
        props.newUser(user)
    }

    console.log(user);

    return ( 
    <>  
        <div class="justify-content-center align-items-center h-100 mt-5">
            <h2 style={{color:'#ffffff'}} class="text-center">Create an Account</h2>
            <div style={{display:'flex', justifyContent: 'center' }}>
                <form class="form-group col-md-4">
                    <label style={{color:'#ffffff'}} class="mt-2">Username</label>
                    <input type='text' name='username' class="form-control" placeholder='Write your username here' onChange={readInput}/>
                    <label style={{color:'#ffffff'}} class="mt-2">Email</label>
                    <input type='text' name='email' class="form-control" placeholder='Write your email here' onChange={readInput}/>
                    <label style={{color:'#ffffff'}} class="mt-2">Password</label>
                    <input type='password' name='password' class="form-control" placeholder='Write your password here' onChange={readInput}/>
                    <button style={{backgroundColor:'#6fffe9', color:'#3a506b'}} type="button" class="btn btn-dark mt-3 col-md-12" onClick={sendUser}>Sign Up</button>
                </form>
            </div>
            <div style={{color:'#ffffff'}} class="text-center">Already have an account? <NavLink style={{color:'#6fffe9'}} to="/login">Login here</NavLink></div>
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
    newUser: authActions.newUser
}
 
export default connect(null, mapDispatchToProps)(SignUp)