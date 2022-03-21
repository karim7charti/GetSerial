import React,{Component} from "react";
import {Link} from "react-router-dom";

import "../../css/CartStyle.css"

import add from '../../img/add.png';
import axios from "axios";
import swal from "sweetalert";



class CartOneProduct extends Component{
    state={
        checked:true,
        quantity:1,
        show:'none',
        cantSelect:false,
        display:'visible',
        hide:'block'
    }


    deleteItem=e=>{
         const Ldn = document.querySelector("#lod");

           swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                 Ldn.style.display='flex';
                if (willDelete) {
                    await axios.delete('api/deleteItem/'+this.props.item.id).then(response=>{
                        if(response.data.status===200)
                        {
                            this.props.removeIt(this.props.i)
                            swal("Good job!", "item deleted succefully","success");

                        }
                        Ldn.style.display='none';

                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "the somthing went down !",
                            icon: "error",
                        });
                        Ldn.style.display='none';

                    })

                }
            });
    }
     componentDidMount() {
    this.props.onRef(this)
        if(this.props.item.qte===0)
        {
            this.setState({
                cantSelect:true,
                 checked:false,
                display:'hidden',
                show:'block',
                hide:'none'
            })
        }
  }

    method(checked) {
        if(!this.state.cantSelect){
               this.setState({ checked: checked },()=>{
        if(checked)
            this.setState({
                display:'visible'
            })
        else
             this.setState({
                display:'hidden'
            })

    });
        }

  }




    selectItem=e=>{
        if(!this.state.cantSelect){
              if(this.props.checked)
            return

        if(this.state.checked)
        {
            this.props.selectOne(false,this.props.item,this.props.i)
            this.setState({
                checked:false,
                display:'hidden'
            })

        }


        else
        {
            this.props.selectOne(true,this.props.item,this.props.i)
             this.setState({
                checked:true,
                 display:'visible'
            })

        }
        }
    }

    handleInput=e=>{
         this.setState({
            [e.target.name]:e.target.value,
        })
    }
    subItem=e=>{
         var add=document.querySelector('#add'+this.props.item.id)
        var sub=document.querySelector('#sub'+this.props.item.id)
        if(this.state.quantity>1){
              this.setState(state=>({
                quantity:state.quantity-1,
            }),()=>{
                       if(this.state.quantity>1)
            {
                sub.style.color="#ef52ca";
                sub.style.cursor="pointer"

            }
            else {
                sub.style.color="lightgray";
                sub.style.cursor="not-allowed"
            }
            if (this.state.quantity<(this.props.item.qte))
            {
                add.style.color="#ef52ca";
                add.style.cursor="pointer"
            }
            this.props.setQte(this.props.item.id,this.state.quantity)
              })

        }

    }
    addItem=e=>{
        var add=document.querySelector('#add'+this.props.item.id)
        var sub=document.querySelector('#sub'+this.props.item.id)
        if(this.state.quantity<this.props.item.qte) {
            this.setState(state => ({
                quantity: state.quantity + 1,
            }),()=>{
                   if(this.state.quantity>=2)
                    {
                        sub.style.color="#ef52ca";
                        sub.style.cursor="pointer"

                    }
                   if(this.state.quantity===(this.props.item.qte))
                   {
                       add.style.color="lightgray";
                       add.style.cursor="not-allowed"
                   }
                   this.props.setQte(this.props.item.id,this.state.quantity)
            })

        }
    }
    render() {
        return (

            <>

                        <div className="row px-0 pb-3 pt-2  my-3" id="One_pr_cart">

                            <div className="col-lg-12 m-auto">
                                <div className="row  my-1">
                                    <div className="col-lg-11 col-md-10 col-sm-10 col-10  pl-5">
                                        <input className="form-check-input" onChange={this.selectItem} type="checkbox" checked={this.state.checked} value=""/><br/>
                                    </div>
                                    <div className="col-lg-1  col-md-2 col-sm-2 col-2" id="del_pr">
                                        <i className='bx bxs-trash' style={{color: "#ef52ca"}} onClick={this.deleteItem}> </i>

                                    </div>
                                    <div className="col-lg-12 m-auto">
                                        <hr style={{width:"100%"}} className="ml-0 p-0"/>
                                    </div>
                                </div>


                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-9 col-md-9 col-sm-9 col-9 mb-3">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-3 col-sm-3 col-3 mr-4">
                                                <img src={process.env.REACT_APP_BASE_URL+"products/"+this.props.item.url} id="img-pr"/>
                                            </div>
                                            <div className="col-lg-8 col-md-7 col-sm-7 col-7 m-auto">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                              <span id="name_pr">
                                                  <b>{this.props.item.name}</b>
                                              </span>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                              <span id="discount_pr">
                                                  <b>{this.props.item.discount}$</b>&nbsp;&nbsp;&nbsp;
                                              </span>
                                                        <span id="price_pr">
                                                  {this.props.item.price}$
                                              </span>
                                                    </div>
                                                    <div className="col-lg-12" style={{display:this.state.show}}>
                                                                        <span className="text-danger" id="shipping_pr">
                                                                This product is out of stock for now
                                                               </span>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-3  col-md-3 col-sm-3 col-3 mt-1 p-0">
                                        <div className="row">

                                            <div className="col-lg-12 text-right" style={{visibility:this.state.display}}>
                                                <div className="row pr-0 float-right" >
                                                            <div className="col-lg-1 col-md-1 col-sm-1 col-1 mr-3 " >
                                                                <i id={"sub"+this.props.item.id} className='bx bxs-minus-circle' style={{color:"lightgray",fontSize:"1.1em",cursor:"not-allowed"}}
                                                                onClick={this.subItem}
                                                                > </i>
                                                            </div>
                                                            <div className="col-lg-4  col-md-3 col-sm-4 col-3 text-center float-center m-0">
                                                                <input readOnly type="text" id="quantity_pr" name="quantity" onChange={this.handleInput} value={this.state.quantity} className="text-center"  style={{ height:"1.5em",width:"4em",border:"0"}}/>
                                                            </div>
                                                            <div className="col-lg-1 col-md-1 col-sm-1 col-1 ml-0 ">
                                                                <i id={"add"+this.props.item.id} className='bx bxs-plus-circle' style={{color:"#ef52ca",fontSize:"1.1em"}}
                                                                onClick={this.addItem}
                                                                > </i>
                                                            </div>

                                                </div>


                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-lg-12  col-md-12 col-sm-12 col-12">
                                        <div className="row" style={{display:this.state.hide}}>
                                            <div className="col-lg-7">
                                                <div className="row mb-3">

                                                    <div className="col-lg-12">
                                                                        <span id="shipping_pr">
                                                                Free shipping by Email
                                                               </span>
                                                    </div>
                                                    <div className="col-lg-12">

                                                                        <span id="shipping_pr">
                                                                            Estimated time for delivery: 1 day
                                                                        </span>


                                                    </div>


                                                </div>

                                            </div>
                                            <div className="col-lg-5">

                                            </div>
                                        </div>

                                    </div>



                                </div>
                            </div>
                        </div>





            </>




        );
    }

}

export default CartOneProduct;
















