import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Editor extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <TextField
                      id="outlined-error"
                      label="Subject"
                      defaultValue="Daily Report"
                      variant="outlined"
                      name="subject"
                    />
                    <br />
                    <br />
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Make your Report!</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Make your Report!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                    <br />
                    <Button variant="outlined" color="primary">
                      Create
                    </Button>
                </form>
            </div>
        );
    }
}

export default Editor;