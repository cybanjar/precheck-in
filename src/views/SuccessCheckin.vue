<template>
  <div class="text-center">
    <canvas id="canvas"></canvas>
    <p>{{ getLabels("room_number", `titleCase`) }} : {{ taejin }}</p>
    <p>{{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}</p>
    <p>{{ getLabels("wifi_password", `sentenceCase`) }} : {{ wifiPassword }}</p>
    <p>
      <br />
    </p>
    <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
    <p>{{ getLabels("mci_success", `se`) }}</p>
    <p>
      <a-button
        type="primary"
        href="http://vhp-online.com/mobilecheckin?lang=eng&hotelCode=vhpweb"
        >{{ getLabels("done") }}</a-button
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
    this.wifiAddress = this.data.substring(
      this.data.lastIndexOf(",") + 1,
      this.data.lastIndexOf("!")
    );
    this.wifiPassword = this.data.substring(
      this.data.lastIndexOf("!") + 1,
      this.data.lastIndexOf("?")
    );
    this.arrangement = this.data.substring(
      this.data.lastIndexOf("?") + 1,
      this.data.lastIndexOf("}")
    );
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

      if (label["program-label1"] == "undefined") {
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
    goBack() {
      route;
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss" />
