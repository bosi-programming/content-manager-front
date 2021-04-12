import React, { useState, useEffect } from "react";

import { Editor } from "react-draft-wysiwyg";
import {
  ContentState,
  EditorState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import EditorImage from "../components/EditorImage";
import EditorQuote from "../components/EditorQuote";

const PostEditor = ({ postState, setPostState }) => {
  const [state, setState] = useState();

  useEffect(() => {
    if (postState && !state) {
      console.log(postState);
      const post = convertFromHTML(postState);
      console.log(post);

      if (post && post.contentBlocks.length > 0) {
        const postContent = ContentState.createFromBlockArray(
          post.contentBlocks,
          post.entityMap
        );
        setState(EditorState.createWithContent(postContent));
      }
    }
  }, [postState]);

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
      toolbarCustomButtons={[<EditorImage />, <EditorQuote />]}
    />
  );
};

export default PostEditor;
