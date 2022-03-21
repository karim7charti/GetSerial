import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import '../../css/test.css'
import back from "../../img/get serial logo.png";
import back4 from "../../img/username.png";
import back3 from "../../img/password.png";

class Test extends Component{

    render(){
        return (
            <>



                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Sign in
                </button>


                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content" id="login">
                            <div class="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col">
                                    <img src={back} id="logo"/>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Connect to your account and explore more features!                                        </p>

                                    </div>
                                    <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id="login_form" method="post" >
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back4} className="icons"/></span>

                                                <input type="email" required className="form-control" placeholder="Email"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="email"  />
                                                <span className="text-danger"></span>
                                            </div>

                                        </div>
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto py-2">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3} className="icons"/></span>

                                                <input id="pass" type="password" required className="form-control" placeholder="Password"
                                                       aria-label="Password" aria-describedby="basic-addon1" name="password"  />
                                                <box-icon id="eye" name='show' color='#e90078' > </box-icon>

                                                <span className="text-danger">{}</span>
                                            </div>

                                        </div>
                                    </form>


                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="cancel_login" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" id="login_btn_form" class="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }


}


export default Test;
