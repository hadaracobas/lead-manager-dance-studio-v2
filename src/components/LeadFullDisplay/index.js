/*import React, { useState, useEffect } from "react";
import "./index.scss";

import { useParams } from "react-router-dom";

import axios from "axios";

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

function LeadFullDisplay(props) {
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

  // --- START states and functions to update the lead
  const [currentId, setCurrentId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedTel, setUpdatedTel] = useState("");

  const [updatedReleventBranch, setUpdatedRelevantBranch] = useState([
    {
      checkHadarAm: false,
      checkTzoran: false,
    },
  ]);
  const [updatedLeadSource, setUpdatedLeadSource] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");

  const onChangeUpdateName = (e) => {
    setUpdatedName(e.target.value);
  };
  const onChangeUpdateEmail = (e) => {
    setUpdatedEmail(e.target.value);
  };
  const onChangeUpdateTel = (e) => {
    setUpdatedTel(e.target.value);
  };

  const onChangeUpdateReleventBranch = (event) => {
    setUpdatedRelevantBranch({
      ...updatedReleventBranch,
      [event.target.name]: event.target.checked,
    });
  };
  const onChangeUpdateLeadSource = (e) => {
    setUpdatedLeadSource(e.target.value);
  };

  const updateTheLeadReq = async () => {
    const updateDataSheet = await axios
      .patch(
        `https://sheet.best/api/sheets/6c613560-926d-4171-8892-5ba0bae57c44/${
          currentId - 1
        }`,
        {
          name: updatedName,
          email: updatedEmail,
          tel: updatedTel,
          releventBranch: updatedReleventBranch,
          leadSource: updatedLeadSource,
        }
      )
      .then((res) => {
        // setData(res.data);
        console.log(res);
        alert("lead is updated,  thanks! (;");
        handleCloseModal();
        //window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log(updatedReleventBranch);
  // ---*** END states and functions to update the lead

  // --- START states and functions to get current data
  const { id } = useParams();
  console.log(id);
  const [stateId, setStateId] = useState("");
  const [data, setData] = useState(false);
  const [relevantObjLeadData, setRelevantObjLeadData] = useState(false);

  const setRelevantDataAccourdingToId = () => {
    let relevantLeadObject;

    relevantLeadObject = data.filter((obj) => obj.ID == id);
    // set states to updated modal:
    setCurrentId(relevantLeadObject[0].ID);
    setUpdatedName(relevantLeadObject[0].name);
    setUpdatedEmail(relevantLeadObject[0].email);
    setUpdatedTel(relevantLeadObject[0].tel);
    setUpdatedRelevantBranch(relevantLeadObject[0].releventBranch);
    setUpdatedLeadSource(relevantLeadObject[0].leadSource);

    // set state obj to display:
    setRelevantObjLeadData(relevantLeadObject);
  };

  useEffect(() => {
    setStateId(id);
    setData(props.data);
  }, []);

  useEffect(() => {
    setRelevantDataAccourdingToId();
  }, [stateId, data]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  // ---*** END states and functions to get current data

  // --- START functions to convert "FALSE" or "TRUE" string data
  const isTheLeadRelevantConvertToString = () => {
    if (relevantObjLeadData[0].isTheLeadRelevant == "FALSE") {
      return "לא";
    } else if (relevantObjLeadData[0].isTheLeadRelevant == "TRUE") {
      return "כן";
    }
  };

  const isManualMissionPerformedConvertToString = () => {
    if (relevantObjLeadData[0].manualMissionPerformed == "FALSE") {
      return "לא";
    } else if (relevantObjLeadData[0].manualMissionPerformed == "TRUE") {
      return "כן";
    }
  };

  const isLeadPurchasedConvertToString = () => {
    if (relevantObjLeadData[0].leadPurchased == "FALSE") {
      return "לא";
    } else if (relevantObjLeadData[0].leadPurchased == "TRUE") {
      return "כן";
    }
  };
  // ---*** END functions to convert "FALSE" or "TRUE" string data

  return (
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
            <div className={classesModal.paper} style={{ textAlign: "right" }}>
              <h2 id="transition-modal-title">עריכת ליד</h2>

              <div className="leadFullDisplay__modalInputContainer">
                <TextField
                  id="standard-basic"
                  label="שם ליד"
                  fullWidth={true}
                  onChange={onChangeUpdateName}
                  dir="rtl"
                  value={updatedName}
                />
              </div>
              <div className="leadFullDisplay__modalInputContainer">
                <TextField
                  id="standard-basic"
                  label="אימייל"
                  fullWidth={true}
                  onChange={onChangeUpdateEmail}
                  dir="rtl"
                  value={updatedEmail}
                />
              </div>
              <div className="leadFullDisplay__modalInputContainer">
                <TextField
                  id="standard-basic"
                  label="טלפון"
                  fullWidth={true}
                  onChange={onChangeUpdateTel}
                  dir="rtl"
                  value={updatedTel}
                />
              </div>
              <div className="leadFullDisplay__modalInputContainer">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={updatedReleventBranch.checkHadarAm}
                      color="primary"
                      name="checkHadarAm"
                      onChange={onChangeUpdateReleventBranch}
                    />
                  }
                  label="הדר עם"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={updatedReleventBranch.checkTzoran}
                      color="primary"
                      name="checkTzoran"
                      onChange={onChangeUpdateReleventBranch}
                    />
                  }
                  label="צורן"
                />
              </div>
              <div className="leadFullDisplay__modalInputContainer">
                <TextField
                  id="standard-basic"
                  label="מקור ליד"
                  fullWidth={true}
                  onChange={onChangeUpdateLeadSource}
                  dir="rtl"
                  value={updatedLeadSource}
                />
              </div>
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
              <p className="leadFullDisplay__content--text">{updatedName}</p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">כתובת אימייל</p>
              <p className="leadFullDisplay__content--text">{updatedEmail}</p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">טלפון</p>
              <p className="leadFullDisplay__content--text">{updatedTel}</p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">סניף רלוונטי</p>
              <p className="leadFullDisplay__content--text">
                {updatedReleventBranch}
              </p>
            </div>
            
          </div>
          <div className="leadFullDisplay__contentContainer--left">
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">מקור ליד</p>
              <p className="leadFullDisplay__content--text">
                {updatedLeadSource}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">מתעניין בריקוד</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].relevantDanceType}
              </p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">שכבת גיל</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].age}
              </p>
            </div>
          
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">
                ליד התווסף בתאריך
              </p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].addedDate}
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
                {relevantObjLeadData && relevantObjLeadData[0].leadStep}
              </p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">
                משימה ממומלצת לשלב זה
              </p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].recommendedSystemMission}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">
                האם הליד רלוונטי?
              </p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && isTheLeadRelevantConvertToString()}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">
                תאריך עדכון אחרון{" "}
              </p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].lastUpadateDate}
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
                {relevantObjLeadData &&
                  relevantObjLeadData[0].dateManualMissionCreated}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">סוג משימה</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].manualTypeMission}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">תיאור משימה</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].manualMissionDescription}
              </p>
            </div>
        
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">
                נוצר ע"י איש צוות
              </p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].manualMissionCreateByTeamMember}
              </p>
            </div>
           
          </div>
          <div className="leadFullDisplay__contentContainer--left">
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">מועד ביצוע</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].DeadlineDateManualMission}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">משימה בוצעה?</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  isManualMissionPerformedConvertToString()}
              </p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">בוצעה בתאריך</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].DateManualMissionPerformed}
              </p>
            </div>
          
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">
                משימה מוטלת על איש צוות
              </p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData &&
                  relevantObjLeadData[0].manualMissionAssociatedToTeamMember}
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
                {relevantObjLeadData && relevantObjLeadData[0].event1Interest}
              </p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">תאריך אירוע</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].dateEvent1}
              </p>
            </div>
        
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">סטטוס אירוע</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].statusEvent1}
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
                {relevantObjLeadData &&
                  relevantObjLeadData[0].event2WasTrialLesson}
              </p>
            </div>
      
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">תאריך אירוע</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].dateEvent2}
              </p>
            </div>
        
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">סטטוס אירוע</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].statusEvent2}
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
                {relevantObjLeadData && isLeadPurchasedConvertToString()}
              </p>
            </div>
            
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">סכום רכישה</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].PurchasedAmount}
              </p>
            </div>
           
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">עלות ליד</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].LeadCost}
              </p>
            </div>
          
            <div className="leadFullDisplay__content">
              <p className="leadFullDisplay__content--title">דירוג ליד 1-10</p>
              <p className="leadFullDisplay__content--text">
                {relevantObjLeadData && relevantObjLeadData[0].LeadRate}
              </p>
            </div>
            
          </div>
          <div className="leadFullDisplay__contentContainer--left"></div>
        </div>
       
      </div>
      
    </div>
  );
}

export default LeadFullDisplay;
*/
