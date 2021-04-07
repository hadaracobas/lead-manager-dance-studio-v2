import React, { useState, useEffect } from "react";
import "./index.scss";
import LeadSmallDisplay from "../LeadSmallDisplay";
import DoughnutChart from "../DoughnutChart";
import ManualMissions from "../ManualMissions";

import {
  filterAllLeadsInStep1,
  filterAllLeadsInStep2,
  filterAllLeadsInStep3,
  filterAllLeadsInStep4,
  filterAllManualMissionWithDeadlineSoon,
  filterRelevantLeads,
  sortLeadsAccordingToAddedDate,
  filterAllNewLeadsPerTime,
  filterAllLeadsInSellProcess,
  filterAllLeadsAccoordingToLeadSourceTel,
  filterAllLeadsAccoordingToLeadSourceWeb,
  filterAllLeadsAccoordingToLeadSourceOffice,
  filterAllLeadsAccoordingToLeadSourceDifferent,
  filterAllLeadsAccoordingToLeadSourceFb,
  filterAllLeadsAccoordingToLeadSourceIg,
  checkIfFbDateAndRemoveHour,
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
import DataCard from "../DataCard";

function GeneralLeadsList(props) {
  const [data, setData] = useState(false);
  const [allLeadsInStep1, setAllLeadsInStep1] = useState(false);
  const [allLeadsInStep2, setAllLeadsInStep2] = useState(false);
  const [allLeadsInStep3, setAllLeadsInStep3] = useState(false);
  const [allLeadsInStep4, setAllLeadsInStep4] = useState(false);
  const [allLeadsInSellProcess, setAllLeadsInSellProcess] = useState(false);
  /*console.log(
    "leads in step 1: ",
    allLeadsInStep1,
    "leads in step 2: ",
    allLeadsInStep2,
    "leads in step 3: ",
    allLeadsInStep3,
    "leads in step 4: ",
    allLeadsInStep4
  );*/
  const [
    allLeadsWithManualMissionDeadlineSoon,
    setAllLeadsWithManualMissionDeadlineSoon,
  ] = useState(false);
  const [
    toggleShowJustRelevantLeads,
    setToggleShowJustRelevantLeads,
  ] = useState(false);

  const [allLeadsFromSourceWeb, setAllLeadsFromSourceWeb] = useState(false);
  const [allLeadsFromSourceTel, setAllLeadsFromSourceTel] = useState(false);
  const [allLeadsFromSourceOffice, setAllLeadsFromSourceOffice] = useState(
    false
  );
  const [
    allLeadsFromSourceDifferent,
    setAllLeadsFromSourceDifferent,
  ] = useState(false);
  const [allLeadsFromSourceFb, setAllLeadsFromSourceFb] = useState(false);
  const [allLeadsFromSourceIg, setAllLeadsFromSourceIg] = useState(false);

  useEffect(() => {
    console.log(
      "deadline 5 days arr: ",
      // filterAllManualMissionWithDeadlineSoon(props.data)
      props.data
    );
    setData(props.data);
    /* setAllLeadsInStep1(filterAllLeadsInStep1(props.data));
    setAllLeadsInStep2(filterAllLeadsInStep2(props.data));
    setAllLeadsInStep3(filterAllLeadsInStep3(props.data));*/
    setAllLeadsInStep4(
      filterAllLeadsInStep4(props.data, props.relCustomerDataObj.funnelSteps[3])
    );
    setAllLeadsInSellProcess(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
    setAllLeadsFromSourceTel(
      filterAllLeadsAccoordingToLeadSourceTel(
        props.data,
        props.relCustomerDataObj.leadSources[1]
      )
    );
    setAllLeadsFromSourceWeb(
      filterAllLeadsAccoordingToLeadSourceWeb(
        props.data,
        props.relCustomerDataObj.leadSources[0]
      )
    );
    setAllLeadsFromSourceOffice(
      filterAllLeadsAccoordingToLeadSourceOffice(
        props.data,
        props.relCustomerDataObj.leadSources[2]
      )
    );
    setAllLeadsFromSourceDifferent(
      filterAllLeadsAccoordingToLeadSourceDifferent(
        props.data,
        props.relCustomerDataObj.leadSources[3]
      )
    );
    setAllLeadsFromSourceFb(
      filterAllLeadsAccoordingToLeadSourceFb(
        props.data,
        props.relCustomerDataObj.leadSources[4]
      )
    );
    setAllLeadsFromSourceIg(
      filterAllLeadsAccoordingToLeadSourceIg(
        props.data,
        props.relCustomerDataObj.leadSources[5]
      )
    );
    setAllLeadsWithManualMissionDeadlineSoon(
      filterAllManualMissionWithDeadlineSoon(props.data)
    );
    setToggleShowJustRelevantLeads("allLeads");
  }, [props.data]);

  useEffect(() => {
    if (toggleShowJustRelevantLeads == "allLeads") {
      setAllLeadsInStep1(
        filterAllLeadsInStep1(
          props.data,
          props.relCustomerDataObj.funnelSteps[0]
        )
      );
      setAllLeadsInStep2(
        filterAllLeadsInStep2(
          props.data,
          props.relCustomerDataObj.funnelSteps[1]
        )
      );
      setAllLeadsInStep3(
        filterAllLeadsInStep3(
          props.data,
          props.relCustomerDataObj.funnelSteps[2]
        )
      );
    } else if (toggleShowJustRelevantLeads == "justRelevantLeads") {
      setAllLeadsInStep1(
        filterRelevantLeads(
          filterAllLeadsInStep1(
            props.data,
            props.relCustomerDataObj.funnelSteps[0]
          )
        )
      );
      setAllLeadsInStep2(
        filterRelevantLeads(
          filterAllLeadsInStep2(
            props.data,
            props.relCustomerDataObj.funnelSteps[1]
          )
        )
      );
      setAllLeadsInStep3(
        filterRelevantLeads(
          filterAllLeadsInStep3(
            props.data,
            props.relCustomerDataObj.funnelSteps[2]
          )
        )
      );
    } else if (toggleShowJustRelevantLeads == "accordingToAddedDate") {
      setAllLeadsInStep1(
        sortLeadsAccordingToAddedDate(
          filterAllLeadsInStep1(
            props.data,
            props.relCustomerDataObj.funnelSteps[0]
          )
        )
      );
      setAllLeadsInStep2(
        sortLeadsAccordingToAddedDate(
          filterAllLeadsInStep2(
            props.data,
            props.relCustomerDataObj.funnelSteps[1]
          )
        )
      );
      setAllLeadsInStep3(
        sortLeadsAccordingToAddedDate(
          filterAllLeadsInStep3(
            props.data,
            props.relCustomerDataObj.funnelSteps[2]
          )
        )
      );
    }
  }, [toggleShowJustRelevantLeads]);
  // console.log(toggleShowJustRelevantLeads); accordingToAddedDate
  return (
    <div className="generalLeadsList">
      <div className="statistics__cards">
        <div className="statistics__card">
          <DataCard
            titleCard='סה"כ לידים'
            num={`בתהליך מכירה: ${
              props.data &&
              allLeadsInStep1.length +
                allLeadsInStep2.length +
                allLeadsInStep3.length
            } | ${props.relCustomerDataObj.funnelSteps[3]}: ${
              allLeadsInStep4 && allLeadsInStep4.length
            }`}
          />
        </div>
        <div className="statistics__card">
          <DataCard
            titleCard='סה"כ לידים בתהליך מכירה'
            num={`מתעניינים: ${allLeadsInStep1 && allLeadsInStep1.length} | ${
              props.relCustomerDataObj.funnelSteps[1]
            }: ${allLeadsInStep2 && allLeadsInStep2.length} | ${
              props.relCustomerDataObj.funnelSteps[2]
            }: ${allLeadsInStep3 && allLeadsInStep3.length}`}
          />
        </div>
        <div className="statistics__card">
          <DataCard
            titleCard="לידים חדשים התווספו בתהליך מכירה"
            //num="היום: 2 | השבוע: 14 | החודש: 24 "
            num={`היום: ${
              allLeadsInSellProcess &&
              filterAllNewLeadsPerTime(allLeadsInSellProcess, 0).length
            } | השבוע: ${
              allLeadsInSellProcess &&
              filterAllNewLeadsPerTime(allLeadsInSellProcess, 7).length
            } | החודש: ${
              allLeadsInSellProcess &&
              filterAllNewLeadsPerTime(allLeadsInSellProcess, 30).length
            }`}
          />
        </div>
      </div>

      <div className="generalLeadsList__missionsAndLeadSourcePie">
        <div className="generalLeadsList__missionsAndLeadSourcePie--missions">
          <ManualMissions data={props.data} />
        </div>
        <div className="generalLeadsList__missionsAndLeadSourcePie--leadSurce">
          <h2>מקור ליד</h2>
          <DoughnutChart
            relCustomerDataObj={props.relCustomerDataObj}
            arrOfDataNum={[
              allLeadsFromSourceIg.length,
              allLeadsFromSourceFb.length,
              allLeadsFromSourceDifferent.length,
              allLeadsFromSourceOffice.length,
              allLeadsFromSourceTel.length,
              allLeadsFromSourceWeb.length,
            ]}
          />
        </div>
      </div>

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
          <h2 className="generalLeadsList__box--title">
            {props.relCustomerDataObj.funnelSteps[0]}
          </h2>

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
          <h2 className="generalLeadsList__box--title">
            {props.relCustomerDataObj.funnelSteps[1]}
          </h2>
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
          <h2 className="generalLeadsList__box--title">
            {props.relCustomerDataObj.funnelSteps[2]}
          </h2>
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
        {/* 
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
        */}
      </div>
      {/* end -__boxes */}
    </div>
  );
}

export default GeneralLeadsList;
