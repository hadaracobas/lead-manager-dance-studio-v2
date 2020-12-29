import React, { useState, useEffect } from "react";
import "./index.scss";
import DataCard from "../DataCard";

import {
  filterAllLeadsInStep1,
  filterAllLeadsInStep2,
  filterAllLeadsInStep3,
  filterAllLeadsInStep4,
  filterAllLeadsInSellProcess,
  filterAllNewLeadsPerTime,
} from "../../functions";

function Statistics(props) {
  const [leadsInStep1, setLeadsInStep1] = useState(false);
  const [leadsInStep2, setLeadsInStep2] = useState(false);
  const [leadsInStep3, setLeadsInStep3] = useState(false);
  const [leadsInStep4, setLeadsInStep4] = useState(false);
  const [leadsInSellProcess, setLeadsInSellProcess] = useState(false);

  useEffect(() => {
    setLeadsInStep1(filterAllLeadsInStep1(props.data));
    setLeadsInStep2(filterAllLeadsInStep2(props.data));
    setLeadsInStep3(filterAllLeadsInStep3(props.data));
    setLeadsInStep4(filterAllLeadsInStep4(props.data));
    setLeadsInSellProcess(filterAllLeadsInSellProcess(props.data));
  }, [props.data]);

  console.log(
    "statistics: ",
    props.data,
    "sell process: ",
    leadsInSellProcess
    //"1 week new leads: ",
    // filterAllNewLeadsPerTime(props.data, 0)
  );
  return (
    <div className="statistics">
      <h2 className="statistics__title">תמונת מצב</h2>
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
    </div>
  );
}

export default Statistics;
