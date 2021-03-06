import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  filterAllLeadsInStep1,
  filterAllLeadsInStep2,
  filterAllLeadsInStep3,
  filterAllLeadsInSellProcess,
  filterRelevantLeads,
  filterNotRelevantLeads,
  sortLeadsAccordingToAddedDate,
} from "../../functions";

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

function LeadsInProgTable(props) {
  const history = useHistory();
  const [displayRelLeads, setDisplayLeads] = useState(false);
  const [saveOriginalDisplayRelLeadsArr, setSaveOriginalDisplayRelLeadsArr] =
    useState(false);

  const [displayNameOfData, setDisplayNameOfData] = useState(
    "כל לידים בתהליך מכירה"
  );
  const [
    toggleShowJustRelevantLeadsAfterFilter,
    setToggleShowJustRelevantLeadsAfterFilter,
  ] = useState("");

  useEffect(() => {
    setDisplayLeads(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
    setSaveOriginalDisplayRelLeadsArr(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
  }, []);

  useEffect(() => {
    setDisplayLeads(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
    setSaveOriginalDisplayRelLeadsArr(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
  }, [props.data]);
  const classesTable = useStylesTable();

  const onClickToLeadPage = (leadPage) => {
    let path = `/${leadPage}`;
    history.push(path);
    //window.location.href = `/${leadPage}`;
  };

  const handleOnClickBtnStep1 = () => {
    setDisplayLeads(
      filterAllLeadsInStep1(props.data, props.relCustomerDataObj.funnelSteps[0])
    );
    setSaveOriginalDisplayRelLeadsArr(
      filterAllLeadsInStep1(props.data, props.relCustomerDataObj.funnelSteps[0])
    );
    setDisplayNameOfData(props.relCustomerDataObj.funnelSteps[0]);
    setToggleShowJustRelevantLeadsAfterFilter("allLeads");
  };

  const handleOnClickBtnStep2 = () => {
    setDisplayLeads(
      filterAllLeadsInStep2(props.data, props.relCustomerDataObj.funnelSteps[1])
    );
    setSaveOriginalDisplayRelLeadsArr(
      filterAllLeadsInStep2(props.data, props.relCustomerDataObj.funnelSteps[1])
    );
    setDisplayNameOfData(props.relCustomerDataObj.funnelSteps[1]);

    setToggleShowJustRelevantLeadsAfterFilter("allLeads");
  };

  const handleOnClickBtnStep3 = () => {
    setDisplayLeads(
      filterAllLeadsInStep3(props.data, props.relCustomerDataObj.funnelSteps[2])
    );
    setSaveOriginalDisplayRelLeadsArr(
      filterAllLeadsInStep3(props.data, props.relCustomerDataObj.funnelSteps[2])
    );
    setDisplayNameOfData(props.relCustomerDataObj.funnelSteps[2]);

    setToggleShowJustRelevantLeadsAfterFilter("allLeads");
  };

  const handleOnClickBtnAllLeadsInPros = () => {
    setDisplayLeads(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );

    setSaveOriginalDisplayRelLeadsArr(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
    setDisplayNameOfData("כל לידים בתהליך מכירה");

    setToggleShowJustRelevantLeadsAfterFilter("allLeads");
  };

  useEffect(() => {
    if (toggleShowJustRelevantLeadsAfterFilter === "allLeads") {
      setDisplayLeads(
        filterAllLeadsInSellProcess(
          saveOriginalDisplayRelLeadsArr,
          props.relCustomerDataObj.funnelSteps[0],
          props.relCustomerDataObj.funnelSteps[1],
          props.relCustomerDataObj.funnelSteps[2]
        )
      );
    } else if (toggleShowJustRelevantLeadsAfterFilter === "justRelevantLeads") {
      //filterRelevantLeads
      setDisplayLeads(filterRelevantLeads(saveOriginalDisplayRelLeadsArr));
    } else if (
      toggleShowJustRelevantLeadsAfterFilter === "justNotRelevantLeads"
    ) {
      setDisplayLeads(filterNotRelevantLeads(saveOriginalDisplayRelLeadsArr));
    } else if (
      toggleShowJustRelevantLeadsAfterFilter === "accordingToAddedDate"
    ) {
      setDisplayLeads(
        sortLeadsAccordingToAddedDate(saveOriginalDisplayRelLeadsArr)
      );
    } else if (
      toggleShowJustRelevantLeadsAfterFilter
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/_/g, "")
        .replace(/"/g, "")
        .indexOf(
          props.relCustomerDataObj.businessBranches[0] &&
            props.relCustomerDataObj.businessBranches[0]
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
        ) > -1
    ) {
      let relBranchesAccordingToBranchVar1 =
        saveOriginalDisplayRelLeadsArr &&
        saveOriginalDisplayRelLeadsArr.filter((lead) => {
          // return lead.branch === props.relCustomerDataObj.businessBranches[0];
          return (
            lead.branch
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
              .indexOf(
                props.relCustomerDataObj.businessBranches[0]
                  .replace(/ /g, "")
                  .replace(/-/g, "")
                  .replace(/_/g, "")
                  .replace(/"/g, "")
              ) > -1
          );
        });
      setDisplayLeads(relBranchesAccordingToBranchVar1);
    } else if (
      toggleShowJustRelevantLeadsAfterFilter
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/_/g, "")
        .replace(/"/g, "")
        .indexOf(
          props.relCustomerDataObj.businessBranches[1] &&
            props.relCustomerDataObj.businessBranches[1]
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
        ) > -1
    ) {
      let relBranchesAccordingToBranchVar2 =
        saveOriginalDisplayRelLeadsArr &&
        saveOriginalDisplayRelLeadsArr.filter((lead) => {
          // return lead.branch === props.relCustomerDataObj.businessBranches[1];
          return (
            lead.branch
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
              .indexOf(
                props.relCustomerDataObj.businessBranches[1]
                  .replace(/ /g, "")
                  .replace(/-/g, "")
                  .replace(/_/g, "")
                  .replace(/"/g, "")
              ) > -1
          );
        });
      setDisplayLeads(relBranchesAccordingToBranchVar2);
    } else if (
      toggleShowJustRelevantLeadsAfterFilter
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/_/g, "")
        .replace(/"/g, "")
        .indexOf(
          props.relCustomerDataObj.businessBranches[2] &&
            props.relCustomerDataObj.businessBranches[2]
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
        ) > -1
    ) {
      let relBranchesAccordingToBranchVar3 =
        saveOriginalDisplayRelLeadsArr &&
        saveOriginalDisplayRelLeadsArr.filter((lead) => {
          //return lead.branch === props.relCustomerDataObj.businessBranches[2];
          return (
            lead.branch
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
              .indexOf(
                props.relCustomerDataObj.businessBranches[2]
                  .replace(/ /g, "")
                  .replace(/-/g, "")
                  .replace(/_/g, "")
                  .replace(/"/g, "")
              ) > -1
          );
        });
      setDisplayLeads(relBranchesAccordingToBranchVar3);
    } else if (
      toggleShowJustRelevantLeadsAfterFilter
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/_/g, "")
        .replace(/"/g, "")
        .indexOf(
          props.relCustomerDataObj.businessBranches[3] &&
            props.relCustomerDataObj.businessBranches[3]
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
        ) > -1
    ) {
      let relBranchesAccordingToBranchVar4 =
        saveOriginalDisplayRelLeadsArr &&
        saveOriginalDisplayRelLeadsArr.filter((lead) => {
          return (
            lead.branch
              .replace(/ /g, "")
              .replace(/-/g, "")
              .replace(/_/g, "")
              .replace(/"/g, "")
              .indexOf(
                props.relCustomerDataObj.businessBranches[3]
                  .replace(/ /g, "")
                  .replace(/-/g, "")
                  .replace(/_/g, "")
                  .replace(/"/g, "")
              ) > -1
          );
        });
      setDisplayLeads(relBranchesAccordingToBranchVar4);
    }
  }, [toggleShowJustRelevantLeadsAfterFilter]);

  return (
    <div className="leadsInProgTable">
      <h2 className="leadsInProgTable__title">{displayNameOfData} </h2>
      <div className="leadsInProgTable__btnsBox">
        <div>
          <button
            className="leadsInProgTable__btn"
            onClick={handleOnClickBtnStep1}
            style={
              displayNameOfData === props.relCustomerDataObj.funnelSteps[0]
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            {props.relCustomerDataObj.funnelSteps[0]}
          </button>
          <button
            className="leadsInProgTable__btn"
            onClick={handleOnClickBtnStep2}
            style={
              displayNameOfData === props.relCustomerDataObj.funnelSteps[1]
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            {props.relCustomerDataObj.funnelSteps[1]}
          </button>
        </div>
        <div>
          <button
            className="leadsInProgTable__btn"
            onClick={handleOnClickBtnStep3}
            style={
              displayNameOfData === props.relCustomerDataObj.funnelSteps[2]
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            {props.relCustomerDataObj.funnelSteps[2]}
          </button>
          <button
            className="leadsInProgTable__btn"
            onClick={handleOnClickBtnAllLeadsInPros}
            style={
              displayNameOfData === "כל לידים בתהליך מכירה"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            כל הלידים בתהליך
          </button>
        </div>
      </div>
      <div className="leadsInProgTable__filtersWrapper">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="leadType"
            name="leadType"
            value={toggleShowJustRelevantLeadsAfterFilter}
            onChange={(e) =>
              setToggleShowJustRelevantLeadsAfterFilter(e.target.value)
            }
            className="leadsInProgTable__radioBtns"
          >
            {props.relCustomerDataObj.businessBranches[0] != "" &&
              props.relCustomerDataObj.businessBranches.map((branch, index) => (
                <FormControlLabel
                  key={index}
                  value={branch}
                  control={<Radio />}
                  label={branch}
                />
              ))}

            <FormControlLabel
              value="allLeads"
              control={<Radio />}
              label="הצג את כל הלידים"
            />
            <FormControlLabel
              value="justRelevantLeads"
              control={<Radio />}
              label="הצג רק לידים שסומנו כרלוונטיים"
            />
            <FormControlLabel
              value="justNotRelevantLeads"
              control={<Radio />}
              label="הצג רק לידים שעדיין בסטטוס לא רלוונטיים"
            />
            <FormControlLabel
              value="accordingToAddedDate"
              control={<Radio />}
              label="מיין לידים לפי תאריך התווספות"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <p className="leadsInProgTable__amount">
        סה"כ {displayRelLeads && displayRelLeads.length}
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
                סניף
              </TableCell>

              <TableCell style={{ fontWeight: "bold" }} align="left">
                קבוצה
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                תיאור משימה
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRelLeads &&
              displayRelLeads.map((row, index) => (
                <TableRow
                  key={index}
                  className="leadsInProgTable__tableRow"
                  onClick={() => onClickToLeadPage(row.ID)}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>

                  <TableCell align="left">
                    <span
                      style={
                        row.manualMissionPerformed === "TRUE"
                          ? {}
                          : row.manualMissionPerformed === true
                          ? {}
                          : row.manualMissionDescription === null
                          ? {}
                          : row.manualMissionDescription === ""
                          ? {}
                          : { backgroundColor: "yellow" }
                      }
                    >
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell align="left">{row.tel}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.branch}</TableCell>

                  <TableCell align="left">{row.Group}</TableCell>
                  <TableCell align="left">
                    {row.manualMissionDescription}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeadsInProgTable;
