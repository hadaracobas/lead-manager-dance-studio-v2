import React, { useState, useEffect } from "react";
import "./index.scss";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import RegisterFormSvg from "../../img/shared-goals.svg";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Modal,
  Button,
} from "@material-ui/core";

function randModal() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + randModal();
  const left = 50 + randModal();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStylesModal = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "right",
  },
}));

function RegisterForm(props) {
  const classesModal = useStylesModal();
  const [loadingAfterSubmit, setLoadingAfterSubmit] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const bodyModal = (
    <div style={modalStyle} className={classesModal.paper}>
      <div dir="rtl" style={{ textAlign: "right" }}>
        <h2 style={{ marginBottom: "20px" }}>
          איך להעלות לוגו לגוגל דרייב וקבלת קישור
        </h2>
        <ol>
          <li style={{ marginBottom: "4px" }}>
            היכנס לגוגל דרייב דרך חשבון הגוגל שלך
          </li>
          <li style={{ marginBottom: "4px" }}>העלה את הלוגו לגוגל דרייב</li>
          <li style={{ marginBottom: "4px" }}>
            הקש מקש ימני על הלוגו ובחר "הצגת קישור"
          </li>
          <li style={{ marginBottom: "4px" }}>
            שנה את ההרשאה של הקובץ ל: "כל מי שקיבל או קיבלה את הקישור הזה"
          </li>
          <li style={{ marginBottom: "4px" }}>העתק את כתובת הקישור </li>
        </ol>
      </div>
    </div>
  );

  // get logout from auth0
  const { logout } = useAuth0();

  // 1. GET INPUTS
  const [businessUserEmail, setBusinessUserEmail] = useState(props.userEmail);
  const [funnel, setFunnel] = useState(false);
  const handleChangeRadioFunnel = (event) => {
    setFunnel(event.target.value);
  };

  const [branchesBool, setBranchesBool] = useState("");
  const handleChangeRadioBranchesBool = (event) => {
    setBranchesBool(event.target.value);
  };

  const [branchesNames, setBranchesNames] = useState("");
  const handleChangeBranchesNames = (event) => {
    setBranchesNames(event.target.value.replace(/ /g, ""));
  };
  const handleMaxBranchesNamesInput = () => {
    let splitedBranchesInput = branchesNames.split(",");
    let slicedBranchesInput;
    if (splitedBranchesInput.length > 4) {
      alert("אין אפשרות להוסיף יותר מארבעה סניפים");
      slicedBranchesInput = splitedBranchesInput.slice(0, 4);
      setBranchesNames(slicedBranchesInput.join(","));
    }
  };
  useEffect(() => {
    handleMaxBranchesNamesInput();
  }, [branchesNames]);

  const [businessName, setBusinessName] = useState();
  const handleChangeBusinessName = (event) => {
    setBusinessName(event.target.value);
  };

  const [businessLogoUrlSourceType, setBusinessLogoUrlSourceType] =
    useState("drive");
  const [businessLogoUrl, setBusinessLogoUrl] = useState("");
  const handleChangeBusinessLogoUrl = (event) => {
    setBusinessLogoUrl(event.target.value);
  };
  const [businessLogoUrlAfterHandleUrl, setBusinessLogoUrlAfterHandleUrl] =
    useState("");
  const [businessLogoUrlNotValid, setBusinessLogoUrlNotValid] = useState(false);
  const handleReworkLogoUrlFromDrive = () => {
    if (businessLogoUrlSourceType === "drive") {
      let driveUrlFromUser = businessLogoUrl;
      let idIncludesBool = driveUrlFromUser.includes("/d/");
      if (idIncludesBool) {
        let startIdPositionInUrl = driveUrlFromUser.indexOf("/d/") + 3;
        let endIdPositionInUrl = driveUrlFromUser.indexOf("/view?");
        let slicedIdFromUrl = driveUrlFromUser.slice(
          startIdPositionInUrl,
          endIdPositionInUrl
        );
        let newUrl = `https://drive.google.com/uc?export=view&id=${slicedIdFromUrl}`;
        setBusinessLogoUrlAfterHandleUrl(newUrl);
        setBusinessLogoUrlNotValid(false);
      } else {
        setBusinessLogoUrlNotValid(true);
      }
    } else if (businessLogoUrlSourceType === "other") {
      setBusinessLogoUrlAfterHandleUrl(businessLogoUrl);
    } else if (businessLogoUrlSourceType === "placeholder") {
      setBusinessLogoUrlAfterHandleUrl(
        "https://drive.google.com/uc?export=view&id=1JvmTTXA5j1ZgRAh94uXIixnfpAFJs3vI"
      );
    }
  };
  useEffect(() => {
    handleReworkLogoUrlFromDrive();
  }, [businessLogoUrl, businessLogoUrlSourceType]);

  const [businessType, setBusinessType] = useState("");
  const handleOnChangeBusinessType = (e) => {
    setBusinessType(e.target.value);
  };

  const [dataFunnel1, setDataFunnel1] = useState({
    funnelEvents:
      "התקשרנו והיה מענה - נקבעה פגישה,התקשרנו והיה מענה - לא רלוונטי,התקשרנו ולא היה מענה - לחזור,התקשרנו ומספר לא תקין,נפגשנו - מתקדם לחוזה,נפגשנו - לתאם פגישה שוב,נפגשנו - כרגע לא מעוניין,התבצעה רכישה,התקשרנו והיה מענה - יהיה רלוונטי בעתיד",
    funnelSteps: "מתעניין,תיאם פגישה,היה בפגישה,רכש",
    funnelLeadSources: "אתר,טלפוני,הגיע למשרד,אחר,fb,ig",
    funnelMissionTypes:
      "קביעת מועד לפגישה,לתזכר ליד,חתימת חוזה,גביית תשלום,אחר",
    funnelRecommendedMissionBySystemToLeadStep:
      "לתאם פגישה,לתזכר ליד,חתימת חוזה,אין משימה מומלצת לשלב זה",
  });

  const [dataFunnel2, setDataFunnel2] = useState({
    funnelEvents:
      "התקשרנו והיה מענה - נקבע מועד שיעור ניסיון,התקשרנו והיה מענה - לא רלוונטי,התקשרנו ולא היה מענה - לחזור,התקשרנו ומספר לא תקין,היה בשיעור ניסיון - מתקדם לרישום קבוע,היה בשיעור ניסיון - לקבוע מועד לשיעור ניסיון נוסף,היה בשיעור ניסיון - כרגע לא מעוניין,התבצעה הרשמה,התקשרנו והיה מענה - יהיה רלוונטי בעתיד",
    funnelSteps: "מתעניין,הוזמן לשיעור ניסיון,היה בשיעור ניסיון,נרשם כמנוי",
    funnelLeadSources: "אתר,טלפוני,הגיע למשרד,אחר,fb,ig",
    funnelMissionTypes:
      "קביעת מועד לשיעור ניסיון,לתזכר ליד,רישום כמנוי קבוע,גביית תשלום,אחר",
    funnelRecommendedMissionBySystemToLeadStep:
      "לתאם מועד לשיעור ניסיון,לתזכר ליד,הרשמה כמנוי קבוע,אין משימה מומלצת לשלב זה",
  });

  const [finalBusinessDataObj, setFinalBusinessDataObj] = useState({});

  const handleRelFunnelData = () => {
    if (funnel === "funnel1") {
      setFinalBusinessDataObj({
        ID: nextEmptyRowNum === 0 ? "=ARRAYFORMULA(ROW(A2:A)-1)" : null,
        businessBranches: branchesNames,
        businessLogoUrl: businessLogoUrlAfterHandleUrl,
        businessName: businessName,
        businessType: businessType,
        events: dataFunnel1.funnelEvents,
        funnelSteps: dataFunnel1.funnelSteps,
        leadSources: dataFunnel1.funnelLeadSources,
        missionTypes: dataFunnel1.funnelMissionTypes,
        recommendedMissionBySystemToLeadStep:
          dataFunnel1.funnelRecommendedMissionBySystemToLeadStep,
        userEmailAddress: businessUserEmail,
      });
    } else if (funnel === "funnel2") {
      setFinalBusinessDataObj({
        ID: nextEmptyRowNum === 0 ? "=ARRAYFORMULA(ROW(A2:A)-1)" : null,
        businessBranches: branchesNames,
        businessLogoUrl: businessLogoUrlAfterHandleUrl,
        businessName: businessName,
        businessType: businessType,
        events: dataFunnel2.funnelEvents,
        funnelSteps: dataFunnel2.funnelSteps,
        leadSources: dataFunnel2.funnelLeadSources,
        missionTypes: dataFunnel2.funnelMissionTypes,
        recommendedMissionBySystemToLeadStep:
          dataFunnel2.funnelRecommendedMissionBySystemToLeadStep,
        userEmailAddress: businessUserEmail,
      });
    }
  };
  useEffect(() => {
    handleRelFunnelData();
  }, [
    funnel,
    branchesNames,
    businessLogoUrlAfterHandleUrl,
    businessName,
    businessType,
  ]);

  // 2. FIND THE NEXT ROW WITH EMPTY EMAIL CELL
  let nextEmptyRowNum;
  const findTheNextRowWithEmptyEmailCell = () => {
    const nextRowWithEmpEmail = props.usersCollection.find(
      (el) => el.userEmailAddress === "" || el.userEmailAddress === null
    );
    nextEmptyRowNum = nextRowWithEmpEmail && nextRowWithEmpEmail.ID - 1;
  };
  findTheNextRowWithEmptyEmailCell();

  // 3. SEND DATA TO USERS COLLECTION

  const updateUserDateToUsersCollection = async () => {
    setLoadingAfterSubmit(true);
    const updateUsersDataSheet = await axios
      .patch(
        `https://sheet.best/api/sheets/766a22f4-2885-46bb-a273-1244747817bb/${nextEmptyRowNum}`,
        finalBusinessDataObj
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
        setLoadingAfterSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingAfterSubmit(false);
      });
  };

  const checkFielsRequiredAndSendData = () => {
    if (funnel === false) {
      alert("בחירת סוג המשפך השיווקי הינה חובה בטופס זה");
    } else if (
      businessLogoUrlNotValid &&
      businessLogoUrl.length > 0 &&
      businessLogoUrlSourceType === "drive"
    ) {
      alert("קישור שיתוף מגוגל דרייב לא תקין");
    } else {
      updateUserDateToUsersCollection();
    }
  };

  return (
    <div className="registerForm">
      <div className="registerForm__successRegisterMessage">
        <p className="registerForm__displayUserEmailP">
          פתיחת חשבון המשתמש בוצעה בהצלחה
        </p>
        <p className="registerForm__displayUserEmailP">
          החשבון מקושר לכתובת האימייל: {props.userEmail}
        </p>
        <h2 className="registerForm__title">
          הזן את פרטי העסק ובחר את סוג המשפך השיווקי
        </h2>
      </div>
      <div className="registerForm__content">
        <div className="registerForm__right">
          <div className="registerForm__formContainer">
            <div className="registerForm__formSection">
              <h3 className="registerForm__formSectionTitle">משפך שיווקי</h3>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  בחר את המשך השיווקי הרלוונטי לעסק שלך
                </FormLabel>
                <RadioGroup
                  aria-label="funnel"
                  name="funnel_radios"
                  value={funnel}
                  onChange={handleChangeRadioFunnel}
                >
                  <FormControlLabel
                    value="funnel1"
                    control={<Radio />}
                    label="מתעניין &#8592; תיאם פגישה &#8592; היה בפגישה &#8592; רכש"
                  />

                  <FormControlLabel
                    value="funnel2"
                    control={<Radio />}
                    label="מתעניין &#8592; הוזמן לשיעור ניסיון &#8592; היה בשיעור ניסיון &#8592; נרשם כמנוי"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="registerForm__formSection">
              <h3 className="registerForm__formSectionTitle">סניפי העסק</h3>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  האם לעסק שלך יש יותר מסניף אחד?
                </FormLabel>
                <RadioGroup
                  aria-label="branches"
                  name="branches_bool__radios"
                  value={branchesBool}
                  onChange={handleChangeRadioBranchesBool}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="כן"
                  />

                  <FormControlLabel value="no" control={<Radio />} label="לא" />
                </RadioGroup>
              </FormControl>
              {branchesBool === "yes" && (
                <div>
                  <p>
                    הזן את שמות הסניפים שלך עם פסיק מפריד ללא רווח. לדוגמא:
                    נתניה,כרמיאל,תל-אביב,רמת-השרון
                  </p>
                  <p style={{ color: "red" }}>אין להזין יותר מארבעה סניפים</p>
                  <TextField
                    onChange={handleChangeBranchesNames}
                    id="standard-basic"
                    label="הזן את שמות סניפי העסק כאן"
                    value={branchesNames}
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </div>

            <div className="registerForm__formSection">
              <h3 className="registerForm__formSectionTitle">שם עסק</h3>
              <p>הזן את שם העסק שלך</p>
              <TextField
                onChange={handleChangeBusinessName}
                id="standard-basic"
                label="שם עסק"
                value={businessName}
                style={{ width: "100%" }}
              />
            </div>
            <div className="registerForm__formSection">
              <h3 className="registerForm__formSectionTitle">סוג עסק</h3>
              <p>הזן את סוג העסק. לדוגמא "חוג ריקוד"</p>
              <TextField
                onChange={handleOnChangeBusinessType}
                id="standard-basic"
                label="סוג עסק"
                value={businessType}
                style={{ width: "100%" }}
              />
            </div>
            <div className="registerForm__formSection">
              <h3 className="registerForm__formSectionTitle">לוגו עסק</h3>
              <p style={{ marginBottom: "1rem" }}>
                אנא העלה את קובץ הלוגו למקור חיצוני והזן את קובץ השיתוף
              </p>
              <FormControl component="fieldset">
                <FormLabel component="legend">בחר מקור:</FormLabel>
                <RadioGroup
                  aria-label="funnel"
                  name="logo_type_source_radios"
                  value={businessLogoUrlSourceType}
                  onChange={(e) => setBusinessLogoUrlSourceType(e.target.value)}
                >
                  <FormControlLabel
                    value="drive"
                    control={<Radio />}
                    label="גוגל דרייב"
                  />
                  {businessLogoUrlSourceType === "drive" ? (
                    <div>
                      <span
                        style={{
                          color: "#0a84ae",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={handleOpenModal}
                      >
                        איך להעלות את הלוגו לגוגל דרייב ולקבל קישור
                      </span>
                    </div>
                  ) : null}
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="מקור חיצוני אחר"
                  />

                  <FormControlLabel
                    value="placeholder"
                    control={<Radio />}
                    label="אין לי לוגו"
                  />
                </RadioGroup>
              </FormControl>

              {businessLogoUrlNotValid &&
              businessLogoUrl.length >= 1 &&
              businessLogoUrlSourceType === "drive" ? (
                <p style={{ color: "red" }}>
                  קישור שיתוף לוגו מגוגל דרייב לא תקין
                </p>
              ) : null}

              {businessLogoUrlSourceType != "placeholder" && (
                <TextField
                  onChange={handleChangeBusinessLogoUrl}
                  id="standard-basic"
                  label="קישור לוגו"
                  value={businessLogoUrl}
                  style={{ width: "100%" }}
                />
              )}
            </div>
            {loadingAfterSubmit ? (
              <div>טוען נתונים..</div>
            ) : (
              <div>
                <div className="registerForm__formSection">
                  <Button
                    onClick={checkFielsRequiredAndSendData}
                    variant="contained"
                    color="secondary"
                    style={{ fontSize: "1.7rem" }}
                  >
                    הגדר את נתוני העסק בחשבון
                  </Button>
                </div>
                <div className="registerForm__formSection">
                  <p
                    onClick={() => logout()}
                    style={{
                      cursor: "pointer",
                      color: "#0a84ae",
                      textDecoration: "underline",
                    }}
                  >
                    התנתק והגדר את פרטי העסק מאוחר יותר
                  </p>
                </div>
              </div>
            )}
          </div>
          {/*
        <button onClick={updateUserDateToUsersCollection} type="button">
          update user data to users collection
        </button>
        <br></br>
        <button onClick={() => logout()} type="button">
          logup and fill the form later
        </button>
        */}
          <div>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {bodyModal}
            </Modal>
          </div>
        </div>
        <div className="registerForm__left">
          <img className="registerForm__img" src={RegisterFormSvg}></img>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
