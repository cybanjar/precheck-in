<template>
  <div class="spin-load-table" v-if="loading">
    <q-spinner color="primary" size="3em" :thickness="10" />
  </div>
  <div v-else>
    <div class="home">
      <h6 class="q-ma-none text-center font-weight-bold visible">
        {{ hotelname }}
      </h6>
      <div
        :style="information"
        class="text-white row rounded-4 justify-between"
      >
        <div class="col-4">
          <h4 class="q-ma-sm font-weight-bold">Online Check-in</h4>
          <br />
          <h6
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="q-ma-sm main-guest-title font-weight-bold"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare["guest-member-name"] }}
          </h6>
          <h6
            v-else
            class="q-ma-sm main-guest-title font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h6>
          <p class="q-ma-sm">
            {{ getLabels("arrival") }}:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong>
            {{ getLabels("departure") }}:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />
            {{ getLabels("book_code") }}:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </div>
        <div class="col-4">
          <q-card flat class="my-card">
            <q-img :src="gambar" basic>
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ hotelname }}
              </div>
            </q-img>
          </q-card>
        </div>
      </div>

      <!-- Arrival -->
      <div>
        <h5 class="ml-3 font-weight-bold full-border-bottom">
          {{ getLabels("arrival") }}
        </h5>

        <div class="row ml-3" gutter="16">
          <div class="col-md-3 col-xs-12">
            <p>{{ getLabels("eta") }}</p>
            <vue-timepicker :minute-interval="30"></vue-timepicker>
          </div>
          <div class="col-md-3 col-xs-12" v-show="showPickupRequest">
            <!-- {{ showPrice }} -->
            <p>{{ getLabels("request") }}</p>
            <q-checkbox v-model="showPrice" :label="getLabels('pick_req')" />
          </div>
          <div class="col-md-2 col-xs-12" v-show="showPickupRequest">
            <p>{{ getLabels("price") }}</p>
            {{ nilai === 3 ? "" : currency }}
            {{
              nilai === 3
                ? " "
                : `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " "
            }}
            <span>/ {{ per }}</span>
          </div>
          <div
            class="col-md-3 col-xs-12"
            v-show="showPrice && showPickupRequest"
          >
            <p>{{ getLabels("pick_detail") }}</p>
            <q-input outlined />
          </div>
        </div>
        <div class="row ml-3">
          <div class="col">
            <p>{{ getLabels("room_pref") }}</p>
            <q-option-group
              v-show="showSmoking"
              :options="smoking"
              color="primary"
              inline
              dense
            />
            <q-option-group
              v-show="showFloor"
              :options="floor"
              color="primary"
              inline
              dense
            />
            <q-option-group
              v-show="showBed"
              :options="bed"
              color="primary"
              inline
              dense
            />
          </div>
        </div>
        <div class="row ml-3">
          <div class="col">
            <p>{{ getLabels("special_request") }}</p>
            <q-input v-model="text" autogrow outlined :maxlength="max" />
          </div>
          <div class="col max-breaker">
            <span v-text="text.length + '/' + max"></span>
          </div>
        </div>

        <h5 class="ml-3 font-weight-bold full-border-bottom">
          {{ getLabels("guest_detail") }}
        </h5>

        <div class="row ml-3">
          <div class="col-md-3 col-xs-12" v-if="email != ''">
            <p>{{ getLabels("email") }}</p>
            <q-input outlined v-model="email" disable readonly />
          </div>
          <div class="col-md-3 col-xs-12" v-else>
            <p>{{ getLabels("email") }}</p>
            <q-input
              outlined
              v-model="email"
              :rules="[(val) => !!val || getLabels('required_email')]"
            />
          </div>
          <div class="col-md-3 col-xs-12">
            <p>{{ getLabels("phone_number") }}</p>
            <q-input
              outlined
              v-model="phone"
              :label="getLabels('phone_number')"
              mask="#### - #### - #####"
              hint="Mask: #### - #### - #####"
            />
          </div>
        </div>

        <div class="row ml-3">
          <div class="col-md-3 col-xs-12">
            <p>{{ getLabels("purpose_stay") }}</p>
            <q-select
              outlined
              v-model="purpose"
              :options="FilterPurposeofStay"
            />
          </div>
        </div>
        <br />
        <div class="row ml-3">
          <div class="col-md-3 col-xs-12">
            <p>{{ getLabels("nationality") }}</p>
            <q-select outlined :options="FilterCountry" />
          </div>
        </div>
        <div class="row ml-3">
          <div class="col-md-3 col-xs-12">
            <p>{{ getLabels("country_of_residence") }}</p>
            <q-select outlined :options="FilterCountry" />
          </div>
          <div class="col-md-3 col-xs-12">
            <p>{{ getLabels("region") }}</p>
            <q-select outlined :options="filteredProvince" />
          </div>
        </div>

        <div class="row ml-3 mb-3 q-mt-md">
          <div>
            <q-checkbox v-model="agree" />
            <a @click="showModalTerm"
              >{{ getLabels("pci_tc") }} {{ getLabels("t_c") }}</a
            >
            {{ hotelname }}.
          </div>
          <q-dialog v-model="visibleTerm">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ getLabels("t_c") }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section style="max-height: 50vh" class="scroll">
                <p>{{ term }}</p>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right">
                <q-btn
                  flat
                  :label="getLabels('close')"
                  color="primary"
                  @click="handleOkTerm"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <div class="row ml-3">
          <div class="col-md-3 col-xs-12">
            <q-btn
              color="primary"
              class="font-weight-bold mt-3"
              block
              :size="size"
              :disabled="!agree"
              >{{ getLabels("ci_now") }}</q-btn
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import Vue from "vue";
import moment from "moment";
import ky from "ky";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  components: {
    "vue-timepicker": VueTimepicker,
  },
  data() {
    return {
      id: [],
      currDataPrepare: {},
      counter: 0,
      checkNick: false,
      nilai: 2,
      bed: "",
      size: "large",
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
      purpose: null,
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
      PurposeofStay: [],
      FilterPurposeofStay: [],
      Country: [],
      FilterCountry: [],
      countries: [],
      hotelname: "",
      email: "",
      labels: [],
      flagKiosk: false,
      langID: "",
      phone: "",
      smoking: [],
      floor: [],
      bed: [],
    };
  },
  created() {
    if (this.$route.params.id == undefined) {
      (async () => {
        const tempParam = location.search.substring(1);
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

        localStorage.removeItem("labels");
        localStorage.setItem(
          "labels",
          JSON.stringify(parsed.response.languagesList["languages-list"])
        );
        this.labels = JSON.parse(localStorage.getItem("labels"));
        this.langID =
          parsed.response.languagesList["languages-list"][0]["lang-id"];

        this.tempsetup = parsed.response.pciSetup["pci-setup"];
        let tempbC = this.tempsetup.filter((item, index) => {
          return item.number1 === 4;
        });
        let bC = tempbC.filter((item, index) => {
          return item.setupflag === true;
        });
        this.information.backgroundColor = bC[0].setupvalue;
        let tempfC = this.tempsetup.filter((item, index) => {
          return item.number1 === 5;
        });
        let fC = tempfC.filter((item, index) => {
          return item.setupflag === true;
        });
        this.information.color = fC[0].setupvalue;
        let tempGambar = this.tempsetup.filter((item, index) => {
          return item.number1 === 7 && item.number2 === 1;
        });
        this.gambar = tempGambar[0].setupvalue.substring(
          tempGambar[0].setupvalue.lastIndexOf("<img src=") + 10,
          tempGambar[0].setupvalue.lastIndexOf('g"') + 1
        );
        let tempTerm = this.tempsetup.filter((item, index) => {
          return item.number1 === 6 && item.setupflag === true;
        });
        this.term = tempTerm[0]["setupvalue"];
        let temRequest = this.tempsetup.filter((item, index) => {
          return item.number1 === 2 && item.setupflag === true;
        });
        this.showPickupRequest = temRequest[0].setupflag;
        this.money = temRequest[0]["price"];
        this.currency = temRequest[0]["remarks"];
        let tempPer = temRequest[0]["setupvalue"].split("PER")[1];
        this.per = this.getLabels(tempPer.toLowerCase().trim());
        let tempHour = this.tempsetup.filter((item, index) => {
          return item.number1 === 8 && item.number2 === 2;
        });
        this.hour = tempHour[0]["setupvalue"];
        let tempBed = this.tempsetup.filter((item, index) => {
          return item.number1 === 3 && item.number2 === 1;
        });
        this.showBed = tempBed[0].setupflag;
        let tempSmoking = this.tempsetup.filter((item, index) => {
          return item.number1 === 3 && item.number2 === 2;
        });
        this.showSmoking = tempSmoking[0].setupflag;
        let tempFloor = this.tempsetup.filter((item, index) => {
          return item.number1 === 3 && item.number2 === 3;
        });
        this.showFloor = tempFloor[0].setupflag;
        let tempHotel = this.tempsetup.filter((item, index) => {
          return item.number1 === 99 && item.number2 === 1;
        });
        this.hotelname = tempHotel[0]["setupvalue"];
        let tempCountry = this.tempsetup.filter((item, index) => {
          return item.number1 === 9 && item.number2 === 2;
        });
        this.Country.push(tempCountry);
        this.FilterCountry = this.mapWithNationality(this.Country[0], "descr");
        let tempProvince = this.tempsetup.filter((item, index) => {
          return item.number1 === 9 && item.number2 === 3;
        });
        this.province = tempProvince;
        this.filteredProvince = this.mapWithProvince(this.province, "descr");
        let tempKios = this.tempsetup.filter((item, index) => {
          return item.number1 === 8 && item.number2 === 10;
        });
        this.flagKiosk = tempKios[0]["setupflag"];
        this.smoking = [
          {
            label: this.getLabels("non_smoking"),
            value: "NonSmoking",
          },
          {
            label: this.getLabels("smoking"),
            value: "Smoking",
          },
        ];
        this.floor = [
          {
            label: this.getLabels("lower_floor"),
            value: "LowerFloor",
          },
          {
            label: this.getLabels("higher_floor"),
            value: "HigherFloor",
          },
        ];
        this.bed = [
          {
            label: this.getLabels("one_big_bed"),
            value: "OneBigBed",
          },
          {
            label: this.getLabels("two_single_beds"),
            value: "TwoSingleBeds",
          },
        ];
        const jatah = [];
        for (const i in this.tempsetup) {
          if (this.tempsetup[i]["number1"] == 1) {
            this.tempsetup[i].setupvalue = this.getLabels(
              this.tempsetup[i].setupvalue.toLowerCase()
            );
            this.PurposeofStay.push(this.tempsetup[i]);
            this.FilterPurposeofStay = this.mapWithPurpose(
              this.PurposeofStay,
              "number2"
            );
            if (this.tempsetup[i].setupflag == true) {
              // this.purpose = this.tempsetup[i].setupvalue;
              this.purpose = {
                label: this.tempsetup[i].setupvalue,
                value: this.tempsetup[i].number2,
              };
            }
          }
        }

        const tempMessResult = parsed.response.messResult.split(" ");
        this.guests = parsed.response.arrivalGuest["arrival-guest"].length;

        if (tempMessResult[0] == "99") {
          this.$router.push("notfound").catch(() => {});
        } else {
          if (parsed.response.arrivalGuest["arrival-guest"].length > 1) {
            const nietos = [];
            const obj = {};
            this.dataGuest = parsed.response.arrivalGuest["arrival-guest"];
            // console.log(this.gambar, "gambar");
            obj["01"] = this.gambar;
            obj["02"] = this.information;
            obj["03"] = this.money;
            obj["04"] = this.currency;
            obj["05"] = this.per;
            obj["06"] = this.purpose;
            obj["07"] = this.FilterPurposeofStay;
            obj["08"] = this.showBed;
            obj["09"] = this.showSmoking;
            obj["10"] = this.showFloor;
            obj["11"] = this.hour;
            obj["12"] = this.term;
            obj["13"] = this.hotelname;
            obj["14"] = this.showPickupRequest;
            obj["15"] = this.countries;
            obj["16"] = this.province;
            obj["17"] = this.smoking;
            obj["18"] = this.floor;
            obj["19"] = this.bed;
            nietos.push(this.dataGuest);
            nietos.push(obj);
            this.$router
              .push({ name: "List", params: { foo: nietos } })
              .catch(() => {});
          } else if (
            parsed.response.arrivalGuest["arrival-guest"]["0"][
              "gcomment-desc"
            ] == "GUEST ALREADY PCI"
          ) {
            this.currDataPrepare =
              parsed.response.arrivalGuest["arrival-guest"][0];
            const mori =
              "{" +
              this.currDataPrepare["rsv-number"] +
              ";" +
              moment(this.currDataPrepare.depart).format("MM/DD/YYYY") +
              "," +
              this.hour +
              "}";
            // console.log(mori, "be the one");
            this.$router
              .push({
                name: "Success",
                params: { jin: mori, jun: this.langID, jen: this.flagKiosk },
              })
              .catch(() => {});
          } else {
            this.currDataPrepare =
              parsed.response.arrivalGuest["arrival-guest"][0];
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
        }
      })();
    } else {
      this.gambar = this.$route.params.id["setup"]["01"];
      this.information = this.$route.params.id["setup"]["02"];
      this.money = this.$route.params.id["setup"]["03"];
      this.currency = this.$route.params.id["setup"]["04"];
      this.per = this.$route.params.id["setup"]["05"];
      this.purpose = this.$route.params.id["setup"]["06"];
      this.FilterPurposeofStay = this.$route.params.id["setup"]["07"];
      this.showBed = this.$route.params.id["setup"]["08"];
      this.showSmoking = this.$route.params.id["setup"]["09"];
      this.showFloor = this.$route.params.id["setup"]["10"];
      this.hour = this.$route.params.id["setup"]["11"];
      this.term = this.$route.params.id["setup"]["12"];
      this.hotelname = this.$route.params.id["setup"]["13"];
      this.showPickupRequest = this.$route.params.id["setup"]["14"];
      this.countries = this.$route.params.id["setup"]["15"];
      this.province = this.$route.params.id["setup"]["16"];
      this.smoking = this.$route.params.id["setup"]["17"];
      this.floor = this.$route.params.id["setup"]["18"];
      this.bed = this.$route.params.id["setup"]["19"];
      this.id = this.$route.params.id["data"];

      this.currDataPrepare = this.id[this.counter];
      this.country = this.currDataPrepare["guest-country"];
      this.email = this.currDataPrepare["guest-email"];
      this.labels = JSON.parse(localStorage.getItem("labels"));

      this.counter += 1;
    }
    this.loading = false;
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

    mapWithPurpose(items, key) {
      let itemReturn = items
        ? items.map((item) => ({
            label: `${item["setupvalue"]} `,
            value: item[key],
          }))
        : [];
      return itemReturn;
    },
    mapWithNationality(items, key) {
      let itemReturn = items
        ? items.map((item) => ({
            label: `${item["setupvalue"]}`,

            value: item[key],
          }))
        : [];
      return itemReturn;
    },
    mapWithProvince(items, key) {
      let itemReturn = items
        ? items.map((item) => ({
            label: `${item["setupvalue"]}`,

            value: item[key],
          }))
        : [];

      return itemReturn;
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

