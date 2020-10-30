<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <!-- Modal Response Room Status -->
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="informationModal"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleYes"
            >{{ getLabels("yes", `titleCase`) }}</a-button
          >
        </template>
        <p>
          Sorry, your room is not ready yet. But you can still continue to
          check-in. We will notify you by email and SMS when your room is ready.
        </p>
        <p>Please re-confirm your phone number and email.</p>
        <div>
          <a-form layout="vertical" :form="formresubmit">
            <a-form-item :label="getLabels('phone_number', `titleCase`)">
              <a-input
                v-decorator="[
                  'guest-phone',
                  {
                    initialValue: currDataPrepare['guest-phnumber'],
                    rules: [
                      {
                        required: true,
                        message: 'Please input your phone number!',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <a-form-item :label="getLabels('email', `titleCase`)">
              <a-input
                v-decorator="[
                  'guest-email',
                  {
                    initialValue: currDataPrepare['guest-email'],
                    rules: [
                      { required: true, message: 'Please input your email!' },
                    ],
                  },
                ]"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>

      <a-modal
        :title="getLabels('t_c', `titleCase`)"
        :visible="termcondition"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="back" @click="disagree">
            {{ getLabels("disagree", `titleCase`) }}
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >{{ getLabels("agree", `titleCase`) }}</a-button
          >
        </template>
        <p>{{ terms }}</p>
      </a-modal>

      <h5 class="text-black text-center font-weight-bold visible">
        ONLINE CHECK-IN
      </h5>
      <div class="row justify-between" :style="information">
        <div class="q-ma-md col-md col-md-5 col-xs-12 invisibles">
          <h5 class="text-white font-weight-bold">ONLINE CHECK-IN</h5>
          <h6
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="text-white font-weight-bold"
            :style="information"
          >
            {{ this.currDataPrepare["gast"] }}
            {{ currDataPrepare["guest-member-name"] }}
          </h6>
          <h6 v-else class="text-white font-weight-bold" :style="information">
            {{ this.currDataPrepare["gast"] }}
          </h6>
          <p class="ant-card-meta-description text-white" :style="information">
            {{ getLabels("arrival", `titleCase`) }}:
            <strong>{{ formatDate(this.currDataPrepare.ci) }}</strong>
            {{ getLabels("departure", `titleCase`) }}:
            <strong>{{ formatDate(this.currDataPrepare.co) }}</strong>
            <br />
            {{ getLabels("book_code", `titleCase`) }}:
            <strong>{{ this.currDataPrepare.resnr }}</strong>
            {{ getLabels("room_number", `titleCase`) }}:
            <strong>{{ this.currDataPrepare.zinr }}</strong>
          </p>
        </div>
        <div class="col-md col-md-3 col-xs-12">
          <q-card flat>
            <q-img class="" :src="gambar">
              <div
                class="absolute-bottom font-weight-bold text-subtitle2 text-center"
              >
                {{ hotelname }}
              </div>
            </q-img>
          </q-card>
        </div>
        <div class="q-ma-md col-md col-md-5 col-xs-12 visible">
          <h6
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="text-white font-weight-bold"
          >
            {{ this.currDataPrepare["gast"] }}
            {{ currDataPrepare["guest-member-name"] }}
          </h6>
          <h6 v-else class="text-white font-weight-bold">
            {{ this.currDataPrepare["gast"] }},
          </h6>
          <p class="ant-card-meta-description text-white">
            {{ getLabels("arrival", `titleCase`) }}:
            <strong>{{ formatDate(this.currDataPrepare.ci) }}</strong>
            {{ getLabels("departure", `titleCase`) }}:
            <strong>{{ formatDate(this.currDataPrepare.co) }}</strong>
            <br />
            {{ getLabels("book_code", `titleCase`) }}:
            <strong>{{ this.currDataPrepare.resnr }}</strong>
            {{ getLabels("room_number", `titleCase`) }}:
            <strong>{{ this.currDataPrepare.zinr }}</strong>
          </p>
        </div>
      </div>
      <div>
        <a-form layout="vertical" :form="form">
          <h2 v-show="current === 0">
            {{ getLabels("guest_detail", `titleCase`) }}
          </h2>
          <h2 v-show="current === 1">
            {{ getLabels("guest_detail", `titleCase`) }}
          </h2>
          <h2 v-show="current === 2">
            {{ getLabels("upload_id", `titleCase`) }}
          </h2>
          <h2 v-show="current === 3">
            {{ getLabels("deposit_payment", `titleCase`) }}
          </h2>
          <div>
            <q-stepper
              v-model="current"
              flat
              bordered
              ref="stepper"
              contracted
              color="primary"
              animated
              keep-alive
            >
              <q-step
                :name="0"
                title="Select campaign settings"
                icon="person"
                active-icon="person"
                style="font-size: 3em;"
                :done="current + 1 > 1"
              >
                <div class="steps-content" v-show="current === 0">
                  <a-row class :gutter="[16, 8]">
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item :label="getLabels('email', `titleCase`)">
                        <a-input
                          class="ant-input-h"
                          v-decorator="[
                            'email',
                            {
                              initialValue: currDataPrepare['guest-email'],
                              rules: [
                                {
                                  required: true,
                                  message: getLabels(
                                    'required_email',
                                    `sentenceCase`
                                  ),
                                },
                                {
                                  type: 'email',
                                  message: getLabels(
                                    'not_valid_email',
                                    `sentenceCase`
                                  ),
                                },
                              ],
                            },
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item
                        :label="getLabels('phone_number', `titleCase`)"
                      >
                        <q-input
                          v-decorator="[
                            'phone',
                            {
                              initialValue: currDataPrepare['guest-phnumber'],
                              rules: [
                                {
                                  required: true,
                                  message: getLabels(
                                    'required_phone',
                                    `sentenceCase`
                                  ),
                                },
                              ],
                            },
                          ]"
                          outlined
                          dense
                          mask="##############"
                        ></q-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row class :gutter="[16, 8]">
                    <a-col :span="3" :xl="3" :xs="24">
                      <a-form-item
                        :label="getLabels('purpose_stay', `titleCase`)"
                      >
                        <a-select
                          v-decorator="[
                            'purpose',
                            {
                              initialValue: purpose,
                              rules: [{ required: true }],
                            },
                          ]"
                        >
                          <a-select-option
                            v-for="item in FilterPurposeofStay"
                            :key="item.setupvalue"
                            :value="item.setupvalue"
                            >{{
                              getLabels(
                                item.setupvalue.toLowerCase(),
                                `titleCase`
                              )
                            }}</a-select-option
                          >
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
              </q-step>

              <q-step
                :name="1"
                title="Select campaign settings"
                icon="room"
                active-icon="room"
                style="font-size: 3em;"
                :done="current + 1 > 1"
              >
                <div class="steps-content" v-show="current === 1">
                  <a-row class :gutter="[16, 8]">
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item
                        :label="getLabels('nationality', `titleCase`)"
                      >
                        <a-select
                          v-decorator="[
                            'nationality',
                            {
                              initialValue: currDataPrepare['guest-nation'],
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
                  </a-row>
                  <a-row class :gutter="[16, 8]">
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item
                        :label="getLabels('country_of_residence', `titleCase`)"
                      >
                        <a-select
                          @change="handleChangeCountry"
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
                            v-decorator="[
                              'region',
                              {
                                initialValue: currDataPrepare['guest-region'],
                                rules: [
                                  {
                                    required: true,
                                    message: getLabels(
                                      'required_province',
                                      `sentenceCase`
                                    ),
                                  },
                                ],
                              },
                            ]"
                          >
                            <a-select-option
                              v-for="item in filteredRegion"
                              :key="item['descr']"
                              :value="item['descr']"
                              >{{ item.setupvalue }}</a-select-option
                            >
                          </a-select>
                        </a-form-item>
                      </div>
                    </a-col>
                    <div v-if="freeParking">
                      <a-col :span="5" :xl="5" :xs="24">
                        <a-form-item
                          :label="getLabels('vehicle_regident', `titleCase`)"
                        >
                          <a-input
                            class="ant-input-h"
                            v-decorator="[
                              'vRegident',
                              {
                                initialValue: currDataPrepare['vreg'],
                              },
                            ]"
                          />
                        </a-form-item>
                      </a-col>
                    </div>
                  </a-row>
                </div>
              </q-step>

              <q-step
                :name="2"
                title="Create an ad group"
                caption="Optional"
                icon="portrait"
                active-icon="portrait"
                style="font-size: 3em;"
                :done="current + 1 > 2"
              >
                <div class="steps-content" v-show="current === 2">
                  <a-row class :gutter="[16, 8]">
                    <a-col class="text-center">
                      <a-form-item>
                        <input
                          style="display: none;"
                          ref="fileurl"
                          accept="image/*"
                          type="file"
                          @change="onFileChange"
                          v-decorator="[
                            'url',
                            {
                              initialValue: '',
                              rules: [
                                {
                                  required: true,
                                  message: getLabels(
                                    'required_id',
                                    `sentenceCase`
                                  ),
                                },
                              ],
                            },
                          ]"
                        />
                        <div style="margin-top: -50px;">
                          <h1>Prepare your Passport for photo verification</h1>
                          <p>
                            We need a photograph of your passport or
                            alternatively you may upload the image file
                          </p>
                        </div>
                        <img class="preview" v-if="url" :src="url" />
                        <div style="margin-top: 40px;">
                          <q-btn
                            unelevated
                            rounded
                            @click="getFile"
                            color="primary"
                            label="Upload"
                            style="width: 200px;"
                          />
                        </div>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
              </q-step>

              <q-step
                :name="3"
                title="Create an ad"
                icon="payment"
                active-icon="payment"
                style="font-size: 3em;"
                :done="current + 1 > 2"
              >
                <div class="steps-content" v-show="current === 3">
                  <a-row :gutter="[16, 8]" v-if="pay == false">
                    <a-col :span="12" :xl="12" :xs="12">
                      <a-form-item
                        :label="getLabels('deposit_payment', `titleCase`)"
                      >
                        <h2>
                          <strong>
                            {{ this.currDataPrepare["currency-usage"] }}
                            {{
                              `${Deposit}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}
                          </strong>
                        </h2>
                      </a-form-item>
                    </a-col>
                    <a-col :span="10" :xl="10" :xs="12">
                      <div>
                        <a-button
                          class="font-weight-bold mt-3 mr-3"
                          type="primary"
                          :disabled="paid"
                          @click="payDeposit()"
                          >{{ getLabels("pay", `titleCase`) }}</a-button
                        >
                      </div>
                    </a-col>
                  </a-row>
                  <a-row :gutter="[16, 8]" v-else>
                    <a-col :span="12" :xl="12" :xs="12">
                      <a-form-item :label="getLabels('deposit', `titleCase`)">
                        <h2>
                          <strong>{{
                            getLabels("cash_basis", `titleCase`)
                          }}</strong>
                        </h2>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="[16, 8]" v-show="(skipDeposit = true)">
                    <div v-if="paid">
                      <p style="font-size: 16px; text-align: justify;">
                        {{
                          getLabels("deposit_payment_success", `sentenceCase`)
                        }}
                      </p>
                    </div>
                    <div v-else>
                      <p>
                        <a-checkbox v-model="pay">
                          {{ getLabels("term_cash_basis", `titleCase`) }}
                        </a-checkbox>
                      </p>
                    </div>
                  </a-row>
                </div>
              </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation>
                  <div class="row justify-between">
                    <div v-if="y" class="col-6 col-xs-6">
                      <q-btn
                        v-if="current > 0"
                        @click="prev"
                        outline
                        color="primary"
                      >
                        {{ getLabels("prev", `titleCase`) }}
                      </q-btn>
                    </div>
                    <div
                      v-if="current < steps.length - 1"
                      class="col-6 col-xs-6"
                    >
                      <q-btn
                        @click="next"
                        color="primary"
                        unelevated
                        class="float-right"
                      >
                        {{ getLabels("next", `titleCase`) }}</q-btn
                      >
                    </div>
                  </div>
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </div>

          <a-row class :gutter="[16, 8]">
            <a-col :span="4" :xl="4" :xs="24">
              <a-form-item>
                <div v-if="!paid">
                  <a-button
                    :xl="12"
                    class="font-weight-bold mt-3"
                    type="primary"
                    block
                    :size="size"
                    @click="save"
                    v-if="current == steps.length - 1"
                    html-type="submit"
                    :disabled="!pay"
                    >{{ getLabels("ci_now", `titleCase`) }}</a-button
                  >
                </div>
                <div v-else>
                  <a-button
                    :xl="12"
                    class="font-weight-bold mt-3"
                    type="primary"
                    block
                    :size="size"
                    @click="save"
                    v-if="current == steps.length - 1"
                    html-type="submit"
                    >{{ getLabels("ci_now", `titleCase`) }}</a-button
                  >
                </div>
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
import CryptoJS from "crypto-js";
import CookieS from "vue-cookies";
Vue.use(Antd);
export default {
  data() {
    return {
      pay: false,
      scanid: false,
      informationterm: "",
      current: 0,
      bookingcode: "",
      y: true,
      steps: [
        {
          title: "Guest Detail",
        },
        {
          title: "Address",
        },
        {
          title: "Scan ID",
        },
        {
          title: "Deposit Payment",
        },
      ],
      url: null,
      addessHotel:
        "Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240",
      id: [],
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
      setRegion: "Bali",
      cek: "",
      cities: "",
      filteredRegion: [],
      nationality: "Indonesia",
      dataID: [],
      max: 100,
      agree: false,
      text: "",
      money: 100000,
      showSmoking: true,
      showBed: true,
      showFloor: true,
      showPickupRequest: true,
      showPrice: false,
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      formresubmit: this.$form.createForm(this, { name: "dynamic_rule" }),
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      muncul: false,
      guest: false,
      keluar: false,
      currency: "Rp.",
      country: "indonesia",
      purpose: "leisure",
      loading: true,
      term: "",
      term1: "",
      value: "terma",
      gambar: "",
      termcondition: false,
      information: {
        backgroundColor: "$green",
        color: "$white",
        borderRadius: "4px",
      },
      hour: "",
      FilterPurposeofStay: [],
      bed: "",
      floor: "",
      region: [],
      room: "",
      tempsetup: [],
      message: "",
      FilterCountry: [],
      countries: [],
      precheckin: false,
      hotelname: "",
      currData: [],
      labels: [],
      wifiAddress: "",
      wifiPassword: "",
      skipDeposit: false,
      minimumDeposit: "",
      paymentStatus: false,
      paymentModal: false,
      langID: "",
      terms: "",
      imgb64: "",
      hasUpload: false,
      hotelEndpoint: "",
      hotelcode: "",
      ipAddr: "",
      roomNotReady: false,
      freeParking: false,
      vRegident: "",
      informationModal: false,
      responseStatus: {
        statusNumber: "",
        statusMessage: "",
      },
      location: "",
      programLabel: "",
      Deposit: "0",
      maximumDeposit: "0",
      OverNightDeposit: "0",
      paid: "0",
      TotalData: "",
      defaultCI: "",
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  created() {
    // lemparan data
    //console.log(this.$route.params, "point");
    this.url = require(`../assets/PassportVerification.svg`);
    this.labels = JSON.parse(localStorage.getItem("labels"));
    this.currDataPrepare = this.$route.params.guestData;
    this.precheckin = this.currDataPrepare["pre-checkin"];
    this.hasUpload = this.currDataPrepare["image-flag"];
    this.country = this.currDataPrepare["guest-country"];
    this.currency = this.currDataPrepare["currency-usage"];
    this.term = this.$route.params.setting["termENG"];
    this.term1 = this.$route.params.setting["termIDN"];
    this.information.backgroundColor = this.$route.params.setting[
      "BackgroundColor"
    ];
    this.information.color = this.$route.params.setting["FontColor"];
    this.gambar = this.$route.params.setting["hotelImage"];
    this.hotelname = this.$route.params.setting["hotelName"];
    this.minimumDeposit = this.$route.params.setting["minimumDeposit"];
    this.maximumDeposit = this.$route.params.setting["maximumDeposit"];
    this.OverNightDeposit = this.$route.params.setting["OverNightDeposit"];
    this.TotalData = this.$route.params.setting["TotalData"];
    this.paid = this.currDataPrepare["preAuth-flag"];
    this.per = this.$route.params.setting["per"];
    this.purpose = this.$route.params.setting["PurposeofStay"];
    this.FilterPurposeofStay = this.$route.params.setting[
      "FilterPurposeofStay"
    ];
    this.region = this.$route.params.setting["province"];
    this.countries = this.$route.params.setting["countries"];
    this.wifiAddress = this.$route.params.setting["wifiAddress"];
    this.wifiPassword = this.$route.params.setting["wifiPassword"];
    this.langID = this.$route.params.setting["langID"];
    switch (this.langID.toLowerCase()) {
      case "eng":
        this.programLabel = "program-label1";
        break;
      case "idn":
        this.programLabel = "program-label2";
        break;
      default:
        this.programLabel = "program-label1";
        break;
    }
    this.hotelEndpoint = this.$route.params.setting["hotelEndpoint"];
    this.hotelcode = this.$route.params.setting["hotelCode"];
    this.location = this.$route.params.setting["location"];
    this.defaultCI = this.$route.params.setting["defaultCI"];
    this.filteredRegion = this.region;
    this.FilterCountry = this.countries;
    if (this.langID == "ENG" || this.langID == "eng") {
      this.terms = this.term;
    } else {
      this.terms = this.term1;
    }
    this.termcondition = true;
    if (this.precheckin == true) {
      if (this.currDataPrepare.current > 0) {
        this.current = this.currDataPrepare.current;
      } else {
        this.current = 2;
      }
      this.y = true;
    } else {
      if (this.currDataPrepare.current > 0) {
        this.current = this.currDataPrepare.current;
      }
    }
    this.loading = false;
    // router.replace(this.location);
    /* Handling Deposit Other Value */
    const ciDate = moment(this.handleArrayDate(this.currDataPrepare.ci));
    const coDate = moment(this.handleArrayDate(this.currDataPrepare.co));
    const night = coDate.diff(ciDate, "days");

    if (night === 1) {
      this.Deposit = this.minimumDeposit;
    } else if (night > 1) {
      if (this.OverNightDeposit <= 0) {
        this.Deposit = this.minimumDeposit;
      } else {
        this.Deposit =
          1 * this.minimumDeposit + (night - 1) * this.OverNightDeposit;
      }
    }
    if (this.maximumDeposit > 0) {
      if (this.Deposit > this.maximumDeposit) {
        this.Deposit = this.maximumDeposit;
      }
    }
  },
  methods: {
    async getFile() {
      await this.$nextTick();
      this.$refs.fileurl.click();
    },
    handleArrayDate(date) {
      const dDate = String(moment(date, "YYYY-MM-DD").date()).padStart(2, "0");
      const dMonth = String(moment(date, "YYYY-MM-DD").month()).padStart(
        2,
        "0"
      );
      const dYear = String(moment(date, "YYYY-MM-DD").year());
      const dateArray = [dYear, dMonth, dDate];
      return dateArray;
    },
    handleChangeCountry(value) {
      this.country = value;
    },
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
    next() {
      // console.log(this.hasUpload);
      if (this.current == 0) {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (
          this.form.getFieldValue(["email"][0]) &&
          this.form.getFieldValue(["email"][0]).match(mailformat) &&
          this.form.getFieldValue(["phone"][0])
        ) {
          this.current++;
          if (this.precheckin == true) {
            this.y = true;
          }
        } else {
          if (this.form.getFieldValue(["email"][0]) == "") {
            this.form.validateFields(["email"]);
          } else if (this.form.getFieldValue(["phone"][0]) == "") {
            this.form.validateFields(["phone"]);
          } else if (!this.form.getFieldValue(["email"][0]).match(mailformat)) {
            this.form.validateFields(["email"]);
          }
        }
      } else if (this.current == 1) {
        if (
          this.form.getFieldValue(["country"][0]) == "INA" ||
          this.form.getFieldValue(["country"][0]) == "ina"
        ) {
          if (this.form.getFieldValue(["region"][0])) {
            //console.log(this.hasUpload);
            if (this.hasUpload == "0 image id already exist") {
              this.current = 3;
            } else {
              this.current++;
            }
            if (this.precheckin == true) {
              this.y = true;
            }
          } else {
            this.form.validateFields(["region"]);
          }
        } else {
          if (this.hasUpload == "0 image id already exist") {
            this.current = 3;
          } else {
            this.current++;
          }
          if (this.precheckin == true) {
            this.y = true;
          }
        }
      } else if (this.current == 2) {
        if (this.form.getFieldValue(["url"][0])) {
          this.current++;
          if (this.precheckin == true) {
            this.y = true;
          }
        } else {
          this.form.validateFields(["url"]);
        }
      }
      // console.log(this.form.validateFields(["email"], { force: true }));
    },
    prev() {
      if (this.precheckin == true) {
        if (this.current == 3) {
          this.y = false;
        }
      }
      if (this.hasUpload && this.current == 3) {
        this.current = 1;
      } else {
        this.current--;
      }
    },
    payDeposit() {
      async function getIP() {
        const response = await fetch("http://api.ipify.org/?format=json");
        const ipdata = await response.json();
        return ipdata.ip;
      }
      getIP().then((dataip) => {
        this.ipAddr = dataip;

        const token = CryptoJS.SHA256(
          "IONPAYTESTTRX2020090700000002" +
            this.Deposit +
            "33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=="
        );

        const params =
          "timeStamp=" +
          moment().format("YYYYMMDDHHmmss") +
          "&iMid=IONPAYTEST&payMethod=01&currency=IDR&amt=" +
          this.Deposit +
          "&referenceNo=TRX2020090700000002&goodsNm=Deposit&billingNm=" +
          this.currDataPrepare["gast"]
            .replace(/ /g, "%20")
            .replace(/,/g, "%2C") +
          "&billingPhone=" +
          this.form.getFieldValue(["phone"][0]) +
          "&billingEmail=" +
          this.form.getFieldValue(["email"][0]) +
          "&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" +
          token.toString() +
          "&userIP=" +
          this.ipAddr +
          `&cartData={}&callBackUrl=${this.location}` +
          "&instmntType=1&instmntMon=1&reccurOpt=0";
        const datas = {
          codate: this.formatDate(this.currDataPrepare.co),
          userInit: "01",
          resrNumber: this.currDataPrepare.resnr,
          resLineNumber: this.currDataPrepare.reslinnr,
          guestEmail: this.form.getFieldValue("email"),
          guestPhnumber: this.form.getFieldValue("phone"),
          purposeOfStay: this.form.getFieldValue("purpose"),
          guestNation: this.form.getFieldValue("nationality"),
          guestCountry: this.form.getFieldValue("country"),
          guestRegion: this.form.getFieldValue("region"),
          current: this.current,
          vreg: this.vRegident,
        };
        CookieS.set("data", datas);

        fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://dev.nicepay.co.id/nicepay/api/orderRegist.do?" + params
          )}`
        )
          .then((response) => {
            if (response.ok) return response.json();
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            const resp = data.contents.substr(
              data.contents.indexOf("{"),
              data.contents.length
            );
            this.resReg = JSON.parse(resp);
            //console.log(this.resReg);
            if (this.resReg.data["resultCd"] == "0000") {
              //console.log(this.resReg);
              const urlInq =
                "https://dev.nicepay.co.id/nicepay/api/orderInquiry.do?tXid=" +
                this.resReg.data["tXid"] +
                "&optDisplayCB=1&optDisplayBL=0";
              window.open(urlInq, "_self");
            } else {
              //console.log("error payment");
            }
          });
      });
    },
    check() {
      const token = CryptoJS.SHA256(
        "IONPAYTESTTRX202009070000000250000033F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=="
      );
      const params =
        "iMid=IONPAYTEST&&merchantToken=" +
        token.toString() +
        "&tXid=IONPAYTEST01202009221236456216&amt=500000&referenceNo=TRX2020090700000002";
      fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          "https://dev.nicepay.co.id/nicepay/api/onePassStatus.do?" + params
        )}`
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          this.resPaid = JSON.parse(data.contents);
          if (this.resPaid.resultCd == "0000") {
            this.paymentStatus = true;
            // console.log("payment valid");
          } else {
            this.paymentStatus = false;
            // console.log("payment invalid");
          }
        });
    },
    closeModal() {
      this.paymentModal = false;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      /* Start Handling Images Compression */
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        // Creating Image Element
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;
        // Output to Web
        this.url = event.target.result;
        // Handling Image Element
        imgElement.onload = (e) => {
          // Creating Canvas and Scale Size
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let scaleSize = 0;
          // Scale Size Based on Image Mode Portrait or Landscape
          if (imgElement.width >= imgElement.height) {
            // Landscape Images
            scaleSize = MAX_WIDTH / e.target.width;
            canvas.width = MAX_WIDTH;
            canvas.height = e.target.height * scaleSize;
          } else {
            // Portrait Images
            scaleSize = MAX_HEIGHT / e.target.height;
            canvas.height = MAX_HEIGHT;
            canvas.width = e.target.width * scaleSize;
          }
          // Create Canvas Context
          const ctx = canvas.getContext("2d");
          // Draw Images into Canvas and equal to Width and Height
          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
          //Draw watermark on canvas
          for (let i = 0; i < 10; i++) {
            ctx.font = "100px Georgia";
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillText("COPY COPY COPY COPY COPY COPY COPY", 0, i * 100);
          }
          // Convert Canvas to DataURL
          const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
          this.url = srcEncoded;
          // Create Base64 Images
          const base64Canvas = ctx.canvas
            .toDataURL("image/jpeg")
            .split(";base64,")[1];
          (async () => {
            this.imgb64 = base64Canvas;
            const uploadResult = await ky
              .post(this.hotelEndpoint + "mobileCI/saveIDCard", {
                json: {
                  request: {
                    inpResnr: this.currDataPrepare.resnr,
                    inpReslinnr: this.currDataPrepare.reslinnr,
                    guestno: this.currDataPrepare.gastno,
                    imagedata: this.imgb64,
                    userinit: "01",
                  },
                },
              })
              .json();
            if (uploadResult.response.resultMessage != "") {
              // console.log(uploadResult.response.resultMessage);
            }
          })();
          this.hasUpload = "0 image id already exist";
        };
      };
    },
    onKeydown(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
      this.current = 0;
    },
    handleResCi(status) {
      (async () => {
        const parsed = await ky
          .post(this.hotelEndpoint + "mobileCI/resCI", {
            json: {
              request: {
                rsvNumber: this.currDataPrepare.resnr,
                rsvlineNumber: this.currDataPrepare.reslinnr,
                userInit: "01",
                newRoomno: this.currDataPrepare.zinr,
                purposeOfStay: this.form.getFieldValue("purpose"),
                email: this.form.getFieldValue("email"),
                guestPhnumber: this.form.getFieldValue("phone"),
                guestNation: this.form.getFieldValue("nationality"),
                guestCountry: this.form.getFieldValue("country"),
                guestRegion: this.form.getFieldValue("region"),
                base64image: this.imgb64,
                // vehicleNumber: ''
              },
            },
          })
          .json();
        const responses = parsed.response["resultMessage"].split(" - ");
        this.responseStatus.statusNumber = responses[0];
        this.responseStatus.statusMessage = responses[1];
      })();
    },
    save() {
      const rmStatus = this.currDataPrepare["room-status"].split(" ");
      if (parseInt(rmStatus) == 1) {
        // Cek status kamar pertama kalo Overlapping
        //console.log("overlapping");
        (async () => {
          const parsed = await ky
            .post(this.hotelEndpoint + "mobileCI/resCI", {
              json: {
                request: {
                  rsvNumber: this.currDataPrepare.resnr,
                  rsvlineNumber: this.currDataPrepare.reslinnr,
                  userInit: "01",
                  newRoomno: this.currDataPrepare.zinr,
                  purposeOfStay: this.form.getFieldValue("purpose"),
                  email: this.form.getFieldValue("email"),
                  guestPhnumber: this.form.getFieldValue("phone"),
                  guestNation: this.form.getFieldValue("nationality"),
                  guestCountry: this.form.getFieldValue("country"),
                  guestRegion: this.form.getFieldValue("region"),
                  base64image: this.imgb64,
                },
              },
            })
            .json();
          const responses = parsed.response["resultMessage"].split(" - ");
          // console.log('overlaping',parsed);
          this.responseStatus.statusNumber = responses[0];
          this.responseStatus.statusMessage = responses[1];
          //console.log(this.responseStatus.statusNumber,this.responseStatus.statusMessage);
          if (this.responseStatus.statusNumber == "99") {
            /* Handling Room Vacant Dirty */
            this.informationModal = true;
            this.roomNotReady = false;
          } else {
            /* Handling Room Selain Vacant Dirty & Maybe Vacant Cleaned */
          }
        })();
      } else if (parseInt(rmStatus) == 2 || parseInt(rmStatus) == 3) {
        // Cek status kamar pertama kalo VD
        //console.log("VD");
        (async () => {
          const parsed = await ky
            .post(this.hotelEndpoint + "mobileCI/resCI", {
              json: {
                request: {
                  rsvNumber: this.currDataPrepare.resnr,
                  rsvlineNumber: this.currDataPrepare.reslinnr,
                  userInit: "01",
                  newRoomno: this.currDataPrepare.zinr,
                  purposeOfStay: this.form.getFieldValue("purpose"),
                  email: this.form.getFieldValue("email"),
                  guestPhnumber: this.form.getFieldValue("phone"),
                  guestNation: this.form.getFieldValue("nationality"),
                  guestCountry: this.form.getFieldValue("country"),
                  guestRegion: this.form.getFieldValue("region"),
                  base64image: this.imgb64,
                },
              },
            })
            .json();
          const responses = parsed.response["resultMessage"].split(" - ");
          // console.log('VD Not Assigned',parsed);
          this.responseStatus.statusNumber = responses[0];
          this.responseStatus.statusMessage = responses[1];
          //console.log(this.responseStatus.statusNumber,this.responseStatus.statusMessage);
          if (
            this.responseStatus.statusNumber == "99" ||
            this.responseStatus.statusNumber == "6" ||
            this.responseStatus.statusNumber == "7"
          ) {
            /* Handling Room Vacant Dirty */
            this.informationModal = true;
            this.roomNotReady = false;
          } else {
            /* Handling Room Selain Vacant Dirty & Maybe Vacant Cleaned */
            this.roomNotReady = true;
            const QRCodeData =
              "{" +
              this.currDataPrepare.zinr +
              ";" +
              moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
              "}";
            //this.check();
            //if (this.paymentStatus) {
            //console.log(this.paymentStatus);
            const data = {};
            data["QRCodeData"] = QRCodeData;
            data["wifiAddress"] = this.wifiAddress;
            data["wifiPassword"] = this.wifiPassword;
            data["arrangement"] = this.currDataPrepare["argt-str"];
            data["roomNotReady"] = this.roomNotReady;
            data["hotelcode"] = this.hotelcode;
            data["langID"] = this.langID;
            data["hotelname"] = this.hotelname;
            data["hotelImage"] = this.gambar;
            data["BackgroundColor"] = this.information.backgroundColor;
            data["FontColor"] = this.information.color;
            data["location"] = this.location;
            data["TotalData"] = this.TotalData;
            data["citime"] = this.currDataPrepare.ci;
            data["coDate"] = this.currDataPrepare.co;
            data["bookingcode"] = this.currDataPrepare.resnr;
            data["defaultCI"] = this.defaultCI;
            data["email"] = this.form.getFieldValue(["email"][0]);
            data["phone"] = this.form.getFieldValue(["phone"][0]);
            router.replace({
              name: "SuccessCheckIn",
              params: {
                Data: data,
              },
            });
          }
        })();
      } else {
        // Cek status kamar pertama kalo VC
        //console.log("VC");
        (async () => {
          // console.log(
          //   {
          //     rsvNumber: this.currDataPrepare.resnr,
          //     rsvlineNumber: this.currDataPrepare.reslinnr,
          //     userInit: "01",
          //     newRoomno: this.currDataPrepare.zinr,
          //     purposeOfStay: this.form.getFieldValue("purpose"),
          //     email: this.form.getFieldValue("email"),
          //     guestPhnumber: this.form.getFieldValue("phone"),
          //     guestNation: this.form.getFieldValue("nationality"),
          //     guestCountry: this.form.getFieldValue("country"),
          //     guestRegion: this.form.getFieldValue("region"),
          //     base64image: this.imgb64,
          //   },
          //   "inputan"
          // );

          const parsed = await ky
            .post(this.hotelEndpoint + "mobileCI/resCI", {
              json: {
                request: {
                  rsvNumber: this.currDataPrepare.resnr,
                  rsvlineNumber: this.currDataPrepare.reslinnr,
                  userInit: "01",
                  newRoomno: this.currDataPrepare.zinr,
                  purposeOfStay: this.form.getFieldValue("purpose"),
                  email: this.form.getFieldValue("email"),
                  guestPhnumber: this.form.getFieldValue("phone"),
                  guestNation: this.form.getFieldValue("nationality"),
                  guestCountry: this.form.getFieldValue("country"),
                  guestRegion: this.form.getFieldValue("region"),
                  base64image: this.imgb64,
                },
              },
            })
            .json();
          const responses = parsed.response["resultMessage"].split(" - ");
          // console.log('VC',parsed);
          this.responseStatus.statusNumber = responses[0];
          this.responseStatus.statusMessage = responses[1];
          //console.log(this.responseStatus.statusNumber,this.responseStatus.statusMessage);
          if (this.responseStatus.statusNumber == "99") {
            /* Handling Room Vacant Dirty */
            this.informationModal = true;
            this.roomNotReady = false;
          } else {
            /* Handling Room Selain Vacant Dirty & Maybe Vacant Cleaned */
            this.roomNotReady = true;
            const QRCodeData =
              "{" +
              this.currDataPrepare.zinr +
              ";" +
              moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
              "}";
            //this.check();
            //if (this.paymentStatus) {
            //console.log(this.paymentStatus);
            const data = {};
            data["QRCodeData"] = QRCodeData;
            data["wifiAddress"] = this.wifiAddress;
            data["wifiPassword"] = this.wifiPassword;
            data["arrangement"] = this.currDataPrepare["argt-str"];
            data["roomNotReady"] = this.roomNotReady;
            data["hotelcode"] = this.hotelcode;
            data["langID"] = this.langID;
            data["hotelname"] = this.hotelname;
            data["hotelImage"] = this.gambar;
            data["BackgroundColor"] = this.information.backgroundColor;
            data["FontColor"] = this.information.color;
            data["location"] = this.location;
            data["TotalData"] = this.TotalData;
            data["citime"] = this.currDataPrepare.ci;
            data["coDate"] = this.currDataPrepare.co;
            data["bookingcode"] = this.currDataPrepare.resnr;
            data["defaultCI"] = this.defaultCI;
            data["email"] = this.form.getFieldValue(["email"][0]);
            data["phone"] = this.form.getFieldValue(["phone"][0]);
            router.replace({
              name: "SuccessCheckIn",
              params: {
                Data: data,
              },
            });
          }
        })();
      }
    },
    handleYes() {
      const QRCodeData =
        "{" +
        this.currDataPrepare.zinr +
        ";" +
        moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
        "}";
      //this.check();
      //if (this.paymentStatus) {
      //console.log(this.paymentStatus);
      const data = {};
      data["QRCodeData"] = QRCodeData;
      data["wifiAddress"] = this.wifiAddress;
      data["wifiPassword"] = this.wifiPassword;
      data["arrangement"] = this.currDataPrepare["argt-str"];
      data["roomNotReady"] = this.roomNotReady;
      data["hotelcode"] = this.hotelcode;
      data["langID"] = this.langID;
      data["hotelname"] = this.hotelname;
      data["hotelImage"] = this.gambar;
      data["BackgroundColor"] = this.information.backgroundColor;
      data["FontColor"] = this.information.color;
      data["location"] = this.location;
      data["TotalData"] = this.TotalData;
      data["citime"] = this.currDataPrepare.ci;
      data["coDate"] = this.currDataPrepare.co;
      data["bookingcode"] = this.currDataPrepare.resnr;
      data["defaultCI"] = this.defaultCI;
      data["email"] = this.form.getFieldValue(["email"][0]);
      data["phone"] = this.form.getFieldValue(["phone"][0]);
      router.replace({
        name: "SuccessCheckIn",
        params: {
          Data: data,
        },
      });
    },
    back() {
      if (this.counter == this.id.length) {
        return false;
      }
      this.counter -= 1;
      this.currDataPrepare = this.id[this.counter];
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.muncul = false;
        this.keluar = false;
        this.guest = false;
        this.termcondition = false;
        this.confirmLoading = false;
      }, 300);
    },
    moment,
    disagree() {
      window.open(
        this.location,
        "_self"
      );
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
    handleBack() {
      window.open(this.location, "_self");
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