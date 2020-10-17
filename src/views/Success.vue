<template>
  <div class="text-center">
    <canvas id="canvas" v-show="(!flagKiosk)"></canvas>
    <p>
      {{ getLabels("book_code", `titleCase`) }} :
      <span class="font-weight-bold">{{ taejin }}</span>
    </p>
    <p>
      {{ getLabels("co_date", `titleCase`) }} :
      <span class="font-weight-bold">{{ formatDate(iplyo) }}</span>
    </p>
    <p>
      {{ getLabels("ci_time", `titleCase`) }} :
      <span class="font-weight-bold">{{ jegal }}</span>
    </p>
    <p>
      <a-button type="primary" :href="urlMCI">{{
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

export default {
  data() {
    return {
      taejin: "", //Booking Code
      iplyo: "", // Checkout Date
      jegal: "", // Check-in Time
      url: "",
      labels: [],
      flagKiosk: false,
      urlMCI: "",
      hotelCode: "",
      hotelEndpoint: "",
    };
  },
  mounted() {
    this.data = this.$route.params.jin;
    this.flagKiosk = this.$route.params.jen;
    this.hotelCode = this.$route.params.mihawk;
    this.hotelEndpoint = this.$route.params.luffy;
    this.labels = JSON.parse(localStorage.getItem("labels"));

    const success = btoa(this.data);
    this.taejin = this.data.substring(1, this.data.indexOf(";"));
    this.iplyo = this.data.substring(
      this.data.lastIndexOf(";") + 1,
      this.data.lastIndexOf(",")
    );
    this.jegal = this.data.substring(
      this.data.lastIndexOf(",") + 1,
      this.data.lastIndexOf("}")
    );
    this.urlMCI =
      "http://vhp-online.com/mobilecheckin?lang=" +
      this.$route.params.jun +
      "&book=" +
      this.taejin +
      "&codate=" +
      this.iplyo +
      "&citime=" +
      this.jegal +
      "&hotelcode=" +
      this.hotelCode;
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
              resno: this.taejin,
            },
          },
        })
        .json();
      // console.log(parsed);
    })();
  },
  methods: {
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
