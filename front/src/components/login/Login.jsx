import "./Login.css";
export default function Sidebar() {
  return (
    <>
      <div className="loginCont">
        <form className="formularzLogin">
          <h2>Logowanie</h2>
          <div className="formGrupa">
            <input
              type="text"
              name="emailLogin"
              className="emailInput"
              maxlength="100"
              autofocus="true"
              required
            />
            <label for="email">Adres Email</label>
          </div>
          <div className="formGrupa">
            <input
              type="password"
              name="passLogin"
              className="passFirstInput"
              autofocus="true"
              required
            />
            <label for="password">Hasło</label>
          </div>
          <input
            type="submit"
            name="submitLogin"
            className="buttonSubmit"
            value={"Zaloguj"}
          />
        </form>
      </div>
    </>
  );
}
