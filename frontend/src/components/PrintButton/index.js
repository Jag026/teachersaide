import React from 'react';

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
        <button onClick={print} className="w-28 h-10 bg-slate-300 border text-l mt-4 mb-20">Print</button>
    );
}

export default PrintButton;