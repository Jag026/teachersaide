import React from 'react';
import Quill from 'quill';

function PrintButton(props) {
    const print = () => {

        let newWindow =  window.open();
        let printableArea = newWindow.document.createElement("div");
        printableArea.innerHTML = props.content;
        newWindow.document.body.appendChild(printableArea);
        newWindow.print();
        newWindow.document.body.removeChild(printableArea);
        newWindow.close();
    }
    return (
        <button onClick={print}>Print</button>
    );
}

export default PrintButton;