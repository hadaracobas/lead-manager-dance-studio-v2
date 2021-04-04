import React from "react";
import "./index.scss";

import MainSvg1 from "../../img/main-svg-1.svg";

import Button from "@material-ui/core/Button";

function LandingPage() {
  return (
    <div className="landing-page">
      <h2 className="landing-page__title">
        הדרך הטובה והיעילה ביותר לקבל לידים
      </h2>
      <p className="landing-page__subtitle">
        לעסקים שהמכירה מתבצעת אונליין יש דרך מוצלחת לשפר ולמקד את קהל היעד,
        בעזרת פייסבוק פיקסל. אבל אם המכירה שלך ללקוחות מתבצעת אופליין, אנחנו
        הפתרון שלך.
      </p>
      <div className="landing-page__btnsContainer">
        <Button
          variant="contained"
          color="primary"
          className="landing-page__btn"
        >
          התחבר
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="landing-page__btn"
        >
          חודש ניסיון חינם
        </Button>
      </div>

      <div className="landing-page__main-img-container">
        <img
          src={MainSvg1}
          alt="main image"
          className="landing-page__main-img"
        />
      </div>
    </div>
  );
}

export default LandingPage;
