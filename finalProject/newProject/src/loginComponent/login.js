import React from 'react';
import swal from 'sweetalert';
import { connect} from 'react-redux';
import './loginCss.css';
import './loginJquery';

export class Login extends React.Component{
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
            },
            error:'',
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    };

    componentDidMount(){
        //console.log("Ok :-",this.props.userData);
        //this.props.history.push('/login');
        if(this.props.userData!==null && this.props.userData!==undefined)
        {
            if(this.props.userData.msg)
                if(this.props.userData.msg==="fail")
                    this.setState({
                        error: 'UserName or Password Invalid'
                    },()=>{alert(this.state.error)});
        }
    };
    loginHandler=()=>{
        debugger;
        this.props.LoginUser(this.state.userValues);
    };
    handlerAgentInfo=()=> {
        this.props.AddUser(this.state.addUserValues);
        swal("Good job!", "New User Sing Up Successfully!", "success");
        this.setState({
            addUserValues:{
                firstName:'',
                lastName:'',
                email:'',
                password:''
            }
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
            <div className="materialContainer">
                <div className="box">
                    <div className="title">LOGIN</div>
                    <div className="input">
                        <label for="name">Username</label>
                        <input type="text" name="username" id="name" onChange={this.changeHandler} />
                            <span className="spin"></span>
                    </div>
                    <div className="input">
                        <label for="pass">Password</label>
                        <input type="password" name="password" id="pass" onChange={this.changeHandler} />
                            <span className="spin"></span>
                    </div>
                    <div className="button login">
                        <button id="buttonLogin" onClick={()=>{this.loginHandler();}}><span>GO</span> <i className="fa fa-check"></i></button>
                    </div>
                    <a href="" className="pass-forgot">Forgot your password?</a>
                </div>

                <div className="overbox" style={{height:'120%'}}>
                    <div className="material-button alt-2"><span className="shape"></span></div>
                    <div className="title">REGISTER</div>
                    <div className="input">
                        <label for="regfirstname">First Name</label>
                        <input type="text" name="firstName" id="regfirstname" value={this.state.addUserValues.firstName} onChange={this.changeUserHandler} />
                            <span className="spin"></span>
                    </div>
                    <div className="input">
                        <label for="reglastname">Last Name</label>
                        <input type="text" name="lastName" id="reglastname" value={this.state.addUserValues.lastName} onChange={this.changeUserHandler} />
                        <span className="spin"></span>
                    </div>
                    <div className="input">
                        <label for="regemail">Email</label>
                        <input type="text" name="email" id="regemail" value={this.state.addUserValues.email} onChange={this.changeUserHandler} />
                        <span className="spin"></span>
                    </div>
                    <div className="input">
                        <label for="regpass">Password</label>
                        <input type="password" name="password" id="regpass" value={this.state.addUserValues.password} onChange={this.changeUserHandler} />
                            <span className="spin"></span>
                    </div>
                    <div className="button">
                        <button onClick={()=>{this.handlerAgentInfo();}}><span>Sing Up</span></button>
                    </div>
                </div>
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