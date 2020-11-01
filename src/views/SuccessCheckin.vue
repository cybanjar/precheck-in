<template>
  <div :style="ota">
    <q-img class="" :src="hotelImage">
      <div class="absolute-bottom font-weight-bold text-subtitle2 text-center">
        {{ hotelName }}
      </div>
    </q-img>
    <canvas v-show="roomNotReady" id="canvas"></canvas>
    <div v-if="roomNotReady">
      <p :style="textOta">
        {{ getLabels("room_number", `titleCase`) }} : {{ roomNumber }}
      </p>
      <p :style="textOta">
        {{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}
      </p>
      <p :style="textOta">
        {{ getLabels("wifi_password", `sentenceCase`) }} : {{ wifiPassword }}
      </p>
      <p :style="textOta">
        {{ getLabels("arrangement", `sentenceCase`) }} : {{ arrangement }}
      </p>

      <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
      <div class="row justify-center q-mt-xl">
        <div class="col-md-6 col-xs-11">
          <p :style="textOta">{{ getLabels("mci_success", `sentenceCase`) }}</p>
        </div>
      </div>

      <a-button @click="goBack">{{ getLabels("done", `titleCase`) }}</a-button>
    </div>
    <div v-else>
      <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
      <div class="row justify-center q-mt-xl">
        <div class="col-md-6 col-xs-11">
          <!-- <p>
            {{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}
          </p>
          <p>
            {{ getLabels("wifi_password", `sentenceCase`) }} :
            {{ wifiPassword }}
          </p> -->
          <p :style="textOta">{{ getLabels("mci_success", `sentenceCase`) }}</p>
          <!-- <p>{{getLabels('email', `titleCase`)}} <a-input v-model="email" /></p>
          <p>{{getLabels('phone_number', `titleCase`)}} <a-input v-model="phone" /></p> -->
        </div>
      </div>

      <a-button @click="goBack">{{ getLabels("done", `titleCase`) }}</a-button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ky from "ky";
import moment from "moment";
import router from "../router";
export default {
  data() {
    return {
      roomNumber: "",
      url: "",
      wifiAddress: "",
      wifiPassword: "",
      arrangement: "",
      labels: [],
      roomNotReady: false,
      email: "",
      phone: "",
      langID: "",
      location: "",
      ota: {
        backgroundColor: "",
        width: "100%",
        height: "100vh",
        overflowX: "hidden",
        textAlign: "center",
      },
      textOta: {
        color: "",
        opacity: "0.65",
      },
      hotelImage: "",
      hotelName: "",
      hotelParams: "",
      coDate: "",
      ciTime: "",
      bookingcode: "",
      TotalData: "",
    };
  },
  mounted() {
    // console.log(this.$route.params, "nyampe");
    this.labels = JSON.parse(localStorage.getItem("labels"));
    this.langID = this.$route.params.Data.langID;
    this.ota.backgroundColor = this.$route.params.Data.BackgroundColor;
    this.textOta.color = this.$route.params.Data.FontColor;
    this.hotelImage = this.$route.params.Data.hotelImage;
    this.hotelName = this.$route.params.Data.hotelname;
    this.coDate = this.formatDateFind(this.$route.params.Data.coDate);
    this.ciTime = this.$route.params.Data.defaultCI;
    this.bookingcode = this.$route.params.Data.bookingcode;
    this.TotalData = this.$route.params.Data.TotalData;
    switch (this.langID.toLowerCase()) {
      case "eng":
        this.programLabel = "program-label1";
        break;
      case "idn":
        this.programLabel = "program-label2";
        break;
      default:
        this.programLabel = "program-label1";
        break;
    }
    this.data = this.$route.params.Data.QRCodeData;
    this.location = this.$route.params.Data.location;
    // console.log(
    //   this.location.slice(this.location.lastIndexOf("?") + 1),
    //   "test"
    // );
    const tempParam = this.location.slice(this.location.lastIndexOf("?") + 1);
    this.hotelParams = decodeURIComponent(tempParam);
    // console.log(this.hotelParams);
    const success = btoa(this.data);
    this.roomNumber = this.data.substr(1, this.data.indexOf(";") - 1);
    this.wifiAddress = this.$route.params.Data.wifiAddress;
    this.wifiPassword = this.$route.params.Data.wifiPassword;
    this.arrangement = this.$route.params.Data.arrangement;
    this.roomNotReady = this.$route.params.Data.roomNotReady;
    this.email = this.$route.params.Data.email;
    this.phone = this.$route.params.Data.phone;
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H" },
      { width: "76", height: "76" }
    );
    QRCode.toDataURL(success, { errorCorrectionLevel: "H" }).then((url) => {
      this.url = url.split(",")[1];
    });
  },
  methods: {
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
    formatDateFind(datum) {
      const dDate = String(moment(datum, "YYYY-MM-DD").date()).padStart(2, "0");
      const dMonth = String(moment(datum, "YYYY-MM-DD").month() + 1).padStart(
        2,
        "0"
      );
      const dYear = String(moment(datum, "YYYY-MM-DD").year());
      const fixDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      return fixDate;
    },
    goBack() {
      if (this.TotalData == undefined) {
        // console.log('Window',this.location);
        window.open(this.location, "_self");
      } else {
        if (parseInt(this.TotalData) > 1) {
          // console.log('routerpush',this.TotalData);
          router.push({
            name: "MobileCheckin",
            params: {
              hotelParameter: this.hotelParams,
              bookingcode: this.bookingcode,
              coDate: this.coDate,
              citime: this.ciTime,
            },
          });
        } else {
          // console.log('Window',this.location);
          window.open(this.location, "_self");
        }
      }
    },
  },
  computed: {
    getLabels() {
      let fixLabel = "";
      return (nameKey, used) => {
        const label = this.labels.find((el) => {
          return el["program-variable"] == nameKey;
        });
        if (label === undefined) {
          fixLabel = "";
        } else {
          if (used === "titleCase") {
            fixLabel = label[this.programLabel].replace(/\w\S*/g, function (
              txt
            ) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          } else if (used === "sentenceCase") {
            fixLabel =
              label[this.programLabel].charAt(0).toUpperCase() +
              label[this.programLabel].slice(1);
          } else if (used === "upperCase") {
            fixLabel = label[this.programLabel].toUpperCase();
          } else {
            fixLabel = label[this.programLabel];
          }
        }
        return fixLabel;
      };
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss" />