
import {Component} from "react";
import {Route,Redirect,useHistory} from "react-router-dom"
import axios from "axios";
import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import swal from "sweetalert";





function UserPrivateRoute({component:Component,...rest}){
    const [isAuth, setisAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const history=useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')===null)
        {
            setLoading(false);
                swal({
                title: "oops!",
                text: "please login first !",
                icon: "error",
            });
                history.push('/')
            return;
        }


        axios.get('/api/isAuthentacated').then(response=>{

                if(response.data.status===200)
                {
                    setisAuth(true);

                }

                setLoading(false);
            }
        ).catch(function (error){

            swal({
                title: "oops!",
                text: "please login first !",
                icon: "error",
            });
            history.push('/')
        })

        return ()=>{
            setisAuth(false);
        }

    },[]);
    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(error){
        try {
            if(error.response.status===401)
                history.push('/')


            return  Promise.reject(error)
        }catch (error)
        {
            history.push('/') }



    })



if(isLoading)
    return  <ClipLoader size={150} color={"#edd209"} css={{position:"relative",left:"45%"}} />

    return(
        <Route
            {...rest}

          render={(props)=>{
              if(isAuth)
              {
                  return <Component/>
              }

          }}


        />
    )

}



export default UserPrivateRoute
