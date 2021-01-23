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
      addedDate: null,
      addedHour: null,
      leadSource: null,
      name: null,
      email: null,
      tel: null,
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
      addedDate: "17/1/2021",
      addedHour: "16:15",
      leadSource: "הגיע למשרד",
      name: "שלום כהן",
      email: "shalom@gmail.com",
      tel: "054-9983232",
      lastUpdateDate: "23/1/2021",
      lastUpdateHour: "13:43",
      leadStep: "מתעניין",
      recommendedSystemMission: "לתזכר פגישה",
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
      ActivityLog2: "",
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
      DateActivityLog2: "",
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
              <GeneralLeadsList data={exampleData} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/active-subscribers">
            {exampleData ? (
              <ActiveSubscribers data={exampleData} />
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
              <Statistics data={exampleData} />
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
              />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/search-lead">
            {exampleData ? (
              <SearchLead data={exampleData} />
            ) : (
              <CircularProgress color="secondary" />
            )}
          </Route>
          <Route path="/my-account">
            {exampleData ? (
              <Account user={props.user} data={exampleData} />
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

          <Route path="/:id">
            {exampleData ? (
              <LeadFullDisplay1
                data={exampleData}
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
