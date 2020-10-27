<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div :style="ota">
      <q-img class="" :src="hotelImage">
        <div
          class="absolute-bottom font-weight-bold text-subtitle2 text-center"
        >
          {{ hotelName }}
        </div>
      </q-img>

      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="infoMCIEarlyCheckin"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="hideMCIModal">{{
            getLabels("close", `titleCase`)
          }}</a-button>
        </template>
        <p>{{ getLabels("early_checkin", `sentenceCase`) }}{{ checkin }}</p>
      </a-modal>
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="infoMCINotFound"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="hideMCIModal">{{
            getLabels("close", `titleCase`)
          }}</a-button>
        </template>
        <p>{{ getLabels("mci_error_not_found", `sentenceCase`) }}</p>
      </a-modal>
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="infoMCINotReady"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="back" @click="handleNo">
            {{ getLabels("no", `titleCase`) }}
          </a-button>
          <a-button key="submit" type="primary" @click="handleYes">{{
            getLabels("yes", `titleCase`)
          }}</a-button>
        </template>
        <p>{{ getLabels("mci_error_not_ready", "sentenceCase") }}</p>
      </a-modal>
      <a-row :gutter="[8, 32]" class="mb-3">
        <div>
          <q-btn-toggle
            v-model="mcilang"
            toggle-color="primary"
            color="white"
            text-color="black"
            toggle-text-color="white"
            style="margin-top: 30px; margin-bottom: -10px;"
            @input="changeLang"
            :options="[
              { label: 'ENG', value: 'eng' },
              { label: 'IDN', value: 'idn' },
            ]"
          />
        </div>
        <a-col class="text-center" :span="4" :xs="24">
          <h1 :class="FG">
            <b>{{ getLabels("find_rsv", `titleCase`) }}</b>
          </h1>
          <p :style="textOta">
            {{ getLabels("choose_option", `sentenceCase`) }}
          </p>
        </a-col>
      </a-row>
      <a-row :gutter="[8, 32]" class="mt-3" type="flex" justify="center">
        <a-col :span="4" :xl="4" :xs="12">
          <img @click="showModalBookingCode" class="img-ota" :src="boPhoto" />
          <a-modal
            v-model="modalBookingCode"
            :title="getLabels('book_code', `titleCase`)"
            :closable="false"
          >
            <template slot="footer">
              <a-button
                key="back"
                @click="handleCancel"
                :disabled="confirmLoading"
              >
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button
                key="submit"
                type="primary"
                @click="handleFindRsv('bookingcode')"
                :disabled="confirmLoading"
              >
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-spin :spinning="confirmLoading">
              <a-form-item :label="getLabels('book_code', `titleCase`)">
                <a-input
                  class="ant-input-h"
                  v-model="bookingcode"
                  ref="bookingcode"
                  :placeholder="getLabels('input_bookcode', `sentenceCase`)"
                />
              </a-form-item>
              <a-form-item :label="getLabels('co_date', `titleCase`)">
                <q-input
                  v-model="date"
                  @click="$refs.qDateProxy.show()"
                  outlined
                  dense
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="calendar_today" class="cursor_pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="date"
                          mask="DD/MM/YYYY"
                          :navigation-min-year-month="minCalendar"
                          :options="
                            (date) => date >= minDate && date <= maxDate
                          "
                          @input="$refs.qDateProxy.hide()"
                          today-btn
                          no-unset
                        >
                          <!--<div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>-->
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </a-form-item>
            </a-spin>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img @click="showModalGuestName" class="img-ota" :src="namePhoto" />
          <a-modal
            v-model="modalGuestName"
            :title="getLabels('guest_name', `titleCase`)"
            :closable="false"
            ><template slot="footer">
              <a-button
                key="back"
                @click="handleCancel"
                :disabled="confirmLoading"
              >
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button
                key="submit"
                type="primary"
                @click="handleFindRsv('guestname')"
                :disabled="confirmLoading"
              >
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-spin :spinning="confirmLoading">
              <a-form-item :label="getLabels('guest_name', `titleCase`)">
                <a-input
                  class="ant-input-h"
                  v-model="name"
                  ref="name"
                  :placeholder="getLabels('input_guest_name', `sentenceCase`)"
                />
              </a-form-item>
              <a-form-item :label="getLabels('co_date', `titleCase`)">
                <q-input
                  v-model="date"
                  @click="$refs.qDateProxy.show()"
                  outlined
                  dense
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="calendar_today" class="cursor_pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="date"
                          mask="DD/MM/YYYY"
                          :navigation-min-year-month="minCalendar"
                          :options="
                            (date) => date >= minDate && date <= maxDate
                          "
                          @input="$refs.qDateProxy.hide()"
                          today-btn
                          no-unset
                        >
                          <!--<div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>-->
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </a-form-item>
            </a-spin>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img
            class="img-ota"
            @click="showModalEmailAddress"
            :src="emailPhoto"
          />
          <a-modal
            v-model="modalEmailAddress"
            :title="getLabels('email', `titleCase`)"
            :closable="false"
            ><template slot="footer">
              <a-button
                key="back"
                @click="handleCancel"
                :disabled="confirmLoading"
              >
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button
                key="submit"
                type="primary"
                @click="handleFindRsv('email')"
                :disabled="confirmLoading"
              >
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-spin :spinning="confirmLoading">
              <a-form-item :label="getLabels('email', `titleCase`)">
                <a-input
                  class="ant-input-h"
                  v-model="email"
                  ref="email"
                  :placeholder="getLabels('input_email', `sentenceCase`)"
                />
              </a-form-item>
              <a-form-item :label="getLabels('co_date', `titleCase`)">
                <q-input
                  v-model="date"
                  @click="$refs.qDateProxy.show()"
                  outlined
                  dense
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="calendar_today" class="cursor_pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="date"
                          mask="DD/MM/YYYY"
                          :navigation-min-year-month="minCalendar"
                          :options="
                            (date) => date >= minDate && date <= maxDate
                          "
                          @input="$refs.qDateProxy.hide()"
                          today-btn
                          no-unset
                        >
                          <!--<div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>-->
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </a-form-item>
            </a-spin></a-modal
          >
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img
            class="img-ota"
            @click="showModalMembershipID"
            :src="memberPhoto"
          />
          <a-modal
            v-model="modalMembershipID"
            :title="getLabels('membership_id', `titleCase`)"
            :closable="false"
            ><template slot="footer">
              <a-button
                key="back"
                @click="handleCancel"
                :disabled="confirmLoading"
              >
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button
                key="submit"
                type="primary"
                @click="handleFindRsv('membership')"
                :disabled="confirmLoading"
              >
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-spin :spinning="confirmLoading">
              <a-form-item :label="getLabels('membership_id', `titleCase`)">
                <a-input
                  v-model="member"
                  class="ant-input-h"
                  ref="member"
                  :placeholder="getLabels('input_membership', `sentenceCase`)"
                />
              </a-form-item>
              <a-form-item :label="getLabels('co_date', `titleCase`)">
                <q-input
                  v-model="date"
                  @click="$refs.qDateProxy.show()"
                  outlined
                  dense
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="calendar_today" class="cursor_pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="date"
                          mask="DD/MM/YYYY"
                          :navigation-min-year-month="minCalendar"
                          :options="
                            (date) => date >= minDate && date <= maxDate
                          "
                          @input="$refs.qDateProxy.hide()"
                          today-btn
                          no-unset
                        >
                          <!--<div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>-->
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </a-form-item>
            </a-spin>
          </a-modal>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import router from "../router";
