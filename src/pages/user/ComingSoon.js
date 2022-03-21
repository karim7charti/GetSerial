import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/NewProducts.css"
import product from '../../img/office2019.png';
import add from '../../img/add.png';
import axios from "axios";
import swal from "sweetalert";



class ComingSoon extends Component{
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

    addToCart=e=>{

        this.addFunction('addToCart','cart')


    }
    render() {
        return (

            <div className="col-12 col-md-12 col-lg-11 col-sm-12 py-0 mx-auto mt-2 " id="pr">

                <div className="row">

                    <div className="col-3 col-md-3 col-lg-3 col-sm-3 p-1 Picture">
                        <img src={axios.defaults.baseURL+"products/"+this.props.item.url} id="newPr"/>
                    </div>
                    <div className="col-8 col-md-8 col-lg-8 col-sm-8 p-1">
                        <div className="row">
                            <div className="col-10 col-md-10 col-sm-10 col-lg-10 pt-3">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                        <div id="title"><b>{this.props.item.name}</b></div>
                                    </div>
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 price_detail">
                                        <b><i className="Soon">Soon</i></b>
                                    </div>
                                </div>

                            </div>
                            <div className="col-2 col-md-2 col-lg-2 col-sm-2 py-4 px-0" id="addDiv">
                                <div className="row" id="buy_cart">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12  my-auto mx-auto">
                                        <i className='bx bxs-cart-add' onClick={this.addToCart} > </i>
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

export default ComingSoon;
