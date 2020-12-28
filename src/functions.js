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

// return all the leads that are in step "מתעניין"
export const filterAllLeadsInStep1 = (data) => {
  let step1Leads = data && data.filter((lead) => lead.leadStep === "מתעניין");
  return step1Leads;
};

// return all the leads that are in step "הוזמן לשיעור ניסיון"
export const filterAllLeadsInStep2 = (data) => {
  let step2Leads =
    data && data.filter((lead) => lead.leadStep === "הוזמן לשיעור ניסיון");
  return step2Leads;
};

// return all the leads that are in step "היה בשיעור ניסיון"
export const filterAllLeadsInStep3 = (data) => {
  let step3Leads =
    data && data.filter((lead) => lead.leadStep === "היה בשיעור ניסיון");
  return step3Leads;
};

// convert user date format back to js date format
export const convertDateBackInJsFormat = (dateUserFormat) => {
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

// return all the manual mission with deadline in - 5 days
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
