import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/CartStyle.css"
import product from '../../img/adobe_ph.jpg';
import add from '../../img/add.png';
import axios from "axios";
import swal from "sweetalert";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';


class OrdersOne extends Component{
    state={
        display:'none',
        display1:'block',
        status:'',
        checked:true

    }
    componentDidMount() {
        this.props.onRef(this)
        if(this.props.item.livred===1)
            this.setState({
                 display:'block',
                 display1:'none',
            })
        else
             this.setState({
                 display:'none',
                 display1:'block',
            })




    }
     method(checked) {

      this.setState({ checked: checked})
         console.log("nnnn")

  }
     selectItem=e=>{



        if(this.state.checked)
        {
            this.props.selectOne(false,this.props.item,this.props.i)
            this.setState({
                checked:false,


            })
            this.props.setCheked()
        }


        else
        {
            this.props.selectOne(true,this.props.item,this.props.i)
             this.setState({
                checked:true,


            })


        }

    }
        addToCart=e=>{

             const Ldn = document.querySelector("#lod");

                 const payload={'id_product':this.props.item.id}
        Ldn.style.display='flex';

        axios.post('/api/addToCart',payload).then(response=>{
            if(response.data.status===200)
                swal({
                            title: "good job!",
                            text: "product added to cart succefully!",
                            icon: "success",
                        });

            else
                 swal({
                                    title: "oops!",
                                    text: "product already exist in your Basket!",
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

    askForRefund=e=>{
                     const Ldn = document.querySelector("#lod");
           swal({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {

                if (willDelete) {
                    Ldn.style.display='flex';
                    await axios.post('api/askForRefund/'+this.props.item.orderId).then(response=>{
                        if(response.data.status===200)
                        {

                            swal("Good job!", "Your request has been successfully sended," +
                                "we will contact you as soon as possibe in your e-mail","success");

                        }
                        else
                             swal({
                            title: "oops!",
                            text: "this order is already shipped" +
                                "!",
                            icon: "error",
                        });

                           Ldn.style.display='none';

                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "somthing went wrong retry!",
                            icon: "error",
                        });
                           Ldn.style.display='none';

                    })

                }

            });

    }
    hideItem=e=>{
                const Ldn = document.querySelector("#lod");
           swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {

                if (willDelete) {
                    Ldn.style.display='flex';
                    await axios.post('api/hideOrder/'+this.props.item.orderId).then(response=>{
                        if(response.data.status===200)
                        {
                            this.props.removeIt(this.props.i)
                            swal("Good job!", "item deleted succefully","success");

                        }
                           Ldn.style.display='none';

                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "somthing went wrong retry!",
                            icon: "error",
                        });
                           Ldn.style.display='none';

                    })

                }

            });
    }

    render() {
        return (

            <>


                <div className="row   pb-3 pt-2  mx-auto my-3" id="One_pr_cart">

                    <div className="col-lg-12 m-auto">
                        <div className="row  mt-1">
                            <div className="col-lg-8 col-md-7 col-sm-4 col-1  pl-4 pr-0 mr-0">
                                <input className="form-check-input"  type="checkbox" onChange={this.selectItem} checked={this.state.checked} value=""/><br/>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-9 text-right float-right my-auto">
                                <span id="shipping_pr" style={{color:"lightGray"}}>{"Ordered "+this.props.item.date} </span>
                            </div>
                            <div className="col-lg-1  col-md-1 col-sm-1 col-1 text-right float-right" id="del_pr" style={{display:this.state.display}}>
                                <i className='bx bxs-trash' title="Delete from orders" onClick={this.hideItem}> </i>

                            </div>
                            <div className="col-lg-12 m-auto">
                                <hr style={{width:"100%"}} className="ml-0 p-0"/>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-12">
                        <div className="row py-auto">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-12 my-auto">
                                <div className="row  my-auto">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 my-auto mx-auto">
                                        <img src={axios.defaults.baseURL+"products/"+this.props.item.url}  id="img-pr"/>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-9 col-7 pl-3 my-auto mx-auto">
                                        <div className="row m-auto">
                                            <div className="col-lg-12 m-auto">
                                              <span id="name_pr">
                                                  <b>{this.props.item.name}</b>
                                              </span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="" style={{color:"darkblue",fontSize:"0.8em"}}>
                                                 Total:&nbsp;&nbsp;&nbsp;&nbsp;
                                              </span>
                                              <span id="discount_pr">
                                                  <b>{this.props.item.discount}$ X {this.props.item.quantity}</b>
                                              </span>

                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="shipping_pr">
                                                    <b style={{color:"red"}}>{this.props.item.qte}</b> licence left
                                                </span>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3  col-md-3 col-sm-12 col-12 m-auto">
                                <div className="row m-auto p-auto">

                                    <div className="col-lg-12 col-md-6 col-sm-4 col-4 text-center">
                                                <span id="shipping_pr">
                                                    <i>Order status:</i>
                                                </span>

                                    </div>
                                    <div className="col-lg-12 col-md-6 col-sm-4 col-4 text-center">
                                                <span id="order_pr" style={{display:this.state.display}}>
                                                    <i className='bx bxs-check-circle' style={{color:"#fc00cc"}}> </i>&nbsp;&nbsp;Shipped
                                                </span>
                                                <span id="order_pr" style={{display:this.state.display1}}>
                                                    <i className='bx bxs-timer' style={{color:"#fc00cc"}}> </i>&nbsp;Awaiting to be Shipped
                                                </span>

                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12  col-md-12 col-sm-12 col-12">
                                <div className="row mt-2">
                                    <div className="col-lg-4">
                                        <div className="row mb-0">
                                            <div className="col-lg-12 text-left my-auto">


                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 order-2 order-sm-2 order-lg-1 order-md-1  float-right text-right mx-auto mt-2 pr-2" id="refund_btn" style={{display:this.state.display1}}>
                                        <div className="input-group">
                                            <div className="input-group-text icon" id="btnGroupAddon">
                                                <MoneyOffIcon className='bx bxs-cart-add' style={{color:"rgba(233,0,120,0.9)"}} fontSize={"small"}> </MoneyOffIcon></div>
                                            <input type="submit" onClick={this.askForRefund} className="form-control btn_add" value="Ask for refund"
                                                   placeholder="Input group example" aria-label="Input group example"
                                                   aria-describedby="btnGroupAddon" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 order-1 order-sm-1 order-lg-2 order-md-2  float-right text-right mx-auto mt-2 mr-0 pr-2" id="add_to">
                                        <div className="input-group">
                                            <div className="input-group-text icon" id="btnGroupAddon">
                                                <i className='bx bxs-cart-add bx-tada' style={{color:"white",fontSize:"1.5em"}}> </i></div>
                                            <input type="submit" onClick={this.addToCart} className="form-control btn_add" value="Add to cart again"
                                                   placeholder="Input group example" aria-label="Input group example"
                                                   aria-describedby="btnGroupAddon" />
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>





            </>




        );
    }

}

export default OrdersOne;
















