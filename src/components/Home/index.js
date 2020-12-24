import React, { useState, useEffect } from "react";
import "./index.scss";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// import components
import AddNewLead from "../AddNewLead";
import SearchLead from "../SearchLead";
import LeadFullDisplay from "../LeadFullDisplay";
import LeadFullDisplay1 from "../LeadFullDisplay1";

function Home() {
  const [data, setData] = useState(false);
  const [exampleData, setExampleData] = useState([
    {
      ID: "1",
      addedDate: "13/12/2020",
      addedHour: "15:9",
      leadSource: "טלפוני",
      name: "הדר אקובס",
      email: "hadarsites1@gmail.com",
      tel: "054-889756365",
      age: "ב",
      releventBranch: "הדר עם, צורן",
      relevantDanceType: "היפ הופ,מודרני,בלט",
      lastUpdateDate: "24/12/2020",
      lastUpdateHour: "16:33",
      leadStep: "מתעניין",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "2",
      addedDate: "13/12/2020",
      addedHour: "15:12",
      leadSource: "אתר",
      name: "julia piringer  levi acobas",
      email: "julia@gmail.com",
      tel: "547896985",
      age: "5",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ,מודרני",
      lastUpdateDate: "13/12/2020",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "לקבוע מועד שיעור ניסיון",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "3",
      addedDate: "13/12/2020",
      addedHour: "15:14",
      leadSource: "אחר",
      name: "רונן שלורנטיין 2",
      email: "ronen@gmail.com",
      tel: "5475545",
      age: "ב",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ,בלט",
      lastUpdateDate: "13/12/2020",
      lastUpdateHour: "",
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "4",
      addedDate: "18/12/2020",
      addedHour: "15:33",
      leadSource: "אתר",
      name: "יורם ארבל",
      email: "yoramarbel@gmail.com",
      tel: "0544-8973656",
      age: "ה",
      releventBranch: "צורן",
      relevantDanceType: "היפ הופ,מודרני",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "לקבוע מועד שיעור ניסיון",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "5",
      addedDate: "18/12/2020",
      addedHour: "15:34",
      leadSource: "טלפוני",
      name: "יואב מיכאלי",
      email: "yoav@gmail.com",
      tel: "05-8976363",
      age: "י",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ,בלט",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "לתזכר שיעור ניסיון",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "6",
      addedDate: "18/12/2020",
      addedHour: "15:37",
      leadSource: "טלפוני",
      name: "יוליה סלב",
      email: "juliagmail.com",
      tel: "052-9836446",
      age: "ג",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "לתזכר שיעור ניסיון",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "7",
      addedDate: "18/12/2020",
      addedHour: "16:13",
      leadSource: "אתר",
      name: "קובי ששון",
      email: "cobi.sason@gmail.com",
      tel: "054-9986363",
      age: "ז",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: null,
      LeadRate: null,
      LeadCost: null,
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
  ]);

  const getDataFromSheet = () => {
    const dataSheet = axios
      .get("https://sheet.best/api/sheets/6c613560-926d-4171-8892-5ba0bae57c44")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // disable to save cost of request during work

  /*useEffect(() => {
    getDataFromSheet();
  }, []);*/
  //console.log("data from sheet: ", data);
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
            <AddNewLead data={exampleData} />
          </Route>
          <Route path="/search-lead">
            <SearchLead data={exampleData} />
          </Route>
          <Route path="/:id">
            <LeadFullDisplay1 data={exampleData} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Home;
