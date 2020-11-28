import React, { PureComponent } from "react";
import "./index.scss";
import { PieChart, Pie, Sector, Cell } from "recharts";

const data = [
  { name: "קבוצה 1", value: 400 },
  { name: "קבוצה 2", value: 300 },
  { name: "קבוצה 3", value: 300 },
  { name: "קבוצה 4", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class DataChartPie extends PureComponent {
  constructor(props) {
    super(props);
  }
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";

  render() {
    return (
      <div className="dataChartPie">
        <div className="dataChartPie__chartPieContainer">
          <PieChart width={400} height={400}>
            <Pie
              data={this.props.data && this.props.data}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {this.props.data &&
                this.props.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
          </PieChart>
        </div>
        <div className="dataChartPie__chartTextContainer">
          {this.props.data &&
            this.props.data.map((ele, index) => (
              <div className="dataChartPie__chartTextContainer--textLine">
                <p
                  className="dataChartPie__chartTextContainer--textLineColor"
                  style={{ backgroundColor: COLORS[index] }}
                ></p>
                <p className="dataChartPie__chartTextContainer--textLineText">
                  {ele.name} : {ele.value}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
