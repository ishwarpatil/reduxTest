import React from 'react';
import { Button } from 'react-bootstrap';
import {getEmployee,deleteEmployee} from './../actions/auth';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import AddEmp from './addEmp';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class GetEmp extends React.Component{
    constructor(){
        super();
        this.state = {
            isActive:false,
            editData:[],
            id:'',
            stateId:'',
            city:'',
            profilePhoto:'',
            addEmp:{
                firstName:'',
                lastName:'',
                gender:'',
                hobby:[],
            },
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    };

    componentWillMount(){
        this.props.getEmployee();
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        });
    };
    closeModal=()=>{
        this.setState({
            isActive:false
        })
    }

    initial = () => {
        this.props.deleteEmployee(this.state.id);
    };

    deleteEmp = (empId) => {
        this.setState({
            id:empId,
        },()=>{
            this.initial();
        })
    };

    // editEmp = (empId) => {
    //   this.props.Employees.map((row, index)=>{
    //       if(row.id===empId){
    //           this.setState({
    //               stateId:row.state,
    //               city:row.city,
    //               addEmp:{
    //                   firstName:row.firstName,
    //                   lastName:row.lastName,
    //                   gender:row.gender,
    //                   hobby:row.hobby,
    //               },
    //           })
    //       }
    //   });
    // };

    render(){
        return (
            <div>
                <Button onClick={()=>{this.toggleActive()}}>Add Employees</Button>

                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="12" tooltip="Super Header" style={{textAlign: 'center'}}>
                                <h1>Employees</h1>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The Index">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The First Name" style={{'paddingLeft':'50px'}}>First Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Last Name" style={{'paddingLeft':'75px'}}>Last Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Gender" style={{'paddingLeft':'100px'}}>Gender</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Hobby" style={{'paddingLeft':'128px'}}>Hobby</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The State" style={{'paddingLeft':'154px'}}>State</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The City" style={{'paddingLeft':'179px'}}>City</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The profilePhoto" style={{'paddingLeft':'205px'}}>Profile Photo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Edit" style={{'paddingLeft':'233px'}}>Edit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Delete" style={{'paddingLeft':'255px'}}>Delete</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {
                            this.props.Employees.map( (row, index) => {
                                return <TableRow key={index}>
                                            <TableRowColumn>{index+1}</TableRowColumn>
                                            <TableRowColumn>{row.firstName}</TableRowColumn>
                                            <TableRowColumn>{row.lastName}</TableRowColumn>
                                            <TableRowColumn>{row.gender}</TableRowColumn>
                                            <TableRowColumn>{row.hobby}</TableRowColumn>
                                            <TableRowColumn>{row.state}</TableRowColumn>
                                            <TableRowColumn>{row.city}</TableRowColumn>
                                            <TableRowColumn><img src={"http://localhost:8010/upload/"+row.profilePhoto} width={50} height={50} /></TableRowColumn>
                                            <TableRowColumn><RaisedButton label="Edit" primary={true} onClick={()=>{this.setState({editData:row,});this.toggleActive();}} /></TableRowColumn>
                                            <TableRowColumn><RaisedButton label="Delete" secondary={true} onClick={()=>{this.deleteEmp(row.id)}}  /></TableRowColumn>
                                        </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableHeaderColumn tooltip="The Index">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The First Name" style={{'paddingLeft':'50px'}}>First Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Last Name" style={{'paddingLeft':'75px'}}>Last Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Gender" style={{'paddingLeft':'100px'}}>Gender</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Hobby" style={{'paddingLeft':'128px'}}>Hobby</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The State" style={{'paddingLeft':'154px'}}>State</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The City" style={{'paddingLeft':'179px'}}>City</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The profilePhoto" style={{'paddingLeft':'205px'}}>Profile Photo</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Edit" style={{'paddingLeft':'233px'}}>Edit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Delete" style={{'paddingLeft':'255px'}}>Delete</TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                                {/*Super Footer*/}
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
                <AddEmp show={this.state.isActive} closeModal={this.closeModal} Edit={this.state.editData} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    Employees:state.employee.Employee
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({getEmployee,deleteEmployee},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(GetEmp);