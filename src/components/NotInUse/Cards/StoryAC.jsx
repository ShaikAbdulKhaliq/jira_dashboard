import React, { useState } from "react";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";
import "../../styles/storyAcHygiene.css";

function StoryAC({ storyAC }) {
  const [click_info, setClick_info] = useState(false);
  const show_info = () => {
    setClick_info(!click_info);
  };
  return (
    <div className="story-ac-card grid-item grid-item-3">
      {/*  */}
      <div className="header">
        Story AC Hygiene{" "}
        <span
          className="ac_info_btn"
          onClick={show_info}
          onMouseEnter={() =>{setClick_info(true)}}
          onMouseLeave={() => setClick_info(false)}
        >
          {!click_info ? <BsInfoCircle /> : <BsInfoCircleFill />}
        </span>
        {click_info ? (
          <span className="ac_info">
            Acceptance criteria clarifies the expected outcome of a user story
            in a concrete manner.{" "}
          </span>
        ) : null}
      </div>
      <table>
        <tr>
          <td>AC Added ?</td>
          <td>{storyAC}</td>
        </tr>
      </table>
    </div>
  );
}

export default StoryAC;
