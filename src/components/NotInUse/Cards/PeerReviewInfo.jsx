import React from "react";

function PeerReviewInfo({ storyReviewers }) {
  return (
    <div className="story-ac-card grid-item grid-item-5">
      <div className="header">Peer review info</div>
      <table>
        <tr>
          <td>Reviewers</td>
          <td>{storyReviewers}</td>
        </tr>
      </table>
    </div>
  );
}

export default PeerReviewInfo;
