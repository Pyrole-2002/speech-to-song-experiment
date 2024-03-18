"use client";

import React from "react";
import { useState, useEffect } from "react";


// final page
const Page2 = () => {
    const setQuestionnaireData =  (data: any) => { 
        let others =  localStorage.getItem("pages"); 
        let finaldata = {...(others?JSON.parse(others):{}),...data};
        console.log(finaldata);
        let othersubs = localStorage.getItem("submissions");
        localStorage.setItem("submissions", othersubs?JSON.stringify([...JSON.parse(othersubs),finaldata]):JSON.stringify([finaldata]));
        localStorage.setItem("pages", JSON.stringify({}));
        alert("Thank you for your time");
    };
    const handleSubmit =  (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
         setQuestionnaireData(data);
    };
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label>
                    Q3:
                    <input type="text" name="Q3" />
                </label>
                <br />
                <label>
                    Q4
                    <input type="text" name="Q4" />
                </label>
                <br />
                <button type="submit">Submit final</button>
            </form>
        </main>
    );
};

export default Page2;
