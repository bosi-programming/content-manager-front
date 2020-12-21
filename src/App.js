import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import PostEditor from './components/PostEditor';

function App() {
  const [ postState, setPostState ] = useState('');
  const [ postHtmlState, setPostHtmlState ] = useState('');

  const setPost = (post) => {
    setPostState(post);
    setPostHtmlState(draftToHtml(convertToRaw(post.getCurrentContent())));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <PostEditor postState={postState} setPostState={setPost} />
    </div>
  );
}

export default App;
