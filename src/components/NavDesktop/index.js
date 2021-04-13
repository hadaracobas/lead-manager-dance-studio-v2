import React from "react";
import "./index.scss";

import { Link } from "react-router-dom";

import Logo from "../../img/refael_atia_logo.jpeg";

// import material ui
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import HomeIcon from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const iconStyles = {
  minWidth: "30px",
};

function NavDesktop(props) {
  const classes = useStyles();
  return (
    <div className="navDesktop">
      <div className="navDesktop__top">
        <div className="navDesktop__top--businessNameContainer">
          <h2 style={{ padding: "3px 0" }}>{props.businessName} </h2>
        </div>
        <div className="navDesktop__top--logoContainer">
          <img src={props.logoUrl} />
        </div>
        <div className="navDesktop__top--businessSlogenContainer">
          {/*
           <p style={{ padding: "3px 0" }}>זהו הסלוגן של העסק</p>
          */}
        </div>
      </div>
      <div className="navDesktop__bottom">
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <Link to="/" style={{ textDecoration: "none", color: "#000000DE" }}>
              <ListItem button>
                <ListItemIcon style={iconStyles}>
                  <HomeIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="ראשי" />
              </ListItem>
            </Link>

            <Link
              to="/manual-missions-full"
              style={{ textDecoration: "none", color: "#000000DE" }}
            >
              <ListItem button>
                <ListItemIcon style={iconStyles}>
                  <AssignmentLateIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="משימות" />
              </ListItem>
            </Link>

            <Link
              to="/leads-in-progress-table"
              style={{ textDecoration: "none", color: "#000000DE" }}
            >
              <ListItem button>
                <ListItemIcon style={iconStyles}>
                  <FaceIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="לידים בתהליך מכירה" />
              </ListItem>
            </Link>
            <Link
              to="/active-subscribers"
              style={{ textDecoration: "none", color: "#000000DE" }}
            >
              <ListItem button>
                <ListItemIcon style={iconStyles}>
                  <AttachMoneyIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="לידים שרכשו" />
              </ListItem>
            </Link>

            <Link
              to="/statistics"
              style={{ textDecoration: "none", color: "#000000DE" }}
            >
              <ListItem button>
                <ListItemIcon style={iconStyles}>
                  <TrendingUpIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="תמונת מצב" />
              </ListItem>
            </Link>
            <Link
              to="/my-account"
              style={{ textDecoration: "none", color: "#000000DE" }}
            >
              <ListItem button>
                <ListItemIcon style={iconStyles}>
                  <AccountBoxIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="חשבון " />
              </ListItem>
            </Link>
          </List>
        </div>
      </div>
    </div>
  );
}

export default NavDesktop;
