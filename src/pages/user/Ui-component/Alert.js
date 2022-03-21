import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleAlerts() {
    const classes = useStyles();

    return (
        <div className={classes.root+"mx-0 px-0"} style={{width:"100%",margin:"0",padding:"0"}}>
            <Alert severity="error">No product found</Alert>
        </div>
    );
}
