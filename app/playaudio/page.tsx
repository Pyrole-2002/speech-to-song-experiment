"use client";

import React from "react";
import Link from "next/link";

const page = () => {
    return (
        <main>
            <h1>Audio is playing</h1>
        </main>
    );
};

export default page;


// the public/audio folder will have around 40 audio files
// pipeline will be:
// trial -> audio -> questionnaire(-> audio -> questionnaire) x 40
// data from trial questionnaire won't be stored
// loop every audio 'f' times separated by duration 'd' seconds and then automatically navigate to questionnaire.
// take f=3, d=0.5 for now

// in the final file the data should be arranged as follows:
// participantID, sessionNumber, audio1Name, audio1Q1, audio2Q2, audio2Name, audio2Q1, audio2Q2, ...audio40Q1, audio40Q2
// else whatever you feel would be the most modular method of storing data

// lemme know whatever you wanna order as lunch or dinner
