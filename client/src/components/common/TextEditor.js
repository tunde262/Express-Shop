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
    const { editorState } = this.state;
    console.log(convertToRaw(editorState.getCurrentContent()));
    return (
      <div style={{background:'#fff', border:'1px solid rgb(214, 214, 214)'}}>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea> */}
      </div>
    );
  }
}