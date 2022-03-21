import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/CartStyle.css"
import swal from "sweetalert";
import axios from "axios";

import { loadScript } from "@paypal/paypal-js";





class CartBuyDetails extends Component{


    checkCode=()=>{

    }
    componentDidMount() {

        //var payload=
        loadScript({ "client-id": "AcolZL5tAi7DCTrpjwu80E38geJdpKKWyTwrJ694Ji7sk4jhVVKK6QQkr0YMkmPH-05GEQs6udGTXIfw",'disable-funding':"card" })
                .then((paypal) => {


                    function checkCode(text){
                         swal({
                          text: text,
                          content: "input",
                          button: {
                            text: "Confirm!",
                            closeModal: false,
                          },
                        })
                        .then(code => {
                            if(code==="" || isNaN(code)){

                                  checkCode('the code is required and must be a number ')
                            }
                            else
                            {
                                axios.post('api/confirm',{code:code}).then(response=>{
                                    if(response.data.status===200){
                                              swal({
                                                 title: "good job!",
                                                 text: "your account is verified you can purchase now !",
                                                 icon: "success",
                                             });
                                    }
                                    else if(response.data.status===404)
                                        checkCode('wrong code please retry');
                                    else
                                        checkCode(response.data.errors.code.toString());


                                })
                            }


                        })
                    }

                          paypal.Buttons({

            // Call your server to set up the transaction

            createOrder: function(data, actions) {
                var frm=new FormData()


                frm.append('ids','['+localStorage.getItem('ids').toString()+']');

                 return fetch(axios.defaults.baseURL+'api/create-payment', {
                    method: 'post',
                    body:frm,
                   headers: {
                    'Accept': 'application/json',
                    'Authorization':'Bearer '+localStorage.getItem("token")
                  },
                }).then(function(res) {
                    if(res.status===200)
                        return res.json();
                    else if(res.status===404 || res.status===401)
                         throw new Error('Something went wrong');

                    else
                        throw new Error('email need to be verified');


                }).then(function(orderData) {
                    return orderData.id;
                }).catch(error=>{
                    if(error.toString().includes('Something went wrong'))
                            swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });



                    else
                        checkCode('Please enter the code sended to your e-mail ')
                 })



            },

            // Call your server to finalize the transaction

              onApprove: function(data, actions) {
                return fetch(axios.defaults.baseURL+'api/execute-payment' , {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Authorization':'Bearer '+localStorage.getItem("token")
                  },

                    body :JSON.stringify({
                        orderId : data.orderID,

                    })
                }).then(function(res) {
                   // console.log(res.json());
                    return res.json();
                }).then(function(orderData) {

                    // Successful capture! For demo purposes:
                  //  console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    var transaction = orderData.purchase_units[0].payments.captures[0];
                      swal({
                         title: "done !",
                         text: "purchased succefully !",
                         icon: "success",
                     }).then(()=>{
                          window.location.reload()
                      });

                });
            }

        }).render('#paypal-button')

                })
                .catch((err) => {
                    console.error("failed to load the PayPal JS SDK script", err);
                });

    }




    render() {
       var arr=this.props.details;




     var detail=arr.map(item=>{
            return<> <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-right">{item.qte} × {item.price}$</div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left"></div> </>


        })

        return (

            <>

                        <div className="row px-2 mx-1 py-4" id="Buy_details">
                            <div className="col-lg-11 m-auto">
                                <h5><b>Orders Summary</b></h5>
                            </div>
                            <div className="col-lg-11 mx-auto my-2" id="order_dt">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left">Products</div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-right">{this.props.products}</div>
                                </div>
                                  <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 text-left">Details</div>

                                      {detail}
                                </div>
                                <div className="row">
                                    <div className="col-lg-6  col-md-6 col-sm-6 col-6 text-left">Subtotal</div>
                                    <div className="col-lg-6  col-md-6 text-right">{this.props.subtotal}$</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6  col-md-6 col-sm-6 col-6 text-left">Tax</div>
                                    <div className="col-lg-6  col-md-6 col-sm-6 col-6 text-right">{this.props.tax} %</div>
                                </div>
                            </div>
                            <div className="col-lg-11 mx-auto mb-2">
                                <hr/>
                            </div>

                            <div className="col-lg-11 mx-auto" id="order_total">
                                <div className="row  ">
                                    <div className="col-lg-6  col-md-6 col-sm-6 col-6 text-left">Total</div>
                                    <div className="col-lg-6  col-md-6 col-sm-6 col-6 mb-2 text-right"><b>{this.props.total}$</b></div>
                                </div>
                                <div className="row mt-3">
                                    <div id="paypal-button" className="col-lg-12 m-auto">{/*<button id="buy_btn">Buy ( {this.props.products} )</button>*/}


                                    </div>

                                </div>



                            </div>

                        </div>








            </>




        );
    }

}

export default CartBuyDetails;
















