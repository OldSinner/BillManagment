import "./Dashboard.css";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
/*const state = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Rainfall",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};*/
export default function Dashboard() {
  return (
    <div className="dashboardCont">
      <div className="graphsCont">
        <div className="linearCont">
          <div className="linearGraphDesc"></div>
          <div className="linearGraph">
            {/* <Line
              data={state}
              options={{
                title: {
                  display: true,
                  text: "Average Rainfall per month",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            /> */}
          </div>
        </div>
        <div className="circularCont">
          <div className="circularGraphDesc"></div>
          <div className="circularGraph"></div>
        </div>
      </div>
    </div>
  );
}
