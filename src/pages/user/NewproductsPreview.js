import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";

import NewProducts from "./NewProducts";
import BestSelling from "./BestSelling";
import ComingSoon from "./ComingSoon";
import NewProductsAll from "./NewProductAll";
import BestSellingAll from "./BestSellingAll";
import ComingSoonAll from "./ComingSoonAll";


class NewProductsPreview extends Component{
    render() {
        return (

            <div className="row m-auto">
                <NewProductsAll/>
                <BestSellingAll/>
                <ComingSoonAll/>

            </div>





        );
    }

}

export default NewProductsPreview;
