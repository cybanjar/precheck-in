import CryptoJS from "crypto-js";

export default {
  getToken() {
    const token = sessionStorage.getItem("token");
    let encryptKey = "";

    if (token) {
      encryptKey = token;
    } else {
      const currentDate = new Date();
      encryptKey = btoa(currentDate.getTime());
      try {
        sessionStorage.setItem("token", encryptKey);
      } catch (e) {
        //
      }
    }
    return encryptKey;
  },
  setItem(key, value) {
    const encryptKey = this.getToken();
    const currentDate = new Date();
    const ttl = 3600000;
    // Data Encrypting
    const data = CryptoJS.AES.encrypt(value, encryptKey).toString();

    const item = {
      value: data,
      expiry: currentDate.getTime() + ttl,
    };

    sessionStorage.setItem(key, JSON.stringify(item));
  },
  getItem(key) {
    const encryptKey = this.getToken();
    const currentDate = new Date();

    try {
      const item = JSON.parse(sessionStorage.getItem(key));
      if (item == null) {
        return null;
      } else {
        const data = CryptoJS.AES.decrypt(item.value, encryptKey).toString(
          CryptoJS.enc.Utf8
        );

        if (currentDate.getTime() > item.expiry) {
          return null;
        } else {
          return data;
        }
      }
    } catch (e) {
      return sessionStorage.getItem(key);
    }
  },
  removeItem(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};
