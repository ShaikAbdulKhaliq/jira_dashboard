import React from "react";

function TimeLogInfo({ timeLogData }) {
  return (
    <div className="story-ac-card grid-item grid-item-7">
      <div className="header">Time log info</div>
      <table>
        <tr>
          <td>Original Estimate</td>
          <td>{timeLogData.original_estimate}</td>
        </tr>
        <tr>
          <td>Remaining Estimate</td>
          <td>{timeLogData.remaining_estimate}</td>
        </tr>
        <tr>
          <td>Time spent</td>
          <td>{timeLogData.time_spent}</td>
        </tr>
      </table>
    </div>
  );
}

export default TimeLogInfo;
