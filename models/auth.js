// Used to validate input from the user.
const validator = require('validator');
const crypto = require('crypto');
const config = require('../magic-brian-server-config');
const authManager = require('../auth/manager');

class Auth {
  constructor(data) {
    if (validator.isEmail(validator.escape(data.body.email))) {
      this.email = validator.escape(data.body.email);
    }
    this.auth = authManager.validate(validator.escape(data.body.auth));
    this.refresh = authManager.validate(validator.escape(data.body.refresh));
    this.rawAuth = validator.escape(data.body.auth);
    this.rawRefresh = validator.escape(data.body.refresh);
  }

  validAuth() {
    let authTTL = new Date(0)
    authTTL.setUTCSeconds(this.auth.exp);
    let now = new Date();
    if (now < authTTL) {
      return true;
    }
    return false;
  }

  validRefresh() {
    let refreshTTL = new Date(0)
    refreshTTL.setUTCSeconds(this.auth.exp);
    let now = Date.now();
    if (now < refreshTTL) {
      return true;
    }
    return false;
  }
}


module.exports = Auth;