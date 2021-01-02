import React, { useState, useEffect } from "react";
import "./index.scss";
import LeadSmallDisplay from "../LeadSmallDisplay";
import {
  filterAllLeadsInStep1,
  filterAllLeadsInStep2,
  filterAllLeadsInStep3,
  filterAllManualMissionWithDeadlineSoon,
  filterRelevantLeads,
  sortLeadsAccordingToAddedDate,
} from "../../functions";

import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

function GeneralLeadsList(props) {
  const [data, setData] = useState(false);
  const [allLeadsInStep1, setAllLeadsInStep1] = useState(false);
  const [allLeadsInStep2, setAllLeadsInStep2] = useState(false);
  const [allLeadsInStep3, setAllLeadsInStep3] = useState(false);
  const [
    allLeadsWithManualMissionDeadlineSoon,
    setAllLeadsWithManualMissionDeadlineSoon,
  ] = useState(false);
  const [
    toggleShowJustRelevantLeads,
    setToggleShowJustRelevantLeads,
  ] = useState(false);

  useEffect(() => {
    setData(props.data);
    /* setAllLeadsInStep1(filterAllLeadsInStep1(props.data));
    setAllLeadsInStep2(filterAllLeadsInStep2(props.data));
    setAllLeadsInStep3(filterAllLeadsInStep3(props.data));*/
    setAllLeadsWithManualMissionDeadlineSoon(
      filterAllManualMissionWithDeadlineSoon(props.data)
    );
    setToggleShowJustRelevantLeads("allLeads");
  }, [props.data]);

  useEffect(() => {
    if (toggleShowJustRelevantLeads == "allLeads") {
      setAllLeadsInStep1(filterAllLeadsInStep1(props.data));
      setAllLeadsInStep2(filterAllLeadsInStep2(props.data));
      setAllLeadsInStep3(filterAllLeadsInStep3(props.data));
    } else if (toggleShowJustRelevantLeads == "justRelevantLeads") {
      setAllLeadsInStep1(
        filterRelevantLeads(filterAllLeadsInStep1(props.data))
      );
      setAllLeadsInStep2(
        filterRelevantLeads(filterAllLeadsInStep2(props.data))
      );
      setAllLeadsInStep3(
        filterRelevantLeads(filterAllLeadsInStep3(props.data))
      );
    } else if (toggleShowJustRelevantLeads == "accordingToAddedDate") {
      setAllLeadsInStep1(
        sortLeadsAccordingToAddedDate(filterAllLeadsInStep1(props.data))
      );
      setAllLeadsInStep2(
        sortLeadsAccordingToAddedDate(filterAllLeadsInStep2(props.data))
      );
      setAllLeadsInStep3(
        sortLeadsAccordingToAddedDate(filterAllLeadsInStep3(props.data))
      );
    }
  }, [toggleShowJustRelevantLeads]);
  // console.log(toggleShowJustRelevantLeads); accordingToAddedDate
  return (
    <div className="generalLeadsList">
      <div className="generalLeadsList__radioForm">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="leadType"
            name="leadType"
            value={toggleShowJustRelevantLeads}
            onChange={(e) => setToggleShowJustRelevantLeads(e.target.value)}
            className="generalLeadsList__radioBtns"
          >
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
              value="accordingToAddedDate"
              control={<Radio />}
              label="מיין לידים לפי תאריך התווספות"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="generalLeadsList__boxes">
        <div className="generalLeadsList__1 generalLeadsList__box">
          <h2 className="generalLeadsList__box--title">מתעניינים</h2>

          <p className="generalLeadsList__box--totalNum">
            סה"כ: {allLeadsInStep1.length}
          </p>
          {allLeadsInStep1 &&
            allLeadsInStep1.map((lead, index) => (
              <LeadSmallDisplay
                key={index}
                leadName={lead.name}
                leadTel={lead.tel}
                leadStep={lead.leadStep}
                leadRate={lead.LeadRate}
                leadId={lead.ID}
                leadManualMissionDescription={lead.manualMissionDescription}
                manualMissionPerformed={lead.manualMissionPerformed}
                DeadlineDateManualMission={lead.DeadlineDateManualMission}
                DateManualMissionPerformed={lead.DateManualMissionPerformed}
                addedDate={lead.addedDate}
                leadSource={lead.leadSource}
              />
            ))}
        </div>
        <div className="generalLeadsList__2 generalLeadsList__box">
          <h2 className="generalLeadsList__box--title">הוזמנו לשיעור ניסיון</h2>
          <p className="generalLeadsList__box--totalNum">
            סה"כ: {allLeadsInStep2.length}
          </p>
          {allLeadsInStep2 &&
            allLeadsInStep2.map((lead, index) => (
              <LeadSmallDisplay
                key={index}
                leadName={lead.name}
                leadTel={lead.tel}
                leadStep={lead.leadStep}
                leadRate={lead.LeadRate}
                leadId={lead.ID}
                leadManualMissionDescription={lead.manualMissionDescription}
                manualMissionPerformed={lead.manualMissionPerformed}
                DeadlineDateManualMission={lead.DeadlineDateManualMission}
                DateManualMissionPerformed={lead.DateManualMissionPerformed}
                addedDate={lead.addedDate}
                leadSource={lead.leadSource}
              />
            ))}
        </div>
        <div className="generalLeadsList__3 generalLeadsList__box">
          <h2 className="generalLeadsList__box--title">היו בשיעור ניסיון</h2>
          <p className="generalLeadsList__box--totalNum">
            סה"כ: {allLeadsInStep3.length}
          </p>
          {allLeadsInStep3 &&
            allLeadsInStep3.map((lead, index) => (
              <LeadSmallDisplay
                key={index}
                leadName={lead.name}
                leadTel={lead.tel}
                leadStep={lead.leadStep}
                leadRate={lead.LeadRate}
                leadId={lead.ID}
                leadManualMissionDescription={lead.manualMissionDescription}
                manualMissionPerformed={lead.manualMissionPerformed}
                DeadlineDateManualMission={lead.DeadlineDateManualMission}
                DateManualMissionPerformed={lead.DateManualMissionPerformed}
                addedDate={lead.addedDate}
                leadSource={lead.leadSource}
              />
            ))}
        </div>
        <div
          className="generalLeadsList__4 generalLeadsList__box"
          id="generalLeadsList__missionBox"
        >
          <h2 className="generalLeadsList__box--title">
            לידים עם משימות פתוחות ל5 ימים הבאים
          </h2>
          <p className="generalLeadsList__box--totalNum">
            סה"כ: {allLeadsWithManualMissionDeadlineSoon.length}
          </p>
          {allLeadsWithManualMissionDeadlineSoon &&
            allLeadsWithManualMissionDeadlineSoon.map((lead, index) => (
              <LeadSmallDisplay
                key={index}
                leadName={lead.name}
                leadTel={lead.tel}
                leadStep={lead.leadStep}
                leadRate={lead.LeadRate}
                leadId={lead.ID}
                leadManualMissionDescription={lead.manualMissionDescription}
                manualMissionPerformed={lead.manualMissionPerformed}
                DeadlineDateManualMission={lead.DeadlineDateManualMission}
                DateManualMissionPerformed={lead.DateManualMissionPerformed}
                addedDate={lead.addedDate}
                leadSource={lead.leadSource}
              />
            ))}
        </div>
      </div>
      {/* end -__boxes */}
    </div>
  );
}

export default GeneralLeadsList;
