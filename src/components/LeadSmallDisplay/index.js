import React, { useState, useEffect } from "react";
import "./index.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import PanoramaWideAngleIcon from "@material-ui/icons/PanoramaWideAngle";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Tooltip,
} from "@material-ui/core";

const useStylesCard = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 180,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useStylesToolTip = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function LeadSmallDisplay(props) {
  const classesCard = useStylesCard();
  const bull = <span className={classesCard.bullet}>•</span>;

  const [
    checkIfLeadWithManualMission,
    setCheckIfLeadWithManualMission,
  ] = useState("");
  const checkIfLeadWithManualMissionFunc = () => {
    if (
      props.manualMissionPerformed === "TRUE" ||
      props.manualMissionPerformed === true
    ) {
      setCheckIfLeadWithManualMission("mission-performed");
    } else if (props.leadManualMissionDescription === null) {
      setCheckIfLeadWithManualMission("no-mission");
    } else {
      setCheckIfLeadWithManualMission("mission-is-open");
    }
  };
  useEffect(() => {
    checkIfLeadWithManualMissionFunc();
  }, [props.manualMissionPerformed, props.leadManualMissionDescription]);

  // TOOLTIP
  const classesToolTip = useStylesToolTip();

  return (
    <div className="leadSmallDisplay">
      <Card className={classesCard.root}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              className={classesCard.title}
              color="textSecondary"
              gutterBottom
            >
              {props.leadName}
            </Typography>
            <Typography
              className={classesCard.title}
              color="textSecondary"
              gutterBottom
            >
              {props.leadTel}
            </Typography>
          </div>

          <Typography variant="h5" component="h2">
            {props.leadStep}
          </Typography>
        </CardContent>
        <div className="leadSmallDisplay__bottom">
          <CardActions>
            <Link style={{ textDecoration: "none" }} to={`/${props.leadId}`}>
              <Button size="small">כרטיס ליד</Button>
            </Link>
          </CardActions>
          <p>דירוג ליד: {props.leadRate}</p>
          <div>
            {checkIfLeadWithManualMission === "no-mission" ? (
              <Tooltip title="אין משימה">
                <PanoramaWideAngleIcon />
              </Tooltip>
            ) : checkIfLeadWithManualMission === "mission-is-open" ? (
              <Tooltip
                title={`משימה פתוחה: ${props.leadManualMissionDescription} | דדליין: ${props.DeadlineDateManualMission}`}
              >
                <AssignmentLateIcon />
              </Tooltip>
            ) : checkIfLeadWithManualMission === "mission-performed" ? (
              <Tooltip
                title={`משימה בוצעה: ${props.leadManualMissionDescription} | תאריך ביצוע: ${props.DateManualMissionPerformed}`}
              >
                <AssignmentTurnedInIcon />
              </Tooltip>
            ) : null}
          </div>
        </div>
        {/* end .leadSmallDisplay__bottom */}
      </Card>
    </div>
  );
}
