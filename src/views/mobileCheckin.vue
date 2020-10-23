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
        :visible="informationmodal"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">{{
            getLabels("close", `titleCase`)
          }}</a-button>
        </template>
        <p>{{ getLabels("early_checkin", `sentenceCase`) }}{{ checkin }}</p>
      </a-modal>
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="informationmodal1"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">{{
            getLabels("close", `titleCase`)
          }}</a-button>
        </template>
        <p>{{ getLabels("mci_error_not_found", `sentenceCase`) }}</p>
      </a-modal>
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="informationmodal2"
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
                @click="handleOkBO"
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
                @click="handleOkName"
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
                @click="handleOkEmail"
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
                @click="handleOkMember"
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
      informationmodal: false,
      informationmodal1: false,
      informationmodal2: false,
      informationterm: "",
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
      FG: "",
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
    };
  },
  created() {
    const tempParam = {};
    if (this.$route.params.hotelParameter != undefined) {
      this.hotelParams = this.$route.params.hotelParameter;
      this.tempParambook = this.$route.params.bookingcode;
      this.tempParamcodate = this.$route.params.coDate;
      this.tempParamcitime = this.$route.params.citime;
    } else if (location.search.substring(1) != undefined) {
      this.hotelParams = location.search.substring(1).replace(/%3D/g, "=");
    } else {
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
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    this.date = dd + "/" + mm + "/" + yyyy;
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

      const parsed = await ky
        .post(
          "http://login.e1-vhp.com:8080/logserver/rest/loginServer/loadVariableLabel",
          {
            json: {
              request: {
                countryId1: this.langID,
                countryId2: "",
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
      const tempBG = this.tempsetup.filter((item, index) => {
        return item.number1 === 4 && item.setupflag === true;
      });
      this.ota.backgroundColor = tempBG[0]["setupvalue"];
      const tempFG = this.tempsetup.filter((item, index) => {
        return item.number1 === 5 && item.setupflag === true;
      });
      this.textOta.color = tempFG[0]["setupvalue"];
      this.FG = tempFG[0]["setupvalue"];

      const tempImage = this.tempsetup.filter((item, index) => {
        return item.number1 === 7 && item.number2 === 3;
      });
      this.hotelImage = tempImage[0]["setupvalue"];

      const tempHotelName = this.tempsetup.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 1;
      });
      this.hotelName = tempHotelName[0]["setupvalue"];

      const tempServer = this.tempsetup.filter((item, index) => {
        return (
          item.number1 === 9 &&
          item.number2 === 7 &&
          item.descr == "SERVER TIME"
        );
      });
      this.server = moment(tempServer[0]["setupvalue"], "HH:mm")._i;
      const vServerClock = moment(
        tempServer[0]["setupvalue"],
        "HH:mm"
      ).valueOf();
      const systemDateObj = this.tempsetup.filter((item, index) => {
        return item.number1 === 9 && item.number2 === 4;
      });

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

      for (const i in this.tempsetup) {
        if (
          this.tempsetup[i]["number1"] == 8 &&
          this.tempsetup[i]["number2"] == 2
        ) {
          this.checkin = this.tempsetup[i]["setupvalue"];
        }
      }
      const vCheckinClock = moment(this.checkin, "HH:mm").valueOf();
      if (vServerClock < vCheckinClock) {
        this.informationmodal = true;
      }
      if (this.tempParambook != "") {
        this.checkin = this.tempParamcitime.replace(/%3A/g, ":");
        if ("14:00" < this.checkin) {
          this.informationmodal = true;
        } else {
          this.bookingcode = this.tempParambook;
          this.date = this.tempParamcodate.replace(/%2F/g, "/");
          this.handleOk();
        }
      } else if (tempParam.resultCd == "0000") {
        const tmpParam = CookieS.get("data");
        this.bookingcode = tmpParam.book;
        this.date = tmpParam.codate;
        this.payment = tmpParam.payment;

        this.reservation.push(
          data["response"]["arrivalGuestlist"]["arrival-guestlist"]
        );
        router.push({
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
    onChange(date, dateString) {
      this.date = dateString;
    },
    async showModalBookingCode() {
      this.modalBookingCode = true;
      await this.$nextTick();
      this.$refs.bookingcode.focus();
    },
    async showModalGuestName() {
      this.modalGuestName = true;
      await this.$nextTick();
      this.$refs.name.focus();
    },
    async showModalEmailAddress() {
      this.modalEmailAddress = true;
      await this.$nextTick();
      this.$refs.email.focus();
    },
    async showModalMembershipID() {
      this.modalMembershipID = true;
      await this.$nextTick();
      this.$refs.member.focus();
    },
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
      this.$message.error("hint example@gmail.com");
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
    goOTA() {
      this.informationmodal = false;
      this.informationmodal1 = false;
      this.informationmodal2 = false;
    },
    handleOk() {
      // const reservation = [];
      const coDate = this.date;
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
                  bookCode: this.bookingcode,
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: "14:00",
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data["response"]["messResult"];
          if (this.message.substring(0, 2) == "9 ") {
            this.informationmodal = true;
          } else if (
            this.message.substring(0, 2) == "01" ||
            this.message.substring(0, 2) == "02"
          ) {
            this.informationmodal2 = true;
          } else if (
            this.message.substring(0, 2) == "88" ||
            this.message.substring(0, 2) == "5 " ||
            this.message.substring(0, 2) == "2 "
          ) {
            this.informationmodal1 = true;
          } else {
            this.reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            if (this.reservation.length == 1) {
              if (
                this.reservation[0][0]["room-status"] == "0 Ready To Checkin"
              ) {
                this.informationmodal2 = false;
                this.roomNotReady = false;
                router.push({
                  name: "Step",
                  params: {
                    foo: this.reservation,
                    fighter: this.langID,
                    endpoint: this.hotelEndpoint,
                    hotelcode: this.hotelParams,
                  },
                });
              } else {
                this.informationmodal2 = true;
                this.roomNotReady = true;
              }
            } else {
              router.push({
                name: "Step",
                params: {
                  foo: this.reservation,
                  fighter: this.langID,
                  endpoint: this.hotelEndpoint,
                  hotelcode: this.hotelParams,
                },
              });
            }
          }
        })();
      }
    },
    handleOkBO() {
      this.confirmLoading = true;
      // const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      if (!this.bookingcode && !this.date) {
        this.error();
        this.confirmLoading = false;
      } else if (!this.bookingcode) {
        this.errorbo();
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
                  bookCode: this.bookingcode,
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: "14:00",
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data["response"]["messResult"];
          if (this.message.substring(0, 2) == "9 ") {
            this.informationmodal = true;
          } else if (
            this.message.substring(0, 2) == "01" ||
            this.message.substring(0, 2) == "02"
          ) {
            this.informationmodal2 = true;
          } else if (
            this.message.substring(0, 2) == "88" ||
            this.message.substring(0, 2) == "5 " ||
            this.message.substring(0, 2) == "2 "
          ) {
            this.informationmodal1 = true;
          } else {
            this.reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            if (this.reservation.length == 1) {
              if (
                this.reservation[0][0]["room-status"] == "0 Ready To Checkin"
              ) {
                this.informationmodal2 = false;
                this.roomNotReady = false;
                router.push({
                  name: "Step",
                  params: {
                    foo: this.reservation,
                    fighter: this.langID,
                    endpoint: this.hotelEndpoint,
                    hotelcode: this.hotelParams,
                  },
                });
              } else {
                this.informationmodal2 = true;
                this.roomNotReady = true;
              }
            } else {
              router.push({
                name: "Step",
                params: {
                  foo: this.reservation,
                  fighter: this.langID,
                  endpoint: this.hotelEndpoint,
                  hotelcode: this.hotelParams,
                },
              });
            }
          }
        })();
        this.modalBookingCode = false;
        this.confirmLoading = false;
      }
    },
    handleOkName() {
      this.confirmLoading = true;
      // const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      if (!this.name && !this.date) {
        this.errorName();
        this.confirmLoading = false;
      } else if (!this.name) {
        this.errorname();
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
                  bookCode: this.name,
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: "14:00",
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data["response"]["messResult"];
          if (this.message.substring(0, 2) == "9 ") {
            this.informationmodal = true;
          } else if (
            this.message.substring(0, 2) == "01" ||
            this.message.substring(0, 2) == "02"
          ) {
            this.informationmodal2 = true;
          } else if (
            this.message.substring(0, 2) == "88" ||
            this.message.substring(0, 2) == "5 " ||
            this.message.substring(0, 2) == "2 "
          ) {
            this.informationmodal1 = true;
          } else {
            this.reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            if (this.reservation.length == 1) {
              if (
                this.reservation[0][0]["room-status"] == "0 Ready To Checkin"
              ) {
                this.informationmodal2 = false;
                this.roomNotReady = false;
                router.push({
                  name: "Step",
                  params: {
                    foo: this.reservation,
                    fighter: this.langID,
                    endpoint: this.hotelEndpoint,
                    hotelcode: this.hotelParams,
                  },
                });
              } else {
                this.informationmodal2 = true;
                this.roomNotReady = true;
              }
            } else {
              router.push({
                name: "Step",
                params: {
                  foo: this.reservation,
                  fighter: this.langID,
                  endpoint: this.hotelEndpoint,
                  hotelcode: this.hotelParams,
                },
              });
            }
          }
        })();
        this.modalGuestName = false;
        this.confirmLoading = false;
      }
    },
    handleOkEmail() {
      this.confirmLoading = true;
      // const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      if (!this.email && !this.date) {
        this.errorMail();
        this.confirmLoading = false;
      } else if (!this.email) {
        this.erroremail();
        this.confirmLoading = false;
      } else if (!this.reg.test(this.email)) {
        this.erroremailNotTrue();
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
                  bookCode: this.email,
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: "14:00",
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data["response"]["messResult"];
          if (this.message.substring(0, 2) == "9 ") {
            this.informationmodal = true;
          } else if (
            this.message.substring(0, 2) == "01" ||
            this.message.substring(0, 2) == "02"
          ) {
            this.informationmodal2 = true;
          } else if (
            this.message.substring(0, 2) == "88" ||
            this.message.substring(0, 2) == "5 " ||
            this.message.substring(0, 2) == "2 "
          ) {
            this.informationmodal1 = true;
          } else {
            this.reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            if (this.reservation.length == 1) {
              if (
                this.reservation[0][0]["room-status"] == "0 Ready To Checkin"
              ) {
                this.informationmodal2 = false;
                this.roomNotReady = false;
                router.push({
                  name: "Step",
                  params: {
                    foo: this.reservation,
                    fighter: this.langID,
                    endpoint: this.hotelEndpoint,
                    hotelcode: this.hotelParams,
                  },
                });
              } else {
                this.informationmodal2 = true;
                this.roomNotReady = true;
              }
            } else {
              router.push({
                name: "Step",
                params: {
                  foo: this.reservation,
                  fighter: this.langID,
                  endpoint: this.hotelEndpoint,
                  hotelcode: this.hotelParams,
                },
              });
            }
          }
        })();
        this.modalEmailAddress = false;
        this.confirmLoading = false;
      }
    },
    handleOkMember() {
      this.confirmLoading = true;
      // const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      if (!this.member && !this.date) {
        this.errorMember();
        this.confirmLoading = false;
      } else if (!this.member) {
        this.errormember();
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
                  bookCode: this.member,
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: "14:00",
                  groupFlag: "false",
                },
              },
            })
            .json();
          this.message = data["response"]["messResult"];
          if (this.message.substring(0, 2) == "9 ") {
            this.informationmodal = true;
          } else if (
            this.message.substring(0, 2) == "01" ||
            this.message.substring(0, 2) == "02"
          ) {
            this.informationmodal2 = true;
          } else if (
            this.message.substring(0, 2) == "88" ||
            this.message.substring(0, 2) == "5 " ||
            this.message.substring(0, 2) == "2 "
          ) {
            this.informationmodal1 = true;
          } else {
            this.reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            if (this.reservation.length == 1) {
              if (
                this.reservation[0][0]["room-status"] == "0 Ready To Checkin"
              ) {
                this.informationmodal2 = false;
                this.roomNotReady = false;
                router.push({
                  name: "Step",
                  params: {
                    foo: this.reservation,
                    fighter: this.langID,
                    endpoint: this.hotelEndpoint,
                    hotelcode: this.hotelParams,
                  },
                });
              } else {
                this.informationmodal2 = true;
                this.roomNotReady = true;
              }
            } else {
              router.push({
                name: "Step",
                params: {
                  foo: this.reservation,
                  fighter: this.langID,
                  endpoint: this.hotelEndpoint,
                  hotelcode: this.hotelParams,
                },
              });
            }
          }
        })();
        this.modalMembershipID = false;
        this.confirmLoading = false;
      }
    },
    handleCancel() {
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    handleYes() {
      this.informationmodal2 = false;
      router.push({
        name: "Step",
        params: {
          foo: this.reservation,
          fighter: this.langID,
          endpoint: this.hotelEndpoint,
          hotelcode: this.hotelParams,
          notready: this.roomNotReady,
        },
      });
    },
    handleNo() {
      this.informationmodal2 = false;
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
            fixLabel = label["program-label1"].replace(/\w\S*/g, function (
              txt
            ) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          } else if (used === "sentenceCase") {
            fixLabel =
              label["program-label1"].charAt(0).toUpperCase() +
              label["program-label1"].slice(1);
          } else if (used === "upperCase") {
            fixLabel = label["program-label1"].toUpperCase();
          } else {
            fixLabel = label["program-label1"];
          }
        }
        return fixLabel;
      };
    },
  },
};
</script>