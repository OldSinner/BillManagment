import "./Addinvoice.css";
export default function Sidebar() {
  return (
    <div className="addinvoicecont">
      <div className="addinvoice">
        <form className="formularzLogin">
          <h1>Dodaj nową fakturę</h1>
          <div className="formGrupa">
            <label for="kwota">Kwota</label>
            <input type="text" name="kwota" required />
          </div>
          <div className="formGrupa">
            <label for="kategoriaSelect">Kategoria</label>
            <select name="kategoriaSelect" required>
              <option value="jedzenie" selected>
                Jedzenie
              </option>
              <option value="paliwo">Paliwo</option>
              <option value="rozrywka">Rozrywka</option>
              <option value="oplataMieszkanie">Opłata za mieszkanie</option>
              <option value="oplataGaz">Opłata za gaz</option>
              <option value="oplataWoda">Opłata za wodę</option>
              <option value="oplataPrad">Opłata za prąd</option>
            </select>
          </div>
          <input
            type="submit"
            name="submitFaktura"
            className="buttonSubmitFaktura"
            value={"Dodaj fakture"}
          />
        </form>
      </div>
    </div>
  );
}
