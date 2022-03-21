import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


function Media(props) {

    return (
        <Grid container wrap="nowrap">
            <Box sx={{ width: 400, marginRight: 0.5, my: 1 }}>
                <div className="row">
                    <div className="col-3 col-md-3 col-lg-3 col-sm-3">
                        <Skeleton variant="rectangular" height={80} width={56}  style={{borderRadius:"6px"}}/>
                    </div>
                    <div className="col-9 col-lg-9 col-md-9 col-sm-9">
                        <Box sx={{ pt: 0.2 }}>
                            <Skeleton width="100%" />
                            <Skeleton width="60%" />
                        </Box>
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
        <div className="col-12 col-md-12 col-lg-11 col-sm-12 py-0 mx-auto mt-2" id="pr">
            <Box sx={{ overflow: 'hidden' }}>
                <Media />
            </Box>
        </div>
    );
}
