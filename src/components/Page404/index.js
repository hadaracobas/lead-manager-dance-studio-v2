import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

function Page404() {
  return (
    <div className="page404">
      <h2 className="page404__title">404</h2>
      <SentimentDissatisfiedIcon style={{ fontSize: "3rem" }} />
      <p className="page404__desc">
        שגיאה, הליד או העמוד שאתה מחפש לא נמצאים במערכת.
      </p>
      <div className="page404__btns">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            חזור לעמוד הלידים
          </Button>
        </Link>

        <Link to="/search-lead" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            חיפוש ליד חדש
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Page404;
