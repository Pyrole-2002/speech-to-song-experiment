'use client';

import { useEffect } from 'react';
import { JsPsych, initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychPreload from '@jspsych/plugin-preload';
import { time } from 'console';

const Experiment: React.FC = () => {
    useEffect(() => {
        const jspsych = initJsPsych({
            plugins: [
                jsPsychPreload,
            ],
        });

        var timeline = [];
        var welcome = {
            type: htmlKeyboardResponse,
            stimulus: "Welcome to the experiment. Press SPACE to begin.",
            choices: [" "],
        };
        timeline.push(welcome);

        var bye = {
            type: htmlKeyboardResponse,
            stimulus:
                "Thank you for participating in the experiment. Press SPACE to finish.",
            choices: [" "],
        };
        timeline.push(bye);

        jspsych.run(timeline);
    }, []);

    return (
        <div id="jspsych-experiment"></div>
    );
};

export default Experiment;
