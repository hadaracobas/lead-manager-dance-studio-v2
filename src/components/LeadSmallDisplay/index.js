import React, { useState } from "react";
import "./index.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

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

export default function LeadSmallDisplay(props) {
  const classesCard = useStylesCard();
  const bull = <span className={classesCard.bullet}>•</span>;

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
        </div>
        {/* end .leadSmallDisplay__bottom */}
      </Card>
    </div>
  );
}
