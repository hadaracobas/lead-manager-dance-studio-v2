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

export const getCurrentDate = () => {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let fullCurrentDate = day + "/" + month + "/" + year;
  return fullCurrentDate;
};

export const getCurrentHour = () => {
  let d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let currentHour = hour + ":" + minutes;
  return currentHour;
};
