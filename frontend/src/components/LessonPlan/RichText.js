import React, { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import PrintButton from '../PrintButton';

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
    let formattedContents = JSON.parse(JSON.stringify(editor.getContents()["ops"][0]["insert"].replace(/\n/g, '<br>')));
    setContent(formattedContents);
    //setPrint()

    return () => {
      // Clean up Quill editor
      editor.destroy();
    };
  }, [props.text]);

  function handleEditorChange() {
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
  }

  return (
    <div>
      <div contentEditable ref={editorRef} onInput={handleEditorChange} />
      {content && <PrintButton content={content} />}
    </div>
  );
}

export default RichTextEditor;