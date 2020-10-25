import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header/header/Header';
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn/Login';
import SignUp from './pages/SingUp/SignUp';
import authActions from './redux/actions/authActions';

function App(props) {
  var routes;

  if (localStorage.getItem('token') && props.token === "") {
    props.forcedLogIn(localStorage.getItem('token'))
  }
  if (props.token || localStorage.getItem('token')) {

  routes = 
    (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Redirect to="/"/>
      </Switch>
    )
    } else {
  routes = 
    (
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={LogIn}/>
        <Redirect to="/login"/>
      </Switch>
    )
  }
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        {routes}
      </Switch>
    </BrowserRouter>
  );

}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token
  }
}

const mapDispatchToProps = {
  forcedLogIn: authActions.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
