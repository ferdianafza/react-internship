import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from '../dashboard/Loading';

 export default class Checkout extends Component {
    state = {
    checkout: '',
    loading: false
  }

  handleChange = event   => {
    // console.log(event.target.files[0])
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    let token = localStorage.getItem('token');
    this.setState({ loading : true });
    const presence = {
                      checkout: this.state.checkout
                    };

    axios.put(`https://internship2.herokuapp.com/api/v1/presences/5`, { presence }, { headers: {"Authorization" : `${token}`} })
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
                    <label>checkout</label>
                    <br />
                    <input type="date" name="checkout" onChange={this.handleChange} />
                    <br />
                    <Button type="submit" variant="contained" color="primary">
                        { loading && <span size="4"><Loading /></span> }
                        { !loading && <span size="4">Checkout</span> }
                    </Button>
                </form>
            </div>
        );
    }
}