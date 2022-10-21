import './Sidebar.css'
import logo from '../../Assets/logo.png'
import avatarPic from '../../Assets/avatar.png'
import AuthService from '../Auth/AuthService'
export default function Sidebar() {
  const auth = AuthService

  var user = auth.getCurrentUser()
  return (
    <div className="men">
      <div className="appName">
        <img src={logo} alt="logo" />
        <span>&nbsp;sklej wary lapsie</span>
      </div>
      <div className="ui">
        <div className="avatarPic">
          <img src={avatarPic} alt="avatar picture" />
        </div>
        <div>
          <span>{user?.userName != null ? user.userName : 'Kutas Kozła'}</span>
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
  )
}
