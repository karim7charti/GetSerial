import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/NewProducts.css"
import "../../css/TrendStyle.css"
import product from '../../img/adobe_ps.png';
import back7 from "../../img/win10bg.jpg";
import back8 from "../../img/adobebg.jpg";
import back9 from "../../img/officebg.jpg";


class TrendProduct extends Component{
    render() {
        return (


            <>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 col-xl-12 my-4 mx-auto p-0">

                    <div id="carouselExampleDark" className="carousel slide m-auto" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                                    className="active" aria-current="true" aria-label="Slide 1"> </button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                    aria-label="Slide 2"> </button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                    aria-label="Slide 3"> </button>
                        </div>
                        <div className="carousel-inner  m-0">
                            <div className="carousel-item active">
                                <img src={back7} className="d-block w-50 mx-auto" alt="Windows 10 Pro"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Windows 10 Pro</h5>

                                    </div>
                            </div>
                            <div className="carousel-item">
                                <img src={back8} className="d-block w-50 m-auto" alt="Adobe Photoshop 2019"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Adobe Photoshop 2019</h5>

                                    </div>
                            </div>
                            <div className="carousel-item">
                                <img src={back9} className="d-block w-50 m-auto" alt="Office 2019"/>
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>Office 2019 full</h5>

                                    </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>

                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>

                        </button>
                    </div>



                </div>



            </>

           /* <>

                <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2 mx-0 p-0">
                    <div className="row">
                        <div className="col-12 col-lg-8 col-md-8 col-sm-12 align-middle m-0 ml-0 p-auto" id="trend_text">
                            <div className="row">
                                <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                    <h4>Windows 11</h4>
                                </div>
                                <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                                    <p>A lifetime pro licence key of Windows 11  exclusive edition</p>
                                </div>
                                <div className="col-8 col-lg-8 col-md-8 col-sm-8 ml-0">
                                    <button className="btn-primary">
                                        Get your key now!
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 col-md-4 col-sm-12 m-auto" >
                              <img src={product} id="trend_image"/>
                        </div>
                    </div>

                </div>

            </>*/











        );
    }

}

export default TrendProduct;
