import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
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
import Paper from '@material-ui/core/Paper';

// require("bootstrap/less/bootstrap.less");

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
    this.state = {
      activePage: 1,
      totalPage: 0,
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    axios.get(`https://mystore41.herokuapp.com/api/stores/35/products?page=${this.state.activePage}`)
      .then(response => {
        console.log(response.data.data);
        this.setState({products: response.data.data});
        this.setState({totalPage: response.data.meta.pagination.totalPage });
      });
  }

  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getProducts();
  }

  handleDelete = (productId) => {
    axios.delete(`https://mystore41.herokuapp.com/api/products/${productId}`).
      then((response) => {
        alert('Product Deleted!')
        this.getProducts();
      });
  }

  render() {
    return (
      <div>
        <div>
          <h2> My Presences </h2>
          <button>Checkin</button>
        </div>

        <TableContainer component={Paper}>
          <Table className="" size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Checkin</TableCell>
                <TableCell align="right">Checkout</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map(product => (
                <TableRow key={product.id}>
                  <TableCell align="right">{product.type}</TableCell>
                  <TableCell align="right">{product.attributes.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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