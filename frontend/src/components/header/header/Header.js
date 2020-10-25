import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import authActions from '../../../redux/actions/authActions';
import '../../../styles/styles.css'

const Header = (props) => {

    const logout = () => {
        props.logOut()
      }

    return ( 
    <>
        <nav class="navbar navbar-expand-lg " style={{backgroundColor:'#0b132b'}}>
            <NavLink style={{color:'#6fffe9', fontSize:'4vh', fontWeight:'800'}} class="navbar-brand" to="/">Todo App</NavLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                    {props.user ?
                    <div  style={{display:'flex', alignItems:'center', justifyContent:'space-between',  listStyle:'none'}}>
                        <li class="nav-item">
                            <NavLink style={{color:'#ffffff'}} to="" class="nav-link">Welcome, {props.user} </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink style={{color:'#6fffe9'}} to="" class="nav-link ml-2" onClick={logout}> LogOut</NavLink>
                        </li>
                    </div>
                    :
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between',  listStyle:'none'}}>
                    <li class="nav-item mr-2">
                        <NavLink style={{color:'#ffffff'}} class="nav-link" to="/login">Login </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink style={{color:'#ffffff'}} class="nav-link" to="/signup"> Signup</NavLink>
                    </li>
                    </div>
                    }
            </div>
        </nav>
    </> 
    );
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.username
    }
}

const mapDispatchToProps = {
    logOut: authActions.logOut
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header)