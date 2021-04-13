import { customersData } from "./pData";

export const convertDateFromDatePickerToNormalDateFormat = (
  materialFormatDataState,
  setNewFormatDataState
) => {
  if (
    materialFormatDataState === null ||
    materialFormatDataState.length === 0 ||
    materialFormatDataState.indexOf("/") !== -1
  ) {
    setNewFormatDataState(materialFormatDataState);
  } else if (materialFormatDataState.indexOf("-") !== -1) {
    let dateFromDatePicker = materialFormatDataState;
    let year = dateFromDatePicker.slice(0, 4);
    let month = dateFromDatePicker.slice(5, 7);
    let day = dateFromDatePicker.slice(8, 10);
    let newFormat = day + "/" + month + "/" + year;
    setNewFormatDataState(newFormat);
  } else {
    setNewFormatDataState(materialFormatDataState);
  }
};

export const convertDateToNewFormat = (date) => {
  if (date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let newFormat = day + "/" + month + "/" + year;
    return newFormat;
  }
};

// return the current date
export const getCurrentDate = () => {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let fullCurrentDate = day + "/" + month + "/" + year;
  return fullCurrentDate;
};

// return the current hour
export const getCurrentHour = () => {
  let d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let currentHour = hour + ":" + minutes;
  return currentHour;
};

// return all leads in sell process
export const filterAllLeadsInSellProcess = (data, step1, step2, step3) => {
  let leadsInSellProcess =
    data &&
    data.filter(
      (lead) =>
        lead.leadStep === step1 ||
        lead.leadStep === step2 ||
        lead.leadStep === step3
    );
  return leadsInSellProcess;
};

// return all the leads that are in step "מתעניין"
export const filterAllLeadsInStep1 = (data, step1) => {
  let step1Leads = data && data.filter((lead) => lead.leadStep === step1);
  return step1Leads;
};

// return all the leads that are in step "תיאם פגישה"
export const filterAllLeadsInStep2 = (data, step2) => {
  let step2Leads = data && data.filter((lead) => lead.leadStep === step2);
  return step2Leads;
};

// return all the leads that are in step "היה בפגישה"
export const filterAllLeadsInStep3 = (data, step3) => {
  let step3Leads = data && data.filter((lead) => lead.leadStep === step3);
  return step3Leads;
};

// return all the leads that are in step "רכש"
export const filterAllLeadsInStep4 = (data, step4) => {
  let step4Leads = data && data.filter((lead) => lead.leadStep === step4);
  return step4Leads;
};

// return all the leads according to leadSource "טלפוני"
export const filterAllLeadsAccoordingToLeadSourceTel = (data, source) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource === source);
  return filterLeads;
};

// return all the leads according to leadSource "אתר"
export const filterAllLeadsAccoordingToLeadSourceWeb = (data, source) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource === source);
  return filterLeads;
};

// return all the leads according to leadSource "אחר"
export const filterAllLeadsAccoordingToLeadSourceDifferent = (data, source) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource === source);
  return filterLeads;
};

// return all the leads according to leadSource "הגיע למשרד"
export const filterAllLeadsAccoordingToLeadSourceOffice = (data, source) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource === source);
  return filterLeads;
};

// return all the leads according to leadSource "fb"
export const filterAllLeadsAccoordingToLeadSourceFb = (data, source) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource === source);
  return filterLeads;
};

// return all the leads according to leadSource "ig"
export const filterAllLeadsAccoordingToLeadSourceIg = (data, source) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource === source);
  return filterLeads;
};

// return all the relevant leads
export const filterRelevantLeads = (data) => {
  let filterLeads =
    data && data.filter((lead) => lead.isTheLeadRelevant == "TRUE");
  return filterLeads;
};

// return all the leads with open manual missions
export const filterAllLeadsWithOpenMissions = (data) => {
  let LeadsWithOpenMissions =
    data &&
    data.filter(
      (lead) =>
        lead.manualMissionDescription !== null &&
        lead.manualMissionDescription !== "" &&
        lead.manualMissionPerformed !== "TRUE"
    );
  return LeadsWithOpenMissions;
};

