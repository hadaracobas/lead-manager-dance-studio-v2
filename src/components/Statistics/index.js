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
    setLeadsInStep1(
      filterAllLeadsInStep1(props.data, props.relCustomerDataObj.funnelSteps[0])
    );
    setLeadsInStep2(
      filterAllLeadsInStep2(props.data, props.relCustomerDataObj.funnelSteps[1])
    );
    setLeadsInStep3(
      filterAllLeadsInStep3(props.data, props.relCustomerDataObj.funnelSteps[2])
    );
    setLeadsInStep4(
      filterAllLeadsInStep4(props.data, props.relCustomerDataObj.funnelSteps[3])
    );
    setLeadsInSellProcess(
      filterAllLeadsInSellProcess(
        props.data,
        props.relCustomerDataObj.funnelSteps[0],
        props.relCustomerDataObj.funnelSteps[1],
        props.relCustomerDataObj.funnelSteps[2]
      )
    );
    setLastYearLeads(filterLeadsJoinedOneYearAgo(props.data));
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

    // set arr of nums leads joined before specific month and current year
    setArrOfAmountLeadsJoinedBeforeSpecificMonthAndCurrentYear([
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/1/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            1,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/2/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            2,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/3/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            3,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/4/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            4,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/5/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            5,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/6/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            6,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/7/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            7,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/8/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            8,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/9/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            9,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/10/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            10,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/11/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
            11,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/12/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInSellProcess(
              props.data,
              props.relCustomerDataObj.funnelSteps[0],
              props.relCustomerDataObj.funnelSteps[1],
              props.relCustomerDataObj.funnelSteps[2]
            ),
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
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            1,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/2/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            2,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/3/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            3,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/4/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            4,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/5/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            5,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/6/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            6,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/7/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            7,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/8/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            8,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/9/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            9,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/10/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            10,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/11/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
            11,
            "current year"
          ).length,
      firstOfCurrentMonthAndYearMs <
      new Date(convertDateBackInJsFormat(`1/12/${currentYear}`)).getTime()
        ? 0
        : filterLeadsJoinedBeforeSpecificMonthAndYear(
            filterAllLeadsInStep4(
              props.data,
              props.relCustomerDataObj.funnelSteps[3]
            ),
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
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          1,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          2,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          3,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          4,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          5,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          6,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          7,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          8,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          9,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          10,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          11,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInSellProcess(
            props.data,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          12,
          "prev year"
        ).length,
    ]);

    // set arr of nums subscribers joined before specific month and prev year
    setArrOfAmountSubscribersJoinedBeforeSpecificMonthAndPrevYear([
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          1,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          2,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          3,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          4,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          5,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          6,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          7,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          8,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          9,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          10,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          11,
          "prev year"
        ).length,
      props.data &&
        filterLeadsJoinedBeforeSpecificMonthAndYear(
          filterAllLeadsInStep4(
            props.data,
            props.relCustomerDataObj.funnelSteps[3]
          ),
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
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          1
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          2
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          3
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          4
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          5
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          6
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          7
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          8
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          9
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          10
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          11
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInSellProcess(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[0],
            props.relCustomerDataObj.funnelSteps[1],
            props.relCustomerDataObj.funnelSteps[2]
          ),
          12
        ).length,
    ]);

    // set amount of leads joined according to specific month - active subscribers
    setArrOfAmonthNewLeadsInSellProcBecomeSubscribersJoinedAccordingToMonth([
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          1
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          2
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          3
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          4
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          5
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          6
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          7
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          8
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          9
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          10
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
          11
        ).length,
      lastYearLeads &&
        filterLeadsJoinedOnSpecificMonth(
          filterAllLeadsInStep4(
            lastYearLeads,
            props.relCustomerDataObj.funnelSteps[3]
          ),
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
      <h2 className="statistics__title">?????????? ??????</h2>
      {/*
            <div className="statistics__cards">
        <div className="statistics__card">
          <DataCard
            titleCard='????"?? ??????????'
            num={`???????????? ??????????: ${
              props.data &&
              leadsInStep1.length + leadsInStep2.length + leadsInStep3.length
            } | ????????????: ${leadsInStep4 && leadsInStep4.length}`}
          />
        </div>
        <div className="statistics__card">
          <DataCard
            titleCard='????"?? ?????????? ???????????? ??????????'
            num={`??????????????????: ${
              leadsInStep1 && leadsInStep1.length
            } | ???????????? ???????????? ????????????: ${
              leadsInStep2 && leadsInStep2.length
            } | ?????? ???????????? ????????????: ${leadsInStep3 && leadsInStep3.length}`}
          />
        </div>
        <div className="statistics__card">
          <DataCard
            titleCard="?????????? ?????????? ???????????? ??????????"
            //num="????????: 2 | ??????????: 14 | ??????????: 24 "
            num={`????????: ${
              leadsInSellProcess &&
              filterAllNewLeadsPerTime(leadsInSellProcess, 0).length
            } | ??????????: ${
              leadsInSellProcess &&
              filterAllNewLeadsPerTime(leadsInSellProcess, 7).length
            } | ??????????: ${
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
            <h4>???????? ?????????? ???????? ????????</h4>

            <p>
              ???????? ???? ???????????? ???????? ???????????? ?????????? ?????????????? ???????????? ???????????? ?????? ????????????.
              ????????????, ???????? ???? ???? ???????????? ?????????? ?????????? 2021, ???? ???????? ???? ????????????
              ???????????? ?????????? ?????????????? (?????? ???????? ????????) ???????? ???????? ?????????? 2021.
            </p>
            <br></br>
            <p>
              ?????? ???? ???????? ???? ???????? ?????????? ?????????? ???? ???????? ???????????? ???????????????? ?????? ??????????
              ????????, ???????? ???????? ???????? ???? ?????????? ???????? ??????.
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
            ???????????? ???????????? ????????:{" "}
            {toggleWhichYearDisplayInChart == "current year"
              ? currentYear
              : toggleWhichYearDisplayInChart == "prev year"
              ? prevYear
              : null}
          </div>

          {toggleWhichYearDisplayInChart == "current year" ? (
            <LineChart
              labels={[
                "???? 1 ????????????",
                "???? 1 ????????????",
                "???? 1 ????????",
                "???? 1 ????????????",
                "???? 1 ????????",
                "???? 1 ??????????",
                "???? 1 ??????????",
                "???? 1 ??????????????",
                "???? 1 ??????????????",
                "???? 1 ????????????????",
                "???? 1 ??????????????",
                "???? 1 ????????????",
              ]}
              arrOfNumData1={
                arrOfAmountLeadsJoinedBeforeSpecificMonthAndCurrentYear
              }
              label1="???????? ?????????? ???????????? ??????????"
              arrOfNumData2={
                arrOfAmountSubscribersJoinedBeforeSpecificMonthAndCurrentYear
              }
              label2="???????? ????????????/????????????"
              arrOfNumData3={
                arrOfAmountTotalJoinedBeforeSpecificMonthAndCurrentYear
              }
              label3='????"??'
            />
          ) : toggleWhichYearDisplayInChart == "prev year" ? (
            <LineChart
              labels={[
                "???? 1 ????????????",
                "???? 1 ????????????",
                "???? 1 ????????",
                "???? 1 ????????????",
                "???? 1 ????????",
                "???? 1 ??????????",
                "???? 1 ??????????",
                "???? 1 ??????????????",
                "???? 1 ??????????????",
                "???? 1 ????????????????",
                "???? 1 ??????????????",
                "???? 1 ????????????",
              ]}
              arrOfNumData1={
                arrOfAmountLeadsJoinedBeforeSpecificMonthAndPrevYear
              }
              label1="???????? ?????????? ???????????? ??????????"
              arrOfNumData2={
                arrOfAmountSubscribersJoinedBeforeSpecificMonthAndPrevYear
              }
              label2="???????? ????????????/????????????"
              arrOfNumData3={
                arrOfAmountTotalJoinedBeforeSpecificMonthAndPrevYear
              }
              label3='????"??'
            />
          ) : null}
        </div>

        <div className="statistics__chart">
          <div className="statistics__chartDesc">
            <h4>?????????? ?????????? ???????? ?????????? ????????????</h4>

            <p>
              ?????????? ?????????? ??????????, ???????? ???? ???????????? ???? ???????????? ???????????? ???????????? ??????????
              ???????? ????????????, ?????? ???? ???????? ???????? ????????????. ???????? ???? ???????????? ?????????????? ???? 12
              ?????????? ?????????????? ????????????????.
            </p>
            <br></br>
            <p>
              ?????? ???? ???????? ???? ?????????? ???????? ???????????? ???????????????? ?????? ?????????? ???????? ????????
              ?????????? ?????????? ???????????????? ???????? ?????????? ??????????????. ????????????, ???????? ?????????? ????????????
              ?????????? ?????????? ??????????, ???????? ?????????? ?????? ?????????? ?????????? ?????????? ??????????, ????????
              ?????????? ?????????? ?????????????? ????????????(???? ???? ?????????? ?????????????? ???????????? ???????? ????????
              ??????????, ?????????? ???????? ?????????? ???? ???????? ??????????).
            </p>
          </div>
          <LineChart
            labels={[
              "??????????",
              "??????????",
              "??????",
              "??????????",
              "??????",
              "????????",
              "????????",
              "????????????",
              "????????????",
              "??????????????",
              "????????????",
              "??????????",
            ]}
            arrOfNumData1={arrOfAmonthNewLeadsInSellProcJoinedAccordingToMonth}
            label1="?????????? ?????????????? ?????????? ???? ?????????? ???????????? ??????????"
            arrOfNumData2={
              arrOfAmonthNewLeadsInSellProcBecomeSubscribersJoinedAccordingToMonth
            }
            label2="?????????? ?????????????? ?????????? ???? ?????????? ??????????????"
            arrOfNumData3={arrOfTotalNewLeadsJinedAccordingToMonth}
            label3='????"?? ?????????? ???????????? ?????????? ????'
          />
        </div>

        {/*
           <div className="statistics__chart">
          <div className="statistics__chartDesc">
            <h4>???????? ?????????? ?????? ???????? ??????</h4>

            <p>
              ???????? ???? ???????????? ???? ???????? ???????????? ???????????????? ?????? ???????? ?????? ?????? ????????????.
            </p>
            <br></br>
            <p>
              ?????? ???? ???????? ???? ?????????? ???????? ???????????? ?????????????? ???????? ?????????? ???????? ???? ??????????.
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
