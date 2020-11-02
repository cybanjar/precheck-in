<template>
  <div class="text-center">
    <canvas id="canvas" v-show="(!flagKiosk)"></canvas>
    <p>
      {{ getLabels("book_code", `titleCase`) }} :
      <span class="font-weight-bold">{{ bookingCode }}</span>
    </p>
    <p>
      {{ getLabels("co_date", `titleCase`) }} :
      <span class="font-weight-bold">{{ formatDate(coDate) }}</span>
    </p>
    <p>
      {{ getLabels("ci_time", `titleCase`) }} :
      <span class="font-weight-bold">{{ ciTime }}</span>
    </p>
    <p>
      <a-button type="primary" @click="checkin">{{
        getLabels("ci_now", `titleCase`)
      }}</a-button>
    </p>
    <p>
      <br />
    </p>
    <p v-show="(!flagKiosk)" class="p-mobile">
      {{ getLabels("success_wo_kiosk", `sentenceCase`) }}
    </p>
    <p v-show="(flagKiosk)" class="p-mobile">
      {{ getLabels("success_w_kiosk", `sentenceCase`) }}
    </p>
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
      bookingCode: "", //Booking Code
      coDate: "", // Checkout Date
      ciTime: "", // Check-in Time
      url: "",
      labels: [],
      flagKiosk: false,
      urlMCI: "",
      hotelEndpoint: "",
      hotelParams: "",
    };
  },
  mounted() {
    console.log(this.$route.params, "nyampe");
    this.data = this.$route.params.Data;
    this.flagKiosk = this.$route.params.Param.flagKiosk;
    this.hotelParams = this.$route.params.Param.hotelParams;
    this.hotelEndpoint = this.$route.params.Param.hotelEndpoint;
    this.labels = JSON.parse(localStorage.getItem("labels"));

    const success = btoa(this.data);
    this.bookingCode = this.data.substring(1, this.data.indexOf(";"));
    this.coDate = this.data.substring(
      this.data.lastIndexOf(";") + 1,
      this.data.lastIndexOf(",")
    );
    this.ciTime = this.data.substring(
      this.data.lastIndexOf(",") + 1,
      this.data.lastIndexOf("}")
    );
    // this.urlMCI =
    //   "http://vhp-online.com/mobilecheckin?lang=" +
    //   this.$route.params.jun +
    //   "&book=" +
    //   this.bookingCode +
    //   "&codate=" +
    //   this.coDate +
    //   "&citime=" +
    //   this.ciTime +
    //   "&hotelcode=" +
    //   this.hotelCode;
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H", width: "145", height: "145" }
      // function (error) {
      // if (error) console.error(error);
      // console.log("success!");
      // }
    );

    QRCode.toDataURL(success, { errorCorrectionLevel: "H" }).then((url) => {
      // console.log(url.split(",")[1]);
      this.url = url.split(",")[1];
    });

    (async () => {
      const parsed = await ky
        .post(this.hotelEndpoint + "preCI/storeQRCode", {
          json: {
            request: {
              base64image: this.url,
              resno: this.bookingCode,
            },
          },
        })
        .json();
      // console.log(parsed);
    })();
  },
  methods: {
    checkin() {
      router.push({
        name: "MobileCheckin",
        params: {
          hotelParameter: this.hotelParams,
          bookingcode: this.bookingCode,
          coDate: this.coDate,
          citime: this.ciTime,
        },
      });
    },
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["lang-variable"] == nameKey
      );

      let fixLabel = "";

      if (label == undefined) {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["lang-value"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["lang-value"].charAt(0).toUpperCase() +
            label["lang-value"].slice(1);
        } else {
          fixLabel = label["lang-value"];
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
  },
};
</script>