// return all the leads with closed manual missions
export const filterAllLeadsWithClosedMissions = (data) => {
  let LeadsWithClosedMissions =
    data &&
    data.filter(
      (lead) =>
        lead.manualMissionDescription !== null &&
        lead.manualMissionDescription !== "" &&
        lead.manualMissionPerformed === "TRUE"
    );
  return LeadsWithClosedMissions;
};

// convert user date format back to js date format
/*export const convertDateBackInJsFormat = (dateUserFormat) => {
  if (dateUserFormat !== null) {
    let dateSplitToArr = dateUserFormat.split("/");
    let dateNewOrderValuesInArr = [
      dateSplitToArr[1],
      dateSplitToArr[0],
      dateSplitToArr[2],
    ];
    let dateInJsFormat = dateNewOrderValuesInArr.join("/");
    return dateInJsFormat;
  }
  return null;
};
*/

// convert user date format back to js date format
export const convertDateBackInJsFormat = (dateUserFormat) => {
  if (dateUserFormat !== null) {
    if (dateUserFormat.indexOf("/") > -1) {
      let dateSplitToArr = dateUserFormat.split("/");
      let dateNewOrderValuesInArr = [
        dateSplitToArr[1],
        dateSplitToArr[0],
        dateSplitToArr[2],
      ];
      let dateInJsFormat = dateNewOrderValuesInArr.join("/");
      return dateInJsFormat;
    } else if (dateUserFormat.indexOf("T") > -1) {
      let fbDateWithoutHour = checkIfFbDateAndRemoveHour(dateUserFormat);
      return fbDateWithoutHour;
    } else {
      return dateUserFormat;
    }
  } else {
    return null;
  }
};

// return all the manual missions with deadline last 7 days
export function filterAllLeadsWithOpenMissionsWithDeadlineLast7Days(data) {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());

  let today = new Date(getTodayDate);
  let dateBefore7Days = new Date(today);
  dateBefore7Days.setDate(dateBefore7Days.getDate() - 7);

  let todayMs = today.getTime();
  let dateBefore7DaysMs = dateBefore7Days.getTime();

  let arrFilterAllLeadsWithDeadlineLast7Days =
    data &&
    data.filter((lead) => {
      let getDeadlineDateOfLead = convertDateBackInJsFormat(
        lead.DeadlineDateManualMission
      );
      let deadlineDate = new Date(getDeadlineDateOfLead);
      let deadlineDateMs = deadlineDate.getTime();
      return deadlineDateMs < todayMs && deadlineDateMs > dateBefore7DaysMs;
    });

  return arrFilterAllLeadsWithDeadlineLast7Days;
}

// return all manual missions with deadline to yesterday
export function filterAllLeadsWithOpenMissionsWithDeadlineToYesterday(data) {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());

  let today = new Date(getTodayDate);
  let dateYesterday = new Date(today);
  dateYesterday.setDate(dateYesterday.getDate() - 1);

  let todayMs = today.getTime();
  let dateYesterdayMs = dateYesterday.getTime();

  let arrFilterAllLeadsWithDeadlineYesterday =
    data &&
    data.filter((lead) => {
      let getDeadlineDateOfLead = convertDateBackInJsFormat(
        lead.DeadlineDateManualMission
      );
      let deadlineDate = new Date(getDeadlineDateOfLead);
      let deadlineDateMs = deadlineDate.getTime();
      return deadlineDateMs < todayMs && deadlineDateMs >= dateYesterdayMs;
    });
  return arrFilterAllLeadsWithDeadlineYesterday;
}

