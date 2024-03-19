"use client";

import React from "react";
import Link from "next/link";
import {
    useState,
    useEffect,
    useRef
} from "react";

const Page = () => {
    const [flag, updateflag] = useState(false);
    const [curr, setCurr] = useState(1);
    // var variableArray = [props.participantID, props.sessionNumber];
    // const pushVariableArray = (data) => {
    //     variableArray.push(data);
    // };
    return (
        // if flag == 0 : audio(updateflag, curr)
        // else : questionnaire(updateQuesn, updateflag, curr, setCurr)
        // if curr == 40 : finish button
        // else : next button
        <main>
            <h1>Audio is playing</h1>
        </main>
    );
};

export default Page;
