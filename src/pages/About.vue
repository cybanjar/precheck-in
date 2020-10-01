<template>
  <div class="spin-load-table" v-if="loading">
    <q-spinner color="primary" size="3em" :thickness="10" />
  </div>
  <div v-else>
    <div class="home">
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
      <div>
        <div class="row ml-4 mr-3 mt-3 mb-3" gutter="16">
          <q-card class="header-card">
            <div>
              <div class="col" :span="23" :xl="23" :xs="23">
                <p class="header-group">{{ getLabels("arrival") }}</p>
              </div>
            </div>
          </q-card>
        </div>
        <div class="row ml-3" gutter="16">
          <div class="col" :span="4" :xl="4" :lg="5" :md="6" :xs="24">
            <p>{{ getLabels("eta") }}</p>
            <vue-timepicker :minute-interval="30"></vue-timepicker>
          </div>
          <div
            class="col"
            :span="4"
            :xl="6"
            :lg="5"
            :md="6"
            :xs="24"
            v-show="showPickupRequest"
          >
            {{ showPrice }}
            <p>{{ getLabels("request") }}</p>
            <q-checkbox v-model="showPrice" :label="getLabels('pick_req')" />
          </div>
          <div
            class="col"
            :span="4"
            :xl="4"
            :lg="5"
            :md="5"
            :xs="24"
            v-show="showPickupRequest"
          >
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
            class="col"
            v-show="showPrice && showPickupRequest"
            :span="8"
            :xl="8"
            :lg="8"
            :md="7"
            :xs="24"
          >
            <p>{{ getLabels("pick_detail") }}</p>
            <q-input filled v-model="flight" />
          </div>
        </div>
        <div class="row ml-3" gutter="16">
          <div class="col">
            <p>{{ getLabels("room_pref") }}</p>
            <q-option-group
              v-model="group"
              :options="options"
              color="primary"
              v-show="showSmoking"
              @change="Room"
              inline
            />
            <!-- <a-radio-group
                name="radioGroup"
                v-show="showSmoking"
                @change="Room"
              >
                <a-radio value="NonSmoking">
                  <span class="font-weight-normal">{{
                    getLabels("non_smoking")
                  }}</span>
                </a-radio>
                <a-radio value="Smoking">
                  <span class="font-weight-normal">{{
                    getLabels("smoking")
                  }}</span>
                </a-radio>
              </a-radio-group> -->
            <!-- <a-form-item label>
              <a-radio-group
                name="radioGroup"
                v-show="showFloor"
                @change="Floor"
              >
                <a-radio value="LowerFloor">
                  <span class="font-weight-normal">{{
                    getLabels("lower_floor")
                  }}</span>
                </a-radio>
                <a-radio value="HigherFloor">
                  <span class="font-weight-normal">{{
                    getLabels("higher_floor")
                  }}</span>
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label>
              <a-radio-group name="radioGroup" v-show="showBed" @change="Bed">
                <a-radio value="OneBigBed">
                  <span class="font-weight-normal">{{
                    getLabels("one_big_bed")
                  }}</span>
                </a-radio>
                <a-radio value="TwoSingleBeds">
                  <span class="font-weight-normal">{{
                    getLabels("two_single_beds")
                  }}</span>
                </a-radio>
              </a-radio-group>
            </a-form-item> -->
          </div>
        </div>
        <div class="row ml-3" :gutter="[16, 8]">
          <div class="col" :span="9" :xl="9" :lg="9" :md="12" :xs="18">
            <p>{{ getLabels("special_request") }}</p>
            <q-input v-model="text" filled autogrow :maxlength="max" />
          </div>
          <div class="col max-breaker" :span="3" :xl="3" :xs="6">
            <span v-text="text.length + '/' + max"></span>
          </div>
        </div>

        <div class="row ml-4 mr-3 mb-3">
          <q-card class="header-card">
            <div class="row">
              <div class="col" :span="23" :xl="23" :xs="23">
                <p class="header-group">{{ getLabels("guest_detail") }}</p>
              </div>
            </div>
          </q-card>
        </div>
        <div class="row ml-3" :gutter="[16, 8]">
          <div
            class="col"
            v-if="email != ''"
            :span="5"
            :xl="5"
            :lg="7"
            :md="10"
            :xs="24"
          >
            <p>{{ getLabels("email") }}</p>
            <q-input outlined v-model="email" label="Outlined" disabled />
          </div>
          <div class="col" v-else :span="5" :xl="5" :lg="7" :md="10" :xs="24">
            <span>{{ currDataPrepare["guest-email"] }}</span>
            <p>{{ getLabels("email") }}</p>
            <q-input
              outlined
              v-model="email"
              label="Outlined"
              :rules="[(val) => !!val || getLabels('required_email')]"
            />
          </div>
          <div class="col" :span="5" :xl="5" :lg="7" :md="10" :xs="24">
            <p>{{ getLabels("phone_number") }}</p>
            <q-input
              outlined
              v-model="phone"
              :label="getLabels('phone_number')"
              mask="#### - #### - #####"
              unmasked-value
              hint="Mask: #### - #### - #####"
            />
          </div>
        </div>
        <div class="row ml-3" :gutter="[16, 8]">
          <div class="col" :span="3" :xl="3" :lg="7" :md="10" :xs="24">
            <p>{{ getLabels("purpose_stay") }}</p>
            <q-select
              outlined
              v-model="purpose"
              :options="FilterPurposeofStay"
            />
          </div>
        </div>
        <div class="row ml-3" :gutter="[16, 8]">
          <div :span="5" :xl="5" :lg="7" :md="10" :xs="24">
            <p>{{ getLabels("nationality") }}</p>
            <!-- <a-select
              show-search
              v-decorator="[
                'nationality',
                {
                  initialValue: currDataPrepare['guest-doc-nation'],
                  rules: [{ required: true }],
                },
              ]"
              @change="Nationality"
            >
              <a-select-option
                v-for="item in FilterCountry"
                :key="item"
                :value="item['descr']"
                >{{ item.setupvalue }}</a-select-option
              >
            </a-select> -->
            <q-select
              filled
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="FilterCountry"
              @filter="filterFn"
              style="width: 250px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>

        <div class="row ml-3 mb-3" :gutter="[16, 8]">
          <div class="col" :span="1" :xl="1" :xs="2">
            <q-checkbox v-model="agree" />
          </div>
          <div class="col fix-agreement" :span="23" :xl="23" :xs="22">
            {{ getLabels("pci_tc") }}
            <a @click="showModalTerm">{{ getLabels("t_c") }}</a>
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
        <div class="row ml-3" :gutter="[16, 8]">
          <div class="col" :span="4" :xl="4" :lg="7" :xs="24">
            <q-btn
              color="primary"
              :xl="12"
              class="font-weight-bold mt-3"
              block
              :size="size"
              :disabled="!agree"
              >{{ getLabels("ci_now") }}</q-btn
            >

            <!-- <a-button
              :xl="12"
              class="font-weight-bold mt-3"
              type="primary"
              block
              :size="size"
              :disabled="!agree"
              html-type="submit"
              >{{ getLabels("ci_now") }}</a-button
            > -->
          </div>
        </div>
      </div>
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
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

