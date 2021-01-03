import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavMobile from "../NavMobile";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";

//materiel ui imports:
import { Button, TextField } from "@material-ui/core";

function Header() {
  const { logout } = useAuth0();
  return (
    <header className="header">
      <div className="header__right">
        <NavMobile />
      </div>
      <div className="header__center">
        {/*
         <div className="header__searchBoxWrapper">
          <form>
            <TextField id="standard-basic" label="חיפוש ליד" fullWidth={true} />
          </form>
        </div>
        */}
      </div>
      <div className="header__left">
        <div className="header__searchLeadWrapper">
          <Link to="/search-lead">
            <Button variant="contained" color="secondary">
              <SearchIcon />
            </Button>
          </Link>
        </div>
        <div className="header__addLeadWrapper">
          <Link to="/add-new-lead">
            <Button variant="contained" color="secondary">
              <AddCircleIcon />
            </Button>
          </Link>
        </div>

        <div className="header__logginWrapper">
          <Button variant="contained" onClick={() => logout()}>
            התנתק
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
