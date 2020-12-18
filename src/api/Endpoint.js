import ky from "ky";

const baseURL = "https://login.e1-vhp.com:8443/logserver/rest/loginServer/";
//const baseURL = "http://login.e1-vhp.com:8080/logserver/rest/loginServer/";

export default {
  getParam: async (url, body) => {
    const requestURL = baseURL + url;
    const httpOptions = {
      json: {
        request: body,
      },
      timeout: 10000,
    };

    try {
      const response = await ky.post(requestURL, httpOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      return { errorMessage: error.message };
    }
  },
  doFetch: async (url, body) => {
    const requestURL = url;
    const httpOptions = {
      json: {
        request: body,
      },
      timeout: 10000,
    };

    try {
      const response = await ky.post(requestURL, httpOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      return { errorMessage: error.message };
    }
  },
};
