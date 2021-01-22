import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    editorState: EditorState.createEmpty(),
    fetchData: false
  };

  componentDidMount(){
    console.log('EDITOR STATE');
  
    let unRawState;
    if(this.props.descriptionObj !== null) {
       unRawState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.descriptionObj))
      );
      this.setState({editorState: unRawState});
      console.log(unRawState)
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    this.props.setDescriptionObj(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    console.log(convertToRaw(editorState.getCurrentContent()))
  };

  render() {
    const { editorState, fetchData } = this.state;
    console.log(convertToRaw(editorState.getCurrentContent()));

    let newState;
    if(this.props.descriptionObj !== null && !fetchData) {
       newState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.props.descriptionObj))
      );
      this.setState({editorState: newState, fetchData: true});
      console.log(newState)
    }
    return (
      <div style={{background:'#fff', minHeight:'200px'}}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{ minHeight:'200px', cursor:'text', paddingLeft:'10px', paddingRight:'10px' }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea> */}
      </div>
    );
  }
}