//return all manual missions with deadline for today
export function filterAllLeadsWithOpenMissionsWithDeadlineForToday(data) {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());
  let today = new Date(getTodayDate);
  let todayMs = today.getTime();

  let dateTomorrow = new Date(today);
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  let dateTomorrowMs = dateTomorrow.getTime();

  let arrFilterAllLeadsWithDeadlineForToday =
    data &&
    data.filter((lead) => {
      let getDeadlineDateOfLead = convertDateBackInJsFormat(
        lead.DeadlineDateManualMission
      );
      let deadlineDate = new Date(getDeadlineDateOfLead);
      let deadlineDateMs = deadlineDate.getTime();
      return deadlineDateMs < dateTomorrowMs && deadlineDateMs >= todayMs;
    });
  return arrFilterAllLeadsWithDeadlineForToday;
}

//return all manual missions with deadline for tomorrow
export function filterAllLeadsWithOpenMissionsWithDeadlineForTomorrow(data) {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());
  let today = new Date(getTodayDate);
  let todayMs = today.getTime();

  let dateTomorrow = new Date(today);
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  let dateTomorrowMs = dateTomorrow.getTime();

  let dateIn2Days = new Date(today);
  dateIn2Days.setDate(dateIn2Days.getDate() + 2);
  let dateIn2DaysMs = dateIn2Days.getTime();

  let arrFilterAllLeadsWithDeadlineForTomorrow =
    data &&
    data.filter((lead) => {
      let getDeadlineDateOfLead = convertDateBackInJsFormat(
        lead.DeadlineDateManualMission
      );
      let deadlineDate = new Date(getDeadlineDateOfLead);
      let deadlineDateMs = deadlineDate.getTime();
      return deadlineDateMs < dateIn2DaysMs && deadlineDateMs >= dateTomorrowMs;
    });
  return arrFilterAllLeadsWithDeadlineForTomorrow;
}

//return all manual missions with deadline for next 7 days
export function filterAllLeadsWithOpenMissionsWithDeadlineForNext7Days(data) {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());
  let today = new Date(getTodayDate);
  let todayMs = today.getTime();

  let dateTomorrow = new Date(today);
  dateTomorrow.setDate(dateTomorrow.getDate() + 1);
  let dateTomorrowMs = dateTomorrow.getTime();

  let dateIn8Days = new Date(today);
  dateIn8Days.setDate(dateIn8Days.getDate() + 8);
  let dateIn8DaysMs = dateIn8Days.getTime();

  let arrFilterAllLeadsWithDeadlineForNext7Days =
    data &&
    data.filter((lead) => {
      let getDeadlineDateOfLead = convertDateBackInJsFormat(
        lead.DeadlineDateManualMission
      );
      let deadlineDate = new Date(getDeadlineDateOfLead);
      let deadlineDateMs = deadlineDate.getTime();

      return deadlineDateMs < dateIn8DaysMs && deadlineDateMs >= dateTomorrowMs;
    });
  return arrFilterAllLeadsWithDeadlineForNext7Days;
}

// return all the manual mission with deadline in - 5 days ( -- works? -- )
export const filterAllManualMissionWithDeadlineSoon = (data) => {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());

  let today = new Date(getTodayDate);
  let dateIn5Days = new Date(today);
  dateIn5Days.setDate(dateIn5Days.getDate() + 5);

  let todayMs = today.getTime();
  let dateIn5DaysMs = dateIn5Days.getTime();

  let filterAllMissionWithDeadlineSoon =
    data &&
    data.filter((lead) => {
      let missionDateJsFormat = convertDateBackInJsFormat(
        lead.DeadlineDateManualMission
      );

      let missionDate = new Date(missionDateJsFormat);
      let missionDateMs = missionDate.getTime();
      return (
        missionDateMs > todayMs &&
        missionDateMs < dateIn5DaysMs &&
        lead.manualMissionPerformed === null
      );
    });

  return filterAllMissionWithDeadlineSoon;
};

