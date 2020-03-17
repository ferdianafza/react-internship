import React, { Component } from 'react';
import axios from "axios";

export default class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      email: ""
    };
  }

  componentDidMount() {
    // let token = localStorage.getItem('token');
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYXBpX3YxX3N0dWRlbnQiLCJhdWQiOm51bGwsImlhdCI6MTU4NDQyODYzNiwiZXhwIjoxNTg0NTE1MDM2LCJqdGkiOiI5Y2IyYTU0MS0xY2I4LTQxY2QtODQzYi1hZjg3ZWVlNjgwM2EifQ.APkATL3p3GEjaSmX4NEi0fsrx56fueFcZq90U49L5PY";

    axios
    .get('http://0.0.0.0:5000/api/v1/homes/myprofile', { headers: {"Authorization" : `${token}`} })
    .then(response => {
      console.log(response.data);

      this.setState({id : response.data.id});
      this.setState({email : response.data.email});

    })
  }

  handleLogout = () => {
    let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoiYXBpX3YxX3N0dWRlbnQiLCJhdWQiOm51bGwsImlhdCI6MTU4NDQyODYzNiwiZXhwIjoxNTg0NTE1MDM2LCJqdGkiOiI5Y2IyYTU0MS0xY2I4LTQxY2QtODQzYi1hZjg3ZWVlNjgwM2EifQ.APkATL3p3GEjaSmX4NEi0fsrx56fueFcZq90U49L5PY";

    axios
    .delete('http://localhost:5000/api/v1/logout', { headers: {"Authorization" : `${token}`} })
    .then(response => {
      console.log(response.data);
      this.props.history.push(`/`);
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
