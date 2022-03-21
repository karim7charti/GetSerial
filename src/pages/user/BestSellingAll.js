import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";


import BestSelling from "./BestSelling";
import axios from "axios";
import Alert from "./Ui-component/Alert";
import NewProducts from "./NewProducts";
import SketelonDiscountProducts from "./Ui-component/SketelonDiscountProducts";



class BestSellingAll extends Component{
         state={
        products:[],
        loading:true,
    }
    componentDidMount() {
         axios.get('api/bestSelled').then(res=>{
             if(res.data.status===200)
             {
                 this.setState({
                     products:res.data.products,
                     loading:false
                 })
             }

         }).then(err=>{

         })
    }
    render() {
             var products=""
         if(this.state.loading){
            products=<>

                <SketelonDiscountProducts height={50}/>
                <SketelonDiscountProducts height={50}/>
                <SketelonDiscountProducts height={50}/>
                <SketelonDiscountProducts height={50}/>
                <SketelonDiscountProducts height={50}/>
                <SketelonDiscountProducts height={50}/>


            </>
         }
         else
         {
            if(this.state.products.length===0)
                products=<div className="col-lg-12 mx-0 px-0">
                    <Alert/>
                </div>
             else
                 products=this.state.products.map((item)=>{

                          return(


                        <NewProducts item={item}


                        />
                    )



                });
         }
        return (


            <div className="col-lg-4 col-md-4 col-sm-10 col-10 my-2 mx-auto p-2  Preview">
                    <div className="row">

                        <div className="col-12 col-lg-11 col-md-12 col-sm-12 mt-2 mx-3"><b>Best selling</b></div>
                        <div className="col-11 col-lg-11 col-md-11 col-sm-11 p-1 m-auto">
                            {products}
                        </div>

                    </div>

                </div>










        );
    }

}

export default BestSellingAll;
