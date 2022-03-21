import React,{Component} from "react";

import "../../css/OneProductBuyPageStyle.css"
import product from '../../img/office2019.png';

import axios from "axios";
import swal from "sweetalert";
import {Link,withRouter} from "react-router-dom";
import SellIcon from '@mui/icons-material/Sell';
import NavBar from "./NavBar";
import Footer from "./Footer";
import visa from '../../img/visa.png';
import mastercard from '../../img/mastercard.png';
import paypal from '../../img/paypal.png';
import Loading from "./Ui-component/Loading";
import LoadingTr from "./Ui-component/LoadingTr";
import {loadScript} from "@paypal/paypal-js";


class OneProductBuyPage extends Component{
    state={
        quantity:1
    }
    componentDidMount() {
        localStorage.setItem('data',[this.props.location.item.id,this.state.quantity])
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

                          paypal.Buttons({style:{

                                   color: 'blue',


                              },

            // Call your server to set up the transaction

            createOrder: function(data, actions) {
                var frm=new FormData()


                frm.append('ids','['+localStorage.getItem('data').toString()+']');

                 return fetch(axios.defaults.baseURL+'api/create-payment2', {
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
                return fetch(axios.defaults.baseURL+'api/execute-payment2' , {
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
                     });

                });
            }

        }).render('#paypal-button')

                })
                .catch((err) => {
                    console.error("failed to load the PayPal JS SDK script", err);
                });

    }


    addFunction=(path,toWhat)=>{
        const Ldn = document.querySelector("#lod");
        Ldn.style.display='flex';
        const login = document.querySelector("#login_btn");


         const payload={'id_product':this.props.location.item.id}
          axios.get('/api/isAuthentacated').then(response=>{
            if(response.data.status===200){
                     axios.post('/api/'+path,payload).then(response=>{
            if(response.data.status===200)
               swal({
                                    title: "good job!",
                                    text: "product added to "+toWhat+" succefully!",
                                    icon: "success",
                             });
            else
                 swal({
                                    title: "oops!",
                                    text: "product already exist in your "+toWhat+" !",
                                    icon: "warning",
                             });


            Ldn.style.display='none';


        }).catch(error=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });

              Ldn.style.display='none';

        })
            }
          }).catch(error=>{


                Ldn.style.display='none';
                login.click();
          })



    }
      addToCart=e=>{

        this.addFunction('addToCart','cart')


    }
    add=e=>{
        if(this.state.quantity<this.props.location.item.qte)
        this.setState(state=>({
            quantity:state.quantity+1
        }),()=>{
            localStorage.setItem('data',[this.props.location.item.id,this.state.quantity])
        })

    }
    sub=e=>{
        if(this.state.quantity>1)
         this.setState(state=>({
            quantity:state.quantity-1
        }),()=>{
              localStorage.setItem('data',[this.props.location.item.id,this.state.quantity])
         })
    }

    render() {


        return (
            <>
                <span id="lod" style={{display:'none'}}><Loading/></span>
                <span style={
                    {
                        zIndex:"2"
                    }
                }>

                    <NavBar/>
            <div className="col-lg-12 col-md-12 px-auto mb-3" id="product_buy">


                <div className="row mx-auto">
                    <div className="col-lg-6 col-md-5 col-sm-10 col-10 mx-auto text-center">
                        <img  src={axios.defaults.baseURL+"products/"+this.props.location.item.url} className="" id="buy_img"/>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-9 col-10  px-4 mx-auto" id="buy_details">
                        <div className="row">

                            <div className="col-lg-9 col" id="buy_title">
                               <b>{this.props.location.item.name}</b>
                            </div>

                            <div className="col-lg-12 float-center" id="buy_sys">
                                <i className='bx bxl-windows mr-1' style={{color:"#6f6868"}}> </i><span className=" mr-4  ">Windows</span>
                                <i className='bx bxl-apple mr-1' style={{color:"#6f6868"}}> </i><span className="my-auto">MacOs</span>
                            </div>

                            <div className="col-lg-12 mt-3 mb-2">
                                <div className="row">
                                    <div className="col-lg-9 col-sm-12 mx-0">
                                        <span id="buy_price">
                                            <b>{this.props.location.item.discount} US$</b>
                                        </span>
                                        <span className="buy_discount  ml-2 mr-2 text-left">
                                           <b>{this.props.location.item.price} US$</b>
                                        </span>
                                        <span id="dis_icon" className="p-1  float-center">
                                            <SellIcon fontSize={"small"}/><b>SAVE 50%</b>
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-10 my-2">
                                    <div className="row">
                                        <div className="col-lg-10 qte">
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-4 col-3">
                                                    Quantity
                                                </div>
                                                <div className="col-lg-8 col-sm-8 col-9 text-right">
                                            <span>
                                                <i className='bx bx-timer m-1' style={{color:"black",fontSize:"1em"}}> </i>Only <b>{this.props.location.item.qte}</b> left in stock
                                            </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-10 my-2 p-0 " id={"buy_qte"}>
                                            <div className="input-group">
                                                <span className="input-group-text contr1" id="basic-addon1" onClick={this.sub}><i className='bx bx-minus m-auto' > </i></span>
                                                <input type="text" className="form-control text-center px-0 mx-0" placeholder=""
                                                       aria-label="Username" aria-describedby="basic-addon1" value={this.state.quantity}/>
                                                <span className="input-group-text contr2 mr-1" id="basic-addon1" onClick={this.add}><i className='bx bx-plus m-auto' > </i></span>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div className="col-lg-10 px-0  buy_btns" >
                                <div className="row">
                                    <div id="paypal-button" className="col-lg-10">

                                    </div>
                                    <div className="col-lg-10">
                                        <button onClick={this.addToCart} className=" add">
                                            <i className='bx bx-cart-alt mx-1'> </i>Add to Cart
                                        </button>
                                    </div>
                                </div>


                            </div>

                            <div className="col-lg-10 my-3">
                                <div className="row">
                                    <div className="col-lg-10 p-2 float-center text-center buy_opts">
                                        <div className="row col-10 my-1 mx-auto">
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-3 mx-auto">
                                                <img src={paypal}/>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-3 mx-auto">
                                                <img src={visa}/>

                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-3 mx-auto">
                                                <img src={mastercard}/>

                                            </div>
                                            <div className="row col-10 mb-1 mt-2 mx-auto px-0 grt  float-center text-center">
                                                <span className=" float-center text-center mx-auto">Guaranteed safe & secure checkout</span>
                                            </div>
                                        </div>


                                    </div>

                                </div>



                            </div>

                            <div className="col-lg-12">

                            </div>

                            <div className="col-lg-12">

                            </div>

                            <div className="col-lg-12">

                            </div>


                        </div>

                    </div>


                </div>



            </div>
                <section id="Contact" className="container-fluid py-0 ">
                    <Footer/>
                </section>

                </span>

            </>
        );
    }

}

export default withRouter(OneProductBuyPage) ;
