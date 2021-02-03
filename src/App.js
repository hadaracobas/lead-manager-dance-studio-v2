import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// import components
import Header from "./components/Header";
import Home from "./components/Home";
import NavDesktop from "./components/NavDesktop";

import LogInPage from "./components/LogInPage";

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
} = process.env;

const theme = createMuiTheme(
  {
    direction: "rtl", // Both here and <body dir="rtl">
  },
  heIL
);

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  // state for development without auth
  const [inDevModeState, setInDevModeState] = useState(true);
  // GET RELEVANT DATA (API URL) ACCORDING TO ACCOUNT
  const [relApiUrlForCrud, setRelApiUrlForCrud] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      if (user.email == REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO1) {
        setRelApiUrlForCrud(REACT_APP_API_URL_DEMO1);
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO2) {
        setRelApiUrlForCrud(REACT_APP_API_URL_DEMO2);
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_REFAEL_ATIA) {
        setRelApiUrlForCrud(REACT_APP_API_URL_REFAEL_ATIA);
      }
    } // end parent condition
  }, [user]);

  // DYNAMIC STATES ACCORDING TO ACCOUNT
  const [
    relBranchesAccordingToAccount,
    setRelBranchesAccordingToAccount,
  ] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      if (user.email == REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO1) {
        setRelBranchesAccordingToAccount("הדר עם, צורן");
      } else if (user.email == REACT_APP_EMAIL_ADDRESS_CONNECT_API_URL_DEMO2) {
        setRelBranchesAccordingToAccount("רמת השרון, פתח תקווה, כפר סבא");
      }
    } // end parent condition
  }, [user]);

  if (isLoading) return <div>loading..</div>;
  return (
    <StylesProvider jss={jss}>
      <div className="app" dir="rtl">
        {/* */}
        {/* {inDevModeState ? ( */}
        {isAuthenticated ? (
          <div className="app__appAfterAuth">
            <Router>
              <ThemeProvider theme={theme}>
                <Header />
                <div className="app__mainContainer">
                  <main className="app__main">
                    <Home
                      relBranchesAccordingToAccount={
                        relBranchesAccordingToAccount
                      }
                      relCrudApiUrl={relApiUrlForCrud}
                      user={user}
                    />
                  </main>
                  <div className="app__navDesk">
                    <NavDesktop businessName="רפאל עטיה אחזקות" />
                  </div>
                </div>{" "}
                {/* end .app__mainContainer */}
              </ThemeProvider>
            </Router>
          </div>
        ) : (
          <LogInPage />
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
