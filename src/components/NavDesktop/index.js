import React from "react";
import "./index.scss";

import Logo from "../../img/logo.svg";

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

function NavDesktop() {
  const classes = useStyles();
  return (
    <div className="navDesktop">
      <div className="navDesktop__top">
        <div className="navDesktop__top--businessNameContainer">
          <h2 style={{ padding: "3px 0" }}>שם עסק</h2>
        </div>
        <div className="navDesktop__top--logoContainer">
          <img src={Logo} />
        </div>
        <div className="navDesktop__top--businessSlogenContainer">
          <p style={{ padding: "3px 0" }}>זהו הסלוגן של העסק</p>
        </div>
      </div>
      <div className="navDesktop__bottom">
        <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <HomeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="ראשי" />
            </ListItem>
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <AssignmentLateIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="משימות" />
            </ListItem>
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <DateRangeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="אירועים" />
            </ListItem>
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <MonetizationOnIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="לקוחות משתלמים" />
            </ListItem>
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <ImportantDevicesIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="לידים מטופס האתר " />
            </ListItem>
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <TouchAppIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="לידים שהוספו ידנית" />
            </ListItem>
            <ListItem button>
              <ListItemIcon style={iconStyles}>
                <PhoneInTalkIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="לידים טלפוניים" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}

export default NavDesktop;
