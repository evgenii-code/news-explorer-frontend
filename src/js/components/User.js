export default class User {
  constructor() {
    this.loggedOut();
  }

  loggedIn(name) {
    this._isLoggedIn = true;
    this._userName = name;
  }

  loggedOut() {
    this._isLoggedIn = false;
    this._userName = null;
  }

  getStatus() {
    return {
      isLoggedIn: this._isLoggedIn,
      userName: this._userName,
    };
  }

  getName() {
    return this._userName;
  }

  isLoggedIn() {
    return this._isLoggedIn;
  }
}
