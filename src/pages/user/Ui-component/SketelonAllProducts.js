import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


function Media(props) {

    return (
        <Grid container wrap="nowrap">
            <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>

                <Skeleton variant="rectangular" width={210} height={250} style={{borderRadius:"9px"}}/>
                <Box sx={{ pt: 0.2 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                    <Skeleton width="100%" />
                </Box>
            </Box>
        </Grid>
    );
}

Media.propTypes = {
    loading: PropTypes.bool,
};

export default function YouTube() {
    return (
        <div className="col-8 col-md-6 col-lg-3 col-sm-7 m-auto my-2 py-2" id="products" >
            <Box sx={{ overflow: 'hidden' }}>
                <Media />
            </Box>
        </div>
    );
}
