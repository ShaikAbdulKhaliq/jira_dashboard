import React from "react";

function OnTimePredictability({ otp, sprintStart, sprintEnd }) {
  return (
    <div className="story-ac-card grid-item grid-item-6">
      <div className="header">On-Time Predictability</div>
      <table>
        <tr>
          <td>Total Subtasks</td>
          <td>{otp.number_of_sub_tasks}</td>
        </tr>
        <tr>
          <td>Completed Subtasks</td>
          <td>{otp.completed_sub_tasks}</td>
        </tr>
        <tr>
          <td>Sprint Start</td>
          <td>{sprintStart.substring(0, 10)}</td>
        </tr>
        <tr>
          <td>Sprint End</td>
          <td>{sprintEnd.substring(0, 10)}</td>
        </tr>
      </table>
    </div>
  );
}

export default OnTimePredictability;
