import React, { Component } from 'react';
import axios from "axios";
import AppBar from '../dashboard/AppBar';
import Button from '@material-ui/core/Button';
import AwesomeComponent from '../dashboard/AwesomeComponent';
import Logout from '../Auth/Logout';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      email: "",
      nis: "",
      firstname: "",
      lastname: "",
      school: "",
      major_id: "",
      phone: "",
      nis: "",
      address: "",
      city: "",
      emergency_number: "",
      father_name: "",
      mother_name: "",
      province_id: "",
      start_date: "",
      end_date: "",
      status: "",
      zipcode: "",
      latitude: "",
      longitude: "",
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading : true });
    let token = localStorage.getItem('token');

    axios
    .get('https://internship2.herokuapp.com/api/v1/homes/myprofile', { headers: {"Authorization" : `${token}`} })
    .then(response => {
      console.log(response.data);

      this.setState({id : response.data.id});
      this.setState({email : response.data.email});
      this.setState({firstname : response.data.firstname});
      this.setState({lastname : response.data.lastname});
      this.setState({school : response.data.school});
      this.setState({phone : response.data.phone});
      this.setState({nis : response.data.nis});
      this.setState({address : response.data.address});
      this.setState({city : response.data.city});
      this.setState({emergency_number : response.data.emergency_number});
      this.setState({father_name : response.data.father_name});
      this.setState({mother_name : response.data.mother_name});
      this.setState({province_id : response.data.province_id});
      this.setState({start_date : response.data.start_date});
      this.setState({end_date : response.data.end_date});
      this.setState({status : response.data.status});
      this.setState({zipcode : response.data.zipcode});
      this.setState({latitude : response.data.latitude});
      this.setState({longitude : response.data.longitude});
      this.setState({major_id : response.data.major_id});

    })
    setTimeout(() => {
      this.setState({loading : false});
    }, 2000)

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
    const { id, email, firstname, address, mother_name, phone,
             emergency_number, lastname, father_name, zipcode,
             city, school, nis, start_date, end_date, loading } = this.state;

    return (
      <div>
        <AppBar />
        { loading && <span><AwesomeComponent /></span> }
         { !loading && <span>
        <Card className="">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {firstname} {lastname} <span style={{marginLeft: 360}}></span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Email {email}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Father {father_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Mother {mother_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Phone {phone}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Emergency Number {emergency_number}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Start {start_date} until {end_date}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <br />
        <Card className="">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                My Address <span style={{marginLeft: 360}}></span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
               {address}, {zipcode}, {city}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                School <span style={{marginLeft: 360}}></span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {school}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Nis {nis}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </span> }
      </div>
    )
  }
}
