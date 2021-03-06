import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

//materiel ui imports:
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

const useStylesSelect = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

function AddNewLead(props) {
  // LOADING UPDATE
  const classesLoading = useStylesLoading();
  const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);

  // ALERT MESSAGE
  const classesAlert = useStylesAlert();
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);

  // name state
  const [name, setName] = useState("");

  // email state
  const [email, setEmail] = useState("");

  // tel state
  const [tel, setTel] = useState("");

  //branch state
  const [branch, setBranch] = useState("");

  // age state, material ui styles and handlechange function
  const classesSelect = useStylesSelect();
  /*
  const [age, setAge] = useState("");
  const handleChangeSelectAge = (event) => {
    setAge(event.target.value);
  };
*/

  // lead source state and handlechange function
  const [leadSource, setLeadSource] = useState("");
  const handleChangeSelectLeadSource = (event) => {
    setLeadSource(event.target.value);
  };

  // lead step state and handlechange function
  const [leadStep, setLeadStep] = useState("");
  const handleChangeSelectLeadStep = (event) => {
    setLeadStep(event.target.value);
  };

  // event activity log
  const [eventActivityLog, setEventActivityLog] = useState();
  const handleOnChangeEventActivityLog = (event) => {
    setEventActivityLog(event.target.value);
  };

  // relevent lead?
  const [relLead, setRelLead] = useState(false);

  // lead purchased?
  const [leadPurchased, setLeadPurchased] = useState(false);

  useEffect(() => {
    if (eventActivityLog === false) {
      // do nothing
    } else if (eventActivityLog == "?????????????? ???????? ???????? - ?????????? ??????????") {
      setLeadStep("???????? ??????????");
      setRelLead(true);
      setLeadPurchased(false);
    } else if (eventActivityLog == "?????????????? ???????? ???????? - ???? ??????????????") {
      setLeadStep("??????????????");
      setRelLead(false);
      setLeadPurchased(false);
    } else if (eventActivityLog == "?????????????? ?????? ?????? ????????, ??????????") {
      setLeadStep("??????????????");
      setRelLead(true);
      setLeadPurchased(false);
    } else if (eventActivityLog == "?????????????? ?????????? ???? ????????") {
      setLeadStep("??????????????");
      setLeadPurchased(false);
    } else if (eventActivityLog == "???????????? - ?????????? ??????????") {
      setLeadStep("?????? ????????????");
      setRelLead(true);
      setLeadPurchased(false);
    } else if (eventActivityLog == "???????????? - ???????? ?????????? ??????") {
      setLeadStep("?????? ????????????");
      setRelLead(true);
      setLeadPurchased(false);
    } else if (eventActivityLog == "???????????? - ???????? ???? ??????????????") {
      setLeadStep("?????? ????????????");
      setRelLead(false);
      setLeadPurchased(false);
    } else if (eventActivityLog == "???????????? ??????????") {
      setLeadStep("??????");
      setLeadPurchased(true);
      setRelLead(true);
    }
  }, [eventActivityLog]);
  /*
  console.log("add new lead, event activity log state: ", eventActivityLog);
  console.log("add new lead, lead step state: ", leadStep);
  console.log("add new lead, rel lead: ", relLead);
  console.log("add new lead, lead purchased: ", leadPurchased);
*/
  /*
  // branch state object and onChange function get boolean values
  const [relBranches, setRelevantBranches] = useState({
    checkHadarAm: false,
    checkTzoran: false,
  });
  const onChangeBranch = (event) => {
    setRelevantBranches({
      ...relBranches,
      [event.target.name]: event.target.checked,
    });
  };


  // branches string list state, function and useEffect
  const [relBranchesStringList, setRelBranchesStringList] = useState("");
  const createStringFromRelBranches = () => {
    let varOfRelBranchesList;
    if (relBranches.checkHadarAm && relBranches.checkTzoran) {
      varOfRelBranchesList = "?????? ????, ????????";
    } else if (relBranches.checkHadarAm) {
      varOfRelBranchesList = "?????? ????";
    } else if (relBranches.checkTzoran) {
      varOfRelBranchesList = "????????";
    }
    setRelBranchesStringList(varOfRelBranchesList);
  };
  useEffect(() => {
    createStringFromRelBranches();
  }, [relBranches]);
*/

  /*
  // dance type state object and onChange function get boolean values
  const [relDanceTypes, setRelDanceTypes] = useState({
    hipHop: false,
    modern: false,
    balet: false,
  });
  const onChangeDanceType = (event) => {
    if (event.target.checked) {
      setRelDanceTypes({
        ...relDanceTypes,
        [event.target.name]: event.target.value,
      });
    } else if (!event.target.checked) {
      setRelDanceTypes({
        ...relDanceTypes,
        [event.target.name]: false,
      });
    }
  };

  // dance types string list state, function and useEffect
  const [relDanceTypesStringList, setRelDanceTypesStringList] = useState("");
  const createStringFromRelDanceTypes = () => {
    let varOfRelDanceTypes = [];
    for (const property in relDanceTypes) {
      //console.log(`${property}: ${relDanceTypes[property]}`);
      if (relDanceTypes[property] !== false) {
        varOfRelDanceTypes.push(relDanceTypes[property]);
      }
      setRelDanceTypesStringList(varOfRelDanceTypes.toString());
    }
  };
  useEffect(() => {
    createStringFromRelDanceTypes();
  }, [relDanceTypes]);
*/

  // auto recommended mission by system state and function
  const [recommendedMissionByApplication, setRecommendedMissionByApplication] =
    useState("");
  const handleAutoRecommendedMission = () => {
    if (leadStep === "??????????????") {
      setRecommendedMissionByApplication("???????? ??????????");
    } else if (leadStep === "???????? ??????????") {
      setRecommendedMissionByApplication("?????????? ??????????");
    } else if (leadStep === "?????? ????????????") {
      setRecommendedMissionByApplication("?????????? ????????");
    } else if (leadStep === "??????") {
      setRecommendedMissionByApplication("?????? ?????????? ???????????? ???????? ????");
    }
  };
  useEffect(() => {
    handleAutoRecommendedMission();
  }, [leadStep]);

  // get current date function
  const getCurrentDate = () => {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let fullCurrentDate = day + "/" + month + "/" + year;
    return fullCurrentDate;
  };

  // get current hour function
  const getCurrentHour = () => {
    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let currentHour = hour + ":" + minutes;
    return currentHour;
  };

  // check to which component redirect after submit form
  const [redirectAfterSubmit, setRedirectAfterSubmit] = useState("");
  const onClickRedirectAfterSubmitToAddNewLead = () => {
    setRedirectAfterSubmit("add-new-lead");
  };
  const onClickRedirectAfterSubmitToLeadPage = () => {
    setRedirectAfterSubmit("lead-page");
  };
  const redirectToPageFunc = () => {
    if (redirectAfterSubmit === "add-new-lead") {
      window.location.href = "/add-new-lead";
    } else if (redirectAfterSubmit === "lead-page") {
      window.location.href = `/${props.data.length + 2}`;
    } else {
      window.location.href = "/add-new-lead";
    }
  };

  // Send Date To Database (google sheet)
  const submitDataToDatabase = (e) => {
    e.preventDefault();
    setShowLoadingUpdate(true);
    axios
      .post(props.relCrudApiUrl && props.relCrudApiUrl, {
        ID: null,
        addedDate: getCurrentDate(),
        addedHour: getCurrentHour(),
        leadSource: leadSource,
        name: name,
        email: email,
        tel: "'" + tel,
        branch: branch,
        //age: age,
        //releventBranch: relBranchesStringList,
        //relevantDanceType: relDanceTypesStringList,
        lastUpadateDate: getCurrentDate(),
        leadStep: "??????????????",
        recommendedSystemMission: recommendedMissionByApplication,
        manualMissionDescription: null,
        manualTypeMission: null,
        dateManualMissionCreated: null,
        DeadlineDateManualMission: null,
        manualMissionCreateByTeamMember: null,
        manualMissionAssociatedToTeamMember: null,
        manualMissionPerformed: null,
        DateManualMissionPerformed: null,
        isTheLeadRelevant: null,
        leadPurchased: null,
        PurchasedAmount: null,
        LeadRate: null,
        LeadCost: null,
        LeadPurchasedNote: null,
        //ActivityLog2: eventActivityLog,
        //DateActivityLog2: getCurrentDate(),
        isTheLeadRelevant: true,

        //leadPurchased: leadPurchased,
        //event1Interest: null,
        //dateEvent1: null,
        //statusEvent1: null,
        //event2WasInMeeting: null,
        // dateEvent2: null,
        // statusEvent2: null,
      })
      .then(function (response) {
        console.log(response);
        setShowLoadingUpdate(false);
        setOpenAlertSuccess(true);

        setTimeout(function () {
          setOpenAlertSuccess(false);
          redirectToPageFunc();
          setRedirectAfterSubmit("");
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        setShowLoadingUpdate(false);
        setOpenAlertError(true);

        setTimeout(function () {
          setOpenAlertError(false);
          setRedirectAfterSubmit("");
        }, 1000);
      });
  };

  return (
    <div className="addNewLead">
      <form className="addNewLead__form" onSubmit={submitDataToDatabase}>
        <h2>???????? ?????? ??????</h2>
        <div className="addNewLead__form--personalDetailsContainer">
          <h3>?????????? ????????????</h3>
          <div className="addNewLead__form--textInputs">
            <TextField
              onChange={(e) => setName(e.target.value)}
              id="standard-basic"
              label="???? ??????"
              fullWidth={true}
              required
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              label="?????????? ????????????"
              fullWidth={true}
              type="email"
            />
            <TextField
              onChange={(e) => setTel(e.target.value)}
              id="standard-basic"
              label="???????? ??????????"
              type="text"
              fullWidth={true}
            />

            {/* 
            <FormControl className={classesSelect.formControl}>
              <InputLabel id="demo-simple-select-label">???????? ??????</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChangeSelectAge}
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
            */}
          </div>{" "}
          {/* end --prevDetails */}
          {/* 
          <div className="addNewLead__form--branch">
            <p>?????? ???????? ??????????????</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={relBranches.checkHadarAm}
                  color="primary"
                  name="checkHadarAm"
                  onChange={onChangeBranch}
                />
              }
              label="?????? ????"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={relBranches.checkTzoran}
                  color="primary"
                  name="checkTzoran"
                  onChange={onChangeBranch}
                />
              }
              label="????????"
            />
          </div>{" "}
          */}
          {/* end --branch */}
          {/* 
          <div className="addNewLead__form--danceType">
            <p>?????????????? ???????? ??????????</p>
            <FormControlLabel
              control={
                <Checkbox
                  //checked={relDanceTypes.hipHop}
                  color="primary"
                  name="hipHop"
                  value="?????? ??????"
                  onChange={onChangeDanceType}
                />
              }
              label="?????? ??????"
            />
            <FormControlLabel
              control={
                <Checkbox
                  //checked={relDanceTypes.modern}
                  color="primary"
                  name="modern"
                  value="????????????"
                  onChange={onChangeDanceType}
                />
              }
              label="????????????"
            />
            <FormControlLabel
              control={
                <Checkbox
                  //checked={relDanceTypes.balet}
                  color="primary"
                  name="balet"
                  value="??????"
                  onChange={onChangeDanceType}
                />
              }
              label="??????"
            />
          </div>
          */}
        </div>
        {/* end --personalDetailsContainer */}
        <div className="addNewLead__form--leadDetailsContainer">
          <h3>???????? ??????</h3>
          {props.relCustomerDataObj &&
            props.relCustomerDataObj.businessBranches[0] != "" && (
              <div>
                <FormControl className={classesSelect.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    {" "}
                    ???????? ??????????????
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    {props.relCustomerDataObj.businessBranches.map((br) => {
                      return <MenuItem value={br}>{br}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
            )}
          <div className="addNewLead__form--leadSource">
            <FormControl className={classesSelect.formControl}>
              <InputLabel id="demo-simple-select-label">???????? ??????</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leadSource}
                onChange={handleChangeSelectLeadSource}
              >
                {props.relCustomerDataObj.leadSources.map((sou) => {
                  return <MenuItem value={sou}>{sou}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>{" "}
          {/* end --leadSource */}
          <div className="addNewLead__form--leadStep">
            {/*
            <FormControl className={classesSelect.formControl}>
              <InputLabel id="demo-simple-select-label">
                ?????? ?????? ???????????? ??????????
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leadStep}
                onChange={handleChangeSelectLeadStep}
                required
              >
                <MenuItem value={"??????????????"}>??????????????</MenuItem>
                <MenuItem value={"???????? ??????????"}>???????? ??????????</MenuItem>
                <MenuItem value={"?????? ????????????"}>?????? ????????????</MenuItem>
                <MenuItem value={"??????"}>??????</MenuItem>
              </Select>
            </FormControl>
            */}

            {/*
            <FormControl className={classesSelect.formControl} dir="rtl">
              <InputLabel id="demo-simple-select-label">
                ?????????? ??????????????
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eventActivityLog}
                onChange={handleOnChangeEventActivityLog}
              >
                <MenuItem value={"?????????????? ???????? ???????? - ?????????? ??????????"}>
                  ?????????????? ???????? ???????? - ?????????? ??????????
                </MenuItem>
                <MenuItem value={"?????????????? ???????? ???????? - ???? ??????????????"}>
                  ?????????????? ???????? ???????? - ???? ??????????????
                </MenuItem>
                <MenuItem value={"?????????????? ?????? ?????? ????????, ??????????"}>
                  ?????????????? ?????? ?????? ????????, ??????????
                </MenuItem>
                <MenuItem value={"?????????????? ?????????? ???? ????????"}>
                  ?????????????? ?????????? ???? ????????
                </MenuItem>
                <MenuItem value={"???????????? - ?????????? ??????????"}>
                  ???????????? - ?????????? ??????????
                </MenuItem>
                <MenuItem value={"???????????? - ???????? ?????????? ??????"}>
                  ???????????? - ???????? ?????????? ??????
                </MenuItem>
                <MenuItem value={"???????????? - ???????? ???? ??????????????"}>
                  ???????????? - ???????? ???? ??????????????
                </MenuItem>
                <MenuItem value={"???????????? ??????????"}>???????????? ??????????</MenuItem>
              </Select>
            </FormControl>
            */}
          </div>
          {/* end --leadStep */}
        </div>
        {/* end --leadDetailsContainer */}

        {showLoadingUpdate ? (
          <div style={{ margin: "1rem 0" }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="addNewLead__form--submitBtn">
            <Button
              onClick={onClickRedirectAfterSubmitToLeadPage}
              type="submit"
              variant="contained"
            >
              ???????? ?????? ?????????? ?????????? ??????
            </Button>
            <Button
              onClick={onClickRedirectAfterSubmitToAddNewLead}
              type="submit"
              variant="contained"
            >
              ???????? ?????? ?????????? ???????????? ?????? ????????
            </Button>
          </div>
        )}
        {openAlertSuccess && (
          <Alert dir="rtl" severity="success">
            ???????? ???????? ????????????!
          </Alert>
        )}
        {openAlertError && (
          <Alert dir="rtl" severity="error">
            ??????????. ???? ???????????? ???????????? ???? ????????. ?????? ?????? ????????.
          </Alert>
        )}
      </form>
    </div>
  );
}

export default AddNewLead;
