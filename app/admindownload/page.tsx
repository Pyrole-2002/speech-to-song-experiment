"use client";

import React from "react";

export default function AdminDownloadPage ()  {
    const downloader = () => {
        let data = localStorage.getItem("submissions");
        let dataStr = JSON.stringify(data);
        let dataUri = 'data:application/json;charset=utf-8,'+ (dataStr);
        let exportFileDefaultName = 'submissions.json';
        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };
    const downloadCsv = () => {
        let data = localStorage.getItem("submissions");
        let csvContent = "data:text/csv;charset=utf-8,";
        // csvContent += "data:text/csv;charset=utf-8,";
        let dataObj = JSON.parse(data);
        let header = Object.keys(dataObj[0]);
        csvContent += header.join(",") + "\n";
        dataObj.forEach(function(rowArray){
            let row = header.map(function(fieldName){
                return rowArray[fieldName];
            });
            csvContent += row.join(",") + "\n";
        });
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "submissions.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    };

    return (<><button onClick={downloader}>
        Download JSON
    </button>
    <button onClick={downloadCsv}>
        Download CSV
    </button>
    </>);
}