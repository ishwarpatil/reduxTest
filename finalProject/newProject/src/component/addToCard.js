import React from 'react';
import $ from 'jquery';
import Script from 'react-load-script';
import RaisedButton from 'material-ui/RaisedButton';
import './component.css';
import {Row,Col,FormControl,Table} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {addToCard,deleteToCard,addPayment} from './../actions/auth';
let count = 0;

class AddToCard extends React.Component{
    constructor(){
        super();
        this.state = {
            id:'',
            history:{
                id:'',
                product:'',
                price:'',
                total:'0',
            },
            add:'',
            quantity:'',
            ajaxData:'',
        }
    }

    // componentDidMount(){
    //     $.ajax({
    //         url : 'http://localhost:8010/api/payment',
    //         success:(data) => {
    //             this.setState({
    //                 ajaxData:data
    //             })
    //         },
    //         error:(err) => {
    //             console.log("Error :- "+err);
    //         }
    //     })
    // }

    goActionMethod = () =>{
        if(count===0){
            this.setState({
                add:this.state.history.price,
            });
            this.props.addToCard(this.state.history);
            count++;
        }else{
            this.setState({
                add:this.state.history.total,
            });
            this.props.addToCard(this.state.history);
            count++;
        }

    };

    addToCard = (id,product,price) =>{
        this.setState({
           history:{
               id:id,
               product:product,
               price:price,
               total:this.state.add+price,
           }
        },()=>{
            this.goActionMethod();
        });
    };

    goDelete = () =>{
        count--;
        this.props.deleteToCard(this.state.id);
    };

    deleteItem = (id,price) =>{
        this.setState({
            id:id,
            add:'',
            history:{
                total:this.state.history.total-price,
            }
        },()=>{
            this.goDelete();
        })
    };

    handleChange = (e) =>{
        this.setState({
            quantity:e.target.value,
        })
    };

    payment = () =>{
        this.props.addPayment(this.state.history.total);
    };

    render(){
        return(
            <div className="addToCard">
                <Row className="show-grid" style={{marginTop:'3%'}}>
                    <Col xs={12} md={12}>
                        <div className="product">
                            <div className="p1">
                                <img src="../images/samsung-galaxy-j7-pro-500x500.jpg" width={300} height={300} /><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>Samsung J7 Pro 1501</b><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>&#x20B9; 18000</b><br /><br />
                                <RaisedButton label="Add To Card" secondary={true} onClick={()=>{this.addToCard(165043693077,'Samsung J7 Pro 1501',18000);}} /><br /><br />
                            </div>
                            <div className="p1">
                                <img src="../images/samsung-galaxy-j7-max-500x500.jpg" width={300} height={300} /><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>Motrola MX150</b><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>&#x20B9; 15000</b><br /><br />
                                <RaisedButton label="Add To Card" secondary={true} onClick={()=>{this.addToCard(165043693087,'Motrola MX150',15000);}} /><br /><br />
                            </div>
                            <div className="p1">
                                <img src="../images/s-l300.jpg" width={300} height={300} /><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>Samsung J7 Pro p1</b><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>&#x20B9; 20000</b><br /><br />
                                <RaisedButton label="Add To Card" secondary={true} onClick={()=>{this.addToCard(165043693042,'Samsung J7 Pro p1',20000);}} /><br /><br />
                            </div>
                            <div className="p1">
                                <img src="../images/in-galaxy-j7-pro-j730gm-sm-j730gzdwins-gold-73072245.jpg" width={300} height={300} /><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>Vivo J7 v1501</b><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>&#x20B9; 21000</b><br /><br />
                                <RaisedButton label="Add To Card" secondary={true} onClick={()=>{this.addToCard(165043693025,'Vivo J7 v1501',21000);}} /><br /><br />
                            </div>
                            <div className="p1">
                                <img src="../images/614201714703PM_635_j7max-db.jpeg" width={300} height={300} /><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>Mi M160</b><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>&#x20B9; 12000</b><br /><br />
                                <RaisedButton label="Add To Card" secondary={true} onClick={()=>{this.addToCard(165043693016,'Mi M160',12000);}} /><br /><br />
                            </div>
                            <div className="p1">
                                <img src="../images/614201714427PM_635_j7pro-db.jpeg" width={300} height={300} /><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>Samsung J7 Max M15</b><br /><br />
                                <b style={{fontFamily:'timeoutsShape',fontSize:'20px'}}>&#x20B9; 16000</b><br /><br />
                                <RaisedButton label="Add To Card" secondary={true} onClick={()=>{this.addToCard(165043693002,'Samsung J7 Max M15',16000);}} /><br /><br />
                            </div>
                        </div>
                    </Col>
                </Row>


                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.Products.map((row,index)=>{
                            return <tr>
                                <td>{index + 1}</td>
                                <td>{row.product}</td>
                                {/*<td>*/}
                                    {/*<form>*/}
                                        {/*<FormControl*/}
                                            {/*type="number"*/}
                                            {/*placeholder="Quantity"*/}
                                            {/*name="quantity"*/}
                                            {/*onChange={this.handleChange}*/}
                                        {/*/>*/}
                                    {/*</form>*/}
                                {/*</td>*/}
                                <td>&#x20B9;{row.price}</td>
                                <td><RaisedButton label="Remove" secondary={true} onClick={()=>{this.deleteItem(row.id,row.price)}}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"><b>Total Price</b> :- &#x20B9;
                                {
                                    this.state.history.total
                                }
                            </td>
                        </tr>
                    </tfoot>
                </Table>
                <RaisedButton label="Payment" secondary={true} onClick={()=>{this.payment()}}/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    Products:state.product.allProduct,
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({addToCard,deleteToCard,addPayment},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AddToCard);