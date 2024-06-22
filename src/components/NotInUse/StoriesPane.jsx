import React, { useState } from "react";
import "../styles/StoriesPane.css";
import Loader from "./Loader";

function StoriesPane({
  stories,
  setStoryId,
  storiesLoading,
  storyId,
  storyPoints,
  member,
  // storyAC,
  storyPointsData,
}) {
  if (member !== "All Members") {
    console.log("members", member);
    stories = stories.filter((story) => story.assignee == member);
  }
  // console.log(stories, "stories......");
  return (
    <section id="left-pane">
      <div className="stories-in-todo">
        <div className="story-pane-header">
          To Do (
          {stories.filter((story) => story.status_name === "To Do").length})
        </div>

        {storiesLoading ? (
          <div className="story-loader">
            <Loader />
          </div>
        ) : stories.length === 0 ? (
          <div className="story-pane-message">Stories not added</div>
        ) : (
          <div className="stories-list">
            {stories
              .sort((a, b) => new Date(a.updated) - new Date(b.updated))
              .filter((story) => story.status_name === "To Do")
              .map((story, index) => {
                const last_updated = story.updated;
                // console.log(typeof last_updated, "last_updated");
                const dateObject = new Date(last_updated);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const day = dateObject.getDate();
                const hours = dateObject.getHours();
                const minutes = dateObject.getMinutes();
                const seconds = dateObject.getSeconds();
                const formattedDate = `${day < 10 ? "0" + day : day}-${
                  month < 10 ? "0" + month : month
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
                    className="story-pill"
                    style={{
                      backgroundColor:
                        storyId === story.story_id ? "#36b37e" : "white",
                      color: storyId === story.story_id ? "white" : "black",
                      animation: `fadeInAndSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${
                        0.5 + index * 0.1
                      }s 1 forwards`,
                    }}
                    onClick={(e) => {
                      setStoryId(story.story_id.toString());
                    }}
                  >
                    <div className="story-details">
                      <div className="story-name">
                        <div>
                          <i
                            style={{
                              color:
                                storyId === story.story_id
                                  ? "white"
                                  : "#36b37e",
                            }}
                            className="fa-solid fa-bookmark"
                          ></i>
                        </div>
                        {story.story_name}
                      </div>
                      <div className="story-hygiene">
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
                        className="Updated-date"
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
                      <div className="Updated-date">
                        <div>Updated : {formattedDate}</div>
                      </div>
                      <div className="assigned-to">
                        Assigned To : {story.assignee}
                      </div>
                    </div>
                    <div className="status-storypoints">
                      <div
                        style={{
                          color: storyId === story.story_id ? "black" : "white",
                          backgroundColor:
                            storyId === story.story_id ? "white" : "#4285f4",
                        }}
                        className="story-status-label"
                      >
                        {story.story_status}
                      </div>
                      <div className="story-points-in-story-pane">
                        SP : {story.story_points}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="stories-in-inprogress">
        <div className="story-pane-header">
          In Progress (
          {
            stories.filter(
              (story) =>
                story.status_name !== "Done" && story.status_name !== "To Do"
            ).length
          }
          )
        </div>

        {storiesLoading ? (
          <div className="story-loader">
            <Loader />
          </div>
        ) : stories.length === 0 ? (
          <div className="story-pane-message">Stories not added</div>
        ) : (
          <div className="stories-list">
            {stories
              .sort((a, b) => new Date(a.updated) - new Date(b.updated))
              .filter(
                (story) =>
                  story.status_name !== "Done" && story.status_name !== "To Do"
              )
              .map((story, index) => {
                const last_updated = story.updated;
                // console.log(typeof last_updated, "last_updated");
                const dateObject = new Date(last_updated);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const day = dateObject.getDate();
                const formattedDate = `${day < 10 ? "0" + day : day}-${
                  month < 10 ? "0" + month : month
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

                // console.log(story.duedate, typeof story.duedate, "duedate");
                // console.log(new Date(), typeof new Date(), "Newdate");
                // console.log(today, typeof today);

                return (
                  <div
                    key={index}
                    className="story-pill"
                    style={{
                      backgroundColor:
                        storyId === story.story_id ? "#36b37e" : "white",
                      color: storyId === story.story_id ? "white" : "black",
                      animation: `fadeInAndSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${
                        0.5 + index * 0.1
                      }s 1 forwards`,
                    }}
                    onClick={(e) => {
                      setStoryId(story.story_id.toString());
                    }}
                  >
                    <div className="story-details">
                      <div className="story-name">
                        <div>
                          <i
                            style={{
                              color:
                                storyId === story.story_id
                                  ? "white"
                                  : "#36b37e",
                            }}
                            className="fa-solid fa-bookmark"
                          ></i>
                        </div>
                        {story.story_name}
                      </div>
                      <div className="story-hygiene">
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
                        className="Updated-date"
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
                      <div className="Updated-date">
                        <div>Updated : {formattedDate}</div>
                      </div>
                      <div className="assigned-to">
                        Assigned To : {story.assignee}
                      </div>
                    </div>
                    <div className="status-storypoints">
                      <div
                        style={{
                          color: storyId === story.story_id ? "black" : "white",
                          backgroundColor:
                            storyId === story.story_id ? "white" : "#4285f4",
                        }}
                        className="story-status-label"
                      >
                        {story.story_status}
                      </div>
                      <div className="story-points-in-story-pane">
                        SP : {story.story_points}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <div className="stories-in-done">
        <div className="story-pane-header">
          Done ({stories.filter((story) => story.status_name === "Done").length}
          )
        </div>

        {storiesLoading ? (
          <div className="story-loader">
            <Loader />
          </div>
        ) : stories.length === 0 ? (
          <div className="story-pane-message">Stories not added</div>
        ) : (
          <div className="stories-list">
            {stories
              .sort((a, b) => new Date(a.updated) - new Date(b.updated))
              .filter((story) => story.status_name === "Done")
              .map((story, index) => {
                // console.log(stories, "$$$$$$$$$$$$$$$$$$$$__________________$$$$$$$$$$$$$$$$$");
                const last_updated = story.updated;
                // console.log(typeof last_updated, "last_updated");
                const dateObject = new Date(last_updated);
                const year = dateObject.getFullYear();
                const month = dateObject.getMonth() + 1;
                const day = dateObject.getDate();
                const formattedDate = `${day < 10 ? "0" + day : day}-${
                  month < 10 ? "0" + month : month
                }-${year}`;

                return (
                  <div
                    key={index}
                    className="story-pill"
                    style={{
                      backgroundColor:
                        storyId === story.story_id ? "#36b37e" : "white",
                      color: storyId === story.story_id ? "white" : "black",
                      animation: `fadeInAndSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) ${
                        0.5 + index * 0.1
                      }s 1 forwards`,
                    }}
                    onClick={(e) => {
                      setStoryId(story.story_id.toString());
                    }}
                  >
                    <div className="story-details">
                      <div className="story-name">
                        <div>
                          <i
                            style={{
                              color:
                                storyId === story.story_id
                                  ? "white"
                                  : "#36b37e",
                            }}
                            className="fa-solid fa-bookmark"
                          ></i>
                        </div>
                        {story.story_name}
                      </div>
                      <div className="story-hygiene">
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
                      <div className="Updated-date">
                        <div>Date : {story.duedate}</div>
                      </div>
                      <div className="Updated-date">
                        <div>Updated : {formattedDate}</div>
                      </div>
                      <div className="assigned-to">
                        Assigned To : {story.assignee}
                      </div>
                    </div>
                    <div className="status-storypoints">
                      <div
                        style={{
                          color: storyId === story.story_id ? "black" : "white",
                          backgroundColor:
                            storyId === story.story_id ? "white" : "#4285f4",
                        }}
                        className="story-status-label"
                      >
                        {story.story_status}
                      </div>
                      <div className="story-points-in-story-pane">
                        SP : {story.story_points}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}

export default StoriesPane;
