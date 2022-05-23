import "./Register.css";
export default function Sidebar() {
  return (
    <>
      <div className="rejestracjaCont">
        <form className="formularzRegister">
          <h2>Rejestracja</h2>
          <div className="formGrupa">
            <input
              type="text"
              name="nameRegister"
              className="nameInput"
              autofocus="true"
              required
            />
            <label for="password">Imie</label>
          </div>
          <div className="formGrupa">
            <input
              type="text"
              name="surnameRegister"
              className="surnameInput"
              autofocus="true"
              required
            />
            <label for="password">Nazwisko</label>
          </div>
          <div className="formGrupa">
            <input
              type="text"
              name="emailRegister"
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
              name="passRegister"
              className="passFirstInput"
              autofocus="true"
              required
            />
            <label for="password">Hasło</label>
          </div>
          <div className="formGrupa">
            <input
              type="password"
              name="passCheckRegister"
              className="passSecondInput"
              autofocus="true"
              required
            />
            <label for="password">Powtórz hasło</label>
          </div>
          <input
            type="submit"
            name="submitRegister"
            className="buttonSubmit"
            value={"Rejestracja"}
          />
        </form>
      </div>
    </>
  );
}
