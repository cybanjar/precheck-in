<template>
  <div class="text-center">
    <canvas id="canvas"></canvas>
    <p>Booking Code : {{taejin}}</p>
    <a href="https://precheckin-8392e.web.app/ota">https://precheckin-8392e.web.app/ota</a>
    <p>
      <br />
    </p>
    <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ky from "ky";

export default {
  data() {
    return { taejin: "", url: "" };
  },
  mounted() {
    console.log(this.$route.params.jin, "nyampe");
    this.data = this.$route.params.jin;
    const success = btoa(this.data);
    this.taejin = success.substr(1, success.indexOf(";") - 1);
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H" },
      { width: 250 }
      // function (error) {
      // if (error) console.error(error);
      // console.log("success!");
      // }
    );

    QRCode.toDataURL(success, { errorCorrectionLevel: "H" }).then((url) => {
      console.log(url.split(",")[1]);
      this.url = url.split(",")[1];
    });

    (async () => {
      const parsed = await ky
        .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/storeQRCode", {
          json: {
            request: {
              base64image: this.url,
              resno: this.taejin,
            },
          },
        })
        .json();
      console.log(parsed);
    })();
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss"/>