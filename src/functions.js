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

// return all leads in sell process
export const filterAllLeadsInSellProcess = (data) => {
  let leadsInSellProcess =
    data &&
    data.filter(
      (lead) =>
        lead.leadStep === "מתעניין" ||
        lead.leadStep === "הוזמן לשיעור ניסיון" ||
        lead.leadStep === "היה בשיעור ניסיון"
    );
  return leadsInSellProcess;
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

// return all the leads that are in step "נרשם כמנוי"
export const filterAllLeadsInStep4 = (data) => {
  let step4Leads =
    data && data.filter((lead) => lead.leadStep === "נרשם כמנוי");
  return step4Leads;
};

// return all the leads according to leadSource "טלפוני"
export const filterAllLeadsAccoordingToLeadSourceTel = (data) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource == "טלפוני");
  return filterLeads;
};

// return all the leads according to leadSource "אתר"
export const filterAllLeadsAccoordingToLeadSourceWeb = (data) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource == "אתר");
  return filterLeads;
};

// return all the leads according to leadSource "אחר"
export const filterAllLeadsAccoordingToLeadSourceDifferent = (data) => {
  let filterLeads = data && data.filter((lead) => lead.leadSource == "אחר");
  return filterLeads;
};

// return all the leads with open manual missions
export const filterAllLeadsWithOpenMissions = (data) => {
  let LeadsWithOpenMissions =
    data &&
    data.filter(
      (lead) =>
        lead.manualMissionDescription !== null &&
        lead.manualMissionPerformed !== "TRUE"
    );
  return LeadsWithOpenMissions;
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

const exampleData = [
  {
    ID: "1",
    addedDate: "29/1/2020",
    addedHour: "15:9",
    leadSource: "טלפוני",
    name: "הדר אקובס",
    email: "hadarsites1@gmail.com",
    tel: "054-889756365",
    age: "ב",
    releventBranch: "הדר עם, צורן",
    relevantDanceType: "היפ הופ,מודרני,בלט",
    lastUpdateDate: "24/12/2020",
    lastUpdateHour: "16:33",
    leadStep: "מתעניין",
    recommendedSystemMission: "לרשום כמנוי קבוע",
    manualMissionDescription: "להתקשר בשבוע הבא על מנת לקחת פרטי כרטיס אשראי",
    manualTypeMission: "תזכורת",
    dateManualMissionCreated: "18/12/2020",
    DeadlineDateManualMission: "29/12/2020",
    manualMissionCreateByTeamMember: "רועי כהן",
    manualMissionAssociatedToTeamMember: "לירון לוי",
    manualMissionPerformed: "TRUE",
    DateManualMissionPerformed: "27/6/2020",
    isTheLeadRelevant: "TRUE",
    leadPurchased: "TRUE",
    PurchasedAmount: "2200",
    LeadRate: "10",
    LeadCost: "44",
    event1Interest: "התקשרנו ונקבע שיעור ניסיון",
    dateEvent1: "2020-05-24",
    statusEvent1: "קנה",
    event2WasTrialLesson: "הגיע לשיעור ניסיון",
    dateEvent2: null,
    statusEvent2: null,
  },
  {
    ID: "2",
    addedDate: "29/1/2020",
    addedHour: "15:12",
    leadSource: "אתר",
    name: "julia piringer  levi acobas",
    email: "julia@gmail.com",
    tel: "547896985",
    age: "5",
    releventBranch: "הדר עם",
    relevantDanceType: "היפ הופ,מודרני",
    lastUpdateDate: "13/12/2020",
    lastUpdateHour: "",
    leadStep: "היה בשיעור ניסיון",
    recommendedSystemMission: "לקבוע מועד שיעור ניסיון",
    manualMissionDescription: " משימה לדוגמא תיאור משימה לדוגמא תיאור",
    manualTypeMission: null,
    dateManualMissionCreated: null,
    DeadlineDateManualMission: "31/12/2020",
    manualMissionCreateByTeamMember: null,
    manualMissionAssociatedToTeamMember: null,
    manualMissionPerformed: "TRUE",
    DateManualMissionPerformed: null,
    isTheLeadRelevant: null,
    leadPurchased: null,
    PurchasedAmount: "223",
    LeadRate: null,
    LeadCost: "44",
    event1Interest: null,
    dateEvent1: null,
    statusEvent1: null,
    event2WasTrialLesson: null,
    dateEvent2: null,
    statusEvent2: null,
  },
  {
    ID: "3",
    addedDate: "1/2/2020",
    addedHour: "15:14",
    leadSource: "אחר",
    name: "רונן שלורנטיין 2",
    email: "ronen@gmail.com",
    tel: "5475545",
    age: "ב",
    releventBranch: "הדר עם",
    relevantDanceType: "היפ הופ,בלט",
    lastUpdateDate: "13/12/2020",
    lastUpdateHour: "",
    leadStep: "היה בשיעור ניסיון",
    recommendedSystemMission: "לרשום כמנוי קבוע",
    manualMissionDescription: "להתקשר פעם נוספת בשבוע הבא",
    manualTypeMission: null,
    dateManualMissionCreated: null,
    DeadlineDateManualMission: "1/1/2021",
    manualMissionCreateByTeamMember: null,
    manualMissionAssociatedToTeamMember: null,
    manualMissionPerformed: null,
    DateManualMissionPerformed: null,
    isTheLeadRelevant: null,
    leadPurchased: null,
    PurchasedAmount: null,
    LeadRate: null,
    LeadCost: null,
    event1Interest: null,
    dateEvent1: null,
    statusEvent1: null,
    event2WasTrialLesson: null,
    dateEvent2: null,
    statusEvent2: null,
  },
];

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
