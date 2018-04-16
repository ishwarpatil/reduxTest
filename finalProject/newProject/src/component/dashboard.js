import React from 'react';
import {NavLink} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Dashboard extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render(){
        return(
            <div>
                <AppBar
                    title="Inventory Management For Sophio Automotive E-Commerce"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}
                />
                <Drawer width={200} openSecondary={false} open={this.state.open} >
                    <AppBar
                        title="Admin"
                        onLeftIconButtonClick={()=>{
                            this.setState({
                                open:false
                            })
                        }}/>
                    <NavLink to="/"><MenuItem>DashBoard</MenuItem></NavLink>
                    <NavLink to="/addEmp"><MenuItem>Add Employees</MenuItem></NavLink>
                    <NavLink to="/getEmp"><MenuItem>Employees</MenuItem></NavLink>
                </Drawer>
            </div>
        )
    }
}

export default Dashboard;