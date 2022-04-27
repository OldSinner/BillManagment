import "./Register.css";
export default function Sidebar() {
  return (
    <>
      <div className="rejestracjaCont">
        <form className="formularz">
          <h2>Rejestracja</h2>
          <div className="formGrupa">
            <input
              type="text"
              name="email"
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
              name="pass"
              className="passFirstInput"
              autofocus="true"
              required
            />
            <label for="password">Hasło</label>
          </div>
          <div className="formGrupa">
            <input
              type="password"
              name="passCheck"
              className="passSecondInput"
              autofocus="true"
              required
            />
            <label for="password">Powtórz hasło</label>
          </div>
          <input type="submit" name="submit" className="buttonSubmit" />
        </form>
      </div>
    </>
  );
}
