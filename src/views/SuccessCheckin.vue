<template>
  <div class="text-center">
    <canvas id="canvas"></canvas>
    <p>{{getLabels('room_number')}} : {{taejin}}</p>
    <p>{{getLabels('wifi_address')}} : {{wifiAddress}}</p>
    <p>{{getLabels('wifi_password')}} : {{wifiPassword}}</p>
    <p>
      <br />
    </p>
    <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
    <p>{{getLabels('mci_success')}}</p>
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
    getLabels(nameKey) {
      for (let x = 0; x < this.labels.length; x++) {
        if (this.labels[x]["program-variable"] === nameKey) {
          const splitStr = this.labels[x]["program-label1"]
            .toLowerCase()
            .split(" ");
          for (let y = 0; y < splitStr.length; y++) {
            splitStr[y] =
              splitStr[y].charAt(0).toUpperCase() + splitStr[y].substring(1);
          }
          return splitStr.join(" ");
        }
      }
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss"/>