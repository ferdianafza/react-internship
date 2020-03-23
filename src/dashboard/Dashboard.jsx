import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '../dashboard/AppBar';
import TableReports from '../reports/TableReports';
import TablePresences from '../presences/TablePresences';
import Checkin from '../presences/Checkin';
import Checkout from '../presences/Checkout';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppBar />
    <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><TableReports /></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><TablePresences /></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>

      <Checkin />
      <Checkout />
    </div>
  );
}
