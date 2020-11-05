<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div :style="ota" class="row justify-between pt-2">
      <div class="col-xs-4"></div>
      <div class="text-center col-xs-4">
        <img class="logo_hotel" :src="hotelLogo" />
      </div>
      <div class="col-xs-4" style="margin-right: -15px;">
        <q-select
          class="float-right"
          borderless
          behavior="menu"
          v-model="selectedLang"
          @input="changeLang"
          :options="[
            { label: 'English', value: 'English' },
            { label: 'Indonesia', value: 'Indonesia' },
          ]"
        >
          <template v-slot:selected-item="scope">
            <q-chip
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              :style="textOta"
              class="q-ma-none"
              style="margin-right: -20px;"
            >
              {{ scope.opt }}
            </q-chip>
          </template>
          <template v-slot:append>
            <q-icon name="language" :style="textOta" />
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
        <p :style="textOta" class="mci-hotel">{{ hotelName }}</p>
      </div>
    </div>
    <div class="row justify-around bg-white self-checkin">
      <div class="col-xs-12 text-center q-mb-md">
        <h4 class="text-uppercase font-weight-bold q-mt-md q-mb-md">
          Online Check-in
        </h4>
        <h5>
          <b>{{ getLabels("find_rsv", `titleCase`) }}</b>
        </h5>
        <p>
          {{ getLabels("choose_option", `sentenceCase`) }}
        </p>
      </div>
      <div class="col-sm-3 col-xs-6 text-center">
        <q-icon
          @click="showModalBookingCode"
          name="book_online"
          :style="iconOta"
        />

        <p>{{ getLabels("book_code", `titleCase`) }}</p>
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
                        :options="(date) => date >= minDate && date <= maxDate"
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
      </div>
      <div class="col-sm-3 col-xs-6 text-center">
        <q-icon @click="showModalGuestName" name="people" :style="iconOta" />
        <p>{{ getLabels("icon_name", `titleCase`) }}</p>
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
                        :options="(date) => date >= minDate && date <= maxDate"
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
      </div>
      <div class="col-sm-3 col-xs-6 text-center">
        <q-icon @click="showModalEmailAddress" name="email" :style="iconOta" />
        <p>{{ getLabels("email", `titleCase`) }}</p>
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
                        :options="(date) => date >= minDate && date <= maxDate"
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
      </div>
      <div class="col-sm-3 col-xs-6 text-center">
        <q-icon
          @click="showModalMembershipID"
          name="folder_special"
          :style="iconOta"
        />
        <p>{{ getLabels("membership_id", `titleCase`) }}</p>
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
                        :options="(date) => date >= minDate && date <= maxDate"
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
      </div>
    </div>

    <!-- Modal Early Checkin -->
    <a-modal
      :title="getLabels('information', `titleCase`)"
      :visible="infoMCIEarlyCheckin"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="reloadPage">{{
          getLabels("close", `titleCase`)
        }}</a-button>
      </template>
      <p>{{ getLabels("early_checkin", `sentenceCase`) }}{{ checkin }}</p>
    </a-modal>

    <!-- Modal MCI Reservation Not Found -->
    <a-modal
      :title="getLabels('information', `titleCase`)"
      :visible="infoMCINotFound"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideMCIModal">{{
          getLabels("ok_message", `titleCase`)
        }}</a-button>
      </template>
      <p>{{ getLabels("mci_error_not_found", `sentenceCase`) }}</p>
    </a-modal>

    <!-- Modal MCI Self Check-In Service is not available yet. Please proceed to Front Desk. -->
    <a-modal
      :title="getLabels('information', `titleCase`)"
      :visible="infoMCINotAvail"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideMCIModal">{{
          getLabels("ok_message", `titleCase`)
        }}</a-button>
      </template>
      <p>{{ getLabels("mci_error_not_avail", "sentenceCase") }}</p>
    </a-modal>

    <!-- Modal MCI Sorry, your room is not ready yet. Please proceed to Front Desk. -->
    <a-modal
      :title="getLabels('information', `titleCase`)"
      :visible="infoMCIRoomNotAvail"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideMCIModal">{{
          getLabels("ok_message", `titleCase`)
        }}</a-button>
      </template>
      <p>{{ getLabels("mci_room_not_avail", "sentenceCase") }}</p>
    </a-modal>
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
      infoMCINotAvail: false,
      infoMCIRoomNotAvail: false,
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
      ota: {
        backgroundColor: "",
        width: "100%",
        // height: "100vh",
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
      textOta: {
        color: "",
        backgroundColor: "transparent",
      },
      setup: [],
      SystemDate: "",
      LICENSE: "",
      baseOccupancy: 80,
      todayOcc: 0,
      MCILocked: [],
      resCiParam: {
        userInit: "",
        resrNumber: "",
        resLineNumber: "",
        preauth: "",
      },
      OverNight: "",
      maximumDeposit: "",
      defaultCI: "",
      cookiesParams: {
        guestEmail: "",
        guestPhnumber: "",
        guestNation: "",
        guestCountry: "",
        guestRegion: "",
        vreg: "",
        step: "",
      },
      iconOta: {
        fontSize: "4em",
        color: "#1890ff",
        padding: "16px",
        backgroundColor: "rgba(24, 144, 255, 0.1)",
        borderRadius: "20px",
      },
      selectedLang: "",
      hotelLogo: "",
    };
  },
  created() {
    this.$q.iconSet.arrow.dropdown = "none";
    /* Get Base URL */
    this.location = `${window.location.protocol}//${window.location.host}`;
    /* tempParam Variable for Nicepay */
    const tempParam = {};
    const resCiParam = {};
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
      location.search
        .split("&")
        .toString()
        .substr(1)
        .split(",")
        .forEach((item, index) => {
          let objProperty = "";
          let objValue = "";
          if (index == 0) {
            // Handling Original URI
            objValue = decodeURIComponent(item);
            objValue = objValue.replace(" ", "+");
            Object.assign(tempParam, { hotelParams: objValue });
          } else {
            // Handling URI From Nicepay Callback
            objProperty = decodeURIComponent(item.split("=")[0]);
            objValue = decodeURIComponent(item.split("=")[1]);
            Object.assign(tempParam, { [objProperty]: objValue });
          }
        });
      this.hotelParams = tempParam.hotelParams;
      const encodedURI = encodeURIComponent(this.hotelParams);
      this.location += `/mobilecheckin?${encodedURI}`;
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
        .post("http://54.251.169.160:8080/logserver/rest/loginServer/getUrl", {
          json: {
            request: {
              hotelCode: this.hotelParams,
            },
          },
        })
        .json();
      /* IF Null Response */
      if (code.response["messResult"] == null) {
        router.replace({
          name: "404",
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
      //console.log(this.hotelEndpoint,this.hotelCode,this.langID);
      /* Check Used Language */
      switch (this.langID.toLowerCase()) {
        case "eng":
          this.programLabel = "program-label1";
          this.selectedLang = "English";
          break;
        case "idn":
          this.programLabel = "program-label2";
          this.selectedLang = "Indonesia";
          break;
        default:
          this.programLabel = "program-label1";
          this.selectedLang = "English";
          break;
      }
      /* Async Get Label From Database */
      const parsed = await ky
        .post(
          "http://54.251.169.160:8080/logserver/rest/loginServer/loadVariableLabel",
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
      this.SkipDeposit = tempSkipDeposit["0"]["setupvalue"];
      const tempMinDeposit = this.tempsetup.filter((item, index) => {
        //  Minimum Deposit
        return item.number1 === 8 && item.number2 == 5;
      });
      this.minimumDeposit = tempMinDeposit["0"]["price"];
      const tempMaxDeposit = this.tempsetup.filter((item, index) => {
        //  Maximum Deposit
        return item.number1 === 8 && item.number2 == 7;
      });
      this.maximumDeposit = tempMaxDeposit["0"]["price"];
      const tempOverNightDeposit = this.tempsetup.filter((item, index) => {
        //  DEPOSIT OVER ONE NIGHT
        return item.number1 === 8 && item.number2 == 6;
      });
      this.OverNightDeposit = tempOverNightDeposit["0"]["price"];
      const tempfreeParking = this.tempsetup.filter((item, index) => {
        //  Free Parking
        return item.number1 === 8 && item.number2 == 5;
      });
      this.freeParking = this.tempsetup["0"]["setupflag"];
      const tempDEFAULTCHECKINTIME = this.tempsetup.filter((item, index) => {
        //  DEFAULT CHECKIN TIME
        return item.number1 === 8 && item.number2 == 2;
      });
      this.defaultCI = tempDEFAULTCHECKINTIME["0"]["setupvalue"];
      const tempBG = this.tempsetup.filter((item, index) => {
        //  Background Color
        return item.number1 === 4 && item.setupflag === true;
      });
      this.ota.backgroundColor = tempBG[0]["setupvalue"];
      this.iconOta.backgroundColor = this.hexAToRGBA(tempBG[0]["setupvalue"]);
      this.iconOta.color = tempBG[0]["setupvalue"];
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
      const tempLogo = this.tempsetup.filter((item, index) => {
        //  Logo Hotel
        return item.number1 === 7 && item.number2 === 6;
      });
      this.hotelLogo = tempLogo[0]["setupvalue"];
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
      const tempTodayOcc = this.tempsetup.filter((item, index) => {
        //  LICENSE WA/SMS GATEWAY
        return item.number1 === 9 && item.number2 === 6;
      });
      this.todayOcc = tempTodayOcc[0]["price"];
      const tempServer = this.tempsetup.filter((item, index) => {
        //  Server Time
        return (
          item.number1 === 9 &&
          item.number2 === 7 &&
          item.descr == "SERVER TIME"
        );
      });
      this.server = moment(tempServer[0]["setupvalue"], "HH:mm")._i;
      this.server = "15:00";
      const msServerClock = moment(this.server, "HH:mm").valueOf();
      const obj = {};
      obj["FilterPurposeofStay"] = this.FilterPurposeofStay;
      obj["PurposeofStay"] = this.purpose;
      obj["countries"] = this.countries;
      obj["province"] = this.province;
      obj["termENG"] = this.termENG;
      obj["termIDN"] = this.termIDN;
      obj["minimumDeposit"] = this.minimumDeposit;
      obj["maximumDeposit"] = this.maximumDeposit;
      obj["OverNightDeposit"] = this.OverNightDeposit;
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
      obj["location"] = this.location;
      obj["defaultCI"] = this.defaultCI;
      obj["hotelLogo"] = this.hotelLogo;
      this.setup.push(obj);
      //End Request Set Up
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
      this.earliestCiTime = earliestCI[0]["setupvalue"];
      this.earliestCiFlag = earliestCI[0]["setupflag"];
      // Convert Earliest Check-in Time to Milisecond
      const msEarliestCiTime = moment(this.earliestCiTime, "HH:mm").valueOf();
      /** Compare Check-in Time with Server Time
       *  If Erliest CI Flag is Active : Server Time < Earliest CI Time Then Show Pop Up Cannot MCI
       *  If Server Time < Check-in Time Then Show Pop Up Cannot MCI
       */
      if (this.earliestCiFlag) {
        this.checkin = this.earliestCiTime;
        if (msServerClock < msEarliestCiTime) {
          this.infoMCIEarlyCheckin = true;
        } else {
          /* Occupancy Checking */
          if (this.todayOcc > this.baseOccupancy) {
            this.infoMCINotAvail = true; // mci_not_avail
          } else {
            /* Checking License */
            if (!this.LICENSE) {
              this.infoMCINotAvail = true; // mci_not_avail
            }
          }
        }
      } else {
        if (msServerClock < msCheckinClock) {
          this.infoMCIEarlyCheckin = true;
        }
      }
      if (this.tempParambook != "") {
        /* PCI Get Data */
        this.checkin = this.tempParamcitime.replace(/%3A/g, ":");
        msCheckinClock = moment(this.checkin, "HH:mm").valueOf();
        if (this.earliestCiFlag) {
          this.checkin = this.earliestCiTime;
          if (msServerClock < msEarliestCiTime) {
            this.infoMCIEarlyCheckin = true;
          } else {
            /* Occupancy Checking */
            if (this.todayOcc > this.baseOccupancy) {
              this.infoMCINotAvail = true; // mci_not_avail
            } else {
              /* Checking License */
              if (!this.LICENSE) {
                this.infoMCINotAvail = true; // mci_not_avail
              } else {
                this.bookingcode = this.tempParambook;
                this.date = this.tempParamcodate.replace(/%2F/g, "/");
                this.handleFindRsv("pci");
              }
            }
          }
        } else {
          if (msServerClock < msCheckinClock) {
            this.infoMCIEarlyCheckin = true;
          } else {
            this.bookingcode = this.tempParambook;
            this.date = this.tempParamcodate.replace(/%2F/g, "/");
            this.handleFindRsv("pci");
          }
        }
      }
    })();
    this.loading = false;
  },
  methods: {
    hexAToRGBA(hex) {
      let c;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return (
          "rgba(" +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
          ",0.1)"
        );
      }
      throw new Error("Bad Hex");
    },
    changeLang(data) {
      // Method for changing MCI Language
      if (data.value == "Indonesia") {
        this.programLabel = "program-label2";
        this.langID = "IDN";
        this.setup[0]["langID"] = this.langID;
        this.selectedLang = "Indonesia";
      } else {
        this.programLabel = "program-label1";
        this.langID = "ENG";
        this.setup[0]["langID"] = this.langID;
        this.selectedLang = "English";
      }
    },
    async showModalBookingCode() {
      // Method for Set Booking Code Input Form to Focus When Activate Modal Booking Code
      this.resetForm();
      this.modalBookingCode = true;
      await this.$nextTick();
      this.$refs.bookingcode.focus();
    },
    async showModalGuestName() {
      // Method for Set Guest Name Input Form to Focus When Activate Modal Guest Name
      this.resetForm();
      this.modalGuestName = true;
      await this.$nextTick();
      this.$refs.name.focus();
    },
    async showModalEmailAddress() {
      // Method for Set Email Address Input Form to Focus When Activate Modal Email Address
      this.resetForm();
      this.modalEmailAddress = true;
      await this.$nextTick();
      this.$refs.email.focus();
    },
    async showModalMembershipID() {
      // Method for Set Membership ID Input Form to Focus When Activate Modal Membership
      this.resetForm();
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
    errormembership() {
      this.$message.error(this.getLabels("input_membership", `sentenceCase`));
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
    errorco() {
      this.$message.error(this.getLabels("input_codate", `sentenceCase`));
    },
    /* End Of Handling Error Message */
    hideMCIModal() {
      // Method for Hiding All MCI Modal
      this.infoMCIEarlyCheckin = false;
      this.infoMCINotFound = false;
      this.infoMCINotAvail = false;
      this.infoMCIRoomNotAvail = false;
    },
    hideMCISearchModal() {
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    reloadPage() {
      window.location = this.location;
    },
    getCoDate() {
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      return coDate;
    },
    handleFindRsv(mode) {
      //console.log(mode);
      /* Turn On Loading */
      this.confirmLoading = true;
      /* Variable Assignment */
      const reservation = [];
      let coDate = undefined;
      let searchVar = undefined;
      switch (mode) {
        case "pci":
          searchVar = this.bookingcode;
          coDate = this.date;
          break;
        case "nicepay":
          searchVar = this.bookingcode;
          coDate = this.getCoDate();
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
      if (!this.bookingcode && mode == "bookingcode") {
        this.errorbo();
        this.confirmLoading = false;
      } else if ((!this.name || this.name.length <= 0) && mode == "guestname") {
        this.errorname();
        this.confirmLoading = false;
      } else if ((!this.email || this.email.length <= 0) && mode == "email") {
        this.erroremail();
        this.confirmLoading = false;
      } else if (!this.reg.test(this.email) && mode == "email") {
        this.erroremailNotTrue();
        this.confirmLoading = false;
      } else if (
        (!this.member || this.member.length <= 0) &&
        mode == "membership"
      ) {
        this.errormembership();
        this.confirmLoading = false;
      } else if (!this.date) {
        this.errorco();
        this.confirmLoading = false;
      } else {
        (async () => {
          const data = await ky
            .post(this.hotelEndpoint + "mobileCI/findReservation", {
              json: {
                request: {
                  coDate: coDate,
                  bookCode: searchVar,
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: this.server,
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data.response["messResult"];
          const messResult = this.message.split("-");
          const messMessage = messResult[1].split(",");
          switch (messResult[0].trim()) {
            case "0":
              // Reservation is Found

              const totalGuest =
                data.response.arrivalGuestlist["arrival-guestlist"].length;
              if (totalGuest > 1) {
                /* Handling Multiple Guest to ListCheckin.vue */
                reservation.push(
                  data["response"]["arrivalGuestlist"]["arrival-guestlist"]
                );
                // Get Total Guest
                const tempTotal = reservation[0].filter((item, index) => {
                  return (
                    item["room-status"] !==
                    "1 Room Already assign or Overlapping"
                  );
                });
                Object.assign(this.setup[0], { TotalData: tempTotal.length });

                router.push({
                  name: "ListCheckIn",
                  params: {
                    guestData: reservation[0],
                    setting: this.setup[0],
                  },
                });
              } else {
                Object.assign(this.setup[0], { TotalData: 1 });
                const guest =
                  data.response.arrivalGuestlist["arrival-guestlist"][0];
                Object.assign(guest, { vreg: "" });
                Object.assign(guest, { step: "" });
                // Handling Resstatus
                if (guest["res-status"] == "1 - Guest Already Checkin") {
                  // Langsung ke SuccessCheckin.vue
                } else {
                  this.handleSingleGuest(guest);
                }
              }
              break;
            case "01":
              this.infoMCIRoomNotAvail = true;
              break;
            case "1":
              this.infoMCINotFound = true; // Reservation's Not Found
              break;
            case "2":
              this.infoMCINotFound = true;
              break;
            case "02":
              this.infoMCIRoomNotAvail = true;
              break;
            case "9":
              this.infoMCIEarlyCheckin = true; // Early Checkin
              break;
            default:
              this.infoMCINotAvail = true; //mci_error_not_avail
              break;
          }
          this.confirmLoading = false;
          this.hideMCISearchModal();
          /* Reset Form */
          this.resetForm();
        })();
      }
    },
    resetForm() {
      this.bookingcode = "";
      this.name = "";
      this.email = "";
      this.member = "";
    },
    handleSingleGuest(guest) {
      // console.log(guest);
      const rmStatus = guest["room-status"].split(" ");
      if (parseInt(rmStatus[0]) == 1) {
        // Overlapping
        this.infoMCIRoomNotAvail = true; //mci_room_not_avail
      } else if (parseInt(rmStatus[0]) > 1) {
        // Cannot Assign Room Or Room Is Not Ready (VC / Expected Departure)
        if (this.LICENSE) {
          // IF Hotel Have SMS/Email License
          router.push({
            name: "Step",
            params: {
              guestData: guest,
              setting: this.setup[0],
            },
          });
        } else {
          // IF NOT
          this.infoMCIRoomNotAvail = true; //mci_room_not_avail
        }
      } else {
        // Ready to MCI Go to Step
        router.push({
          name: "Step",
          params: {
            guestData: guest,
            setting: this.setup[0],
          },
        });
      }
    },
    handleCancel() {
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
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
              return txt.charAt(0).toUpperCase() + txt.substr(1);
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
