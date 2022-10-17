import axios from "axios";
import { useRef } from "react";
import { Apischema } from "../Apischema/Apischema";
import { Api } from "../Auth/Api";
import "./Register.css";
export default function Sidebar() {
  const inputname = useRef(null);
  const inputemail = useRef(null);
  const inputpass = useRef(null);
  const inputcpass = useRef(null);
  const onSubmit = async () => {
    if (inputpass.current.value != inputcpass.current.value) {
      return;
    }
    axios
      .post(Apischema.register, {
        Email: inputemail.current.value,
        FirstName: inputname.current.value,
        LastName: "abc",
        Password: inputpass.current.value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((er) => console.log(er));
  };
  return (
    <>
      <div className="rejestracjaCont">
        <div className="formularzRegister">
          <h2>Rejestracja</h2>
          <div className="formGrupa">
            <input
              type="text"
              name="nameRegister"
              className="nameInput"
              autofocus="true"
              required
              ref={inputname}
            />
            <label for="password">Imie</label>
          </div>
          <div className="formGrupa">
            <input
              type="text"
              name="emailRegister"
              className="emailInput"
              maxlength="100"
              autofocus="true"
              required
              ref={inputemail}
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
              ref={inputpass}
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
              ref={inputcpass}
            />
            <label for="password">Powtórz hasło</label>
          </div>
          <button
            type="submit"
            name="submitRegister"
            className="buttonSubmit"
            onClick={onSubmit}
          >
            Rejestracja
          </button>
        </div>
      </div>
    </>
  );
}
