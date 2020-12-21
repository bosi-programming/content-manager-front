import React, { useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const PostEditor = ({ postState, setPostState }) => {
  const [state, setState] = useState("");

  const setPost = (post) => {
    setState(post);
    setPostState(draftToHtml(convertToRaw(post.getCurrentContent())));
  };

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
      editorState={state}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setPost}
      toolbar={tollbarOptions}
    />
  );
};

export default PostEditor;
