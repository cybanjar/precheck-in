<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <!-- {{currDataPrepare}} -->
      <h3 class="text-center font-weight-bold visible">{{ hotelname }}</h3>
      <div
        class="row header-branding"
        :style="information"
        type="flex"
        justify="space-between"
      >
        <div
          class="col pl-3 pt-3 invisible"
          :span="15"
          :md="15"
          :xl="15"
          :xs="24"
        >
          <h1 class="mb-3 font-white font-weight-bold" :style="information">
            ONLINE CHECK-IN
          </h1>
          <h2
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare["guest-member-name"] }}
          </h2>
          <h2
            v-else
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h2>

          <p class="ant-card-meta-description font-white" :style="information">
            {{ getLabels("arrival") }}:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong>
            {{ getLabels("departure") }}:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />
            {{ getLabels("book_code") }}:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </div>
        <div class="col container" :span="9" :md="9" :xl="9" :lg="9" :xs="24">
          <img class="img-hotel" :src="gambar" alt="Image Loading" />
          <div class="overlay invisible">
            <div class="text">{{ hotelname }}</div>
          </div>
          <div class="invisible">
            <div class="gear-setting"></div>
          </div>
        </div>
        <div class="col pl-3 pt-3 visible" :span="12" :md="12" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">
            ONLINE CHECK-IN
          </h1>
          <h2
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare["guest-member-name"] }}
          </h2>
          <h2
            v-else
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h2>
          <p class="ant-card-meta-description font-white" :style="information">
            {{ getLabels("arrival") }}:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong>
            {{ getLabels("departure") }}:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />
            {{ getLabels("book_code") }}:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </div>
      </div>
      <div>test</div>
    </div>
  </div>
</template>

<script>
// import router from "../router";
import Vue from "vue";
// import Quasar, {

//   Card,
//   Icon,
//   FormModel,
//   Button,
//   Checkbox,
//   Input,
//   Collapse,
//   Radio,
//   DatePicker,
//   Modal,
// } from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import moment from "moment";
import ky from "ky";
// Vue.use(Antd);

