<template>
  <div>
    <div :style="ota" class="row justify-between pt-2">
      <div class="text-center col-xs-12">
        <img class="logo_hotel" :src="hotelLogo" />
      </div>
      <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
        <p :style="textOta" class="mci-hotel">{{ hotelName }}</p>
      </div>
    </div>
    <div class="row justify-around bg-white self-checkin">
      <div class="text-center" style="margin-top: 10px">
        <canvas id="canvas" v-show="flagKiosk"></canvas>
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
          <br />
        </p>
        <p v-if="flagKiosk == false" class="p-mobile">
          {{ getLabels("success_wo_kiosk", `sentenceCase`) }}
        </p>
        <p v-else class="p-mobile">
          {{ getLabels("success_w_kiosk", `sentenceCase`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import api from "../api/Endpoint";
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
      hotelName: "",
      ota: {
        backgroundColor: "#ea580B",
        width: "100%",
        // height: "100vh",
        overflowX: "hidden",
        textAlign: "center",
      },
      textOta: {
        color: "#FFFFFF",
      },
      hotelLogo: "",
    };
  },
  async mounted() {
    sessionStorage.setItem("PCI", true);

    this.data = this.$route.params.Data;
    this.flagKiosk = this.$route.params.Param.flagKiosk;

    this.hotelParams = this.$route.params.Param.hotelParams;
    this.hotelEndpoint = this.$route.params.Param.hotelEndpoint;
    this.hotelName = this.$route.params.Param.hotelName;
    this.ota.backgroundColor = this.$route.params.Param.Background;
    this.textOta.color = this.$route.params.Param.Font;
    this.hotelLogo = this.$route.params.Param.hotelLogo;
    this.labels = JSON.parse(sessionStorage.getItem("labels"));
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

      // }
    );
    QRCode.toDataURL(success, { errorCorrectionLevel: "H" }).then((url) => {
      this.url = url.split(",")[1];
    });
    const parsed = await api.doFetch(this.hotelEndpoint + "preCI/storeQRCode", {
      base64image: this.url,
      resno: this.bookingCode,
    });
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
