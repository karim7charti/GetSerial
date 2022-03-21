import React,{Component} from "react";
import {Link, Redirect,withRouter} from "react-router-dom";
import App from "../../App";
import "../../css/SearchProduct.css"

import axios from "axios";
import swal from "sweetalert";

import SearchOneProduct from "./SearchOneProduct";
import NavBar from "./NavBar";
import Footer from "./Footer";

import Loading from "./Ui-component/Loading";
import SearchResultOne from "./SearchResultOne";
import Alert from "./Ui-component/Alert";
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton from "./Ui-component/Skeleton";

class SearchAllProduct extends Component{
    state={
        loading:true,
        nbrPag:0,
        selctedPag:1,
        searchedProd:[],
        l:false,
         l2:false,
        categories:[],
        universalFilter:"all",
        text:"",
        filter:'Lasted first',
        products:[],

    }
    getProducts=()=>{

         var payload={filter:this.state.filter,universalFilter:this.state.universalFilter}
        axios.post('api/getUsersProducts',payload).then(res=>{
            this.setState({
                loading:false,
                nbrPag:parseInt(res.data.products.last_page),
                products:res.data.products.data,
                selctedPag:0,

            })


        }).catch(err=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
        })
    }
    componentDidMount() {
        if(this.props.location.universal!==undefined)
            this.setState({
                 universalFilter:this.props.location.universal,
            },()=>{
                this.getProducts()
            })
        else
            this.getProducts()


        this.setState({
            l2:true,
        },()=>{
              axios.get('/api/categories').then(response=>{
            if(response.data.status===200)
            {
                this.setState({
                    categories:response.data.categories,
                    l2:false

                })

            }

        }).catch(function (error){

            swal({
                title: "oops!",
                text: "somthing went down !",
                icon: "error",
            });
           return <Redirect to='/'/>

        })
        })

    }
    sortBy=e=>{

        this.setState({
             loading:true,
            filter:e.target.value
        },()=>{

            this.getProducts()
        })


    }
    search=(e)=>{
        this.setState({
            l:true
        })
        var text=e.target.value;

        const list_pr=document.querySelector("#list_pr");
        if(text!=="")
            list_pr.style.display="block"
        else
            list_pr.style.display="none"


        const payload={'text':text};
        axios.post('api/search',payload).then(res=>{

            this.setState({
                searchedProd:res.data.products,
                l:false,
                text:text

            })

        }).catch(err=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
        })


    }
    pagClick=(e,i)=>{
         const Ldn = document.querySelector("#lod");
        Ldn.style.display='flex';
         var payload={filter:this.state.filter,universalFilter:this.state.universalFilter}

        this.setState({
            loading:true,
            selctedPag:e.target.name
        },()=>{
                axios.post('api/getUsersProducts?page='+(+(this.state.selctedPag)+1),payload).then(res=>{
            this.setState({

                nbrPag:parseInt(res.data.products.last_page),
                products:res.data.products.data,
                loading:false



            },()=>{
                 Ldn.style.display='none';
            })


        }).catch(err=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
               Ldn.style.display='none';
        })
        })
    }
    searchByCat=e=>{


         this.setState({
             loading:true,
            universalFilter:e.target.value
        },()=>{

            this.getProducts()
        })
    }
    searchByName=e=>{
        this.setState({
             loading:true,
            filter:this.state.text
        },()=>{

            this.getProducts()
        })

    }

    HideSearch=e=>{
        const list_pr=document.querySelector("#list_pr");
        list_pr.style.display="none";
    }

    render() {
        var pag="",products=""
          if(this.state.loading){
              pag= <span colSpan="4" className="spinner-border mx-5" role="status"> </span>
              products=
                  <>
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />
                      <Skeleton variant="rectangular" width={210} height={118} />

                  </>

          }




        else
          {
              var arr=new Array(this.state.nbrPag)
              arr.fill(1);
              pag=arr.map((item,i)=>{
                  if(i===this.state.selctedPag)
                     return <li  className="page-item active"><a name={i} onClick={this.pagClick} className="page-link" href="#">{i+1}</a></li>;
                  else
                      return <li  className="page-item "><a name={i} onClick={this.pagClick} className="page-link" href="#">{i+1}</a></li>;
              })
              if(this.state.products.length===0)
                   products=<div className="col-lg-12 mx-0 px-0">
                    <Alert/>
                </div>
              else
                  products=this.state.products.map(item=>{
                      return <SearchOneProduct item={item}/>
                  })

          }
        var serchedPrd="";
        if(this.state.l)
                 serchedPrd= <ClipLoader size={50} color={"#E90078FF"} css={{position:"relative",left:"45%"}} />;
        else {
            if(this.state.searchedProd.length===0){
                serchedPrd=<div className="col-lg-12 mx-0 px-0">
                    <Alert/>
                </div>
                //document.querySelector('#active_pr').style.display="none"
            }

            else{
                   //document.querySelector('#active_pr').style.display="block"
                  serchedPrd=this.state.searchedProd.map(item=>{

                  return <SearchResultOne item={item}/>
              })
            }

        }
        var categ=""
        if(this.state.l2){
            categ= <ClipLoader size={50} color={"#E90078FF"} css={{position:"relative",left:"45%"}} />;
        }
        else
            categ=this.state.categories.map(item=>{

                return   <option value={item.id}>{item.name}</option>
            })




        return (
            <>
                  <span id="lod" style={{display:"none"}}><Loading/></span>
              <span style={
                    {
                        zIndex:"2"
                    }
                }/>
                <NavBar  tab="navbarDropdown"/>

                <div className="row container mx-auto mb-3 pt-2"  onClick={this.HideSearch} id="all_search">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-2 mr-3 mt-0 py-2" id="search_bar_user" >
                        <div className="row">
                            <div className="col-6 col-lg-8 col-md-8 col-sm-6 pl-4 mr-0 pr-0 float-left text-left">
                                <form>
                                    <div className="row" id="bar_bar">
                                          <div className="col-12 col-lg-12 col-md-12 col-sm-12 ">
                                            <input type="text" onChange={this.search}  className="form-control" list="datalistOptions"  id="search_input"
                                                   aria-describedby="emailHelp" placeholder="Search product here..." autoComplete="off" aut


                                            />

                                        </div>
                                        <div className="col-12 col-lg-11 col-md-12 col-sm-12 ml-4 pt-1 mr-0" id="list_pr">
                                            <div className="row">
                                                {/*
                                                 <div className="col-lg-12 m-0 py-0 pr-1 text-right float-right">
                                                    <button type="button" className="btn  m-0 p-0" id="close_list"
                                                            aria-label="Close">
                                                        <i className='bx bx-x' style={{cursor:"pointer"}}></i>
                                                    </button>
                                                </div>*/}
                                                <div className="col-lg-12 ml-0 pl-0" id="list_global">
                                                    {serchedPrd}
                                                </div>
                                                <div className="col-lg-12 mx-auto text-center" id="active_pr" onClick={this.searchByName}>
                                                   <span className=""><i className='bx bx-search-alt-2 mt-2' style={{color:"#ca139f",fontSize:"1.2em"}}> </i><span className="my-auto"  style={{fontSize:"1em",color:"darkblue"}}>&nbsp;{this.state.text}</span> </span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="col-3 col-lg-2  col-md-2 col-sm-3 float-center my-1 mx-auto form-select" id="sort-slc">
                                <select className="form-select my-auto  text-center" aria-label="Default select example" onChange={this.sortBy}>

                                    <option value="Lasted first" selected>Lasted first</option>
                                    <option value="Earliest first" >Earliest first</option>
                                    <option value="AZ">A - Z</option>
                                    <option value="ZA">Z - A</option>

                                </select>
                            </div>
                            <div className="col-3 col-lg-2 col-md-2 col-sm-3  float-left my-1 form-select" id="">
                                <select value={this.state.universalFilter} className="form-select my-auto  text-center" aria-label="Default select example" onChange={this.searchByCat}>
                                    <option value="all" selected>All categories</option>
                                    {categ}
                                    <option value="other">other</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 mx-auto">
                        <div className="row">
                            {products}

                        </div>


                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12"  id="pagi">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination" id="ul_pag">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {pag}


                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>







                </div>

                <section id="Contact" className="container-fluid py-0 "   onClick={this.HideSearch}>
                    <Footer/>
                </section>
            </>

        );
    }

}

export default withRouter(SearchAllProduct);
