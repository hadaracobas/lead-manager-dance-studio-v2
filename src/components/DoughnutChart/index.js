import React from "react";
import "./index.scss";
import { Doughnut } from "react-chartjs-2";

function DoughnutChart(props) {
  return (
    <div className="doughnutChart">
      <Doughnut
        data={{
          labels: ["אתר", "טלפוני", "אחר"],
          datasets: [
            {
              data: props.arrOfDataNum,

              backgroundColor: [
                "rgba(255, 99, 132, 0.8)",
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 206, 86, 0.8)",
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
