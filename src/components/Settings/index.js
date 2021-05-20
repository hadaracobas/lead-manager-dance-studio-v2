import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

function Settings(props) {
  const [loadingAfterSubmit, setLoadingAfterSubmit] = useState(false);
  const [businessName, setBusinessName] = useState(
    props.getTheUserObj.businessName
  );
  const [businessLogoUrl, setBusinessLogoUrl] = useState(
    props.getTheUserObj.businessLogoUrl
  );
  const [businessBranches, setBusinessBranches] = useState(
    props.getTheUserObj.businessBranches
  );

  const [businessNameEditMode, setBusinessNameEditMode] = useState(false);
  const [businessBranchesEditMode, setBusinessBranchesEditMode] =
    useState(false);
  const [businessLogoUrlEditMode, setBusinessLogoUrlEditMode] = useState(false);

  const [businessLogoUrlSourceType, setBusinessLogoUrlSourceType] =
    useState("");

  const [businessLogoUrlAfterHandleUrl, setBusinessLogoUrlAfterHandleUrl] =
    useState(false);

  const [businessLogoUrlNotValid, setBusinessLogoUrlNotValid] = useState(false);

  const [
    displayLogoDriveInstructionsBool,
    setDisplayLogoDriveInstructionsBool,
  ] = useState(false);

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

  const updateUserDataPatchReq = async () => {
    setLoadingAfterSubmit(true);
    const updateData = await axios
      .patch(
        `https://sheet.best/api/sheets/766a22f4-2885-46bb-a273-1244747817bb/${
          props.getTheUserObj.ID - 1
        }`,
        {
          ID:
            props.getTheUserObj.ID - 1 === 0
              ? "=ARRAYFORMULA(ROW(A2:A)-1)"
              : null,
          businessName: businessName,
          businessBranches: businessBranches,
          businessLogoUrl: !businessLogoUrlAfterHandleUrl
            ? businessLogoUrl
            : businessLogoUrlAfterHandleUrl,
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
        setLoadingAfterSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        alert("שגיאה, הנתונים לא נשמרו");
        setLoadingAfterSubmit(false);
      });
  };

  const handleSaveSettingsOnClick = () => {
    let branchesOfInput = businessBranches;
    let branchesSplited = branchesOfInput.split(",");

    if (branchesSplited.length > 4) {
      alert("אין אפשרות להוסיף יותר מארבעה סניפים");
    } else {
      updateUserDataPatchReq();
    }
  };

  return (
    <div className="settings">
      <h2>הגדרות</h2>
      <div className="settings__content">
        <div className="settings__sectionWrapper">
          <div className="settings__setting">
            <p style={{ fontWeight: "bold" }}>שם עסק</p>
            {!businessNameEditMode ? (
              <EditIcon
                style={{
                  display: "block",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={() => setBusinessNameEditMode(true)}
              />
            ) : (
              <ClearIcon
                style={{
                  display: "block",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={() => setBusinessNameEditMode(false)}
              />
            )}
          </div>

          <p>{businessName}</p>
          {businessNameEditMode && (
            <TextField
              id="standard-basic"
              label={businessName.length > 0 ? "" : "הזן שם עסק"}
              value={businessName}
              style={{ width: "70%" }}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          )}
        </div>

        <div className="settings__sectionWrapper">
          <div className="settings__setting">
            <p style={{ fontWeight: "bold" }}>סניפים</p>
            {!businessBranchesEditMode ? (
              <EditIcon
                style={{
                  display: "block",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={() => setBusinessBranchesEditMode(true)}
              />
            ) : (
              <ClearIcon
                style={{
                  display: "block",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={() => setBusinessBranchesEditMode(false)}
              />
            )}
          </div>
          <p>{businessBranches}</p>
          {businessBranchesEditMode && (
            <div>
              <p style={{ fontSize: "1rem", color: "red", padding: "1rem 0" }}>
                הזן את שמות הסניפים שלך עם פסיק מפריד ללא רווח. לדוגמא:
                נתניה,כרמיאל,תל-אביב,רמת-השרון
              </p>
              <TextField
                id="standard-basic"
                label={businessBranches.length > 0 ? "" : "הזן סניפים"}
                value={businessBranches}
                style={{ width: "70%" }}
                onChange={(e) => setBusinessBranches(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="settings__sectionWrapper">
          <div className="settings__setting">
            <p style={{ fontWeight: "bold" }}>לוגו</p>
            {!businessLogoUrlEditMode ? (
              <EditIcon
                style={{
                  display: "block",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={() => setBusinessLogoUrlEditMode(true)}
              />
            ) : (
              <ClearIcon
                style={{
                  display: "block",
                  color: "#757575",
                  cursor: "pointer",
                }}
                onClick={() => setBusinessLogoUrlEditMode(false)}
              />
            )}
          </div>

          <div>
            {!businessLogoUrlAfterHandleUrl ? (
              <img src={businessLogoUrl} style={{ width: "200px" }} />
            ) : (
              <img
                src={businessLogoUrlAfterHandleUrl}
                style={{ width: "200px" }}
              />
            )}
          </div>

          {businessLogoUrlEditMode && (
            <div>
              <p
                onClick={() =>
                  setDisplayLogoDriveInstructionsBool(
                    !displayLogoDriveInstructionsBool
                  )
                }
                style={{
                  color: "#0a84ae",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                איך להעלות את הלוגו לגוגל דרייב ולקבל לינק שיתוף?
              </p>
              {displayLogoDriveInstructionsBool && (
                <div
                  style={{
                    padding: "1.2rem",
                    color: "#757575",
                    fontSize: "1.2rem",
                  }}
                >
                  <ol>
                    <li>היכנס לגוגל דרייב דרך חשבון הגוגל שלך</li>
                    <li>העלה את הלוגו לגוגל דרייב</li>
                    <li>הקש מקש ימני על הלוגו ובחר "הצגת קישור"</li>
                    <li>
                      שנה את ההרשאה של הקובץ ל: "כל מי שקיבל או קיבלה את הקישור
                      הזה"
                    </li>
                    <li>העתק את כתובת הקישור</li>
                  </ol>
                </div>
              )}

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
              <div>
                {businessLogoUrlNotValid && (
                  <p style={{ color: "red" }}>קישור דרייב לא תקין</p>
                )}

                {businessLogoUrlSourceType != "placeholder" && (
                  <TextField
                    id="standard-basic"
                    label="הזן כתובת לוגו"
                    style={{ width: "70%" }}
                    onChange={(e) => setBusinessLogoUrl(e.target.value)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="settings__sectionWrapper">
          {loadingAfterSubmit ? (
            <div>טוען נתונים...</div>
          ) : (
            <Button onClick={handleSaveSettingsOnClick} variant="contained">
              שמור
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
