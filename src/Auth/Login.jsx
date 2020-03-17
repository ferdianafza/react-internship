import React from 'react';
import axios from "axios";


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    const user = { api_v1_student: {
        email: this.state.email,
        password: this.state.password
      }
    }

    // try {
    //   const response = await API.post('/v1/login', user);
    //   console.log('👉 Returned data:', response);
    // } catch (e) {
    //   console.log(`😱 Axios request failed: ${e}`);
    // }

    axios
    .post('http://localhost:3000/api/v1/login', user)
    .then(response => {
      localStorage.setItem('token', response.headers.authorization);
      console.log(response.headers.authorization);
      console.log(response.data);
      this.props.history.push(`/myprofile`);
    })

  }

  render(){
    const { email, password } = this.state;

    return (
      <form onSubmit={e => this.onSubmitHandler(e)}>
        <label>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={this.handleInputChange}
          />
          <br />
        <label>Password</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={this.handleInputChange}
        />
        <br />
        <input type="submit"></input>
      </form>
    )
  }
}
