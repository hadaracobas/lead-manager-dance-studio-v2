import React, { useState } from "react";
import "./index.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function LeadSmallDisplay() {
  const classesCard = useStylesCard();
  const bull = <span className={classesCard.bullet}>•</span>;

  return (
    <div className="leadSmallDisplay">
      <Card className={classesCard.root}>
        <CardContent>
          <Typography
            className={classesCard.title}
            color="textSecondary"
            gutterBottom
          >
            יונתן רגב
          </Typography>
          <Typography variant="h5" component="h2">
            מחכה לתיאום פגישה
          </Typography>
        </CardContent>
        <div className="leadSmallDisplay__bottom">
          <CardActions>
            <Button size="small">כרטיס ליד</Button>
          </CardActions>
          <p>דירוג ליד: 6</p>
        </div>
        {/* end .leadSmallDisplay__bottom */}
      </Card>
    </div>
  );
}
