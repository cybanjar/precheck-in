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
        :visible="confirmMailModal"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleYes"
            >{{ getLabels("ok_message", `titleCase`) }}</a-button
          >
        </template>
        <p>{{ getLabels("mci_success_not_ready", `sentenceCase`) }}</p>
        <p>{{ getLabels("reconfirm_phonemail", `sentenceCase`) }}</p>
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
                        message: getLabels('required_phone', `titleCase`),
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
                      {
                        required: true,
                        message: getLabels('required_email', `sentenceCase`),
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
          </a-form>
        </div>
      </a-modal>

      <!-- Modal For Overlapping -->
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="overlappingModal"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="hideAllModal"
            >{{ getLabels("ok_message", `titleCase`) }}</a-button
          >
        </template>
        <p>{{ getLabels("mci_error_not_ready", `sentenceCase`) }}</p>
      </a-modal>

      <!-- Modal For Network Establish Error -->
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="preauthModal"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="resendPreauth"
            >{{ getLabels("ok_message", `titleCase`) }}</a-button
          >
        </template>
        <p>{{ getLabels("mci_error_preauth", `sentenceCase`) }}</p>
      </a-modal>

      <!-- Modal For Interface -->
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="interfacingModal"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="hideAllModal"
            >{{ getLabels("ok_message", `titleCase`) }}</a-button
          >
        </template>
        <p>{{ getLabels("mci_error_interface", `sentenceCase`) }}</p>
      </a-modal>

      <!-- Modal For Payment Error -->
      <a-modal
        :title="getLabels('information', `titleCase`)"
        :visible="paymenterrorModal"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="hideAllModal"
            >{{ getLabels("ok_message", `titleCase`) }}</a-button
          >
        </template>
        <p>{{ getLabels("mci_error_payment", `sentenceCase`) }}</p>
      </a-modal>

      <!-- Modal For Term And Condition -->
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
          <h2 v-show="step === 1">
            {{ getLabels("guest_detail", `titleCase`) }}
          </h2>
          <h2 v-show="step === 2">
            {{ getLabels("guest_detail", `titleCase`) }}
          </h2>
          <h2 v-show="step === 3">
            {{ getLabels("upload_id", `titleCase`) }}
          </h2>
          <h2 v-show="step === 4">
            {{ getLabels("deposit_payment", `titleCase`) }}
          </h2>
          <div>
            <q-stepper
              v-model="step"
              flat
              bordered
              ref="stepper"
              contracted
              color="primary"
              animated
              keep-alive
            >
              <q-step
                :name="1"
                title="Input Guest Detail"
                icon="person"
                active-icon="person"
                style="font-size: 3em;"
                :done="step > 1"
              >
                <div class="steps-content">
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
                              initialValue: currDataPrepare['purposeofstay'],
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
                :name="2"
                title="Input Address"
                icon="room"
                active-icon="room"
                style="font-size: 3em;"
                :done="step > 2"
              >
                <div class="steps-content">
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
                :name="3"
                title="Upload ID"
                caption="Optional"
                icon="portrait"
                active-icon="portrait"
                style="font-size: 3em;"
                :done="step > 3"
              >
                <div class="steps-content">
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
                :name="4"
                title="Deposit Payment"
                icon="payment"
                active-icon="payment"
                style="font-size: 3em;"
                :done="step > 4"
              >
                <div class="steps-content">
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
                      <div>
                        <a-form-item
                          label="Deposit Payment Response"
                          style="margin-top: 10px;"
                        >
                          <a-select
                            v-model="errorCode"
                            default-value="0000"
                            style="width: 180px;"
                            @change="handleChange"
                          >
                            <a-select-option value="0000">
                              Success
                            </a-select-option>
                            <a-select-option value="1004">
                              Connection timeout
                            </a-select-option>
                            <a-select-option value="9002">
                              Server is busy
                            </a-select-option>
                            <a-select-option value="8021">
                              Card authorization error
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </div>
                    </a-col>
                    <a-col :span="10" :xl="10" :xs="12">
                      <div>
                        <a-button
                          class="font-weight-bold mt-3 mr-3"
                          type="primary"
                          :disabled="paid || paymentLoading"
                          @click="payDeposit()"
                        >
                          {{ getLabels("pay", `titleCase`) }}
                          <q-spinner
                            v-if="paymentLoading"
                            style="margin-left: 10px;"
                            color="primary"
                            size="12px"
                          />
                        </a-button>
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
                    <div v-else-if="paidNetworkError">
                      <p style="font-size: 16px; text-align: justify;">
                        {{
                          getLabels(
                            "deposit_payment_network_error",
                            `sentenceCase`
                          )
                        }}
                      </p>
                    </div>
                    <div v-else-if="paidVerError">
                      <p style="font-size: 16px; text-align: justify;">
                        {{
                          getLabels("deposit_payment_ver_error", `sentenceCase`)
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
                    <div class="col-6 col-xs-6">
                      <q-btn
                        v-if="step > 1"
                        @click="prev"
                        outline
                        color="primary"
                      >
                        {{ getLabels("prev", `titleCase`) }}
                      </q-btn>
                    </div>
                    <div v-if="step != steps.length" class="col-6 col-xs-6">
                      <q-btn
                        @click="next"
                        color="primary"
                        unelevated
                        class="float-right"
                      >
                        {{ getLabels("next", `titleCase`) }}
                      </q-btn>
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
                    v-if="step == 4"
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
                    v-if="step == 4"
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
      step: 1,
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
      cek: "",
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
      setRegion: "",
      cities: "",
      filteredRegion: [],
      nationality: "Indonesia",
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
      confirmMailModal: false,
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
      overlappingModal: false,
      paymenterrorModal: false,
      paymentLoading: false,
      interfacingModal: false,
      preauthModal: false,
      currDataSetting: {},
      stepUrl: "",
      tempParam: {},
      callbackParam: "",
      paidNetworkError: false,
      paidVerError: false,
      errorCode: "",
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  created() {
    this.currDataPrepare = this.$route.params.guestData;
    this.currDataSetting = this.$route.params.setting;
    this.stepUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    this.errorCode = "0000";
    if (this.currDataPrepare == null || this.currDataSetting == null) {
      if (location.search.substring(1) != undefined) {
        // For Handling Payment Callback
        this.callbackParam = location.search.substring(1);
        location.search
          .split("&")
          .toString()
          .substr(1)
          .split(",")
          .forEach((item, index) => {
            let objProperty = "";
            let objValue = "";
            // Handling URI From Nicepay Callback
            objProperty = decodeURIComponent(item.split("=")[0]);
            objValue = decodeURIComponent(item.split("=")[1]);
            Object.assign(this.tempParam, { [objProperty]: objValue });
          });
      }
      if (sessionStorage.getItem("guestData") != null) {
        this.currDataPrepare = JSON.parse(sessionStorage.getItem("guestData"));
      }
      if (sessionStorage.getItem("settings") != null) {
        this.currDataSetting = JSON.parse(sessionStorage.getItem("settings"));
      }
      if (sessionStorage.getItem("errorCode") != null) {
        this.errorCode = JSON.parse(sessionStorage.getItem("errorCode"));
      }
    }
    this.url = require(`../assets/PassportVerification.svg`);
    this.labels = JSON.parse(localStorage.getItem("labels"));
    this.precheckin = this.currDataPrepare["pre-checkin"];
    this.hasUpload = this.currDataPrepare["image-flag"];
    this.country = this.currDataPrepare["guest-country"];
    this.currency = this.currDataPrepare["currency-usage"];
    this.term = this.currDataSetting["termENG"];
    this.term1 = this.currDataSetting["termIDN"];
    this.information.backgroundColor = this.currDataSetting["BackgroundColor"];
    this.information.color = this.currDataSetting["FontColor"];
    this.gambar = this.currDataSetting["hotelImage"];
    this.hotelname = this.currDataSetting["hotelName"];
    this.minimumDeposit = this.currDataSetting["minimumDeposit"];
    this.maximumDeposit = this.currDataSetting["maximumDeposit"];
    this.OverNightDeposit = this.currDataSetting["OverNightDeposit"];
    this.TotalData = this.currDataSetting["TotalData"];
    this.paid = this.currDataPrepare["preAuth-flag"];
    this.per = this.currDataSetting["per"];
    this.FilterPurposeofStay = this.currDataSetting["FilterPurposeofStay"];
    this.freeParking = this.currDataSetting["freeParking"];
    if (this.currDataPrepare["purposeofstay"] == "") {
      this.currDataPrepare["purposeofstay"] = this.currDataSetting[
        "PurposeofStay"
      ];
    }
    this.region = this.currDataSetting["province"];
    this.countries = this.currDataSetting["countries"];
    this.wifiAddress = this.currDataSetting["wifiAddress"];
    this.wifiPassword = this.currDataSetting["wifiPassword"];
    this.langID = this.currDataSetting["langID"];
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
    this.hotelEndpoint = this.currDataSetting["hotelEndpoint"];
    this.hotelcode = this.currDataSetting["hotelCode"];
    this.location = this.currDataSetting["location"];
    this.defaultCI = this.currDataSetting["defaultCI"];
    this.filteredRegion = this.region;
    this.FilterCountry = this.countries;
    if (this.langID == "ENG" || this.langID == "eng") {
      this.terms = this.term;
    } else {
      this.terms = this.term1;
    }
    /* Handle Stepper */
    if (
      this.currDataPrepare["step"] == undefined ||
      this.currDataPrepare["step"] == ""
    ) {
      // If not define yet
      if (this.currDataPrepare["image-flag"] == "0 image id already exist") {
        this.currDataPrepare["step"] = 4;
        this.termcondition = false;
      } else {
        if (this.precheckin) {
          this.currDataPrepare["step"] = 3;
          this.termcondition = false;
        } else {
          this.currDataPrepare["step"] = 1;
          this.termcondition = true;
        }
      }
      this.step = this.currDataPrepare["step"];
    } else {
      if (this.currDataPrepare["image-flag"] == "0 image id already exist") {
        this.currDataPrepare["step"] = 4;
        this.termcondition = false;
      } else {
        if (this.precheckin) {
          this.currDataPrepare["step"] = 3;
          this.termcondition = false;
        } else {
          this.currDataPrepare["step"] = 1;
          this.termcondition = true;
        }
      }
      this.step = this.currDataPrepare["step"];
    }
    this.loading = false;
    //console.log('setting',this.currDataSetting);
    // router.replace(this.location);
    /* Handling Deposit Other Value */
    const ciDate = moment(this.handleArrayDate(this.currDataPrepare["ci"]));
    const coDate = moment(this.handleArrayDate(this.currDataPrepare["co"]));
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
    // Handling Callback Payment and Save to Database
    if (this.tempParam.resultCd != null) {
      if (this.errorCode == "1004") {
        //this.tempParam.resultCd.substring(0, 1)
        /* Payment Gateway Network Error */
        this.paidNetworkError = true;
        this.paidVerError = false;
      } else if (this.errorCode == "9002" || this.errorCode == "8021") {
        /* Payment Gateway Network Error */
        this.paidNetworkError = true;
        this.paidVerError = false;
      } else {
        (async () => {
          const data = await ky
            .post(this.hotelEndpoint + "mobileCI/resCI", {
              json: {
                request: {
                  rsvNumber: this.currDataPrepare["resnr"],
                  rsvlineNumber: this.currDataPrepare["reslinnr"],
                  userInit: "MC",
                  newRoomno: "",
                  purposeOfStay: "",
                  email: "",
                  guestPhnumber: "",
                  guestNation: "",
                  guestCountry: "",
                  guestRegion: "",
                  base64image: "",
                  vehicleNumber: "",
                  preAuthString: this.callbackParam,
                },
              },
            })
            .json();
          const responses = data.response["resultMessage"].split(" - ");
          if (parseInt(responses[0]) > 0) {
            this.preauthModal = true;
          } else {
            this.currDataPrepare["preAuth-flag"] = true;
            this.paid = this.currDataPrepare["preAuth-flag"];
            this.paidNetworkError = false;
            this.paidVerError = false;
            // console.log(this.currDataPrepare);
            // Session Storage Set
            sessionStorage.setItem(
              "guestData",
              JSON.stringify(this.currDataPrepare)
            );
            sessionStorage.setItem(
              "settings",
              JSON.stringify(this.currDataSetting)
            );
          }
        })();
      }
    }
  },
  methods: {
    resendPreauth() {
      this.preauthModal = false;
      if (this.tempParam.resultCd != null) {
        if (this.errorCode == "1004") {
          //this.tempParam.resultCd.substring(0, 1)
          /* Payment Gateway Network Error */
          this.paidNetworkError = true;
          this.paidVerError = false;
        } else if (this.errorCode == "9002" || this.errorCode == "8021") {
          /* Payment Gateway Network Error */
          this.paidNetworkError = true;
          this.paidVerError = false;
        } else {
          (async () => {
            const data = await ky
              .post(this.hotelEndpoint + "mobileCI/resCI", {
                json: {
                  request: {
                    rsvNumber: this.currDataPrepare["resnr"],
                    rsvlineNumber: this.currDataPrepare["reslinnr"],
                    userInit: "MC",
                    newRoomno: "",
                    purposeOfStay: "",
                    email: "",
                    guestPhnumber: "",
                    guestNation: "",
                    guestCountry: "",
                    guestRegion: "",
                    base64image: "",
                    vehicleNumber: "",
                    preAuthString: this.callbackParam,
                  },
                },
              })
              .json();
            const responses = data.response["resultMessage"].split(" - ");
            if (parseInt(responses[0]) > 0) {
              this.preauthModal = true;
            } else {
              this.currDataPrepare["preAuth-flag"] = true;
              this.paid = this.currDataPrepare["preAuth-flag"];
              this.paidNetworkError = false;
              this.paidVerError = false;
              // console.log(this.currDataPrepare);
              // Session Storage Set
              sessionStorage.setItem(
                "guestData",
                JSON.stringify(this.currDataPrepare)
              );
              sessionStorage.setItem(
                "settings",
                JSON.stringify(this.currDataSetting)
              );
            }
          })();
        }
      }
    },
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
    handleChange(value) {
      this.errorCode = value;
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
      switch (this.step) {
        case 1:
          const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (this.form.getFieldValue(["email"][0]) == "") {
            this.form.validateFields(["email"]);
          } else if (this.form.getFieldValue(["phone"][0]) == "") {
            this.form.validateFields(["phone"]);
          } else if (!this.form.getFieldValue(["email"][0]).match(mailformat)) {
            this.form.validateFields(["email"]);
          } else {
            /* Re-Submit The Variable */
            this.currDataPrepare["guest-email"] = this.form.getFieldValue(
              ["email"][0]
            );
            this.currDataPrepare["guest-phnumber"] = this.form.getFieldValue(
              ["phone"][0]
            );
            this.currDataPrepare["purposeofstay"] = this.form.getFieldValue(
              ["purpose"][0]
            );
            /* Go To Next Step */
            this.$refs.stepper.next();
          }
          break;
        case 2:
          if (this.form.getFieldValue(["nationality"][0]) == "") {
            this.form.validateFields(["nationality"]);
          } else if (this.form.getFieldValue(["country"][0]) == "") {
            this.form.validateFields(["country"]);
          } else if (
            this.form.getFieldValue(["country"][0]).toLowerCase() == "ina" &&
            this.form.getFieldValue(["region"][0]) == ""
          ) {
            this.form.validateFields(["region"]);
          } else {
            /* Re-Submit The Variable */
            this.currDataPrepare["guest-nation"] = this.form.getFieldValue(
              ["nationality"][0]
            );
            this.currDataPrepare["guest-country"] = this.form.getFieldValue(
              ["country"][0]
            );
            this.currDataPrepare["guest-region"] = this.form.getFieldValue(
              ["region"][0]
            );
            this.currDataPrepare["vreg"] = this.form.getFieldValue(
              ["vRegident"][0]
            );
            /* Go To Next Step */
            if (this.hasUpload == "0 image id already exist") {
              this.$refs.stepper.goTo(4);
            } else {
              this.$refs.stepper.next();
            }
          }
          break;
        case 3:
          if (this.form.getFieldValue(["url"][0]) == "") {
            this.form.validateFields(["url"]);
          } else {
            this.$refs.stepper.next();
          }
          break;
        case 4:
          break;
        default:
          break;
      }
    },
    prev() {
      switch (this.step) {
        case 4:
          if (!this.precheckin) {
            /* Go To Next Step */
            if (this.hasUpload == "0 image id already exist") {
              this.$refs.stepper.goTo(2);
            } else {
              this.$refs.stepper.previous();
            }
          } else {
            /* Go To Next Step */
            if (this.hasUpload == "0 image id already exist") {
              this.$refs.stepper.goTo(2);
            } else {
              this.$refs.stepper.previous();
            }
          }
          break;
        case 3:
          this.$refs.stepper.previous();
          break;
        case 2:
          this.$refs.stepper.previous();
          break;
        case 1:
          break;
        default:
          break;
      }
    },
    payDeposit() {
      this.paymentLoading = true;
      async function getIP() {
        const response = await fetch("http://api.ipify.org/?format=json");
        const ipdata = await response.json();
        return ipdata.ip;
      }
      getIP().then((dataip) => {
        this.ipAddr = dataip;
        //console.log(this.ipAddr);
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
          this.currDataPrepare["guest-phnumber"] +
          "&billingEmail=" +
          this.currDataPrepare["guest-email"] +
          "&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" +
          token.toString() +
          "&userIP=" +
          this.ipAddr +
          `&cartData={}&callBackUrl=${this.stepUrl}` +
          "&instmntType=1&instmntMon=1&reccurOpt=0&paymentExpTm=000100";
        // const datas = {
        //   codate: this.formatDate(this.currDataPrepare["co"]),
        //   userInit: "01",
        //   resrNumber: this.currDataPrepare["resnr"],
        //   resLineNumber: this.currDataPrepare["reslinnr"],
        //   guestEmail: this.currDataPrepare["guest-email"],
        //   guestPhnumber: this.currDataPrepare["guest-phnumber"],
        //   purposeOfStay: this.currDataPrepare["purposeofstay"],
        //   guestNation: this.currDataPrepare["guest-nation"],
        //   guestCountry: this.currDataPrepare["guest-country"],
        //   guestRegion: this.currDataPrepare["guest-region"],
        //   step: this.step,
        //   vreg: this.currDataPrepare["vreg"],
        //   location: this.location,
        // };
        // CookieS.set("data", datas);
        // Session Storage Set
        sessionStorage.removeItem("guestData");
        sessionStorage.removeItem("settings");
        sessionStorage.removeItem("errorCode");
        sessionStorage.setItem(
          "guestData",
          JSON.stringify(this.currDataPrepare)
        );
        sessionStorage.setItem(
          "settings",
          JSON.stringify(this.currDataSetting)
        );
        sessionStorage.setItem("errorCode", JSON.stringify(this.errorCode));
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
            //console.log('after cors',data);
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
              this.paymentLoading = false;
              this.paymenterrorModal = true; // Harus Di handle pop up modal
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
    hideAllModal() {
      this.confirmMailModal = false;
      this.termcondition = false;
      this.overlappingModal = false;
      this.paymenterrorModal = false;
      this.interfacingModal = false;
      this.preauthModal = false;
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
        // this.url = event.target.result;
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
          // Convert to Grayscale
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imgData.data;
          for (let i = 0; i < d.length; i += 4) {
            // get the medium of the 3 first values ( (r+g+b)/3 )
            const med = (d[i] + d[i + 1] + d[i + 2]) / 3;
            // set it to each value (r = g = b = med)
            d[i] = d[i + 1] = d[i + 2] = med;
            // we don't touch the alpha
          }
          // redraw the new computed image
          ctx.putImageData(imgData, 0, 0);
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
                    inpResnr: this.currDataPrepare["resnr"],
                    inpReslinnr: this.currDataPrepare["reslinnr"],
                    guestno: this.currDataPrepare["gastno"],
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
          this.currDataPrepare["image-flag"] = this.hasUpload;
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
      //this.step = 0;
    },
    checkValidation(caseType){
      (async () => {
        const parsed = await ky
          .post(this.hotelEndpoint + "mobileCI/mobileCI/checkValidation", {
            json: {
              request: {
                rsvNumber: this.currDataPrepare["resnr"],
                rsvlineNumber: this.currDataPrepare["reslinnr"],
                caseType: caseType,
              },
            },
          })
          .json();
        switch(caseType){
          case "1":
            break;
          case "2":            
            break;
          case "3":
            break;
          default:
            break;
        }
      })();
    },
    handleResCi() {
      if (this.currDataPrepare["vreg"] == null) {
        this.currDataPrepare["vreg"] = "";
      }
      (async () => {
        const parsed = await ky
          .post(this.hotelEndpoint + "mobileCI/resCI", {
            json: {
              request: {
                rsvNumber: this.currDataPrepare["resnr"],
                rsvlineNumber: this.currDataPrepare["reslinnr"],
                userInit: "MC",
                newRoomno: this.currDataPrepare["zinr"],
                purposeOfStay: this.currDataPrepare["purposeofstay"],
                email: this.currDataPrepare["guest-email"],
                guestPhnumber: this.currDataPrepare["guest-phnumber"],
                guestNation: this.currDataPrepare["guest-nation"],
                guestCountry: this.currDataPrepare["guest-country"],
                guestRegion: this.currDataPrepare["guest-region"],
                vehicleNumber: this.currDataPrepare["vreg"],
                base64image: this.imgb64,
              },
            },
          })
          .json();
        const responses = parsed.response["resultMessage"].split(" - ");
        this.responseStatus.statusNumber = responses[0];
        this.responseStatus.statusMessage = responses[1];
        if (this.responseStatus.statusNumber == "99" || 
            this.responseStatus.statusNumber == "1" ||
            this.responseStatus.statusNumber == "2" ||
            this.responseStatus.statusNumber == "3" ||
            this.responseStatus.statusNumber == "4" ||
            this.responseStatus.statusNumber == "5"
        ){
          // Showing Modal Cannot MCI -> mci_error_not_avail
        }
        else if(
            this.responseStatus.statusNumber == "6" ||
            this.responseStatus.statusNumber == "7"
        ){
          this.confirmMailModal = true;
          this.roomNotReady = false;
        } else {
          // MUST HANDLE checkValidation
          this.roomNotReady = true;
          const QRCodeData =
            "{" +
            this.currDataPrepare.zinr +
            ";" +
            moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
            "}";
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
          data["citime"] = this.currDataPrepare["ci"];
          data["coDate"] = this.currDataPrepare["co"];
          data["bookingcode"] = this.currDataPrepare["resnr"];
          data["defaultCI"] = this.defaultCI;
          data["email"] = this.currDataPrepare["guest-email"];
          data["phone"] = this.currDataPrepare["guest-phnumber"];
          router.replace({
            name: "SuccessCheckIn",
            params: {
              Data: data,
              Setting: this.currDataSetting,
            },
          });
        }
      })();
    },
    save() {
      const rmStatus = this.currDataPrepare["room-status"].split(" ")[0];
      if (parseInt(rmStatus) == 1) {
        /* Overlapping */
        this.overlappingModal = true;
      } else {
        /* Room is Ready to Check in */
        this.handleResCi(); //disederhanakan ke atas.
      }
    },
    handleYes() {
      // MUST HANDLE checkValidation
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.formresubmit.getFieldValue(["guest-email"][0]) == "") {
        this.formresubmit.validateFields(["guest-email"]);
      } else if (this.formresubmit.getFieldValue(["guest-phone"][0]) == "") {
        this.formresubmit.validateFields(["guest-phone"]);
      } else if (
        !this.formresubmit.getFieldValue(["guest-email"][0]).match(mailformat)
      ) {
        this.formresubmit.validateFields(["guest-email"]);
      } else {
        this.currDataPrepare["guest-email"] = this.formresubmit.getFieldValue(
          ["guest-email"][0]
        );
        this.currDataPrepare[
          "guest-phnumber"
        ] = this.formresubmit.getFieldValue(["guest-phone"][0]);
        const QRCodeData =
          "{" +
          this.currDataPrepare.zinr +
          ";" +
          moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
          "}";
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
        data["citime"] = this.currDataPrepare["ci"];
        data["coDate"] = this.currDataPrepare["co"];
        data["bookingcode"] = this.currDataPrepare["resnr"];
        data["defaultCI"] = this.defaultCI;
        data["email"] = this.currDataPrepare["guest-email"];
        data["phone"] = this.currDataPrepare["guest-phnumber"];
        // Handling Interface WA atau SMS
        //console.log(data);
        (async () => {
          const parsed = await ky
            .post(this.hotelEndpoint + "mobileCI/createInterface", {
              json: {
                request: {
                  rsvNumber: this.currDataPrepare["resnr"],
                  rsvlineNumber: this.currDataPrepare["reslinnr"],
                  userInit: "MC",
                  email: this.currDataPrepare["guest-email"],
                  guestPhnumber: this.currDataPrepare["guest-phnumber"],
                  hotelCode: `${this.hotelcode}|${this.langID}`,
                  roomPreference: this.currDataPrepare["room-preference"],
                  urlMCI: this.location,
                },
              },
            })
            .json();
          const responses = parsed.response["resultMessage"];
          this.responseStatus.statusNumber = responses[0];
          this.responseStatus.statusMessage = responses[1];
          //console.log(responses);
          if (this.responseStatus.statusNumber == 0) {
            router.replace({
              name: "SuccessCheckIn",
              params: {
                Data: data,
                Setting: this.currDataSetting,
              },
            });
          } else {
            // Handling Apabila Gagal Simpan ke Table Interface
            this.interfacingModal = true;
          }
        })();
      }
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
      window.open(this.location, "_self");
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