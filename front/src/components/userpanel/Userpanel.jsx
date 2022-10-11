import "./Userpanel.css";
import avatarPic from "../../Assets/avatar.png";
export default function Userpanel() {
  return (
    <div className="userpanelcont">
      <div className="userpanel">
        <h2 className="userSett">Ustawienia Użytkownika</h2>
        <div className="avatar">
          <img src={avatarPic} alt="avatar picture" />
        </div>
        <div className="userInfo">
          <span>Pseudonim</span>
          <span className="userNick">Pseudonim</span>
          <span>Email</span>
          <span className="userEmail">Email użytkownika</span>
        </div>
        <input
          type="submit"
          name="changePassword"
          className="buttonChangePassword"
          value={"Zmień hasło"}
        />
        <input
          type="submit"
          name="changeInfo"
          className="burronChangeInfo"
          value={"Zmień dane"}
        />
      </div>
    </div>
  );
}
