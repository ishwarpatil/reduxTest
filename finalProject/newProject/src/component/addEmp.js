import React from 'react';
import { Modal,Button } from 'react-bootstrap';
import {State,City,addEmployee,editEmployee} from './../actions/auth';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import { withRouter } from 'react-router';
import {push} from 'react-router-redux';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    block: {
        maxWidth: 0,
    },
    checkbox: {
        marginBottom: 16,
    },
    radioButton: {
        marginBottom: 16,
    },
    Button: {
        margin: 12,
    }
};

class AddEmp extends React.Component{
    constructor(){
        super();
        this.state = {
            jsonObject:{},
            state:'',
            stateId:'',
            stateName:'',
            city:'',
            profilePhoto:'',
            dumProfilePhoto:'',
            isActive: false,
            isEditing:false,
            hobbySelector:new Set(),
            addEmp:{
                firstName:'',
                lastName:'',
                gender:'',
                hobby:[],
            },
            EditId:''
        }
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
            city:'',
            stateId:'',
        });
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.Edit && nextProps.Edit.id){
            this.setState({
                state:nextProps.Edit.sid,
                stateName:nextProps.Edit.state,
                city:nextProps.Edit.city,
                profilePhoto:nextProps.Edit.profilePhoto,
                dumProfilePhoto:nextProps.Edit.profilePhoto,
                addEmp:{
                    firstName:nextProps.Edit.firstName,
                    lastName:nextProps.Edit.lastName,
                    gender:nextProps.Edit.gender,
                    hobby:nextProps.Edit.hobby,
                },
                EditId:nextProps.Edit.id
            });
        }
        this.setState({a:'a'});
    };

    componentWillMount(){
        this.props.State();
    }

    loginHandler=(e)=>{
        //e.preventDefault();
        if(!this.state.EditId){
            console.log("Add...");
            let Obj=new FormData();
            Obj.append('firstName',this.state.addEmp.firstName);
            Obj.append('lastName',this.state.addEmp.lastName);
            Obj.append('gender',this.state.addEmp.gender);
            Obj.append('hobby',this.state.addEmp.hobby);
            Obj.append('sid',this.state.state);
            Obj.append('city',this.state.city);
            Obj.append('profilePhoto',this.state.profilePhoto);
            console.log(this.state);
            for (const [key, value]  of Obj.entries()) {
                if(key==='id'){
                    this.state.jsonObject[key] = Number(value);
                }else if(key==='sid'){
                    this.state.jsonObject[key] = Number(value);
                }else{
                    this.state.jsonObject[key] = value;
                }
            }
            //console.log('My Json:-',this.state.jsonObject)
            this.props.addEmployee(Obj,this.state.jsonObject);
            this.setState({
                city:'',
                stateId:'',
            });
            this.props.closeModal();
            setTimeout(()=>{
                this.props.goToEmp();
            },1000)
        }
        else{
            console.log("Edit...");
            let Obj=new FormData();
            Obj.append('id',this.state.EditId);
            Obj.append('firstName',this.state.addEmp.firstName);
            Obj.append('lastName',this.state.addEmp.lastName);
            Obj.append('gender',this.state.addEmp.gender);
            Obj.append('hobby',this.state.addEmp.hobby);
            Obj.append('sid',this.state.state);
            Obj.append('city',this.state.city);
            Obj.append('profilePhoto',this.state.profilePhoto);
            console.log(this.state);
            for (const [key, value]  of Obj.entries()) {
                if(key==='id'){
                    this.state.jsonObject[key] = Number(value);
                }else if(key==='sid'){
                    this.state.jsonObject[key] = Number(value);
                }else{
                    this.state.jsonObject[key] = value;
                }
            }
            this.props.editEmployee(this.state.EditId,Obj,this.state.jsonObject);
            this.setState({
                city:'',
                stateId:'',
            });
            this.props.closeModal();
            setTimeout(()=>{
                this.props.goToEmp();
            },1000)
        }
    };

    changeHandler=(e)=>{
        const {addEmp}=this.state;
        addEmp[e.target.name]=e.target.value;
        this.setState({addEmp});
    };

    changeHobbyHandler=(e)=> {
        if(this.state.hobbySelector.has(e.target.value)){
            this.state.hobbySelector.delete(e.target.value);
        }
        else{
            this.state.hobbySelector.add(e.target.value);
        }
        let setConvertedToArray = Array.from(this.state.hobbySelector);
        const {addEmp}=this.state;
        addEmp[e.target.name]=setConvertedToArray;
        this.setState({addEmp});
    };

    handleChangeState = (event, index, value) => {
        this.setState({
            state:value,
        });
    };
    handleChangeCity = (event, index, value) => this.setState({city:value});

    initialId = () =>{
      this.props.City(this.state.state);
    };

    getStateId = (id) =>{
        this.setState({
            state:id
        },()=>{
            this.initialId();
        })
    };

    close=()=>{
        this.props.closeModal();
        this.setState({
            EditId:'',
            state:'',
            city:'',
            addEmp:{
                firstName:'',
                lastName:'',
                gender:'',
                hobby:[],
            }
        });
    };

    render(){
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.close}
                    container={this}
                    aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add New User
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <form encType="multipart/form-data">
                                    <TextField
                                        name="firstName"
                                        onChange={this.changeHandler}
                                        hintText="Hint Text"
                                        floatingLabelText="First Name"
                                        value={this.state.addEmp && this.state.addEmp.firstName}
                                    />&nbsp;&nbsp;&nbsp;

                                    <TextField
                                        name="lastName"
                                        onChange={this.changeHandler}
                                        hintText="Hint Text"
                                        floatingLabelText="Last Name"
                                        value={this.state.addEmp && this.state.addEmp.lastName}
                                    /><br /><br /><br />

                                    <div style={styles.block}>
                                        <RadioButtonGroup name="gender" onChange={this.changeHandler} defaultSelected="not_light">
                                            <RadioButton
                                                value="Male"
                                                label="Male"
                                                style={styles.radioButton}
                                            />
                                            <RadioButton
                                                value="Female"
                                                label="Female"
                                                style={styles.radioButton}
                                            />
                                        </RadioButtonGroup>
                                    </div>

                                    <div style={styles.block}>
                                        <Checkbox
                                            name="hobby"
                                            value="Cricket"
                                            onCheck={this.changeHobbyHandler}
                                            label="Cricket"
                                            style={styles.checkbox}
                                            checked={this.state.addEmp && (this.state.addEmp.hobby.indexOf('Cricket')===-1)?false:true}
                                        />
                                        <Checkbox
                                            name="hobby"
                                            value="Reading"
                                            onCheck={this.changeHobbyHandler}
                                            label="Reading"
                                            style={styles.checkbox}
                                            checked={this.state.addEmp && (this.state.addEmp.hobby.indexOf('Reading')===-1)?false:true}
                                        />
                                        <Checkbox
                                            name="hobby"
                                            value="Writing"
                                            onCheck={this.changeHobbyHandler}
                                            label="Writing"
                                            style={styles.checkbox}
                                            checked={this.state.addEmp && (this.state.addEmp.hobby.indexOf('Writing')===-1)?false:true}
                                        />
                                    </div>
                                    <SelectField
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.handleChangeState}
                                        floatingLabelText="State"
                                    >
                                        {this.props.stateData.map((value,index)=>{
                                            return <MenuItem key={index} value={value.sid} primaryText={value.state} onClick={()=>{this.getStateId(value.sid)}} />
                                        })}
                                    </SelectField>

                                    <SelectField
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.handleChangeCity}
                                        floatingLabelText="City"
                                    >
                                        {
                                            !this.state.city ? '':<MenuItem value={this.state.city} primaryText={this.state.city} />
                                        }
                                        {this.props.cityData.map((value,index)=>{
                                            return this.state.city===value.city ?'':
                                                <MenuItem key={index} value={value.city} primaryText={value.city} />
                                        })}
                                    </SelectField><br /><br />

                                    <TextField
                                        name="profilePhoto"
                                        onChange={(e)=>{ this.setState({profilePhoto:e.target.files[0]})}}
                                        type="file"
                                    /><br /><br />

                                    <div>
                                        {
                                            this.state.EditId?<img src={"http://localhost:8010/upload/"+this.state.dumProfilePhoto} width={50} height={50} />:''
                                        }
                                    </div>
                                        {
                                            this.state.EditId?<RaisedButton label="Update" onClick={()=>{this.loginHandler();this.close();}} primary={true} style={styles.Button} />:
                                                <RaisedButton label="Save" onClick={()=>{this.loginHandler();this.close();}} primary={true} style={styles.Button} />
                                        }
                                </form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{this.close();}}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    stateData:state.login.state,
    cityData:state.login.city,
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({
    State,City,addEmployee,editEmployee,
    goToEmp: () => push('/getEmp'),
},dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddEmp));