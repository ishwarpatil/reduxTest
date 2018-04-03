import React from 'react';
import {userData, allCity} from './../actionMethods/auth';
import {bindActionCreators} from 'redux';
import './comoponents.css';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {connect} from 'react-redux';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            fileName:[],
            userValues: {
                name: '',
                email: '',
                hobby: [],
                city: '',
            }
        }
    }

    handleFileChange=(e)=>{
        let Arr=[];
        for(let i=0;i<e.target.files.length;i++){
            Arr.push(e.target.files[i]);
        }
       this.setState({
           fileName:Arr
       })
    };

    componentWillMount() {
        this.props.allCity();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({a: 'a'});
    }


    formHandler = (e) => {
        e.preventDefault();
        console.log("fsdfsdf",this.state.fileName);
        let Obj=new FormData();
        Obj.append('name',this.state.userValues.name);
        Obj.append('email',this.state.userValues.email);
        Obj.append('hobby',this.state.userValues.hobby);
        Obj.append('city',this.state.userValues.city);
        for(let i=0;i<this.state.fileName.length;i++){
            Obj.append('fileName',this.state.fileName[i]);
        }
        console.log("My State :- ",this.state);
        this.props.userData(Obj);
    };
    changeHandler = (e) => {
        const {userValues} = this.state;
        userValues[e.target.name] = e.target.value;
        this.setState({userValues});
    };
    changeHandler1 = (e) => {
        if(this.state.userValues.hobby.indexOf(e.target.value)===-1)
            this.state.userValues.hobby.push(e.target.value);
        else
            this.state.userValues.hobby.pop(e.target.value);
        this.setState(this.state.userValues.hobby);
    };

    render() {
        return (    
            <div>
                <Header/>
                <div className="row content">
                    <Sidebar />
                    <div className="col-sm-9">
                        <center>
                            <div className="col-sm-6">
                                <h2>Stacked form</h2>
                                <form action="" onSubmit={this.formHandler} encType="multipart/form-data">
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input type="text" className="form-control" value={this.state.userValues.name}
                                               onChange={this.changeHandler} placeholder="Enter Name" name="name"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="text" className="form-control" value={this.state.userValues.email}
                                               onChange={this.changeHandler} placeholder="Enter Email" name="email"/>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" onChange={this.changeHandler1}
                                                   name="hobby" value="Reading"/> Reading<br/>
                                            <input className="form-check-input" type="checkbox" onChange={this.changeHandler1}
                                                   name="hobby" value="Cricket"/> Cricket
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>City:</label>
                                        <select name="city" onChange={this.changeHandler}>
                                            {
                                                this.props.allCitys && this.props.allCitys.map((value,index) => {
                                                    return <option value={value.citys}>{value.citys}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">

                                        <label>Document:</label>
                                        <input type="file" className="form-control" name="fileName" multiple="multiple" onChange={this.handleFileChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </center>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        allCitys: state.city.allCity
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({userData, allCity}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Form);