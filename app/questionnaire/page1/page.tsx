"use client";

import React from "react";
import { useState, useEffect } from "react";



// first page

//IMP: make sure questions are uniquely and appropriately named.

const QuestionnairePage = () => {
    const setQuestionnaireData =  (data: any) => {
        let others =  localStorage.getItem("pages"); 
        localStorage.setItem("pages", JSON.stringify( {...(others?JSON.parse(others):{}),...data} ));
    };
    const handleSubmit =  (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
         setQuestionnaireData(data);
         // maybe try to play the audio for the next one within the questionaire for the next one instead of a redirect
        // window.location.href = "/playaudio";
        window.location.href = "/questionnaire/page2";
    };
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label>
                    Q1:
                    <input type="text" name="Q1" />
                </label>
                <br />
                <label>
                    Q2
                    <input type="text" name="Q2" />
                </label>
                <br />
                <button type="submit">Next</button>
            </form>
        </main>
    );
};

export default QuestionnairePage;
