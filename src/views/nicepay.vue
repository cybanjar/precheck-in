<template>
  <div>
    <label>Register</label>
    <a-button class="font-weight-bold mt-3 mr-3" type="primary" @click="pay()">Pay</a-button>
    <a-button class="font-weight-bold mt-3 mr-3" type="primary" @click="check()">Check</a-button>
  </div>
</template>
<script>
import { Alert } from "ant-design-vue";
import moment from "moment";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      resReg: [],
      resPaid: [],
    };
  },
  methods: {
    pay() {
      const token = CryptoJS.SHA256('IONPAYTESTTRX202009070000000250000033F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==');
      const params = "timeStamp=" + moment().format('YYYYMMDDHHmmss') + "&iMid=IONPAYTEST&payMethod=01&currency=IDR&amt=500000&referenceNo=TRX2020090700000002&goodsNm=Deposit&billingNm=Michael&billingPhone=081212121212&billingEmail=michael@blah.com&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" + token.toString() + "&userIP=202.135.55.101&cartData={}&callBackUrl=apalah&instmntType=1&instmntMon=1&reccurOpt=0";

      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://dev.nicepay.co.id/nicepay/api/orderRegist.do?' + params)}`)
      .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
      })
      .then(data => {
        const resp = data.contents.substr(data.contents.indexOf('{'), data.contents.length);
        this.resReg = JSON.parse(resp);
        if (this.resReg.data['resultCd'] == '0000') {
          // console.log('masuk payment');
          const urlInq = "https://dev.nicepay.co.id/nicepay/api/orderInquiry.do?tXid=" + this.resReg.data['tXid'] + "&optDisplayCB=1&optDisplayBL=0";
          window.open(urlInq, '_blank');
        } else {
          // console.log('error payment');
        }
      });
    },
    check() {
      const token = CryptoJS.SHA256('IONPAYTESTTRX202009070000000250000033F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==');
      const params = "iMid=IONPAYTEST&&merchantToken=" + token.toString() + "&tXid=IONPAYTEST01202009221236456216&amt=500000&referenceNo=TRX2020090700000002";

      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://dev.nicepay.co.id/nicepay/api/onePassStatus.do?' + params)}`)
      .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
      })
      .then(data => {
        this.resPaid = JSON.parse(data.contents);
        if (this.resPaid.resultCd == '0000') {
          // console.log('payment valid');
        } else {
          // console.log('payment invalid');
        }
      });
    },
    apalah(acoPancenOye) {
      // console.log(acoPancenOye);
    }
  },
};
</script>
