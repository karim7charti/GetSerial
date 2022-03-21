import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/NewProducts.css"
import CartBuyDetails from "./CartBuyDetails";
import CartOneProduct from "./CartOneProduct";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import Alert from "./Ui-component/Alert"
import Loading from "./Ui-component/Loading";
import SkeletonOrder from "./Ui-component/SketelonOrder"


class Cart extends Component{
    state={
        loading:true,
        cartProducts:[],
        allProducts:[],
        products:0,
        details:[],
        refs:[],

        productsCount:0,
        checked:true
    }
    componentDidMount() {
        axios.get('/api/getUsersCart').then(response=>{
            this.setState({
                loading:false,
                cartProducts:response.data.products,
                allProducts:response.data.products,

                productsCount:response.data.products.length

            },()=>{
                  var p=0;
                 this.state.cartProducts.forEach(item=>{
                     if(item.qte!==0)
                         p++;
                 })
                 this.setState({
                     products:p,
                 })

            })
        })
    }
     removeIt=(i)=>{

        var arr=this.state.cartProducts
        arr.splice(i,1);
        this.setState({
            cartProducts:arr,
            products:arr.length

        })



    }
    selectOne=(add,item,index)=>{
        if(add && !this.state.cartProducts.includes(item)){
             this.setState(state=>({
                 products: state.products+1,
                 cartProducts:state.cartProducts.concat(item)


             }))
            return
        }
        if(!add && this.state.cartProducts.includes(item)) {
            var arr=this.state.cartProducts
            var inde;
            for(let i=0;i<arr.length;i++){
                if(arr[i].id===item.id)
                {
                    inde=i;
                    break;
                }
            }
            arr.splice(inde,1);
              this.setState(state=>({
                   cartProducts:arr,
                     products:arr.length


             }))



        }

    }
    selectAll=e=>{
        if(this.state.checked){
            this.setState(state=>({
                checked:false,
                 products:0,
                cartProducts:[]

             }))
               this.state.refs.forEach(item=>{
                item.method(false)
            })


        }

        else
        {
            this.state.refs.forEach(item=>{
                item.method(true)
            })

             this.setState(state=>({
                checked:true,

                 cartProducts:state.allProducts
             }),()=>{
                 var p=0;
                 this.state.cartProducts.forEach(item=>{
                     if(item.qte!==0)
                         p++;
                 })
                 this.setState({
                     products:p,
                 })
             })
        }




    }
    setQte=(id,qte)=>{
        var arr=this.state.cartProducts;

        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].id===id)
            {
                arr[i].quantity=qte;
                break;
            }
        }
        this.setState({
            cartProducts:arr
        })

    }


    render() {
         var products=""
        var cartDetails=<CartBuyDetails products={0} details={[{}]} subtotal={0} tax={0.25} total={0.25}/>
        if(this.state.loading)
             products= <>
                 <SkeletonOrder/>
                 <SkeletonOrder/>
                 <SkeletonOrder/>
                 <SkeletonOrder/>
                 <SkeletonOrder/>
             </>
        else{
             if(this.state.allProducts.length===0)
                products= <div className="col-lg-12 mx-0 px-0">
                    <Alert/>
                </div>
            else{
                    products=this.state.allProducts.map((item,index)=>{
                        return <CartOneProduct checked={this.state.checked} onRef={ref => (this.setState(state=> ({
                            refs: state.refs.concat(ref)
                        })))} item={item} i={index} selectOne={this.selectOne} removeIt={this.removeIt} setQte={this.setQte}/>
                    })
                 var subtotal=0
                 var ids=[]
                 var ids1=[]
                 var details=[]
                 this.state.cartProducts.forEach(item=>{
                     if(item.qte!==0)
                     {
                            subtotal+=item.discount*item.quantity;
                             details.push({id:item.id,price:item.discount,qte:item.quantity})
                            ids.push(item.id)
                            ids.push(item.quantity)
                     }

                 })


                 localStorage.setItem('ids',ids)


                 cartDetails=<CartBuyDetails products={this.state.products}   details={details} ids={ids}  subtotal={subtotal.toFixed(2)} tax={5} total={(subtotal+subtotal*0.05).toFixed(2)}/>

             }

        }

        return (



            <>
                <span id="lod" style={{display:"none"}}><Loading/></span>
              <span style={
                    {
                        zIndex:"2"
                    }
                }/>
                <NavBar/>

                <section className="container my-5 mx-auto pt-5">

                    <div className="row m-auto " id="Cart">
                        <div className="col-lg-7 col-md-7 col-sm-11 col-11 mx-auto order-2 order-md-1 order-lg-1 order-sm-2">
                            <div className="row">
                                <div className="col-lg-12 mt-2 mb-0 py-3 px-3" id="resume">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h4>Basket ({this.state.products})</h4>
                                            <i className='bx bxs-file-find' style={{color:"#ff00d9"}} className=" buy_option"> </i>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-check">
                                                <input className="form-check-input mr-1" type="checkbox" value=""
                                                       id="flexCheckDefault" checked={this.state.checked} onChange={this.selectAll}/>
                                                    <label className="form-check-label mt-1 ml-1" htmlFor="flexCheckDefault">
                                                        Select All
                                                    </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mr-0 mt-2" id="list_cart">
                                    {products}
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-5  col-md-5 col-sm-11 col-11 mx-auto order-1 order-md-2 order-lg-2 order-sm-1 p-1 mx-auto">
                            {cartDetails}
                        </div>
                    </div>


                </section>
                <section id="Contact" className="container-fluid py-0 ">
                    <Footer/>
                </section>


            </>




        );
    }

}

export default Cart;
















