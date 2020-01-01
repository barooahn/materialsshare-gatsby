import React from "react";
import AppBar from "./app-bar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        margin: `3rem auto`, maxWidth: `1920`, padding: `1rem`
    },
});

export default ({ children }) => {
    const classes = useStyles();
    return (
        <div>
            <AppBar></AppBar>
            <div className={classes.root}>
                {children}
            </div>
        </div>
    )
}