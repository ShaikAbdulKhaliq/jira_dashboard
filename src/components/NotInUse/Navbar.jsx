import React, { useEffect, useState } from "react";
// import horz_data from "../data/horz_chart";
import axios from "axios";
import Loader from "./Loader";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import "./navbar.css";

let sprint_data_map = {};
const live_base_url = import.meta.env.VITE_live_base_url;

function Navbar({
  sprint,
  setSprint,
  setSprintStart,
  setSprintEnd,
  setView,
  boardId,
  boardName,
  stories,
  member,
  // totalStoryPoints,
}) {
  const [options, setOptions] = useState([]);
  const [sprintsLoading, setSprintsLoading] = useState(false);

  //story_status
  // story_points

  if (member !== "All Members") {
    stories = stories.filter((story) => story.assignee == member);
  }
  const calculateStoryPoints = (story_status) => {
    const filteredTasks = stories.filter(
      (story) => story.story_status === story_status
    );
    const totalStoryPoints = filteredTasks.reduce(
      (sum, story) => sum + story.story_points,
      0
    );
    return totalStoryPoints;
  };

  const totalStoryPoints = stories.reduce(
    (sum, story) => sum + story.story_points,
    0
  );

  // if()
  const todoStoryPoints = calculateStoryPoints("To Do");
  const inProgressStoryPoints = calculateStoryPoints("In Progress");
  const doneStoryPoints = calculateStoryPoints("Done");

  const toDo_percentage = parseInt((todoStoryPoints / totalStoryPoints) * 100);
  const in_progress_percentage = parseInt(
    (inProgressStoryPoints / totalStoryPoints) * 100
  );
  const done_percentage = parseInt((doneStoryPoints / totalStoryPoints) * 100);

  async function getSprints() {
    setSprintsLoading(true);
    const response = await axios.get(
      live_base_url + "/" + boardId + "/allSprints"
    );
    const all_sprints = response.data.filter(
      (sprint) => sprint.state !== "future"
    );
    for (let sprint of all_sprints) {
      sprint_data_map[sprint.id.toString()] = {
        sprint_start: sprint.startDate.substring(0, 10),
        sprint_end: sprint.endDate.substring(0, 10),
      };
    }
    let default_sprint;
    const active_sprint = all_sprints.filter(
      (sprint) => sprint.state === "active"
    );
    if (active_sprint.length === 0) {
      let closed_sprints = all_sprints.filter(
        (sprint) => sprint.state === "closed"
      );
      default_sprint = closed_sprints[closed_sprints.length - 1];
    } else {
      default_sprint = active_sprint[0];
    }
    setSprint(default_sprint.id.toString());
    setSprintStart(sprint_data_map[default_sprint.id.toString()].sprint_start);
    setSprintEnd(sprint_data_map[default_sprint.id.toString()].sprint_end);
    setOptions(all_sprints);
    setSprintsLoading(false);
  }

  useEffect(() => {
    getSprints();
  }, []);
  return (
    <nav className="custom-navbar">
      <div className="dashboard-name">
        {boardName} - SPRINT REVIEW DASHBOARD
      </div>
      <div className="sprint-select-container">
        <div id="selector">
          <div>Sprints</div>
          {sprintsLoading ? (
            <Loader />
          ) : (
            <select
              name="sprints"
              id="sprints"
              onChange={(e) => {
                setSprint(e.target.value.toString());
                setSprintStart(
                  sprint_data_map[e.target.value.toString()].sprint_start
                );
                setSprintEnd(
                  sprint_data_map[e.target.value.toString()].sprint_end
                );
              }}
            >
              {options.map((opt, index) => {
                return (
                  <option
                    key={index}
                    selected={opt.id.toString() === sprint}
                    value={opt.id}
                  >
                    <div>{opt.state.toUpperCase()}</div>
                    {" - "}
                    <div>{opt.name}</div>
                  </option>
                );
              })}
            </select>
          )}
          {/* <div className="total_story_points">
            Total Storypoints : {totalStoryPoints}
          </div> */}
          <div className="total_story_points">
            Total Storypoints : {totalStoryPoints}
          </div>
          <div className="To Do">
            To Do : {todoStoryPoints} ({toDo_percentage}%)
          </div>
          <div className="In Progress">
            In Progress : {inProgressStoryPoints} ({in_progress_percentage}%)
          </div>
          <div className="Done">
            Done : {doneStoryPoints} ({done_percentage}%)
          </div>
        </div>
        <div className="buttons-cont">
          <Link to={"/daily-status"}>
            <button className="btn btn-primary">Daily Status</button>
          </Link>
          <Link to={"/"}>
            <button
              className="btn btn-danger"
              onClick={() => {
                setView("landing");
              }}
            >
              go back
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
