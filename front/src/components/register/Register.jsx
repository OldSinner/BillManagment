import "./Register.css";
export default function Sidebar() {
  return (
    <>
      <div class="rejestracjaCont">
        <form class="formularz">
          <h2>Rejestracja</h2>
          <div class="formGrupa">
            <input
              type="text"
              name="email"
              class="emailInput"
              maxlength="100"
              autofocus="true"
              required
            />
            <label for="email">Adres Email</label>
          </div>
          <div class="formGrupa">
            <input
              type="password"
              name="pass"
              class="passFirstInput"
              autofocus="true"
              required
            />
            <label for="password">Hasło</label>
          </div>
          <div class="formGrupa">
            <input
              type="password"
              name="passCheck"
              class="passSecondInput"
              autofocus="true"
              required
            />
            <label for="password">Powtórz hasło</label>
          </div>
          <input type="submit" name="submit" class="buttonSubmit" />
        </form>
      </div>
    </>
  );
}
