import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { filterAllLeadsInStep4 } from "../../functions";

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ActiveSubscribers(props) {
  const [activeSubscribersData, setActiveSubscribersData] = useState(false);
  useEffect(() => {
    setActiveSubscribersData(filterAllLeadsInStep4(props.data));
  }, [props.data]);

  const classesTable = useStylesTable();

  const onClickToLeadPage = (leadPage) => {
    window.location.href = `/${leadPage}`;
  };
  return (
    <div className="activeSubscribers">
      <h2 className="activeSubscribers__title">מנויים </h2>
      <p className="activeSubscribers__amount">
        סה"כ {activeSubscribersData && activeSubscribersData.length}
      </p>
      <TableContainer component={Paper} className="activeSubscribers__table">
        <Table className={classesTable.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="left">
                שם מלא
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                טלפון
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                אימייל
              </TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="left">
                סכום רכישה
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                עלות ליד
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeSubscribersData &&
              activeSubscribersData.map((row, index) => (
                <TableRow
                  key={index}
                  className="activeSubscribers__tableRow"
                  onClick={() => onClickToLeadPage(row.ID)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.tel}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>

                  <TableCell align="left">{row.PurchasedAmount}</TableCell>
                  <TableCell align="left">{row.LeadCost}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ActiveSubscribers;
