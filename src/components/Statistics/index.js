import React, { useState, useEffect } from "react";
import "./index.scss";
import DataCard from "../DataCard";
import LineChart from "../LineChart";
import DoughnutChart from "../DoughnutChart";

import { Button } from "@material-ui/core";

import {
  filterAllLeadsInStep1,
  filterAllLeadsInStep2,
  filterAllLeadsInStep3,
  filterAllLeadsInStep4,
  filterAllLeadsInSellProcess,
  filterAllNewLeadsPerTime,
  filterLeadsJoinedOneYearAgo,
  filterLeadsJoinedOnSpecificMonth,
  filterAllLeadsAccoordingToLeadSourceTel,
  filterAllLeadsAccoordingToLeadSourceWeb,
  filterAllLeadsAccoordingToLeadSourceOffice,
  filterAllLeadsAccoordingToLeadSourceDifferent,
  filterLeadsJoinedBeforeSpecificMonthAndYear,
  getCurrentDate,
  convertDateBackInJsFormat,
} from "../../functions";

function Statistics(props) {
  const [leadsInStep1, setLeadsInStep1] = useState(false);
  const [leadsInStep2, setLeadsInStep2] = useState(false);
  const [leadsInStep3, setLeadsInStep3] = useState(false);
  const [leadsInStep4, setLeadsInStep4] = useState(false);
  const [leadsInSellProcess, setLeadsInSellProcess] = useState(false);
  const [lastYearLeads, setLastYearLeads] = useState(false);
  //--
  const [
    arrOfAmountLeadsJoinedBeforeSpecificMonthAndCurrentYear,
    setArrOfAmountLeadsJoinedBeforeSpecificMonthAndCurrentYear,
  ] = useState(false);
  const [
    arrOfAmountLeadsJoinedBeforeSpecificMonthAndPrevYear,
    setArrOfAmountLeadsJoinedBeforeSpecificMonthAndPrevYear,
  ] = useState(false);

  const [
    arrOfAmountSubscribersJoinedBeforeSpecificMonthAndCurrentYear,
    setArrOfAmountSubscribersJoinedBeforeSpecificMonthAndCurrentYear,
  ] = useState(false);
  const [
    arrOfAmountSubscribersJoinedBeforeSpecificMonthAndPrevYear,
    setArrOfAmountSubscribersJoinedBeforeSpecificMonthAndPrevYear,
  ] = useState(false);

  const [
    arrOfAmountTotalJoinedBeforeSpecificMonthAndCurrentYear,
    setArrOfAmountTotalJoinedBeforeSpecificMonthAndCurrentYear,
  ] = useState(false);
  const [
    arrOfAmountTotalJoinedBeforeSpecificMonthAndPrevYear,
    setArrOfAmountTotalJoinedBeforeSpecificMonthAndPrevYear,
  ] = useState(false);

  const [
    toggleWhichYearDisplayInChart,
    setToggleWhichYearDisplayInChart,
  ] = useState("current year");
  //--

  const [
    arrOfAmonthNewLeadsInSellProcJoinedAccordingToMonth,
    setArrOfAmonthNewLeadsInSellProcJoinedAccordingToMonth,
  ] = useState(false);
  const [
    arrOfAmonthNewLeadsInSellProcBecomeSubscribersJoinedAccordingToMonth,
    setArrOfAmonthNewLeadsInSellProcBecomeSubscribersJoinedAccordingToMonth,
  ] = useState(false);
  const [
    arrOfTotalNewLeadsJinedAccordingToMonth,
    setArrOfTotalNewLeadsJinedAccordingToMonth,
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

  //get current year and month to display on chart only data until current month
  let currentYear = new Date(
    convertDateBackInJsFormat(getCurrentDate())
  ).getFullYear();

  let prevYear =
    new Date(convertDateBackInJsFormat(getCurrentDate())).getFullYear() - 1;

  let curentMonthNum =
    new Date(convertDateBackInJsFormat(getCurrentDate())).getMonth() + 1;

  let firstOfCurrentMonthAndYearMs = new Date(
    convertDateBackInJsFormat(`1/${curentMonthNum}/${currentYear}`)
  ).getTime();

  let displayedOnChartMonthMs = new Date(
    convertDateBackInJsFormat(`1/1/${currentYear}`)
  ).getTime();

  useEffect(() => {
    setLeadsInStep1(filterAllLeadsInStep1(props.data));
    setLeadsInStep2(filterAllLeadsInStep2(props.data));
    setLeadsInStep3(filterAllLeadsInStep3(props.data));
    setLeadsInStep4(filterAllLeadsInStep4(props.data));
    setLeadsInSellProcess(filterAllLeadsInSellProcess(props.data));
    setLastYearLeads(filterLeadsJoinedOneYearAgo(props.data));
    setAllLeadsFromSourceTel(
      filterAllLeadsAccoordingToLeadSourceTel(props.data)
    );
    setAllLeadsFromSourceWeb(
      filterAllLeadsAccoordingToLeadSourceWeb(props.data)
    );
    setAllLeadsFromSourceOffice(
      filterAllLeadsAccoordingToLeadSourceOffice(props.data)
    );
    setAllLeadsFromSourceDifferent(
      filterAllLeadsAccoordingToLeadSourceDifferent(props.data)
    );

    // set arr of nums leads joined before specific month and current year
    setArrOfAmountLeadsJoinedBeforeSpecificMonthAndCurrentYear([
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/1/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            1,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/2/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            2,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/3/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            3,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/4/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            4,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/5/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            5,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/6/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            6,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/7/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            7,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/8/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            8,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/9/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            9,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/10/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            10,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/11/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            11,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/12/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(props.data),
            12,
            "current year"
          ).length,
    ]);

    // set arr of nums subscribers joined before specific month and current year
    setArrOfAmountSubscribersJoinedBeforeSpecificMonthAndCurrentYear([
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/1/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            1,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/2/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            2,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/3/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            3,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/4/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            4,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/5/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            5,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/6/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            6,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/7/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            7,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/8/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            8,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/9/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            9,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/10/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            10,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/11/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            11,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/12/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(props.data),
            12,
            "current year"
          ).length,
    ]);

    // set arr of nums total joined before specific month and current year
    setArrOfAmountTotalJoinedBeforeSpecificMonthAndCurrentYear([
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/1/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            1,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/2/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            2,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/3/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            3,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/4/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            4,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/5/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            5,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/6/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            6,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/7/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            7,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/8/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            8,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/9/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            9,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/10/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            10,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/11/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            11,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/12/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            props.data,
            12,
            "current year"
          ).length,
    ]);

    // set arr of nums leads joined before specific month and prev year
    setArrOfAmountLeadsJoinedBeforeSpecificMonthAndPrevYear([
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          1,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          2,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          3,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          4,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          5,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          6,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          7,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          8,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          9,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          10,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          11,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(props.data),
          12,
          "prev year"
        ).length,
    ]);

    // set arr of nums subscribers joined before specific month and prev year
    setArrOfAmountSubscribersJoinedBeforeSpecificMonthAndPrevYear([
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          1,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          2,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          3,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          4,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          5,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          6,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          7,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          8,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          9,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          10,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          11,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(props.data),
          12,
          "prev year"
        ).length,
    ]);

    // props.data

    // set arr of nums total joined before specific month and prev year
    setArrOfAmountTotalJoinedBeforeSpecificMonthAndPrevYear([
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 1, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 2, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 3, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 4, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 5, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 6, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 7, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 8, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 9, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 10, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 11, "prev year")
          .length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(props.data, 12, "prev year")
          .length,
    ]);
  }, [props.data]);

  useEffect(() => {
    // set amount of leads joined in sell process according to specific month
    setArrOfAmonthNewLeadsInSellProcJoinedAccordingToMonth([
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          1
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          2
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          3
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          4
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          5
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          6
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          7
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          8
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          9
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          10
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          11
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(lastYearLeads),
          12
        ).length,
    ]);

    // set amount of leads joined according to specific month - active subscribers
    setArrOfAmonthNewLeadsInSellProcBecomeSubscribersJoinedAccordingToMonth([
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          1
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          2
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          3
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          4
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          5
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          6
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          7
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          8
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          9
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          10
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          11
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(lastYearLeads),
          12
        ).length,
    ]);

    // set amount of leads joined according to specific month -total number
    setArrOfTotalNewLeadsJinedAccordingToMonth([
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 1).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 2).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 3).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 4).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 5).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 6).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 7).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 8).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 9).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 10).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 11).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(lastYearLeads, 12).length,
    ]);
  }, [lastYearLeads]);

  return (
    <div className="statistics">
      <h2 className="statistics__title">תמונת מצב</h2>
      {/*
            <div className="statistics__cards">
        <div className="statistics__card">
          <DataCard
            titleCard='סה"כ לידים'
            num={`בתהליך מכירה: ${
              props.data &&
              leadsInStep1.length + leadsInStep2.length + leadsInStep3.length
            } | מנויים: ${leadsInStep4 && leadsInStep4.length}`}
          />
        </div>
        <div className="statistics__card">
          <DataCard
            titleCard='סה"כ לידים בתהליך מכירה'
            num={`מתעניינים: ${
              leadsInStep1 && leadsInStep1.length
            } | הוזמנו לשיעור ניסיון: ${
              leadsInStep2 && leadsInStep2.length
            } | היו בשיעור ניסיון: ${leadsInStep3 && leadsInStep3.length}`}
          />
        </div>
        <div className="statistics__card">
          <DataCard
            titleCard="לידים חדשים בתהליך מכירה"
            //num="היום: 2 | השבוע: 14 | החודש: 24 "
            num={`היום: ${
              leadsInSellProcess &&
              filterAllNewLeadsPerTime(leadsInSellProcess, 0).length
            } | השבוע: ${
              leadsInSellProcess &&
              filterAllNewLeadsPerTime(leadsInSellProcess, 7).length
            } | החודש: ${
              leadsInSellProcess &&
              filterAllNewLeadsPerTime(leadsInSellProcess, 30).length
            }`}
          />
        </div>
      </div>
      */}

      <div className="statistics__charts">
        <div className="statistics__chart">
          <div className="statistics__chartDesc">
            <h4>כמות לידים ביחס לזמן</h4>

            <p>
              בגרף זה מוצגים כמות הלידים מהשנה הנוכחית ומהשנה הקודמת לפי חודשים.
              לדוגמא, מספר סך כל הלידים בחודש ינואר 2021, זה מספר כל הלידים
              שנוספו לבסיס הנתונים (מכל מקור שהוא) לפני חודש ינואר 2021.
            </p>
            <br></br>
            <p>
              גרף זה עוזר לך לקבל תמונה מהירה על מספר הלידים והלקוחות שלך בהתאם
              לזמן, ומכך לקצב האטת או גדילת העסק שלך.
            </p>
          </div>
          <div className="statistics__chartBtns">
            <Button
              variant="contained"
              onClick={() => setToggleWhichYearDisplayInChart("current year")}
            >
              {new Date(
                convertDateBackInJsFormat(getCurrentDate())
              ).getFullYear()}
            </Button>
            <Button
              variant="contained"
              onClick={() => setToggleWhichYearDisplayInChart("prev year")}
            >
              {new Date(
                convertDateBackInJsFormat(getCurrentDate())
              ).getFullYear() - 1}
            </Button>
          </div>
          <div>
            נתונים מוצגים לשנת:{" "}
            {toggleWhichYearDisplayInChart == "current year"
              ? currentYear
              : toggleWhichYearDisplayInChart == "prev year"
              ? prevYear
              : null}
          </div>

          {toggleWhichYearDisplayInChart == "current year" ? (
            <LineChart
              labels={[
                "עד 1 לינואר",
                "עד 1 לפבואר",
                "עד 1 למרץ",
                "עד 1 לאפריל",
                "עד 1 למאי",
                "עד 1 ליוני",
                "עד 1 ליולי",
                "עד 1 לאוגוסט",
                "עד 1 לספטמבר",
                "עד 1 לאוקטובר",
                "עד 1 לנובמבר",
                "עד 1 לדצמבר",
              ]}
              arrOfNumData1={
                arrOfAmountLeadsJoinedBeforeSpecificMonthAndCurrentYear
              }
              label1="כמות לידים בתהליך מכירה"
              arrOfNumData2={
                arrOfAmountSubscribersJoinedBeforeSpecificMonthAndCurrentYear
              }
              label2="כמות מנויים/לקוחות"
              arrOfNumData3={
                arrOfAmountTotalJoinedBeforeSpecificMonthAndCurrentYear
              }
              label3='סה"כ'
            />
          ) : toggleWhichYearDisplayInChart == "prev year" ? (
            <LineChart
              labels={[
                "עד 1 לינואר",
                "עד 1 לפבואר",
                "עד 1 למרץ",
                "עד 1 לאפריל",
                "עד 1 למאי",
                "עד 1 ליוני",
                "עד 1 ליולי",
                "עד 1 לאוגוסט",
                "עד 1 לספטמבר",
                "עד 1 לאוקטובר",
                "עד 1 לנובמבר",
                "עד 1 לדצמבר",
              ]}
              arrOfNumData1={
                arrOfAmountLeadsJoinedBeforeSpecificMonthAndPrevYear
              }
              label1="כמות לידים בתהליך מכירה"
              arrOfNumData2={
                arrOfAmountSubscribersJoinedBeforeSpecificMonthAndPrevYear
              }
              label2="כמות מנויים/לקוחות"
              arrOfNumData3={
                arrOfAmountTotalJoinedBeforeSpecificMonthAndPrevYear
              }
              label3='סה"כ'
            />
          ) : null}
        </div>

        <div className="statistics__chart">
          <div className="statistics__chartDesc">
            <h4>לידים חדשים ביחס לחודש ספציפי</h4>

            <p>
              בשונה מהגרף הקודם, בגרף זה נמדדים סך הלידים שנוספו למערכת באותו
              חודש ספציפי, ולא עד אותו חודש ספציפי. בגרף זה נמדדים הנתונים של 12
              חודשי הפעילות האחרונים.
            </p>
            <br></br>
            <p>
              גרף זה עוזר לך להבין אילו פעולות שיווקיות היו טובות יותר ומתי
              נוספו לידים איכותיים יותר לבסיס הנתונים. לדוגמא, לאחר פרסום קמפיין
              מסוים בחודש מסוים, אפשר לראות כמה לידים נוספו באותו החודש, וכמה
              מתוכם הומרו ללקוחות פעילים(גם אם הומרו ללקוחות פעילים לאחר אותו
              החודש, עדיין יוצג כמנוי של אותו החודש).
            </p>
          </div>
          <LineChart
            labels={[
              "ינואר",
              "פבואר",
              "מרץ",
              "אפריל",
              "מאי",
              "יוני",
              "יולי",
              "אוגוסט",
              "ספטמבר",
              "אוקטובר",
              "נובמבר",
              "דצמבר",
            ]}
            arrOfNumData1={arrOfAmonthNewLeadsInSellProcJoinedAccordingToMonth}
            label1="לידים שהצטרפו בחודש זה עדיין בתהליך מכירה"
            arrOfNumData2={
              arrOfAmonthNewLeadsInSellProcBecomeSubscribersJoinedAccordingToMonth
            }
            label2="לידים שהצטרפו בחודש זה הומרו למנויים"
            arrOfNumData3={arrOfTotalNewLeadsJinedAccordingToMonth}
            label3='סה"כ לידים הצטרפו בחודש זה'
          />
        </div>

        {/*
           <div className="statistics__chart">
          <div className="statistics__chartDesc">
            <h4>כמות לידים לפי מקוד ליד</h4>

            <p>
              בגרף זה מוצגים סך כמות הלידים והמנויים לפי מקור ליד מכל הזמנים.
            </p>
            <br></br>
            <p>
              גרף זה עוזר לך להבין אילו מקורות מייצרים כמות גדולה יותר של לידים.
            </p>
          </div>
          <div style={{ width: "70%", margin: "0 auto" }}>
          
               <DoughnutChart
              arrOfDataNum={[
                allLeadsFromSourceDifferent.length,
                allLeadsFromSourceOffice.length,
                allLeadsFromSourceTel.length,
                allLeadsFromSourceWeb.length,
              ]}
            />
          
          </div>
        </div>
        */}
      </div>
    </div>
  );
}

export default Statistics;
