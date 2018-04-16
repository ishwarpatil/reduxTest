import React, { Component } from 'react';
import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from './component/login';
import Home from './component/home';
import About from './component/about';
import Contact from './component/contact';
import Dashboard from './component/dashboard';
import Addemp from './component/addEmp';
import Getemp from './component/getEmp';

class App extends Component {
    render() {

        const PrivateRoute=({component:Component,...rest})=>{
            return (
                <Route {...rest} render={(routeProps)=>(
                    this.props.userData ?
                        <Component {...routeProps}/>:<Redirect to='/login'/>)}/>

            )
        };

        const PublicRoute=({component:Component,...rest})=>{
            return (
                <Route {...rest} render={(routeProps)=>(
                    ! this.props.userData ?
                        <Component {...routeProps}/>:
                        (this.props.userData.msg==="fail")?<Component {...routeProps}/>:<Redirect to="/"/>
                )}/>
            )
        };

        return (
            <Switch>
                <PublicRoute path="/login" component={Login}/>
                <div className="App">
                    <Dashboard />
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute exact path="/About" component={About}/>
                    <PrivateRoute exact path="/Contact" component={Contact}/>
                    <PrivateRoute exact path="/addEmp" component={Addemp}/>
                    <PrivateRoute exact path="/getEmp" component={Getemp}/>
                </div>
            </Switch>
        );
    }
}

const mapStateToProps=(state)=>{return{
    userData:state.login.user
}};

export default withRouter(connect(mapStateToProps,null)(App));
