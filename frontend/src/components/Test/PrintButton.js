import React from 'react';
import Quill from 'quill';

function PrintButton(props) {
    const print = () => {
        let newWindow = window.open();
        let newContent = props.content;
        newWindow.document.write(newContent);
        newWindow.print();
    }

    return (
        <button onClick={print}>Print</button>
    );
}

export default PrintButton;