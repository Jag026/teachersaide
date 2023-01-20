import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import PrintButton from './PrintButton';

function RichTextEditor(props) {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [print, setPrint] = useState("");

  useEffect(() => {
    // Initialize Quill editor
    const editor = new Quill(editorRef.current, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      theme: 'snow'
    });
    editor.setText(props.text);
    let formattedContents = editor.getContents(props.text);
    setContent(formattedContents);
    setPrint(<PrintButton content={content} />)

    return () => {
      // Clean up Quill editor
      editor.destroy();
    };
  }, [props.text]);

  return (
    <div>
      <div ref={editorRef} />
      {print}
    </div>
  );
}

export default RichTextEditor;