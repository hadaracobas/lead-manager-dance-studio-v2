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

import {
  filterAllLeadsWithOpenMissions,
  sortManualMissionAccordingToDeadlineDate,
} from "../../functions";

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ManualMissions(props) {
  const [openMissions, setOpenMissions] = useState(false);
  const [
    openMissionsInDeadlineDateOrder,
    setOpenMissionsInDeadlineDateOrder,
  ] = useState(false);
  useEffect(() => {
    setOpenMissions(filterAllLeadsWithOpenMissions(props.data));
  }, [props.data]);
  useEffect(() => {
    setOpenMissionsInDeadlineDateOrder(
      sortManualMissionAccordingToDeadlineDate(openMissions)
    );
  }, [openMissions]);

  const classesTable = useStylesTable();

  const onClickToLeadPage = (leadPage) => {
    window.location.href = `/${leadPage}`;
  };

  /*console.log(
    "manual missions prop data:",
    props.data,
    "filteredOpenMissions: ",
    openMissions
  );*/
  return (
    <div className="manualMissions">
      {/*
      <h2 className="manualMissions__title">משימות פתוחות</h2>
      */}

      <p className="manualMissions__amount">
        סה"כ{" "}
        {openMissionsInDeadlineDateOrder &&
          openMissionsInDeadlineDateOrder.length}
      </p>
      <TableContainer component={Paper} className="manualMissions__table">
        <Table className={classesTable.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="left">
                שם מלא
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                תיאור משימה
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                דדליין
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                משימה מוטלת על איש צוות
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {openMissionsInDeadlineDateOrder &&
              openMissionsInDeadlineDateOrder.map((row, index) => (
                <TableRow
                  key={index}
                  className="manualMissions__tableRow"
                  onClick={() => onClickToLeadPage(row.ID)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {row.manualMissionDescription}
                  </TableCell>
                  <TableCell align="left">
                    {row.DeadlineDateManualMission == "NaN/NaN/NaN"
                      ? "לא עודכן דדליין"
                      : row.DeadlineDateManualMission}
                  </TableCell>
                  <TableCell align="left">
                    {row.manualMissionAssociatedToTeamMember}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManualMissions;
