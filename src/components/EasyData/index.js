import React, { useState, useEffect } from "react";
import "./index.scss";

//import components
import DataCard from "../DataCard";
import DataChartPie from "../DataChartPie";
import DataAreaChart from "../DataAreaChart";

function EasyData(props) {
  const [filledRowsFromData, setFilledRowsFromData] = useState(false);
  const [lastMonthRows, setLastMonthRows] = useState(false);
  const [lastWeekRows, setLastWeekRows] = useState(false);
  const [todayRows, setTodayRows] = useState(false);
  const [rowsUpToRate6, setRowsUpToRate6] = useState(false);
  const [rowsLeadSourceGeneral, setRowsLeadSourceGeneral] = useState(false);
  const [rowsLeadSourceTel, setRowsLeadSourceTel] = useState(false);
  const [rowsLeadSourceWebForm, setRowsLeadSourceWebForm] = useState(false);
  const [LeadSourceChartArr, setLeadSourceChartArr] = useState(false);

  console.log(
    "all filled rows: ",
    filledRowsFromData,
    " last month: ",
    lastMonthRows,
    " last week: ",
    lastWeekRows,
    " today rows: ",
    todayRows,
    " up to rate 6: ",
    rowsUpToRate6,
    " lead source general: ",
    rowsLeadSourceGeneral,
    " lead source tel: ",
    rowsLeadSourceTel,
    " lead source web form: ",
    rowsLeadSourceWebForm,
    " chart lead source arr: ",
    LeadSourceChartArr
  );

  // function to filter, get all filled rows  and store in state
  const getFilledRowsFromData = () => {
    let storeFilledRows;
    if (props.data) {
      storeFilledRows = props.data.filter((row) => {
        return row.ID !== "";
      });
      setFilledRowsFromData(storeFilledRows);
    }
  };

  // function return current month full data
  const getCurrentDate = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let builtDate =
      day.toString() + "/" + month.toString() + "/" + year.toString();
    let builtHour =
      hour.toString() + ":" + minute.toString() + ":" + second.toString();

    return builtDate;
  };

  // function return prev month full data
  const getPrevMonthDate = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();

    let prevDate =
      day.toString() + "/" + month.toString() + "/" + year.toString();

    return prevDate;
  };

  // function to filter, get all rows from the last month and store in state
  const getRowsLastMonth = () => {
    if (filledRowsFromData) {
      let getRelevantRows = filledRowsFromData.filter((ele) => {
        let splitedCurrentDate = getCurrentDate().split("/");
        let curDate = new Date(
          splitedCurrentDate[2],
          parseInt(splitedCurrentDate[1]) - 1,
          splitedCurrentDate[0]
        );

        let splitedPrevMonthDate = getPrevMonthDate().split("/");
        let preDate = new Date(
          splitedPrevMonthDate[2],
          parseInt(splitedPrevMonthDate[1]) - 1,
          splitedPrevMonthDate[0]
        );

        let rowOfSheet = ele.Date.split("/");
        let rowDate = new Date(
          rowOfSheet[2],
          parseInt(rowOfSheet[1]) - 1,
          rowOfSheet[0]
        );

        return rowDate >= preDate && rowDate <= curDate;
      });

      setLastMonthRows(getRelevantRows);
    }
  };

  // function to filter, get all rows from the last week and store in state
  const getRowsLastWeek = () => {
    if (filledRowsFromData) {
      let getRelevantRows = filledRowsFromData.filter((ele) => {
        let splitedCurrentDate = getCurrentDate().split("/");
        let curDate = new Date(
          splitedCurrentDate[2],
          parseInt(splitedCurrentDate[1]) - 1,
          splitedCurrentDate[0]
        );

        let splitedPrevWeekDate = getCurrentDate().split("/");
        let preDate = new Date(
          splitedPrevWeekDate[2],
          parseInt(splitedPrevWeekDate[1]) - 1,
          splitedPrevWeekDate[0] - 7
        );

        let rowOfSheet = ele.Date.split("/");
        let rowDate = new Date(
          rowOfSheet[2],
          parseInt(rowOfSheet[1]) - 1,
          rowOfSheet[0]
        );

        return rowDate >= preDate && rowDate <= curDate;
      });
      setLastWeekRows(getRelevantRows);
    }
  };

  // function to filter, get all rows from today and store in state
  const getRowsToday = () => {
    if (filledRowsFromData) {
      let getRelevantRows = filledRowsFromData.filter((ele) => {
        let curDate = getCurrentDate();

        let rowDate = ele.Date;

        return curDate == rowDate;
      });
      setTodayRows(getRelevantRows);
    }
  };

  // function to filter, get all rows up to rate 6
  const getRowsUpToRate6 = () => {
    if (filledRowsFromData) {
      let getRelevantRows = filledRowsFromData.filter((ele) => {
        return parseInt(ele.LeadRate) >= 6;
      });
      setRowsUpToRate6(getRelevantRows);
    }
  };

  // function to filter, fet all rows LeadSource כללי
  const getRowsLeadSourceGeneral = () => {
    if (filledRowsFromData) {
      let getReleventRows = filledRowsFromData.filter((ele) => {
        return ele.LeadSource == "כללי";
      });
      setRowsLeadSourceGeneral(getReleventRows);
    }
  };

  // function to filter, fet all rows LeadSource ליד טלפוני
  const getRowsLeadSourceTel = () => {
    if (filledRowsFromData) {
      let getReleventRows = filledRowsFromData.filter((ele) => {
        return ele.LeadSource == "ליד טלפוני";
      });
      setRowsLeadSourceTel(getReleventRows);
    }
  };

  // function to filter, fet all rows LeadSource דף נחיתה
  const getRowsLeadSourceWebForm = () => {
    if (filledRowsFromData) {
      let getReleventRows = filledRowsFromData.filter((ele) => {
        return ele.LeadSource == "דף נחיתה";
      });
      setRowsLeadSourceWebForm(getReleventRows);
    }
  };

  // function to create arr to lead source chart
  const createArrToLeadSourceChart = () => {
    if (rowsLeadSourceGeneral && rowsLeadSourceTel && rowsLeadSourceWebForm) {
      setLeadSourceChartArr([
        {
          name: "כללי-הוסף ידנית",
          value: rowsLeadSourceGeneral.length,
        },
        {
          name: "טלפוני",
          value: rowsLeadSourceTel.length,
        },
        {
          name: "טופס אתר",
          value: rowsLeadSourceWebForm.length,
        },
      ]);
    }
  };

  // fire function get all filled rows
  useEffect(() => {
    getFilledRowsFromData();
  }, [props.data]);

  // fire function get rows of last month, last week, today and up to rate 6
  useEffect(() => {
    getRowsLastMonth();
    getRowsLastWeek();
    getRowsToday();
    getRowsUpToRate6();
    getRowsLeadSourceGeneral();
    getRowsLeadSourceTel();
    getRowsLeadSourceWebForm();
  }, [filledRowsFromData]);

  // fire functions to build chart arrays
  useEffect(() => {
    createArrToLeadSourceChart();
  }, [rowsLeadSourceGeneral, rowsLeadSourceTel, rowsLeadSourceWebForm]);

  return (
    <div className="easyData">
      <div className="easyData__top">
        <div className="easyData__top--box easyData__top--box1">
          <DataCard
            titleCard='סה"כ לידים בטבלת לידים'
            num={filledRowsFromData.length}
          />
        </div>
        <div className="easyData__top--box easyData__top--box2">
          <DataCard
            titleCard="לידים חדשים"
            num={`החודש ${lastMonthRows.length} | השבוע ${lastWeekRows.length} | היום ${todayRows.length}`}
          />
        </div>
        <div className="easyData__top--box easyData__top--box3">
          <DataCard
            titleCard='סה"כ לידים משתלמים מעל דירוג 6'
            num={rowsUpToRate6.length}
          />
        </div>
      </div>

      <div className="easyData__bottom">
        <div className="easyData__bottom--chartsContainer">
          <div className="easyData__bottom--chartContainer">
            <h3 className="easyData__bottom--chartTitle">
              {" "}
              סה"כ לידים לפי מקור
            </h3>
            <DataChartPie data={LeadSourceChartArr} />
          </div>
          <div className="easyData__bottom--chartContainer">
            <h3 className="easyData__bottom--chartTitle">
              {" "}
              כמות לידים לפי זמן
            </h3>
            <DataAreaChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EasyData;
