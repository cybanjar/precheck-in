<template>
  <div>
    <label>Register</label>
    <a-button class="font-weight-bold mt-3 mr-3" type="primary" @click="pay()">Pay</a-button>
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
    pay() {
      const jsonp = require("jsonp");
      const token = CryptoJS.SHA256('IONPAYTESTTRX202009070000000250000033F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==');
      const urlReg = "https://dev.nicepay.co.id/nicepay/api/orderRegist.do?timeStamp=" + moment().format('YYYYMMDDHHmmss') + "&iMid=IONPAYTEST&payMethod=01&currency=IDR&amt=500000&referenceNo=TRX2020090700000002&goodsNm=Deposit&billingNm=Michael&billingPhone=081212121212&billingEmail=michael@blah.com&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" + token.toString() + "&userIP=202.135.55.101&cartData=Deposit&callBackUrl=apalah&instmntType=1&instmntMon=1&reccurOpt=0";
      //window.open(urlReg,"_self")
      /*return new Promise((resolve,reject) => {
        jsonp(
          urlReg,
          null,
          (err, data) => {
            if (err) {
              reject(err);
              // console.error('BLAH', err.message);
            } else {
              resolve(data);
              // console.log('BLAH', data);
            }
          }
        );
      })*/
    },
    apalah(acoPancenOye) {
      // console.log(acoPancenOye);
    }
  },
};
</script>
<script>
    function readResponse(response){
        console.log(response);
    }
</script>
<script>
import CryptoJS from "crypto-js";
import moment from "moment";

    const token = CryptoJS.SHA256('IONPAYTESTTRX202009070000000230000033F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==');
    const urlReg = "https://dev.nicepay.co.id/nicepay/api/orderRegist.do?timeStamp=" + moment().format('YYYYMMDDHHmmss') + "&iMid=IONPAYTEST&payMethod=01&currency=IDR&amt=300000&referenceNo=TRX2020090700000002&goodsNm=Deposit&billingNm=Michael&billingPhone=081212121212&billingEmail=michael@somemail.com&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" + token.toString() + "&userIP=202.135.55.101&cartData={Deposit}&callBackUrl=readResponse&instmntType=1&instmntMon=1&reccurOpt=0";
    console.log(urlReg);
    const script = document.createElement('SCRIPT');
    script.src = urlReg;
    document.body.appendChild(script);
</script>
