<template>
  <div>
    <label>Register</label>
    <a-button class="font-weight-bold mt-3 mr-3" type="primary" @click="search()">Pay</a-button>
  </div>
</template>
<script>
import { Alert } from "ant-design-vue";
import moment from "moment";
import ky from "ky";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {};
  },
  methods: {
    search() {
      const iMid = "IONPAYTEST";
      const timestampTrx = moment().format("YYYYMMDDHHMMSS");
      const merchantKey =
        "33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A==";
      const refNo = "ord" + timestampTrx;
      const amount = "100";
      const merchantData = timestampTrx + iMid + refNo + amount + merchantKey;
      const merTok = CryptoJS.SHA256(merchantData).toString(CryptoJS.enc.Hex);
      console.log({
        timeStamp: timestampTrx,
        iMid: iMid,
        payMethod: "02",
        currency: "IDR",
        amt: amount,
        referenceNo: refNo,
        goodsNm: "Test Transaction Nicepay",
        billingNm: "John Doe",
        billingPhone: "02110680000",
        billingEmail: "email@merchant.com",
        billingAddr: "Jalan Bukit Berbunga 22",
        billingCity: "Jakarta",
        billingState: "DKI Jakarta",
        billingPostCd: "12345",
        billingCountry: "Indonesia",
        deliveryNm: "dobleh@merchant.com",
        deliveryPhone: "12345678",
        deliveryAddr: "Jalan Bukit Berbunga 22",
        deliveryCity: "Jakarta",
        deliveryState: "DKI Jakarta",
        deliveryPostCd: "12345",
        deliveryCountry: "Indonesia",
        dbProcessUrl: "https://ptsv2.com/t/test-nicepay-v2",
        vat: "",
        fee: "",
        notaxAmt: "",
        description: "",
        merchantToken: merTok,
        reqDt: "",
        reqTm: "",
        reqDomain: "merchant.com",
        reqServerIP: "127.0.0.1",
        reqClientVer: "",
        userIP: "127.0.0.1",
        userSessionID: "697D6922C961070967D3BA1BA5699C2C",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.101 Safari/537.36",
        userLanguage: "ko-KR,en-US;q=0.8,ko;q=0.6,en;q=0.4",
        cartData:
          '{"count":1,"item":[{"img_url":"https://images.ctfassets.net/od02wyo8cgm5/14Njym0dRLAHaVJywF8WFL/1910357dd0da0ae38b61bc8ad3db86e4/cloudflyer_2-fw19-grey_lime-m-g1.png","goods_name":"Shoe","goods_detail":"Shoe","goods_amt":100]}',
        instmntType: "2",
        instmntMon: "1",
        recurrOpt: "0",
        bankCd: "CENA",
        vacctValidDt: "",
        vacctValidTm: "",
        merFixAcctId: "",
        mitraCd: "",
      });
      (async () => {
        const parsed = await ky
          .post("https://dev.nicepay.co.id/nicepay/direct/v2/registration", {
            // headers: {
            //   "Access-Control-Allow-Origin": "*",
            //   "Cache-Control": "no - cache",
            //   "Content-Type": "application/json;charset=UTF-8",
            //   Connection: "keep - alive",
            //   Accept: "*/*",
            //   "Keep-Alive": "timeout=5, max=100",
            //   "Accept-Encoding": "gzip, deflate, br",
            //   "Postman-Token": "529",
            //   "Access-Control-Expose-Headers":
            //     "Access-Control-Allow-Origin,Access-Control-Allow-Credentials",
            // },
            json: {
              request: {
                timeStamp: timestampTrx,
                iMid: iMid,
                payMethod: "02",
                currency: "IDR",
                amt: amount,
                referenceNo: refNo,
                goodsNm: "Test Transaction Nicepay",
                billingNm: "John Doe",
                billingPhone: "02110680000",
                billingEmail: "email@merchant.com",
                billingAddr: "Jalan Bukit Berbunga 22",
                billingCity: "Jakarta",
                billingState: "DKI Jakarta",
                billingPostCd: "12345",
                billingCountry: "Indonesia",
                deliveryNm: "dobleh@merchant.com",
                deliveryPhone: "12345678",
                deliveryAddr: "Jalan Bukit Berbunga 22",
                deliveryCity: "Jakarta",
                deliveryState: "DKI Jakarta",
                deliveryPostCd: "12345",
                deliveryCountry: "Indonesia",
                dbProcessUrl: "https://ptsv2.com/t/test-nicepay-v2",
                vat: "",
                fee: "",
                notaxAmt: "",
                description: "",
                merchantToken: merTok,
                reqDt: "",
                reqTm: "",
                reqDomain: "merchant.com",
                reqServerIP: "127.0.0.1",
                reqClientVer: "",
                userIP: "127.0.0.1",
                userSessionID: "697D6922C961070967D3BA1BA5699C2C",
                userAgent:
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.101 Safari/537.36",
                userLanguage: "ko-KR,en-US;q=0.8,ko;q=0.6,en;q=0.4",
                cartData:
                  "{“count”: “1”,“item”: [{“img_url”: “https://www.lecs.com/image/introduction/img_vmd020101.jpg”,“goods_name”: “Jam Tangan Army - Strap Kulit - Hitam”,“goods_detail”: “jumlah 1”,“goods_amt”: “400”}]}",
                instmntType: "2",
                instmntMon: "1",
                recurrOpt: "0",
                bankCd: "CENA",
                vacctValidDt: "",
                vacctValidTm: "",
                merFixAcctId: "",
                mitraCd: "",
              },
            },
          })
          .json();
        console.log(parsed, "test");
      })();
    },
  },
};
</script>
