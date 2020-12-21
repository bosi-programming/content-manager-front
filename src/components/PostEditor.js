import React from "react";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const PostEditor = ({ postState, setPostState }) => {
  const tollbarOptions = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
      "emoji",
      "remove",
      "history",
    ],
  };
  return (
    <Editor
      editorState={postState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setPostState}
      toolbar={tollbarOptions}
    />
  );
};

export default PostEditor;
