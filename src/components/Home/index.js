import React, { useState, useEffect } from "react";
import "./index.scss";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// import components
import AddNewLead from "../AddNewLead";
import SearchLead from "../SearchLead";
import LeadFullDisplay from "../LeadFullDisplay";
import LeadFullDisplay1 from "../LeadFullDisplay1";
import GeneralLeadsList from "../GeneralLeadsList";
import ActiveSubscribers from "../ActiveSubscribers";
import ManualMissions from "../ManualMissions";
import Statistics from "../Statistics";
import LogInPage from "../LogInPage";
import Header from "../Header";
import Account from "../Account";
import Settings from "../Settings";

import Page404 from "../Page404";
import { CircularProgress } from "@material-ui/core";

/*const useStylesLoading = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));*/

function Home(props) {
  const [data, setData] = useState(false);

  const [exampleData, setExampleData] = useState([
    {
      ID: "1",
      addedDate: "26/3/2020",
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
      manualMissionDescription: "להתקשר בשבוע הבא על מנת לקחת פרטי כרטיס אשראי",
      manualTypeMission: "תזכורת",
      dateManualMissionCreated: "18/12/2020",
      DeadlineDateManualMission: "29/12/2020",
      manualMissionCreateByTeamMember: "רועי כהן",
      manualMissionAssociatedToTeamMember: "לירון לוי",
      manualMissionPerformed: "TRUE",
      DateManualMissionPerformed: "27/6/2020",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "TRUE",
      PurchasedAmount: "2200",
      LeadRate: "10",
      LeadCost: "44",
      event1Interest: "התקשרנו ונקבע שיעור ניסיון",
      dateEvent1: "2020-05-24",
      statusEvent1: "קנה",
      event2WasTrialLesson: "הגיע לשיעור ניסיון",
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "2",
      addedDate: "29/1/2020",
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
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "לקבוע מועד שיעור ניסיון",
      manualMissionDescription: " משימה לדוגמא תיאור משימה לדוגמא תיאור",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "31/12/2020",
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: "TRUE",
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: "223",
      LeadRate: null,
      LeadCost: "44",
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "3",
      addedDate: "23/1/2020",
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
      manualMissionDescription: "להתקשר פעם נוספת בשבוע הבא",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "1/1/2021",
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
      addedDate: "28/9/2020",
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
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "לקבוע מועד שיעור ניסיון",
      manualMissionDescription:
        "להתקשר שוב פעם מחר בערב על מנת לקבל פרטי כרטיס אשראי",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "4/1/2021",
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
      addedDate: "18/1/2020",
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
      manualMissionDescription: "להתקשר שוב שבוע הבא - מקבל תשלום בשיקים",
      manualTypeMission: null,
      dateManualMissionCreated: "18/12/2020",
      DeadlineDateManualMission: "2/1/2021",
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
      addedDate: "18/1/2020",
      addedHour: "15:37",
      leadSource: "אחר",
      name: "יוליה סלב",
      email: "juliagmail.com",
      tel: "052-9836446",
      age: "ג",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "לתזכר שיעור ניסיון",
      manualMissionDescription: "להתקשר פעם נוספת בעוד יומיים",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "30/12/2020",
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
      leadSource: "טלפוני",
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
      manualMissionDescription: "להתקשר שוב שבוע הבא",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "29/12/2020",
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: "TRUE",
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
      ID: "8",
      addedDate: "31/12/2019",
      addedHour: "16:13",
      leadSource: "אתר",
      name: "עמית לוי",
      email: "cobi.sason@gmail.com",
      tel: "054-9986363",
      age: "ז",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "נרשם כמנוי",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: "משימה לדוגמא",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "18/2/2021",
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: null,
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: "250",
      LeadRate: null,
      LeadCost: "80",
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "9",
      addedDate: "18/12/2020",
      addedHour: "16:13",
      leadSource: "אתר",
      name: "יואב שמולי",
      email: "cobi.sason@gmail.com",
      tel: "054-9986363",
      age: "ז",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: "TRUE",
      DateManualMissionPerformed: null,
      isTheLeadRelevant: "TRUE",
      leadPurchased: null,
      PurchasedAmount: "340",
      LeadRate: null,
      LeadCost: "60",
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "10",
      addedDate: "31/12/2020",
      addedHour: "16:13",
      leadSource: "אתר",
      name: "1יואב שמולי",
      email: "cobi.sason@gmail.com",
      tel: "054-9986363",
      age: "ז",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "30/12/2020",
      lastUpdateHour: "",
      leadStep: "מתעניין",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: "TRUE",
      DateManualMissionPerformed: null,
      isTheLeadRelevant: "TRUE",
      leadPurchased: null,
      PurchasedAmount: "340",
      LeadRate: null,
      LeadCost: "60",
      event1Interest: null,
      dateEvent1: null,
      statusEvent1: null,
      event2WasTrialLesson: null,
      dateEvent2: null,
      statusEvent2: null,
    },
    {
      ID: "11",
      addedDate: "1/1/2021",
      addedHour: "16:13",
      leadSource: "אתר",
      name: null,
      email: "cobi.sason@gmail.com",
      tel: null,
      age: "ז",
      releventBranch: "הדר עם",
      relevantDanceType: "היפ הופ",
      lastUpdateDate: "18/12/2020",
      lastUpdateHour: "",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "לרשום כמנוי קבוע",
      manualMissionDescription: null,
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: null,
      manualMissionCreateByTeamMember: null,
      manualMissionAssociatedToTeamMember: null,
      manualMissionPerformed: "TRUE",
      DateManualMissionPerformed: null,
      isTheLeadRelevant: null,
      leadPurchased: null,
      PurchasedAmount: "340",
      LeadRate: null,
      LeadCost: "60",
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
      .get(props.relCrudApiUrl && props.relCrudApiUrl)
      .then((res) => {
        setData(res.data.filter((lead) => lead.ID != "1"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // disable to save cost of request during work
  useEffect(() => {
    getDataFromSheet();
  }, [props.relCrudApiUrl]);
  console.log("data from sheet: ", data);

  return (
    <>
      {/* <CircularProgress color="secondary" /> */}
      <div className="home">
        <Switch>
          <Route exact path="/">
            {data ? (
              <GeneralLeadsList data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/active-subscribers">
            {data ? (
              <ActiveSubscribers data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/manual-missions">
            {data ? (
              <ManualMissions data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/statistics">
            {data ? (
              <Statistics data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/add-new-lead">
            {data ? (
              <AddNewLead
                relCrudApiUrl={props.relCrudApiUrl}
                data={data}
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/search-lead">
            {data ? (
              <SearchLead data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/my-account">
            {data ? (
              <Account user={props.user} data={data} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/settings">
            {data ? (
              <Settings
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/error-page-404">
            <Page404 />
          </Route>

          <Route path="/login">
            <LogInPage />
          </Route>

          <Route path="/:id">
            {data ? (
              <LeadFullDisplay1
                data={data}
                relCrudApiUrl={props.relCrudApiUrl}
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Home;