import Vue from "vue";
import {
  Quasar,
  QInput,
  QTime,
  QDate,
  QBtn,
  QBtnToggle,
  QPopupProxy,
  ClosePopup,
  QIcon,
} from "quasar";
Vue.use(Quasar, {
  config: {},
  components: {
    QTime,
    QDate,
    QInput,
    QBtn,
    QBtnToggle,
    QPopupProxy,
    QIcon,
  },
  directives: {
    ClosePopup,
  },
  plugins: {},
});
import moment from "moment";
import ky from "ky";
import CookieS from "vue-cookies";
export default {
  data() {
    return {
      mcilang: "eng",
      modalBookingCode: false,
      modalGuestName: false,
      modalEmailAddress: false,
      modalMembershipID: false,
      bookingcode: "",
      name: "",
      email: "",
      dateFormat: "MM/DD/YY",
      date: "",
      minCalendar: "2020/10",
      minDate: "2020/10/10",
      maxDate: "2020/10/10",
      hour: "",
      infoMCIEarlyCheckin: false,
      infoMCINotFound: false,
      infoMCINotReady: false,
      // informationmodal2: false,
      message: "",
      labels: [],
      tempsetup: [],
      checkin: "",
      langID: "",
      hotelCode: "",
      tempHotel: "",
      payment: "",
      server: "",
      hotelEndpoint: "",
      boPhoto: "",
      namePhoto: "",
      emailPhoto: "",
      memberPhoto: "",
      member: "",
      loading: true,
      confirmLoading: false,
      hotelImage: "",
      hotelName: "",
      textOta: {
        color: "",
        opacity: "0.65",
      },
      ota: {
        backgroundColor: "",
        width: "100%",
        height: "100vh",
        overflowX: "hidden",
        textAlign: "center",
      },
      hotelParams: "",
      roomNotReady: false,
      reservation: [],
      tempParambook: "",
      tempParamcodate: "",
      tempParamcitime: "",
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      location: "",
      programLabel: "",
      earliestCiTime: "00:00",
      earliestCiFlag: false,
      FilterPurposeofStay: [],
      purpose: "",
      countries: [],
      province: [],
      termENG: "",
      termIDN: "",
      money: "",
      currency: "",
      per: "",
      scanid: "",
      wifiAddress: "",
      wifiPassword: "",
      SkipDeposit: "",
      minimumDeposit: "",
      freeParking: "",
      BG: "",
      FG: "",
      setup: [],
      SystemDate: "",
      LICENSE: "",
    };
  },
  created() {
    /* Get Base URL */
    this.location = window.location.host;
    /* tempParam Variable for Nicepay */
    const tempParam = {};
    if (this.$route.params.hotelParameter != undefined) {
      /* Get Router Param From PCI */
      this.hotelParams = this.$route.params.hotelParameter;
      this.tempParambook = this.$route.params.bookingcode;
      this.tempParamcodate = this.$route.params.coDate;
      this.tempParamcitime = this.$route.params.citime;

      /* EncodedURI For Full URL Redirecting save at this.location */
      const encodedURI = encodeURIComponent(this.hotelParams);
      this.location += `/mobilecheckin?${encodedURI}`;
    } else if (location.search.substring(1) != undefined) {
      /* Save Full URL For Redirecting save at this.location */

      this.location += `/mobilecheckin?${location.search.substring(1)}`;
      /* DecodeURI for Getting Fixed Hotel Encrypted Parameter */
      this.hotelParams = decodeURIComponent(location.search.substring(1));
    } else {
      /* Nicepay Callback Redirect decodeURI */

      location.search
        .split("&")
        .toString()
        .substr(1)
        .split(",")
        .forEach((item) => {
          tempParam[item.split("=")[0]] = decodeURIComponent(item.split("=")[1])
            ? item.split("=")[1]
            : "No query strings available";
        });
    }
    /* Get Client Today Date For Initializing Data */
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    this.date = dd + "/" + mm + "/" + yyyy;
    /* Async Get Hotel Setup (Hotel Endpoint, Hotel Code, Hotel Language) */
    (async () => {
      const code = await ky
        .post(
          "http://login.e1-vhp.com:8080/logserver/rest/loginServer/getUrl",
          {
            json: {
              request: {
                hotelCode: this.hotelParams,
              },
            },
          }
        )
        .json();

      /* IF Null Response */
      if (code.response["messResult"] == null) {
        router.replace({
          name: "NotFound",
        });
      }
      /* Assign Hotel Initial Setup */
      this.tempHotel = code.response.pciSetup["pci-setup"];
      const tempEndpoint = this.tempHotel.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 2;
      });
      const tempCode = this.tempHotel.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 3;
      });
      const tempLang = this.tempHotel.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 5;
      });
      this.hotelEndpoint = tempEndpoint[0]["setupvalue"];
      this.hotelCode = tempCode[0]["setupvalue"];
      this.langID = tempLang[0]["setupvalue"];
      this.mcilang = this.langID.toLowerCase();
      /* Check Used Language */

      switch (this.langID.toLowerCase()) {
        case "eng":
          this.programLabel = "program-label1";
          break;
        case "idn":
          this.programLabel = "program-label2";
          break;
        default:
          this.programLabel = "eng";
          break;
      }
      /* Get Icon According to the selected language */
      if (this.langID == "eng" || this.langID == "ENG") {
        this.boPhoto = require(`../assets/booking-code.svg`);
        this.namePhoto = require(`../assets/Name.svg`);
        this.emailPhoto = require(`../assets/EmailAddress.svg`);
        this.memberPhoto = require(`../assets/membership.svg`);
      } else {
        this.boPhoto = require(`../assets/kodeBooking.svg`);
        this.namePhoto = require(`../assets/Nama.svg`);
        this.emailPhoto = require(`../assets/AlamatEmail.svg`);
        this.memberPhoto = require(`../assets/keanggotaan.svg`);
      }
      /* Async Get Label From Database */
      const parsed = await ky
        .post(
          "http://login.e1-vhp.com:8080/logserver/rest/loginServer/loadVariableLabel",
          {
            json: {
              request: {
                countryId1: "ENG",
                countryId2: "IDN",
                inpVariable: " ",
              },
            },
          }
        )
        .json();
      localStorage.removeItem("labels");
      localStorage.setItem(
        "labels",
        JSON.stringify(parsed.response.countryLabels["country-labels"])
      );
      this.labels = JSON.parse(localStorage.getItem("labels"));
      /* Load All PCI Setup Based On Hotel Endpoint */
      const setup = await ky
        .post(this.hotelEndpoint + "preCI/loadSetup", {
          json: {
            request: {
              icase: 1,
            },
          },
        })
        .json();
      this.tempsetup = setup.response.pciSetup["pci-setup"];
      const jatah = [];
      for (const i in this.tempsetup) {
        if (this.tempsetup[i]["number1"] == 1) {
          this.tempsetup[i].setupvalue = this.tempsetup[i].setupvalue;
          this.FilterPurposeofStay.push(this.tempsetup[i]);
          if (this.tempsetup[i].setupflag == true) {
            this.purpose = this.tempsetup[i].setupvalue; //data purpose of stay
          }
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 2
        ) {
          const country = {};
          country["descr"] = this.tempsetup[i]["descr"]; //data country
          country["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.countries.push(country);
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 3
        ) {
          const land = {};
          land["descr"] = this.tempsetup[i]["descr"]; //data province
          land["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.province.push(land);
        }
      }

      const tempTermENG = this.tempsetup.filter((item, index) => {
        // Term ENG
        return item.number1 === 6 && item.number2 === 1;
      });
      this.termENG = tempTermENG[0]["setupvalue"];

      const tempTermIDN = this.tempsetup.filter((item, index) => {
        // Term IDN
        return item.number1 === 6 && item.number2 === 2;
      });
      this.termIDN = tempTermIDN[0]["setupvalue"];

      const tempCurrency = this.tempsetup.filter((item, index) => {
        //  Currency
        return item.number1 === 2 && item.setupflag == true;
      });
      this.money = tempCurrency["0"]["price"];
      this.currency = tempCurrency["0"]["remarks"];
      this.per = tempCurrency["0"]["setupvalue"].split("PER")[1];

      const tempScandID = this.tempsetup.filter((item, index) => {
        //  Scand ID
        return item.number1 === 8 && item.number2 == 1;
      });
      this.scanid = tempScandID["0"]["setupflag"];

      const tempwifiAddress = this.tempsetup.filter((item, index) => {
        //  Wifi Address
        return item.number1 === 8 && item.number2 == 8;
      });
      this.wifiAddress = tempwifiAddress["0"]["setupvalue"];

      const tempwifiPassword = this.tempsetup.filter((item, index) => {
        //  Wifi Password
        return item.number1 === 8 && item.number2 == 9;
      });
      this.wifiPassword = tempwifiPassword["0"]["setupvalue"];

      const tempSkipDeposit = this.tempsetup.filter((item, index) => {
        //  Skip Deposit
        return item.number1 === 8 && item.number2 == 4;
      });
      this.SkipDeposit = tempSkipDeposit["0"]["setupflag"];

      const tempMinDeposit = this.tempsetup.filter((item, index) => {
        //  Minimum Deposit
        return item.number1 === 8 && item.number2 == 5;
      });
      this.minimumDeposit = tempMinDeposit["0"]["price"];

      const tempfreeParking = this.tempsetup.filter((item, index) => {
        //  Free Parking
        return item.number1 === 8 && item.number2 == 5;
      });
      this.freeParking = this.tempsetup["0"]["setupflag"];

      const tempBG = this.tempsetup.filter((item, index) => {
        //  Background Color
        return item.number1 === 4 && item.setupflag === true;
      });
      this.ota.backgroundColor = tempBG[0]["setupvalue"];
      this.BG = tempBG[0]["setupvalue"];

      const tempFG = this.tempsetup.filter((item, index) => {
        //  Foreground Color
        return item.number1 === 5 && item.setupflag === true;
      });
      this.textOta.color = tempFG[0]["setupvalue"];
      this.FG = tempFG[0]["setupvalue"];

      const tempImage = this.tempsetup.filter((item, index) => {
        //  Image Hotel
        return item.number1 === 7 && item.number2 === 1;
      });
      this.hotelImage = tempImage[0]["setupvalue"];

      const tempHotelName = this.tempsetup.filter((item, index) => {
        //  Hotel Name
        return item.number1 === 99 && item.number2 === 1;
      });
      this.hotelName = tempHotelName[0]["setupvalue"];

      const tempSystemDate = this.tempsetup.filter((item, index) => {
        //  SYSTEM DATE
        return item.number1 === 9 && item.number2 === 4;
      });
      this.SystemDate = tempSystemDate[0]["setupvalue"];

      const tempLICENSE = this.tempsetup.filter((item, index) => {
        //  LICENSE WA/SMS GATEWAY
        return item.number1 === 9 && item.number2 === 5;
      });
      this.LICENSE = tempLICENSE[0]["setupflag"];

      const tempServer = this.tempsetup.filter((item, index) => {
        //  Server Time
        return (
          item.number1 === 9 &&
          item.number2 === 7 &&
          item.descr == "SERVER TIME"
        );
      });

      this.server = moment(tempServer[0]["setupvalue"], "HH:mm")._i;

      const obj = {};
      obj["FilterPurposeofStay"] = this.FilterPurposeofStay;
      obj["PurposeofStay"] = this.purpose;
      obj["countries"] = this.countries;
      obj["province"] = this.province;
      obj["termENG"] = this.termENG;
      obj["termIDN"] = this.termIDN;
      obj["money"] = this.money;
      obj["currency"] = this.currency;
      obj["per"] = this.per;
      obj["scanid"] = this.scanid;
      obj["wifiAddress"] = this.wifiAddress;
      obj["wifiPassword"] = this.wifiPassword;
      obj["SkipDeposit"] = this.SkipDeposit;
      obj["BackgroundColor"] = this.BG;
      obj["FontColor"] = this.FG;
      obj["freeParking"] = this.freeParking;
      obj["hotelImage"] = this.hotelImage;
      obj["hotelName"] = this.hotelName;
      obj["hotelEndpoint"] = this.hotelEndpoint;
      obj["hotelCode"] = this.hotelCode;
      obj["langID"] = this.langID;
      obj["serverTime"] = this.server;
      obj["SystemDate"] = this.SystemDate;
      obj["LICENSE"] = this.LICENSE;
      this.setup.push(obj);
      console.log(this.setup, "test");
      //End Request Set Up
      const msServerClock = moment(
        tempServer[0]["setupvalue"],
        "HH:mm"
      ).valueOf();
      // Hotel System Date
      const systemDateObj = this.tempsetup.filter((item, index) => {
        return item.number1 === 9 && item.number2 === 4;
      });
      // Handling Hotel System Date to Set At Calendar
      const systemDate = systemDateObj[0]["setupvalue"];
      const dDate = String(moment(systemDate, "DD/MM/YYYY").date()).padStart(
        2,
        "0"
      );
      const dMonth = String(
        moment(systemDate, "DD/MM/YYYY").month() + 1
      ).padStart(2, "0");
      const dYear = String(moment(systemDate, "DD/MM/YYYY").year());
      const dYearMax = String(moment(systemDate, "DD/MM/YYYY").year() + 5); // Only 5 years
      this.date = moment(`${dDate}/${dMonth}/${dYear}`, "DD/MM/YYYY")._i;
      this.minDate = `${dYear}/${dMonth}/${dDate}`;
      this.maxDate = `${dYearMax}/${dMonth}/${dDate}`;
      this.minCalendar = `${dYear}/${dMonth}`;
      // Get Hotel Default Checkin Time
      const checkinTime = this.tempsetup.filter((item, index) => {
        return item.number1 === 8 && item.number2 === 2;
      });
      this.checkin = checkinTime[0]["setupvalue"];
      // Convert Check-in Time to Milisecond
      let msCheckinClock = moment(this.checkin, "HH:mm").valueOf();
      // Get Earliest Checkin Time
      const earliestCI = this.tempsetup.filter((item, index) => {
        return item.number1 === 8 && item.number2 === 11;
      });
      this.earliestCiTime = checkinTime[0]["setupvalue"];
      this.earliestCiFlag = checkinTime[0]["setupflag"];
      // Convert Earliest Check-in Time to Milisecond
      const msEarliestCiTime = moment(this.earliestCiTime, "HH:mm").valueOf();
      /** Compare Check-in Time with Server Time
       *  If Erliest CI Flag is Active : Server Time < Earliest CI Time Then Show Pop Up Cannot MCI
       *  If Server Time < Check-in Time Then Show Pop Up Cannot MCI
       */
      if (this.earliestCiFlag) {
        if (msServerClock < msEarliestCiTime) {
          this.infoMCIEarlyCheckin = true;
        }
      } else {
        if (msServerClock < msCheckinClock) {
          this.infoMCIEarlyCheckin = true;
        }
      }
      /* Nicepay Callback Handler */
      if (this.tempParambook != "") {
        this.checkin = this.tempParamcitime.replace(/%3A/g, ":");
        msCheckinClock = moment(this.checkin, "HH:mm").valueOf();
        if (msServerClock < msCheckinClock) {
          this.infoMCIEarlyCheckin = true;
        } else {
          this.bookingcode = this.tempParambook;
          this.date = this.tempParamcodate.replace(/%2F/g, "/");
          this.handleFindRsv("nicepay");
        }
      } else if (tempParam.resultCd == "0000") {
        const tmpParam = CookieS.get("data");
        this.bookingcode = tmpParam.book;
        this.date = tmpParam.codate;
        this.payment = tmpParam.payment;
        this.reservation.push(
          data["response"]["arrivalGuestlist"]["arrival-guestlist"]
        );
        router.replace({
          name: "Step",
          params: {
            foo: this.reservation,
            fighter: this.langID,
            endpoint: this.hotelEndpoint,
            hotelcode: this.hotelCode,
          },
        });
      }
    })();
    this.loading = false;
  },
  methods: {
    changeLang(value) {
      // Method for changing MCI Language
      if (value == "idn") {
        this.programLabel = "program-label2";
        this.langID = "IDN";
        this.mcilang = "idn";
        this.boPhoto = require(`../assets/kodeBooking.svg`);
        this.namePhoto = require(`../assets/Nama.svg`);
        this.emailPhoto = require(`../assets/AlamatEmail.svg`);
        this.memberPhoto = require(`../assets/keanggotaan.svg`);
      } else {
        this.programLabel = "program-label1";
        this.langID = "ENG";
        this.mcilang = "eng";
        this.boPhoto = require(`../assets/booking-code.svg`);
        this.namePhoto = require(`../assets/Name.svg`);
        this.emailPhoto = require(`../assets/EmailAddress.svg`);
        this.memberPhoto = require(`../assets/membership.svg`);
      }
    },
    async showModalBookingCode() {
      // Method for Set Booking Code Input Form to Focus When Activate Modal Booking Code
      this.modalBookingCode = true;
      await this.$nextTick();
      this.$refs.bookingcode.focus();
    },
    async showModalGuestName() {
      // Method for Set Guest Name Input Form to Focus When Activate Modal Guest Name
      this.modalGuestName = true;
      await this.$nextTick();
      this.$refs.name.focus();
    },
    async showModalEmailAddress() {
      // Method for Set Email Address Input Form to Focus When Activate Modal Email Address
      this.modalEmailAddress = true;
      await this.$nextTick();
      this.$refs.email.focus();
    },
    async showModalMembershipID() {
      // Method for Set Membership ID Input Form to Focus When Activate Modal Membership
      this.modalMembershipID = true;
      await this.$nextTick();
      this.$refs.member.focus();
    },
    /* Handling Error Message */
    errorbo() {
      this.$message.error(this.getLabels("input_bookcode", `sentenceCase`));
    },
    errorname() {
      this.$message.error(this.getLabels("input_guest_name", `sentenceCase`));
    },
    erroremail() {
      this.$message.error(this.getLabels("input_email", `sentenceCase`));
    },
    erroremailNotTrue() {
      switch (this.langID.toLowerCase()) {
        case "eng":
          this.$message.error("Please enter valid email address");
          break;
        case "idn":
          this.$message.error("Harap masukkan alamat email yang benar");
          break;
        default:
          this.$message.error("Please enter valid email address");
          break;
      }
    },
    errormember() {
      this.$message.error(this.getLabels("input_member", `sentenceCase`));
    },
    errorco() {
      this.$message.error(this.getLabels("input_codate", `sentenceCase`));
    },
    error() {
      this.$message.error(
        this.getLabels("input_bookcode") +
          ", " +
          this.getLabels("input_codate", `sentenceCase`)
      );
    },
    errorName() {
      this.$message.error(
        this.getLabels("guest_name") +
          ", " +
          this.getLabels("input_codate", `sentenceCase`)
      );
    },
    errorMail() {
      this.$message.error(
        this.getLabels("input_email") +
          ", " +
          this.getLabels("input_codate", `sentenceCase`)
      );
    },
    errorMember() {
      this.$message.error(
        this.getLabels("input_member") +
          ", " +
          this.getLabels("input_codate", `sentenceCase`)
      );
    },
    /* End Of Handling Error Message */
    hideMCIModal() {
      // Method for Hiding All MCI Modal
      this.infoMCIEarlyCheckin = false;
      this.infoMCINotFound = false;
      this.infoMCINotReady = false;
    },
    hideMCISearchModal() {
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    getCoDate() {
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      return coDate;
    },
    handleFindRsv(mode) {
      /* Turn On Loading */
      this.confirmLoading = true;

      /* Variable Assignment */
      const reservation = [];
      let coDate = undefined;
      let searchVar = undefined;
      switch (mode) {
        case "nicepay":
          searchVar = this.bookingcode;
          coDate = this.date;
          break;
        case "bookingcode":
          searchVar = this.bookingcode;
          coDate = this.getCoDate();
          break;
        case "guestname":
          searchVar = this.name;
          coDate = this.getCoDate();
          break;
        case "email":
          searchVar = this.email;
          coDate = this.getCoDate();
          break;
        case "membership":
          searchVar = this.member;
          coDate = this.getCoDate();
          break;
        default:
          searchVar = this.bookingcode;
          coDate = this.getCoDate();
          break;
      }

      if (!this.bookingcode && !this.date) {
        this.error();
      } else if (!this.bookingcode) {
        this.errorbo();
      } else if (!this.date) {
        this.errorco();
      } else {
        (async () => {
          const data = await ky
            .post(this.hotelEndpoint + "mobileCI/findReservation", {
              json: {
                request: {
                  coDate: coDate,
                  bookCode: searchVar,
                  chName: " ",
                  earlyCI: this.earliestCiFlag,
                  maxRoom: "1",
                  citime: this.checkin,
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data.response["messResult"];
          const messResult = this.message.split("-");

          switch (parseInt(messResult[0])) {
            case 0:
              // Reservation is Found
              const totalGuest =
                data.response.arrivalGuestlist["arrival-guestlist"].length;

              if (totalGuest > 1) {
                /* Handling Multiple Guest to ListCheckin.vue */
                reservation.push(
                  data["response"]["arrivalGuestlist"]["arrival-guestlist"]
                );
                router.replace({
                  name: "ListCheckIn",
                  params: {
                    guestData: reservation,
                    setting: this.setup,
                    location: this.location,
                  },
                });
              } else {
                /* Handling Single Guest to Step.vue */
                reservation.push(
                  data["response"]["arrivalGuestlist"]["arrival-guestlist"]
                );
                router.replace({
                  name: "Step",
                  params: {
                    foo: reservation,
                    fighter: this.langID,
                    endpoint: this.hotelEndpoint,
                    hotelcode: this.hotelCode,
                    location: this.location,
                  },
                });
              }
              break;
            case 1:
            case 2:
              // Reservation's Not Found
              this.infoMCINotReady = true;
              break;
            case 5:
            case 88:
              this.infoMCINotFound = true;
              break;
            case 9:
              this.infoMCIEarlyCheckin = true;
              break;
            default:
              console.log("Other", messResult[0], messResult[1]);
              // Reservation's Not Found
              break;
          }
          this.confirmLoading = false;
          this.hideMCISearchModal();
        })();
      }
    },
    handleCancel() {
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    handleYes() {
      // this.infoMCINotReady = false;
      // router.push({
      //   name: "Step",
      //   params: {
      //     foo: this.reservation,
      //     fighter: this.langID,
      //     endpoint: this.hotelEndpoint,
      //     hotelcode: this.hotelParams,
      //     notready: this.roomNotReady,
      //   },
      // });
      console.log("handleYes");
    },
    handleNo() {
      // this.infoMCINotReady = false;
      console.log("handleNo");
    },
  },
  computed: {
    getLabels() {
      let fixLabel = "";

      return (nameKey, used) => {
        const label = this.labels.find((el) => {
          return el["program-variable"] == nameKey;
        });
        if (label === undefined) {
          fixLabel = "";
        } else {
          if (used === "titleCase") {
            fixLabel = label[this.programLabel].replace(/\w\S*/g, function (
              txt
            ) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          } else if (used === "sentenceCase") {
            fixLabel =
              label[this.programLabel].charAt(0).toUpperCase() +
              label[this.programLabel].slice(1);
          } else if (used === "upperCase") {
            fixLabel = label[this.programLabel].toUpperCase();
          } else {
            fixLabel = label[this.programLabel];
          }
        }
        return fixLabel;
      };
    },
  },
};
</script>