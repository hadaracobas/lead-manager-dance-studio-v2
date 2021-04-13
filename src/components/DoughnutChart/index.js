import React from "react";
import "./index.scss";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart(props) {
  return (
    <div className="doughnutChart">
      <Doughnut
        data={{
          //labels: ["אחר", "הגיע למשרד", "טלפוני", "אתר"],
          //labels: props.relCustomerDataObj.leadSources,
          labels: [
            props.relCustomerDataObj.leadSources[5],
            props.relCustomerDataObj.leadSources[4],
            props.relCustomerDataObj.leadSources[3],
            props.relCustomerDataObj.leadSources[2],
            props.relCustomerDataObj.leadSources[1],
            props.relCustomerDataObj.leadSources[0],
          ],
          datasets: [
            {
              data: props.arrOfDataNum,

              backgroundColor: [
                "#003f5c",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#000000",
                "#ffa600",
              ],
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          legend: {
            rtl: true,
          },
        }}
      />
    </div>
  );
}

export default DoughnutChart;
