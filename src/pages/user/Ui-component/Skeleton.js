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

                        <Skeleton variant="rectangular" width={210} height={270} style={{borderRadius:"9px"}}/>
                        <Box sx={{ pt: 0.2 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
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
        <div className="col-6 col-md-4 col-lg-3 col-sm-4  p-2" id="products_search" >
        <Box sx={{ overflow: 'hidden' }}>
            <Media />
        </Box>
        </div>
    );
}
