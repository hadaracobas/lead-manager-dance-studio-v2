import React from "react";
import "./index.scss";
import NavMobile from "../NavMobile";

//materiel ui imports:
import { Button, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});

function Header() {
  return (
    <header className="header">
      <div className="header__right">
        <NavMobile />
      </div>
      <div className="header__center">
        <div className="header__searchBoxWrapper">
          <ThemeProvider theme={theme}>
            <form>
              <TextField
                id="standard-basic"
                label="חיפוש ליד"
                fullWidth={true}
              />
            </form>
          </ThemeProvider>
        </div>
      </div>
      <div className="header__left">
        <div className="header__addLeadWrapper">
          <Button variant="contained" color="secondary">
            <AddCircleIcon />
          </Button>
        </div>

        <div className="header__logginWrapper">
          <Button variant="contained">התנתק</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
