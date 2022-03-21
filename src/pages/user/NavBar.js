import React,{Component} from "react";
import {Link, Redirect,withRouter} from "react-router-dom";
import App from "../../App";
import "../../css/navStyle.css"
import back from '../../img/get serial logo.png'
import back4 from "../../img/username.png";
import back3 from "../../img/password.png";
import back5 from "../../img/password_reset.png";
import back6 from "../../img/email.png";
import axios from "axios";
import swal from "sweetalert";
import account_img from "../../img/acc_logo.png";
import logout from "../../img/logout.png";
import acc_mng from "../../img/account_manage.png";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswerRoundedIcon from "@material-ui/icons/QuestionAnswerRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {withStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import $ from 'jquery';
import Loading from "./Ui-component/Loading";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Skeleton from '@mui/material/Skeleton';







class NavBar extends Component{
    constructor(props) {
        super(props);
    }
    state={
        categories:[],
        username:'',
        email:'',
        countCart:0,
        countWish:0,
        countOrders:0,
        password:'',
        oldPass:'',
        errors:[],
        type:'password',
        confirmPassword:'',
        disable:false,
        disableI:true,
        disableEmail:true,
        email1:'',
        code:'',
        name:'',
        disablePass:true,

        loading:true,
        autoFocus:true,
        placeholder:'***********',
        tab:''

    }
    componentDidMount() {


        const Ldn = document.querySelector("#lod");
        var panel=document.querySelector('.account_btn');
        var panel1=document.querySelector('.account_btn1');
        var userInfo=document.querySelector('.account_logo');

           var floating=document.querySelector('#floatingBtns');
          panel.style.display="none"
        panel1.style.display="none"
        userInfo.style.display="none"
         floating.style.display="none"

         Ldn.style.display="flex"
        axios.get('/api/isAuthentacated').then(response=>{
            if(response.data.status===200){

                  this.setState({

                    name:response.data.name,
                    email1:response.data.email,
                      username:response.data.name,
                    email:response.data.email,
                      countCart:response.data.countCart,
                       countWish:response.data.countWish,
                        countOrders:response.data.countOrders,

                })
                panel.style.display="none"
                panel1.style.display="none"
                userInfo.style.display="inline-block"
                floating.style.display="block"

                 Ldn.style.display="none"
            }


        }).catch(errors=>{
            panel.style.display="inline-block"
                panel1.style.display="inline-block"
             Ldn.style.display="none"

        })
          axios.get('/api/categories').then(response=>{
            if(response.data.status===200)
            {
                this.setState({
                    categories:response.data.categories,
                    loading:false
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
        //Scroll button

        const ScrollBtn = document.querySelector("#scroll_btn");
          ScrollBtn.addEventListener("click", function (){
             $("html, body").animate({scrollTop:0}, "slow");
          });

        while ($("html, body").scrollTop<100)
        {
           ScrollBtn.style.display="none";
        }


        //password


    }
    editUsername=e=>{

        const edit_un = document.querySelector("#ed_username");
        const save_un = document.querySelector("#sv_username");
        const cancel_un = document.querySelector("#cl_username");
        const in_un = document.querySelector("#in_username");
       this.setState({
           disableI:false,

       },()=>{
           edit_un.style.display="none";
            save_un.style.display="block";
            cancel_un.style.display="block";
            in_un.style.borderBottom="1px solid rgb(233,0,120)";
       })


    }
    cancelEdituserName=e=>{
             const edit_un = document.querySelector("#ed_username");
        const save_un = document.querySelector("#sv_username");
        const cancel_un = document.querySelector("#cl_username");
        const in_un = document.querySelector("#in_username");
        this.setState(state=>({
            username:state.name
        }))
        this.setState({
            disableI:true,
            errors:[]
        },()=>{
            edit_un.style.display="block";
            save_un.style.display="none";
            cancel_un.style.display="none";
            in_un.style.border="0";
        })
    }
      editMail=e=>{

        const edit_em = document.querySelector("#ed_email");
        const save_em = document.querySelector("#sv_email");
        const cancel_em = document.querySelector("#cl_email");
        const in_em = document.querySelector("#in_email");
         const oldPass = document.querySelector("#oldPassEmail");


       this.setState({
           disableEmail:false
       },()=>{
             edit_em.style.display="none";
            save_em.style.display="block";
            cancel_em.style.display="block";
            oldPass.style.display="block";
            in_em.style.borderBottom="1px solid rgb(233,0,120)";
       })


    }
    cancelEditMail=e=>{
        const edit_em = document.querySelector("#ed_email");
        const save_em = document.querySelector("#sv_email");
        const cancel_em = document.querySelector("#cl_email");
        const in_em = document.querySelector("#in_email");
          const oldPass = document.querySelector("#oldPassEmail");
            this.setState(state=>({
            email:state.email1
        }))
            this.setState({
           disableEmail:true,
                errors:[]
       },()=>{
                edit_em.style.display="block";
            save_em.style.display="none";
            oldPass.style.display="none";
            cancel_em.style.display="none";
            in_em.style.border="0";
       })
    }
    editPassword=e=>{
          const edit_ps = document.querySelector("#ed_pass");
        const save_ps = document.querySelector("#sv_pass");
        const cancel_ps = document.querySelector("#cl_pass");
        const in_ps = document.querySelector("#in_password");
        const cnf_div = document.querySelector("#new_pass_confirm");
        const cnf_pr = document.querySelector("#new_pass_preview");
            this.setState({
           disablePass:false
       },()=>{
             edit_ps.style.display="none";
            save_ps.style.display="block";
            cancel_ps.style.display="block";
            cnf_div.style.display="block";
            cnf_pr.style.display="block";
            in_ps.style.borderBottom="1px solid rgb(233,0,120)";
       })

    }
    cancelEditPass=e=>{
                const edit_ps = document.querySelector("#ed_pass");
        const save_ps = document.querySelector("#sv_pass");
        const cancel_ps = document.querySelector("#cl_pass");
        const in_ps = document.querySelector("#in_password");
        const cnf_div = document.querySelector("#new_pass_confirm");
        const cnf_pr = document.querySelector("#new_pass_preview");
            this.setState({
           disablePass:true,
                password:'',
                oldPass:'',
                confirmPassword:'',
                errors:[]

       },()=>{
                edit_ps.style.display="block";
            save_ps.style.display="none";
            cnf_div.style.display="none";
            cnf_pr.style.display="none";
            cancel_ps.style.display="none";
            in_ps.style.border="0";
       })

    }
    handleInputs=e=>{
          this.setState({
            [e.target.name]:e.target.value,
            errors:[]
        })
    }

    updateUsername=e=>{

        var payload={username:this.state.username}
        this.setState({
            disable:true
        },()=>{
                   axios.post('api/changeUsername',payload).then(response=>{
              if(response.data.status===400)
              {
                this.setState({
                    errors:response.data.errors,
                     disable:false
                })

              }
              else
              {
                  this.setState({
                        name:response.data.name,

                        username:response.data.name,
                      disable:false


                  },()=>{
                       swal({
                                    title: "done!",
                                    text: "username updated succefully!",
                                    icon: "success",
                             });

                  })

              }
          }).catch(err=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
          })
        })

    }
       updateEmail=e=>{

        var payload={email:this.state.email,password:this.state.password}
           this.setState({
               disable:true
           },()=>{
                         axios.post('api/changeMail',payload).then(response=>{
              if(response.data.status===400)
              {
                this.setState({
                    errors:response.data.errors,
                    disable:false
                })

              }
              else if(response.data.status===404)
              {
                  this.setState({
                      disable:false
                  },()=>{
                      swal({
                                    title: "oops!",
                                    text: "invalid password !",
                                    icon: "warning",
                             });
                  })
              }



              else
              {
                  this.setState({
                        email:response.data.email,

                        eamil1:response.data.email,
                        disable:false


                  },()=>{
                       swal({
                                    title: "done!",
                                    text: "email updated succefully!",
                                    icon: "success",
                             });

                  })

              }

          }).catch(err=>{
              swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
                 })




           })

    }
    updatePass=e=>{
                var payload={OldPass:this.state.oldPass,password: this.state.password,password_confirmation:this.state.confirmPassword}
           this.setState({
               disable:true
           },()=>{
               axios.post('api/changePassword',payload).then(response=>{
                    if(response.data.status===400)
                              {
                                this.setState({
                                    errors:response.data.errors,
                                    disable:false
                                })

                              }
                      else if(response.data.status===404)
                          {
                              this.setState({
                                  disable:false
                              },()=>{
                                  swal({
                                                title: "oops!",
                                                text: "invalid password !",
                                                icon: "warning",
                                         });
                              })
                          }
                        else
              {
                  this.setState({
                        disable:false,
                        password:'',
                        oldPass:'',
                        confirmPassword:''
                  },()=>{
                       swal({
                                    title: "done!",
                                    text: "password updated succefully!",
                                    icon: "success",
                             });

                  })

              }

               }).catch(err=>{
                    swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });
                 })


           })
    }

    logout=e=>{
        var panel=document.querySelector('.account_btn');
        var panel1=document.querySelector('.account_btn1');
        var userInfo=document.querySelector('.account_logo');
       var floating=document.querySelector('#floatingBtns');

            axios.post('/api/userLogOut').then(response=>{
                if(response.data.status===200)
                {
                    localStorage.removeItem('token');
                     panel.style.display="inline-block"
                     panel1.style.display="inline-block"
                     userInfo.style.display="none"
                    floating.style.display="none"

                         swal({
                title: "good job!",
                text: "loged out succefully!",
                icon: "success",
            });
                     this.props.history.push('/');
                }

            })
    }

    register=(e)=>{
        e.preventDefault()

        var spinner=document.querySelector('#spinnRg');
        var panel=document.querySelector('.account_btn');
        var panel1=document.querySelector('.account_btn1');
        var userInfo=document.querySelector('.account_logo');
       var floating=document.querySelector('#floatingBtns');

         var close=document.querySelector('#close');

        var frmReg=document.querySelector('#signup_form');
        var frmConf=document.querySelector('#conf_form');




        spinner.style.display="inline-block";
           this.setState({
               disable:true
           })



        var payload={username:this.state.username,email: this.state.email,password: this.state.password,password_confirmation:this.state.confirmPassword}

        axios.post('/api/register',payload).then(response=>{

            if(response.data.status===400)
                this.setState({
                    errors:response.data.errors
                })

            else
            {

                localStorage.setItem("token",response.data.token)
                 this.setState({
                    username:'',
                    email:'',
                    password:'',
                    confirmPassword:'',
                    name:response.data.name,
                    email1:response.data.email
                })


                 swal({
                title: "good job!",
                text: "please confirm your email!",
                icon: "success",
            });
                close.style.visibility='hidden'
                 frmReg.style.display='none'
                frmConf.style.display='block'

                panel.style.display="none"
                panel1.style.display="none"
                userInfo.style.display="inline-block"
                 floating.style.display="block"


            }
            spinner.style.display="none";
           this.setState({
               disable:false
           })


        })
    }
      handlePass=e=>{
        //var input=document.querySelector('#pass');

        if(this.state.type==="text")
            this.setState({
                type:'password'
            })
        else
            this.setState({
                type:'text'
            })

    }
    logIn=e=>{
        e.preventDefault()

        var spinner=document.querySelector('#spinner');
        spinner.style.display="inline-block"
        var close=document.querySelector('#close2');
        var panel=document.querySelector('.account_btn');
        var panel1=document.querySelector('.account_btn1');
        var userInfo=document.querySelector('.account_logo');

         var floating=document.querySelector('#floatingBtns');


         this.setState({
               disable:true
           })
                axios.get('sanctum/csrf-cookie',{withCredentials:true}).then(response => {


                 axios.post('api/usersLogin',this.state).then(response=>{
                     if(response.data.status===400)
                     {
                         this.setState({
                            errors:response.data.errors
                         });

                     }
                     else if(response.data.status===401)
                     {
                         swal({
                             title: "oops!",
                             text: response.data.message,
                             icon: "error",
                         });
                     }else {
                            localStorage.setItem('token',response.data.token);
                            swal({
                                    title: "good job!",
                                    text: "loged in succefully!",
                                    icon: "success",
                             });


                            this.setState({

                                    email:'',
                                    password:'',
                                    name:response.data.name,
                                    email1:response.data.email,

                                })
                            close.click()
                            panel.style.display="none"
                            panel1.style.display="none"
                            userInfo.style.display="inline-block"
                           floating.style.display="block"




                     }

                     spinner.style.display="none";
                      this.setState({
                         disable:false
                         })

                 }).catch(function (error){
                     swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });

                   spinner.style.display="none";
                      this.setState({
                         disable:false
                         })

                 });
        });




    }
    confirm=e=>{
        e.preventDefault()
        var spinner=document.querySelector('#spinncon');
        var close=document.querySelector('#close');
        spinner.style.display="inline-block"
          this.setState({
                         disable:true
                         })
        var payload={code:this.state.code}
        axios.post('api/confirm',payload).then(response=>{
            if(response.data.status===400)
                     {
                         this.setState({
                            errors:response.data.errors
                         });

                     }
            else if(response.data.status===404)
            {
                 swal({
                         title: "oops!",
                         text: "wrong code retry !",
                         icon: "error",
                     });
            }
            else {
                swal({
                         title: "good job!",
                         text: "welcome to your account !",
                         icon: "success",
                     });
                close.click()
            }

        }).catch(function (error){
                     swal({
                         title: "oops!",
                         text: "somthing went wrong retry !",
                         icon: "error",
                     });

                   spinner.style.display="none";
                      this.setState({
                         disable:false
                         })

                 });
        spinner.style.display="none"
         this.setState({
                         disable:false
                         })
    }

