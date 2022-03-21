import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import NavBar from './NavBar';
import AllProducts from "./AllProducts";
import '../../css/homeStyle.css'
import back from '../../img/office2019.png'
import back2 from '../../img/win10.png'
import back3 from '../../img/adobe_ps.png'
import wlc from '../../img/welcome.png'
import NewProductsPreview from "./NewproductsPreview";
import Footer from "./Footer";
import TrendProduct from "./TrendProduct";
import LoadingTr from "./Ui-component/LoadingTr";
import Loading from "./Ui-component/Loading";



class HomePage extends Component{

    constructor(props) {
        super(props);

        const images = [
            back,
            back2,
            back3
        ];

    }

    componentDidMount() {
        if (window.screen.width>1360){
            document.querySelector("#home").classList.add("col-xl-10");
            document.querySelector("#trend_preview").classList.add("col-xl-10");
            document.querySelector("#products_preview").classList.add("col-xl-10");
            document.querySelector("#last_products").classList.add("col-xl-10");
        }
    }



    render() {
        return(

            <>
                   <span id="lod" style={{display:"none"}}><Loading/></span>
              <span style={
                    {
                        zIndex:"2"
                    }
                }/>

            <NavBar/>

                <section id="home" className="container  mx-auto px-0">
                    <div className="row px-0 mx-0">
                        <div className="col-lg-12 px-0 mx-0">
                            <img src={wlc} id="wlc_img"/>
                        </div>
                    </div>


                </section>

                <section id="last_products" className="container" >
                    <div className="row">
                        <AllProducts/>
                    </div>

                </section>

                <section id="trend_preview" className="container">
                    <TrendProduct/>

                </section>

                <section id="products_preview" className="container">

                    <div className="row">
                        <NewProductsPreview/>
                    </div>

                </section>



                <section id="Contact" className="container-fluid py-0 ">
                    <Footer/>
                </section>





            </>



        );
    }
}








export default HomePage;
