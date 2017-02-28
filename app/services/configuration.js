import Ember from "ember";
import Env from "nextfeed/config/environment";
import CryptoJS from "npm:crypto-js";

const {
  Service,
} = Ember;

export default Service.extend({
  error: '',
  /**
   *
   * @returns {null}|{Object}
   */
  retrieve(key, default_value) {
    let data = this._getItem(key);

    if (data) {
      data = JSON.parse(data);

      if (data.crypted) {
        const bytes = CryptoJS.AES.decrypt(data.value.toString(), Env.APP.key);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        data = decryptedData;
      }

      return JSON.parse(data);
    }

    return default_value || false;
  },
  _getItem(key) {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  },
  remove(key) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }

    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
    }
  },
  store(key, value, type, crypt) {

    let data = null;

    if (crypt) {
      const cipher = CryptoJS.AES.encrypt(JSON.stringify(value), Env.APP.key);
      data = JSON.stringify({
        crypted: true,
        value: cipher.toString()
      });
    } else {
      data = JSON.stringify(value);
    }

    switch (type) {
      case 'session':
        sessionStorage.setItem(key, data);
        break;
      default:
      case 'local':
        localStorage.setItem(key, data);
        break;
      case 'cookie':
        break;
    }
  }
});
