<template>
  <div class="text-center">
    <div v-if="roomNotReady">
      <canvas id="canvas"></canvas>
      <p>{{ getLabels("room_number", `titleCase`) }} : {{ taejin }}</p>
      <p>{{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}</p>
      <p>
        {{ getLabels("wifi_password", `sentenceCase`) }} : {{ wifiPassword }}
      </p>
      <p>{{ getLabels("arrangement", `sentenceCase`) }} : {{ arrangement }}</p>

      <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
      <div class="row justify-center q-mt-xl">
        <div class="col-md-6 col-xs-11">
          <p>{{ getLabels("mci_success", `sentenceCase`) }}</p>
        </div>
      </div>

      <a-button
        type="primary"
        href="http://vhp-online.com/mobilecheckin?lang=eng&hotelcode=vhpweb"
        >{{ getLabels("done", `titleCase`) }}</a-button
      >
    </div>
    <div v-else>
      <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
      <div class="row justify-center q-mt-xl">
        <div class="col-md-6 col-xs-11">
          <canvas id="canvas"></canvas>
          <p>
            {{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}
          </p>
          <p>
            {{ getLabels("wifi_password", `sentenceCase`) }} :
            {{ wifiPassword }}
          </p>
          <p>{{ getLabels("mci_success", `sentenceCase`) }}</p>
          <!-- <p>{{getLabels('email', `titleCase`)}} <a-input v-model="email" /></p>
          <p>{{getLabels('phone_number', `titleCase`)}} <a-input v-model="phone" /></p> -->
        </div>
      </div>

      <a-button type="primary" @click="goBack">{{
        getLabels("done", `titleCase`)
      }}</a-button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ky from "ky";

export default {
  data() {
    return {
      taejin: "",
      url: "",
      wifiAddress: "",
      wifiPassword: "",
      arrangement: "",
      labels: [],
      roomNotReady: false,
      email: "",
      phone: "",
      param: "",
    };
  },
  mounted() {
    this.data = this.$route.params.jin;
    this.labels = JSON.parse(localStorage.getItem("labels"));
    const success = btoa(this.data);

    console.log(this.$route.params.jin, success, "nyampe");
    this.taejin = this.data.substr(1, this.data.indexOf(";") - 1);
    this.wifiAddress = this.$route.params.jun;
    this.wifiPassword = this.$route.params.jen;
    this.arrangement = this.$route.params.jon;
    this.roomNotReady = this.$route.params.jan;
    this.email = this.$route.params.email;
    this.phone = this.$route.params.phnum;
    this.param = this.$route.params.param;
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H" },
      { width: "76", height: "76" }
      // function (error) {
      // if (error) console.error(error);
      // console.log("success!");
      // }
    );

    QRCode.toDataURL(success, { errorCorrectionLevel: "H" }).then((url) => {
      // console.log(url.split(",")[1]);
      this.url = url.split(",")[1];
    });

    // (async () => {
    //   const parsed = await ky
    //     .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/storeQRCode", {
    //       json: {
    //         request: {
    //           base64image: this.url,
    //           resno: this.taejin,
    //         },
    //       },
    //     })
    //     .json();
    //   console.log(parsed);
    // })();
  },
  methods: {
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["program-variable"] == nameKey
      );
      let fixLabel = "";
      if (label == undefined) {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["program-label1"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["program-label1"].charAt(0).toUpperCase() +
            label["program-label1"].slice(1);
        } else {
          fixLabel = label["program-label1"];
        }
      }

      return fixLabel;
    },
    setTitleCase(label) {
      return label.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    formatDate(datum) {
      const dDate = String(moment(datum, "MM/DD/YYYY").date()).padStart(2, "0");
      const dMonth = String(moment(datum, "MM/DD/YYYY").month() + 1).padStart(
        2,
        "0"
      );
      const dYear = String(moment(datum, "MM/DD/YYYY").year());
      const fixDate = moment(`${dDate}/${dMonth}/${dYear}`, "DD/MM/YYYY")._i;

      return fixDate;
    },
    goBack() {
      window.open(
        "http://vhp-online.com/mobilecheckin?param=" + this.param,
        "_self"
      );
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss" />
