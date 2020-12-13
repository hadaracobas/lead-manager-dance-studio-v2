import React, { useState, useEffect } from "react";
import "./index.scss";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// import components
import AddNewLead from "../AddNewLead";
import SearchLead from "../SearchLead";

function Home() {
  const [data, setData] = useState(false);
  const [exampleData, setExampleData] = useState([
    {
      ID: "1",
      addedDate: "13/07/2020",
      addedHour: "13:04:00",
      leadSource: "כללי",
      name: "רונן כהן",
      email: "ronen@gmail.com",
      tel: "052-88542036",
      age: "ג",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpadateDate: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "FALSE",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "FALSE",
      leadPurchased: "TRUE",
      PurchasedAmount: "₪2,000.00",
      LeadRate: "8",
      LeadCost: "₪60.00",
      event1Interest: "התקשרנו ללא מענה",
      dateEvent1: "29/5/2020",
      statusEvent1: "קנה",
      event2WasTrialLesson: "הגיע לשיעור ניסיון",
      dateEvent2: "29/5/2020",
      statusEvent2: "קנה",
    },
    {
      ID: "2",
      addedDate: "24/11/2020",
      addedHour: "13:04:00",
      leadSource: "ליד טלפוני",
      name: "מיכל לוי",
      email: "michal@gmail.com",
      tel: "052-99650402",
      age: "4",
      releventBranch: "צורן",
      relevantDanceType: "מודרני",
      lastUpadateDate: "",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "FALSE",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "FALSE",
      leadPurchased: "FALSE",
      PurchasedAmount: "",
      LeadRate: "5",
      LeadCost: "₪100.00",
      event1Interest: "התקשרנו ולא רלוונטי",
      dateEvent1: "20/2/2021",
      statusEvent1: "מחכה לתיאום פגישה",
      event2WasTrialLesson: "הגיע לשיעור ניסיון",
      dateEvent2: "20/2/2021",
      statusEvent2: "מחכה לתיאום פגישה",
    },
    {
      ID: "3",
      addedDate: "24/06/2020",
      addedHour: "13:04:00",
      leadSource: "ליד טלפוני",
      name: "קים זינגר",
      email: "kim_zin@hotmail.com",
      tel: "050-65893654",
      age: "ד",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpadateDate: "",
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "FALSE",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "FALSE",
      leadPurchased: "TRUE",
      PurchasedAmount: "₪369.00",
      LeadRate: "8",
      LeadCost: "₪60.00",
      event1Interest: "התקשרנו ונקבע שיעור ניסיון",
      dateEvent1: "2/1/2020",
      statusEvent1: "חושב",
      event2WasTrialLesson: "הגיע לשיעור ניסיון מחכה לרישום",
      dateEvent2: "2/1/2020",
      statusEvent2: "קנה",
    },
    {
      ID: "4",
      addedDate: "22/11/2020",
      addedHour: "13:04:00",
      leadSource: "דף נחיתה",
      name: "נמרוד שטיין",
      email: "nimrod@gmail.com",
      tel: "054-66892045",
      age: "י",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpadateDate: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "FALSE",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "FALSE",
      leadPurchased: "FALSE",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "₪45.00",
      event1Interest: "התקשרנו ללא מענה",
      dateEvent1: "25/6/2020",
      statusEvent1: "חושב",
      event2WasTrialLesson: "הגיע לשיעור ניסיון - לא רלוונטי",
      dateEvent2: "25/6/2020",
      statusEvent2: "מתעניין",
    },
  ]);

  const getDataFromSheet = async () => {
    const dataSheet = await axios
      .get("https://sheet.best/api/sheets/6c613560-926d-4171-8892-5ba0bae57c44")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // disable to save cost of request during work
  /*
  useEffect(() => {
    getDataFromSheet();
  }, []);
*/
  return (
    <>
      {/*
        <div className="home">
      <div className="home__1 home__box">
        <h2 className="home__box--title">מתעניינים</h2>
        <p className="home__box--totalNum">סה"כ: 256</p>
        <LeadSmallDisplay />
        <LeadSmallDisplay />
      </div>
      <div className="home__2 home__box">
        <h2 className="home__box--title">הוזמנו לשיעור ניסיון</h2>
        <p className="home__box--totalNum">סה"כ: 256</p>
        <LeadSmallDisplay />
        <LeadSmallDisplay />
      </div>
      <div className="home__3 home__box">
        <h2 className="home__box--title">היו בשיעור ניסיון</h2>
        <p className="home__box--totalNum">סה"כ: 256</p>
        <LeadSmallDisplay />
        <LeadSmallDisplay />
      </div>
      <div className="home__4 home__box">
        <h2 className="home__box--title">משימות קרובות</h2> 
        <p className="home__box--totalNum">סה"כ: 256</p>
        <LeadSmallDisplay />
        <LeadSmallDisplay />
      </div>
    </div>
    */}
      <div className="home">
        <Switch>
          <Route path="/add-new-lead">
            <AddNewLead />
          </Route>
          <Route path="/search-lead">
            <SearchLead />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Home;
