import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import axios from "axios";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";


function Media(props) {

    return (
        <Grid container wrap="nowrap">
            <Box sx={{ width: 1000, marginRight: 0.5, my: 1 }}>



                <div className="row   pb-3 pt-2  mx-auto my-3" id="One_pr_cart">

                    <div className="col-lg-12 m-auto">
                        <div className="row  mt-1">
                            <div className="col-lg-8 col-md-7 col-sm-4 col-1  pl-4 pr-0 mr-0">
                                <Skeleton width="6%" /><br/>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-9 text-right float-right my-auto">
                                <span id="shipping_pr" style={{color:"lightGray"}}><Skeleton width="100%" /></span>
                            </div>
                            <div className="col-lg-1  col-md-1 col-sm-1 col-1 text-right float-right" id="del_pr">
                                <Skeleton width="100%"/>

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
                                        <Skeleton variant="rectangular" height={150} width={110}  style={{borderRadius:"6px"}}/>
                                    </div>
                                    <div className="col-lg-8 col-md-7 col-sm-9 col-7 pl-3 my-auto mx-auto">
                                        <div className="row m-auto">
                                            <div className="col-lg-12 m-auto">
                                              <span id="name_pr">
                                                  <Skeleton width="100%" />
                                              </span>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="" style={{color:"darkblue",fontSize:"0.8em"}}>
                                                 <Skeleton width="100%" />
                                              </span>
                                                <span id="discount_pr">
                                                  <Skeleton width="100%" />
                                              </span>

                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <span id="shipping_pr">
                                                    <Skeleton width="100%" />
                                                </span>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3  col-md-3 col-sm-12 col-12 m-auto">
                                <div className="row m-auto p-auto">

                                    <div className="col-lg-12 col-md-6 col-sm-4 col-4 text-center">
                                                <span id="shipping_pr">
                                                    <Skeleton width="100%" />
                                                </span>

                                    </div>
                                    <div className="col-lg-12 col-md-6 col-sm-4 col-4 text-center">
                                                <span id="order_pr">
                                                    <Skeleton width="100%" />
                                                </span>


                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12  col-md-12 col-sm-12 col-12">
                                <div className="row mt-2">
                                    <div className="col-lg-4">
                                        <div className="row mb-0">
                                            <div className="col-lg-12 text-left my-auto">


                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-11 order-1 order-sm-1 order-lg-2 order-md-2  float-right text-right mx-auto mt-2 pr-2" id="add_to">
                                        <div className="input-group">
                                            <Skeleton width="100%" />
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>



            </Box>
        </Grid>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export default function YouTube() {
    return (

            <Box sx={{ overflow: 'hidden' }}>
                <Media />
            </Box>

    );
}
