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

export default {
  data() {
    return { taejin: "", url: "" };
  },
  mounted() {
    console.log(this.$route.params.jin, "nyampe");
    this.data = this.$route.params.jin;
    const success = this.data;
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

    const decodedString = atob(this.url);
    console.log(decodedString,"decode");
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss"/>