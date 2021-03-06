import React, { useState, useEffect } from "react";
import "./index.scss";
import LeadSmallDisplay from "../LeadSmallDisplay";
// imports material ui
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

function SearchLead(props) {
  const [leadType, setLeadType] = useState("leadInProcess");
  const [filteredLeadType, setFilteredLeadType] = useState([]);
  const [searchDataTypeOfSubscriber, setSearchDataTypeOfSubscriber] = useState(
    "name"
  );
  const [searchTextInput, setSearchTextInput] = useState("");
  const [resultsSearch, setResultsSearch] = useState(false);

  const handleChangeLeadType = (event) => {
    setLeadType(event.target.value);
  };

  // function to create array of leads in sell process or active subscribers
  const filterByTypeOfLeads = () => {
    let filtered;
    if (props.data && leadType === "leadInProcess") {
      filtered = props.data.filter(
        (lead) => lead.leadStep !== props.relCustomerDataObj.funnelSteps[3]
      );
    } else if (leadType === "subscriber") {
      filtered = props.data.filter(
        (lead) => lead.leadStep === props.relCustomerDataObj.funnelSteps[3]
      );
    }
    setFilteredLeadType(filtered);
  };
  useEffect(() => {
    filterByTypeOfLeads();
  }, [leadType]);

  const handleChangeSearchDataTypeOfSubscriber = (event) => {
    setSearchDataTypeOfSubscriber(event.target.value);
  };

  const handleChangeSearchTextInput = (event) => {
    setSearchTextInput(event.target.value);
  };

  // function to filter leads by name
  const searchLeadNameFunc = () => {
    let filtered = filteredLeadType.filter((l) => {
      if (l.name !== null) {
        return l.name.indexOf(searchTextInput) !== -1;
      }
    });
    setResultsSearch(filtered);
  };

  // function to filter leads by tel
  const searchLeadTelFunc = () => {
    let filtered = filteredLeadType.filter((l) => {
      if (l.tel !== null) {
        return (
          l.tel.replace("-", "").indexOf(searchTextInput) !== -1 ||
          l.tel.indexOf(searchTextInput) !== -1
        );
      }
    });
    setResultsSearch(filtered);
  };

  useEffect(() => {
    if (searchDataTypeOfSubscriber == "name") {
      searchLeadNameFunc();
    } else if (searchDataTypeOfSubscriber == "tel") {
      searchLeadTelFunc();
    }
  }, [searchTextInput]);
  //console.log(lead.ID);
  return (
    <div className="searchLead">
      <div className="searchLead__inputsContainer">
        <h4>???? ?????? ?????????????? ?????????</h4>
        <form>
          <div className="searchLead__radioInputs">
            <FormControl
              component="fieldset"
              className="searchLead__radioInputs--formControl"
            >
              <FormLabel component="legend">?????? ??????</FormLabel>
              <RadioGroup
                aria-label="leadType"
                name="leadType"
                value={leadType}
                onChange={handleChangeLeadType}
              >
                <FormControlLabel
                  value="leadInProcess"
                  control={<Radio />}
                  label="?????? ???????????? ??????????"
                />
                <FormControlLabel
                  value="subscriber"
                  control={<Radio />}
                  label={props.relCustomerDataObj.funnelSteps[3]}
                />
              </RadioGroup>
            </FormControl>

            <FormControl
              component="fieldset"
              className="searchLead__radioInputs--formControl"
            >
              <FormLabel component="legend">?????????? ??????</FormLabel>
              <RadioGroup
                aria-label="searchLeadDataType"
                name="searchLeadDataType"
                value={searchDataTypeOfSubscriber}
                onChange={handleChangeSearchDataTypeOfSubscriber}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="???? ??????"
                />
                <FormControlLabel
                  value="tel"
                  control={<Radio />}
                  label="??????????"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* end __radioInputs */}
          <div className="searchLead__textInputContainer">
            <TextField
              id="standard-basic"
              label="?????? ?????? ???? ???????? ????????"
              fullWidth={true}
              onChange={handleChangeSearchTextInput}
            />
          </div>
        </form>
      </div>

      <div className="searchLead__resultsContainer">
        <h4>???????????? ??????????:</h4>
        {resultsSearch &&
          resultsSearch.map((lead, index) => (
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
  );
}

export default SearchLead;
