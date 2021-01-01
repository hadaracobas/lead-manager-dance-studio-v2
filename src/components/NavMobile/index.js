import React, { useState } from "react";
import "./index.scss";

import { Link } from "react-router-dom";

// material ui imports
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from "@material-ui/icons/Send";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import HomeIcon from "@material-ui/icons/Home";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import FacebookIcon from "@material-ui/icons/Facebook";
import FaceIcon from "@material-ui/icons/Face";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
//import Link from "@material-ui/core/Link";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function NavMobile() {
  const [menuToggle, setMenuToggle] = useState(false);

  const handleClickMenuButtonOpen = (event) => {
    setMenuToggle(true);
    handleClick(event);
  };

  const handleClickMenuButtonClose = () => {
    setMenuToggle(false);
    handleClose();
  };

  /* ---MATERIAL UI HANLERS AND STATES: */
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  /* ---END MATERIAL UI HANLERS */

  const menuLiStyles = {
    textAlign: "right",
  };
  return (
    <div className="navMobile">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClickMenuButtonOpen}
      >
        {menuToggle ? <MenuOpenIcon /> : <MenuIcon />}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClickMenuButtonClose}
      >
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#000000DE" }}
          onClick={() => handleClickMenuButtonClose()}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <FaceIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={menuLiStyles} primary="לידים" />
          </StyledMenuItem>
        </Link>
        <Link
          to="/active-subscribers"
          style={{ textDecoration: "none", color: "#000000DE" }}
          onClick={() => handleClickMenuButtonClose()}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <CardMembershipIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={menuLiStyles} primary="מנויים" />
          </StyledMenuItem>
        </Link>

        <Link
          to="/manual-missions"
          style={{ textDecoration: "none", color: "#000000DE" }}
          onClick={() => handleClickMenuButtonClose()}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <AssignmentLateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={menuLiStyles} primary="משימות" />
          </StyledMenuItem>
        </Link>

        <Link
          to="/statistics"
          style={{ textDecoration: "none", color: "#000000DE" }}
          onClick={() => handleClickMenuButtonClose()}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <TrendingUpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText style={menuLiStyles} primary="תמונת מצב" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}

export default NavMobile;
