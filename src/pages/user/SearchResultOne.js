import React,{Component} from "react";
import {Link,withRouter, Redirect} from "react-router-dom";
import App from "../../App";
import "../../css/SearchProduct.css"

import axios from "axios";

class SearchResultOne extends Component{
  red=e=>{
     this.props.history.push({pathname:'/buyProduct',item:this.props.item})
    }

    render() {

        return (
            <>

                <span id="search_bar_user" >

                    <div className="row mb-1 ml-0 pl-0" id="active_pr" onClick={this.red}>
                                                        <div className="col-lg-1 col-md-1 col-sm-2 col-2 ml-0 my-1 pl-1">
                                                            <img src={axios.defaults.baseURL+"products/"+this.props.item.url} width={60} height={70} style={{borderRadius:"4px"}}/>
                                                        </div>
                                                        <div className="col-lg-11 col-md-11 col-sm-10 col-10 pl-3 my-auto">
                                                            <div className="col-lg-12  col-md-12 col-sm-12 col-12 ml-1">
                                                       <span id="name_pr">
                                                        {this.props.item.name}
                                                       </span>
                                                            </div>
                                                            <div className="col-lg-11  col-md-11 col-sm-10 col-10 ml-1">
                                                        <span id="shipping_pr">
                                                             <b style={{color:"red"}}>{this.props.item.qte}</b> Licence left in stock
                                                        </span>
                                                            </div>

                                                        </div>
                                                    </div>


                </span>


                </>

        );
    }

}

export default withRouter(SearchResultOne);
