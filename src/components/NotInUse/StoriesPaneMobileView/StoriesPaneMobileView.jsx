import React from 'react'
import css from './StoriesPaneMobileView.module.scss'
import Loader from "../../Loader";
import Accordion from 'react-bootstrap/Accordion';
import Members from '../Members';
import '../../styles/Members.css'
// import '../../styles/RightPane.css'
const StoriesPaneMobileView = ({ stories, setStoryId, storiesLoading, storyId, storyPoints, member, storyPointsData, sprintMembers, filterStoriesByMember, clearSelectedMember }) => {

    if (member !== "All Members") {
        console.log("members", member);
        stories = stories.filter((story) => story.assignee == member);
    }

    return (
        <section className={css.leftPane}>
            <div className={`${css.sprintMembersContainer} ${css.sprintMembersDiv}`}>
                <div className={css.membersHeader}>
                    <p>
                        Members ({sprintMembers.length !== 0 ? sprintMembers.length : 0})
                    </p>
                    <button className={`${css.btn} ${css.btnSecondary} ${css.btnSm}`} onClick={clearSelectedMember}>
                        Clear
                    </button>
                </div>
                <div className={css.selectedMemberCont}>
                    Member Selected : <span className={css.selectedMember}>{member}</span>
                </div>
                <Members
                    sprintMembers={sprintMembers}
                    filterStoriesByMember={filterStoriesByMember}
                    mmember={member}
                />
            </div>
            <Accordion defaultActiveKey="2" style={{ display: "flex", gap: "2vw", flexDirection: "column" }}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> <p style={{ color: "#392467", fontWeight: "600", margin: "0" }}> To Do ({stories.filter((story) => story.status_name === "To Do").length})</p></Accordion.Header>
                    <Accordion.Body style={{ height: "55vh", overflow: "scroll" }}>
                        {storiesLoading ? (
                            <div className={css.storyLoader}>
                                <Loader />
                            </div>
                        ) : stories.length === 0 ? (
                            <div className={css.storyPaneMessage}>Stories not added</div>
                        ) : (
                            <div className={css.storiesList}>
                                {stories
                                    .sort((a, b) => new Date(a.updated) - new Date(b.updated))
                                    .filter((story) => story.status_name === "To Do")
                                    .map((story, index) => {
                                        const last_updated = story.updated;
                                        const dateObject = new Date(last_updated);
                                        const year = dateObject.getFullYear();
                                        const month = dateObject.getMonth() + 1;
                                        const day = dateObject.getDate();
                                        const hours = dateObject.getHours();
                                        const minutes = dateObject.getMinutes();
                                        const seconds = dateObject.getSeconds();
                                        const formattedDate = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month
                                            }-${year}`;
                                        const currentDate = new Date();
                                        const current_year = currentDate.getFullYear();
                                        const current_month = String(
                                            currentDate.getMonth() + 1
                                        ).padStart(2, "0");
                                        const current_day = String(currentDate.getDate()).padStart(
                                            2,
                                            "0"
                                        );
                                        const today = `${current_year}-${current_month}-${current_day}`;

                                        return (
                                            <div
                                                key={index}
                                                className={css.storyPill}
                                                style={{
                                                    backgroundColor:
                                                        storyId === story.story_id ? "#341e4d" : "#dbbffd",
                                                    color: storyId === story.story_id ? "#dbbffd" : "#392467",
                                                    animation: `fadeInAndSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${0.5 + index * 0.1
                                                        }s 1 forwards`,
                                                }}
                                                onClick={(e) => {
                                                    setStoryId(story.story_id.toString());
                                                }}
                                            >
                                                <div className={css.storyDetails}>
                                                    <div className={css.storyName}>
                                                        <div>
                                                            <i
                                                                style={{
                                                                    color:
                                                                        storyId === story.story_id
                                                                            ? "white"
                                                                            : "#5D3587",
                                                                }}
                                                                className="fa-solid fa-bookmark"
                                                            ></i>
                                                        </div>
                                                        <p>{story.story_name}</p>
                                                    </div>
                                                    <div className={css.storyHygiene}>
                                                        Hygiene :{" "}
                                                        <span
                                                            style={{
                                                                color:
                                                                    story.story_ac_hygiene === "YES"
                                                                        ? "green"
                                                                        : "red",
                                                            }}
                                                        >
                                                            {story.story_ac_hygiene}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={css.updatedDate}
                                                        style={{
                                                            backgroundColor:
                                                                story.duedate != "Not added"
                                                                    ? new Date(story.duedate) >= new Date(today)
                                                                        ? "#00FF00"
                                                                        : "#FA8072"
                                                                    : "",
                                                        }}
                                                    >
                                                        <div>Due : {story.duedate}</div>
                                                    </div>
                                                    <div className={css.updatedDate}>
                                                        <div>Updated : {formattedDate}</div>
                                                    </div>
                                                    <div className={css.assignedTo}>
                                                        Assigned To : {story.assignee}
                                                    </div>
                                                </div>
                                                <div className={css.statusStorypoints}>
                                                    <div
                                                        style={{
                                                            color: storyId === story.story_id ? "#341e4d" : "#341e4d",
                                                            backgroundColor:
                                                                storyId === story.story_id ? "#dbbffd" : "#e6d3fc",
                                                        }}
                                                        className={css.storyStatusLabel}
                                                    >
                                                        {story.story_status}
                                                    </div>
                                                    <div className={css.storyPointsInStoryPane}>
                                                        SP : {story.story_points}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header> <p style={{ color: "#392467", fontWeight: "600", margin: "0" }}>
                        In Progress ({
                            stories.filter(
                                (story) =>
                                    story.status_name !== "Done" && story.status_name !== "To Do"
                            ).length}
                        )
                    </p>
                    </Accordion.Header>
                    <Accordion.Body style={{ height: "55vh", overflow: "scroll" }}>
                        {storiesLoading ? (
                            <div className={css.storyLoader}>
                                <Loader />
                            </div>
                        ) : stories.length === 0 ? (
                            <div className={css.storyPaneMessage}>Stories not added</div>
                        ) : (
                            <div className={css.storiesList}>
                                {stories
                                    .sort((a, b) => new Date(a.updated) - new Date(b.updated))
                                    .filter(
                                        (story) =>
                                            story.status_name !== "Done" && story.status_name !== "To Do"
                                    )
                                    .map((story, index) => {
                                        const last_updated = story.updated;
                                        const dateObject = new Date(last_updated);
                                        const year = dateObject.getFullYear();
                                        const month = dateObject.getMonth() + 1;
                                        const day = dateObject.getDate();
                                        const formattedDate = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month
                                            }-${year}`;

                                        const currentDate = new Date();
                                        const current_year = currentDate.getFullYear();
                                        const current_month = String(
                                            currentDate.getMonth() + 1
                                        ).padStart(2, "0");
                                        const current_day = String(currentDate.getDate()).padStart(
                                            2,
                                            "0"
                                        );

                                        const today = `${current_year}-${current_month}-${current_day}`;

                                        return (
                                            <div
                                                key={index}
                                                className={css.storyPill}
                                                style={{
                                                    backgroundColor:
                                                        storyId === story.story_id ? "#341e4d" : "#dbbffd",
                                                    color: storyId === story.story_id ? "#dbbffd" : "#392467",
                                                    animation: `fadeInAndSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${0.5 + index * 0.1
                                                        }s 1 forwards`,
                                                }}
                                                onClick={(e) => {
                                                    setStoryId(story.story_id.toString());
                                                }}
                                            >
                                                <div className={css.storyDetails}>
                                                    <div className={css.storyName}>
                                                        <div>
                                                            <i
                                                                style={{
                                                                    color:
                                                                        storyId === story.story_id
                                                                            ? "white"
                                                                            : "#5D3587",
                                                                }}
                                                                className="fa-solid fa-bookmark"
                                                            ></i>
                                                        </div>
                                                        <p>{story.story_name}</p>
                                                    </div>
                                                    <div className={css.storyHygiene}>
                                                        Hygiene :{" "}
                                                        <span
                                                            style={{
                                                                color:
                                                                    story.story_ac_hygiene === "YES"
                                                                        ? "green"
                                                                        : "red",
                                                            }}
                                                        >
                                                            {story.story_ac_hygiene}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={css.updatedDate}
                                                        style={{
                                                            backgroundColor:
                                                                story.duedate != "Not added"
                                                                    ? new Date(story.duedate) >= new Date(today)
                                                                        ? "#00FF00"
                                                                        : "#FA8072"
                                                                    : "",
                                                        }}
                                                    >
                                                        <div>Due : {story.duedate}</div>
                                                    </div>
                                                    <div className={css.updatedDate}>
                                                        <div>Updated : {formattedDate}</div>
                                                    </div>
                                                    <div className={css.assignedTo}>
                                                        Assigned To : {story.assignee}
                                                    </div>
                                                </div>
                                                <div className={css.statusStorypoints}>
                                                    <div
                                                        style={{
                                                            color: storyId === story.story_id ? "#341e4d" : "#341e4d",
                                                            backgroundColor:
                                                                storyId === story.story_id ? "#dbbffd" : "#e6d3fc",
                                                            fontSize: "2vw",
                                                            padding:"1vw .2vw"
                                                        }}
                                                        className={css.storyStatusLabel}
                                                    >
                                                        {story.story_status}
                                                    </div>
                                                    <div className={css.storyPointsInStoryPane}>
                                                        SP : {story.story_points}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header> <p style={{ color: "#392467", fontWeight: "600", margin: "0" }}>
                        Done ({stories.filter((story) => story.status_name === "Done").length})
                    </p>
                    </Accordion.Header>
                    <Accordion.Body style={{ height: "55vh", overflow: "scroll" }}>
                        {storiesLoading ? (
                            <div className={css.storyLoader}>
                                <Loader />
                            </div>
                        ) : stories.length === 0 ? (
                            <div className={css.storyPaneMessage}>Stories not added</div>
                        ) : (
                            <div className={css.storiesList}>
                                {stories
                                    .sort((a, b) => new Date(a.updated) - new Date(b.updated))
                                    .filter((story) => story.status_name === "Done")
                                    .map((story, index) => {
                                        const last_updated = story.updated;
                                        const dateObject = new Date(last_updated);
                                        const year = dateObject.getFullYear();
                                        const month = dateObject.getMonth() + 1;
                                        const day = dateObject.getDate();
                                        const formattedDate = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month
                                            }-${year}`;

                                        return (
                                            <div
                                                key={index}
                                                className={css.storyPill}
                                                style={{
                                                    backgroundColor:
                                                        storyId === story.story_id ? "#341e4d" : "#dbbffd",
                                                    color: storyId === story.story_id ? "#dbbffd" : "#392467",
                                                    animation: `fadeInAndSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${0.5 + index * 0.1
                                                        }s 1 forwards`,
                                                }}
                                                onClick={(e) => {
                                                    setStoryId(story.story_id.toString());
                                                }}
                                            >
                                                <div className={css.storyDetails}>
                                                    <div className={css.storyName}>
                                                        <div>
                                                            <i
                                                                style={{
                                                                    color:
                                                                        storyId === story.story_id
                                                                            ? "#dbbffd"
                                                                            : "#5D3587",
                                                                }}
                                                                className="fa-solid fa-bookmark"
                                                            ></i>
                                                        </div>
                                                        <p>{story.story_name}</p>
                                                    </div>
                                                    <div className={css.storyHygiene}>
                                                        Hygiene :{" "}
                                                        <span
                                                            style={{
                                                                color:
                                                                    story.story_ac_hygiene === "YES"
                                                                        ? "green"
                                                                        : "red",
                                                            }}
                                                        >
                                                            {story.story_ac_hygiene}
                                                        </span>
                                                    </div>
                                                    <div className={css.updatedDate}>
                                                        <div>Date : {story.duedate}</div>
                                                    </div>
                                                    <div className={css.updatedDate}>
                                                        <div>Updated : {formattedDate}</div>
                                                    </div>
                                                    <div className={css.assignedTo}>
                                                        Assigned To : {story.assignee}
                                                    </div>
                                                </div>
                                                <div className={css.statusStorypoints}>
                                                    <div
                                                        style={{
                                                            color: storyId === story.story_id ? "#341e4d" : "#341e4d",
                                                            backgroundColor:
                                                                storyId === story.story_id ? "#dbbffd" : "#e6d3fc",
                                                        }}
                                                        className={css.storyStatusLabel}
                                                    >
                                                        {story.story_status}
                                                    </div>
                                                    <div className={css.storyPointsInStoryPane}>
                                                        SP : {story.story_points}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <div className={css.storiesInTodo}>
                <div className={css.storyPaneHeader}>
                    To Do ({stories.filter((story) => story.status_name === "To Do").length})
                </div>                
            </div> */}
            {/* <div className={css.storiesInProgress}>
                <div className={css.storyPaneHeader}>
                    In Progress (
                    {
                        stories.filter(
                            (story) =>
                                story.status_name !== "Done" && story.status_name !== "To Do"
                        ).length
                    }
                    )
                </div>
            </div> */}
            {/* <div className={css.storiesInDone}>
                <div className={css.storyPaneHeader}>
                    Done ({stories.filter((story) => story.status_name === "Done").length})
                </div>
            </div> */}
        </section>

    )
}

export default StoriesPaneMobileView