    render(){
           var categ="";
        if(this.state.loading)
        {
            categ=<>
                <Skeleton width="80%" className="mx-auto"/> <Skeleton width="80%" className="mx-auto"/> <Skeleton width="80%" className="mx-auto"/>
                <Skeleton width="80%" className="mx-auto"/> <Skeleton width="80%" className="mx-auto"/> <Skeleton width="80%" className="mx-auto"/>
            </>

        }
        else {

            categ=this.state.categories.map(item=>{
                return(
                    <Link  to={{
                        pathname: "/ProductsList",
                        universal:item.id

                    }}><a className="dropdown-item" href="#">{item.name}</a></Link>

                )

            })
        }

        const StyledBadge = withStyles((theme) => ({
            badge: {
                right: -3,
                top: 13,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }))(Badge);
        return (
            <>
                      <span id="lod" style={{display:"none"}}><Loading/></span>
              <span style={
                    {
                        zIndex:"2"
                    }
                }/>
                <nav className="navbar navbar-expand-lg navbar-light  fixed-top">
                    <div className="container col-lg-11 col-md-11 col-11 col-sm-11">
                        <a href="./"><img src={back} width="150" height="45" className="my-1"/></a>

                        <button className="navbar-toggler ml-4" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <MenuOpenIcon className='' style={{color:"#f738a0",fontSize:"1.6em"}}/>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto  py-0 my-0">
                                <li className="nav-item">
                                    <Link to={'/'}> <a className="nav-link" id="homep" aria-current="page" href="#">Home</a> </Link>

                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Software
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link  to={{
                                            pathname: "/ProductsList",
                                            universal:"all"

                                        }}><a className="dropdown-item" href="#">All software</a></Link>
                                        {categ}
                                        <Link  to={{
                                            pathname: "/ProductsList",
                                            universal:"other"

                                        }}><a className="dropdown-item" href="#">other</a></Link>

                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link"  id="aboutp" href="#">About us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"  id="contactp" href="#">Contact us</a>
                                </li>

                               <div className="account_btn btn_acc">
                                   <li className="nav-item">
                                       <button type="button" className="btn btn-primary connect_btn" id="login_btn" data-bs-toggle="modal" data-bs-target="#login_model">Sign in</button>
                                   </li></div>
                                <div className="account_btn1 btn_acc">
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-primary" id="signup_btn" data-bs-toggle="modal" data-bs-target="#signup_model">Sign up</button>
                                    </li>
                                </div>
                                <div className="account_logo" style={{display:"none"}}>
                                    <li className="nav-item m-auto p-auto">

                                        <div className="dropdown float-center text-center">
                                               <div className="dropdown-toggle float-center " type="button"
                                                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                   <img src={account_img} alt="" className="m-auto"/><span className="m-auto p-1">{this.state.name}</span>
                                               </div>

                                            <ul className="dropdown-menu mt-4" aria-labelledby="dropdownMenuButton1">
                                                <div className="row px-2 pb-0">
                                                    <div className="col-lg-12 my-1 text-center">
                                                        <li className=" mx-auto my-0"><img src={account_img} alt="" className=""/></li>
                                                    </div>
                                                    <div className="col-lg-12 mt-1 mb-0 text-center">
                                                        <li className="item mx-auto my-0 p-0"><span className="name_drop">{this.state.name}</span><br/>
                                                            <span className="email_drop">{this.state.email1}</span>
                                                        </li>
                                                    </div>
                                                    <div className="col-lg-12 mx-auto my-1 text-center">
                                                        <li className="item mx-auto my-0  p-0"></li>
                                                    </div>
                                                    <div className="col-lg-12 m-auto text-center">
                                                        <li className="item mx-auto my-1  p-0"><button type="button" className="btn btn-primary connect_btn"  data-bs-toggle="modal" data-bs-target="#manage_model"  id="manage_account">Manage your account</button>
                                                        </li>
                                                    </div>
                                                    <div className="col-lg-11 mx-auto my-auto text-center">
                                                        <li className="item mx-auto mt-1  p-0">
                                                            <i onClick={this.logout} className='bx bx-log-out m-auto' id="out_account" title="Logout"> </i>
                                                        </li>
                                                    </div>

                                                </div>



                                            </ul>
                                        </div>
                                    </li>
                                </div>








                            </ul>

                        </div>
                    </div>
                </nav>

                {/*login modal*/}
                <div className="modal fade" id="login_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="login">
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col">
                                    <img src={back} id="logo"/>
                                </div>
                                <button id="close2" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Connect to your account and explore more features! </p>

                                    </div>
                                    <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id="login_form"
                                          method="post" onSubmit={this.logIn}>
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back4}
                                                                                                          className="icons"/></span>

                                                <input type="email" required className="form-control"
                                                       placeholder="Email"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="email" onChange={this.handleInputs} value={this.state.email}/>
                                                <span className="text-danger">{this.state.errors.email}</span>
                                            </div>

                                        </div>
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto py-2">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                <input  type={this.state.type} required className="form-control"
                                                       placeholder="Password"
                                                       aria-label="Password" aria-describedby="basic-addon1"
                                                       name="password" onChange={this.handleInputs} value={this.state.password}/>
                                                <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>

                                                <span className="text-danger">{this.state.errors.password}</span>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" id="cancel_login" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Cancel
                                            </button>
                                            <button type="submit" disabled={this.state.disable} id="login_btn_form" className="btn btn-primary">
                                                <span id="spinner" className="spinner-border spinner-border-sm"  style={{display:"none"}}></span>&nbsp;
                                                Login</button>
                                        </div>
                                    </form>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/*sing up modal*/}
                <div className="modal fade" id="signup_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" id="login">
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col">
                                    <img src={back} id="logo"/>
                                </div>
                                <button id="close" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Create your account and explore more features and services! </p>

                                    </div>
                                    <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id="signup_form"
                                          method="post" onSubmit={this.register} >
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back4}
                                                                                                          className="icons"/></span>

