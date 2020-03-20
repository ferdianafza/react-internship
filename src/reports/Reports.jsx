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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from './Popper';
import AwesomeComponent from '../dashboard/AwesomeComponent';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import Moment from 'react-moment';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
    axios.get(`https://internship2.herokuapp.com/api/v1/reports?page=${this.state.activePage}`, { headers: {
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

  getReportsCsv = () => {
    let token = localStorage.getItem('token');
    // axios.get(`https://internship2.herokuapp.com/api/v1/reports?page=${this.state.activePage}`)
    axios.get(`http://0.0.0.0:5000/api/v1/reports.csv`, { headers: {"Authorization" : `${token}`} })
      .then(response => {
        console.log(response);
      });
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

  handleDelete = (productId) => {
    axios.delete(`https://mystore41.herokuapp.com/api/products/${productId}`).
      then((response) => {
        alert('Product Deleted!')
        this.getReports();
      });
  }

  exportCsv = () => {
    var csvRow= [];
    var A = [['no', 'subject', 'content', 'created at']];
    var re = this.state.reports;
    console.log(re);

    for(var item=0; item<re.length;item++) {
      A.push([item,re[item].subject,re[item].content,re[item].created_at]);
    }

    for(var i=0; i<A.length;++i) {
      csvRow.push(A[i].join(","))
    }
    console.log(csvRow);

    var csvString = csvRow.join("%0A");

    var a = document.createElement("a");
    a.href='data:attachment/csv,'+csvString;
    a.target ="_Blank";
    a.download="reports.csv";
    document.body.appendChild(a);

    a.click();
  }


  render() {
    const { loading } = this.state;
    return (
      <div>
        <Popper />
        <Button color="primary" onClick={this.exportCsv}>
          csv
        </Button>
        <ReactToExcel
          variant="contained"
          color="primary"
          className="btn"
          table="table-reports"
          filename="excel file"
          sheet="sheet 1"
          buttonText="xls"
         />
         <Button color="primary"onClick={this.jsPdfGenerator}>
          pdf
         </Button>
        <center> { loading && <span><AwesomeComponent /></span> } </center>
        { !loading &&
        <TableContainer component={Paper}>
          <Table className="" size="small" ref={this.myRef} id="table-reports" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><h3>Subject</h3></TableCell>
                <TableCell align="right"><h3>Content</h3></TableCell>
                <TableCell align="right"><h3>Created at</h3></TableCell>
                <TableCell align="right"><h3>Action</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reports.map(report => (
                <TableRow key={report.id}>
                  <TableCell component="th" scope="row">
                    {report.subject}
                  </TableCell>
                  <TableCell align="right">{report.contents}</TableCell>
                  <TableCell align="right"><Moment>{report.created_at}</Moment></TableCell>
                  <TableCell align="right">
                    <Link to={`/report/${report.id}`}>
                      Show
                    </Link>
                  </TableCell>
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