import React, { Component } from 'react';
import axios from "axios";
import AppBar from '../dashboard/AppBar';
import Button from '@material-ui/core/Button';
import AwesomeComponent from '../dashboard/AwesomeComponent';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLogout = () => {
    this.setState({ loading : true });
    let token = localStorage.getItem('token');

    axios
    .delete('https://internship2.herokuapp.com/api/v1/logout', { headers: {"Authorization" : `bearer ${token}`} })
    .then(response => {
      console.log(response.data);
      // this.props.history.push(`/dashboard`);
      window.location.href = '/';
    })

    setTimeout(() => {
      this.setState({loading : false});
    }, 2000)
  }

  render(){
    return (
      <div>
        <Button color="primary" onClick={this.handleLogout}>Logout</Button>
      </div>
    )
  }
}
