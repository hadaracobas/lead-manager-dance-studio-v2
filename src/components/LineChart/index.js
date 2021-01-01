import React from "react";
import "./index.scss";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  return (
    <div className="lineChart">
      <Line
        data={{
          labels: props.labels,
          datasets: [
            {
              label: props.label3,
              // datasetKeyProvider: 3,
              data: props.arrOfNumData3,
              fill: false,
              backgroundColor: ["rgba(255, 159, 64, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 2,
            },
            {
              label: props.label1,
              //datasetKeyProvider: 1,
              data: props.arrOfNumData1,
              fill: false,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 0.8)"],
              borderWidth: 2,
            },
            {
              label: props.label2,
              //datasetKeyProvider: 2,
              data: props.arrOfNumData2,
              fill: false,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(255, 206, 86, 0.8)"],
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          legend: {
            rtl: true,
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default LineChart;
