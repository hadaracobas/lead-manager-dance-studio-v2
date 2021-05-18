import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { customersData } from "./pData";

// import components
import Header from "./components/Header";
import Home from "./components/Home";
import NavDesktop from "./components/NavDesktop";

import LogInPage from "./components/LogInPage";
import LandingPage from "./components/LandingPage";
import RegisterForm from "./components/RegisterForm";
import PendingPage from "./components/PendingPage";

//import images
import LoadingSvg from "../src/img/loading.svg";

// import material ui
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { heIL } from "@material-ui/core/locale";

const {
  REACT_APP_API_URL_DEMO1,
  REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO1,
  REACT_APP_API_URL_DEMO2,
  REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO2,
  REACT_APP_API_URL_REFAEL_ATIA,
  REACT_APP_EMAIL_ADDRESS_REFAEL_ATIA,
  REACT_APP_API_URL_URBANPLACE,
  REACT_APP_EMAIL_ADDRESS_URBANPLACE,
  REACT_APP_BUSINESS_NAME_URBANPLACE,
  REACT_APP_LOGO_URL_URBANPLACE,
  REACT_APP_EMAIL_ADDRESS_WAVE_STUDIO,
  REACT_APP_API_URL_WAVE_STUDIO,
} = process.env;

const theme = createMuiTheme(
  {
    direction: "rtl", // Both here and <body dir="rtl">
    palette: {
      primary: {
        main: "#1e212a",
      },
      secondary: {
        main: "#eb5424",
      },
    },
  },
  heIL
);

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  // state for development without auth
  const [inDevModeState, setInDevModeState] = useState(true);
  // GET RELEVANT DATA (API URL) ACCORDING TO ACCOUNT
  const [relDataObjToCustomer, setRelDataObjToCustomer] = useState({
    businessName: "",
    emailAddress: "",
    businessLogo: "",
    businessType: "",
    businessBranches: [],
    relApiUrl: "",
    funnelSteps: [],
    leadSources: [],
    missionTypes: [],
    events: [],
  });
  const [relApiUrlForCrud, setRelApiUrlForCrud] = useState(false);
  const [relBusinessName, setRelBusinessName] = useState(false);
  const [relBusinessLogo, setRelBusinessLogo] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  // **START USERS NEW FUNCTIONALITY**
  const [usersDoneLoading, setUsersDoneLoading] = useState(false);
  const [usersArrFromUsersCollection, setUsersArrFromUsersCollection] =
    useState([]);
  const [getTheUserObj, setGetTheUserObj] = useState({});
  const [
    userEmailFitToOneOfEmailInUsersCollectionBool,
    setUserEmailFitToOneOfEmailInUsersCollectionBool,
  ] = useState();
  const [userHasRelApiBool, setUserHasRelApiBool] = useState();

  // 1.  get api request users collection
  const getUsersFromSheet = () => {
    const usersDataSheet = axios
      .get("https://sheet.best/api/sheets/766a22f4-2885-46bb-a273-1244747817bb")
      .then((res) => {
        setUsersArrFromUsersCollection(res.data);
        setUsersDoneLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 2. check if user exist in users collection google sheet
  const checkIfUserInUsersCollection = (arrOfUsers) => {
    if (arrOfUsers.some((u) => u.userEmailAddress === user.email)) {
      setUserEmailFitToOneOfEmailInUsersCollectionBool(true);
      const getUserObj = arrOfUsers.find(
        (el) => el.userEmailAddress === user.email
      );
      setGetTheUserObj(getUserObj);
      // check if user has rel api ready
      if (getUserObj.relApiUrl === null || getUserObj.relApiUrl === "") {
        setUserHasRelApiBool(false);
      } else {
        setUserHasRelApiBool(true);
        setRelApiUrlForCrud(getUserObj.relApiUrl);
        setRelDataObjToCustomer({
          businessName: getUserObj.businessName,
          emailAddress: getUserObj.userEmailAddress,
          businessLogo: getUserObj.businessLogoUrl,
          businessType: getUserObj.businessType,
          businessBranches: getUserObj.businessBranches.split(","), //array
          relApiUrl: "",
          funnelSteps: getUserObj.funnelSteps.split(","), //array
          leadSources: getUserObj.leadSources.split(","), //array
          missionTypes: getUserObj.missionTypes.split(","), //array
          events: getUserObj.events.split(","), //array
          recommendedMissionBySystemToLeadStep:
            getUserObj.recommendedMissionBySystemToLeadStep.split(","),
        });
      }
    } else {
      setUserEmailFitToOneOfEmailInUsersCollectionBool(false);
      setUserHasRelApiBool(false);
    }
  };
  useEffect(() => {
    checkIfUserInUsersCollection(usersArrFromUsersCollection);
  }, [usersArrFromUsersCollection]);

  useEffect(() => {
    if (isAuthenticated) {
      // get users collection from sheet.best api
      getUsersFromSheet();
    }
  }, [user]);

  // **END USERS NEW FUNCTIONALITY**

  /*
  useEffect(() => {
    if (isAuthenticated) {
      // get users collection from sheet.best api
      getUsersFromSheet();
      if (user.email == REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO1) {
        setRelApiUrlForCrud(REACT_APP_API_URL_DEMO1);
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO2) {
        //setRelApiUrlForCrud(REACT_APP_API_URL_DEMO2);
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_REFAEL_ATIA) {
        setRelApiUrlForCrud(REACT_APP_API_URL_REFAEL_ATIA);
        setRelDataObjToCustomer(customersData[1]);
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_URBANPLACE) {
        setRelDataObjToCustomer(customersData[0]);
        setRelApiUrlForCrud(REACT_APP_API_URL_URBANPLACE);
        setRelBusinessName(REACT_APP_BUSINESS_NAME_URBANPLACE);
        setRelBusinessLogo(REACT_APP_LOGO_URL_URBANPLACE);
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_WAVE_STUDIO) {
        setRelApiUrlForCrud(REACT_APP_API_URL_WAVE_STUDIO);
        setRelDataObjToCustomer(customersData[2]);
      } else {
        setRelDataObjToCustomer(customersData[0]);
      }
    } else {
      setRelDataObjToCustomer(customersData[0]);
    } // end parent condition
  }, [user]);
*/

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "5rem" }}>
          <img style={{ width: "200px" }} src={LoadingSvg} />
        </div>
        <p
          dir="rtl"
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            marginTop: "2rem",
          }}
        >
          טוען אפליקציה..
        </p>
      </div>
    );
  }

  return (
    <StylesProvider jss={jss}>
      <div className="app" dir="rtl">
        {/* {inDevModeState ? ( */}
        {/*  */}
        {isAuthenticated &&
        userEmailFitToOneOfEmailInUsersCollectionBool &&
        userHasRelApiBool &&
        usersDoneLoading ? (
          <div className="app__appAfterAuth">
            <Router>
              <ThemeProvider theme={theme}>
                <Header user={user} />
                <div className="app__mainContainer">
                  <main className="app__main">
                    <Home
                      getTheUserObj={getTheUserObj}
                      relCrudApiUrl={relApiUrlForCrud}
                      user={user}
                      relCustomerDataObj={relDataObjToCustomer}
                    />
                  </main>
                  <div className="app__navDesk">
                    <NavDesktop
                      businessName={relDataObjToCustomer.businessName}
                      logoUrl={relDataObjToCustomer.businessLogo}
                    />
                  </div>
                </div>{" "}
                {/* end .app__mainContainer */}
              </ThemeProvider>
            </Router>
          </div>
        ) : isAuthenticated &&
          !userEmailFitToOneOfEmailInUsersCollectionBool &&
          !userHasRelApiBool &&
          usersDoneLoading ? (
          <ThemeProvider theme={theme}>
            <RegisterForm
              userEmail={user.email}
              usersCollection={usersArrFromUsersCollection}
            />
          </ThemeProvider>
        ) : isAuthenticated &&
          userEmailFitToOneOfEmailInUsersCollectionBool &&
          !userHasRelApiBool &&
          usersDoneLoading ? (
          <ThemeProvider theme={theme}>
            <PendingPage />
          </ThemeProvider>
        ) : !isAuthenticated ? (
          <LogInPage />
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ marginTop: "5rem" }}>
              <img style={{ width: "200px" }} src={LoadingSvg} />
            </div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "2rem",
                marginTop: "2rem",
              }}
            >
              טוען נתוני משתמש..
            </p>
          </div>
        )}
      </div>
    </StylesProvider>
  );
}

export default App;

/* <LandingPage /> */
