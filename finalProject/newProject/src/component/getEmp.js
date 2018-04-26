import React from 'react';
import { Button } from 'react-bootstrap';
import {getEmployee,deleteEmployee} from './../actions/auth';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {Modal,Grid,Row} from 'react-bootstrap';
import AddEmp from './addEmp';
import View from './view';
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

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            isActive:false,
            editData:[],
            viewId:'',
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

    handleHide() {
        this.setState({ show: false });
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
            isActive:false,
            editData:[],
        })
    };

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

    viewData = (id) => {
      this.setState({
         viewId:id,
      });
    };

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
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn colSpan="12" tooltip="Super Header" style={{textAlign: 'center'}}>
                                <h1>Employees</h1>
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip="The Index">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The First Name" style={{'paddingLeft':'5%'}}>First Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Last Name" style={{'paddingLeft':'9%'}}>Last Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Gender" style={{'paddingLeft':'13%'}}>Gender</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The City" style={{'paddingLeft':'17%'}}>City</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Edit" style={{'paddingLeft':'23%'}}>Edit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Delete" style={{'paddingLeft':'26%'}}>Delete</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Delete" style={{'paddingLeft':'30%'}}>View</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            this.props.Employees.map( (row, index) => {
                                return <TableRow key={index}>
                                            <TableRowColumn>{index+1}</TableRowColumn>
                                            <TableRowColumn>{row.firstName}</TableRowColumn>
                                            <TableRowColumn>{row.lastName}</TableRowColumn>
                                            <TableRowColumn>{row.gender}</TableRowColumn>
                                            <TableRowColumn>{row.city}</TableRowColumn>
                                            <TableRowColumn><RaisedButton label="Edit" primary={true} onClick={()=>{this.setState({editData:row});this.toggleActive();}} /></TableRowColumn>
                                            <TableRowColumn><RaisedButton label="Delete" secondary={true} onClick={()=>{this.deleteEmp(row.id)}}  /></TableRowColumn>
                                            <TableRowColumn><RaisedButton label="View" primary={true} onClick={()=>{this.setState({editData:row});this.setState({show:true});}}  /></TableRowColumn>
                                        </TableRow>
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableHeaderColumn tooltip="The Index">#</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The First Name" style={{'paddingLeft':'5%'}}>First Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Last Name" style={{'paddingLeft':'9%'}}>Last Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Gender" style={{'paddingLeft':'13%'}}>Gender</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The City" style={{'paddingLeft':'17%'}}>City</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Edit" style={{'paddingLeft':'23%'}}>Edit</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Delete" style={{'paddingLeft':'26%'}}>Delete</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Delete" style={{'paddingLeft':'30%'}}>View</TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="12" style={{textAlign: 'center'}}>
                                {/*Super Footer*/}
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>

                <AddEmp show={this.state.isActive} closeModal={this.closeModal} Edit={this.state.editData} />
                <View show={this.state.show} closeModal={this.handleHide} Edit={this.state.editData} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    Employees:state.employee.Employee
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({getEmployee,deleteEmployee},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(GetEmp);