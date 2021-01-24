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
      ID: "2",
      addedDate: "24/1/2021",
      addedHour: "16:15",
      leadSource: "הגיע למשרד",
      name: "שלום כהן",
      email: "shalom@gmail.com",
      tel: "054-9983232",
      lastUpdateDate: "24/1/2021",
      lastUpdateHour: "10:26",
      leadStep: "היה בפגישה",
      recommendedSystemMission: "לתזכר פגישה",
      manualMissionDescription: "ccc",
      manualTypeMission: null,
      dateManualMissionCreated: null,
      DeadlineDateManualMission: "26/01/2021",
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
      ID: "3",
      addedDate: "24/1/2020",
      addedHour: "12:23",
      leadSource: "אתר",
      name: "רוני אלבז",
      email: "roni@gmail.com",
      tel: "054-9963789",
      lastUpdateDate: "",
      lastUpdateHour: "",
      leadStep: "רכש",
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
  //console.log("data from sheet: ", data);

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
