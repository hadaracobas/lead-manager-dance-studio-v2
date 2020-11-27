import React, { useState, useEffect } from "react";
import "./index.scss";

function Home(props) {
  const [filledRowsFromData, setFilledRowsFromData] = useState(false);
  const [lastMonthRows, setLastMonthRows] = useState(false);
  const [lastWeekRows, setLastWeekRows] = useState(false);
  const [todayRows, setTodayRows] = useState(false);
  const [rowsUpToRate6, setRowsUpToRate6] = useState(false);

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
    rowsUpToRate6
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
  }, [filledRowsFromData]);

  return <div className="home"></div>;
}

export default Home;
