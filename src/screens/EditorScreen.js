import React, { useState } from "react";

import PostEditor from '../components/PostEditor';

const EditorScreen = () => {
  const [postState, setPostState] = useState("");

  return <PostEditor postState={postState} setPostState={setPostState} />;
};

export default EditorScreen;
