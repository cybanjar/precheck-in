<template>
  <div class="text-center">
    <canvas id="canvas" v-show="(flagKiosk)"></canvas>
    <p>
      {{ getLabels("book_code") }} :
      <span class="font-weight-bold">{{ taejin }}</span>
    </p>
    <p>
      {{ getLabels("co_date") }} :
      <span class="font-weight-bold">{{ iplyo }}</span>
    </p>
    <p>
      {{ getLabels("ci_time") }} :
      <span class="font-weight-bold">{{ jegal }}</span>
    </p>
    <p>
      <a-button type="primary" :href="urlMCI">{{
        getLabels("ci_now")
      }}</a-button>
    </p>
    <p>
      <br />
    </p>
    <p v-show="(!flagKiosk)">{{ getLabels("success_wo_kiosk") }}</p>
    <p v-show="(flagKiosk)">{{ getLabels("success_w_kiosk") }}</p>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ky from "ky";

export default {
  data() {
    return {
      taejin: "",
      iplyo: "",
      jegal: "",
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
    this.hotelCode = JSON.parse(localStorage.getItem("labels"));
    // console.log(this.$route.params.jun + ' ' + this.labels);

    const success = btoa(this.data);
    this.taejin = this.data.substr(1, this.data.indexOf(";") - 1);
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
      this.jegal;
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H", width: "300", height: "auto" }
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
        .post( this.hotelEndpoint+"preCI/storeQRCode", {
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
    getLabels(nameKey) {
      const label = this.labels.find(
        (element) => element["lang-variable"] == nameKey
      );
      return (
        label["lang-value"].charAt(0).toUpperCase() +
        label["lang-value"].slice(1)
      );
      /*for (let x = 0; x < this.labels.length; x++) {
        if (this.labels[x]["lang-variable"] === nameKey) {
          const splitStr = this.labels[x]["lang-value"]
            .toLowerCase()
            .split(" ");
          for (let y = 0; y < splitStr.length; y++) {
            splitStr[y] =
              splitStr[y].charAt(0).toUpperCase() + splitStr[y].substring(1);
          }
          return splitStr.join(" ");
        }
      }*/
    },
  },
};
</script>
