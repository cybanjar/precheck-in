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
      return new Promise((resolve,reject) => {
        jsonp(
          "https://dev.nicepay.co.id/nicepay/api/orderRegist.do?iMid=IONPAYTEST&merchantToken=c92f07ee931b102ebe739675a71e3e0860229239db2f299b9bc7a83b5126b10a&payMethod=01&currency=IDR&amt=100&referenceNo=TRX2020090700000001&goodsNm=Kopi&callBackUrl=apalah&dbProcessUrl=dbproc&userIP=202.135.55.101&description=Kopi&billingNm=Michael&billingPhone=0812&billingEmail=michael@blah.com&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&instmntType=1&instmntMon=1&deliveryNm=Michael&deliveryPhone=0812&deliveryEmail=michael@blah.com&deliveryCity=Jakarta&deliveryState=JakSel&deliveryPostCd=16413&deliveryCountry=Indonesia&instmntType=1&instmntMon=1&userAgent=Mozilla&vat=0&fee=0&notaxAmt=0&reccurOpt=0&cartData=Kopi",
          null,
          (err, data) => {
            if (err) {
              reject(err);
              console.error('BLAH', err.message);
            } else {
              resolve(data);
              console.log('BLAH', data);
            }
          }
        );
      })
    },
    apalah(acoPancenOye) {
      console.log(acoPancenOye);
    }
  },
};
</script>
