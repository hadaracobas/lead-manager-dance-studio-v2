import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  convertDateFromDatePickerToNormalDateFormat,
  getCurrentDate,
  getCurrentHour,
  convertDateToNewFormat,
} from "../../functions";
import SimpleTabs from "../SimpleTabs";

// imports material ui
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FacebookIcon from "@material-ui/icons/Facebook";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";
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

  // UPDATE BRANCH
  const [updateBranch, setUpdateBranch] = useState("");
  const onChangeUpdateBranch = (e) => {
    setUpdateBranch(e.target.value);
  };

  // UPDATE LEAD SOURCE
  const classesSelect = useStylesSelect();
  const [updateLeadSource, setUpdateLeadSource] = useState("");
  const onChangeUpdateLeadSource = (event) => {
    setUpdateLeadSource(event.target.value);
  };

  // GET ADDED DATE AND ADDED HOURE
  const [addedDate, setAddedDate] = useState("");
  const [addedHour, setAddedHour] = useState("");

  // UPDATE LEAD STEP
  const [updateLeadStep, setUpdateLeadStep] = useState("");
  const onchangeUpdateLeadStep = (event) => {
    setUpdateLeadStep(event.target.value);
  };

  // UPDATE LEAD GROUP
  const [updateLeadGroup, setUpdateLeadGroup] = useState("");
  const onchangeUpdateLeadGroup = (event) => {
    setUpdateLeadGroup(event.target.value);
  };

  // UPDATE RECOMMENDED MISSION ACCORDING TO LEAD STEP
  const [updateRecommendedMission, setUpdateRecommendedMission] = useState("");
  const updateRocommendedMissionAccordingToLeadStep = () => {
    if (updateLeadStep === props.relCustomerDataObj.funnelSteps[0]) {
      setUpdateRecommendedMission(
        props.relCustomerDataObj.recommendedMissionBySystemToLeadStep[0]
      );
    } else if (updateLeadStep === props.relCustomerDataObj.funnelSteps[1]) {
      setUpdateRecommendedMission(
        props.relCustomerDataObj.recommendedMissionBySystemToLeadStep[1]
      );
    } else if (updateLeadStep === props.relCustomerDataObj.funnelSteps[2]) {
      setUpdateRecommendedMission(
        props.relCustomerDataObj.recommendedMissionBySystemToLeadStep[2]
      );
    } else if (updateLeadStep === props.relCustomerDataObj.funnelSteps[3]) {
      setUpdateRecommendedMission(
        props.relCustomerDataObj.recommendedMissionBySystemToLeadStep[3]
      );
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
  const [manualMissionTypeOfMission, setManualMissionTypeOfMission] =
    useState("");
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
  const [manualMissionDeadlineDate, setManualMissionDeadlineDate] =
    useState("");
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
  const [manualMissionPerformedDate, setManualMissionPerformedDate] =
    useState("");
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
    alert("?????????? ?????????? ?????????? ???????????? ???????????? ???? ????????");
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

  //UPDATE ACTIVITY LOGS
  /*
  const [
    getEventHappandToActivityLogFromDatabase,
    setGetEventHappandToActivityLogFromDatabase,
  ] = useState(false);

  const [eventHappendToActivityLog, setEventHappendToActivityLog] = useState(
    false
  );

  const onChangeUpdateEventHappendToActivityLog = (event) => {
    setEventHappendToActivityLog(event.target.value);
  };

  const [
    dateEventHappendToActivityLog,
    setDateEventHappendToActivityLog,
  ] = useState("");

  const onChangeUpdateDateEventHappendToActivityLog = (event) => {
    setDateEventHappendToActivityLog(event.target.value);
  };
  
  const [
    dateEventHappendToActivityLogNewFormat,
    setDateEventHappendToActivityLogNewFormat,
  ] = useState("");
  useEffect(() => {
    convertDateFromDatePickerToNormalDateFormat(
      dateEventHappendToActivityLog,
      setDateEventHappendToActivityLogNewFormat
    );
  }, [dateEventHappendToActivityLog]);
*/
  //---
  //activity log event 2
  const [
    updateEventHappendToActivityLog2,
    setUpdateEventHappendToActivityLog2,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog2 = (e) => {
    setUpdateEventHappendToActivityLog2(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog2,
    setUpdateDateEventHappendToActivityLog2,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog2 = (e) => {
    setUpdateDateEventHappendToActivityLog2(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog2 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog2 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog2]);

  //activity log event 3
  const [
    updateEventHappendToActivityLog3,
    setUpdateEventHappendToActivityLog3,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog3 = (e) => {
    setUpdateEventHappendToActivityLog3(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog3,
    setUpdateDateEventHappendToActivityLog3,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog3 = (e) => {
    setUpdateDateEventHappendToActivityLog3(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog3 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog3 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog3]);

  //activity log event 4
  const [
    updateEventHappendToActivityLog4,
    setUpdateEventHappendToActivityLog4,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog4 = (e) => {
    setUpdateEventHappendToActivityLog4(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog4,
    setUpdateDateEventHappendToActivityLog4,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog4 = (e) => {
    setUpdateDateEventHappendToActivityLog4(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog4 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog4 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog4]);

  //activity log event 5
  const [
    updateEventHappendToActivityLog5,
    setUpdateEventHappendToActivityLog5,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog5 = (e) => {
    setUpdateEventHappendToActivityLog5(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog5,
    setUpdateDateEventHappendToActivityLog5,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog5 = (e) => {
    setUpdateDateEventHappendToActivityLog5(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog5 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog5 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog5]);

  //activity log event 6
  const [
    updateEventHappendToActivityLog6,
    setUpdateEventHappendToActivityLog6,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog6 = (e) => {
    setUpdateEventHappendToActivityLog6(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog6,
    setUpdateDateEventHappendToActivityLog6,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog6 = (e) => {
    setUpdateDateEventHappendToActivityLog6(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog6 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog6 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog6]);

  //activity log event 7
  const [
    updateEventHappendToActivityLog7,
    setUpdateEventHappendToActivityLog7,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog7 = (e) => {
    setUpdateEventHappendToActivityLog7(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog7,
    setUpdateDateEventHappendToActivityLog7,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog7 = (e) => {
    setUpdateDateEventHappendToActivityLog7(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog7 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog7 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog7]);

  //activity log event 8
  const [
    updateEventHappendToActivityLog8,
    setUpdateEventHappendToActivityLog8,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog8 = (e) => {
    setUpdateEventHappendToActivityLog8(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog8,
    setUpdateDateEventHappendToActivityLog8,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog8 = (e) => {
    setUpdateDateEventHappendToActivityLog8(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog8 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog8 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog8]);

  //activity log event 9
  const [
    updateEventHappendToActivityLog9,
    setUpdateEventHappendToActivityLog9,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog9 = (e) => {
    setUpdateEventHappendToActivityLog9(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog9,
    setUpdateDateEventHappendToActivityLog9,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog9 = (e) => {
    setUpdateDateEventHappendToActivityLog9(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog9 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog9 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog9]);

  //activity log event 10
  const [
    updateEventHappendToActivityLog10,
    setUpdateEventHappendToActivityLog10,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog10 = (e) => {
    setUpdateEventHappendToActivityLog10(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog10,
    setUpdateDateEventHappendToActivityLog10,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog10 = (e) => {
    setUpdateDateEventHappendToActivityLog10(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog10 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog10 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog10]);

  //activity log event 11
  const [
    updateEventHappendToActivityLog11,
    setUpdateEventHappendToActivityLog11,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog11 = (e) => {
    setUpdateEventHappendToActivityLog11(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog11,
    setUpdateDateEventHappendToActivityLog11,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog11 = (e) => {
    setUpdateDateEventHappendToActivityLog11(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog11 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog11 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog11]);

  //activity log event 12
  const [
    updateEventHappendToActivityLog12,
    setUpdateEventHappendToActivityLog12,
  ] = useState(false);
  const onChangeUpdateEventHappendToActivityLog12 = (e) => {
    setUpdateEventHappendToActivityLog12(e.target.value);
  };

  const [
    updateDateEventHappendToActivityLog12,
    setUpdateDateEventHappendToActivityLog12,
  ] = useState(false);
  const onChangeUpdateDateEventHappendToActivityLog12 = (e) => {
    setUpdateDateEventHappendToActivityLog12(e.target.value);
  };

  useEffect(() => {
    if (updateEventHappendToActivityLog12 === false) {
      // do nothing
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[0]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[1]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[1]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[2]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[3]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[4]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[5]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[6]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[2]);
      setUpdateIsTheLeadRelevant(false);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[7]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[3]);
      setUpdateLeadPurchased(true);
      setUpdateIsTheLeadRelevant(true);
    } else if (
      updateEventHappendToActivityLog12 === props.relCustomerDataObj.events[8]
    ) {
      setUpdateLeadStep(props.relCustomerDataObj.funnelSteps[0]);
      setUpdateIsTheLeadRelevant(false);
    }
  }, [updateEventHappendToActivityLog12]);

  // handle activity log add event button
  const [addMaxOneEventPerLoad, setAddMaxOneEventPerLoad] = useState(false);

  const onClickAddEventActivityLogInModal = () => {
    setAddMaxOneEventPerLoad(true);
    if (
      updateEventHappendToActivityLog2 === null ||
      updateEventHappendToActivityLog2 === ""
    ) {
      setUpdateEventHappendToActivityLog2(false);
    } else if (
      updateEventHappendToActivityLog3 === null ||
      updateEventHappendToActivityLog3 === ""
    ) {
      setUpdateEventHappendToActivityLog3(false);
    } else if (
      updateEventHappendToActivityLog4 === null ||
      updateEventHappendToActivityLog4 === ""
    ) {
      setUpdateEventHappendToActivityLog4(false);
    } else if (
      updateEventHappendToActivityLog5 === null ||
      updateEventHappendToActivityLog5 === ""
    ) {
      setUpdateEventHappendToActivityLog5(false);
    } else if (
      updateEventHappendToActivityLog6 === null ||
      updateEventHappendToActivityLog6 === ""
    ) {
      setUpdateEventHappendToActivityLog6(false);
    } else if (
      updateEventHappendToActivityLog7 === null ||
      updateEventHappendToActivityLog7 === ""
    ) {
      setUpdateEventHappendToActivityLog7(false);
    } else if (
      updateEventHappendToActivityLog8 === null ||
      updateEventHappendToActivityLog8 === ""
    ) {
      setUpdateEventHappendToActivityLog8(false);
    } else if (
      updateEventHappendToActivityLog9 === null ||
      updateEventHappendToActivityLog9 === ""
    ) {
      setUpdateEventHappendToActivityLog9(false);
    } else if (
      updateEventHappendToActivityLog10 === null ||
      updateEventHappendToActivityLog10 === ""
    ) {
      setUpdateEventHappendToActivityLog10(false);
    } else if (
      updateEventHappendToActivityLog11 === null ||
      updateEventHappendToActivityLog11 === ""
    ) {
      setUpdateEventHappendToActivityLog11(false);
    } else if (
      updateEventHappendToActivityLog12 === null ||
      updateEventHappendToActivityLog12 === ""
    ) {
      setUpdateEventHappendToActivityLog12(false);
    } else {
      alert("?????? ???????????? ?????????? ?????? ?????? ???????? ??-11 ??????????????");
    }
  };

  //DISPLAY MESSAGE MISSION WITHOUT DEADLINE DATE
  const [
    dispalayWarningMessageMissionWithoutDeadline,
    setDispalayWarningMessageMissionWithoutDeadline,
  ] = useState(false);
  useEffect(() => {
    // display message conditionaly
    if (manualMissionDescription !== "" && manualMissionDeadlineDate === "") {
      setDispalayWarningMessageMissionWithoutDeadline(true);
    } else {
      setDispalayWarningMessageMissionWithoutDeadline(false);
    }
    if (manualMissionDescription === "") {
      setManualMissionDeadlineDate("");
    }
  }, [manualMissionDescription, manualMissionDeadlineDate]);

  // RESET-REMOVE NaN/NaN/NaN IN DEADLINE MISSION TEXT
  useEffect(() => {
    if (manualMissionDeadlineDateNewFormat === "NaN/NaN/NaN") {
      setManualMissionDeadlineDateNewFormat("");
    }
  }, [manualMissionDeadlineDateNewFormat]);

  // FILTER AND GET DATA ACCORDING TO ID NUMBER
  const filterAndGetRelevantLead = () => {
    if (props.data) {
      let filterTheLead = props.data.filter((lead) => lead.ID == id);
      if (filterTheLead[0] == undefined) {
        // alert("???????? ???? ???????? ?????????? ??????????????, ?????? ?????????? ?????? ????????");
        window.location.href = "/error-page-404";
      } else {
        // set all updated state with filterd array of lead
        setUpdateName(filterTheLead[0].name);
        setUpdateEmail(filterTheLead[0].email);
        setUpdateTel(filterTheLead[0].tel);
        setUpdateBranch(filterTheLead[0].branch);
        setUpdateLeadGroup(filterTheLead[0].Group);

        //setUpdateRelevantBranch(filterTheLead[0].releventBranch);
        setUpdateLeadSource(filterTheLead[0].leadSource);
        //setUpdateDanceType(filterTheLead[0].relevantDanceType);
        //setUpdateAge(filterTheLead[0].age);
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

        setUpdateLeadPurchased(filterTheLead[0].leadPurchased);
        setUpdatePurchasedAmount(filterTheLead[0].PurchasedAmount);
        setUpdateLeadCost(filterTheLead[0].LeadCost);
        setUpdateLeadRate(filterTheLead[0].LeadRate);
        /*
        setGetEventHappandToActivityLogFromDatabase(
          filterTheLead[0].eventHappenedToActivityLog
        );
*/
        setUpdateEventHappendToActivityLog2(filterTheLead[0].ActivityLog2);
        setUpdateDateEventHappendToActivityLog2(
          filterTheLead[0].DateActivityLog2
        );
        setUpdateEventHappendToActivityLog3(filterTheLead[0].ActivityLog3);
        setUpdateDateEventHappendToActivityLog3(
          filterTheLead[0].DateActivityLog3
        );
        setUpdateEventHappendToActivityLog4(filterTheLead[0].ActivityLog4);
        setUpdateDateEventHappendToActivityLog4(
          filterTheLead[0].DateActivityLog4
        );
        setUpdateEventHappendToActivityLog5(filterTheLead[0].ActivityLog5);
        setUpdateDateEventHappendToActivityLog5(
          filterTheLead[0].DateActivityLog5
        );
        setUpdateEventHappendToActivityLog6(filterTheLead[0].ActivityLog6);
        setUpdateDateEventHappendToActivityLog6(
          filterTheLead[0].DateActivityLog6
        );
        setUpdateEventHappendToActivityLog7(filterTheLead[0].ActivityLog7);
        setUpdateDateEventHappendToActivityLog7(
          filterTheLead[0].DateActivityLog7
        );
        setUpdateEventHappendToActivityLog8(filterTheLead[0].ActivityLog8);
        setUpdateDateEventHappendToActivityLog8(
          filterTheLead[0].DateActivityLog8
        );
        setUpdateEventHappendToActivityLog9(filterTheLead[0].ActivityLog9);
        setUpdateDateEventHappendToActivityLog9(
          filterTheLead[0].DateActivityLog9
        );
        setUpdateEventHappendToActivityLog10(filterTheLead[0].ActivityLog10);
        setUpdateDateEventHappendToActivityLog10(
          filterTheLead[0].DateActivityLog10
        );
        setUpdateEventHappendToActivityLog11(filterTheLead[0].ActivityLog11);
        setUpdateDateEventHappendToActivityLog11(
          filterTheLead[0].DateActivityLog11
        );
        setUpdateEventHappendToActivityLog12(filterTheLead[0].ActivityLog12);
        setUpdateDateEventHappendToActivityLog12(
          filterTheLead[0].DateActivityLog12
        );
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
        tel: "'" + updateTel,
        branch: updateBranch,
        //releventBranch: updateRelevantBranch,
        leadSource: updateLeadSource,
        /*
        relevantDanceType:
          checkIfOnChangeFuncExecuted == false
            ? updateDanceType
            : updateDanceTypeAfterOnChange,
        */
        leadStep: updateLeadStep,
        isTheLeadRelevant: updateIsTheLeadRelevant,
        recommendedSystemMission: updateRecommendedMission,
        lastUpdateDate: getCurrentDate(),
        lastUpdateHour: getCurrentHour(),
        dateManualMissionCreated: manulMissionCreatedDate,
        manualTypeMission: manualMissionTypeOfMission,
        manualMissionDescription: manualMissionDescription,
        manualMissionCreateByTeamMember: manualMissionCreatedByTeamMember,
        DeadlineDateManualMission: manualMissionDeadlineDateNewFormat,
        manualMissionPerformed: manualMissionPerformed,
        DateManualMissionPerformed: manualMissionPerformedDateNewFormat,
        manualMissionAssociatedToTeamMember:
          manualMissionAssociatedToTeamMember,
        leadPurchased: updateLeadPurchased,
        PurchasedAmount: updatePurchasedAmount,
        LeadCost: updateLeadCost,
        LeadRate: updateLeadRate,
        ActivityLog2: updateEventHappendToActivityLog2,
        ActivityLog3: updateEventHappendToActivityLog3,
        ActivityLog4: updateEventHappendToActivityLog4,
        ActivityLog5: updateEventHappendToActivityLog5,
        ActivityLog6: updateEventHappendToActivityLog6,
        ActivityLog7: updateEventHappendToActivityLog7,
        ActivityLog8: updateEventHappendToActivityLog8,
        ActivityLog9: updateEventHappendToActivityLog9,
        ActivityLog10: updateEventHappendToActivityLog10,
        ActivityLog11: updateEventHappendToActivityLog11,
        ActivityLog12: updateEventHappendToActivityLog12,
        DateActivityLog2: updateDateEventHappendToActivityLog2,
        DateActivityLog3: updateDateEventHappendToActivityLog3,
        DateActivityLog4: updateDateEventHappendToActivityLog4,
        DateActivityLog5: updateDateEventHappendToActivityLog5,
        DateActivityLog6: updateDateEventHappendToActivityLog6,
        DateActivityLog7: updateDateEventHappendToActivityLog7,
        DateActivityLog8: updateDateEventHappendToActivityLog8,
        DateActivityLog9: updateDateEventHappendToActivityLog9,
        DateActivityLog10: updateDateEventHappendToActivityLog10,
        DateActivityLog11: updateDateEventHappendToActivityLog11,
        DateActivityLog12: updateDateEventHappendToActivityLog12,
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
            <div>?????? ???????? ???????????? ????????????. ???? ???????? ?????????? ???? ?????? ???? ??????????.</div>
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
                    <h2>?????? ?????? ???????? ???????? ???????? ?????????? ?????? ?????</h2>
                    <span>???????? ???????????? ???? ???????? ???????? ?????????? ???? ????????</span>
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
                        ???? ????????, ?????? ???? ????????!
                      </Button>
                    </div>
                  )}
                  {openAlertSuccessDelete && (
                    <Alert dir="rtl" severity="success">
                      ???????? ???????? ????????????!
                    </Alert>
                  )}
                  {openAlertErrorDelete && (
                    <Alert dir="rtl" severity="error">
                      ??????????. ?????? ???? ????????, ?????? ?????? ????????.
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
                {/* <h2 id="transition-modal-title">?????????? ??????</h2> */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>?????????? ????????????</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="???? ??????"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeUpdateName}
                      value={updateName}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="????????????"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeUpdateEmail}
                      value={updateEmail}
                      type="email"
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <TextField
                      id="standard-basic"
                      label="??????????"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeUpdateTel}
                      value={updateTel}
                      type="text"
                    />
                  </div>
                  {props.relCustomerDataObj &&
                    props.relCustomerDataObj.businessBranches[0] != "" && (
                      <div className="leadFullDisplay__modalInputContainer">
                        {/* 
                        <TextField
                          id="standard-basic"
                          label="????????"
                          fullWidth={true}
                          dir="rtl"
                          onChange={onChangeUpdateBranch}
                          value={updateBranch}
                          type="text"
                        />
                        */}
                        <FormControl
                          className={classesSelect.formControl}
                          dir="rtl"
                        >
                          <InputLabel id="demo-simple-select-label">
                            ???????? ??????????????
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={updateBranch}
                            onChange={onChangeUpdateBranch}
                          >
                            {props.relCustomerDataObj.businessBranches.map(
                              (bra) => {
                                return <MenuItem value={bra}>{bra}</MenuItem>;
                              }
                            )}
                          </Select>
                        </FormControl>
                      </div>
                    )}

                  {/*
                  
                  <div className="leadFullDisplay__modalInputContainer">
                    <p>???????? ??????????????</p>
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
                      label="?????? ????"
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
                      label="????????"
                    />
                  </div>
                   */}
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        ???????? ??????
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateLeadSource}
                        onChange={onChangeUpdateLeadSource}
                      >
                        {props.relCustomerDataObj.leadSources.map((sou) => {
                          return <MenuItem value={sou}>{sou}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  {/*
                                    <div className="leadFullDisplay__modalInputContainer">
                    <p>?????? ??????????</p>
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
                          value="?????? ??????"
                          onChange={onChangeUpdateDanceTypeCheckboxes}
                        />
                      }
                      label="?????? ??????"
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
                          value="????????????"
                          onChange={onChangeUpdateDanceTypeCheckboxes}
                        />
                      }
                      label="????????????"
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
                          value="??????"
                          onChange={onChangeUpdateDanceTypeCheckboxes}
                        />
                      }
                      label="??????"
                    />
                  </div>
                  */}

                  {/*
                                    <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      dir="rtl"
                      className={classesSelect.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">
                        ???????? ??????
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
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"??"}>??</MenuItem>
                        <MenuItem value={"????"}>????</MenuItem>
                        <MenuItem value={"????"}>????</MenuItem>
                        <MenuItem value={"18+"}>18+</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  */}
                </div>
                {/* end .__modalSection */}

                {/*
                                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>?????? ???????????????????? ??????</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        ?????? ?????? ???????????? ??????????
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updateLeadStep}
                        onChange={onchangeUpdateLeadStep}
                      >
                        <MenuItem value={"??????????????"}>??????????????</MenuItem>
                        <MenuItem value={"???????? ??????????"}>???????? ??????????</MenuItem>
                        <MenuItem value={"?????? ????????????"}>?????? ????????????</MenuItem>
                        <MenuItem value={"??????"}>??????</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <p dir="rtl">?????? ???????? ???????????????</p>
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
                      label="??????????????"
                    />
                  </div>
                </div>
                */}

                {/* end .__modalSection */}
                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>?????????? ????????</h4>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <a
                      href="#"
                      style={{ color: "#0a84ae" }}
                      onClick={onClickResetManualMissionAndSetNewCreatedDate}
                    >
                      ?????? ???? ?????? ?????????? ?????????? ?????????? ???????????? ?????????? ????????
                    </a>
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <FormControl
                      className={classesSelect.formControl}
                      dir="rtl"
                    >
                      <InputLabel id="demo-simple-select-label">
                        ?????? ??????????
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={manualMissionTypeOfMission}
                        onChange={onChangeManualMissionTypeOfMission}
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
                      label="?????????? ??????????"
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
                      label='?????????? ?????????? ??"?? ?????? ????????'
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeManualMissionCreateByTeamMember}
                      value={manualMissionCreatedByTeamMember}
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
                        <p>???? ?????????? ?????????? ?????????? ?????? ????????????</p>
                      </div>
                    )}

                    <TextField
                      id="date"
                      label="???????? ?????????? ???????????? ??????????"
                      type="date"
                      required
                      defaultValue="2021-01-1"
                      todayLabel="????????"
                      value={manualMissionDeadlineDate}
                      onChange={onChangeManualMissionDeadlineDate}
                      className={classesDatePicker.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="leadFullDisplay__modalInputContainer">
                    <p dir="rtl">?????????? ???????????</p>
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
                      label="??????????"
                    />
                  </div>
                  {manualMissionPerformed && (
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ?????????? ??????????"
                        type="date"
                        defaultValue="2020-05-24"
                        todayLabel="????????"
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
                      label="?????????? ?????????? ???? ?????? ????????"
                      fullWidth={true}
                      dir="rtl"
                      onChange={onChangeManualMissionAssociatedToTeamMember}
                      value={manualMissionAssociatedToTeamMember}
                    />
                  </div>
                </div>
                {/* end .__modalSection */}

                <div className="leadFullDisplay__modalInputContainer">
                  <h4> ???????????? ?????? ???????????? ??????????</h4>
                </div>
                {/* start activity logs updates modal */}
                {updateEventHappendToActivityLog2 ===
                null ? null : updateEventHappendToActivityLog2 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 1</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog2}
                          onChange={onChangeUpdateEventHappendToActivityLog2}
                        >
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[0]
                            }
                          >
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[1]
                            }
                          >
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[2]
                            }
                          >
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[3]
                            }
                          >
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[4]
                            }
                          >
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[5]
                            }
                          >
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[6]
                            }
                          >
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[7]
                            }
                          >
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem
                            value={
                              props.relCustomerDataObj &&
                              props.relCustomerDataObj.events[8]
                            }
                          >
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog2}
                        onChange={onChangeUpdateDateEventHappendToActivityLog2}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* end activity log 1 */}

                {updateEventHappendToActivityLog3 ===
                null ? null : updateEventHappendToActivityLog3 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 2</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog3}
                          onChange={onChangeUpdateEventHappendToActivityLog3}
                          dir="rtl"
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog3}
                        onChange={onChangeUpdateDateEventHappendToActivityLog3}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 2 */}

                {updateEventHappendToActivityLog4 ===
                null ? null : updateEventHappendToActivityLog4 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 3</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog4}
                          onChange={onChangeUpdateEventHappendToActivityLog4}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog4}
                        onChange={onChangeUpdateDateEventHappendToActivityLog4}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 3 */}

                {updateEventHappendToActivityLog5 ===
                null ? null : updateEventHappendToActivityLog5 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 4</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog5}
                          onChange={onChangeUpdateEventHappendToActivityLog5}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog5}
                        onChange={onChangeUpdateDateEventHappendToActivityLog5}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 4 */}

                {updateEventHappendToActivityLog6 ===
                null ? null : updateEventHappendToActivityLog6 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 5</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog6}
                          onChange={onChangeUpdateEventHappendToActivityLog6}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog6}
                        onChange={onChangeUpdateDateEventHappendToActivityLog6}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 5 */}

                {updateEventHappendToActivityLog7 ===
                null ? null : updateEventHappendToActivityLog7 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 6</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog7}
                          onChange={onChangeUpdateEventHappendToActivityLog7}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog7}
                        onChange={onChangeUpdateDateEventHappendToActivityLog7}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 6 */}

                {updateEventHappendToActivityLog8 ===
                null ? null : updateEventHappendToActivityLog8 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 7</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog8}
                          onChange={onChangeUpdateEventHappendToActivityLog8}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog8}
                        onChange={onChangeUpdateDateEventHappendToActivityLog8}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 7 */}

                {updateEventHappendToActivityLog9 ===
                null ? null : updateEventHappendToActivityLog9 === "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 8</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog9}
                          onChange={onChangeUpdateEventHappendToActivityLog9}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog9}
                        onChange={onChangeUpdateDateEventHappendToActivityLog9}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 8 */}

                {updateEventHappendToActivityLog10 ===
                null ? null : updateEventHappendToActivityLog10 ===
                  "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 9</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog10}
                          onChange={onChangeUpdateEventHappendToActivityLog10}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog10}
                        onChange={onChangeUpdateDateEventHappendToActivityLog10}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 9 */}

                {updateEventHappendToActivityLog11 ===
                null ? null : updateEventHappendToActivityLog11 ===
                  "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 10</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog11}
                          onChange={onChangeUpdateEventHappendToActivityLog11}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog11}
                        onChange={onChangeUpdateDateEventHappendToActivityLog11}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 10 */}

                {updateEventHappendToActivityLog12 ===
                null ? null : updateEventHappendToActivityLog12 ===
                  "" ? null : (
                  <div className="leadFullDisplay__modalSection">
                    <div className="leadFullDisplay__modalInputContainer">
                      <h5>?????????? 11</h5>
                    </div>

                    <div className="leadFullDisplay__modalInputContainer">
                      <FormControl
                        className={classesSelect.formControl}
                        dir="rtl"
                      >
                        <InputLabel id="demo-simple-select-label">
                          ?????????? ??????????????
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={updateEventHappendToActivityLog12}
                          onChange={onChangeUpdateEventHappendToActivityLog12}
                        >
                          <MenuItem value={props.relCustomerDataObj.events[0]}>
                            {props.relCustomerDataObj.events[0]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[1]}>
                            {props.relCustomerDataObj.events[1]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[2]}>
                            {props.relCustomerDataObj.events[2]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[3]}>
                            {props.relCustomerDataObj.events[3]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[4]}>
                            {props.relCustomerDataObj.events[4]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[5]}>
                            {props.relCustomerDataObj.events[5]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[6]}>
                            {props.relCustomerDataObj.events[6]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[7]}>
                            {props.relCustomerDataObj.events[7]}
                          </MenuItem>
                          <MenuItem value={props.relCustomerDataObj.events[8]}>
                            {props.relCustomerDataObj.events[8]}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="date"
                        label="?????????? ??????????"
                        type="date"
                        //defaultValue="2020-05-24"
                        todayLabel="????????"
                        value={updateDateEventHappendToActivityLog12}
                        onChange={onChangeUpdateDateEventHappendToActivityLog12}
                        className={classesDatePicker.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* end activity log 11 */}
                {addMaxOneEventPerLoad ? (
                  <button
                    type="button"
                    onClick={onClickAddEventActivityLogInModal}
                    disabled
                  >
                    ???????? ?????????? ????????
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClickAddEventActivityLogInModal}
                  >
                    ???????? ?????????? ????????
                  </button>
                )}

                <div className="leadFullDisplay__modalSection">
                  <div className="leadFullDisplay__modalInputContainer">
                    <h4>??????????</h4>
                  </div>
                  {/* 
                      <div className="leadFullDisplay__modalInputContainer">
                    <p dir="rtl">?????? ???????? ???????</p>
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
                      label="???????????? ??????????"
                    />
                  </div>
                  */}

                  {updateLeadPurchased && (
                    <div className="leadFullDisplay__modalInputContainer">
                      <TextField
                        id="standard-basic"
                        label="???????? ??????????"
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
                      label="???????? ??????"
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
                        ?????????? ??????
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
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={updateTheLeadReq}
                      >
                        ?????????? ??????
                      </Button>
                    </div>
                  )}
                  {openAlertSuccess && (
                    <Alert dir="rtl" severity="success">
                      ???????? ?????????? ????????????!
                    </Alert>
                  )}
                  {openAlertError && (
                    <Alert dir="rtl" severity="error">
                      ??????????. ?????? ???? ??????????, ?????? ?????? ????????.
                    </Alert>
                  )}
                </div>
                {/* end .__modalSection */}
              </div>
            </Fade>
          </Modal>
        </div>

        <div className="leadFullDisplay__section">
          <h3 className="leadFullDisplay__subtitle">?????????? ????????????</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???? ??????</p>
                <p className="leadFullDisplay__content--text">{updateName}</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ????????????</p>
                <p className="leadFullDisplay__content--text">{updateEmail}</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">??????????</p>
                <p className="leadFullDisplay__content--text">{updateTel}</p>
              </div>
              {/* ------------ */}
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">??????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadGroup}
                </p>
              </div>

              {/* ------------ */}
              {props.relCustomerDataObj &&
                props.relCustomerDataObj.businessBranches.length > 0 && (
                  <div className="leadFullDisplay__content">
                    <p className="leadFullDisplay__content--title">????????</p>
                    <p className="leadFullDisplay__content--text">
                      {updateBranch}
                    </p>
                  </div>
                )}

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???????? ??????</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadSource}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????? ???????????? ????????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {`${addedHour}  ${addedDate}`}
                </p>
              </div>

              {/*
                <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???????? ??????????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateRelevantBranch}
                </p>
              </div>
                */}
            </div>

            <div className="leadFullDisplay__contentContainer--left">
              {/*
                 <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????????? ????????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {checkIfOnChangeFuncExecuted == false
                    ? updateDanceType
                    : updateDanceTypeAfterOnChange}
                </p>
              </div>
                */}

              {/*
               <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???????? ??????</p>
                <p className="leadFullDisplay__content--text">{updateAge}</p>
              </div>
                */}
            </div>
          </div>
        </div>

        {/*
                  <div className="leadFullDisplay__section">
          <Tooltip title="?????????? ???? ???????? ???????????? ???????????????? ???????????????? ???? ?????? ???????? ???? ???????????? ??????">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>

          <h3 className="leadFullDisplay__subtitle">?????? ???????????????????? ??????</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????? ??????</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadStep}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????? ?????????????? ???????? ????
                </p>
                <p className="leadFullDisplay__content--text">
                  {updateRecommendedMission}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????? ???????? ???????????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {updateIsTheLeadRelevant === null
                    ? "???? (?????????? ????????)"
                    : updateIsTheLeadRelevant === false
                    ? "???? (?????????? ????????)"
                    : updateIsTheLeadRelevant === "FALSE"
                    ? "???? (?????????? ????????)"
                    : updateIsTheLeadRelevant === "TRUE"
                    ? "????"
                    : updateIsTheLeadRelevant === true
                    ? "????"
                    : updateIsTheLeadRelevant}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????? ?????????? ?????????? ???? ?????? ????
                </p>
                <p className="leadFullDisplay__content--text">
                  {`${lastCurrentUpdateHour}  ${lastCurrentUpdateDate}`}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>
          */}

        {/*
                  <div className="leadFullDisplay__section">
          <h3 className="leadFullDisplay__subtitle">?????????? ????????</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????? ?????????? ????????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {manulMissionCreatedDate}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionTypeOfMission}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionDescription}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????? ?????????? ??"?? ?????? ????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionCreatedByTeamMember}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ???????????? ?????????? ??????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionDeadlineDateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ???????????</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionPerformed === null
                    ? "???? (?????????? ????????)"
                    : manualMissionPerformed == ""
                    ? "???? (?????????? ????????)"
                    : manualMissionPerformed === false
                    ? "???? (?????????? ????????)"
                    : manualMissionPerformed === "FALSE"
                    ? "???? (?????????? ????????)"
                    : manualMissionPerformed === "TRUE"
                    ? "????"
                    : manualMissionPerformed === true
                    ? "????"
                    : updateIsTheLeadRelevant}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ????????????</p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionPerformedDateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????? ?????????? ???? ?????? ????????
                </p>
                <p className="leadFullDisplay__content--text">
                  {manualMissionAssociatedToTeamMember}
                </p>
              </div>
            </div>
          </div>
        </div>
          */}

        {/*
                  <div className="leadFullDisplay__section">
          <Tooltip title="?????????? ???? ???????? ???????????? ???????????????? ???????????????? ???? ?????? ???????? ???? ???????????? ??????">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>
          <h3 className="leadFullDisplay__subtitle">?????????? 1</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???? ??????????</p>
                <p
                  className="leadFullDisplay__content--text"
                  style={{ color: "gray" }}
                >
                  ?????? ??????????????
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent1ActionTaken}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent1DateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent1StatsEvent}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>
          */}

        {/*
                  <div className="leadFullDisplay__section">
          <Tooltip title="?????????? ???? ???????? ???????????? ???????????????? ???????????????? ???? ?????? ???????? ???? ???????????? ??????">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>
          <h3 className="leadFullDisplay__subtitle">?????????? 2</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???? ??????????</p>
                <p
                  className="leadFullDisplay__content--text"
                  style={{ color: "gray" }}
                >
                  ?????? ?????? ???????????? ????????????
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent2ActionTaken}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent2DateNewFormat}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {updateEvent2StatsEvent}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>
          */}

        {/*
                  <div className="leadFullDisplay__section">
          <Tooltip title="?????????? ???? ???????? ???????????? ???????????????? ???????????????? ???? ?????? ???????? ???? ???????????? ??????">
            <FacebookIcon
              style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
            />
          </Tooltip>
          <h3 className="leadFullDisplay__subtitle">??????????</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">?????? ???????</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadPurchased === null
                    ? "???? (?????????? ????????)"
                    : updateLeadPurchased === false
                    ? "???? (?????????? ????????)"
                    : updateLeadPurchased === "FALSE"
                    ? "???? (?????????? ????????)"
                    : updateLeadPurchased === "TRUE"
                    ? "????"
                    : updateLeadPurchased === true
                    ? "????"
                    : updateLeadPurchased}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???????? ??????????</p>
                <p className="leadFullDisplay__content--text">
                  {updatePurchasedAmount === null
                    ? ""
                    : `${updatePurchasedAmount} ??"??`}
                
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">???????? ??????</p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadCost === null ? "" : `${updateLeadCost} ??"??`}
                 
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  ?????????? ?????? 1-10
                </p>
                <p className="leadFullDisplay__content--text">
                  {updateLeadRate}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>
          */}
      </div>
      <SimpleTabs
        tabLabel1="???????? ????????????"
        tab1={
          <div className="leadFullDisplay__section">
            <ul className="leadFullDisplay__section--activityLogUlList">
              <li>
                ?????? ???????????? ??????????: {updateLeadSource} ????????????: {addedHour}{" "}
                {addedDate}
              </li>

              {updateEventHappendToActivityLog2 ===
              null ? null : updateEventHappendToActivityLog2 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog2}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog2}</span>
                </li>
              )}

              {updateEventHappendToActivityLog3 ===
              null ? null : updateEventHappendToActivityLog3 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog3}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog3}</span>
                </li>
              )}

              {updateEventHappendToActivityLog4 ===
              null ? null : updateEventHappendToActivityLog4 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog4}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog4}</span>
                </li>
              )}

              {updateEventHappendToActivityLog5 ===
              null ? null : updateEventHappendToActivityLog5 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog5}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog5}</span>
                </li>
              )}

              {updateEventHappendToActivityLog6 ===
              null ? null : updateEventHappendToActivityLog6 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog6}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog6}</span>
                </li>
              )}

              {updateEventHappendToActivityLog7 ===
              null ? null : updateEventHappendToActivityLog7 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog7}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog7}</span>
                </li>
              )}

              {updateEventHappendToActivityLog8 ===
              null ? null : updateEventHappendToActivityLog8 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog8}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog8}</span>
                </li>
              )}

              {updateEventHappendToActivityLog9 ===
              null ? null : updateEventHappendToActivityLog9 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog9}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog9}</span>
                </li>
              )}

              {updateEventHappendToActivityLog10 ===
              null ? null : updateEventHappendToActivityLog10 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog10}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog10}</span>
                </li>
              )}

              {updateEventHappendToActivityLog11 ===
              null ? null : updateEventHappendToActivityLog11 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog11}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog11}</span>
                </li>
              )}

              {updateEventHappendToActivityLog12 ===
              null ? null : updateEventHappendToActivityLog12 === "" ? null : (
                <li>
                  <span>{updateEventHappendToActivityLog12}</span>
                  <span> </span>
                  <span>{updateDateEventHappendToActivityLog12}</span>
                </li>
              )}
            </ul>
          </div>
        }
        tabLabel2="?????? ???????????????????? ??????"
        tab2={
          <div className="leadFullDisplay__section">
            <Tooltip title="?????????? ???? ???????? ???????????? ???????????????? ???????????????? ???? ?????? ???????? ???? ???????????? ??????">
              <FacebookIcon
                style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
              />
            </Tooltip>

            <div className="leadFullDisplay__contentContainer">
              <div className="leadFullDisplay__contentContainer--right">
                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">?????? ??????</p>
                  <p className="leadFullDisplay__content--text">
                    {updateLeadStep}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ?????????????? ???????? ????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {updateRecommendedMission}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????? ???????? ???????????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {updateIsTheLeadRelevant === null
                      ? "???? (?????????? ????????)"
                      : updateIsTheLeadRelevant === ""
                      ? "???? (?????????? ????????)"
                      : updateIsTheLeadRelevant === false
                      ? "???? (?????????? ????????)"
                      : updateIsTheLeadRelevant === "FALSE"
                      ? "???? (?????????? ????????)"
                      : updateIsTheLeadRelevant === "TRUE"
                      ? "????"
                      : updateIsTheLeadRelevant === true
                      ? "????"
                      : updateIsTheLeadRelevant}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ?????????? ?????????? ???? ?????? ????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {`${lastCurrentUpdateHour}  ${lastCurrentUpdateDate}`}
                  </p>
                </div>
              </div>
              <div className="leadFullDisplay__contentContainer--left"></div>
            </div>
          </div>
        }
        tabLabel3="?????????? ????????"
        tab3={
          <div className="leadFullDisplay__section">
            <div className="leadFullDisplay__contentContainer">
              <div className="leadFullDisplay__contentContainer--right">
                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ?????????? ????????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {manulMissionCreatedDate}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">?????? ??????????</p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionTypeOfMission}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">?????????? ??????????</p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionDescription}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ?????????? ??"?? ?????? ????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionCreatedByTeamMember}
                  </p>
                </div>
              </div>
              <div className="leadFullDisplay__contentContainer--left">
                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ???????????? ?????????? ??????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionDeadlineDateNewFormat}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ???????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionPerformed === null
                      ? "???? (?????????? ????????)"
                      : manualMissionPerformed == ""
                      ? "???? (?????????? ????????)"
                      : manualMissionPerformed === false
                      ? "???? (?????????? ????????)"
                      : manualMissionPerformed === "FALSE"
                      ? "???? (?????????? ????????)"
                      : manualMissionPerformed === "TRUE"
                      ? "????"
                      : manualMissionPerformed === true
                      ? "????"
                      : updateIsTheLeadRelevant}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ????????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionPerformedDateNewFormat}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ?????????? ???? ?????? ????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {manualMissionAssociatedToTeamMember}
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
        tabLabel4="??????????"
        tab4={
          <div className="leadFullDisplay__section">
            <Tooltip title="?????????? ???? ???????? ???????????? ???????????????? ???????????????? ???? ?????? ???????? ???? ???????????? ??????">
              <FacebookIcon
                style={{ color: "lightgray", margin: ".4rem 0 0 0" }}
              />
            </Tooltip>

            <div className="leadFullDisplay__contentContainer">
              <div className="leadFullDisplay__contentContainer--right">
                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????? ???????? ???????????
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {updateLeadPurchased === null
                      ? "???? (?????????? ????????)"
                      : updateLeadPurchased === ""
                      ? "???? (?????????? ????????)"
                      : updateLeadPurchased === false
                      ? "???? (?????????? ????????)"
                      : updateLeadPurchased === "FALSE"
                      ? "???? (?????????? ????????)"
                      : updateLeadPurchased === "TRUE"
                      ? "????"
                      : updateLeadPurchased === true
                      ? "????"
                      : updateLeadPurchased}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">???????? ??????????</p>
                  <p className="leadFullDisplay__content--text">
                    {updatePurchasedAmount === null
                      ? ""
                      : updatePurchasedAmount === ""
                      ? ""
                      : `${updatePurchasedAmount} ??"??`}
                    {/*`${updatePurchasedAmount} ??"??`*/}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">???????? ??????</p>
                  <p className="leadFullDisplay__content--text">
                    {updateLeadCost === null
                      ? ""
                      : updateLeadCost === ""
                      ? ""
                      : `${updateLeadCost} ??"??`}
                    {/*`${updateLeadCost} ??"??`*/}
                  </p>
                </div>

                <div className="leadFullDisplay__content">
                  <p className="leadFullDisplay__content--title">
                    ?????????? ?????? 1-10
                  </p>
                  <p className="leadFullDisplay__content--text">
                    {updateLeadRate}
                  </p>
                </div>
              </div>
              <div className="leadFullDisplay__contentContainer--left"></div>
            </div>
          </div>
        }
      />
    </>
  );
}

export default LeadFullDisplay1;
