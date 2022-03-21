import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";

import OneProduct from "./OneProduct";
import axios from "axios";

import swal from "sweetalert";
import LoadingTr from "./Ui-component/LoadingTr";
import Skeleton from "./Ui-component/Skeleton";
import SketelonAllProducts from "./Ui-component/SketelonAllProducts"


class AllProducts extends Component{
    state={
        products:[],
        loading:true,
        productsOriginal:[],
        index:0,
        width: 0,
        p1:[],
        trigerrOne:false,
        toRight:true



    }

    changeOffers=()=>{
        if(this.state.toRight)
            this.moveRight()
        else {
            this.moveLeft()
        }
        console.log(this.state.toRight)

}
    moveRight=(e)=>{



        if(!this.state.trigerrOne)
        {

         let arr=[]
                if(this.state.index+3<=this.state.productsOriginal.length)
            {
                   for(let i=0;i<this.state.productsOriginal.length;i++)
                    {
                        if(i>=this.state.index && i<(this.state.index+3))
                            arr.push(this.state.productsOriginal[i])
                        else if(i>=(this.state.index+3))
                        {
                             break
                        }
                    }

              this.setState(state=>({
                        products:arr,
                        index:state.index+1,

                    }))
            }
        }
        else {
             let arr=[]
            if(this.state.index<this.state.productsOriginal.length)
            {
                arr.push(this.state.productsOriginal[this.state.index])
                 this.setState(state=>({
                        products:arr,
                        index:state.index+1,

                    }))
            }

        }



    }
     moveLeft=(e)=>{
        if(!this.state.trigerrOne)
        {

            if(this.state.index-1>=0) {
             let arr = []

             for (let i = 0; i < this.state.productsOriginal.length; i++) {
                 if (i >= (this.state.index - 1) && i < (this.state.index + 2))
                     arr.push(this.state.productsOriginal[i])

             else if(i>=(this.state.index+2))
                 {

                     break
                 }

             }

             this.setState(state => ({
                 products: arr,
                 index: state.index - 1,

             }))
         }

        }
        else {

             let arr=[]
            if(this.state.index-1>=0)
            {
                arr.push(this.state.productsOriginal[this.state.index-1])
                 this.setState(state=>({
                        products:arr,
                        index:state.index-1,

                    }))
            }
        }


    }
    updateWindowDimensions=()=> {
             this.setState({
                 width:window.innerWidth
             })
        let arr=this.state.p1.map(item=>{
            return item
        })
        var one=false
        if(this.state.width<=991)
        {

            arr.splice(1,2)
            one=true


        }
        else {
          arr=this.state.p1
            this.setState({
                index:1
            })





        }
          this.setState({
                products:arr,
                trigerrOne:one

            })


        }

        componentWillUnmount()
        {
                 window.removeEventListener('resize', this.updateWindowDimensions);
            }
    componentDidMount() {
        //setInterval(this.changeOffers,3000)
        window.addEventListener('resize', this.updateWindowDimensions);
        axios.get('/api/getDicountedProducts').then(response=>{
            if(response.data.status===200)
            {
                let arr=[]

                for(let i=0;i<response.data.products.length;i++)
                {
                    if(i<3)
                        arr.push(response.data.products[i])
                    else if(i>=3)
                        break
                }
                this.setState({
                    p1:arr,
                    triggerOne:false,
                    products:arr,
                    productsOriginal:response.data.products,
                    index:1,

                    loading:false
                })
            }

        }).catch(error=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
        })
    }

    render() {

        var products="";


        if(this.state.loading)
        {
            products= <>
                <SketelonAllProducts variant="rectangular" width={210} height={118} />
                <SketelonAllProducts variant="rectangular" width={210} height={118} />
                <SketelonAllProducts variant="rectangular" width={210} height={118} />

            </>
        }
        else {
            if(this.state.products.length===0)
                products= <div className="alert alert-success" role="alert">
                    No products found
                </div>
            else {
                products=this.state.products.map((item,index)=>{

                          return(


                        <OneProduct item={item}


                        />
                    )



                });
            }


        }
        return (
            <>


        <div className="row mx-auto my-2" style={{width: "95%"}} id="switch_btn">



            <div className="col-11 col-lg-12 col-md-12 col-sm-12  mx-auto py-3"><b>Software in discount </b></div>
            <i className='bx bxs-caret-left-circle my-auto' style={{fontSize:"3rem",color:"rgba(200, 0, 120, 0.4)"}} onClick={this.moveLeft} > </i>



            {products}
           <i className='bx bxs-caret-right-circle my-auto' style={{fontSize:"3rem",color:"rgba(200, 0, 120, 0.4)"}} onClick={this.moveRight}> </i>


        </div>
</>
        );
    }

}

export default AllProducts;
