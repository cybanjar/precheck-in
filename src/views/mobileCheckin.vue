<template>
  <div v-if="loading">
    <div style="display: flex; width: 100% !important; height: 100vh; overflow: hidden; text-align: center; align-items: center; justify-content: center;">
      <q-spinner-ball color="red" size="8em" style=""/>
    </div>    
  </div>
  <div v-else v-cloak>
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
        <h4
          class="text-uppercase font-weight-bold q-mt-md q-mb-md mci-size titlecolor"
        >
          Online Check-in
        </h4>
        <h5 class="titlecolor">
          <b>{{ weblabel.findRsv }}</b>
        </h5>
        <p>
          {{ weblabel.chooseOption }}
        </p>
      </div>
      <div :class="handleClassIcon()" style="margin-bottom: 10px;">
        <q-icon
          @click="showModalBookingCode"
          name="book_online"
          :style="iconOta"
        />

        <p class="mt-3">{{ weblabel.bookCode }}</p>
        <a-modal
          v-model="modalBookingCode"
          :title="weblabel.bookCode"
          :closable="false"
        >
          <template slot="footer">
            <a-button
              key="back"
              @click="handleCancel"
              :disabled="confirmLoading"
            >
              {{ weblabel.cancel }}
            </a-button>
            <a-button
              key="submit"
              type="primary"
              @click="handleFindRsv('bookingcode')"
              :disabled="confirmLoading"
            >
              {{ weblabel.search }}
            </a-button>
          </template>
          <a-spin :spinning="confirmLoading">
            <a-form-item :label="weblabel.bookCode">
              <a-input
                class="ant-input-h"
                v-model="bookingcode"
                ref="bookingcode"
                :placeholder="weblabel.inputBookcode"
              />
            </a-form-item>
            <a-form-item :label="weblabel.coDate">
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
      <div :class="handleClassIconCenter()" style="margin-bottom: 10px;">
        <q-icon @click="showModalGuestName" name="people" :style="iconOta" />
        <p class="mt-3">{{ weblabel.iconName }}</p>
        <a-modal
          v-model="modalGuestName"
          :title="weblabel.guestName"
          :closable="false"
          ><template slot="footer">
            <a-button
              key="back"
              @click="handleCancel"
              :disabled="confirmLoading"
            >
              {{ weblabel.cancel }}
            </a-button>
            <a-button
              key="submit"
              type="primary"
              @click="handleFindRsv('guestname')"
              :disabled="confirmLoading"
            >
              {{ weblabel.search }}
            </a-button>
          </template>
          <a-spin :spinning="confirmLoading">
            <a-form-item :label="weblabel.guestName">
              <a-input
                class="ant-input-h"
                v-model="name"
                ref="name"
                :placeholder="weblabel.inputGuestName"
              />
            </a-form-item>
            <a-form-item :label="weblabel.coDate">
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
      <div :class="handleClassIcon()" style="margin-bottom: 10px;">
        <q-icon @click="showModalEmailAddress" name="email" :style="iconOta" />
        <p class="mt-3">{{ weblabel.email }}</p>
        <a-modal
          v-model="modalEmailAddress"
          :title="weblabel.email"
          :closable="false"
          ><template slot="footer">
            <a-button
              key="back"
              @click="handleCancel"
              :disabled="confirmLoading"
            >
              {{ weblabel.cancel }}
            </a-button>
            <a-button
              key="submit"
              type="primary"
              @click="handleFindRsv('email')"
              :disabled="confirmLoading"
            >
              {{ weblabel.search }}
            </a-button>
          </template>
          <a-spin :spinning="confirmLoading">
            <a-form-item :label="weblabel.email">
              <a-input
                class="ant-input-h"
                v-model="email"
                ref="email"
                :placeholder="weblabel.inputEmail"
              />
            </a-form-item>
            <a-form-item :label="weblabel.coDate">
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
      <div :class="handleClassIcon()" v-if="licenseMembership" style="margin-bottom: 10px;">
        <q-icon
          @click="showModalMembershipID"
          name="folder_special"
          :style="licenseMembership == true ? iconOta : iconDisabled"
        />
        <p class="mt-3">{{ weblabel.membershipID }}</p>
        <a-modal
          v-model="modalMembershipID"
          :title="weblabel.membershipID"
          :closable="false"
          ><template slot="footer">
            <a-button
              key="back"
              @click="handleCancel"
              :disabled="confirmLoading"
            >
              {{ weblabel.cancel }}
            </a-button>
            <a-button
              key="submit"
              type="primary"
              @click="handleFindRsv('membership')"
              :disabled="confirmLoading"
            >
              {{ weblabel.search }}
            </a-button>
          </template>
          <a-spin :spinning="confirmLoading">
            <a-form-item :label="weblabel.membershipID">
              <a-input
                v-model="member"
                class="ant-input-h"
                ref="member"
                :placeholder="weblabel.inputMembership"
              />
            </a-form-item>
            <a-form-item :label="weblabel.coDate">
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
      :title="weblabel.information"
      :visible="infoMCIEarlyCheckin"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="reloadPage">{{
          weblabel.close
        }}</a-button>
      </template>
      <p>{{ weblabel.earlyCheckin }}{{ checkin }}</p>
    </a-modal>

    <!-- Modal MCI Reservation Not Found -->
    <a-modal
      :title="weblabel.information"
      :visible="infoMCINotFound"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideMCIModal">{{
          weblabel.okMessage
        }}</a-button>
      </template>
      <p>{{ weblabel.mciErrorNotFound }}</p>
    </a-modal>

    <!-- Modal MCI Self Check-In Service is not available yet. Please proceed to Front Desk. -->
    <a-modal
      :title="weblabel.information"
      :visible="infoMCINotAvail"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideMCIModal">{{
          weblabel.okMessage
        }}</a-button>
      </template>
      <p>{{ weblabel.mciErrorNotAvail }}</p>
    </a-modal>

    <!-- Modal MCI Sorry, your room is not ready yet. Please proceed to Front Desk. -->
    <a-modal
      :title="weblabel.information"
      :visible="infoMCIRoomNotAvail"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideMCIModal">{{
          weblabel.okMessage
        }}</a-button>
      </template>
      <p>{{ weblabel.mciRoomNotAvail }}</p>
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
      iconDisabled: {
        fontSize: "4em",
        color: "#606060",
        padding: "16px",
        backgroundColor: "rgba(96, 96, 96, 0.1)",
        borderRadius: "20px",
      },
      selectedLang: "",
      hotelLogo: "",
      defaultCountry: "",
      changeColor: {
        color: "color: rgba(255, 255, 255, 0.8) !important;",
      },
      weblabel: {
        findRsv: "",
        chooseOption: "",
        bookCode: "",
        cancel: "",
        search: "",
        inputBookcode: "",
        coDate: "",
        inputCoDate: "",
        iconName: "",
        guestName: "",
        inputGuestName: "",
        email: "",
        inputEmail: "",
        membershipID: "",
        inputMembership: "",
        information: "",
        close: "",
        earlyCheckin: "",
        okMessage: "",
        mciErrorNotFound: "",
        mciErrorNotAvail: "",
        mciRoomNotAvail: "",
      },
      licenseMembership: false,
      timer: 0,
    };
  },
  created() {
    //console.log('Created is Triggered');
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
      ////console.log(this.hotelEndpoint,this.hotelCode,this.langID);
      /* Check Used Language */
      switch (this.langID.toLowerCase()) {
        case "eng":
          this.programLabel = "program-label1";
          this.selectedLang = "English";
          localStorage.setItem("locale", "EN");
          break;
        case "idn":
          this.programLabel = "program-label2";
          this.selectedLang = "Indonesia";
          localStorage.setItem("locale", "ID");
          break;
        default:
          this.programLabel = "program-label1";
          this.selectedLang = "English";
          localStorage.setItem("locale", "ENG");
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
        return item.number1 === 8 && item.number2 == 14;
      });
      this.freeParking = tempfreeParking["0"]["setupflag"];
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
      const defCountry = this.tempsetup.filter((item, index) => {
        //  LICENSE WA/SMS GATEWAY
        return item.number1 === 9 && item.number2 === 1;
      });
      this.defaultCountry = defCountry[0]["setupvalue"];
      if (this.defaultCountry.toLowerCase() == "idn") {
        this.defaultCountry = "INA";
      }
      const tempLicenseMember = this.tempsetup.filter((item, index) => {
        //  LICENSE WA/SMS GATEWAY
        return item.number1 === 9 && item.number2 === 8;
      });
      this.licenseMembership = tempLicenseMember[0]["setupflag"];
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
      obj["defaultCountry"] = this.defaultCountry;
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
      /* Handling Locale */
      /* Set Variable Label */
      this.weblabel.findRsv = this.findLabel("find_rsv", "titleCase");
      this.weblabel.chooseOption = this.findLabel(
        "choose_option",
        "sentenceCase"
      );
      this.weblabel.bookCode = this.findLabel("book_code", "titleCase");
      this.weblabel.cancel = this.findLabel("cancel", "titleCase");
      this.weblabel.search = this.findLabel("search", "titleCase");
      this.weblabel.inputBookcode = this.findLabel(
        "input_bookcode",
        "sentenceCase"
      );
      this.weblabel.coDate = this.findLabel("co_date", "titleCase");
      this.weblabel.inputCoDate = this.findLabel(
        "input_codate",
        "sentenceCase"
      );
      this.weblabel.iconName = this.findLabel("icon_name", "titleCase");
      this.weblabel.guestName = this.findLabel("guest_name", "titleCase");
      this.weblabel.inputGuestName = this.findLabel(
        "input_guest_name",
        "sentenceCase"
      );
      this.weblabel.email = this.findLabel("email", "titleCase");
      this.weblabel.inputEmail = this.findLabel("input_email", "sentenceCase");
      this.weblabel.membershipID = this.findLabel("membership_id", "titleCase");
      this.weblabel.inputMembership = this.findLabel(
        "input_membership",
        "sentenceCase"
      );
      this.weblabel.information = this.findLabel("information", "titleCase");
      this.weblabel.close = this.findLabel("close", "titleCase");
      this.weblabel.earlyCheckin = this.findLabel(
        "early_checkin",
        "sentenceCase"
      );
      this.weblabel.okMessage = this.findLabel("ok_message", "titleCase");
      this.weblabel.mciErrorNotFound = this.findLabel(
        "mci_error_not_found",
        "sentenceCase"
      );
      this.weblabel.mciErrorNotAvail = this.findLabel(
        "mci_error_not_avail",
        "sentenceCase"
      );
      this.weblabel.mciRoomNotAvail = this.findLabel(
        "mci_room_not_avail",
        "sentenceCase"
      );
      this.FilterPurposeofStay.forEach(item => {
        item['setupvalue'] = this.findLabel(item['setupvalue'].toLowerCase(), "upperCase");
      });
    })();
  },
  methods: {
    handleClassIcon(){
      let returnedClass = "";
      if(this.licenseMembership == false){
        returnedClass = "col-sm-5 col-xs-12 text-center";
      } else {
        returnedClass = "col-sm-3 col-xs-6 text-center"
      }
      return returnedClass;
    },
    handleClassIconCenter(){
      let returnedClass = "";
      if(this.licenseMembership == false){
        returnedClass = "col-sm-2 col-xs-12 text-center";
      } else {
        returnedClass = "col-sm-3 col-xs-6 text-center"
      }
      return returnedClass;
    },
    resetLabel() {
      //console.log('resetLabel');
      this.weblabel.findRsv = this.findLabel("find_rsv", "titleCase");
      this.weblabel.chooseOption = this.findLabel(
        "choose_option",
        "sentenceCase"
      );
      this.weblabel.bookCode = this.findLabel("book_code", "titleCase");
      this.weblabel.cancel = this.findLabel("cancel", "titleCase");
      this.weblabel.search = this.findLabel("search", "titleCase");
      this.weblabel.inputBookcode = this.findLabel(
        "input_bookcode",
        "sentenceCase"
      );
      this.weblabel.coDate = this.findLabel("co_date", "titleCase");
      this.weblabel.inputCoDate = this.findLabel(
        "input_codate",
        "sentenceCase"
      );
      this.weblabel.iconName = this.findLabel("icon_name", "titleCase");
      this.weblabel.guestName = this.findLabel("guest_name", "titleCase");
      this.weblabel.inputGuestName = this.findLabel(
        "input_guest_name",
        "sentenceCase"
      );
      this.weblabel.email = this.findLabel("email", "titleCase");
      this.weblabel.inputEmail = this.findLabel("input_email", "sentenceCase");
      this.weblabel.membershipID = this.findLabel("membership_id", "titleCase");
      this.weblabel.inputMembership = this.findLabel(
        "input_membership",
        "sentenceCase"
      );
      this.weblabel.information = this.findLabel("information", "titleCase");
      this.weblabel.close = this.findLabel("close", "titleCase");
      this.weblabel.earlyCheckin = this.findLabel(
        "early_checkin",
        "sentenceCase"
      );
      this.weblabel.okMessage = this.findLabel("ok_message", "titleCase");
      this.weblabel.mciErrorNotFound = this.findLabel(
        "mci_error_not_found",
        "sentenceCase"
      );
      this.weblabel.mciErrorNotAvail = this.findLabel(
        "mci_error_not_avail",
        "sentenceCase"
      );
      this.weblabel.mciRoomNotAvail = this.findLabel(
        "mci_room_not_avail",
        "sentenceCase"
      );
      this.FilterPurposeofStay.forEach(item => {
        item['setupvalue'] = this.findLabel(item['setupvalue'].toLowerCase(), "titleCase");
      });
    },
    findLabel(nameKey, used) {
      let labels = undefined;
      if (localStorage.getItem("labels") == null) {
        labels = localStorage.getItem("labels");
      } else {
        labels = this.labels;
      }
      let fixLabel = "";
      const locale = localStorage.getItem("locale");
      const label = this.labels.find((el) => {
        return el["program-variable"] == nameKey;
      });
      if (label === undefined) {
        fixLabel = "";
      } else {
        switch (locale) {
          case "EN":
            fixLabel = label["program-label1"];
            break;
          case "ID":
            fixLabel = label["program-label2"];
            break;
          default:
            fixLabel = label["program-label1"];
            break;
        }
        switch (used) {
          case "titleCase":
            fixLabel = fixLabel.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1);
            });
            break;
          case "sentenceCase":
            fixLabel = fixLabel.charAt(0).toUpperCase() + fixLabel.slice(1);
            break;
          case "upperCase":
            fixLabel = fixLabel.toUpperCase();
            break;
          default:
            fixLabel = fixLabel;
            break;
        }
      }
      ////console.log(locale,label,fixLabel);
      return fixLabel;
    },
    changeLang(data) {
      //console.log('changeLang');
      // Method for changing MCI Language
      if (data.value == "Indonesia") {
        this.programLabel = "program-label2";
        this.langID = "IDN";
        this.setup[0]["langID"] = this.langID;
        this.selectedLang = "Indonesia";
        localStorage.setItem("locale", "ID");
        this.resetLabel();
      } else {
        this.programLabel = "program-label1";
        this.langID = "ENG";
        this.setup[0]["langID"] = this.langID;
        this.selectedLang = "English";
        localStorage.setItem("locale", "EN");
        this.resetLabel();
      }
    },
    async showModalBookingCode() {
      //console.log('showModalBookingCode');
      // Method for Set Booking Code Input Form to Focus When Activate Modal Booking Code
      this.resetForm();
      this.modalBookingCode = true;
      await this.$nextTick();
      this.$refs.bookingcode.focus();
    },
    async showModalGuestName() {
      //console.log('showModalGuestName');
      // Method for Set Guest Name Input Form to Focus When Activate Modal Guest Name
      this.resetForm();
      this.modalGuestName = true;
      await this.$nextTick();
      this.$refs.name.focus();
    },
    async showModalEmailAddress() {
      //console.log('showModalEmailAddress');
      // Method for Set Email Address Input Form to Focus When Activate Modal Email Address
      this.resetForm();
      this.modalEmailAddress = true;
      await this.$nextTick();
      this.$refs.email.focus();
    },
    async showModalMembershipID() {
      //console.log('showModalMembershipID');
      // Method for Set Membership ID Input Form to Focus When Activate Modal Membership
      if (this.licenseMembership) {
        this.resetForm();
        this.modalMembershipID = true;
        await this.$nextTick();
        this.$refs.member.focus();
      }
    },
    /* Handling Error Message */
    errorbo() {
      //console.log('errorbo');
      this.$message.error(this.weblabel.inputBookcode);
    },
    errorname() {
      //console.log('errorname');
      this.$message.error(this.weblabel.inputGuestName);
    },
    erroremail() {
      //console.log('erroremail');
      this.$message.error(this.weblabel.inputEmail);
    },
    errormembership() {
      //console.log('errormembership');
      this.$message.error(this.weblabel.inputMembership);
    },
    erroremailNotTrue() {
      //console.log('erroremailNotTrue');
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
      //console.log('errorco');
      this.$message.error(this.weblabel.inputCoDate);
    },
    /* End Of Handling Error Message */
    hideMCIModal() {
      //console.log('hideMCIModal');
      // Method for Hiding All MCI Modal
      this.infoMCIEarlyCheckin = false;
      this.infoMCINotFound = false;
      this.infoMCINotAvail = false;
      this.infoMCIRoomNotAvail = false;
    },
    hideMCISearchModal() {
      //console.log('hideMCISearchModal');
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    reloadPage() {
      //console.log('reloadPage');
      window.location = this.location;
    },
    getCoDate() {
      //console.log('getCoDate');
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      return coDate;
    },
    handleFindRsv(mode) {
      //console.log('handleFindRsv');
      ////console.log(mode);
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
          try{
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
                timeout: 10000,
                throwHttpErrors: false,
              })
              .json();
            //console.log(data);
            this.message = data.response["messResult"];
            const messResult = this.message.split("-");
            const messMessage = messResult[1].split(",");
            switch (messResult[0].trim()) {
              case "0":
                // Reservation is Found
                const totalGuest =
                  data.response.arrivalGuestlist["arrival-guestlist"].length;
                //console.log(totalGuest);
                if (totalGuest > 1) {
                  //console.log('totalGuest',totalGuest);
                  /* Handling Multiple Guest to ListCheckin.vue */
                  reservation.push(
                    data["response"]["arrivalGuestlist"]["arrival-guestlist"]
                  );
                  // Get Total Guest
                  const rsvFix = reservation[0].filter((item, index) => {
                    if (item["room-sharer"] === true) {
                    } else {
                      return item;
                    }
                  });
                  const tempTotal = rsvFix.filter((item, index) => {
                    if (
                      item["room-status"] ==
                      "1 Room Already assign or Overlapping"
                    ) {
                    } else {
                      return item;
                    }
                  });
                  const roomShare = reservation[0].filter((item, index) => {
                    return item["room-sharer"] === true;
                  });
                  rsvFix.forEach((item, index) => {
                    Object.assign(item, { rmshare: [] });
                    roomShare.forEach((guest, index) => {
                      if (item["zinr"] == guest["zinr"]) {
                        item["rmshare"].push(guest["gast"]);
                      }
                    });
                  });
                  Object.assign(this.setup[0], { TotalData: tempTotal.length });
                  //console.log('rsv',rsvFix,`tempTotal.Length ${tempTotal.length}`);
                  if (rsvFix.length > 1) {
                    router.push({
                      name: "ListCheckIn",
                      params: {
                        guestData: rsvFix,
                        setting: this.setup[0],
                      },
                    });
                  } else {
                    if (rsvFix[0]["res-status"] == "1 - Guest Already Checkin") {
                      // Langsung ke SuccessCheckin.vue
                      Object.assign(rsvFix[0], { roomReady: true });
                      router.push({
                        name: "SuccessCheckIn",
                        params: {
                          Data: rsvFix[0],
                          setting: this.setup[0],
                        },
                      });
                    } else if (rsvFix[0]["ifdata-sent"] == true) {
                      Object.assign(rsvFix[0], { roomReady: false });
                      router.push({
                        name: "SuccessCheckIn",
                        params: {
                          Data: rsvFix[0],
                          setting: this.setup[0],
                        },
                      });
                    } else {
                      this.handleSingleGuest(rsvFix[0]);
                    }
                  }
                } else {
                  Object.assign(this.setup[0], { TotalData: 1 });
                  const guest =
                    data.response.arrivalGuestlist["arrival-guestlist"][0];
                  Object.assign(guest, { vreg: "" });
                  Object.assign(guest, { step: "" });
                  // Handling Resstatus
                  if (guest["res-status"] == "1 - Guest Already Checkin") {
                    // Langsung ke SuccessCheckin.vue
                    Object.assign(guest, { roomReady: true });
                    router.push({
                      name: "SuccessCheckIn",
                      params: {
                        Data: guest,
                        setting: this.setup[0],
                      },
                    });
                  } else if (guest["ifdata-sent"] == true) {
                    Object.assign(guest, { roomReady: false });
                    router.push({
                      name: "SuccessCheckIn",
                      params: {
                        Data: guest,
                        setting: this.setup[0],
                      },
                    });
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
          }catch(error){
            this.confirmLoading = false;
            this.$message.error(error.toString());            
          }          
        })();
      }
    },
    resetForm() {
      //console.log('resetForm');
      this.bookingcode = "";
      this.name = "";
      this.email = "";
      this.member = "";
    },
    handleSingleGuest(guest) {
      //console.log('handleSingleGuest');
      // //console.log(guest);
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
      //console.log('handleCancel');
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    showAnimation() {
      if (localStorage.getItem("labels") == null) {
        this.timer = 6000;
      } else {
        this.timer = 4000;
      }
      setTimeout(() => {
        this.loading = false;
        //console.log("setTimeout is Triggered", this.timer);
      }, this.timer);
    },
  },
  async mounted() {
    await this.$nextTick();
    //console.log('mounted is triggered');
    this.showAnimation();
  },
  computed: {
    hexAToRGBA() {
      return (hex) => {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          c = hex.substring(1).split("");
          if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c = "0x" + c.join("");
          //console.log('thishexa');
          return (
            "rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            ",0.1)"
          );
        }
        throw new Error("Bad Hex");
      };
    },
  },
};
</script>
