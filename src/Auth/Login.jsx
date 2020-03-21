import React from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AwesomeComponent from '../dashboard/AwesomeComponent';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.setState({ loading : true });

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
    .post('https://internship2.herokuapp.com/api/v1/login', user)
    .then(response => {
      console.log(response);
      localStorage.setItem('token', response.headers.authorization);
      console.log(response.headers.authorization);
      this.props.history.push(`/reports`);
    })
    // .catch((error) => {
    //     console.log(error);
    //   });

    setTimeout(() => {
      this.setState({loading : false});
    }, 2000)

  }

  render(){
    const { email, password, loading } = this.state;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={e => this.onSubmitHandler(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                onChange={this.handleInputChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={this.handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onSubmitHandler}
              >
              { loading && <i className="fa fa-refresh fa-spin"></i> }
              { !loading && <span>Sign In</span> }
              </Button>
            </form>
              { loading && <span><AwesomeComponent /></span> }
          </div>
          <Box mt={8}>
          </Box>
        </Container>
      </div>
    )
  }
}