// Vue.use(Antd);

export default {
  components: {
    "vue-timepicker": VueTimepicker,
  },
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
    };
  },
  created() {
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

      console.log(parsed, "masuk");
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
          this.countries.push(this.tempsetup[i]);
          //   for (const i in this.countries) {
          //     this.countries[i].key = Number(i) + 1;
          //   }
          //   return this.countries;
          this.Country = this.countries;
          console.log(this.Country, "kota2");
          this.FilterCountry = this.mapWithNationality(this.Country, "descr");
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 3
        ) {
          const air = {};
          air["descr"] = this.tempsetup[i]["descr"];
          air["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.province.push(air);
          this.filteredProvince = this.province;
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
    this.labels = JSON.parse(localStorage.getItem("labels"));

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
    filterFn(val, update, abort) {
      update(() => {
        console.log("msk", val);
        const needle = val.toLowerCase();
        this.FilterCountry = this.Country.filter(function (itm) {
          //   return val.indexOf(itm.setupvalue) > -1;
          return itm ;
        });
        console.log(this.FilterCountry, "searching");
      });
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
      console.log(items, "datang");
      console.log(key, "datang3");
      let itemReturn = items
        ? items.map((item) => ({
            label: `${item["setupvalue"]}`,

            value: item[key],
          }))
        : [];
      console.log(itemReturn, "datang2");
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

