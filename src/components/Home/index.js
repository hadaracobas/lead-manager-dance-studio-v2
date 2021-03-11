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
import LeadsInProgTable from "../LeadsInProgTable";

import Page404 from "../Page404";
import { CircularProgress } from "@material-ui/core";

import { customerData } from "../../pData";

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
      addedDate: null,
      addedHour: null,
      leadSource: null,
      name: null,
      email: null,
      tel: null,
      branch: null,
      lastUpdateDate: null,
      lastUpdateHour: null,
      leadStep: null,
      recommendedSystemMission: null,
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
      LeadPurchasedNote: null,
      ActivityLog2: null,
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "2",
      addedDate: "24/1/2021",
      addedHour: "18:23",
      leadSource: "הגיע למשרד",
      name: "דני אבדיה",
      email: "dani@gmail.co.il",
      tel: "543321321",
      branch: "הדר עם",
      lastUpdateDate: "31/1/2021",
      lastUpdateHour: "10:12",
      leadStep: "הוזמן לשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription: "קבע פגישה - יגיע עם אישתו לראות את המקום",
      manualTypeMission: "קביעת מועד לפגישה",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "01/02/2021",
      manualMissionCreateByTeamMember: "ירדן",
      manualMissionAssociatedToTeamMember: "ירדן",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - נקבעה פגישה",
      ActivityLog3: "",
      ActivityLog4: "",
      ActivityLog5: "",
      ActivityLog6: "",
      ActivityLog7: "",
      ActivityLog8: "",
      ActivityLog9: "",
      ActivityLog10: "",
      ActivityLog11: "",
      ActivityLog12: "",
      DateActivityLog2: "2021-02-01",
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "3",
      addedDate: "28/1/2021",
      addedHour: "19:19",
      leadSource: "טלפוני",
      name: "בני ברוכים",
      email: "dd@cc.com",
      tel: "545342342",
      branch: "הדר עם",
      lastUpdateDate: "31/1/2021",
      lastUpdateHour: "10:11",
      leadStep: "נרשם כמנוי",
      recommendedSystemMission: "",
      manualMissionDescription: "ליצור קשר שוב לבדוק רלוונטיות ",
      manualTypeMission: "לתזכר ליד",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "1/02/2021",
      manualMissionCreateByTeamMember: "אביב",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו והיה מענה - נקבעה פגישה",
      ActivityLog3: "התקשרנו והיה מענה - לא רלוונטי",
      ActivityLog4: "התקשרנו והיה מענה - לא רלוונטי",
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: "1/02/2021",
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "4",
      addedDate: "28/1/2021",
      addedHour: "19:22",
      leadSource: "אתר",
      name: "דן אבירן",
      email: "fdfd.ddf",
      tel: "32432333",
      branch: "הדר עם",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:25",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו ולא היה מענה, לחזור",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "5",
      addedDate: "28/1/2021",
      addedHour: "19:22",
      leadSource: "אתר",
      name: "איציק אליהו",
      email: "כתובת מייל",
      tel: "4343333",
      branch: "הדר עם",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:25",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התקשרנו ומספר לא תקין",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "6",
      addedDate: "28/1/2021",
      addedHour: "19:23",
      leadSource: "",
      name: "רפאל אטיאה",
      email: "aviadkisos@g.com",
      tel: "4343433",
      branch: "הדר עם",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:27",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "נפגשנו - לתאם פגישה שוב",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "7",
      addedDate: "26/1/2021",
      addedHour: "19:23",
      leadSource: "טלפוני",
      name: "ירדן בינימין",
      email: "aviadkisos@g.com",
      tel: "4323333",
      branch: "צורן",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:26",
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "נפגשנו - מתקדם לחוזה",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },

    {
      ID: "8",
      addedDate: "28/1/2020",
      addedHour: "19:23",
      leadSource: "",
      name: "דניאל דניאל",
      email: "aviadkisos@g.com",
      tel: "3242343243",
      branch: "צורן",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:29",
      leadStep: "היה בשיעור ניסיון",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "נפגשנו - כרגע לא מעוניין",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "9",
      addedDate: "21/3/2020",
      addedHour: "19:24",
      leadSource: "",
      name: "ישראל ישראלי",
      email: "aviadkisos@g.com",
      tel: "רק'קק",
      branch: "צורן",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:30",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "TRUE",
      PurchasedAmount: "2000000",
      LeadRate: "10",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "התבצעה רכישה",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "10",
      addedDate: "18/1/2020",
      addedHour: "19:23",
      leadSource: "טלפוני",
      name: "ירדן בינימין",
      email: "aviadkisos@g.com",
      tel: "4323333",
      branch: "צורן",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:26",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "נפגשנו - מתקדם לחוזה",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
    },
    {
      ID: "11",
      addedDate: "28/1/2021",
      addedHour: "19:23",
      leadSource: "טלפוני",
      name: "ירדן בינימין",
      email: "aviadkisos@g.com",
      tel: "4323333",
      branch: "צורן",
      lastUpdateDate: "28/1/2021",
      lastUpdateHour: "19:26",
      leadStep: "מתעניין",
      recommendedSystemMission: "",
      manualMissionDescription: "gggg",
      manualTypeMission: "",
      dateManualMissionCreated: "",
      DeadlineDateManualMission: "",
      manualMissionCreateByTeamMember: "",
      manualMissionAssociatedToTeamMember: "",
      manualMissionPerformed: "",
      DateManualMissionPerformed: "",
      isTheLeadRelevant: "TRUE",
      leadPurchased: "",
      PurchasedAmount: "",
      LeadRate: "",
      LeadCost: "",
      LeadPurchasedNote: "",
      ActivityLog2: "נפגשנו - מתקדם לחוזה",
      ActivityLog3: null,
      ActivityLog4: null,
      ActivityLog5: null,
      ActivityLog6: null,
      ActivityLog7: null,
      ActivityLog8: null,
      ActivityLog9: null,
      ActivityLog10: null,
      ActivityLog11: null,
      ActivityLog12: null,
      DateActivityLog2: null,
      DateActivityLog3: null,
      DateActivityLog4: null,
      DateActivityLog5: null,
      DateActivityLog6: null,
      DateActivityLog7: null,
      DateActivityLog8: null,
      DateActivityLog9: null,
      DateActivityLog10: null,
      DateActivityLog11: null,
      DateActivityLog12: null,
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
  /*useEffect(() => {
    getDataFromSheet();
  }, [props.relCrudApiUrl]);*/
  //console.log("data from sheet: ", data);

  return (
    <>
      {/* <CircularProgress color="secondary" /> */}
      <div className="home">
        <Switch>
          <Route exact path="/">
            {exampleData ? (
              <GeneralLeadsList
                data={exampleData}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/active-subscribers">
            {exampleData ? (
              <ActiveSubscribers
                data={exampleData}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/manual-missions">
            {exampleData ? (
              <ManualMissions data={exampleData} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/statistics">
            {exampleData ? (
              <Statistics
                data={exampleData}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/add-new-lead">
            {exampleData ? (
              <AddNewLead
                relCrudApiUrl={props.relCrudApiUrl}
                data={exampleData}
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/search-lead">
            {exampleData ? (
              <SearchLead
                data={exampleData}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/my-account">
            {exampleData ? (
              <Account
                user={props.user}
                data={exampleData}
                relCustomerDataObj={props.relCustomerDataObj}
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/settings">
            {exampleData ? (
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

          <Route path="/leads-in-progress-table">
            <LeadsInProgTable
              data={exampleData}
              relCustomerDataObj={props.relCustomerDataObj}
            />
          </Route>

          <Route path="/:id">
            {exampleData ? (
              <LeadFullDisplay1
                data={exampleData}
                relCrudApiUrl={props.relCrudApiUrl}
                relBranchesAccordingToAccount={
                  props.relBranchesAccordingToAccount
                }
                relCustomerDataObj={props.relCustomerDataObj}
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
