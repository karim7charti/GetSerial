import React,{Component} from "react";
import {Link} from "react-router-dom";
import App from "../../App";
import "../../css/CartStyle.css"
import product from '../../img/adobe_ph.jpg';
import add from '../../img/add.png';
import axios from "axios";
import swal from "sweetalert";



class CartOneProduct extends Component{
    state={
        date:'',
        show:'visible',
        checked:true
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
                    await axios.delete('api/deleteItemFromWish/'+this.props.item.id).then(response=>{
                        if(response.data.status===200)
                        {
                            this.props.removeIt(this.props.i)
                            swal("Good job!", "item deleted succefully","success");

                        }
                           Ldn.style.display='none';

                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "somthing went wrong !",
                            icon: "error",
                        });
                           Ldn.style.display='none';

                    })

                }
            });
    }
    method(checked,show) {

      this.setState({ checked: checked,show:show })




  }

    componentDidMount() {
        this.props.onRef(this)
        if(this.props.item.qte===0)
            this.setState({
                show:'hidden'
            })

            const monthes=['January','February','March','April','May','June','July','August','September','October','November','December']
        var date =this.props.item.created_at.split(' ')[0];

        var day=date.split('-')[2];
         var month=monthes[+(date.split('-')[1])-1];
         let dateFinal=day+' '+month+' '+date.split('-')[0];
        this.setState({
            date:dateFinal
        })
    }
     selectItem=e=>{



        if(this.state.checked)
        {
            this.props.selectOne(false,this.props.item,this.props.i)
            this.setState({
                checked:false,
                show:'hidden'

            })
            this.props.setCheked()
        }


        else
        {
            this.props.selectOne(true,this.props.item,this.props.i)
             this.setState({
                checked:true,
                 show:'visible'

            })


        }

    }

    addToCart=e=>{

             const Ldn = document.querySelector("#lod");

                 const payload={'id_product':this.props.item.product_id}
        Ldn.style.display='flex';

        axios.post('/api/addToCart',payload).then(response=>{
            if(response.data.status===200)
                axios.delete('api/deleteItemFromWish/'+this.props.item.id).then(response=> {
                    if (response.data.status === 200) {
                        this.props.removeIt(this.props.i)
                        swal({
                            title: "good job!",
                            text: "product added to Basket succefully!",
                            icon: "success",
                        });


                    }


                })

            else
                 swal({
                                    title: "oops!",
                                    text: "product already exist in your Basket!",
                                    icon: "warning",
                             });

             Ldn.style.display='none';


        }).catch(error=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
               Ldn.style.display='none';

        })




    }
    render() {
        return (

            <>


                <div className="row   pb-3 pt-2  mx-auto my-3" id="One_pr_cart">

                    <div className="col-lg-12 m-auto">
                        <div className="row  mt-1">
                            <div className="col-lg-8 col-md-7 col-sm-4 col-1  pl-4 pr-0 mr-0">
                                <input className="form-check-input" onChange={this.selectItem} checked={this.state.checked} type="checkbox" value=""/><br/>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-9 text-right float-right my-auto">
                                <span id="shipping_pr" style={{color:"lightGray"}}>{"Added "+this.state.date} </span>
                            </div>
                            <div className="col-lg-1  col-md-1 col-sm-1 col-1 text-right float-right" id="del_pr">
                                <i className='bx bxs-trash' onClick={this.deleteItem} title="Delete from wish list" > </i>

                            </div>
                            <div className="col-lg-12 m-auto">
                                <hr style={{width:"100%"}} className="ml-0 p-0"/>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-12">
                        <div className="row py-auto">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-12 my-auto">
                                <div className="row  my-auto">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 my-auto mx-auto">
                                        <img src={axios.defaults.baseURL+"products/"+this.props.item.url} id="img-pr"/>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-9 col-7 pl-3 my-auto mx-auto">
                                        <div className="row m-auto">
                                            <div className="col-lg-12 m-auto">
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
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="shipping_pr">
                                                    Only <b style={{color:"red"}}>{this.props.item.qte}</b> keys left
                                                </span>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*<div className="col-lg-3  col-md-3 col-sm-3 col-3 mt-0 p-0">
                                <div className="row">

                                    <div className="col-lg-12">


                                    </div>
                                </div>
                            </div>*/}

                            <div className="col-lg-12  col-md-12 col-sm-12 col-12">
                                <div className="row mt-2">
                                    <div className="col-lg-9">
                                        <div className="row mb-0">
                                            <div className="col-lg-12 text-left my-auto">


                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-11 float-right text-right mx-auto mt-2 pr-2" id="add_to" style={{visibility:this.state.show}}>
                                        <div className="input-group">
                                            <div className="input-group-text icon" id="btnGroupAddon">
                                                <i className='bx bxs-cart-add bx-tada' style={{color:"white",fontSize:"1.5em"}}> </i></div>
                                            <input type="submit" className="form-control btn_add" value="Add to cart"
                                                   placeholder="Input group example" aria-label="Input group example"
                                                   aria-describedby="btnGroupAddon" onClick={this.addToCart} />
                                        </div>
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
















