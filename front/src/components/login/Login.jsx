import { useRef } from "react";
import AuthService from "../Auth/AuthService";
import "./Login.css";
export default function Sidebar() {
  const email = useRef(null);
  const pass = useRef(null);
  const auth = AuthService;
  const onSubmit = async () => {
    await auth.Login(email.current.value, pass.current.value).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div className="loginCont">
        <div className="formularzLogin">
          <h2>Logowanie</h2>
          <div className="formGrupa">
            <input
              type="text"
              name="emailLogin"
              className="emailInput"
              maxLength="100"
              autofocus="true"
              required
              ref={email}
            />
            <label for="email">Adres Email</label>
          </div>
          <div className="formGrupa">
            <input
              type="password"
              name="passLogin"
              className="passFirstInput"
              autoFocus="true"
              required
              ref={pass}
            />
            <label for="password">Hasło</label>
          </div>
          <button className="buttonSubmit" onClick={onSubmit}>
            Zaloguj
          </button>
        </div>
      </div>
    </>
  );
}
