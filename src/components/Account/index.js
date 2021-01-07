import React from "react";
import "./index.scss";

function Account(props) {
  console.log(props.user);
  return (
    <div className="account">
      <h2 className="account__title">החשבון שלי</h2>
      <div className="account__details">
        <div className="account__details--img">
          <img src={props.user.picture} />
        </div>
        <p>שם חשבון: {props.user.name}</p>
        <p>אימייל חשבון: {props.user.email}</p>
        <p>אימייל אומת: {props.user.email_verified ? "כן" : "לא"}</p>
        <p>כינוי: {props.user.nickname}</p>
      </div>
    </div>
  );
}

export default Account;
