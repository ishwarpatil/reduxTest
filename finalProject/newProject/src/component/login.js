import React from 'react';
import { Modal,Form,FormGroup,Button,Col,ControlLabel,FormControl } from 'react-bootstrap';
import {loginUser,addUser} from './../actions/auth';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            isActive: false,
            isEditing:false,
            userValues:{
                username:'',
                password:''
            },
            addUserValues:{
                firstName:'',
                lastName:'',
                email:'',
                password:''
            }
        }
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        });
    };

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    };

    componentDidMount(){
        console.log("Ok :-",this.props.userData);
        if(this.props.userData!==null && this.props.userData!==undefined)
        {
            if(this.props.userData.msg)
                if(this.props.userData.msg==="fail")
                    alert('UserName or Password invalid');
        }
    };
    loginHandler=()=>{
        debugger;
        this.props.LoginUser(this.state.userValues);
    };
    handlerAgentInfo=()=> {
        this.props.AddUser(this.state.addUserValues);
        this.setState({
            isActive:false
        })
    };
    changeHandler=(e)=>{
        const {userValues}=this.state;
        userValues[e.target.name]=e.target.value;
        this.setState({userValues});
    };
    changeUserHandler=(e)=>{
        const {addUserValues}=this.state;
        addUserValues[e.target.name]=e.target.value;
        this.setState({addUserValues});
    };
    render(){
        return (
            <div style={{'margin':'0 auto'}}>
                <fieldset>
                    <legend align="center">Login</legend>
                    <center>
                        <Form horizontal style={{'width':'20%'}}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    User Name
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" name="username" onChange={this.changeHandler} placeholder="Email" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" name="password" onChange={this.changeHandler} placeholder="Password" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button onClick={this.loginHandler}>Sign in</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button onClick={()=>{this.toggleActive()}}>Sign up</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </center>
                    <Modal
                        show={this.state.isActive}
                        onHide={()=>{
                            this.toggleActive();
                        }}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                <center>Add New User</center>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="thirdForm">
                                <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            First Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="firstName" onChange={this.changeUserHandler} placeholder="First Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Last Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="lastName" onChange={this.changeUserHandler} placeholder="Last Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Email
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="email" name="email" onChange={this.changeUserHandler} placeholder="Email..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Password
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="password" name="password" onChange={this.changeUserHandler} placeholder="Password..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={5}>
                                            <Button bsStyle="primary" onClick={()=>{
                                                this.handlerAgentInfo();
                                            }}>Save</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{
                                this.toggleActive();
                            }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </fieldset>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    userData:state.login.user,
}};

const mapDispatchToProps=(dispatch)=>{return{
    LoginUser: (info) => {dispatch({type: 'LOGINUSER',payload:info})},
    AddUser: (info) => {dispatch({type: 'SAGAADDUSER',payload:info})},
}};
export default connect(mapStateToProps,mapDispatchToProps)(Login);