import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/FooterStyle.css"
import logo from "../../img/get serial logo.png"
import fb_logo from "../../img/fb_logo.png"
import in_logo from "../../img/in_logo.png"
import insta_logo from "../../img/insta_logo.png"
import gmail_logo from "../../img/gmail_logo.png"



class Footer extends Component{

    render() {
        return (


            <>
                <div className="row mt-3">

                    <img className="image-fluid col-lg-2 col-md-2 col-sm-4 col-4 mr-4 p-4 logo_ft" src={logo}/>

                    <div className="col-lg-4 col-md-4 col-sm-11 col-11 py-5 mx-5">
                        <h4>More informations</h4>
                        <span className="pl-2 font-weight-bold"><i className="fas fa-map-marker-alt"> </i> Address : </span>
                        <p className="pl-5">
                            Hay El Qods,near to kabados restaurant,Oujda,morocco.
                        </p>
                        <span className="pl-2 font-weight-bold"><i className="fas fa-envelope"> </i> Have any questions ?</span>
                        <p className="pl-5">
                            contact@GetSerial.com
                        </p>
                        <span className="pl-2 font-weight-bold"> <i
                            className="fas fa-phone-volume"> </i> Call us : </span>
                        <p className="pl-5">
                            +1 5366-27027
                        </p>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-11 col-11 py-5 ml-2 ">
                        <h4>Stay in touch </h4>
                        <p className="pl-2">
                            Sign up to get the latest offers
                        </p>
                        <form className="pl-4">
                            <div className="row">
                                <input type="email" className="form-control w-75 rounded"
                                       placeholder="enter your email address"/>
                                <button className="btn btn-primary w-15 ml-2" id="send"><i
                                    className="fas fa-arrow-right"> </i></button>
                            </div>
                        </form>
                        <div className="mt-4 pl-3">
                            <a><img src={fb_logo}/></a>
                            <a><img src={in_logo}/></a>
                            <a><img src={insta_logo}/></a>
                            <a><img src={gmail_logo}/></a>

                        </div>


                    </div>


                </div>
                <div className="row hr text-center px-0 mx-0">
                    <span className="text-center  w-100 py-1">&copy; Copyright. All rights reserved</span>

                </div>
            </>

 );
    }

}

export default Footer;