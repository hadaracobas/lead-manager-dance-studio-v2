import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

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
} from "@material-ui/core";

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

function LeadFullDisplay1(props) {
  const { id } = useParams();
  // --- START modal states and functions
  const classesModal = useStylesModal();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // ---*** END modal states and functions

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

  // UPDATE LAST DATE OF UPDATING
  const [lastCurrentUpdateDate, setLastCurrentUpdateDate] = useState("");
  const [lastCurrentUpdateHour, setLastCurrentUpdateHour] = useState("");

  const getCurrentDate = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let fullCurrentDate = day + "/" + month + "/" + year;
    return fullCurrentDate;
  };

  const getCurrentHour = () => {
    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let currentHour = hour + ":" + minutes;
    return currentHour;
  };

  /*const getLastUpdatingDateAndHour = () => {
    let d = getCurrentDate();
    let h = getCurrentHour();
    let dataAndHourString = h + " | " + d;
    return dataAndHourString;
  };
  console.log(getLastUpdatingDateAndHour());*/

  // FILTER DATA ACCORDING TO IS NUMBER
  const filterAndGetRelevantLead = () => {
    if (props.data) {
      let filterTheLead = props.data.filter((lead) => lead.ID == id);
      if (filterTheLead[0] == undefined) {
        alert("הליד לא קיים בבסיס הנתונים, אתה מועבר לדף הבית");
        window.location.href = "/";
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
      }
    }
  };
  useEffect(() => {
    filterAndGetRelevantLead();
  }, [id, props.data]);

  // API UPDATE REQUEST FUNCTION
  const updateTheLeadReq = async () => {
    const updateDataSheet = await axios
      .patch(
        `https://sheet.best/api/sheets/6c613560-926d-4171-8892-5ba0bae57c44/${
          id - 1
        }`,
        {
          name: updateName,
          email: updateEmail,
          tel: updateTel,
          releventBranch: updateRelevantBranch,
          leadSource: updateLeadSource,
          relevantDanceType:
            updateDanceTypeAfterOnChange == false
              ? updateDanceType
              : updateDanceTypeAfterOnChange,
          leadStep: updateLeadStep,
          isTheLeadRelevant: updateIsTheLeadRelevant,
          lastUpdateDate: getCurrentDate(),
          lastUpdateHour: getCurrentHour(),
        }
      )
      .then((res) => {
        console.log(res);
        setLastCurrentUpdateDate(getCurrentDate());
        setLastCurrentUpdateHour(getCurrentHour());
        alert("lead is updated,  thanks! (;");
        handleCloseModal();
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="leadFullDisplay">
        <div className="leadFullDisplay__edit">
          <EditIcon onClick={handleOpenModal} />
          <DeleteIcon />
        </div>
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
                <h2 id="transition-modal-title">עריכת ליד</h2>
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
                <div
                  className="leadFullDisplay__modalInputContainer"
                  style={{ margin: "1rem 0" }}
                >
                  <Button variant="contained" onClick={updateTheLeadReq}>
                    עדכן
                  </Button>
                </div>
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
                  {`${addedHour} | ${addedDate}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <FacebookIcon style={{ color: "lightgray", margin: ".4rem 0 0 0" }} />
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
                <p className="leadFullDisplay__content--title">נוצרה בתאריך</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].dateManualMissionCreated*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סוג משימה</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].manualTypeMission*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">תיאור משימה</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].manualMissionDescription*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  נוצר ע"י איש צוות
                </p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].manualMissionCreateByTeamMember*/}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">מועד ביצוע</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].DeadlineDateManualMission*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">משימה בוצעה?</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    isManualMissionPerformedConvertToString()*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">בוצעה בתאריך</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].DateManualMissionPerformed*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  משימה מוטלת על איש צוות
                </p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].manualMissionAssociatedToTeamMember*/}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <FacebookIcon style={{ color: "lightgray", margin: ".4rem 0 0 0" }} />
          <h3 className="leadFullDisplay__subtitle">אירוע 1</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שם אירוע</p>
                <p className="leadFullDisplay__content--text">ליד מתעניין</p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">פעולה שהתבצעה</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].event1Interest*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">תאריך אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].dateEvent1*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סטטוס אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].statusEvent1*/}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <FacebookIcon style={{ color: "lightgray", margin: ".4rem 0 0 0" }} />
          <h3 className="leadFullDisplay__subtitle">אירוע 2</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">שם אירוע</p>
                <p className="leadFullDisplay__content--text">
                  ליד היה בשיעור ניסיון
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">פעולה שהתבצעה</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].event2WasTrialLesson*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">תאריך אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].dateEvent2*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סטטוס אירוע</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].statusEvent2*/}
                </p>
              </div>
            </div>
            <div className="leadFullDisplay__contentContainer--left"></div>
          </div>
        </div>

        <div className="leadFullDisplay__section">
          <FacebookIcon style={{ color: "lightgray", margin: ".4rem 0 0 0" }} />
          <h3 className="leadFullDisplay__subtitle">רכישה</h3>

          <div className="leadFullDisplay__contentContainer">
            <div className="leadFullDisplay__contentContainer--right">
              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">ליד רכש?</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && isLeadPurchasedConvertToString()*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">סכום רכישה</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData &&
                    relevantObjLeadData[0].PurchasedAmount*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">עלות ליד</p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].LeadCost*/}
                </p>
              </div>

              <div className="leadFullDisplay__content">
                <p className="leadFullDisplay__content--title">
                  דירוג ליד 1-10
                </p>
                <p className="leadFullDisplay__content--text">
                  {/*relevantObjLeadData && relevantObjLeadData[0].LeadRate*/}
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
