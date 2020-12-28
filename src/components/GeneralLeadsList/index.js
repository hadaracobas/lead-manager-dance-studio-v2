import React, { useState, useEffect } from "react";
import "./index.scss";
import LeadSmallDisplay from "../LeadSmallDisplay";
import {
  filterAllLeadsInStep1,
  filterAllLeadsInStep2,
  filterAllLeadsInStep3,
  filterAllManualMissionWithDeadlineSoon,
} from "../../functions";

function GeneralLeadsList(props) {
  const [data, setData] = useState(false);
  const [allLeadsInStep1, setAllLeadsInStep1] = useState(false);
  const [allLeadsInStep2, setAllLeadsInStep2] = useState(false);
  const [allLeadsInStep3, setAllLeadsInStep3] = useState(false);
  const [
    allLeadsWithManualMissionDeadlineSoon,
    setAllLeadsWithManualMissionDeadlineSoon,
  ] = useState(false);

  useEffect(() => {
    setData(props.data);
    setAllLeadsInStep1(filterAllLeadsInStep1(props.data));
    setAllLeadsInStep2(filterAllLeadsInStep2(props.data));
    setAllLeadsInStep3(filterAllLeadsInStep3(props.data));
    setAllLeadsWithManualMissionDeadlineSoon(
      filterAllManualMissionWithDeadlineSoon(props.data)
    );
  }, [props.data]);
  console.log(allLeadsWithManualMissionDeadlineSoon);
  return (
    <div className="generalLeadsList">
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
            />
          ))}
      </div>
    </div>
  );
}

export default GeneralLeadsList;
