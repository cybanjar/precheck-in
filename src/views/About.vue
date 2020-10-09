<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <a-row
        class="header-brandings"
        :style="information"
        type="flex"
        justify="space-between"
      >
        <a-col class="pl-3 pt-3" :span="15" :md="15" :xs="24">
          <h4 class="mb-3 text-white font-weight-bold" :style="information">
            ONLINE CHECK-IN
          </h4>
          <h6
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="main-guest-title text-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare["guest-member-name"] }}
          </h6>
          <h6
            v-else
            class="main-guest-title text-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h6>

          <p class="ant-card-meta-description text-white" :style="information">
            {{ getLabels("arrival", `titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong>
            {{ getLabels("departure", `titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />
            {{ getLabels("book_code", `titleCase`) }}:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img
            class="img-hotel float-right image"
            :src="gambar"
            alt="Image Loading"
          />
          <div class="overlay">
            <div class="text">{{ hotelname }}</div>
          </div>
          <!-- <div class="visible">
            <div class="online-checkin-mobile">
              <p class="text-center">Online Check-In</p>
            </div>
          </div>-->
        </a-col>
      </a-row>
      <!-- {{currDataPrepare}} -->
      <!-- <h3 class="text-center font-weight-bold visible">{{ hotelname }}</h3>
      <a-row
        class="header-branding"
        :style="information"
        type="flex"
        justify="space-between"
      >
        <a-col
          class="pl-3 pt-3 invisible"
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
            {{ getLabels("arrival",`titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong>
            {{ getLabels("departure",`titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />
            {{ getLabels("book_code",`titleCase`) }}:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xl="9" :lg="9" :xs="24">
          <img class="img-hotel" :src="gambar" alt="Image Loading" />
          <div class="overlay invisible">
            <div class="text">{{ hotelname }}</div>
          </div>
          <div class="invisible">
            <div class="gear-setting"></div>
          </div>
        </a-col>
        <a-col class="pl-3 pt-3 visible" :span="12" :md="12" :xs="24">
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
            {{ getLabels("arrival",`titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong>
            {{ getLabels("departure",`titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />
            {{ getLabels("book_code",`titleCase`) }}:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </a-col>
      </a-row>-->
      <div>
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <a-row class="ml-4 mr-3 mt-3 mb-3" :gutter="16">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">
                    {{ getLabels("arrival", `titleCase`) }}
                  </p>
                </a-col>
              </a-row>
            </a-card>
          </a-row>
          <a-row class="ml-3" :gutter="16">
            <a-col :span="4" :xl="4" :lg="5" :md="6" :xs="24">
              <a-form-item
                layout="vertical"
                :label="getLabels('eta', `titleCase`)"
              >
                <!-- <a-time-picker
                  v-model="hour"
                  :minute-step="30"
                  format="HH:mm"
                  size="large"
                  inputReadOnly
                />-->
                <q-input
                  v-model="hour"
                  class="inputTime"
                  @click="$refs.qDateProxy.show()"
                  outlined
                  dense
                  readonly
                >
                  <template v-slot:append>
                    <q-icon name="schedule" class="cursor_pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="hour"
                          mask="HH:mm"
                          :minute-options="[0, 30]"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </a-form-item>
            </a-col>
            <a-col
              :span="4"
              :xl="6"
              :lg="5"
              :md="6"
              :xs="24"
              v-show="showPickupRequest"
            >
              <a-form-item :label="getLabels('request', `titleCase`)">
                <a-checkbox
                  :checked="showPrice"
                  v-model="showPrice"
                  @change="onChange"
                  >{{ getLabels("pick_req", `titleCase`) }}</a-checkbox
                >
              </a-form-item>
            </a-col>
            <a-col
              :span="4"
              :xl="4"
              :lg="5"
              :md="5"
              :xs="24"
              v-show="showPickupRequest"
            >
              <a-form-item :label="getLabels('price', 'titleCase')">
                <label v-decorator="['currency', { initialValue: money }]">
                  {{ nilai === 3 ? "" : currency }}
                  {{
                    nilai === 3
                      ? " "
                      : `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " "
                  }}
                </label>
                <span>/ {{ per }}</span>
              </a-form-item>
            </a-col>
            <a-col
              v-show="showPrice && showPickupRequest"
              :span="8"
              :xl="8"
              :lg="8"
              :md="7"
              :xs="24"
            >
              <a-form-item :label="getLabels('pick_detail', 'titleCase')">
                <a-input
                  class="ant-input-h"
                  v-decorator="[
                    'flight',
                    {
                      rules: [{}],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="16">
            <a-col>
              <a-form-item :label="getLabels('room_pref', 'titleCase')">
                <a-radio-group
                  name="radioGroup"
                  v-show="showSmoking"
                  @change="Room"
                >
                  <a-radio value="NonSmoking">
                    <span class="font-weight-normal">
                      {{ getLabels("non_smoking", `sentenceCase`) }}
                    </span>
                  </a-radio>
                  <a-radio value="Smoking">
                    <span class="font-weight-normal">
                      {{ getLabels("smoking", `sentenceCase`) }}
                    </span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label>
                <a-radio-group
                  name="radioGroup"
                  v-show="showFloor"
                  @change="Floor"
                >
                  <a-radio value="LowerFloor">
                    <span class="font-weight-normal">
                      {{ getLabels("lower_floor", `sentenceCase`) }}
                    </span>
                  </a-radio>
                  <a-radio value="HigherFloor">
                    <span class="font-weight-normal">
                      {{ getLabels("higher_floor", `sentenceCase`) }}
                    </span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showBed" @change="Bed">
                  <a-radio value="OneBigBed">
                    <span class="font-weight-normal">
                      {{ getLabels("one_big_bed", `sentenceCase`) }}
                    </span>
                  </a-radio>
                  <a-radio value="TwoSingleBeds">
                    <span class="font-weight-normal">
                      {{ getLabels("two_single_beds", `sentenceCase`) }}
                    </span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="9" :xl="9" :lg="9" :md="12" :xs="18">
              <a-form-item :label="getLabels('special_request', `titleCase`)">
                <a-textarea v-model="text" :rows="4" :maxlength="max" />
              </a-form-item>
            </a-col>
            <a-col class="max-breaker" :span="3" :xl="3" :xs="6">
              <span v-text="text.length + '/' + max"></span>
            </a-col>
          </a-row>

          <a-row class="ml-4 mr-3 mb-3">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">
                    {{ getLabels("guest_detail", `titleCase`) }}
                  </p>
                </a-col>
              </a-row>
            </a-card>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col
              v-if="email != ''"
              :span="5"
              :xl="5"
              :lg="7"
              :md="10"
              :xs="24"
            >
              <a-form-item :label="getLabels('email', `titleCase`)">
                <a-input
                  class="ant-input-h"
                  v-decorator="[
                    'email',
                    {
                      initialValue: email,
                      rules: [{ message: 'Please input your email' }],
                    },
                  ]"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-else :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <span>{{ currDataPrepare["guest-email"] }}</span>
              <a-form-item :label="getLabels('email', `titleCase`)">
                <a-input
                  class="ant-input-h"
                  v-decorator="[
                    'email',
                    {
                      initialValue: email,
                      rules: [
                        {
                          required: true,
                          message: getLabels('required_email', `titleCase`),
                        },
                        {
                          type: 'email',
                          message: getLabels('not_valid_email', `sentenceCase`),
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item :label="getLabels('phone_number', `titleCase`)">
                <q-input
                  v-decorator="[
                    'phone',
                    {
                      rules: [
                        {
                          required: true,
                          message: getLabels('required_phone'),
                        },
                      ],
                    },
                  ]"
                  outlined
                  dense
                  v-model="phone"
                  mask="############"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="3" :xl="3" :lg="7" :md="10" :xs="24">
              <a-form-item :label="getLabels('purpose_stay', `titleCase`)">
                <a-select
                  @change="Kuy"
                  v-decorator="[
                    'purpose',
                    { initialValue: purpose, rules: [{ required: true }] },
                  ]"
                >
                  <a-select-option
                    v-for="item in FilterPurposeofStay"
                    :key="item.setupvalue"
                    :value="item.setupvalue"
                    >{{ item.setupvalue }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item :label="getLabels('nationality', `titleCase`)">
                <a-select
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
                    :key="item['descr']"
                    :value="item['descr']"
                    >{{ item.setupvalue }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item
                :label="getLabels('country_of_residence', `titleCase`)"
              >
                <a-select
                  v-model="country"
                  v-decorator="[
                    'country',
                    {
                      initialValue: currDataPrepare['guest-country'],
                      rules: [{ required: true }],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="item in FilterCountry"
                    :key="item['descr']"
                    :value="item['descr']"
                    >{{ item.setupvalue }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <div v-if="country === 'INA' || country === 'ina'">
                <a-form-item :label="getLabels('region', `titleCase`)">
                  <a-select
                    @change="handleChangeRegion"
                    v-decorator="[
                      'region',
                      {
                        initialValue: currDataPrepare['guest-prov'],
                        rules: [{ required: true }],
                      },
                    ]"
                  >
                    <a-select-option
                      v-for="item in filteredProvince"
                      :key="item['descr']"
                      :value="item['descr']"
                      >{{ item.setupvalue }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </div>
              <div v-else>
                <a-form-item :label="getLabels('state', `titleCase`)">
                  <a-input
                    class="ant-input-h"
                    v-decorator="[
                      'State',
                      {
                        initialValue: State,
                        rules: [{ message: 'Please input your State' }],
                      },
                    ]"
                  />
                </a-form-item>
              </div>
            </a-col>
          </a-row>

          <!-- Address -->
          <a-row class="ml-3 mb-3" :gutter="[16, 8]">
            <a-col :span="1" :xl="1" :xs="2">
              <a-checkbox v-model="agree" />
            </a-col>
            <a-col class="fix-agreement" :span="23" :xl="23" :xs="22">
              {{ getLabels("pci_tc", `sentenceCase`) }}
              <a @click="showModalTerm">{{
                getLabels("t_c", `sentenceCase`)
              }}</a>
              {{ hotelname }}.
            </a-col>
            <a-modal
              :title="getLabels('t_c', `titleCase`)"
              :visible="visibleTerm"
              :confirm-loading="confirmLoadingTerm"
            >
              <template slot="footer">
                <a-button
                  key="submit"
                  type="primary"
                  :loading="loading"
                  @click="handleOkTerm"
                  >{{ getLabels("close", `sentenceCase`) }}</a-button
                >
              </template>
              <p>{{ term }}</p>
            </a-modal>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="4" :xl="4" :lg="7" :xs="24">
              <a-form-item>
                <a-button
                  :xl="12"
                  class="font-weight-bold mt-3"
                  type="primary"
                  block
                  size="large"
                  :disabled="!agree"
                  html-type="submit"
                  >{{ getLabels("ci_now", `titleCase`) }}</a-button
                >
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
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
  QBtn,
  QPopupProxy,
  ClosePopup,
  QIcon,
} from "quasar";
import Antd, {
  Row,
  Col,
  Card,
  Icon,
  FormModel,
  Button,
  Checkbox,
  Input,
  Collapse,
  Radio,
  DatePicker,
  Modal,
} from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import moment from "moment";
import ky from "ky";
Vue.use(Antd);
Vue.use(Quasar, {
  components: {
    QTime,
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
      addessHotel:
        "Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240",
      id: [],
      plainOptions: ["Apple", "Pear", "Orange"],
      currDataPrepare: {},
      counter: 0,
      checkNick: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
      },
      form: this.$form.createForm(this, { name: "coordinated" }),
      nilai: 2,
      bed: "",
      floor: "",
      region: "",
      room: "",
      setRegion: "Bali",
      cek: "",
      cities: "",
      // filteredCity: [],
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
      gambar: "",
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
      hotelEndpoint: "",
      hotelCode: "",
      phone: "",
      State: "",
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
        const tempMessResult = parsed.response.messResult;
        console.log(tempMessResult);
        this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
        if (tempMessResult == "99 - Pre Checkin Not Allowed!") {
          router.push("notfound");
        } else if (tempMessResult == "2 - Guest Already Checkin.") {
          router.push("done");
        }

        this.tempsetup = parsed.response.pciSetup["pci-setup"];
        const tempbC = this.tempsetup.filter((item, index) => {
          return item.number1 === 4;
        });
        const bC = tempbC.filter((item, index) => {
          return item.setupflag === true;
        });
        this.information.backgroundColor = bC[0].setupvalue;
        const tempfC = this.tempsetup.filter((item, index) => {
          return item.number1 === 5;
        });
        const fC = tempfC.filter((item, index) => {
          return item.setupflag === true;
        });
        this.information.color = fC[0].setupvalue;
        const tempGambar = this.tempsetup.filter((item, index) => {
          return item.number1 === 7 && item.number2 === 1;
        });
        this.gambar = tempGambar[0].setupvalue;

        const tempTerm = this.tempsetup.filter((item, index) => {
          return item.number1 === 6 && item.setupflag === true;
        });
        this.term = tempTerm[0]["setupvalue"];
        const temRequest = this.tempsetup.filter((item, index) => {
          return item.number1 === 2 && item.setupflag === true;
        });
        this.showPickupRequest = temRequest[0].setupflag;
        this.money = temRequest[0]["price"];
        this.currency = temRequest[0]["remarks"];
        const tempPer = temRequest[0]["setupvalue"].split("PER")[1];
        this.per = this.getLabels(tempPer.toLowerCase().trim(), `sentenceCase`);
        const tempHour = this.tempsetup.filter((item, index) => {
          return item.number1 === 8 && item.number2 === 2;
        });
        this.hour = moment(tempHour[0]["setupvalue"], "HH:mm")._i;
        const tempBed = this.tempsetup.filter((item, index) => {
          return item.number1 === 3 && item.number2 === 1;
        });
        this.showBed = tempBed[0].setupflag;
        const tempSmoking = this.tempsetup.filter((item, index) => {
          return item.number1 === 3 && item.number2 === 2;
        });
        this.showSmoking = tempSmoking[0].setupflag;
        const tempFloor = this.tempsetup.filter((item, index) => {
          return item.number1 === 3 && item.number2 === 3;
        });
        this.showFloor = tempFloor[0].setupflag;
        const tempHotel = this.tempsetup.filter((item, index) => {
          return item.number1 === 99 && item.number2 === 1;
        });
        this.hotelname = tempHotel[0]["setupvalue"];
        const tempKios = this.tempsetup.filter((item, index) => {
          return item.number1 === 8 && item.number2 === 10;
        });
        this.flagKiosk = tempKios[0]["setupflag"];

        const tempEndpoint = this.tempsetup.filter((item, index) => {
          return item.number1 === 99 && item.number2 === 2;
        });
        this.hotelEndpoint = tempEndpoint[0]["setupvalue"];

        const tempHotelCode = this.tempsetup.filter((item, index) => {
          return item.number1 === 99 && item.number2 === 3;
        });
        this.hotelCode = tempHotelCode[0]["setupvalue"];

        const jatah = [];

        for (const i in this.tempsetup) {
          if (this.tempsetup[i]["number1"] == 1) {
            this.tempsetup[i].setupvalue = this.getLabels(
              this.tempsetup[i].setupvalue.toLowerCase(),
              `sentenceCase`
            );
            this.FilterPurposeofStay.push(this.tempsetup[i]);
            if (this.tempsetup[i].setupflag == true) {
              this.purpose = this.tempsetup[i].setupvalue;
            }
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
            this.tempsetup[i]["number2"] == 3 &&
            this.tempsetup[i].descr != "SERVER TIME"
          ) {
            const air = {};
            air["descr"] = this.tempsetup[i]["descr"];
            air["setupvalue"] = this.tempsetup[i]["setupvalue"];
            this.province.push(air);
          }
        }

        if (parsed.response.arrivalGuest["arrival-guest"].length > 1) {
          const nietos = [];
          const obj = {};
          this.dataGuest = parsed.response.arrivalGuest["arrival-guest"];
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
          obj["17"] = this.hotelEndpoint;
          obj["18"] = this.hotelCode;
          nietos.push(this.dataGuest);
          nietos.push(obj);
          router.push({ name: "List", params: { foo: nietos } });
        } else if (
          parsed.response.arrivalGuest["arrival-guest"]["0"]["gcomment-desc"] ==
          "GUEST ALREADY PCI"
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

          router.push({
            name: "Success",
            params: {
              jin: mori,
              jun: this.langID,
              jen: this.flagKiosk,
              mihawk: this.hotelCode,
              luffy: this.hotelEndpoint,
            },
          });
        } else {
          this.currDataPrepare =
            parsed.response.arrivalGuest["arrival-guest"][0];
          this.country = this.currDataPrepare["guest-country"];
          this.email = this.currDataPrepare["guest-email"];
          this.phone = this.currDataPrepare["guest-phone"];
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
      this.hotelEndpoint = this.$route.params.id["setup"]["17"];
      this.hotelCode = this.$route.params.id["setup"]["18"];
      this.id = this.$route.params.id["data"];

      this.currDataPrepare = this.id[this.counter];
      this.country = this.currDataPrepare["guest-country"];
      this.email = this.currDataPrepare["guest-email"];
      this.phone = this.currDataPrepare["guest-phone"];

      this.counter += 1;
    }
    this.filteredRegion = this.Region;
    this.filteredProvince = this.province;
    this.FilterCountry = this.countries;
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
    Room(e) {
      this.room = e.target.value;
    },
    Bed(e) {
      this.bed = e.target.value;
    },
    Floor(e) {
      this.floor = e.target.value;
    },
    Kuy(value) {
      this.kuy = value;
    },
    Nationality(value) {
      this.nationality = value;
    },
    handleChangeRegion(value) {
      this.region = value;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log(
          //   {
          //     resNumber: this.currDataPrepare["rsv-number"],
          //     reslineNumber: this.currDataPrepare["rsvline-number"],
          //     estAT: this.hour,
          //     pickrequest: this.showPrice,
          //     pickdetail:
          //       this.showPrice == false ||
          //       values.flight == " " ||
          //       values.flight == undefined
          //         ? ""
          //         : values.flight,
          //     roomPreferences: this.room + "$" + this.floor + "$" + this.bed,
          //     specialReq:
          //       values.Request == " " || values.Request == undefined
          //         ? ""
          //         : values.Request,
          //     guestPhnumber: this.phone,
          //     guestNationality: values.nationality,
          //     guestCountry: values.country,
          //     guestRegion: values.country != "INA" ? " " : values.region,
          //     agreedTerm: true,
          //     purposeOfStay: values.purpose,
          //   },
          //   "inputan"
          // );
          (async () => {
            const tempParam = location.search.substring(1);
            const parsed = await ky
              .post(this.hotelEndpoint + "preCI/updateData", {
                json: {
                  request: {
                    resNumber: this.currDataPrepare["rsv-number"],
                    reslineNumber: this.currDataPrepare["rsvline-number"],
                    estAT: this.hour,
                    pickrequest: this.showPrice,
                    pickdetail:
                      this.showPrice == false ||
                      values.flight == " " ||
                      values.flight == undefined
                        ? ""
                        : values.flight,
                    roomPreferences:
                      this.room + "$" + this.floor + "$" + this.bed,
                    specialReq:
                      values.Request == " " || values.Request == undefined
                        ? ""
                        : values.Request,
                    guestPhnumber: this.phone,
                    guestNationality: values.nationality,
                    guestCountry: values.country,
                    guestRegion: values.country != "INA" ? " " : values.region,
                    agreedTerm: true,
                    purposeOfStay: values.purpose,
                  },
                },
              })
              .json();
            // console.log(parsed, "inputan3");
            const tempMessResult = parsed.response.messResult.split(" ");
            this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
          })();
          this.scrollToTop();
          this.save();
          this.form.resetFields();
        }
      });
    },
    save() {
      if (this.counter == this.id.length) {
        const mori =
          "{" +
          this.currDataPrepare["rsv-number"] +
          ";" +
          moment(this.currDataPrepare.depart).format("MM/DD/YYYY") +
          "," +
          this.hour +
          "}";
        router.push({
          name: "Success",
          params: {
            jin: mori,
            jun: this.langID,
            jen: this.flagKiosk,
            mihawk: this.hotelCode,
            luffy: this.hotelEndpoint,
          },
        });

        // router.push("success");
      }
      this.currDataPrepare = this.id[this.counter];
      this.counter += 1;
      this.agree = false;
    },
    back() {
      if (this.counter == this.id.length) {
        return false;
      }
      this.counter -= 1;
      this.currDataPrepare = this.id[this.counter];
    },

    onChange(e) {
      this.showPrice = e.target.checked;
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
      const dDate =
        String(moment(datum, "YYYY-MM-DD").date()).length == 1
          ? `0${String(moment(datum, "YYYY-M-DD").date())}`
          : String(moment(datum, "YYYY-MM-DD").date());
      const dMonth =
        String(moment(datum, "YYYY-MM-DD").month() + 1).length == 1
          ? `0${String(moment(datum, "YYYY-MM-DD").month() + 1)}`
          : String(moment(datum, "YYYY-MM-DD").month() + 1);

      const dYear = moment(datum, "YYYY-MM-DD").year();
      const fixDate = moment(`${dDate}/${dMonth}/${dYear}`, "DD-MM-YYYY")._i;

      return fixDate;
    },
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["lang-variable"] == nameKey
      );

      let fixLabel = "";

      if (label["lang-value"] == "undefined") {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["lang-value"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["lang-value"].charAt(0).toUpperCase() +
            label["lang-value"].slice(1);
        } else {
          fixLabel = label["lang-value"];
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
