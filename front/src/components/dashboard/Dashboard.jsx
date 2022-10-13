import "./Dashboard.css";
export default function Dashboard() {
  return (
    <div className="dashboardCont">
      <div className="graphsCont">
        <div className="linearCont">
          <div className="linearGraphDesc"></div>
          <div className="linearGraph"></div>
        </div>
        <div className="circularCont">
          <div className="circularGraphDesc"></div>
          <div className="circularGraph"></div>
        </div>
      </div>
    </div>
  );
}