// check if added date 3 last days - return boolean value
export const checkIfAddedDateLast3Days = (addedDate) => {
  let getTodayDate = convertDateBackInJsFormat(getCurrentDate());

  let today = new Date(getTodayDate);
  let dateBefore3Days = new Date(today);
  dateBefore3Days.setDate(dateBefore3Days.getDate() - 3);

  let todayMs = today.getTime();
  let dateBefore3DaysMs = dateBefore3Days.getTime();

  let addedDateJsFormat = new Date(convertDateBackInJsFormat(addedDate));
  let addedDateJsFormatMs = addedDateJsFormat.getTime();

  if (addedDateJsFormatMs <= todayMs && addedDateJsFormatMs > dateBefore3Days) {
    return true;
  } else {
    return false;
  }
};

// return all new lead - joined before number of days
export const filterAllNewLeadsPerTime = (data, numOfDaysAgo) => {
  if (data) {
    let getTodayDate = convertDateBackInJsFormat(getCurrentDate());
    let today = new Date(getTodayDate);
    let dateOfNewLead = new Date(today);
    dateOfNewLead.setDate(dateOfNewLead.getDate() - numOfDaysAgo);

    let todayMs = today.getTime();
    let dateOfNewLeadMs = dateOfNewLead.getTime();

    let filterLeads = data.filter((lead) => {
      let leadAddedDate = convertDateBackInJsFormat(lead.addedDate);
      let leadAddedDateJs = new Date(leadAddedDate);
      let leadAddedDateJsMs = leadAddedDateJs.getTime();
      return (
        leadAddedDateJsMs <= todayMs && leadAddedDateJsMs >= dateOfNewLeadMs
      );
    });

    return filterLeads;
  }
};

// return all leads joined 1 year ago
export const filterLeadsJoinedOneYearAgo = (data) => {
  if (data) {
    let getTodayDate = convertDateBackInJsFormat(getCurrentDate());
    let today = new Date(getTodayDate);
    let dateOfYearAgo = new Date(today);
    dateOfYearAgo.setFullYear(dateOfYearAgo.getFullYear() - 1);

    let todayMs = today.getTime();
    let dateOfYearAgoMs = dateOfYearAgo.getTime();

    let filterLeads = data.filter((lead) => {
      let leadAddedDate = convertDateBackInJsFormat(lead.addedDate);
      let leadAddedDateJs = new Date(leadAddedDate);
      let leadAddedDateJsMs = leadAddedDateJs.getTime();
      return (
        leadAddedDateJsMs <= todayMs && leadAddedDateJsMs >= dateOfYearAgoMs
      );
    });

    return filterLeads;
  }
};

// return all leads joined before specific month of current or prev year
export const filterLeadsJoinedBeforeSpecificMonthAndYear = (
  data,
  monthNum,
  whichYear
) => {
  if (data) {
    let getTodayDate = convertDateBackInJsFormat(getCurrentDate());
    let today = new Date(getTodayDate);
    let todayYear = today.getFullYear();
    let prevYear = todayYear - 1;

    // get date and time ms in js format
    let todayYearMonthNumJs = new Date(`${monthNum}/1/${todayYear}`);
    let todayYearMonthNumJsMs = todayYearMonthNumJs.getTime();
    let prevYearMonthNumJs = new Date(`${monthNum}/1/${prevYear}`);
    let prevYearMonthNumJsMs = prevYearMonthNumJs.getTime();

    // filtet data according to month and year
    let filterLeads;

    if (whichYear == "current year") {
      filterLeads = data.filter((lead) => {
        let leadAddedDate = convertDateBackInJsFormat(lead.addedDate);
        let leadAddedDateJs = new Date(leadAddedDate);
        let leadAddedDateJsMs = leadAddedDateJs.getTime();
        return leadAddedDateJsMs < todayYearMonthNumJsMs;
      });
    } else if (whichYear == "prev year") {
      filterLeads = data.filter((lead) => {
        let leadAddedDate = convertDateBackInJsFormat(lead.addedDate);
        let leadAddedDateJs = new Date(leadAddedDate);
        let leadAddedDateJsMs = leadAddedDateJs.getTime();
        return leadAddedDateJsMs < prevYearMonthNumJsMs;
      });
    }

    return filterLeads;
  }
};

