import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  convertDateFromDatePickerToNormalDateFormat,
  getCurrentDate,
  getCurrentHour,
} from "../../functions";

// imports material ui
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FacebookIcon from "@material-ui/icons/Facebook";
// modal material ui
import { makeStyles } from "@material-ui/core/styles";

import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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
    height: "90%",
  },
}));

const useStylesModalDelete = makeStyles((theme) => ({
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

const useStylesLoading = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
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

function LeadFullDisplay1(props) {
  // GET ID OF LEAD
  const { id } = useParams();

  // MODAL
  const classesModal = useStylesModal();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //MODAL DELETE
  const classesModalDelete = useStylesModalDelete();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  // LOADING DELETE
  const [showLoadingDelete, setShowLoadingDelete] = useState(false);

  // ALERT MESSAGE DELETE
  const [openAlertSuccessDelete, setOpenAlertSuccessDelete] = useState(false);
  const [openAlertErrorDelete, setOpenAlertErrorDelete] = useState(false);

  // API DELETE FUNCTION REQUEST
  const deleteTheLeadReq = async () => {
    setShowLoadingDelete(true);
    const deleteRowInDataSheet = await axios
      .delete(`${props.relCrudApiUrl && props.relCrudApiUrl}/${id - 1}`)
      .then((res) => {
        console.log(res);
        setShowLoadingDelete(false);
        setOpenAlertSuccessDelete(true);

        setTimeout(function () {
          setOpenAlertSuccessDelete(false);
          handleCloseModalDelete();
          window.location.href = "/";
        }, 1200);
      })
      .catch((err) => {
        console.log(err);
        setShowLoadingDelete(false);
        setOpenAlertErrorDelete(true);
        setTimeout(function () {
          setOpenAlertErrorDelete(false);
          handleCloseModalDelete();
        }, 1200);
      });
  };

  // TOOLTIP
  const classesToolTip = useStylesToolTip();

  // LOADING UPDATE
  const classesLoading = useStylesLoading();
  const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);

  // ALERT MESSAGE
  const classesAlert = useStylesAlert();
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  // UPDATE NAME
  const [updateName, setUpdateName] = useState("");
  const onChangeUpdateName = (e) => {
    setUpdateName(e.target.value);
  };

  // UPDATE EMAIL
  const [updateEmail, setUpdateEmail] = useState("");
  const onChangeUpdateEmail = (e) => {
    setUpdateEmail(e.target.value);
  };

  // UPDATE TEL
  const [updateTel, setUpdateTel] = useState("");
  const onChangeUpdateTel = (e) => {
    setUpdateTel(e.target.value);
  };

  // UPDATE RELEVANT BRANCH
  const [updateRelevantBranch, setUpdateRelevantBranch] = useState("");
  const [
    updateReleventBranchCheckboxes,
    setUpdateRelevantBranchCheckboxes,
  ] = useState({
    checkHadarAm: false,
    checkTzoran: false,
  });
  const onChangeRelevantBranchCheckboxes = (e) => {
    setUpdateRelevantBranchCheckboxes({
      ...updateReleventBranchCheckboxes,
      [e.target.name]: e.target.checked,
    });
  };
  useEffect(() => {
    if (updateRelevantBranch === "הדר עם, צורן") {
      setUpdateRelevantBranchCheckboxes({
        checkHadarAm: true,
        checkTzoran: true,
      });
    } else if (updateRelevantBranch === "הדר עם") {
      setUpdateRelevantBranchCheckboxes({
        checkHadarAm: true,
        checkTzoran: false,
      });
    } else if (updateRelevantBranch === "צורן") {
      setUpdateRelevantBranchCheckboxes({
        checkHadarAm: false,
        checkTzoran: true,
      });
    }
  }, [updateRelevantBranch]);
  useEffect(() => {
    if (
      updateReleventBranchCheckboxes.checkHadarAm &&
      updateReleventBranchCheckboxes.checkTzoran
    ) {
      setUpdateRelevantBranch("הדר עם, צורן");
    } else if (
      updateReleventBranchCheckboxes.checkHadarAm &&
      updateReleventBranchCheckboxes.checkTzoran === false
    ) {
      setUpdateRelevantBranch("הדר עם");
    } else if (
      updateReleventBranchCheckboxes.checkHadarAm === false &&
      updateReleventBranchCheckboxes.checkTzoran
    ) {
      setUpdateRelevantBranch("צורן");
    } else {
      setUpdateRelevantBranch("");
    }
  }, [updateReleventBranchCheckboxes]);

  // UPDATE LEAD SOURCE
  const classesSelect = useStylesSelect();
  const [updateLeadSource, setUpdateLeadSource] = useState("");
  const onChangeUpdateLeadSource = (event) => {
    setUpdateLeadSource(event.target.value);
  };

  // UPDATE DANCE TYPE
  const [updateDanceType, setUpdateDanceType] = useState("");
  const [updateDanceTypeCheckboxes, setUpdateDanceTypeCheckboxes] = useState({
    hipHop: [false, "היפ הופ"],
    modern: [false, "מודרני"],
    balet: [false, "בלט"],
  });

  useEffect(() => {
    convertDanceTypeStringToObj();
  }, [updateDanceType]);

  const convertDanceTypeStringToObj = () => {
    let stringToArr = updateDanceType.split(",");
    let hipHop1 = [false, "היפ הופ"];
    let modern1 = [false, "מודרני"];
    let balet1 = [false, "בלט"];
    for (let i = 0; i < stringToArr.length; i++) {
      if (stringToArr[i] === "היפ הופ") {
        hipHop1 = [true, "היפ הופ"];
      }

      if (stringToArr[i] === "מודרני") {
        modern1 = [true, "מודרני"];
      }

      if (stringToArr[i] === "בלט") {
        balet1 = [true, "בלט"];
      }
    }
    setUpdateDanceTypeCheckboxes({
      hipHop: hipHop1,
      modern: modern1,
      balet: balet1,
    });
  };

  const [
    checkIfOnChangeFuncExecuted,
    setCheckIfOnChangeFuncExecuted,
  ] = useState(false);
  const [
    updateDanceTypeAfterOnChange,
    setUpdateDanceTypeAfterOnChange,
  ] = useState(false);
  const [
    updateDanceTypeAfterOnChangeCheckboxes,
    setUpdateDanceTypeAfterOnChangeCheckboxes,
  ] = useState(updateDanceTypeCheckboxes);
  useEffect(() => {
    setUpdateDanceTypeAfterOnChangeCheckboxes(updateDanceTypeCheckboxes);
  }, [updateDanceTypeCheckboxes]);

  const onChangeUpdateDanceTypeCheckboxes = (event) => {
    setCheckIfOnChangeFuncExecuted(true);

    setUpdateDanceTypeAfterOnChangeCheckboxes({
      ...updateDanceTypeAfterOnChangeCheckboxes,
      [event.target.name]: [event.target.checked, event.target.value],
    });
  };

  const createStringFromUpdatedDanceTypeObj = () => {
    let varOfRelDanceTypes = [];
    for (const property in updateDanceTypeAfterOnChangeCheckboxes) {
      if (updateDanceTypeAfterOnChangeCheckboxes[property][0] === true) {
        varOfRelDanceTypes.push(
          updateDanceTypeAfterOnChangeCheckboxes[property][1]
        );
      }
      setUpdateDanceTypeAfterOnChange(varOfRelDanceTypes.toString());
    }
  };
  useEffect(() => {
    createStringFromUpdatedDanceTypeObj();
  }, [updateDanceTypeAfterOnChangeCheckboxes]);

  // UPDATE AGE
  const [updateAge, setUpdateAge] = useState("");
  const onchangeUpdateAge = (event) => {
    setUpdateAge(event.target.value);
  };

  // GET ADDED DATE AND ADDED HOURE
  const [addedDate, setAddedDate] = useState("");
  const [addedHour, setAddedHour] = useState("");

  // UPDATE LEAD STEP
  const [updateLeadStep, setUpdateLeadStep] = useState("");
  const onchangeUpdateLeadStep = (event) => {
    setUpdateLeadStep(event.target.value);
  };

  // UPDATE RECOMMENDED MISSION ACCORDING TO LEAD STEP
  const [updateRecommendedMission, setUpdateRecommendedMission] = useState("");
  const updateRocommendedMissionAccordingToLeadStep = () => {
    if (updateLeadStep === "מתעניין") {
      setUpdateRecommendedMission("לקבוע מועד שיעור ניסיון");
    } else if (updateLeadStep === "הוזמן לשיעור ניסיון") {
      setUpdateRecommendedMission("לתזכר שיעור ניסיון");
    } else if (updateLeadStep === "היה בשיעור ניסיון") {
      setUpdateRecommendedMission("לרשום כמנוי קבוע");
    } else if (updateLeadStep === "נרשם כמנוי") {
      setUpdateRecommendedMission("אין משימה מומלצת לשלב זה");
    }
  };
  useEffect(() => {
    updateRocommendedMissionAccordingToLeadStep();
  }, [updateLeadStep]);

  // UPDATE - IS THE LEAD RELEVANT?
  const [updateIsTheLeadRelevant, setUpdateIsTheLeadRelevant] = useState(false);
  const onchangeUpdateIsTheLeadRelevant = (e) => {
    setUpdateIsTheLeadRelevant(e.target.checked);
  };

  // UPDATE - LAST DATE OF UPDATING
  const [lastCurrentUpdateDate, setLastCurrentUpdateDate] = useState("");
  const [lastCurrentUpdateHour, setLastCurrentUpdateHour] = useState("");

  // MANUAL MISSION TYPE OF MISSION
  const [manualMissionTypeOfMission, setManualMissionTypeOfMission] = useState(
    ""
  );
  const onChangeManualMissionTypeOfMission = (event) => {
    setManualMissionTypeOfMission(event.target.value);
  };

  // MANUAL MISSION - MISSION DESCRIPTION
  const [manualMissionDescription, setManualMissionDescription] = useState("");
  const onChangeManualMissionDescription = (event) => {
    setManualMissionDescription(event.target.value);
  };

  // MANUAL MISSION CREATED BY TEAM MEMBER
  const [
    manualMissionCreatedByTeamMember,
    setManualMissionCreatedByTeamMember,
  ] = useState("");
  const onChangeManualMissionCreateByTeamMember = (event) => {
    setManualMissionCreatedByTeamMember(event.target.value);
  };

  // MANUAL MISSION DEADLINE DATE
  const classesDatePicker = useStylesDatePicker();
  const [manualMissionDeadlineDate, setManualMissionDeadlineDate] = useState(
    ""
  );
  const [
    manualMissionDeadlineDateNewFormat,
    setManualMissionDeadlineDateNewFormat,
  ] = useState("");
  const onChangeManualMissionDeadlineDate = (event) => {
    setManualMissionDeadlineDate(event.target.value);
  };

  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      manualMissionDeadlineDate,
      setManualMissionDeadlineDateNewFormat
    );
  }, [manualMissionDeadlineDate]);

  // MANUAL MISSION - MISSION PERFORMED?
  const [manualMissionPerformed, setManualMissionPerformed] = useState(false);
  const onChangeManualMissionPerformed = (e) => {
    setManualMissionPerformed(e.target.checked);
  };

  // MANUAL MISSION PERFORMED DATE
  const [manualMissionPerformedDate, setManualMissionPerformedDate] = useState(
    ""
  );
  const onchangeManualMissionPerformedDate = (event) => {
    setManualMissionPerformedDate(event.target.value);
  };
  const [
    manualMissionPerformedDateNewFormat,
    setManualMissionPerformedDateNewFormat,
  ] = useState("");

  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      manualMissionPerformedDate,
      setManualMissionPerformedDateNewFormat
    );
  }, [manualMissionPerformedDate]);

  // MANUAL MISSION ASSOCIATED TO TEAM MEMBER
  const [
    manualMissionAssociatedToTeamMember,
    setManualMissionAssociatedToTeamMember,
  ] = useState("");

  const onChangeManualMissionAssociatedToTeamMember = (event) => {
    setManualMissionAssociatedToTeamMember(event.target.value);
  };

  // MANUAL MISSION CREATED DATE
  const [manulMissionCreatedDate, setManualMissionCreatedDate] = useState("");
  const onClickResetManualMissionAndSetNewCreatedDate = (e) => {
    e.preventDefault();
    setManualMissionTypeOfMission("");
    setManualMissionDescription("");
    setManualMissionCreatedByTeamMember("");
    setManualMissionDeadlineDate("");
    setManualMissionPerformed(false);
    setManualMissionPerformedDate("");
    setManualMissionAssociatedToTeamMember("");

    setManualMissionCreatedDate(getCurrentDate());
    alert("תאריך יצירת משימה התעדכן לתאריך של היום");
  };

  // UPDATE EVENT 1 ACTION TAKEN
  const [updateEvent1ActionTaken, setUpdateEvent1ActionTaken] = useState("");
  const onChangeUpdateEvent1ActionTaken = (event) => {
    setUpdateEvent1ActionTaken(event.target.value);
  };

  // UPDATE EVENT 1 DATA OF EVENT
  const [updateEvent1Date, setUpdateEvent1Date] = useState("");
  const onChangeUpdateEvent1Date = (event) => {
    setUpdateEvent1Date(event.target.value);
  };
  const [updateEvent1DateNewFormat, setUpdateEvent1DateNewFormat] = useState(
    ""
  );
  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      updateEvent1Date,
      setUpdateEvent1DateNewFormat
    );
  }, [updateEvent1Date]);

  // UPDATE EVENT 1 - STATUS EVENT
  const [updateEvent1StatsEvent, setUpdateEvent1StatsEvent] = useState("");
  const onChangeUpdateEvent1StatusEvent = (event) => {
    setUpdateEvent1StatsEvent(event.target.value);
  };

  // UPDATE EVENT 2 ACTION TAKEN
  const [updateEvent2ActionTaken, setUpdateEvent2ActionTaken] = useState("");
  const onChangeUpdateEvent2ActionTaken = (event) => {
    setUpdateEvent2ActionTaken(event.target.value);
  };

  // UPDATE EVENT 2 DATA OF EVENT
  const [updateEvent2Date, setUpdateEvent2Date] = useState("");
  const onChangeUpdateEvent2Date = (event) => {
    setUpdateEvent2Date(event.target.value);
  };
  const [updateEvent2DateNewFormat, setUpdateEvent2DateNewFormat] = useState(
    ""
  );
  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      updateEvent2Date,
      setUpdateEvent2DateNewFormat
    );
  }, [updateEvent2Date]);

  // UPDATE EVENT 2 - STATUS EVENT
  const [updateEvent2StatsEvent, setUpdateEvent2StatsEvent] = useState("");
  const onChangeUpdateEvent2StatusEvent = (event) => {
    setUpdateEvent2StatsEvent(event.target.value);
  };

  // UPDATE LEAD PURCHASED
  const [updateLeadPurchased, setUpdateLeadPurchased] = useState(false);
  const onchangeUpdateLeadPurchased = (e) => {
    setUpdateLeadPurchased(e.target.checked);
  };

  // UPDATE PURCHASED AMOUNT
  const [updatePurchasedAmount, setUpdatePurchasedAmount] = useState("");
  const onChangeUpdatePurchasedAmount = (event) => {
    setUpdatePurchasedAmount(event.target.value);
  };

  // UPDATE LEAD COST
  const [updateLeadCost, setUpdateLeadCost] = useState("");
  const onChangeUpdateLeadCost = (event) => {
    setUpdateLeadCost(event.target.value);
  };

  // UPDATE LEAD RATE
  const [updateLeadRate, setUpdateLeadRate] = useState("");
  const onChangeUpdateLeadRate = (event) => {
    setUpdateLeadRate(event.target.value);
  };

  // FILTER AND GET DATA ACCORDING TO ID NUMBER
  const filterAndGetRelevantLead = () => {
    if (props.data) {
      let filterTheLead = props.data.filter((lead) => lead.ID == id);
      if (filterTheLead[0] == undefined) {
        // alert("הליד לא קיים בבסיס הנתונים, אתה מועבר לדף הבית");
        window.location.href = "/error-page-404";
      } else {
        // set all updated state with filterd array of lead
        setUpdateName(filterTheLead[0].name);
        setUpdateEmail(filterTheLead[0].email);
        setUpdateTel(filterTheLead[0].tel);
        setUpdateRelevantBranch(filterTheLead[0].releventBranch);
        setUpdateLeadSource(filterTheLead[0].leadSource);
        setUpdateDanceType(filterTheLead[0].relevantDanceType);
        setUpdateAge(filterTheLead[0].age);
        setAddedDate(filterTheLead[0].addedDate);
        setAddedHour(filterTheLead[0].addedHour);
        setUpdateLeadStep(filterTheLead[0].leadStep);
        setUpdateRecommendedMission(filterTheLead[0].recommendedSystemMission);
        setUpdateIsTheLeadRelevant(filterTheLead[0].isTheLeadRelevant);
        setLastCurrentUpdateDate(filterTheLead[0].lastUpdateDate);
        setLastCurrentUpdateHour(filterTheLead[0].lastUpdateHour);
        setManualMissionCreatedDate(filterTheLead[0].dateManualMissionCreated);
        setManualMissionTypeOfMission(filterTheLead[0].manualTypeMission);
        setManualMissionDescription(filterTheLead[0].manualMissionDescription);
        setManualMissionCreatedByTeamMember(
          filterTheLead[0].manualMissionCreateByTeamMember
        );
        setManualMissionDeadlineDate(
          filterTheLead[0].DeadlineDateManualMission
        );
        setManualMissionPerformed(filterTheLead[0].manualMissionPerformed);
        setManualMissionPerformedDate(
          filterTheLead[0].DateManualMissionPerformed
        );
        setManualMissionAssociatedToTeamMember(
          filterTheLead[0].manualMissionAssociatedToTeamMember
        );
        setUpdateEvent1ActionTaken(filterTheLead[0].event1Interest);
        setUpdateEvent1Date(filterTheLead[0].dateEvent1);
        setUpdateEvent1StatsEvent(filterTheLead[0].statusEvent1);
        setUpdateEvent2ActionTaken(filterTheLead[0].event2WasTrialLesson);
        setUpdateEvent2Date(filterTheLead[0].dateEvent2);
        setUpdateEvent2StatsEvent(filterTheLead[0].statusEvent2);
        setUpdateLeadPurchased(filterTheLead[0].leadPurchased);
        setUpdatePurchasedAmount(filterTheLead[0].PurchasedAmount);
        setUpdateLeadCost(filterTheLead[0].LeadCost);
        setUpdateLeadRate(filterTheLead[0].LeadRate);
      }
    }
  };
  useEffect(() => {
    filterAndGetRelevantLead();
  }, [id, props.data]);

  // API UPDATE REQUEST FUNCTION
  const updateTheLeadReq = async () => {
    setShowLoadingUpdate(true);
    const updateDataSheet = await axios
      .patch(`${props.relCrudApiUrl && props.relCrudApiUrl}/${id - 1}`, {
        ID: id == 1 ? "=ARRAYFORMULA(ROW(A2:A)-1)" : null,
        name: updateName,
        email: updateEmail,
        tel: updateTel,
        releventBranch: updateRelevantBranch,
        leadSource: updateLeadSource,
        relevantDanceType:
          checkIfOnChangeFuncExecuted == false
            ? updateDanceType
            : updateDanceTypeAfterOnChange,
        leadStep: updateLeadStep,
        isTheLeadRelevant: updateIsTheLeadRelevant,
        lastUpdateDate: getCurrentDate(),
        lastUpdateHour: getCurrentHour(),
        dateManualMissionCreated: manulMissionCreatedDate,
        manualTypeMission: manualMissionTypeOfMission,
        manualMissionDescription: manualMissionDescription,
        manualMissionCreateByTeamMember: manualMissionCreatedByTeamMember,
        DeadlineDateManualMission: manualMissionDeadlineDateNewFormat,
        manualMissionPerformed: manualMissionPerformed,
        DateManualMissionPerformed: manualMissionPerformedDateNewFormat,
        manualMissionAssociatedToTeamMember: manualMissionAssociatedToTeamMember,
        event1Interest: updateEvent1ActionTaken,
        dateEvent1: updateEvent1DateNewFormat,
        statusEvent1: updateEvent1StatsEvent,
        event2WasTrialLesson: updateEvent2ActionTaken,
        dateEvent2: updateEvent2DateNewFormat,
        statusEvent2: updateEvent2StatsEvent,
        leadPurchased: updateLeadPurchased,
        PurchasedAmount: updatePurchasedAmount,
        LeadCost: updateLeadCost,
        LeadRate: updateLeadRate,
      })
      .then((res) => {
        console.log(res);
        setShowLoadingUpdate(false);
        setOpenAlertSuccess(true);

        setLastCurrentUpdateDate(getCurrentDate());
        setLastCurrentUpdateHour(getCurrentHour());

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
    <>
      <div className="leadFullDisplay">
        <div className="leadFullDisplay__edit">
          <EditIcon onClick={handleOpenModal} />
          {id == 1 ? (
            <div>זהו הליד הראשון במערכת. לא ניתן למחוק זה אלא רק לערוך.</div>
          ) : (
            <DeleteIcon onClick={handleOpenModalDelete} />
          )}
        </div>

        <div className="leadFullDisplay__modalDeleteContainer">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classesModalDelete.modal}
            open={openModalDelete}
            onClose={handleCloseModalDelete}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModalDelete}>
              <div
                className={classesModalDelete.paper}
                style={{ textAlign: "right" }}
                dir="rtl"
              >
                <div className="leadFullDisplay__modalDeleteSection">
                  <div className="leadFullDisplay__modalDeleteInputContainer">
                    <h2>האם אתה בטוח שאתה רוצה למחוק ליד זה?</h2>
                    <span>לאחר המחיקה לא יהיה ניתן לשחזר את הליד</span>
                  </div>
                </div>
                {/* end .__modalDeleteSection */}

                <div className="leadFullDisplay__modalDeleteSection">
                  {showLoadingDelete ? (
                    <div
                      className="leadFullDisplay__modalDeleteInputContainer"
                      style={{ margin: "1rem 0" }}
                    >
                      <CircularProgress color="secondary" />
                    </div>
                  ) : (
                    <div
                      className="leadFullDisplay__modalDeleteInputContainer"
                      style={{ margin: "1rem 0" }}
                    >
                      <Button variant="contained" onClick={deleteTheLeadReq}>
                        זה בסדר, מחק את הליד!
                      </Button>
                    </div>
                  )}
                  {openAlertSuccessDelete && (
                    <Alert dir="rtl" severity="success">
                      הליד נמחק בהצלחה!
                    </Alert>
                  )}
                  {openAlertErrorDelete && (
                    <Alert dir="rtl" severity="error">
                      שגיאה. היד לא נמחק, אנא נסה שנית.
                    </Alert>
                  )}
                </div>
                {/* end .__modalDeleteSection */}
              </div>
            </Fade>
          </Modal>
        </div>
        {/* end __modalDeleteContainer */}

        <div className="leadFullDisplay__modalContainer">
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
              <div
                className={classesModal.paper}
                style={{ textAlign: "right" }}
              >
                {/* <h2 id="transition-modal-title">עריכת ליד</h2> */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>פרטים כלליים</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="שם ליד"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeUpdateName}
                      value={updateName}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="אימייל"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeUpdateEmail}
                      value={updateEmail}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="טלפון"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeUpdateTel}
                      value={updateTel}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <p>סניף רלוונטי</p>
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={updateReleventBranchCheckboxes.checkHadarAm}
                          color="primary"
                          name="checkHadarAm"
                          onChange={onChangeRelevantBranchCheckboxes}
                        />
                      }
                      label="הדר עם"
                    />
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={updateReleventBranchCheckboxes.checkTzoran}
                          color="primary"
                          name="checkTzoran"
                          onChange={onChangeRelevantBranchCheckboxes}
                        />
                      }
                      label="צורן"
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        מקור ליד
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateLeadSource}
                        onChange={onChangeUpdateLeadSource}
                      >
                        <MenuItem value={"אתר"}>אתר</MenuItem>
                        <MenuItem value={"טלפוני"}>טלפוני</MenuItem>
                        <MenuItem value={"אחר"}>אחר</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <p>סוג ריקוד</p>
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={
                            checkIfOnChangeFuncExecuted == false
                              ? updateDanceTypeCheckboxes.hipHop[0]
                              : updateDanceTypeAfterOnChangeCheckboxes.hipHop[0]
                          }
                          color="primary"
                          name="hipHop"
                          value="היפ הופ"
                          onChange={onChangeUpdateDanceTypeCheckboxes}
                        />
                      }
                      label="היפ הופ"
                    />
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={
                            checkIfOnChangeFuncExecuted == false
                              ? updateDanceTypeCheckboxes.modern[0]
                              : updateDanceTypeAfterOnChangeCheckboxes.modern[0]
                          }
                          color="primary"
                          name="modern"
                          value="מודרני"
                          onChange={onChangeUpdateDanceTypeCheckboxes}
                        />
                      }
                      label="מודרני"
                    />
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={
                            checkIfOnChangeFuncExecuted == false
                              ? updateDanceTypeCheckboxes.balet[0]
                              : updateDanceTypeAfterOnChangeCheckboxes.balet[0]
                          }
                          color="primary"
                          name="balet"
                          value="בלט"
                          onChange={onChangeUpdateDanceTypeCheckboxes}
                        />
                      }
                      label="בלט"
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      dir="rtl"
                      className={classesSelect.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">
                        שכבת גיל
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateAge}
                        onChange={onchangeUpdateAge}
                      >
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"א"}>א</MenuItem>
                        <MenuItem value={"ב"}>ב</MenuItem>
                        <MenuItem value={"ג"}>ג</MenuItem>
                        <MenuItem value={"ד"}>ד</MenuItem>
                        <MenuItem value={"ה"}>ה</MenuItem>
                        <MenuItem value={"ו"}>ו</MenuItem>
                        <MenuItem value={"ז"}>ז</MenuItem>
                        <MenuItem value={"ח"}>ח</MenuItem>
                        <MenuItem value={"ט"}>ט</MenuItem>
                        <MenuItem value={"י"}>י</MenuItem>
                        <MenuItem value={"יא"}>יא</MenuItem>
                        <MenuItem value={"יב"}>יב</MenuItem>
                        <MenuItem value={"18+"}>18+</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* end .__modalSection */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>שלב ורלוונטיות ליד</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        שלב ליד בתהליך מכירה
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateLeadStep}
                        onChange={onchangeUpdateLeadStep}
                      >
                        <MenuItem value={"מתעניין"}>מתעניין</MenuItem>
                        <MenuItem value={"הוזמן לשיעור ניסיון"}>
                          הוזמן לשיעור ניסיון
                        </MenuItem>
                        <MenuItem value={"היה בשיעור ניסיון"}>
                          היה בשיעור ניסיון
                        </MenuItem>
                        <MenuItem value={"נרשם כמנוי"}>נרשם כמנוי</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <p dir="rtl">האם הליד רלוונטי?</p>
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={updateIsTheLeadRelevant}
                          color="primary"
                          name="updateIsTheLeadRelevant"
                          onChange={onchangeUpdateIsTheLeadRelevant}
                        />
                      }
                      label="רלוונטי"
                    />
                  </div>
                </div>
                {/* end .__modalSection */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>משימה לליד</h4>
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
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        סוג משימה
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={manualMissionTypeOfMission}
                        onChange={onChangeManualMissionTypeOfMission}
                      >
                        <MenuItem value={"קביעת מועד לשיעור ניסיון"}>
                          קביעת מועד לשיעור ניסיון
                        </MenuItem>
                        <MenuItem value={"תזכורת"}>תזכורת</MenuItem>
                        <MenuItem value={"רישום ליד כמנוי קבוע"}>
                          רישום ליד כמנוי קבוע
                        </MenuItem>
                        <MenuItem value={"גביית תשלום"}>גביית תשלום</MenuItem>
                        <MenuItem value={"אחר"}>אחר</MenuItem>
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
                      onChange={onChangeManualMissionDescription}
                      value={manualMissionDescription}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label='משימה נוצרה ע"י איש צוות'
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeManualMissionCreateByTeamMember}
                      value={manualMissionCreatedByTeamMember}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="date"
                      label="מועד אחרון לביצוע משימה"
                      type="date"
                      defaultValue="2021-01-1"
                      todayLabel="היום"
                      value={manualMissionDeadlineDate}
                      onChange={onChangeManualMissionDeadlineDate}
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
                          checked={manualMissionPerformed}
                          color="primary"
                          name="updateIsTheLeadRelevant"
                          onChange={onChangeManualMissionPerformed}
                        />
                      }
                      label="בוצעה"
                    />
                  </div>
                  {manualMissionPerformed && (
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="תאריך ביצוע משימה"
                        type="date"
                        defaultValue="2020-05-24"
                        todayLabel="היום"
                        value={manualMissionPerformedDate}
                        onChange={onchangeManualMissionPerformedDate}
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
                      onChange={onChangeManualMissionAssociatedToTeamMember}
                      value={manualMissionAssociatedToTeamMember}
                    />
                  </div>
                </div>
                {/* end .__modalSection */}

                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>אירוע 1 - ליד מתעניין</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        פעולה שהתבצעה
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateEvent1ActionTaken}
                        onChange={onChangeUpdateEvent1ActionTaken}
                      >
                        <MenuItem value={"התקשרנו ללא מענה"}>
                          התקשרנו ללא מענה
                        </MenuItem>
                        <MenuItem value={"התקשרנו ונקבע שיעור ניסיון"}>
                          התקשרנו ונקבע שיעור ניסיון
                        </MenuItem>
                        <MenuItem value={"התקשרנו ולא רלוונטי"}>
                          התקשרנו ולא רלוונטי
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="date"
                      label="תאריך אירוע"
                      type="date"
                      defaultValue="2020-05-24"
                      todayLabel="היום"
                      value={updateEvent1Date}
                      onChange={onChangeUpdateEvent1Date}
                      className={classesDatePicker.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        סטטוס אירוע
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateEvent1StatsEvent}
                        onChange={onChangeUpdateEvent1StatusEvent}
                      >
                        <MenuItem value={"קנה"}>קנה</MenuItem>
                        <MenuItem value={"מחכה לתיאום פגישה"}>
                          מחכה לתיאום פגישה
                        </MenuItem>
                        <MenuItem value={"מתעניין"}>מתעניין</MenuItem>
                        <MenuItem value={"חושב"}>חושב</MenuItem>
                        <MenuItem value={"לא מעוניין"}>לא מעוניין</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* end .__modalSection */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>אירוע 2 - ליד היה בשיעור ניסיון</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        פעולה שהתבצעה
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateEvent2ActionTaken}
                        onChange={onChangeUpdateEvent2ActionTaken}
                      >
                        <MenuItem value={"הגיע לשיעור ניסיון"}>
                          הגיע לשיעור ניסיון
                        </MenuItem>
                        <MenuItem value={"הגיע לשיעור ניסיון - ליצור קשר"}>
                          הגיע לשיעור ניסיון - ליצור קשר
                        </MenuItem>
                        <MenuItem value={"הגיע לשיעור ניסיון - מחכה לרישום"}>
                          הגיע לשיעור ניסיון - מחכה לרישום
                        </MenuItem>
                        <MenuItem value={"הגיע לשיעור ניסיון - לא רלוונטי"}>
                          הגיע לשיעור ניסיון - לא רלוונטי
                        </MenuItem>
                        <MenuItem
                          value={
                            "הגיע לשיעור ניסיון - מעוניין בשיעור ניסיון נוסף"
                          }
                        >
                          הגיע לשיעור ניסיון - מעוניין בשיעור ניסיון נוסף
                        </MenuItem>
                        <MenuItem value={"מעוניין ביצירת קשר נוספת"}>
                          מעוניין ביצירת קשר נוספת
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="date"
                      label="תאריך אירוע"
                      type="date"
                      defaultValue="2020-05-24"
                      todayLabel="היום"
                      value={updateEvent2Date}
                      onChange={onChangeUpdateEvent2Date}
                      className={classesDatePicker.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        סטטוס אירוע
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateEvent2StatsEvent}
                        onChange={onChangeUpdateEvent2StatusEvent}
                      >
                        <MenuItem value={"קנה"}>קנה</MenuItem>
                        <MenuItem value={"מחכה לתיאום פגישה"}>
                          מחכה לתיאום פגישה
                        </MenuItem>
                        <MenuItem value={"מתעניין"}>מתעניין</MenuItem>
                        <MenuItem value={"חושב"}>חושב</MenuItem>
                        <MenuItem value={"לא מעוניין"}>לא מעוניין</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {/* end .__modalSection */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>רכישה</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <p dir="rtl">האם הליד רכש?</p>
                    <FormControlLabel
                      dir="rtl"
                      control={
                        <Checkbox
                          checked={updateLeadPurchased}
                          color="primary"
                          name="updateIsTheLeadRelevant"
                          onChange={onchangeUpdateLeadPurchased}
                        />
                      }
                      label="התבצעה רכישה"
                    />
                  </div>
                  {updateLeadPurchased && (
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="standard-basic"
                        label="סכום רכישה"
                        fullWidth={true}
                        dir="rtl"
                        type="number"
                        onChange={onChangeUpdatePurchasedAmount}
                        value={updatePurchasedAmount}
                      />
                    </div>
                  )}
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="עלות ליד"
                      fullWidth={true}
                      dir="rtl"
                      type="number"
                      onChange={onChangeUpdateLeadCost}
                      value={updateLeadCost}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      dir="rtl"
                      className={classesSelect.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">
                        דירוג ליד
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateLeadRate}
                        onChange={onChangeUpdateLeadRate}
                      >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                      </Select>
                    </FormControl>
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
                        עדכון ליד
                      </Button>
                    </div>
                  )}
                  {openAlertSuccess && (
                    <Alert dir="rtl" severity="success">
                      הליד עודכן בהצלחה!
                    </Alert>
                  )}
                  {openAlertError && (
                    <Alert dir="rtl" severity="error">
                      שגיאה. היד לא עודכן, אנא נסה שנית.
                    </Alert>
                  )}
                </div>
                {/* end .__modalSection */}
              </div>
            </Fade>
          </Modal>
        </div>

        <div className="leadFullDisplay__section">
          <h3 className="leadFullDisplay__subtitle">פרטים כלליים</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שם מלא</p>
                <p className="leadFullDisplay__content--text">{updateName}</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">כתובת אימייל</p>
                <p className="leadFullDisplay__content--text">{updateEmail}</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">טלפון</p>
                <p className="leadFullDisplay__content--text">{updateTel}</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סניף רלוונטי</p>
                <p className="leadFullDisplay__content--text">
                  {updateRelevantBranch}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">מקור ליד</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadSource}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  מתעניין בריקוד
                </p>
                <p className="leadFullDisplay__content--text">
                  {checkIfOnChangeFuncExecuted == false
                    ? updateDanceType
                    : updateDanceTypeAfterOnChange}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שכבת גיל</p>
                <p className="leadFullDisplay__content--text">{updateAge}</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ליד התווסף בתאריך
                </p>
                <p className="leadFullDisplay__content--text">
                  {`${addedHour}  ${addedDate}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <Tooltip title="בסעיף זה ישנם נתונים המועברים לפייסבוק על מנת לשפר את הפרסום שלך">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>

          <h3 className="leadFullDisplay__subtitle">שלב ורלוונטיות ליד</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שלב ליד</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadStep}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  משימה ממומלצת לשלב זה
                </p>
                <p className="leadFullDisplay__content--text">
                  {updateRecommendedMission}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  האם הליד רלוונטי?
                </p>
                <p className="leadFullDisplay__content--text">
                  {updateIsTheLeadRelevant === null
                    ? "לא (ברירת מחדל)"
                    : updateIsTheLeadRelevant === false
                    ? "לא (ברירת מחדל)"
                    : updateIsTheLeadRelevant === "FALSE"
                    ? "לא (ברירת מחדל)"
                    : updateIsTheLeadRelevant === "TRUE"
                    ? "כן"
                    : updateIsTheLeadRelevant === true
                    ? "כן"
                    : updateIsTheLeadRelevant}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  תאריך עדכון אחרון של ליד זה
                </p>
                <p className="leadFullDisplay__content--text">
                  {`${lastCurrentUpdateHour}  ${lastCurrentUpdateDate}`}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <h3 className="leadFullDisplay__subtitle">משימה לליד</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  משימה נוצרה בתאריך
                </p>
                <p className="leadFullDisplay__content--text">
                  {manulMissionCreatedDate}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סוג משימה</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionTypeOfMission}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">תיאור משימה</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionDescription}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  משימה נוצרה ע"י איש צוות
                </p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionCreatedByTeamMember}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  דדליין ביצוע משימה
                </p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionDeadlineDateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">משימה בוצעה?</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionPerformed === null
                    ? "לא (ברירת מחדל)"
                    : manualMissionPerformed == ""
                    ? "לא (ברירת מחדל)"
                    : manualMissionPerformed === false
                    ? "לא (ברירת מחדל)"
                    : manualMissionPerformed === "FALSE"
                    ? "לא (ברירת מחדל)"
                    : manualMissionPerformed === "TRUE"
                    ? "כן"
                    : manualMissionPerformed === true
                    ? "כן"
                    : updateIsTheLeadRelevant}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">בוצעה בתאריך</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionPerformedDateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  משימה מוטלת על איש צוות
                </p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionAssociatedToTeamMember}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <Tooltip title="בסעיף זה ישנם נתונים המועברים לפייסבוק על מנת לשפר את הפרסום שלך">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>
          <h3 className="leadFullDisplay__subtitle">אירוע 1</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שם אירוע</p>
                <p
                  className="leadFullDisplay__content--text"
                  style={{ color: "gray" }}
                >
                  ליד מתעניין
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">פעולה שהתבצעה</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent1ActionTaken}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">תאריך אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent1DateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סטטוס אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent1StatsEvent}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <Tooltip title="בסעיף זה ישנם נתונים המועברים לפייסבוק על מנת לשפר את הפרסום שלך">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>
          <h3 className="leadFullDisplay__subtitle">אירוע 2</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שם אירוע</p>
                <p
                  className="leadFullDisplay__content--text"
                  style={{ color: "gray" }}
                >
                  ליד היה בשיעור ניסיון
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">פעולה שהתבצעה</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent2ActionTaken}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">תאריך אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent2DateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סטטוס אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent2StatsEvent}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <Tooltip title="בסעיף זה ישנם נתונים המועברים לפייסבוק על מנת לשפר את הפרסום שלך">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>
          <h3 className="leadFullDisplay__subtitle">רכישה</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">ליד רכש?</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadPurchased === null
                    ? "לא (ברירת מחדל)"
                    : updateLeadPurchased === false
                    ? "לא (ברירת מחדל)"
                    : updateLeadPurchased === "FALSE"
                    ? "לא (ברירת מחדל)"
                    : updateLeadPurchased === "TRUE"
                    ? "כן"
                    : updateLeadPurchased === true
                    ? "כן"
                    : updateLeadPurchased}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סכום רכישה</p>
                <p className="leadFullDisplay__content--text">
                  {updatePurchasedAmount === null
                    ? ""
                    : `${updatePurchasedAmount} ש"ח`}
                  {/*`${updatePurchasedAmount} ש"ח`*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">עלות ליד</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadCost === null ? "" : `${updateLeadCost} ש"ח`}
                  {/*`${updateLeadCost} ש"ח`*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  דירוג ליד 1-10
                </p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadRate}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadFullDisplay1;
