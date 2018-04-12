import React from 'react';
import { Modal,Form,FormGroup,Button,Col,ControlLabel,FormControl } from 'react-bootstrap';
import {} from './../actions/auth';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';

class AddEmp extends React.Component{
    constructor(){
        super();
        this.state = {
            isActive: false,
            isEditing:false,
            addEmp:{
                firstName:'',
                lastName:'',
                hobby:[],
                state:'',
                city:'',
                profilePhoto:''
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

    loginHandler=()=>{
        debugger;
        this.props.loginUser(this.state.userValues);
    };

    changeHandler=(e)=>{
        const {addEmp}=this.state;
        addEmp[e.target.name]=e.target.value;
        this.setState({addEmp});
    };
    changeUserHandler=(e)=>{
        const {addUserValues}=this.state;
        addUserValues[e.target.name]=e.target.value;
        this.setState({addUserValues});
    };
    render(){
        return (
            <div>
                    <Button onClick={()=>{this.toggleActive()}}>Add Employees</Button>
                    <Modal
                        show={this.state.isActive}
                        onHide={()=>{
                            this.toggleActive();
                            this.state.isEditing?
                                this.setState({isEditing:false}):''
                        }}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add New User
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
                                            <FormControl type="text" name="firstName" onChange={this.changeHandler} placeholder="First Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Last Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="lastName" onChange={this.changeHandler} placeholder="Last Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Email
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="email" name="email" onChange={this.changeHandler} placeholder="Email..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={3}>
                                            Password
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="password" name="password" onChange={this.changeHandler} placeholder="Password..." />
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
                                this.state.isEditing?
                                    this.setState({isEditing:false}):''
                            }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    //userData:state.login.user
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AddEmp);