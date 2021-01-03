import React from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// import components
import EasyData from "./components/EasyData";
//import NavDesktop from "./components/NavDesktop";
//import GeneralLeadsList from "./components/GeneralLeadsList";
//import LeadSmallDisplay from "./components/LeadSmallDisplay";
import Header from "./components/Header";
import Home from "./components/Home";

import LogInPage from "./components/LogInPage";

// import material ui
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { heIL } from "@material-ui/core/locale";

const theme = createMuiTheme(
  {
    direction: "rtl", // Both here and <body dir="rtl">
  },
  heIL
);

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user != undefined && isAuthenticated);
  return (
    <StylesProvider jss={jss}>
      <div className="app" dir="rtl">
        {isAuthenticated ? (
          <div className="app__appAfterAuth">
            <Router>
              <ThemeProvider theme={theme}>
                <Header />
                <main className="app__main">
                  <Home />
                </main>
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
