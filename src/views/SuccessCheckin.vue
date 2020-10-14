<template>
  <div class="text-center">
    <canvas id="canvas"></canvas>
    <p>{{ getLabels("room_number", `titleCase`) }} : {{ taejin }}</p>
    <p>{{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}</p>
    <p>{{ getLabels("wifi_password", `sentenceCase`) }} : {{ wifiPassword }}</p>
    <p>{{ getLabels("arrangement", `sentenceCase`) }} : {{ arrangement }}</p>
    <p>
      <br />
    </p>
    <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
    <p>{{ getLabels("mci_success", `sentenceCase`) }}</p>
    <p>
      <a-button
        type="primary"
        href="http://vhp-online.com/mobilecheckin?lang=eng&hotelCode=vhpweb"
        >{{ getLabels("done", `titleCase`) }}</a-button
      >
    </p>
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
    };
  },
  mounted() {
    // console.log(this.$route.params.jin, "nyampe");
    this.data = this.$route.params.jin;
    this.labels = JSON.parse(localStorage.getItem("labels"));
    const success = btoa(this.data);
    this.taejin = this.data.substr(1, this.data.indexOf(";") - 1);
    this.wifiAddress = this.$route.params.jun;
    this.wifiPassword = this.$route.params.jen;
    this.arrangement = this.$route.params.jon;
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H" },
      { width: 300 }
      // function (error) {
      // if (error) console.error(error);
      // console.log("success!");
      // }
    );

    QRCode.toDataURL(success, { errorCorrectionLevel: "H", width: "300", height: "auto" }).then((url) => {
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
    formatDate(datum){
        const dDate = String(moment(datum, "MM/DD/YYYY").date()).padStart(2,"0");
        const dMonth = String(moment(datum, "MM/DD/YYYY").month() + 1).padStart(2,"0");
        const dYear = String(moment(datum, "MM/DD/YYYY").year());
        const fixDate = moment(`${dDate}/${dMonth}/${dYear}`, "DD/MM/YYYY")._i;

        return fixDate;
    },
    goBack() {
      route;
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss" />
