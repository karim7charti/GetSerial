import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/NewProducts.css"
import product from '../../img/win10.png';
import add from '../../img/add.png';



class BestSelling extends Component{
    render() {
        return (

            <div className="col-12 col-md-12 col-lg-11 col-sm-12 py-0 mx-auto mt-2 " id="pr">

                <div className="row">

                    <div className="col-3 col-md-3 col-lg-3 col-sm-3 p-1 Picture">
                        <img src={product} id="newPr"/>
                    </div>
                    <div className="col-8 col-md-8 col-lg-8 col-sm-8 p-1">
                        <div className="row">
                            <div className="col-10 col-md-10 col-sm-10 col-lg-10 pt-3">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 p-0">
                                        <div id="title"><b>Adobe Photoshop 2021</b></div>
                                    </div>
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 price_detail">
                                        <b><i className="price">40.99 US$</i></b>
                                    </div>
                                </div>

                            </div>
                            <div className="col-2 col-md-2 col-lg-2 col-sm-2 py-4 px-0" id="addDiv">
                                <div className="row" id="buy_cart">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12  my-auto mx-auto">
                                        <i className='bx bxs-cart-add' > </i>
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

export default BestSelling;
