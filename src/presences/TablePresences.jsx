import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import PropTypes from "prop-types";
import { CSVLink, CSVDownload } from "react-csv";
import ReactToExcel from 'react-html-table-to-excel';
import { Link } from "react-router-dom";
import $ from "jquery";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AwesomeComponent from '../dashboard/AwesomeComponent';
import Button from '@material-ui/core/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import Moment from 'react-moment';

// require("bootstrap/less/bootstrap.less");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalPage: 0,
      loading: false,
      presences: []
    };
  }

  componentDidMount() {
    this.getPresences();
  }

  getPresences = () => {
    this.setState({ loading : true });
    let token = localStorage.getItem('token');
    axios.get(`https://internship2.herokuapp.com/api/v1/presences?page=${this.state.activePage}`, { headers: {
                                                                                              'accept': 'application/json',
                                                                                              "Authorization" : `${token}`} })
      .then(response => {
        console.log(response);
        this.setState({presences: response.data.presences});
        this.setState({totalPage: response.data.meta.totalPage });
      });

    setTimeout(() => {
        this.setState({loading : false});
      }, 2000)
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getPresences();
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <center> { loading && <span><AwesomeComponent /></span> } </center>
        { !loading &&
          <TableContainer component={Paper}>
            <Table className="" size="small" id="table-presences" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right"><h3>Checkin</h3></TableCell>
                  <TableCell align="right"><h3>Checkout</h3></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.presences.map(presence => (
                  <TableRow key={presence.id}>
                    <TableCell align="right"><Moment>{presence.checkin}</Moment></TableCell>
                    <TableCell align="right"><Moment>{presence.checkout}</Moment></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        <br />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.state.totalPage * 10}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    );
  }
}