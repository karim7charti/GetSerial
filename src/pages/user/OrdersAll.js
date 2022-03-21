import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/NewProducts.css"
import "../../css/CartStyle.css"

import NavBar from "./NavBar";
import Footer from "./Footer";
import OrdersOne from "./OrdersOne";
import Alert from "./Ui-component/Alert";
import axios from "axios";
import swal from "sweetalert";
import Loading from "./Ui-component/Loading";
import SkeletonOrder from "./Ui-component/SketelonOrder"


class OrdersAll extends Component{
    state={
        loading:true,
        orders:[],
        orders2:[],
        countProd:"",
         checked:true,
        refs:[],
    }
    componentDidMount() {
        axios.get('api/usersOrders').then(res=>{
            if(res.data.status===200)
            {
                this.setState({
                    loading:false,
                    orders:res.data.orders,
                    orders2:res.data.orders.map(item=>{return item}),
                    countProd:res.data.orders.length,
                })
            }

        }).catch(err=>{
             swal({
                title: "oops!",
                text: "somthing went down !",
                icon: "error",
            });

        })
    }
        selectAll=e=> {
        console.log(this.state.refs)
        if (this.state.checked) {
            this.setState(state => ({
                checked: false,
                countProd: 0,
                orders2: []

            }))

               this.state.refs.forEach(item=>{
                item.method(false)
            })


        } else {
             this.state.refs.forEach(item=>{
                item.method(true)
            })
            var arr=this.state.orders.map(item=>{return item}
            )
            this.setState(state => ({
                checked: true,

                orders2: arr,
                countProd: arr.length
            }))
        }
    }
        selectOne=(add,item,index)=>{
        if(add && !this.state.orders2.includes(item)){
             this.setState(state=>({
                 countProd: state.countProd+1,
                 orders2:state.orders2.concat(item)


             }))
            return
        }
        if(!add && this.state.orders2.includes(item)) {
            var arr=this.state.orders2
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
                   orders2:arr,
                     countProd:arr.length


             }))



        }

    }
       setCheked=()=>{
        this.setState({
            checked:false
        })
    }
        addAllToCart=e=>{
       var arr=this.state.orders2.map(item=>{
           return item.id
       })

        if(arr.length===0)
        {
               swal({
                            title: "hey there!",
                            text: "please select some products!",
                            icon: "success",
                        });
               return
        }
        var payload={ids:'['+arr.toString()+']'}
        axios.post('api/insertToCart',payload).then(response=>{
            if(response.data.status===200)
            {
                 swal({
                            title: "done!",
                            text: "products added to your cart!",
                            icon: "success",
                        });

            }

        }).catch(error=>{
             swal({
                title: "oops!",
                text: "somthing went down !",
                icon: "error",
            });

        })
    }
    removeIt=(i)=>{

        var arr=this.state.orders
        arr.splice(i,1);
        this.setState({
            orders:arr,
            countProd:arr.length

        })
    }

    render() {
        var orders=""
    if(this.state.loading)
    {
        orders= <>
            <SkeletonOrder/>
            <SkeletonOrder/>
            <SkeletonOrder/>
            <SkeletonOrder/>
            <SkeletonOrder/>
              </>
    }
    else
    {
        if(this.state.orders.length===0)
            orders= <div className="col-lg-12 mx-0 px-0">
                    <Alert/>
                </div>
        else
            orders=this.state.orders.map((item,index)=>{
                return <OrdersOne item={item}
                     onRef={ref => (this.setState(state=> ({
                            refs: state.refs.concat(ref)
                        })))}
                              removeIt={this.removeIt}  i={index} setCheked={this.setCheked} selectOne={this.selectOne} checked={this.state.checked}

                />
            })



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

                    <div className="row m-auto " style={{zIndex: "2"}} id="Cart">
                        <div className="col-lg-11 col-md-11 col-sm-10 col-10 mx-auto">
                            <div className="row">
                                <div className="col-lg-12 mt-2 mx-auto mb-0 py-3 px-3" id="resume">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5>Orders ({this.state.countProd})</h5>
                                            <i className='bx bxs-file-find' style={{color:"#ff00d9"}} className=" buy_option"> </i>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-9 col-md-8 col-sm-7 col-5">
                                                    <div className="form-check">
                                                        <input className="form-check-input mr-1" type="checkbox" value=""
                                                               id="flexCheckDefault"  checked={this.state.checked} onChange={this.selectAll}  />
                                                        <label className="form-check-label my-auto ml-1" style={{fontSize:"0.8em"}} htmlFor="flexCheckDefault">
                                                            Select All
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3  col-md-4 col-sm-5 col-7 pr-4 my-auto text-right float-right"  id="add_to_up">
                                                    <div className="input-group">

                                                        <input type="submit" onClick={this.addAllToCart} className="form-control btn_add_up text-right" value="Add selected to cart again"
                                                               placeholder="Input group example" aria-label="Input group example"
                                                               aria-describedby="btnGroupAddon"/>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mx-0 mt-2" id="">
                                    {orders}
                                </div>

                            </div>
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

export default OrdersAll;
