                                                <input type="text" required className="form-control"
                                                       placeholder="Username"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="username" onChange={this.handleInputs} value={this.state.username} />
                                                <span className="text-danger">{this.state.errors.name}</span>
                                            </div>

                                        </div>
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back6}
                                                                                                          className="icons"/></span>

                                                <input type="email" required className="form-control"
                                                       placeholder="Email"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="email" onChange={this.handleInputs} value={this.state.email}/>
                                                <span className="text-danger">{this.state.errors.email}</span>
                                            </div>

                                        </div>
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto py-2">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                <input id="pass" type={this.state.type} required className="form-control"
                                                       placeholder="Password"
                                                       aria-label="Password" aria-describedby="basic-addon1"
                                                       name="password" onChange={this.handleInputs} value={this.state.password}/>
                                                 <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}> </box-icon>

                                                <span className="text-danger">{this.state.errors.password}</span>
                                            </div>

                                        </div>
                                        <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto py-2">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back5}
                                                                                                          className="icons"/></span>

                                                <input  type={this.state.type} required className="form-control"
                                                       placeholder="Confirm password"
                                                       aria-label="Password" aria-describedby="basic-addon1"
                                                       name="confirmPassword"  onChange={this.handleInputs}  value={this.state.confirmPassword}/>
                                                <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>

                                                <span className="text-danger">{this.state.errors.confirmPassword}</span>
                                            </div>

                                        </div>
                                        <div className="col-10 col-lg-12 col-md-10 col-sm-10 m-auto text-center py-2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value=""
                                                       id="flexCheckIndeterminate"/>
                                                    <label className="form-check-label"
                                                           htmlFor="flexCheckIndeterminate">
                                                        Keep me up to date of hots and exclusives offers
                                                    </label>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                <button type="button" id="cancel_login" className="btn btn-secondary"
                                        data-bs-dismiss="modal">Cancel
                                </button>
                                <button type="submit" id="login_btn_form" disabled={this.state.disable}  className="btn btn-primary" >
                                    <span id="spinnRg" className="spinner-border spinner-border-sm" style={{display:"none"}}></span>&nbsp;

                                    Sign up</button>
                            </div>

                                    </form>
                                    <form onSubmit={this.confirm} method="post" className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" style={{display:'none'}} id="conf_form">
                                           <div className="col-10 col-lg-10 col-md-10 col-sm-10 m-auto">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back6}
                                                                                                          className="icons"/></span>

                                                <input type="number" required className="form-control"
                                                       placeholder="confirmation code"
                                                       aria-label="Email" aria-describedby="basic-addon1" name="code" onChange={this.handleInputs} value={this.state.code}/>
                                                <span className="text-danger">{this.state.errors.code}</span>

                                            </div>
                                                <div className="modal-footer">
                                               <button id="login_btn_form" type="submit"  disabled={this.state.disable}  className="btn btn-primary" >
                                    <span id="spinncon" className="spinner-border spinner-border-sm" style={{display:"none"}}></span>&nbsp;

                                    Confirm</button>
                                                </div>

                                        </div>

                                    </form>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                {/*Manage account modal*/}

                <div className="modal fade" id="manage_model" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-lg modal-dialog-centered ">
                        <div className="modal-content" id="manage">
                            <div className="modal-header">
                                <div className="col-11 col-lg-11 col-md-11 col-sm-11 m-auto" id="logo_col">
                                    <img src={acc_mng} id="logo_manage_pr"/>
                                </div>
                                <button id="close" type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto pb-4">
                                        <p className="text-justify text-center">
                                            Manage and review your account wherever you are! </p>

                                    </div>

                                        <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                            <div className="row mx-auto">
                                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                    <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back4}
                                                                                                          className="icons"/></span>

                                                        <input type="text" required className="form-control"
                                                               placeholder="Username"
                                                               aria-label="Email" aria-describedby="basic-addon1" name="username" onChange={this.handleInputs} value={this.state.username}  id="in_username" disabled={this.state.disableI}/>

                                                    </div>
                                                    <span className="text-danger">{this.state.errors.username}</span>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                            <button  className="btn text-center cl_mg p-auto" id="cl_username" onClick={this.cancelEdituserName}>Cancel</button>
                                                        </div>
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                            <button disabled={this.state.disable} className="btn text-center sv_mg p-auto" id="sv_username" onClick={this.updateUsername} >Save</button>
                                                        </div>
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto" >
                                                            <button className="btn text-center ed_mg p-auto" id="ed_username" onClick={this.editUsername}>Edit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>


                                        {/*email*/}


                                        <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto">
                                            <div className="row mx-auto">
                                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                    <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back6}
                                                                                                          className="icons"/></span>

                                                        <input type="email" required className="form-control"
                                                               placeholder="Email"
                                                               aria-label="Email"  aria-describedby="basic-addon1" name="email"  id="in_email" onChange={this.handleInputs} value={this.state.email}   disabled={this.state.disableEmail}/>

                                                    </div>
                                                    <span className="text-danger">{this.state.errors.email}</span>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                            <button className="btn text-center cl_mg p-auto" id="cl_email" onClick={this.cancelEditMail}>Cancel</button>
                                                        </div>
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                            <button disabled={this.state.disable} className="btn text-center sv_mg p-auto" id="sv_email" onClick={this.updateEmail}>

                                                                Save</button>
                                                        </div>
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto" >
                                                            <button className="btn text-center ed_mg p-auto" id="ed_email" onClick={this.editMail}>Edit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                              <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto" id="oldPassEmail" style={{display:'none'}}>
                                            <div className="row mx-auto">
                                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                    <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                        <input  type={this.state.type} required={true} className="form-control"
                                                               placeholder="Old password"
                                                               aria-label="Password"  aria-describedby="basic-addon1" name="password" onChange={this.handleInputs} value={this.state.password} id="in_new_password"/>

                                                        <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>
                                                    </div>
                                                      <span className="text-danger">{this.state.errors.password}</span>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-6 col-6">

                                                </div>
                                            </div>


                                        </div>

                                        {/*password*/}

                                        <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto" id="old_pass_preview">
                                            <div className="row mx-auto">
                                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                    <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                        <input  type={this.state.type} required className="form-control"
                                                               placeholder="Old password"
                                                               aria-label="Password" aria-describedby="basic-addon1" onChange={this.handleInputs} value={this.state.oldPass} name="oldPass" disabled={this.state.disablePass} id="in_password"/>

                                                         <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>
                                                    </div>
                                                     <span className="text-danger">{this.state.errors.OldPass}</span>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto">
                                                            <button className="btn text-center cl_mg p-auto" id="cl_pass" onClick={this.cancelEditPass}>Cancel</button>
                                                        </div>
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6  mx-auto ">
                                                            <button className="btn text-center sv_mg p-auto" id="sv_pass" disabled={this.state.disable}  onClick={this.updatePass}>Save</button>
                                                        </div>
                                                        <div className="col-lg-6 col-6 col-md-6 col-sm-6 mx-auto" >
                                                            <button className="btn text-center ed_mg p-auto" id="ed_pass" onClick={this.editPassword}>Edit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto" id="new_pass_preview">
                                            <div className="row mx-auto">
                                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                    <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back3}
                                                                                                          className="icons"/></span>

                                                        <input  type={this.state.type} required className="form-control"
                                                               placeholder="New password"
                                                               aria-label="Password" aria-describedby="basic-addon1" name="password" onChange={this.handleInputs} value={this.state.password} id="in_new_password"/>

                                                        <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>
                                                    </div>
                                                    <span className="text-danger">{this.state.errors.password}</span>
                                                </div>
                                                <div className="col-lg-4 col-md-6 col-sm-6 col-6">

                                                </div>
                                            </div>


                                        </div>


                                        <div className="col-12 col-lg-10 col-md-12 col-sm-12 m-auto"  id="new_pass_confirm">
                                            <div className="row mx-auto">
                                                <div className="col-lg-8 col-md-6 col-sm-6 col-6">
                                                    <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1"><img src={back5}
                                                                                                          className="icons"/></span>

                                                        <input   type={this.state.type} required className="form-control"
                                                                placeholder="Confirm new password"
                                                                aria-label="Password" aria-describedby="basic-addon1" name="confirmPassword" onChange={this.handleInputs} value={this.state.confirmPassword} id="in_new_password_confirm"/>
                                                        <span className="text-danger">{this.state.errors.confirmPassword}</span>
                                                         <box-icon id="eye" name='show' color='#e90078' onClick={this.handlePass}></box-icon>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">

                                                </div>
                                            </div>


                                        </div>
     <form className="col-12 col-lg-12 col-md-12 col-sm-12 m-auto" id=""
                                          method="post"  >

                                        <div className="modal-footer">
                                            <button type="button" id="cancel_login" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Cancel
                                            </button>
                                        </div>
                                    </form>


                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                {/*Floating buttons*/}

                <div className="items_btn" id="floatingBtns" style={{display:'none'}}>
                    <button  class="btn btn-floating btn-sm"  title="Explore more" style={{position:"fixed",marginLeft:"1%",right:"10px",zIndex: "1",bottom:"8px",backgroundColor:"rgb(233,0,120)"}}  color='secondary' size='medium'>
                        <AddIcon style={{color:"white"}} className="bx-flashing"/>
                    </button>
                </div>




                <ul className="items_all" style={{position:"fixed",bottom:"50px",right:"10px",zIndex: "2"}}>
                    <li>
                        <button class="btn btn-info btn-floating btn-lg"  title="Contact Us" style={{marginTop:"10px",marginBottom:"3px"}}>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={8} color="secondary">
                                    <QuestionAnswerRoundedIcon style={{color:"white"}}/>
                                </StyledBadge>

                            </IconButton>
                        </button>
                    </li>
                    <li>
                        <button class="btn btn-info btn-floating btn-lg"  title="Your orders" style={{marginTop:"10px",marginBottom:"3px",backgroundColor:"#ff7105",borderColor:"#ff7105"}}  color='primary'>

                                <Link to={'/Orders'}>
                                <StyledBadge badgeContent={this.state.countOrders} color="secondary">
                                    <EventNoteIcon style={{color:"white"}}/>
                                </StyledBadge>
                                </Link>

                        </button>
                    </li>

                    <li id="wish">
                        <button  class="btn btn-secondary btn-floating btn-lg" title="Your wishlist" style={{marginTop:"10px",marginBottom:"8px",backgroundColor:"#de34eb",borderColor:"#de34eb"}} color='secondary' size='medium'>
                           <Link to={'/WishList'}> <IconButton aria-label="cart">
                                <StyledBadge badgeContent={this.state.countWish} color="secondary">
                                    <FavoriteIcon style={{color:"white"}}/>
                                </StyledBadge>
                            </IconButton> </Link>
                        </button>
                    </li>

                    <li id="cart">
                        <button class="btn btn-warning  btn-floating btn-lg" style={{marginTop:"8px",marginBottom:"10px"}}  title="Your cart">
                            <Link to={'/Cart'}>  <IconButton aria-label="cart">
                                <StyledBadge badgeContent={this.state.countCart} color="secondary">
                                    <ShoppingCartRoundedIcon style={{color:"white"}}/>
                                </StyledBadge>
                            </IconButton> </Link>
                        </button>
                    </li>
                </ul>

                <button className="btn btn-floating btn-lg" id="scroll_btn" color='secondary' size='medium'  title="Go up">
                    <KeyboardArrowUpIcon style={{color: "white"}} className="bx-fade-down mb-3"/>
                </button>

            </>

        );
    }


}


    export default withRouter(NavBar);