export default {
  data() {
    return {
      addessHotel:
        "Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240",
      id: [],
      plainOptions: ["Apple", "Pear", "Orange"],
      currDataPrepare: {},
      counter: 0,
      size: "large",
      checkNick: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
      },
      nilai: 2,
      bed: "",
      floor: "",
      region: "",
      room: "",
      setRegion: "Bali",
      cek: "",
      cities: "",
      filteredRegion: [],
      filteredProvince: [],
      province: [],
      nationality: "",
      dataGuest: [],
      max: 100,
      agree: false,
      text: "",
      kuy: "",
      money: 10,
      showSmoking: false,
      showBed: false,
      showFloor: false,
      showPrice: false,
      showPickupRequest: false,
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      muncul: false,
      guest: false,
      guests: "",
      keluar: false,
      currency: "Rp.",
      country: "",
      purpose: "",
      loading: true,
      term1: "I agree with the Terms and Conditions of Web Pre Check-in.",
      term: "",
      value: "terma",
      gambar: "https://source.unsplash.com/1366x786/?hotel",
      information: {
        backgroundColor: "$green",
        color: "$white",
      },
      tempsetup: [],
      totalnumber1: 0,
      tempRoomPreferencelenght: [],
      tempRoomPreference: [],
      indexStr: -1,
      acoPancenOye: [],
      requestpickup: "",
      per: "",
      visibleTerm: false,
      confirmLoadingTerm: false,
      hour: "",
      FilterPurposeofStay: [],
      FilterCountry: [],
      countries: [],
      hotelname: "",
      email: "",
      labels: [],
      flagKiosk: false,
      langID: "",
    };
  },
  created() {
    (async () => {
      const tempParam = location.search.substring(1);
      console.log(location.search,"param");
      const parsed = await ky
        .post(
          "http://54.251.169.160:8080/logserver/rest/loginServer/retrieveReservation",
          {
            json: {
              request: {
                encryptedText: tempParam
                  .replace(/%2F/g, "/")
                  .replace(/%20/g, "+"),
              },
            },
          }
        )
        .json();

      console.log(parsed,"masuk");
      localStorage.removeItem("labels");
      localStorage.setItem(
        "labels",
        JSON.stringify(parsed.response.languagesList["languages-list"])
      );
      this.labels = JSON.parse(localStorage.getItem("labels"));
      this.langID =
        parsed.response.languagesList["languages-list"][0]["lang-id"];

      this.tempsetup = parsed.response.pciSetup["pci-setup"];
      const jatah = [];
      for (const i in this.tempsetup) {
        if (this.tempsetup[i]["number1"] == 4) {
          jatah.push(this.tempsetup[i]);

          for (const heaven in jatah) {
            // console.log(jatah, "msk");
            if (jatah[heaven].setupflag == true) {
              this.information.backgroundColor = jatah[heaven]["setupvalue"];
            }
          }
        } else if (this.tempsetup[i]["number1"] == 5) {
          jatah.push(this.tempsetup[i]);

          for (const hell in jatah) {
            // console.log(jatah, "msk");
            if (jatah[hell].setupflag == true) {
              this.information.color = jatah[hell]["setupvalue"];
            }
          }
        } else if (
          this.tempsetup[i]["number1"] == 7 &&
          this.tempsetup[i]["number2"] == 1
        ) {
          const lagi = this.tempsetup[i]["setupvalue"].substring(
            this.tempsetup[i]["setupvalue"].lastIndexOf("<img src=") + 10,
            this.tempsetup[i]["setupvalue"].lastIndexOf('g"') + 1
          );
          this.gambar = lagi;
        } else if (
          this.tempsetup[i]["number1"] == 6 &&
          this.tempsetup[i]["setupflag"] == true
        ) {
          this.term = this.tempsetup[i]["setupvalue"];
        } else if (this.tempsetup[i]["number1"] == 2) {
          if (this.tempsetup[i].setupflag == true) {
            this.showPickupRequest = this.tempsetup[i].setupflag;
            this.money = this.tempsetup[i]["price"];
            this.currency = this.tempsetup[i]["remarks"];
            this.per = this.tempsetup[i]["setupvalue"].split("PER")[1];
            this.per = this.getLabels(this.per.toLowerCase().trim());
          }
        } else if (
          this.tempsetup[i]["number1"] == 8 &&
          this.tempsetup[i]["number2"] == 2
        ) {
          this.hour = this.tempsetup[i]["setupvalue"];
        } else if (this.tempsetup[i]["number1"] == 1) {
          this.tempsetup[i].setupvalue = this.getLabels(
            this.tempsetup[i].setupvalue.toLowerCase()
          );
          this.FilterPurposeofStay.push(this.tempsetup[i]);
          if (this.tempsetup[i].setupflag == true) {
            this.purpose = this.tempsetup[i].setupvalue;
          }
        } else if (this.tempsetup[i]["number1"] == 3) {
          if (this.tempsetup[i].number2 == 1) {
            this.showBed = this.tempsetup[i].setupflag;
          } else if (this.tempsetup[i].number2 == 2) {
            this.showSmoking = this.tempsetup[i].setupflag;
          } else if (this.tempsetup[i].number2 == 3) {
            this.showFloor = this.tempsetup[i].setupflag;
          }
        } else if (
          this.tempsetup[i]["number1"] == 99 &&
          this.tempsetup[i]["number2"] == 1
        ) {
          this.hotelname = this.tempsetup[i]["setupvalue"];
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 2
        ) {
          const bulbasur = {};
          bulbasur["descr"] = this.tempsetup[i]["descr"];
          bulbasur["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.countries.push(bulbasur);
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 3
        ) {
          const air = {};
          air["descr"] = this.tempsetup[i]["descr"];
          air["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.province.push(air);
        } else if (
          this.tempsetup[i]["number1"] == 8 &&
          this.tempsetup[i]["number2"] == 10
        ) {
          this.flagKiosk = this.tempsetup[i]["setupflag"];
        }
      }

      const tempMessResult = parsed.response.messResult.split(" ");
      this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
      // console.log(this.guests, "guests");

      if (
        parsed.response.arrivalGuest["arrival-guest"]["0"]["gcomment-desc"] ==
        "GUEST ALREADY PCI"
      ) {
        this.currDataPrepare = parsed.response.arrivalGuest["arrival-guest"][0];
        const mori =
          "{" +
          this.currDataPrepare["rsv-number"] +
          ";" +
          moment(this.currDataPrepare.depart).format("MM/DD/YYYY") +
          "," +
          this.hour +
          "}";
        // console.log(mori, "be the one");
        router.push({
          name: "Success",
          params: { jin: mori, jun: this.langID, jen: this.flagKiosk },
        });
      } else {
        this.currDataPrepare = parsed.response.arrivalGuest["arrival-guest"][0];
        this.country = this.currDataPrepare["guest-country"];
        this.email = this.currDataPrepare["guest-email"];
        const string =
          '<a data-flickr-embed="true" href="https://www.flickr.com/photos/190073392@N05/50315498352/in/dateposted-public/" title="vhp"><img src="https://live.staticflickr.com/65535/50315498352_b946e526dd_c.jpg" width="800" height="425" alt="vhp"></a>';
        const lagi = string.substring(
          string.lastIndexOf("<img src=") + 10,
          string.lastIndexOf('g"') + 1
        );
        this.gambar = lagi;
      }
    })();
    this.loading = false;
  },
  mounted() {
    this.filteredRegion = this.Region;
    this.filteredProvince = this.province;
    this.FilterCountry = this.countries;
    this.labels = JSON.parse(localStorage.getItem("labels"));
  },
  methods: {
    showModalTerm() {
      this.visibleTerm = true;
    },
    handleOkTerm(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleTerm = false;
        this.confirmLoadingTerm = false;
      }, 700);
    },
    handleCancelTerm(e) {
      this.visibleTerm = false;
    },
    showModal() {
      this.visible = true;
    },
    moment,
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    formatDate(datum) {
      return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(datum));
    },
    getLabels(nameKey) {
      for (let x = 0; x < this.labels.length; x++) {
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
      }
    },
  },
};
</script>