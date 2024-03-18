"use client";

import React from "react";
import { useState, useEffect } from "react";

const QuestionnairePage = () => {
    const [questionnaireData, setQuestionnaireData] = useState({});
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        setQuestionnaireData(data);
        window.location.href = "/playaudio";
    };
    useEffect(() => {
        console.log("questionnaireData:", questionnaireData);
    }, [questionnaireData]);
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
