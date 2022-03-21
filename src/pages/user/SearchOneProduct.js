import React,{Component} from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import App from "../../App";
import "../../css/SearchProduct.css"
import product from '../../img/office2019.png';
import cart from '../../img/addtocard.png';
import l_empty from '../../img/loveempty.png';
import l_full from '../../img/lovefull.png';
import axios from "axios";
import swal from "sweetalert";


class SearchOneProduct extends Component{
        state={
            visible:'visible',
            display:'none'
        }
        componentDidMount() {
            if(this.props.item.qte===0)
                this.setState({
                    visible:'hidden',
                    display:'block'
                })
        }

    addFunction=(path,toWhat)=>{
        const Ldn = document.querySelector("#lod");
        Ldn.style.display='flex';
        const login = document.querySelector("#login_btn");


         const payload={'id_product':this.props.item.id}
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
              /*
                swal({
                         title: "oops!",
                         text: "please login first !",
                         icon: "error",
                     });*/

                Ldn.style.display='none';
                login.click();
          })



    }
    addToWishList=e=>{
        this.addFunction('addToWishList','wish list')
    }

    addToCart=e=>{

        this.addFunction('addToCart','cart')


    }
    buy=e=>{
        this.props.history.push('/buyProduct')
    }

    render() {
        return (

                <div className="col-6 col-md-4 col-lg-3 col-sm-4  p-2" id="products_search" >


                    <div className="row">

                        <div className="card col-11 col-md-11 col-lg-11 col-sm-11 px-2 m-auto" id="product_search">
                            <img className="card-img-top img-fluid card-img mb-0 mt-2 pb-0 mx-0" src={axios.defaults.baseURL+"products/"+this.props.item.url} style={{height:"270px"}}/>
                            <div className="card-body">
                                <h6 className="card-title mb-4 mt-0 text-left"><b>{this.props.item.name}</b></h6>
                                <p className="card-text">{this.props.item.description}<br/>

                                    <b><i className="price_discounts">{this.props.item.discount} US$</i><br/><i className="prices">{this.props.item.price} US$</i> </b>
                                         <span className="text-danger" id="shipping_pr" style={{display:this.state.display,fontSize:"0.8em",fontWeight:"bold"}}>
                                                                Out of stock for now</span>
                                </p>
                                <div className="row">
                                    <div className="col-6 col-lg-6 col-md-6 col-sm-6" style={{visibility:this.state.visible}}>
                                         <Link    to={{
                                                pathname: "/buyProduct",
                                                item:this.props.item

                                             }} className="btn btn-primary mx-0 px-4">Buy</Link>

                                    </div>
                                    <div className="col-6 col-lg-6 col-md-6 col-sm-6">
                                        <div className="row" id="buy_cart">
                                            <div className="col-3 col-lg-3 col-md-3 col-sm-3">
                                                <i className='bx bxs-cart-add' onClick={this.addToCart}> </i>
                                            </div>
                                            <div className="col-6 col-lg-6 col-md-6 col-sm-6 my-auto mx-auto">
                                                <i className='bx bx-heart' onClick={this.addToWishList}> </i>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>



                </div>


        );
    }

}

export default  withRouter(SearchOneProduct);
