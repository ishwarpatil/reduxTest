import React from 'react';
import './jquery';

class CheckoutForm extends React.Component{
    render(){
        return(
            <div>

                <form id="paymentForm" class="form-horizontal">
                    <div class="form-group">
                        <label class="col-xs-3 control-label">Product name</label>
                        <div class="col-xs-5">
                            <input type="text" class="form-control" name="productName" value="T-Shirt" readonly="readonly" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Price</label>
                        <div class="col-xs-3 inputGroupContainer">
                            <div class="input-group">
                                <input type="text" class="form-control" name="price" value="25" readonly="readonly" />
                                <span class="input-group-addon">$</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Your full name</label>
                        <div class="col-xs-5">
                            <input type="text" class="form-control" name="fullName" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Credit card number</label>
                        <div class="col-xs-5">
                            <input type="text" class="form-control" data-stripe="number" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Expiration</label>
                        <div class="col-xs-3">
                            <input type="text" class="form-control" placeholder="Month" data-stripe="exp-month" />
                        </div>
                        <div class="col-xs-3">
                            <input type="text" class="form-control" placeholder="Year" data-stripe="exp-year" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">CVV</label>
                        <div class="col-xs-2">
                            <input type="text" class="form-control" data-stripe="cvc" />
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-9 col-xs-offset-3">
                            <button type="submit" class="btn btn-primary">Purchase</button>
                        </div>
                    </div>

                    <input type="hidden" name="token" />
                </form>
            </div>
        )
    }
}

export default CheckoutForm;