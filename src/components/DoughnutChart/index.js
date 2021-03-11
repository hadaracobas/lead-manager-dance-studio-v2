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
            props.relCustomerDataObj.leadSources[3],
            props.relCustomerDataObj.leadSources[2],
            props.relCustomerDataObj.leadSources[1],
            props.relCustomerDataObj.leadSources[0],
          ],
          datasets: [
            {
              data: props.arrOfDataNum,

              backgroundColor: [
                "gray",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
                "rgba(255, 99, 132, 0.8)",
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
