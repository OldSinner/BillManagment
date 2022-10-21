import { useRef } from 'react'
import Swal from 'sweetalert2'
import AuthService from '../Auth/AuthService'
import { useNavigate } from 'react-router-dom'

import './Login.css'
export default function Sidebar() {
  const email = useRef(null)
  const pass = useRef(null)
  const auth = AuthService
  var navigate = useNavigate()

  const onSubmit = async () => {
    await auth.Login(email.current.value, pass.current.value).then((res) => {
      if (res.isSuccess) {
        Swal.fire('Good job!', 'Jesteś debilem!', 'success').then(() => {
          navigate('/')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.errors[0],
          footer: '*-Niepotrzebne skreśl',
        })
      }
    })
  }

  return (
    <>
      <div className="loginCont">
        <div className="formularzLogin">
          <h3>Logowanie</h3>
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
  )
}
