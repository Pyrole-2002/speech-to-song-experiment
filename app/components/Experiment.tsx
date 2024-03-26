'use client';

import { useEffect, useState } from 'react';
import path from 'path';
import { initJsPsych } from 'jspsych';
import 'jspsych/css/jspsych.css';
import jsPsychPreload from '@jspsych/plugin-preload';
import fullscreen from '@jspsych/plugin-fullscreen';
import surveyHtmlForm from '@jspsych/plugin-survey-html-form';
import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import audioKeyboardResponse from '@jspsych/plugin-audio-keyboard-response';
import surveyLikert from '@jspsych/plugin-survey-likert';


const Experiment: React.FC = () => {
    const [audioFiles, setAudioFiles] = useState<string[]>([]);
    useEffect(() => {
        const getAudioFiles = async () => {
            const response = await fetch("/audios-manifest.json");
            const respJson = await response.json();
            const filePaths = respJson.audioFiles;
            const audioFiles = filePaths.map((filePath: string) => {
                return path.join("/audios/", filePath);
            });
            console.log(audioFiles);
            setAudioFiles(audioFiles);
        };
        if (audioFiles.length === 0) {
            getAudioFiles();
        }
        const audioTimelineVariables = audioFiles.map(audio => ({ audio: audio }));

        const jspsych = initJsPsych({
            plugins: [
                jsPsychPreload,
            ],
            on_finish: () => {
                jspsych.data.displayData();
            }
        });

        var timeline = [];

        var preload = {
            type: jsPsychPreload,
            audio: audioFiles,
        };
        timeline.push(preload);

        var fullscreen_trial = {
            type: fullscreen,
            fullscreen_mode: true,
        };
        timeline.push(fullscreen_trial);

        var participant_id = {
            type: surveyHtmlForm,
            html:
            `
                <p>Participant ID</p>
                <input type="text" name="participant_id" placeholder="Participant ID">
                <p>Tapping (yes/no)</p>
                <input type="text" name="tapping" placeholder="Tapping">
                <br>
                <br>
                <br>
                <br>
                <br>
            `,
            autofocus: 'participant_id',
        }
        timeline.push(participant_id);

        var participant_info = {
            type: surveyHtmlForm,
            html:
            `
                <p>Before we begin, please enter some information about yourself.</p>
                <p>Name</p>
                <input type="text" name="name" placeholder="Name">
                <p>Age</p>
                <input type="text" name="age" placeholder="Age">
                <p>All participant info needed to be collected</p>
                <br>
                <br>
                <br>
                <br>
            `,
            autofocus: 'name',
        }
        timeline.push(participant_info);

        var welcome = {
            type: htmlKeyboardResponse,
            stimulus: "Welcome to the experiment. Press SPACE to begin.",
            choices: [" "],
        };
        timeline.push(welcome);

        var instructions = {
            type: htmlKeyboardResponse,
            stimulus:
                "In this experiment, you will be listening to a series of sounds. Press SPACE to continue. Add instructions here...",
            choices: [" "],
        };
        timeline.push(instructions);

        var trial_exp = {
            timeline: [
                {
                    type: audioKeyboardResponse,
                    stimulus: '/audios/1.wav',
                    choices: [' '],
                    prompt: "<p>Tap Space to the Audio being played. Think when to put this and when not depending on grp...</p>",
                    response_ends_trial: false,
                    trial_ends_after_audio: true,
                    response_allowed_while_playing: true,
                },
                {
                    type: surveyHtmlForm,
                    html:
                    `
                        <p>How did you feel after listening to the audio?</p>
                        <input type="text" name="feel" placeholder="Feel">
                        <p>Add questions</p>
                        <br>
                    `,
                },
                {
                    type: surveyLikert,
                    questions: [
                        {prompt: "How much did you enjoy listening to the audio?", labels: ["1", "2", "3", "4", "5"]},
                        {prompt: "How much did you like the audio?", labels: ["Not at all", "Very much"]},
                    ],
                },
                {
                    type: htmlKeyboardResponse,
                    stimulus: "Trial over. Now the experiment data collection will start. Press SPACE when ready.",
                    choices: [" "],
                }
            ]
        };
        timeline.push(trial_exp);

        var experiment = {
            timeline: [
                {
                    type: audioKeyboardResponse,
                    stimulus: jspsych.timelineVariable('audio'),
                    choices: [' '],
                    prompt: "<p>Tap Space to the Audio being played. Think when to put this and when not depending on grp...</p>",
                    response_ends_trial: false,
                    trial_ends_after_audio: true,
                    response_allowed_while_playing: true,
                },
                {
                    type: surveyHtmlForm,
                    html:
                    `
                        <p>How did you feel after listening to the audio?</p>
                        <input type="text" name="feel" placeholder="Feel">
                        <p>Add questions</p>
                        <br>
                    `,
                },
                {
                    type: surveyLikert,
                    questions: [
                        {prompt: "How much did you enjoy listening to the audio?", labels: ["1", "2", "3", "4", "5"]},
                        {prompt: "How much did you like the audio?", labels: ["Not at all", "Very much"]},
                    ],
                },
            ],
            timeline_variables: audioTimelineVariables,
        };
        timeline.push(experiment);

        var bye = {
            type: htmlKeyboardResponse,
            stimulus:
                "Thank you for participating in the experiment. Press SPACE to finish.",
            choices: [" "],
        };
        timeline.push(bye);

        jspsych.run(timeline);
    }, [audioFiles]);

    return (
        <div id="jspsych-experiment"></div>
    );
};

export default Experiment;
