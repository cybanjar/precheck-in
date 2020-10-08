<template>
  <div>
    <div class="ota text-center">
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="informationmodal"
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
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">{{
            getLabels("close", `titleCase`)
          }}</a-button>
        </template>
        <p>{{ getLabels("mci_error_not_ready", `sentenceCase`) }}</p>
      </a-modal>
      <a-row :gutter="[8, 32]" class="mb-3">
        <a-col class="text-center" :span="4" :xs="24">
          <h1 class="text-white">
            <b>{{ getLabels("find_rsv", `titleCase`) }}</b>
          </h1>
          <p class="text-white text-secondary">
            {{ getLabels("choose_option", `sentenceCase`) }}
          </p>
        </a-col>
      </a-row>
      {{boPhoto}}
      {{namePhoto}}
      {{emailPhoto}}
      {{memberPhoto}}
      <a-row :gutter="[8, 32]" class="mt-3" type="flex" justify="center">
        <a-col :span="4" :xl="4" :xs="12">
          <img
            @click="showModalBookingCode"
            class="img-ota"
            src="../assets/kodeBooking.svg"
          />
          <a-modal
            v-model="modalBookingCode"
            :title="getLabels('book_code', `titleCase`)"
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOkBO">
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('book_code', `titleCase`)">
              <a-input
                class="ant-input-h"
                v-model="bookingcode"
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
                      <q-date v-model="date" mask="DD/MM/YYYY" no-unset>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </a-form-item>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img @click="showModalGuestName" class="img-ota" :src="namePhoto" />
          <a-modal
            v-model="modalGuestName"
            :title="getLabels('guest_name', `titleCase`)"
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOkName">
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('guest_name', `titleCase`)">
              <a-input
                class="ant-input-h"
                v-model="name"
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
                      <q-date v-model="date" mask="DD/MM/YYYY" no-unset>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </a-form-item>
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
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOkEmail">
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('email', `titleCase`)">
              <a-input
                class="ant-input-h"
                v-model="email"
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
                      <q-date v-model="date" mask="DD/MM/YYYY" no-unset>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </a-form-item>
          </a-modal>
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
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel", `titleCase`) }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOk">
                {{ getLabels("search", `titleCase`) }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('membership_id', `titleCase`)">
              <a-input
                class="ant-input-h"
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
                      <q-date v-model="date" mask="DD/MM/YYYY" no-unset>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </a-form-item>
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
      hour: "",
      informationmodal: false,
      informationmodal1: false,
      informationmodal2: false,
      informationterm: "",
      message: "",
      labels: [],
      tempsetup: [],
      checkin: "",
      arrive: "",
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
    };
  },
  created() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    this.date = dd + "/" + mm + "/" + yyyy;

    (async () => {
      //const tempParam = location.search.substring(1);
      const tempParam = {};
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
      this.arrive = moment(new Date()).format("HH:mm");
      if (tempParam.book != undefined) {
        this.checkin = tempParam.citime.replace(/%3A/g, ":");
        if ("14:00" < this.checkin) {
          this.informationmodal = true;
        } else {
          this.bookingcode = tempParam.book;
          this.date = tempParam.codate.replace(/%2F/g, "/");
          this.handleOk();
        }
      } else if (tempParam.resultCd == "0000") {
        const tmpParam = CookieS.get("data");
        this.bookingcode = tmpParam.book;
        this.date = tmpParam.codate;
        this.payment = tmpParam.payment;
        this.handleOk();
      }
      this.langID = tempParam.lang;
      if (this.langID == "eng" || this.langID == "ENG") {
        this.boPhoto = "../assets/booking-code.svg";
        this.namePhoto = "../assets/Name.svg";
        this.emailPhoto = "../assets/EmailAddress.svg";
        this.memberPhoto = "../assets/membership.svg";
      } else {
        this.boPhoto = "../assets/kodeBooking.svg";
        this.namePhoto = "../assets/Nama.svg";
        this.emailPhoto = "../assets/AlamatEmail.svg";
        this.memberPhoto = "../assets/keanggotaan.svg";
      }
      // this.hotelCode = tempParam.hotelCode;
      const parsed = await ky
        .post(
          "http://54.251.169.160:8080/logserver/rest/loginServer/loadVariableLabel",
          {
            json: {
              request: {
                countryId1: tempParam.lang,
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

      const code = await ky
        .post("http://54.251.169.160:8080/logserver/rest/loginServer/getUrl", {
          json: {
            request: {
              hotelCode: "vhpweb",
            },
          },
        })
        .json();
      this.tempHotel = code.response.pciSetup["pci-setup"];
      const tempEndpoint = this.tempHotel.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 2;
      });
      this.hotelEndpoint = tempEndpoint[0]["setupvalue"];

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
      const tempServer = this.tempsetup.filter((item, index) => {
        return (
          item.number1 === 9 &&
          item.number2 === 3 &&
          item.descr == "SERVER TIME"
        );
      });

      this.server = moment(tempServer[0]["setupvalue"], "HH:mm")._i;
      const vServerClock = moment(
        tempServer[0]["setupvalue"],
        "HH:mm"
      ).valueOf();

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
    })();
  },
  methods: {
    onChange(date, dateString) {
      // console.log(date, dateString);
      this.date = dateString;
    },
    showModalBookingCode() {
      this.modalBookingCode = true;
    },
    showModalGuestName() {
      this.modalGuestName = true;
    },
    showModalEmailAddress() {
      this.modalEmailAddress = true;
    },
    showModalMembershipID() {
      this.modalMembershipID = true;
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
    goOTA() {
      this.informationmodal = false;
      this.informationmodal1 = false;
      this.informationmodal2 = false;
    },
    handleOk() {
      const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
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
            reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            router.push({
              name: "Step",
              params: { foo: reservation, fighter: this.langID , endpoint: this.hotelEndpoint},
            });
          }
        })();

        this.modalBookingCode = false;
      }
    },
    handleOkBO() {
      const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
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
            reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            router.push({
              name: "Step",
              params: { foo: reservation, fighter: this.langID , endpoint: this.hotelEndpoint},
            });
          }
        })();

        this.modalBookingCode = false;
      }
    },
    handleOkName() {
      const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      if (!this.name && !this.date) {
        this.errorName();
      } else if (!this.name) {
        this.errorname();
      } else if (!this.date) {
        this.errorco();
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
            reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            router.push({
              name: "Step",
              params: { foo: reservation, fighter: this.langID , endpoint: this.hotelEndpoint},
            });
          }
        })();

        this.modalGuestName = false;
      }
    },
    handleOkEmail() {
      const reservation = [];
      const dDate = moment(this.date, "DD/MM/YYYY").date();
      const dMonth = moment(this.date, "DD/MM/YYYY").month() + 1;
      const dYear = moment(this.date, "DD/MM/YYYY").year();
      const coDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      if (!this.email && !this.date) {
        this.errorMail();
      } else if (!this.email) {
        this.erroremail();
      } else if (!this.date) {
        this.errorco();
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
            reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            router.push({
              name: "Step",
              params: { foo: reservation, fighter: this.langID , endpoint: this.hotelEndpoint},
            });
          }
        })();

        this.modalEmailAddress = false;
      }
    },
    handleCancel() {
      this.modalBookingCode = false;
      this.modalGuestName = false;
      this.modalEmailAddress = false;
      this.modalMembershipID = false;
    },
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["program-variable"] == nameKey
      );

      let fixLabel = "";

      if (label["program-label1"] == "undefined") {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["program-label1"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["program-label1"].charAt(0).toUpperCase() +
            label["program-label1"].slice(1);
        } else {
          fixLabel = label["program-label1"];
        }
      }

      return fixLabel;
    },
    setTitleCase(label) {
      return label.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
  },
};
</script>
