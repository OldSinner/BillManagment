import "./Dashboard.css";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
const state = {
  labels: [
    "Maks",
    "Umie",
    "Grać",
    "W",
    "Reacta",
    "Umie",
    "Grać",
    "W",
    "Spierdalaj",
  ],
  datasets: [
    {
      label: "Rainfall",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(0,140,84,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [68, 45, 25, 58, 44, 52, 42, 84, 52],
    },
  ],
};
export default function Dashboard() {
  return (
    <div className="dashboardCont">
      <div className="graphsCont">
        <div className="linearCont">
          <div className="linearGraphDesc"></div>
          <div className="linearGraph">
            <Line
              data={state}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="circularCont">
          <div className="circularGraphDesc"></div>
          <div className="circularGraph">
            <Pie
              data={state}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
