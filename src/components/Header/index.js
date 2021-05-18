import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavMobile from "../NavMobile";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";

//materiel ui imports:
import { Button, TextField, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStylesAvatar = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Header(props) {
  const { logout } = useAuth0();
  const classesAvatar = useStylesAvatar();
  return (
    <header className="header">
      <div style={{ color: "#fff" }} className="header__avatar-container">
        <Avatar
          alt="Remy Sharp"
          src={props.user.picture}
          className={classesAvatar.small}
        />
      </div>
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
            <Button variant="outlined" color="secondary">
              <SearchIcon />
            </Button>
          </Link>
        </div>
        <div className="header__addLeadWrapper">
          <Link to="/add-new-lead">
            <Button variant="outlined" color="secondary">
              <AddCircleIcon />
            </Button>
          </Link>
        </div>

        <div className="header__logginWrapper" id="logout-header-btn">
          <Button variant="outlined" color="secondary" onClick={() => logout()}>
            התנתק
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
