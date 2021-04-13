import React, { useState, useEffect } from "react";
import "./index.scss";

import axios from "axios";

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
  Modal,
  Backdrop,
  Fade,
  MenuItem,
  Checkbox,
  Select,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";

import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

import {
  filterAllLeadsWithOpenMissions,
  filterAllLeadsWithOpenMissionsWithDeadlineLast7Days,
  filterAllLeadsWithOpenMissionsWithDeadlineToYesterday,
  filterAllLeadsWithOpenMissionsWithDeadlineForToday,
  filterAllLeadsWithOpenMissionsWithDeadlineForTomorrow,
  filterAllLeadsWithOpenMissionsWithDeadlineForNext7Days,
  filterAllLeadsWithClosedMissions,
  getCurrentDate,
  convertDateFromDatePickerToNormalDateFormat,
  getCurrentHour,
} from "../../functions";

const useStylesTable = makeStyles({
  table: {
    minWidth: 650,
  },
});

const useStylesModal = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    direction: "rtl",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "auto",
    height: "70%",
    textAlign: "left",
  },
}));

const useStylesDatePicker = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const useStylesSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useStylesAlert = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ManualMissionsFull(props) {
  const classesTable = useStylesTable();
  const classesModal = useStylesModal();
  const classesDatePicker = useStylesDatePicker();
  const classesSelect = useStylesSelect();

  //toggle loading circle
  const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);

  //toggle success alert
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);

  //toggle error alert
  const [openAlertError, setOpenAlertError] = useState(false);

  //toggle modal state
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // link to rel lead page
  const onClickToLeadPage = (leadPage) => {
    window.location.href = `/${leadPage}`;
  };

  //get and store id of lead - quick editing
  const [leadId, setLeadId] = useState("");

  //update mission inputs states
  const [leadName, setLeadName] = useState("");

  const [updateTypeOfMission, setUpdateTypeOfMission] = useState("");
  const [updateMissionDescription, setUpdateMissionDescription] = useState("");
  const [updateDeadlineMission, setUpdateDeadlineMission] = useState("");
  const [
    updateDeadlineMissionNewFormat,
    setUpdateDeadlineMissionNewFormat,
  ] = useState("");

  const [
    updateMissionCreatedByTeamMember,
    setUpdateMissionCreatedByTeamMember,
  ] = useState("");

  const [
    updateMissionAssociateToTeamMember,
    setUpdateMissionAssociateToTeamMember,
  ] = useState("");
  const [updateMissionPerform, setUpdateMissionPerform] = useState(false);
  const [updateDateMissionPerform, setUpdateDateMissionPerform] = useState("");
  const [
    updateDateMissionPerformNewFormat,
    setUpdateDateMissionPerformNewFormat,
  ] = useState("");
  const [updateDateMissionCreated, setUpdateDateMissionCreated] = useState("");

  const [
    dispalayWarningMessageMissionWithoutDeadline,
    setDispalayWarningMessageMissionWithoutDeadline,
  ] = useState(false);

  // new format dates mission
  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      updateDeadlineMission,
      setUpdateDeadlineMissionNewFormat
    );
  }, [updateDeadlineMission]);

  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      updateDateMissionPerform,
      setUpdateDateMissionPerformNewFormat
    );
  }, [updateDateMissionPerform]);

  useEffect(() => {
    // display message conditionaly
    if (updateMissionDescription !== "" && updateDeadlineMission === "") {
      setDispalayWarningMessageMissionWithoutDeadline(true);
    } else {
      setDispalayWarningMessageMissionWithoutDeadline(false);
    }
    if (updateMissionDescription === "") {
      setUpdateDeadlineMission("");
    }
  }, [updateMissionDescription, updateDeadlineMission]);

  //on click quick edit mission
  const handleOnClickOpenModalMissionQuickEditGetAndStoreMissionData = (
    name,
    typeMission,
    MissionDesc,
    deadline,
    associatedToTeamMember,
    createdByTeamMember,
    manualMissionPerformed,
    leadId,
    dateMissionCreated
  ) => {
    setLeadName(name);
    setUpdateTypeOfMission(typeMission);
    setUpdateMissionDescription(MissionDesc);
    setUpdateDeadlineMission(deadline);
    setUpdateMissionAssociateToTeamMember(associatedToTeamMember);
    setUpdateMissionCreatedByTeamMember(createdByTeamMember);
    setUpdateMissionPerform(manualMissionPerformed);
    setLeadId(leadId);
    setUpdateDateMissionCreated(dateMissionCreated);

    handleOpenModal();
  };

  //update true-false mission performed state
  useEffect(() => {
    if (updateMissionPerform === "" || updateMissionPerform === null) {
      setUpdateMissionPerform(false);
    } else if (updateMissionPerform === "TRUE") {
      setUpdateMissionPerform(true);
    }
  }, [updateMissionPerform]);

  //reset mission quick edit
  const onClickResetManualMissionAndSetNewCreatedDate = () => {
    setUpdateTypeOfMission("");
    setUpdateMissionDescription("");
    setUpdateDeadlineMission("");
    setUpdateMissionAssociateToTeamMember("");
    setUpdateMissionCreatedByTeamMember("");
    setUpdateMissionPerform(false);
    setUpdateDateMissionCreated(getCurrentDate());

    alert("תאריך יצירת משימה התעדכן לתאריך של היום");
  };

  //filter and set all open missions
  const [allOpenMissions, setAllOpenMissions] = useState([]);

  useEffect(() => {
    setAllOpenMissions(filterAllLeadsWithOpenMissions(props.data));
  }, [props.data]);

  //filter and set all open missions in the last 7 days
  const [
    allOpenMissionsDeadlineLast7Days,
    setAllOpenMissionsDeadlineLast7Days,
  ] = useState([]);

  useEffect(() => {
    setAllOpenMissionsDeadlineLast7Days(
      filterAllLeadsWithOpenMissionsWithDeadlineLast7Days(allOpenMissions)
    );
  }, [allOpenMissions]);

  //filter and set all open missions deadline to yesterday
  const [
    allOpenMissionsDeadlineYesterday,
    setAllOpenMissionsDeadlineYesterday,
  ] = useState([]);

  useEffect(() => {
    setAllOpenMissionsDeadlineYesterday(
      filterAllLeadsWithOpenMissionsWithDeadlineToYesterday(allOpenMissions)
    );
  }, [allOpenMissions]);

  //filter and set all open missions deadline for today
  const [
    allOpenMissionsDeadlineForToday,
    setAllOpenMissionsDeadlineForToday,
  ] = useState([]);
  useEffect(() => {
    setAllOpenMissionsDeadlineForToday(
      filterAllLeadsWithOpenMissionsWithDeadlineForToday(allOpenMissions)
    );
  }, [allOpenMissions]);

  //filter and set all open missions deadline for tomorrow
  const [
    allOpenMissionsDeadlineTomorrow,
    setAllOpenMissionsDeadlineTomorrow,
  ] = useState([]);
  useEffect(() => {
    setAllOpenMissionsDeadlineTomorrow(
      filterAllLeadsWithOpenMissionsWithDeadlineForTomorrow(allOpenMissions)
    );
  }, [allOpenMissions]);

  //filter and set all open missions deadline for next 7 days
  const [
    allOpenMissionsDeadlineNext7Days,
    setAllOpenMissionsDeadlineNext7Days,
  ] = useState([]);
  useEffect(() => {
    setAllOpenMissionsDeadlineNext7Days(
      filterAllLeadsWithOpenMissionsWithDeadlineForNext7Days(allOpenMissions)
    );
  }, [allOpenMissions]);

  //filter and set all closed missions
  const [allClosedMissions, setAllClosedMissions] = useState([]);
  useEffect(() => {
    setAllClosedMissions(filterAllLeadsWithClosedMissions(props.data));
  }, [props.data]);

  //on click display open missions for today
  const handleOnClickDisplayMissionsForToday = () => {
    setDisplayRelMissions(allOpenMissionsDeadlineForToday);
    setDisplayRelMissionsCopy(allOpenMissionsDeadlineForToday);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("פתוחות להיום");
  };

  //on click display open missions for tomorrow
  const handleOnClickDisplayMissionsForTomorrow = () => {
    setDisplayRelMissions(allOpenMissionsDeadlineTomorrow);
    setDisplayRelMissionsCopy(allOpenMissionsDeadlineTomorrow);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("פתוחות למחר");
  };

  //on click display open missions next 7 days
  const handleOnClickDisplayMissionsForNext7Days = () => {
    setDisplayRelMissions(allOpenMissionsDeadlineNext7Days);
    setDisplayRelMissionsCopy(allOpenMissionsDeadlineNext7Days);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("פתוחות 7 ימים הבאים");
  };

  //on click display open missions last 7 days
  const handleOnClickDisplayMissionsFromLast7Days = () => {
    setDisplayRelMissions(allOpenMissionsDeadlineLast7Days);
    setDisplayRelMissionsCopy(allOpenMissionsDeadlineLast7Days);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("פתוחות 7 ימים אחרונים");
  };

  //on click display all open missions
  const handleOnClickDisplayAllOpenMissions = () => {
    setDisplayRelMissions(allOpenMissions);
    setDisplayRelMissionsCopy(allOpenMissions);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("כל הפתוחות");
  };

  //on click display all closed missions
  const handleOnClickDisplayAllClosedMissions = () => {
    setDisplayRelMissions(allClosedMissions);
    setDisplayRelMissionsCopy(allClosedMissions);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("בוצעו!");
  };

  //let the user filter missions according to branch
  const [displayMissionsBranch, setDisplayMissionsBranch] = useState("");
  useEffect(() => {
    let splitedDisplayMissionBranch = displayMissionsBranch.split(" ");
    if (
      displayMissionsBranch.indexOf(
        props.relCustomerDataObj.businessBranches[0]
      ) > -1
    ) {
      let relMissionsBranch1 =
        displayRelMissionsCopy &&
        displayRelMissionsCopy.filter((mission) => {
          return (
            mission.branch.indexOf(
              props.relCustomerDataObj.businessBranches[0].split(" ")[0]
            ) > -1
          );
        });
      setDisplayRelMissions(relMissionsBranch1);
    } else if (
      displayMissionsBranch.indexOf(
        props.relCustomerDataObj.businessBranches[1]
      ) > -1
    ) {
      let relMissionsBranch2 =
        displayRelMissionsCopy &&
        displayRelMissionsCopy.filter((mission) => {
          return (
            mission.branch.indexOf(
              props.relCustomerDataObj.businessBranches[1].split(" ")[0]
            ) > -1
          );
        });
      setDisplayRelMissions(relMissionsBranch2);
    } else if (
      displayMissionsBranch.indexOf(
        props.relCustomerDataObj.businessBranches[2]
      ) > -1
    ) {
      let relMissionsBranch3 =
        displayRelMissionsCopy &&
        displayRelMissionsCopy.filter((mission) => {
          return (
            mission.branch.indexOf(
              props.relCustomerDataObj.businessBranches[2].split(" ")[0]
            ) > -1
          );
        });
      setDisplayRelMissions(relMissionsBranch3);
    } else if (
      displayMissionsBranch.indexOf(
        props.relCustomerDataObj.businessBranches[3]
      ) > -1
    ) {
      let relMissionsBranch4 =
        displayRelMissionsCopy &&
        displayRelMissionsCopy.filter((mission) => {
          return (
            mission.branch.indexOf(
              props.relCustomerDataObj.businessBranches[3].split(" ")[0]
            ) > -1
          );
        });
      setDisplayRelMissions(relMissionsBranch4);
    } else if (displayMissionsBranch === "allLeads") {
      setDisplayRelMissions(displayRelMissionsCopy);
    } //else
  }, [displayMissionsBranch]);

  // main state display - copy
  const [displayRelMissionsCopy, setDisplayRelMissionsCopy] = useState([]);

  // main state display
  const [displayRelMissions, setDisplayRelMissions] = useState([]);
  useEffect(() => {
    setDisplayRelMissions(allOpenMissionsDeadlineForToday);
    setDisplayRelMissionsCopy(allOpenMissionsDeadlineForToday);
    setDisplayMissionsBranch("allLeads");
    setDisplayNameOfMissionsData("פתוחות להיום");
  }, [allOpenMissionsDeadlineForToday]);

  //display name of data/missions on the title
  const [displayNameOfMissionsData, setDisplayNameOfMissionsData] = useState(
    ""
  );

  // API UPDATE MISSION REQUEST FUNCTION
  const updateTheLeadReq = async () => {
    setShowLoadingUpdate(true);
    const updateDataSheet = await axios
      .patch(`${props.relCrudApiUrl && props.relCrudApiUrl}/${leadId - 1}`, {
        ID: leadId == 1 ? "=ARRAYFORMULA(ROW(A2:A)-1)" : null,
        lastUpdateDate: getCurrentDate(),
        lastUpdateHour: getCurrentHour(),
        dateManualMissionCreated: updateDateMissionCreated,
        manualTypeMission: updateTypeOfMission,
        manualMissionDescription: updateMissionDescription,
        manualMissionCreateByTeamMember: updateMissionCreatedByTeamMember,
        DeadlineDateManualMission: updateDeadlineMissionNewFormat,
        manualMissionPerformed: updateMissionPerform,
        DateManualMissionPerformed: updateDateMissionPerformNewFormat,
        manualMissionAssociatedToTeamMember: updateMissionAssociateToTeamMember,
      })
      .then((res) => {
        console.log(res);
        setShowLoadingUpdate(false);
        setOpenAlertSuccess(true);

        setTimeout(function () {
          setOpenAlertSuccess(false);
          handleCloseModal();
          window.location.reload();
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
        setShowLoadingUpdate(false);
        setOpenAlertError(true);
        setTimeout(function () {
          setOpenAlertError(false);
          handleCloseModal();
        }, 1200);
      });
  };

  return (
    <div className="manualMissionsFull">
      <h2 className="manualMissionsFull__title">
        {" "}
        משימות - {displayNameOfMissionsData}
      </h2>
      <div className="manualMissionsFull__btnsBox">
        <div>
          <button
            className="manualMissionsFull__btn"
            onClick={handleOnClickDisplayMissionsForToday}
            style={
              displayNameOfMissionsData === "פתוחות להיום"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            פתוחות להיום
            {allOpenMissionsDeadlineForToday.length > 0 && (
              <span className="manualMissionsFull__btnLeadsAmount">
                {allOpenMissionsDeadlineForToday.length}
              </span>
            )}
          </button>
          <button
            className="manualMissionsFull__btn"
            onClick={handleOnClickDisplayMissionsForTomorrow}
            style={
              displayNameOfMissionsData === "פתוחות למחר"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            פתוחות למחר
            {allOpenMissionsDeadlineTomorrow.length > 0 && (
              <span className="manualMissionsFull__btnLeadsAmount">
                {allOpenMissionsDeadlineTomorrow.length}
              </span>
            )}
          </button>
        </div>
        <div>
          <button
            className="manualMissionsFull__btn"
            onClick={handleOnClickDisplayMissionsForNext7Days}
            style={
              displayNameOfMissionsData === "פתוחות 7 ימים הבאים"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            פתוחות 7 ימים הבאים
            {allOpenMissionsDeadlineNext7Days.length > 0 && (
              <span className="manualMissionsFull__btnLeadsAmount">
                {allOpenMissionsDeadlineNext7Days.length}
              </span>
            )}
          </button>
          <button
            className="manualMissionsFull__btn"
            onClick={handleOnClickDisplayMissionsFromLast7Days}
            style={
              displayNameOfMissionsData === "פתוחות 7 ימים אחרונים"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            פתוחות 7 ימים אחרונים
            {allOpenMissionsDeadlineLast7Days.length > 0 && (
              <span className="manualMissionsFull__btnLeadsAmount">
                {allOpenMissionsDeadlineLast7Days.length}
              </span>
            )}
          </button>
        </div>

        <div>
          <button
            className="manualMissionsFull__btn"
            onClick={handleOnClickDisplayAllOpenMissions}
            style={
              displayNameOfMissionsData === "כל הפתוחות"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            כל הפתוחות
          </button>
          <button
            className="manualMissionsFull__btn"
            onClick={handleOnClickDisplayAllClosedMissions}
            style={
              displayNameOfMissionsData === "בוצעו!"
                ? { outline: "1px solid #000" }
                : { outline: "none" }
            }
          >
            משימות שבוצעו
          </button>
        </div>
      </div>
      <div className="manualMissionsFull__filtersWrapper">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="leadType"
            name="leadType"
            value={displayMissionsBranch}
            onChange={(e) => setDisplayMissionsBranch(e.target.value)}
            className="manualMissionsFull__radioBtns"
          >
            {props.relCustomerDataObj.businessBranches.length > 0 &&
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
          </RadioGroup>
        </FormControl>
      </div>
      {displayRelMissions.length === 0 ? (
        <div className="manualMissionsFull__noMissionsWrapper">
          <p>אין משימות 😎</p>
        </div>
      ) : (
        <div>
          <p className="manualMissionsFull__amount">
            סה"כ {displayRelMissions && displayRelMissions.length}
          </p>
          <TableContainer
            component={Paper}
            className="activeSubscribers__table"
          >
            <Table className={classesTable.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>

                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    שם מלא
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    סוג משימה
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    תיאור משימה
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    דדליין
                  </TableCell>

                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    מוטלת על איש צוות
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    סניף
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    עריכה מהירה
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    עמוד ליד
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayRelMissions &&
                  displayRelMissions.map((row, index) => (
                    <TableRow
                      key={index}
                      className="manualMissionsFull__tableRow"
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>

                      <TableCell align="left">
                        <span>{row.name}</span>
                      </TableCell>
                      <TableCell align="left">
                        {row.manualTypeMission}
                      </TableCell>
                      <TableCell align="left">
                        {row.manualMissionDescription}
                      </TableCell>
                      <TableCell align="left">
                        {row.DeadlineDateManualMission}
                      </TableCell>

                      <TableCell align="left">
                        {row.manualMissionAssociatedToTeamMember}
                      </TableCell>
                      <TableCell align="left">{row.branch}</TableCell>
                      <TableCell align="left">
                        <EditIcon
                          fontSize="small"
                          onClick={() =>
                            handleOnClickOpenModalMissionQuickEditGetAndStoreMissionData(
                              row.name,
                              row.manualTypeMission,
                              row.manualMissionDescription,
                              row.DeadlineDateManualMission,
                              row.manualMissionAssociatedToTeamMember,
                              row.manualMissionCreateByTeamMember,
                              row.manualMissionPerformed,
                              row.ID,
                              row.dateManualMissionCreated
                            )
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <PersonIcon
                          fontSize="small"
                          onClick={() => onClickToLeadPage(row.ID)}
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classesModal.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classesModal.paper}>
              <div className="leadFullDisplay__modalSection">
                <div className="leadFullDisplay__modalInputContainer">
                  <h4>משימה לליד</h4>

                  <p> {leadName} </p>
                </div>
                <div className="leadFullDisplay__modalInputContainer">
                  <a
                    href="#"
                    style={{ color: "gray" }}
                    onClick={onClickResetManualMissionAndSetNewCreatedDate}
                  >
                    לחץ כאן לפני יצירת משימה חדשה
                  </a>
                </div>
                <div className="leadFullDisplay__modalInputContainer">
                  <FormControl className={classesSelect.formControl} dir="rtl">
                    <InputLabel id="demo-simple-select-label">
                      סוג משימה
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={updateTypeOfMission}
                      onChange={(e) => setUpdateTypeOfMission(e.target.value)}
                    >
                      <MenuItem
                        value={props.relCustomerDataObj.missionTypes[0]}
                      >
                        {props.relCustomerDataObj.missionTypes[0]}
                      </MenuItem>
                      <MenuItem
                        value={props.relCustomerDataObj.missionTypes[1]}
                      >
                        {props.relCustomerDataObj.missionTypes[1]}
                      </MenuItem>
                      <MenuItem
                        value={props.relCustomerDataObj.missionTypes[2]}
                      >
                        {props.relCustomerDataObj.missionTypes[2]}
                      </MenuItem>
                      <MenuItem
                        value={props.relCustomerDataObj.missionTypes[3]}
                      >
                        {props.relCustomerDataObj.missionTypes[3]}
                      </MenuItem>
                      <MenuItem
                        value={props.relCustomerDataObj.missionTypes[4]}
                      >
                        {props.relCustomerDataObj.missionTypes[4]}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="leadFullDisplay__modalInputContainer">
                  <TextField
                    id="standard-basic"
                    label="תיאור משימה"
                    multiline
                    rows={4}
                    fullWidth={true}
                    dir="rtl"
                    onChange={(e) =>
                      setUpdateMissionDescription(e.target.value)
                    }
                    value={updateMissionDescription}
                  />
                </div>

                <div className="leadFullDisplay__modalInputContainer">
                  <TextField
                    id="standard-basic"
                    label="משימה נוצרה על ידי איש צוות"
                    fullWidth={true}
                    dir="rtl"
                    onChange={(e) =>
                      setUpdateMissionCreatedByTeamMember(e.target.value)
                    }
                    value={updateMissionCreatedByTeamMember}
                  />
                </div>

                <div className="leadFullDisplay__modalInputContainer">
                  {dispalayWarningMessageMissionWithoutDeadline && (
                    <div
                      id="leadFullDisplay__deadlineMissionMessageWrapper"
                      style={{
                        color: "red",
                        margin: "18px 0 10px 0",
                      }}
                    >
                      <NotificationImportantIcon />
                      <p>לא מומלץ לעדכן משימה ללא דדליין</p>
                    </div>
                  )}

                  <TextField
                    id="date"
                    label="מועד אחרון לביצוע משימה"
                    type="date"
                    required
                    defaultValue="2021-01-1"
                    todayLabel="היום"
                    value={updateDeadlineMission}
                    onChange={(e) => setUpdateDeadlineMission(e.target.value)}
                    className={classesDatePicker.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div className="leadFullDisplay__modalInputContainer">
                  <p dir="rtl">משימה בוצעה?</p>
                  <FormControlLabel
                    dir="rtl"
                    control={
                      <Checkbox
                        checked={updateMissionPerform}
                        color="primary"
                        name="updateMissionPerform"
                        onChange={(e) =>
                          setUpdateMissionPerform(e.target.checked)
                        }
                      />
                    }
                    label="בוצעה"
                  />
                </div>
                {updateMissionPerform && (
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="date"
                      label="תאריך ביצוע משימה"
                      type="date"
                      defaultValue="2020-05-24"
                      todayLabel="היום"
                      value={updateDateMissionPerform}
                      onChange={(e) =>
                        setUpdateDateMissionPerform(e.target.value)
                      }
                      className={classesDatePicker.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                )}

                <div className="leadFullDisplay__modalInputContainer">
                  <TextField
                    id="standard-basic"
                    label="משימה מוטלת על איש צוות"
                    fullWidth={true}
                    dir="rtl"
                    onChange={(e) =>
                      setUpdateMissionAssociateToTeamMember(e.target.value)
                    }
                    value={updateMissionAssociateToTeamMember}
                  />
                </div>
              </div>

              {/* end .__modalSection */}

              <div className="leadFullDisplay__modalSection">
                {showLoadingUpdate ? (
                  <div
                    className="leadFullDisplay__modalInputContainer"
                    style={{ margin: "1rem 0" }}
                  >
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <div
                    className="leadFullDisplay__modalInputContainer"
                    style={{ margin: "1rem 0" }}
                  >
                    <Button variant="contained" onClick={updateTheLeadReq}>
                      עדכון משימה
                    </Button>
                  </div>
                )}
                {openAlertSuccess && (
                  <Alert dir="rtl" severity="success">
                    המשימה עודכנה בהצלחה!
                  </Alert>
                )}
                {openAlertError && (
                  <Alert dir="rtl" severity="error">
                    שגיאה, המשימה לא עודכנה, אנא נסה שנית.
                  </Alert>
                )}
              </div>
              {/* end .__modalSection */}
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default ManualMissionsFull;
