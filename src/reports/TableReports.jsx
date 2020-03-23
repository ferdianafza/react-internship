import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import ReactToExcel from 'react-html-table-to-excel';
import { CSVLink, CSVDownload } from "react-csv";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import $ from "jquery";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AwesomeComponent from '../dashboard/AwesomeComponent';
import Paper from '@material-ui/core/Paper';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import Moment from 'react-moment';
import stripHtml from "string-strip-html";
import TruncateString from 'react-truncate-string'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      activePage: 1,
      totalPage: 0,
      loading: false,
      reports: []
    };
  }

  componentDidMount() {
    this.getReports();
  }

  getReports = () => {
    this.setState({ loading : true });
    let token = localStorage.getItem('token');
    // axios.get(`https://internship2.herokuapp.com/api/v1/reports?page=${this.state.activePage}`)
    axios.get(`https://internship2.herokuapp.com/api/v1/reports?page=${this.state.activePage}`,
                                                                    { headers: {
                                                                        'accept': 'application/json',
                                                                        "Authorization" : `${token}`} })
      .then(response => {
        console.log(response);
        this.setState({reports: response.data.reports});
        this.setState({totalPage: response.data.meta.totalPage });
      });
      setTimeout(() => {
        this.setState({loading : false});
      }, 2000)
  }


  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getReports();
  }

  jsPdfGenerator = () => {
    const doc = new jsPDF()
    doc.autoTable({ html: '#table-reports' })
    doc.save('Reports.pdf')
  }


  truncate = (str) => {
    return str.length > 10 ? str.substring(0, 17) + "..." : str;
  }


  render() {
    const { loading } = this.state;
    return (
      <div>
        <center> { loading && <span><AwesomeComponent /></span> } </center>
        { !loading &&
        <TableContainer component={Paper}>
          <Table className="" size="small" ref={this.myRef} id="table-reports" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><h3>Subject</h3></TableCell>
                <TableCell align="right"><h3>Content</h3></TableCell>
                <TableCell align="right"><h3>Created at</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reports.map(report => (
                <TableRow key={report.id}>
                  <TableCell component="th" scope="row">
                    {report.subject}
                  </TableCell>
                  <TableCell align="right">{this.truncate(stripHtml(report.content.body))}</TableCell>
                  <TableCell align="right"><Moment>{report.created_at}</Moment></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
        <br />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={this.state.totalPage * 5}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
          itemClass="page-item"
          linkClass="page-link"
        />


      </div>
    );
  }
}