import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/NewProducts.css"
import "../../css/CartStyle.css"
import product from '../../img/win10.png';
import add from '../../img/add.png';
import NavBar from "./NavBar";
import Footer from "./Footer";
import WishListOneProduct from "./WishListOneProduct";
import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import Alert from "./Ui-component/Alert";
import axios from "axios";
import swal from "sweetalert";
import Loading from "./Ui-component/Loading";
import SkeletonOrder from "./Ui-component/SketelonOrder"



class WishList extends Component{
    state={
        loading:true,
        countProd:"",
        listProducts:[],
        listProducts2:[],
        checked:true,
        refs:[],
    }
    componentDidMount() {
          axios.get('/api/getUsersWishList').then(response=>{
            this.setState({
                loading:false,
                listProducts:response.data.products,
                listProducts2:response.data.products.map(item=>{return item}),
                countProd:response.data.products.length,


            })
        })
    }
    setCheked=()=>{
        this.setState({
            checked:false
        })
    }
     removeIt=(i)=>{

        var arr=this.state.listProducts
        arr.splice(i,1);
        this.setState({
            listProducts:arr,
            countProd:arr.length

        })
    }
    selectAll=e=> {
        if (this.state.checked) {
            this.setState(state => ({
                checked: false,
                countProd: 0,
                listProducts2: []

            }))

               this.state.refs.forEach(item=>{
                item.method(false,'hidden')
            })


        } else {
             this.state.refs.forEach(item=>{
                item.method(true,'visible')
            })
            var arr=this.state.listProducts.map(item=>{return item}
            )
            this.setState(state => ({
                checked: true,

                listProducts2: arr,
                countProd: arr.length
            }))
        }
    }
        selectOne=(add,item,index)=>{
        if(add && !this.state.listProducts2.includes(item)){
             this.setState(state=>({
                 countProd: state.countProd+1,
                 listProducts2:state.listProducts2.concat(item)


             }))
            return
        }
        if(!add && this.state.listProducts2.includes(item)) {
            var arr=this.state.listProducts2
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
                   listProducts2:arr,
                     countProd:arr.length


             }))



        }

    }
    addAllToCart=e=>{
       var arr=this.state.listProducts2.map(item=>{
           return item.product_id
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
                var arr2=this.state.listProducts
                for(let i=0;i<arr2.length;i++)
                {
                    for(let j=0;j<arr;j++)
                    {
                        if(arr2[i].product_id===arr[j])
                        {
                            arr2.splice(i,1);
                            break;
                        }
                    }
                }

                this.setState({
                    listProducts:arr2,
                    listProducts2:[],
                    countProd:0
                },()=>{
                    console.log(arr2)
                })
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


    render() {

        var products=""
         if(this.state.loading)
             products= <>
                    <SkeletonOrder/>
                    <SkeletonOrder/>
                    <SkeletonOrder/>
                    <SkeletonOrder/>
                    <SkeletonOrder/>
            </>
        else{
            if(this.state.listProducts.length===0)
                 products= <div className="col-lg-12 mx-0 px-0">
                    <Alert/>
                </div>
             else
            {
                products=this.state.listProducts.map((item,index)=>{
                    return <WishListOneProduct onRef={ref => (this.setState(state=> ({
                            refs: state.refs.concat(ref)
                        })))}
                        i={index} setCheked={this.setCheked} selectOne={this.selectOne} checked={this.state.checked} removeIt={this.removeIt} item={item}/>

                })
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

                    <div className="row m-auto " style={{zIndex: "2"}} id="Cart">
                        <div className="col-lg-11 col-md-11 col-sm-10 col-10 mx-auto">
                            <div className="row">
                                <div className="col-lg-12 mt-2 mx-auto mb-0 py-3 px-3" id="resume">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5>Wish list ({this.state.countProd})</h5>
                                            <i className='bx bxs-file-find' style={{color:"#ff00d9"}} className=" buy_option"> </i>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-9 col-md-8 col-sm-7 col-5">
                                                    <div className="form-check">
                                                        <input className="form-check-input mr-1" type="checkbox" value=""
                                                               id="flexCheckDefault" checked={this.state.checked} onChange={this.selectAll}/>
                                                        <label className="form-check-label my-auto ml-1" style={{fontSize:"0.8em"}} htmlFor="flexCheckDefault">
                                                            Select All
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3  col-md-4 col-sm-5 col-7 pr-4 my-auto text-right float-right"  id="add_to_up">
                                                    <div className="input-group">
                                                        {/*<div className="input-group-text icon_up" id="btnGroupAddon">
                                                            <i className='bx bxs-cart-add bx-tada' style={{color:"white",fontSize:"0.8em"}}> </i></div>*/}
                                                        <input type="submit" className="form-control btn_add_up text-right" value="Add selected to cart"
                                                               placeholder="Input group example" aria-label="Input group example"
                                                               aria-describedby="btnGroupAddon" onClick={this.addAllToCart}/>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mx-0 mt-2" id="">
                                    {products}
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

export default WishList;
















