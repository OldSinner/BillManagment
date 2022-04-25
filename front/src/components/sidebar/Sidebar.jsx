import "./Sidebar.css";
import logo from "../../Assets/logo.png";
import avatarPic from "../../Assets/avatar.png";
export default function Sidebar() {
  return (
    <>
      <div className="men">
        <div className="appName">
          <img src={logo} alt="logo" />
          <span>&nbsp;Appname</span>
        </div>
        <div className="ui">
          <div className="avatarPic">
            <img src={avatarPic} alt="avatar picture" />
          </div>
          <div>
            <span>Imie Nazwisko</span>
          </div>
          <div>
            <span>Ustawienia konta</span>
          </div>
        </div>
        <div className="menu">
          <div>
            <span>Menu Element 1</span>
          </div>
          <div>
            <span>Menu Element 2</span>
          </div>
          <div>
            <span>Menu Element 3</span>
          </div>
          <div>
            <span>Menu Element 4</span>
          </div>
          <div>
            <span>Menu Element 5</span>
          </div>
          <div>
            <span>Menu Element 6</span>
          </div>
        </div>
      </div>
    </>
  );
}
