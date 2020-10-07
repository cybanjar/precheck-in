<template>
  <div>
    <div class="ota text-center">
      <a-modal :title="getLabels('information')" :visible="informationmodal">
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">{{
            getLabels("close")
          }}</a-button>
        </template>
        <p>{{ getLabels("early_checkin") }}{{ checkin }}</p>
      </a-modal>
      <a-modal :title="getLabels('information')" :visible="informationmodal1">
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">{{
            getLabels("close")
          }}</a-button>
        </template>
        <p>{{ getLabels("mci_error_not_found") }}</p>
      </a-modal>
      <a-modal :title="getLabels('information')" :visible="informationmodal2">
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">{{
            getLabels("close")
          }}</a-button>
        </template>
        <p>{{ getLabels("mci_error_not_ready") }}</p>
      </a-modal>
      <a-row :gutter="[8, 32]" class="mb-3">
        <a-col class="text-center" :span="4" :xs="24">
          <h1 class="text-white">{{ getLabels("find_rsv") }}</h1>
          <p class="text-white text-secondary">
            {{ getLabels("choose_option") }}
          </p>
        </a-col>
      </a-row>
      <a-row :gutter="[8, 32]" class="mt-3" type="flex" justify="center">
        <a-col :span="4" :xl="4" :xs="12">
          <img
            @click="showModalBookingCode"
            class="img-ota"
            src="../assets/booking-code.svg"
          />
          <a-modal v-model="modalBookingCode" :title="getLabels('book_code')"
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel") }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOkBO">
                {{ getLabels("search") }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('book_code')">
              <a-input
                class="ant-input-h"
                v-model="bookingcode"
                :placeholder="getLabels('input_bookcode')"
              />
            </a-form-item>
            <a-form-item :label="getLabels('co_date')">
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
                      <q-date v-model="date">
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
            @click="showModalGuestName"
            class="img-ota"
            src="../assets/Name.svg"
          />
          <a-modal v-model="modalGuestName" :title="getLabels('last_name')"
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel") }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOkName">
                {{ getLabels("search") }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('last_name')">
              <a-input
                v-model="name"
                :placeholder="getLabels('input_lastname')"
              />
            </a-form-item>
            <a-form-item :label="getLabels('co_date')">
              <a-date-picker
                :placeholder="getLabels('select_date')"
                @change="onChange"
                size="large"
                input-read-only
              />
            </a-form-item>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img
            class="img-ota"
            @click="showModalEmailAddress"
            src="../assets/EmailAddress.svg"
          />
          <a-modal v-model="modalEmailAddress" :title="getLabels('email')"
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel") }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOkEmail">
                {{ getLabels("search") }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('email')">
              <a-input
                v-model="email"
                :placeholder="getLabels('input_email')"
              />
            </a-form-item>
            <a-form-item :label="getLabels('co_date')">
              <a-date-picker
                :placeholder="getLabels('select_date')"
                @change="onChange"
                size="large"
                input-read-only
              />
            </a-form-item>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img
            class="img-ota"
            @click="showModalMembershipID"
            src="../assets/membership.svg"
          />
          <a-modal
            v-model="modalMembershipID"
            :title="getLabels('membership_id')"
            ><template slot="footer">
              <a-button key="back" @click="handleCancel">
                {{ getLabels("cancel") }}
              </a-button>
              <a-button key="submit" type="primary" @click="handleOk">
                {{ getLabels("search") }}
              </a-button>
            </template>
            <a-form-item :label="getLabels('membership_id')">
              <a-input :placeholder="getLabels('input_membership')" />
            </a-form-item>
            <a-form-item :label="getLabels('co_date')">
              <a-date-picker
                :placeholder="getLabels('select_date')"
                @change="onChange"
                size="large"
                input-read-only
              />
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
  QDate,
  QInput,
  QBtn,
  QPopupProxy,
  ClosePopup,
  QIcon,
} from "quasar";

import moment from "moment";
import ky from "ky";
import CookieS from "vue-cookies";

Vue.use(Quasar, {
  components: {
    QDate,
    QInput,
    QBtn,
    QPopupProxy,
    QIcon,
  },
  directives: {
    ClosePopup,
  },
});

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
    };
  },
  mounted() {
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
      console.log(code, "code");
      this.tempHotel = code.response.pciSetup["pci-setup"];
      const tempEndpoint = this.tempHotel.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 2;
      });
      console.log(tempEndpoint[0]["setupvalue"]);
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
      console.log(
        "Jamserverdong",
        tempServer[0]["setupvalue"],
        moment(tempServer[0]["setupvalue"], "HH:mm").valueOf()
      );
      this.server = moment(tempServer[0]["setupvalue"], "HH:mm")._i;
      const vServerClock = moment(
        tempServer[0]["setupvalue"],
        "HH:mm"
      ).valueOf();

      // console.log(this.bahasa, "test");
      for (const i in this.tempsetup) {
        if (
          this.tempsetup[i]["number1"] == 8 &&
          this.tempsetup[i]["number2"] == 2
        ) {
          this.checkin = this.tempsetup[i]["setupvalue"];
        }
      }

      const vCheckinClock = moment(this.checkin, "HH:mm").valueOf();
      console.log(vServerClock, vCheckinClock, vCheckinClock < vServerClock);

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
      this.$message.error(this.getLabels("input_bookcode"));
    },
    errorname() {
      this.$message.error(this.getLabels("input_lastname"));
    },
    erroremail() {
      this.$message.error(this.getLabels("input_email"));
    },
    errorco() {
      this.$message.error(this.getLabels("input_codate"));
    },
    error() {
      this.$message.error(
        this.getLabels("input_bookcode") + ", " + this.getLabels("input_codate")
      );
    },
    errorName() {
      this.$message.error(
        this.getLabels("input_lastname") + ", " + this.getLabels("input_codate")
      );
    },
    errorMail() {
      this.$message.error(
        this.getLabels("input_email") + ", " + this.getLabels("input_codate")
      );
    },
    goOTA() {
      this.informationmodal = false;
      this.informationmodal1 = false;
      this.informationmodal2 = false;
    },
    handleOk() {
      const reservation = [];
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
                  coDate: this.date,
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
              params: { foo: reservation, fighter: this.langID },
            });
          }
        })();

        this.modalBookingCode = false;
      }
    },
    handleOkBO() {
      const reservation = [];
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
                  coDate: this.date,
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
              params: { foo: reservation, fighter: this.langID },
            });
          }
        })();

        this.modalBookingCode = false;
      }
    },
    handleOkName() {
      const reservation = [];
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
                  coDate: this.date,
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
              params: { foo: reservation, fighter: this.langID },
            });
          }
        })();

        this.modalGuestName = false;
      }
    },
    handleOkEmail() {
      const reservation = [];
      console.log(this.email, "email");
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
                  coDate: this.date,
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
              params: { foo: reservation, fighter: this.langID },
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
    getLabels(nameKey) {
      const label = this.labels.find(
        (element) => element["program-variable"] == nameKey
      );
      if (label != undefined) {
        return (
          label["program-label1"].charAt(0).toUpperCase() +
          label["program-label1"].slice(1)
        );
      } else {
        return "";
      }
      /*if (nameKey == 'information') {
        if (this.langID == 'ENG') {
          return 'Information';
        } else {
          return 'Informasi';
        }
      } else {
        const aco = this.labels.find(element => element['lang-variable'] == nameKey);
        return aco['lang-value'];
      }*/
      /*for (let x = 0; x < this.labels.length; x++) {
        if (this.labels[x]["program-variable"] === nameKey) {
          return this.labels[x]["program-label1"];
          break;const splitStr = this.labels[x]["program-label1"]
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
