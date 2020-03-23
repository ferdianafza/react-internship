import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from '../dashboard/Loading';

class CrerateReport extends Component {
    state = {
    subject: '',
    content: '',
    loading: false
  }

  handleChange = event   => {
    // console.log(event.target.files[0])
    this.setState({ [event.target.name]: event.target.value });
    console.log( this.state.subject );
  }
  handleChangeEditor = (event , editor)  => {
    const data = editor.getData();
    this.setState({ content: data })
    console.log( { data } );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading : true });

    let token = localStorage.getItem('token');


    const report = {
                      subject: this.state.subject,
                      content: this.state.content
                    };

    axios.post(`https://internship2.herokuapp.com/api/v1/reports`, { report }, { headers: {"Authorization" : `${token}`} })
      .then(res => {
        console.log(res);
        console.log(res.data);
          alert('report Created!');
        // this.fetchreportsList();
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
                    <label>Subject</label>
                    <br />
                    <input type="text" name="subject" onChange={this.handleChange} />
                    <br />
                    <br />
                    <CKEditor
                        editor={ ClassicEditor }
                        // data="<p>Make your Report!</p>"
                        name="content"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Make your Report!', editor );
                        } }
                        onChange={this.handleChangeEditor}
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    <Button type="submit"variant="contained" color="primary">
                        { loading && <span size="4"><Loading /></span> }
                        { !loading && <span size="4">Create</span> }
                    </Button>

                </form>
            </div>
        );
    }
}

export default CrerateReport;