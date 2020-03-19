import React, { Component } from 'react';
import axios from "axios";

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
      longitude: ""
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');

    axios
    .get('https://internship2.herokuapp.com/api/v1/homes/myprofile', { headers: {"Authorization" : `${token}`} })
    .then(response => {
      console.log(response.data);

      this.setState({id : response.data.id});
      this.setState({email : response.data.email});
      this.setState({nis : response.data.nis});
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
  }

  handleLogout = () => {
    let token = localStorage.getItem('token');

    axios
    .delete('https://internship2.herokuapp.com/api/v1/logout', { headers: {"Authorization" : `bearer ${token}`} })
    .then(response => {
      console.log(response.data);
      // this.props.history.push(`/dashboard`);
      window.location.href = '/';
    })
  }

  render(){
    const { id, email } = this.state;

    return (
      <div>
        <p>ID : {id}</p>
        <p>Email : {email}</p>

        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}
