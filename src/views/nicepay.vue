<template>
  <div>
    <label>Register</label>
    <a-button class="font-weight-bold mt-3 mr-3" type="primary" @click="search()">Pay</a-button>
  </div>
</template>
<script>
import { Alert } from "ant-design-vue";
import moment from "moment";
import axios from "axios";
import qs from "qs";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {};
  },
  methods: {
    search() {
      const jsonp = require("jsonp");

      jsonp(
        "https://dev.nicepay.co.id/nicepay/api/orderRegist.do",
        null,
        (err, data) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(data);
          }
        }
      );
    },
  },
};
</script>
