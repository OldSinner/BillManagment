import { Redirect } from '../components/Redirect';

export function SaveUser(userData) {
  console.log(userData);
  window.localStorage.setItem('UserName', userData.data.userName);
  window.localStorage.setItem('Token', userData.data.token);
}

export function IsLogged() {
  var user = window.localStorage.getItem('Token');
  if (process.env.NODE_ENV !== 'production') return true;
  if (user == null || user === undefined || user === 'undefined') return false;
  return true;
}

export function GetUser() {
  if (process.env.NODE_ENV !== 'production')
    return {
      UserName: 'DEV_NO_USER',
      Token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkAucGwiLCJuYW1laWQiOiJjYzM0YjE2Ny0xMWNhLTQ5YmMtODA5Ny1hODU5ZDc0ZWNhNGEiLCJyb2xlIjoiVVNFUiIsImp0aSI6IjA1MDRiMWQ2LTc2ZWEtNGM0Zi05Y2RmLWQwOTMzYWQzMjk0NiIsIm5iZiI6MTY2NjUzMzI0MCwiZXhwIjoxNjY5MTI1MjQwLCJpYXQiOjE2NjY1MzMyNDB9.LxWbfsoo9sj7NaEAHXWTDCHxRwuxpNes1oL5n8IkCQs',
    };

  var user = {
    UserName: window.localStorage.getItem('UserName'),
    Token: window.localStorage.getItem('Token'),
  };

  return user;
}

export function LogOut() {
  window.localStorage.removeItem('Token');
  window.localStorage.removeItem('UserName');
}
