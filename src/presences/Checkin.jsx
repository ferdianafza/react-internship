import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from '../dashboard/Loading';

 export default class Checkin extends Component {
    state = {
    checkin: '',
    checkout: '',
    loading: false
  }

  handleChange = event   => {
    // console.log(event.target.files[0])
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading : true });

    let token = localStorage.getItem('token');


    const presence = {
                      checkin: this.state.checkin,
                      checkout: this.state.checkout
                    };

    axios.post(`https://internship2.herokuapp.com/api/v1/presences`, { presence }, { headers: {"Authorization" : `${token}`} })
      .then(res => {
        console.log(res);
        console.log(res.data);
          alert('presence Created!');
        // this.fetchpresencesList();
      })

    setTimeout(() => {
      this.setState({loading : false});
    }, 2000)
  }

    render() {
        const { loading } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <br />
                    <label>checkin</label>
                    <br />
                    <input type="date" name="checkin" onChange={this.handleChange} />
                    <input type="date" name="checkout" onChange={this.handleChange} hidden />
                    <br />
                    <Button type="submit" variant="contained" color="primary">
                        { loading && <span size="4"><Loading /></span> }
                        { !loading && <span size="4">Create</span> }
                    </Button>
                </form>
            </div>
        );
    }
}