// return leads joined on specific Month
export const filterLeadsJoinedOnSpecificMonth = (data, monthNum) => {
  if (data) {
    let filterLeads = data.filter((lead) => {
      let leadAddedDate = convertDateBackInJsFormat(lead.addedDate);
      let leadAddedDateJs = new Date(leadAddedDate);
      let leadAddedDateJsGetMonth = leadAddedDateJs.getMonth() + 1;
      return leadAddedDateJsGetMonth == monthNum;
    });
    return filterLeads;
  }
};

// sort manual mission according to deadline date
export const sortManualMissionAccordingToDeadlineDate = (data) => {
  let sortedManualMissionArr;
  if (data) {
    sortedManualMissionArr = data.slice();

    // sort num according to num
    function compare(a, b) {
      if (a.DeadlineDateManualMission < b.DeadlineDateManualMission) {
        return -1;
      }
      if (a.DeadlineDateManualMission > b.DeadlineDateManualMission) {
        return 1;
      }
      return 0;
    }

    // loop change to js format and sort
    for (let i = 0; i < sortedManualMissionArr.length; i++) {
      sortedManualMissionArr[
        i
      ].DeadlineDateManualMission = convertDateBackInJsFormat(
        sortedManualMissionArr[i].DeadlineDateManualMission
      );
      sortedManualMissionArr[i].DeadlineDateManualMission = new Date(
        sortedManualMissionArr[i].DeadlineDateManualMission
      ).getTime();
    }
    sortedManualMissionArr.sort(compare);

    // loop and convert back to date user format
    for (let i = 0; i < sortedManualMissionArr.length; i++) {
      let day = new Date(
        sortedManualMissionArr[i].DeadlineDateManualMission
      ).getDate();
      let month =
        new Date(
          sortedManualMissionArr[i].DeadlineDateManualMission
        ).getMonth() + 1;
      let year = new Date(
        sortedManualMissionArr[i].DeadlineDateManualMission
      ).getFullYear();

      sortedManualMissionArr[i].DeadlineDateManualMission =
        day + "/" + month + "/" + year;
    }
  }

  return sortedManualMissionArr;
};

// sort leads according to added date
export const sortLeadsAccordingToAddedDate = (data) => {
  let sortedAddedDateArr;
  if (data) {
    sortedAddedDateArr = data.slice();

    // sort num according to num
    function compareDates(a, b) {
      if (a.addedDate > b.addedDate) {
        return -1;
      }
      if (a.addedDate < b.addedDate) {
        return 1;
      }
      return 0;
    } // end compareDates func

    // loop change to js format and sort
    for (let i = 0; i < sortedAddedDateArr.length; i++) {
      sortedAddedDateArr[i].addedDate = convertDateBackInJsFormat(
        sortedAddedDateArr[i].addedDate
      );
      sortedAddedDateArr[i].addedDate = new Date(
        sortedAddedDateArr[i].addedDate
      ).getTime();
    }
    sortedAddedDateArr.sort(compareDates);

    // loop and convert back to date user format
    for (let i = 0; i < sortedAddedDateArr.length; i++) {
      let day = new Date(sortedAddedDateArr[i].addedDate).getDate();
      let month = new Date(sortedAddedDateArr[i].addedDate).getMonth() + 1;
      let year = new Date(sortedAddedDateArr[i].addedDate).getFullYear();

      sortedAddedDateArr[i].addedDate = day + "/" + month + "/" + year;
    }

    return sortedAddedDateArr;
  } // end condition
};

export function checkIfFbDateAndRemoveHour(date) {
  if (date.indexOf("T") > -1) {
    let slicedFbDate = date.split("T");
    let getOnlyDate = slicedFbDate[0];
    return getOnlyDate;
  } else {
    return date;
  }
}
