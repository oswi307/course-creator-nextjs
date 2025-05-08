
"use client"

import React, { useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';  // Importa los estilos predeterminados

const TextResource = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    console.log(rawContent);  // Aquí puedes guardar el contenido de alguna manera
  };

  return (
    <div>
      <h2>Editor de Texto</h2>
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
      />
      <button onClick={handleSave}>Guardar Contenido</button>
    </div>
  );
};

export default TextResource;
