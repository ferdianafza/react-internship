import React from "react";
import axios from "axios";
import stripHtml from "string-strip-html";
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import AppBar from '../dashboard/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      content: "",
      created_at: ""
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    const { match: {params: { id } } } = this.props;

    axios.get(`https://internship2.herokuapp.com/api/v1/reports/${id}`,
                                                            { headers: {
                                                                'accept': 'application/json',
                                                                "Authorization" : `${token}`} })
      .then(res => {
        console.log(res.data);
        this.setState({subject: res.data.subject});
        this.setState({content : res.data.content.body});
        this.setState({created_at : res.data.created_at});

      })
  }



render() {
    const { subject, content, created_at } = this.state;
    return (
      <div >
      <AppBar />
      <br />
      <Card className="">
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {subject} <span style={{marginLeft: 360}}><Moment>{created_at}</Moment></span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {stripHtml(content)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
    );
  }
}