import React from "react";
import "./index.scss";

function Settings(props) {
  console.log("settings component: ", props.relBranchesAccordingToAccount);
  return (
    <div className="settings">
      <h2>this is setting component</h2>
    </div>
  );
}

export default Settings;
