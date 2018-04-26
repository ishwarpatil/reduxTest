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
                >
                    <h3>Home</h3>
                    <h3 style={{marginLeft:'2%'}}>Gallery</h3>
                    <h3 style={{marginLeft:'2%'}}>About</h3>
                    <h3 style={{marginLeft:'2%'}}>Contact</h3>
                </AppBar>
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
                    <NavLink to="/addToCard"><MenuItem>Add To Card</MenuItem></NavLink>
                    <NavLink to="/MaterialUiform"><MenuItem>Redux Form</MenuItem></NavLink>
                    <NavLink to="/form"><MenuItem>Checkout Form</MenuItem></NavLink>
                </Drawer>
            </div>
        )
    }
}

export default Dashboard;


