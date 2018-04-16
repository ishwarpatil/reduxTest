import React from 'react';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import { withRouter } from 'react-router';
import {push} from 'react-router-redux';
import {logoutUser} from './../actions/auth';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }

    goTo1 = () =>{
        this.props.goToAbout();
    };

    goTo2 = () =>{
        this.props.goToContact();
    };

    logoutHandle = () =>{
        this.props.LogoutUser();
    };

    render(){
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={this.goTo1}>About</button>
                <button onClick={this.goTo2}>Contact</button>
                <button onClick={this.logoutHandle}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
}};

const mapDispatchToProps=(dispatch)=>{return{
    LogoutUser: () => {dispatch({type: 'LOGOUTUSER'})},
    goToContact: () => push('/contact'),
    goToAbout: () => push('/about')
}};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));