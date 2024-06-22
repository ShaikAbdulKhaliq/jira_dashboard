import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import css from "./Alerts.module.scss";
import done from '../../../assets/done.png'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const live_base_url = import.meta.env.VITE_live_base_url;
import Confetti from 'react-confetti'
import { MainContext } from "../../../MainContext/MainContext";


const Alerts = () => {
    const [popup, setPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);
    const { darkMode } = useContext(MainContext)

    // const done_story = stories.filter((story) => story.story_status == "Done");
    async function getStoriesAlert() {
        const response = await axios.get(`${live_base_url}/alerts`);
        const sprint_stories = response.data;
        const currentDate = new Date();
        const threshold = 6 * 1000;

        for (let count = 0; count < sprint_stories.length; count++) {
            if (
                sprint_stories[count] !== null &&
                currentDate - new Date(sprint_stories[count].updated) <= threshold
            ) {
                setPopupData(sprint_stories[count]);
                setPopup(true);
                break;
            }
        }
    }

    const dummyData = {
        creator: "Jatin",
        assignee: "Jatin",
        sprint_id: "922",
        sprint_name: "MIE Sprint 4",
        sprint_start: "2024-03-19",
        sprint_end: "2024-03-26",
        story_id: "93993",
        story_name: "Alert component creation with some updated changes.",
        story_type: "Story",
        story_status: "Done",
        project_id: "10249",
        project_name: "JIRA Dashboard - Mobius Engineering Implementation",
        status_name: "Done",
        story_points: 1,
        story_ac_hygiene: "NO",
        story_reviewers: "Reviewers not added",
        updated: "2024-05-01T12:42:49.205+0530",
        priority: "critical",
        time_original_estimate: "Not added"
    };


    useEffect(() => {
        if (!popup && popupData == null) {
            const intervalId = setInterval(() => {
                getStoriesAlert();
            }, 4000);
            return () => clearInterval(intervalId);
        }
    }, [popup]);

    const reloadAndClosePopup = () => {
        setPopupData(null);
        // window.location.reload();
        setPopup(false);
    };
    return (
        <div>
            {popup && (
                <div className={css.AlertContainer} id={!darkMode && css.lightMode}>
                    {
                        (popupData?.priority > 80 || popupData?.priority == "critical") &&
                        <Confetti
                        // width={"100%"}
                        // height={"100%"}
                        />}
                    <div className={css.popup}>
                        <img src={done} alt="" />
                        <div>
                            <p>
                                {popupData?.assignee}
                            </p>
                            <p>
                                {popupData?.story_name}
                            </p>
                            <span>
                                <p>
                                    Project : {popupData?.project_name}
                                </p>
                                <p>
                                    Sprint : {popupData?.sprint_name}
                                </p>
                            </span>
                            <span>
                                <p>
                                    SP : {popupData?.story_points}
                                </p>
                                <p style={{
                                    backgroundColor: `${popupData?.priority > 80 ? "#e6601338" : popupData?.priority == "critical" ? "#c41c1c1c" : popupData?.priority <= 80 ? "#c59d3044" : ""}`,
                                    color: `${popupData?.priority > 80 ? "#ff5e01" : popupData?.priority == "critical" ? "#ff0707" : popupData?.priority <= 80 ? "#c59d30" : ""}`,
                                    border: `.05rem solid ${`${popupData?.priority > 80 ? "#ff5e01" : popupData?.priority == "critical" ? "#ff0707" : popupData?.priority <= 80 ? "#c59d30" : ""}`}`
                                }}>
                                    Criticality : {popupData?.priority}
                                </p>
                            </span>


                        </div>
                        <div className={css.countDownTimer}>
                            <CountdownCircleTimer
                                isPlaying
                                size={20}
                                strokeWidth={1.5}
                                duration={30}
                                colors={`${popupData?.priority > 80 ? "#ff5e01" : popupData?.priority == "critical" ? "#ff0707" : popupData?.priority <= 80 ? "#c59d30" : ""}`}
                                trailColor="#515151"
                                onComplete={() => {
                                    reloadAndClosePopup()
                                    // do your stuff here
                                    // repeat animation in 1.5 seconds
                                }}
                            >
                                {({ remainingTime }) => (
                                    <div className={css.countDown} onClick={() => reloadAndClosePopup()}>
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.5 6L10.5 10" stroke="#515151" stroke-linecap="round" />
                                            <path d="M10.5 6L6.5 10" stroke="#515151" stroke-linecap="round" />
                                        </svg>
                                        {/* You can also apply additional styles to the image if needed */}
                                    </div>
                                )}
                            </CountdownCircleTimer>
                        </div>

                        {/* <button onClick={reloadAndClosePopup}>Close</button> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alerts;

