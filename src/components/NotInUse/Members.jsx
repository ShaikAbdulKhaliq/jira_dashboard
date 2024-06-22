import React, { useState, useEffect } from "react";
import "../styles/Members.css";

function Members({ sprintMembers, filterStoriesByMember }) {
  const [selectedMember, setSelectedMember] = useState();

  const handleMemberClick = (memberName) => {
    filterStoriesByMember(memberName);
    setSelectedMember(memberName);
  };

  console.log("Rendering Members component");

  return (
    <div className="members-container">
      {sprintMembers.map((member, index) => (
        <div
          key={index}
          className="member"
          onClick={() => handleMemberClick(member.sprint_member_full_name)}
        >
          {member.sprint_member_full_name}
        </div>
      ))}
    </div>
  );
}

export default Members;
