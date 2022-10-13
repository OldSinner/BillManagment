import { Api } from "./Api.jsx";
import axios from "axios";

class AuthService {
  async Login(Email, Password) {
    var response;
    await axios
      .post(Api + "auth/login", { Email, Password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        response = res.data;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  }
  logout() {
    localStorage.removeItem("user");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  isLogged() {
    if (process.env.NODE_ENV !== "production") return true;
    var user = localStorage.getItem("user");
    if (user) return true;
    else return false;
  }
}

export default new AuthService();
