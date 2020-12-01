<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <!-- Modal Response Room Status -->
    <a-modal
      :title="weblabel.information"
      :visible="confirmMailModal"
      :confirm-loading="confirmLoading"
      :closable="false"
    >
      <div
        style="
          display: flex;
          justify-content: center;
          width: 100%;
          margin-bottom: 1rem;
        "
      >
        <img
          :src="require('@/assets/vhpkiosk.png')"
          alt="logovhpkiosk"
          width="200"
        />
      </div>
      <template slot="footer">
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleYes"
        >
          {{ weblabel.okMessage }}
          <q-spinner
            v-if="loadingConfirmEmail"
            style="margin-left: 10px"
            color="white"
            size="12px"
          />
        </a-button>
      </template>
      <p>{{ weblabel.mciSuccessNotReady }}</p>
      <p>{{ weblabel.reconfirmPhonemail }}</p>
      <div>
        <a-form layout="vertical" :form="formresubmit">
          <a-form-item :label="weblabel.phoneNumber">
            <q-input
              v-decorator="[
                'guest-phone',
                {
                  initialValue: currDataPrepare['guest-phnumber'],
                  rules: [
                    {
                      required: true,
                      message: weblabel.requiredPhone,
                    },
                  ],
                },
              ]"
              class="ant-input-h"
              outlined
              dense
            />
          </a-form-item>
          <a-form-item :label="weblabel.email">
            <q-input
              v-decorator="[
                'guest-email',
                {
                  initialValue: currDataPrepare['guest-email'],
                  rules: [
                    {
                      required: true,
                      message: weblabel.requiredEmail,
                    },
                    {
                      type: 'email',
                      message: weblabel.notValidEmail,
                    },
                  ],
                },
              ]"
              class="ant-input-h"
              type="email"
              outlined
              dense
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>

    <!-- Modal For Overlapping -->
    <a-modal
      :title="weblabel.information"
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
          >{{ weblabel.okMessage }}</a-button
        >
      </template>
      <p>{{ weblabel.mciErrorNotReady }}</p>
    </a-modal>

    <!-- Modal For Network Establish Error -->
    <a-modal
      :title="weblabel.information"
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
          >{{ weblabel.okMessage }}</a-button
        >
      </template>
      <p>{{ weblabel.mciErrorPreauth }}</p>
    </a-modal>

    <!-- Modal For Interface -->
    <a-modal
      :title="weblabel.information"
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
          >{{ weblabel.okMessage }}</a-button
        >
      </template>
      <p>{{ weblabel.mciErrorInterface }}</p>
    </a-modal>

    <!-- Modal For Payment Error -->
    <a-modal
      :title="weblabel.information"
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
          >{{ weblabel.okMessage }}</a-button
        >
      </template>
      <p>{{ weblabel.mciErrorPayment }}</p>
    </a-modal>

    <!-- Modal For Term And Condition -->
    <!-- <a-modal
        :title="weblabel.tcTitle"
        :visible="termcondition"
        :confirm-loading="confirmLoading"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="back" @click="disagree">
            {{ weblabel.disagree }}
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >{{ weblabel.agree }}</a-button
          >
        </template>
        <p>{{ terms }}</p>
      </a-modal> -->

    <q-dialog v-model="termcondition">
      <q-card>
        <q-card-section>
          <div class="text-h6" v-show="stepTerm === 1">
            {{ weblabel.tcTitle }}
          </div>
          <div class="text-h6" v-show="stepTerm === 2">Privacy Policy</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p style="white-space: pre-wrap" v-show="stepTerm == 1">
            {{ terms }}
          </p>
          <p style="white-space: pre-wrap" v-show="stepTerm == 1">
            {{ termSMOOKING }}
          </p>

          <p v-show="stepTerm == 2" v-html="policy"></p>
        </q-card-section>

        <q-separator />

        <q-card-actions style="display: flex; justify-content: space-between">
          <div>
            <q-btn
              v-if="stepTerm > 1"
              flat
              color="primary"
              @click="kurang()"
              label="Back"
            />
          </div>
          <div>
            <q-btn
              :label="weblabel.disagree"
              color="red"
              @click="disagree"
              style="margin-right: 5px"
            />
            <q-btn :label="weblabel.agree" color="primary" @click="handleOk" />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div :style="ota" class="row justify-between pt-2">
      <div class="text-center col-xs-12">
        <img class="logo_hotel" :src="hotelLogo" />
      </div>
      <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
        <p :style="textOta" class="mci-hotel">{{ hotelname }}</p>
      </div>
    </div>
    <div class="justify-around bg-white self-checkin">
      <div class="row q-mx-md">
        <div class="mt-3 col-md-7 col-xs-12 col-sm-6">
          <div class="col-4 label-guestname">{{ weblabel.guestName }}</div>
          <h6 class="font-weight-bold">{{ currDataPrepare["gast"] }}</h6>
        </div>
        <div class="mt-3 col-md-5 col-xs-12 col-sm-6">
          <div class="row">
            <div class="col-4">
              <p>{{ weblabel.bookCode }}</p>
            </div>
            <div class="col-8">
              <p>
                <strong>{{ this.currDataPrepare.resnr }}</strong>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p>{{ weblabel.stayPeriod }}</p>
            </div>
            <div class="col-8">
              <p>
                <strong>{{ weblabel.ciDate }} - {{ weblabel.coDate }}</strong>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p>{{ weblabel.roomNumber }}</p>
            </div>
            <div class="col-8">
              <p>
                <span style="margin-right: 3px !important"
                  ><strong>{{ currDataPrepare.zinr }}</strong></span
                >
                <a-tag
                  v-if="isMobile"
                  color="green"
                  style="
                    font-weight: normal !important;
                    margin-left: 0 !important;
                  "
                  >{{ this.currDataPrepare["rmtype-str"] }}</a-tag
                >
                <a-tag
                  v-else
                  color="green"
                  style="
                    font-weight: normal !important;
                    margin-left: 0 !important;
                  "
                  >{{ this.currDataPrepare["rmtype-str"] }}</a-tag
                >
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <p>{{ weblabel.roomShare }}</p>
            </div>
            <div class="col-8">
              <p>
                <q-chip
                  color="primary"
                  clickable
                  square
                  style="
                    background: white !important;
                    color: #262728 !important;
                    font-size: 0.6rem !important;
                    border: 1px solid gray;
                  "
                  v-if="this.currDataPrepare['rmshare'].length > 0"
                >
                  {{ weblabel.mciShow }}
                  <q-menu>
                    <q-banner>
                      <template v-slot:avatar>
                        <q-icon name="supervisor_account" color="primary" />
                      </template>
                      <p
                        v-for="rmShare in this.currDataPrepare['rmshare']"
                        :key="rmShare"
                        style="margin: 0 !important; text-size: 12px"
                      >
                        {{ rmShare }}
                      </p>
                    </q-banner>
                  </q-menu>
                </q-chip>
              </p>
            </div>
          </div>
        </div>
      </div>
      <q-separator inset />
      <div class="q-mx-md">
        <a-form layout="vertical" :form="form">
          <h2 class="text-center" v-show="step === 1">
            {{ weblabel.guestDetail }}
          </h2>
          <h2 class="text-center" v-show="step === 2">
            {{ weblabel.guestDetail }}
          </h2>
          <h2 class="text-center" v-show="step === 3">
            {{ weblabel.uploadID }}
          </h2>
          <h2 class="text-center" v-show="step === 4">
            {{ weblabel.depositPayment }}
          </h2>
          <div>
            <q-stepper
              v-model="step"
              flat
              bordered
              ref="stepper"
              contracted
              animated
              keep-alive
            >
              <q-step
                :name="1"
                title="Input Guest Detail"
                icon="person"
                active-icon="person"
                style="font-size: 3em"
                :done="step > 1"
              >
                <div class="steps-content">
                  <a-row class :gutter="[16, 8]">
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item :label="weblabel.email">
                        <q-input
                          class="ant-input-h"
                          outlined
                          dense
                          type="email"
                          v-decorator="[
                            'email',
                            {
                              initialValue: currDataPrepare['guest-email'],
                              rules: [
                                {
                                  required: true,
                                  message: weblabel.requiredEmail,
                                },
                                {
                                  type: 'email',
                                  message: weblabel.notValidEmail,
                                },
                              ],
                            },
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item :label="weblabel.phoneNumber">
                        <q-input
                          v-decorator="[
                            'phone',
                            {
                              initialValue: currDataPrepare['guest-phnumber'],
                              rules: [
                                {
                                  required: true,
                                  message: weblabel.requiredPhone,
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
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item :label="weblabel.purposeStay">
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
                            >{{ item.setupvalue }}</a-select-option
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
                style="font-size: 3em"
                :done="step > 2"
              >
                <div class="steps-content">
                  <a-row class :gutter="[16, 8]">
                    <a-col :span="5" :xl="5" :xs="24">
                      <a-form-item :label="weblabel.nationality">
                        <a-select
                          @focus="autoScrollNation"
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
                      <a-form-item :label="weblabel.countryOfResidence">
                        <a-select
                          @focus="autoScrollCountry"
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

                    <a-col :span="5" :xl="5" :xs="24">
                      <div v-if="country === 'INA' || country === 'ina'">
                        <a-form-item :label="weblabel.region">
                          <a-select
                            v-decorator="[
                              'region',
                              {
                                initialValue: currDataPrepare['guest-region'],
                                rules: [
                                  {
                                    required: true,
                                    message: weblabel.requiredProvince,
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
                        <a-form-item :label="weblabel.vehicleRegident">
                          <q-input
                            class="ant-input-h"
                            outlined
                            dense
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
                style="font-size: 3em"
                :done="step > 3"
              >
                <div class="steps-content">
                  <a-row class :gutter="[16, 8]">
                    <a-col class="text-center">
                      <a-form-item>
                        <input
                          style="display: none"
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
                                  message: weblabel.requiredID,
                                },
                              ],
                            },
                          ]"
                        />
                        <div style="margin-top: -50px">
                          <h1>{{ weblabel.idPhoto }}</h1>
                          <p>
                            {{ weblabel.idPhotoDesc }}
                          </p>
                        </div>
                        <img class="preview" v-if="url" :src="url" />
                        <div style="margin-top: 40px">
                          <q-btn
                            unelevated
                            rounded
                            @click="getFile"
                            color="primary"
                            label="Upload"
                            style="width: 200px"
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
                style="font-size: 3em"
                :done="step > 4"
              >
                <div class="steps-content">
                  <a-row :gutter="[16, 8]" v-if="pay == false">
                    <a-col :span="12" :xl="12" :xs="12">
                      <a-form-item :label="weblabel.depositPayment">
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
                        <q-form
                          action="https://staging.doku.com/Suite/Receive"
                          method="post"
                          ref="formDoku"
                        >
                          <q-input
                            name="AMOUNT"
                            :value="dokuData.amount"
                            style="display: none"
                          />
                          <q-input
                            name="BASKET"
                            :value="dokuData.basket"
                            style="display: none"
                          />
                          <q-input
                            name="CHAINMERCHANT"
                            :value="dokuData.chainMerchant"
                            style="display: none"
                          />
                          <q-input
                            name="CURRENCY"
                            :value="dokuData.currency"
                            style="display: none"
                          />
                          <q-input
                            name="EMAIL"
                            :value="dokuData.email"
                            style="display: none"
                          />
                          <q-input
                            name="MALLID"
                            :value="dokuData.mallid"
                            style="display: none"
                          />
                          <q-input
                            name="NAME"
                            :value="dokuData.name"
                            style="display: none"
                          />
                          <q-input
                            name="PAYMENTTYPE"
                            :value="dokuData.paymentType"
                            style="display: none"
                          />
                          <q-input
                            name="PURCHASEAMOUNT"
                            :value="dokuData.purchaseAmount"
                            style="display: none"
                          />
                          <q-input
                            name="PURCHASECURRENCY"
                            :value="dokuData.purchaseCurrency"
                            style="display: none"
                          />
                          <q-input
                            name="REQUESTDATETIME"
                            :value="dokuData.requestDatetime"
                            style="display: none"
                          />
                          <q-input
                            name="SESSIONID"
                            :value="dokuData.sessionID"
                            style="display: none"
                          />
                          <q-input
                            name="TRANSIDMERCHANT"
                            :value="dokuData.transIDMerchant"
                            style="display: none"
                          />
                          <q-input
                            name="WORDS"
                            :value="dokuData.words"
                            style="display: none"
                          />
                          <q-input
                            name="PAYMENTCHANNEL"
                            :value="dokuData.paymentChannel"
                            style="display: none"
                          />
                          <q-input
                            name="MOBILEPHONE"
                            :value="dokuData.mobilePhone"
                            style="display: none"
                          />
                          <q-btn
                            class="font-weight-bold mt-3 mr-3"
                            type="submit"
                            color="primary"
                            @click="handleDokuPayment"
                            :disabled="paid || paymentLoading"
                          >
                            {{ weblabel.pay }}
                            <q-spinner
                              v-if="paymentLoading"
                              style="margin-left: 10px"
                              color="primary"
                              size="12px"
                            />
                          </q-btn>
                        </q-form>
                      </div>
                    </a-col>
                  </a-row>
                  <a-row :gutter="[16, 8]" v-else>
                    <a-col :span="12" :xl="12" :xs="12">
                      <a-form-item :label="weblabel.deposit">
                        <h2>
                          <strong>{{ weblabel.cashBasis }}</strong>
                        </h2>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="[16, 8]" v-show="(skipDeposit = true)">
                    <div v-if="paid">
                      <p style="font-size: 16px; text-align: justify">
                        {{ weblabel.depositPaymentSuccess }}
                      </p>
                    </div>
                    <div v-else-if="paidNetworkError">
                      <p style="font-size: 16px; text-align: justify">
                        {{ weblabel.depositPaymentNetworkError }}
                      </p>
                    </div>
                    <div v-else-if="paidVerError">
                      <p style="font-size: 16px; text-align: justify">
                        {{ weblabel.depositPaymentVerError }}
                      </p>
                    </div>
                    <div v-if="!paid">
                      <q-checkbox
                        v-model="pay"
                        :label="weblabel.termCashBasis"
                        style="
                          font-size: 14px !important;
                          background: transparent !important;
                          color: #1b262c !important;
                        "
                        :disable="Deposit == 0"
                      />
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
                        {{ weblabel.prev }}
                      </q-btn>
                    </div>
                    <div v-if="step != steps.length" class="col-6 col-xs-6">
                      <q-btn
                        @click="next"
                        color="primary"
                        unelevated
                        class="float-right"
                      >
                        {{ weblabel.next }}
                      </q-btn>
                    </div>
                  </div>
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </div>
        </a-form>
        <div
          style="
            display: flex;
            width: 100%;
            height: 5em;
            justify-content: flex-end;
          "
        >
          <div class="divButtonMci" v-if="!paid">
            <a-button
              :xl="12"
              class="font-weight-bold mt-3 buttonMci"
              type="primary"
              block
              :size="size"
              @click="save"
              v-if="step == 4"
              html-type="submit"
              :disabled="!pay"
              >{{ weblabel.ciNow }}</a-button
            >
          </div>
          <div class="divButtonMci" v-else>
            <a-button
              :xl="12"
              class="font-weight-bold mt-3 buttonMci"
              type="primary"
              block
              :size="size"
              @click="save"
              v-if="step == 4"
              html-type="submit"
              >{{ weblabel.ciNow }}</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import router from "../router";
import Vue from "vue";
import { colors } from "quasar";
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
      roomReady: false,
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
      stepTerm: 1,
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
      defaultCountry: "",
      loadingConfirmEmail: false,
      dokuData: {
        amount: "",
        sharedKey: "rpT4jeLsWHHK",
        mallid: "11133679",
        basket: "",
        chainMerchant: "NA",
        email: "",
        name: "",
        paymentType: "AUTHORIZATION",
        purchaseAmount: "",
        purchaseCurrency: "360",
        currency: "360",
        requestDatetime: "",
        sessionID: "",
        transIDMerchant: "",
        words: "",
        paymentChannel: "15",
        mobilePhone: "",
      },
      weblabel: {
        // webla1
        information: "",
        okMessage: "",
        mciSuccessNotReady: "",
        reconfirmPhonemail: "",
        phoneNumber: "",
        requiredPhone: "",
        email: "",
        requiredEmail: "",
        notValidEmail: "",
        mciErrorNotReady: "",
        mciErrorPreauth: "",
        mciErrorInterface: "",
        mciErrorPayment: "",
        tcTitle: "",
        disagree: "",
        agree: "",
        arrival: "",
        departure: "",
        bookCode: "",
        roomNumber: "",
        guestDetail: "",
        uploadID: "",
        depositPayment: "",
        purposeStay: "",
        nationality: "",
        countryOfResidence: "",
        region: "",
        requiredProvince: "",
        vehicleRegident: "",
        requiredID: "",
        idPhoto: "",
        idPhotoDesc: "",
        pay: "",
        deposit: "",
        cashBasis: "",
        depositPaymentSuccess: "",
        depositPaymentNetworkError: "",
        depositPaymentVerError: "",
        termCashBasis: "",
        prev: "",
        next: "",
        ciNow: "",
        ciDate: "",
        coDate: "",
      },
      rmShareTooltip: true,
      afterPayment: false,
      termSMOOKING: "",
      conditionSMOOKING: false,
      textOta: {
        color: "",
        backgroundColor: "transparent",
      },
      ota: {
        backgroundColor: "",
        width: "100%",
        // height: "100vh",
        overflowX: "hidden",
        textAlign: "center",
      },
      policy: "",
      iconOta: {
        color: "",
      },
      isMobile: false,
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  created() {
    this.stepUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    this.currDataPrepare = this.$route.params.guestData;
    this.currDataSetting = this.$route.params.setting;
    // console.log("GuestData", this.currDataPrepare);
    // Detect Mobile Device
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    this.errorCode = "0000";
    if (this.currDataPrepare == null || this.currDataSetting == null) {
      if (location.search.substring(1) != undefined) {
        // For Handling Payment Callback
        //this.callbackParam = location.search.substring(1);
        let parameter = decodeURIComponent(location.search.substring(1));
        parameter = parameter.replaceAll(" ", "+");

        const passphrase = "System@1016";
        const bytes = CryptoJS.AES.decrypt(parameter, passphrase);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        originalText
          .split("&")
          .toString()
          .substr(0)
          .split(",")
          .forEach((item, index) => {
            let objProperty = "";
            let objValue = "";
            // Handling URI From Nicepay Callback
            objProperty = decodeURIComponent(item.split("=")[0]);
            objValue = decodeURIComponent(item.split("=")[1]);
            Object.assign(this.tempParam, { [objProperty]: objValue });
            this.callbackParam += `&${objProperty}=${objValue}`;
          });
        this.callbackParam = this.callbackParam.substring(1);
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
    this.termSMOOKING = this.currDataSetting["termSMOOKING"];
    this.information.backgroundColor = this.currDataSetting["BackgroundColor"];
    this.information.color = this.currDataSetting["FontColor"];
    this.ota.backgroundColor = this.currDataSetting["BackgroundColor"];
    this.iconOta.color = this.currDataSetting["BackgroundColor"] + "!important";
    colors.setBrand("primary", this.currDataSetting["BackgroundColor"]);
    this.gambar = this.currDataSetting["hotelImage"];
    this.hotelname = this.currDataSetting["hotelName"];
    this.hotelLogo = this.currDataSetting["hotelLogo"];
    this.minimumDeposit = this.currDataSetting["minimumDeposit"];
    this.maximumDeposit = this.currDataSetting["maximumDeposit"];
    this.OverNightDeposit = this.currDataSetting["OverNightDeposit"];
    this.TotalData = this.currDataSetting["TotalData"];
    this.paid = this.currDataPrepare["preAuth-flag"];
    this.per = this.currDataSetting["per"];
    this.FilterPurposeofStay = this.currDataSetting["FilterPurposeofStay"];
    this.freeParking = this.currDataSetting["freeParking"];
    this.region = this.currDataSetting["province"];
    this.countries = this.currDataSetting["countries"];
    this.defaultCountry = this.currDataSetting["defaultCountry"];
    this.wifiAddress = this.currDataSetting["wifiAddress"];
    this.textOta.color = this.currDataSetting["FontColor"];
    this.wifiPassword = this.currDataSetting["wifiPassword"];
    this.langID = this.currDataSetting["langID"];
    this.policy = this.currDataSetting["policy"];
    switch (this.langID.toLowerCase()) {
      case "eng":
        this.programLabel = "program-label1";
        this.policy = this.currDataSetting["policy"];
        break;
      case "idn":
        this.programLabel = "program-label2";
        this.policy = this.currDataSetting["policeTrans"];
        break;
      default:
        this.programLabel = "program-label1";
        this.policy = this.currDataSetting["policy"];
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
    // console.log('setting',this.currDataSetting);
    // router.push(this.location);
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
    this.Deposit == 0 ? (this.pay = true) : (this.pay = false);

    // DOKU First Param
    this.dokuData.amount = `${this.Deposit}.00`;
    this.dokuData.basket = `Deposit,${this.Deposit}.00,1,${this.Deposit}.00`;
    this.dokuData.email = this.currDataPrepare["guest-email"];
    this.dokuData.name = this.currDataPrepare["gast"].replace(/,/g, "");
    this.dokuData.purchaseAmount = `${this.Deposit}.00`;
    this.dokuData.mobilePhone = this.currDataPrepare["guest-phnumber"];
    // Handling Callback Payment and Save to Database
    if (this.tempParam.RESPONSECODE != null) {
      this.afterPayment = true;
      /** Handle DOKU */
      if (this.tempParam.RESPONSECODE == "0000") {
        this.currDataPrepare["preAuth-flag"] = true;
        // console.log('data',this.hotelEndpoint + "mobileCI/resCI");
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
            // console.log('Success',this.currDataPrepare["preAuth-flag"]);
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
      } else {
        this.paidNetworkError = false;
        this.paidVerError = true;
      }
    }
    /* Handle Stepper */
    // console.log(this.currDataPrepare["purposeofstay"],this.currDataPrepare["step"]);
    if (this.precheckin) {
      if (
        this.currDataPrepare["guest-email"] == "" ||
        this.currDataPrepare["guest-phnumber"] == "" ||
        this.currDataPrepare["purposeofstay"] == "" ||
        this.currDataPrepare["purposeofstay"] == "_"
      ) {
        this.currDataPrepare["step"] = 1;
        this.termcondition = true;
      } else if (
        this.currDataPrepare["guest-nation"] == "" ||
        this.currDataPrepare["guest-country"] == "" ||
        (this.currDataPrepare["guest-country"].toLowerCase() == "ina" &&
          this.currDataPrepare["guest-region"] == "")
      ) {
        this.currDataPrepare["step"] = 2;
        this.termcondition = true;
      } else if (
        this.freeParking == true &&
        this.currDataPrepare["vreg"] == ""
      ) {
        this.currDataPrepare["step"] = 2;
        this.termcondition = true;
      } else if (
        this.currDataPrepare["image-flag"] == "0 image id already exist"
      ) {
        this.currDataPrepare["step"] = 4;
        this.termcondition = false;
      } else {
        this.currDataPrepare["step"] = 3;
        this.termcondition = true;
      }
      this.step = this.currDataPrepare["step"];
    } else {
      // console.log('Not PCI',this.currDataPrepare["preAuth-flag"]);
      if (
        this.currDataPrepare["preAuth-flag"] == true ||
        this.afterPayment == true
      ) {
        this.currDataPrepare["step"] = 4;
        this.termcondition = false;
      } else {
        this.currDataPrepare["step"] = 1;
        this.termcondition = true;
      }
      this.step = this.currDataPrepare["step"];
    }
    this.loading = false;
    if (
      this.currDataPrepare["purposeofstay"] == "" ||
      this.currDataPrepare["purposeofstay"] == "_"
    ) {
      this.currDataPrepare["purposeofstay"] = this.currDataSetting[
        "PurposeofStay"
      ];
    }
    /* Handling Labeling */
    this.weblabel.information = this.findLabel("information", "titleCase");
    this.weblabel.roomShare = this.findLabel("room_share", "titleCase");
    this.weblabel.mciShow = this.findLabel("mci_show", "titleCase");
    this.weblabel.guestName = this.findLabel("guest_name", "titleCase");
    this.weblabel.okMessage = this.findLabel("ok_message", "upperCase");
    this.weblabel.mciSuccessNotReady = this.findLabel(
      "mci_success_not_ready",
      "sentenceCase"
    );
    this.weblabel.reconfirmPhonemail = this.findLabel(
      "reconfirm_phonemail",
      "sentenceCase"
    );
    this.weblabel.phoneNumber = this.findLabel("phone_number", "titleCase");
    this.weblabel.requiredPhone = this.findLabel("required_phone", "titleCase");
    this.weblabel.email = this.findLabel("email", "titleCase");
    this.weblabel.requiredEmail = this.findLabel(
      "required_email",
      "sentenceCase"
    );
    this.weblabel.notValidEmail = this.findLabel(
      "not_valid_email",
      "sentenceCase"
    );
    this.weblabel.mciErrorNotReady = this.findLabel(
      "mci_error_not_ready",
      "sentenceCase"
    );
    this.weblabel.mciErrorPreauth = this.findLabel(
      "mci_error_preauth",
      "sentenceCase"
    );
    this.weblabel.mciErrorInterface = this.findLabel(
      "mci_error_interface",
      "sentenceCase"
    );
    this.weblabel.mciErrorPayment = this.findLabel(
      "mci_error_payment",
      "sentenceCase"
    );
    this.weblabel.tcTitle = this.findLabel("t_c", "titleCase");
    this.weblabel.disagree = this.findLabel("disagree", "titleCase");
    this.weblabel.agree = this.findLabel("agree", "titleCase");
    this.weblabel.arrival = this.findLabel("arrival", "titleCase");
    this.weblabel.departure = this.findLabel("departure", "titleCase");
    this.weblabel.bookCode = this.findLabel("book_code", "titleCase");
    this.weblabel.roomNumber = this.findLabel("room_number", "titleCase");
    this.weblabel.guestDetail = this.findLabel("guest_detail", "titleCase");
    this.weblabel.uploadID = this.findLabel("upload_id", "titleCase");
    this.weblabel.depositPayment = this.findLabel(
      "deposit_payment",
      "titleCase"
    );
    this.weblabel.purposeStay = this.findLabel("purpose_stay", "titleCase");
    this.weblabel.nationality = this.findLabel("nationality", "titleCase");
    this.weblabel.countryOfResidence = this.findLabel(
      "country_of_residence",
      "titleCase"
    );
    this.weblabel.region = this.findLabel("region", "titleCase");
    this.weblabel.requiredProvince = this.findLabel(
      "required_province",
      "sentenceCase"
    );
    this.weblabel.vehicleRegident = this.findLabel(
      "vehicle_regident",
      "titleCase"
    );
    this.weblabel.requiredID = this.findLabel("required_id", "sentenceCase");
    this.weblabel.idPhoto = this.findLabel("id_photo", "titleCase");
    this.weblabel.idPhotoDesc = this.findLabel("id_photo_desc", "sentenceCase");
    this.weblabel.pay = this.findLabel("pay", "titleCase");
    this.weblabel.deposit = this.findLabel("deposit", "titleCase");
    this.weblabel.cashBasis = this.findLabel("cash_basis", "titleCase");
    this.weblabel.depositPaymentSuccess = this.findLabel(
      "deposit_payment_success",
      "sentenceCase"
    );
    this.weblabel.depositPaymentNetworkError = this.findLabel(
      "deposit_payment_network_error",
      "sentenceCase"
    );
    this.weblabel.depositPaymentVerError = this.findLabel(
      "deposit_payment_ver_error",
      "sentenceCase"
    );
    this.weblabel.termCashBasis = this.findLabel(
      "term_cash_basis",
      "sentenceCase"
    );
    this.weblabel.prev = this.findLabel("prev", "titleCase");
    this.weblabel.next = this.findLabel("next", "titleCase");
    this.weblabel.ciNow = this.findLabel("ci_now", "titleCase");
    this.weblabel.ciDate = this.formatDate(this.currDataPrepare.ci);
    this.weblabel.coDate = this.formatDate(this.currDataPrepare.co);
    this.weblabel.stayPeriod = this.findLabel("stay_period", "titleCase");
  },
  methods: {
    kurang() {
      this.stepTerm = this.stepTerm - 1;
    },
    findLabel(nameKey, used) {
      // console.log('FindLabel');
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
      return fixLabel;
    },
    async autoScrollNation() {
      // console.log('autoScrollNation');
      await this.$nextTick();
      if (this.currDataPrepare["guest-nation"] == "") {
        this.form.setFieldsValue({
          nationality: this.defaultCountry,
        });
        this.currDataPrepare["guest-nation"] = this.defaultCountry;
      }
    },
    async autoScrollCountry() {
      // console.log('autoScrollCountry');
      await this.$nextTick();
      if (this.currDataPrepare["guest-country"] == "") {
        this.form.setFieldsValue({
          country: this.defaultCountry,
        });
        this.country = this.defaultCountry;
        this.currDataPrepare["guest-country"] = this.defaultCountry;
      }
    },
    resendPreauth() {
      // console.log('resendPreauth');
      this.preauthModal = false;
      if (this.tempParam.RESPONSECODE != null) {
        this.afterPayment = true;
        /** Handle DOKU */
        // console.log('statusCode',this.tempParam.statuscode);
        if (this.tempParam.RESPONSECODE == "0000") {
          this.currDataPrepare["preAuth-flag"] = true;
          (async () => {
            // console.log('CallBack',this.callbackParam);
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
              // console.log('Success',this.currDataPrepare["preAuth-flag"]);
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
        } else {
          this.paidNetworkError = false;
          this.paidVerError = true;
        }
        /** Handle Nicepay */
        /*
        if (this.errorCode == "1004") {
          //this.tempParam.resultCd.substring(0, 1)        
          this.paidNetworkError = true;
          this.paidVerError = false;
        } else if (this.errorCode == "9002" || this.errorCode == "8021") {        
          this.paidNetworkError = true;
          this.paidVerError = false;
        } else {
          this.currDataPrepare["preAuth-flag"] = true;
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
              // console.log('Success',this.currDataPrepare["preAuth-flag"]);
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
        */
      }
    },
    async getFile() {
      // console.log('getFile');
      await this.$nextTick();
      this.$refs.fileurl.click();
    },
    handleArrayDate(date) {
      // console.log('handleArrayDate');
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
      // console.log('handleChange');
      this.errorCode = value;
    },
    handleChangeCountry(value) {
      // console.log('handleChangeCountry');
      this.country = value;
    },
    isNumber(evt) {
      // console.log('isNumber');
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
      // console.log('next');
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
      // console.log('prev');
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
    async handleDokuPayment() {
      await this.$nextTick();
      sessionStorage.setItem("guestData", JSON.stringify(this.currDataPrepare));
      sessionStorage.setItem("settings", JSON.stringify(this.currDataSetting));
      sessionStorage.setItem("errorCode", JSON.stringify(this.errorCode));
      // Get Latest Data
      this.dokuData.amount = `${this.Deposit}.00`;
      this.dokuData.basket = `Deposit,${this.Deposit}.00,1,${this.Deposit}.00`;
      this.dokuData.email = this.currDataPrepare["guest-email"];
      this.dokuData.name = this.currDataPrepare["gast"].replace(/,/g, "");
      this.dokuData.purchaseAmount = `${this.Deposit}.00`;
      this.dokuData.mobilePhone = this.currDataPrepare["guest-phnumber"];
      this.dokuData.requestDatetime = moment().format("YYYYMMDDHHmmss");
      this.dokuData.transIDMerchant =
        this.pad(this.currDataPrepare.resnr, 7) +
        moment().format("DDMMYYYYHHmmss");
      this.dokuData.words = CryptoJS.SHA1(
        `${this.dokuData.amount}${this.dokuData.mallid}${this.dokuData.sharedKey}${this.dokuData.transIDMerchant}`
      ).toString();
      this.dokuData.sessionID = CryptoJS.SHA1(
        this.dokuData.transIDMerchant
      ).toString();
      this.$refs.formDoku.submit();
    },
    pad(num, size) {
      num = num.toString();
      while (num.length < size) num = "0" + num;
      return num;
    },
    payDeposit() {
      // NICEPAY
      // console.log('payDeposit');
      this.paymentLoading = true;
      async function getIP() {
        const response = await fetch("http://api.ipify.org/?format=json");
        const ipdata = await response.json();
        return ipdata.ip;
      }
      getIP().then((dataip) => {
        this.ipAddr = dataip;
        // console.log(this.ipAddr);
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
            // console.log('after cors',data);
            const resp = data.contents.substr(
              data.contents.indexOf("{"),
              data.contents.length
            );
            this.resReg = JSON.parse(resp);
            // console.log(this.resReg);
            if (this.resReg.data["resultCd"] == "0000") {
              // console.log(this.resReg);
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
      // console.log('check');
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
      // console.log('closeModal');
      this.paymentModal = false;
    },
    hideAllModal() {
      // console.log('hideAllModal');
      this.confirmMailModal = false;
      this.termcondition = false;
      this.overlappingModal = false;
      this.paymenterrorModal = false;
      this.interfacingModal = false;
      this.preauthModal = false;
    },
    onFileChange(e) {
      // console.log('onFileChange');
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
      // console.log('onKeydown');
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    },
    scrollToTop() {
      // console.log('scrollToTop');
      window.scrollTo(0, 0);
      //this.step = 0;
    },
    checkValidation(caseType) {
      // console.log('checkValidation');
      // console.log("checkValidation is triggered");
      (async () => {
        const parsed = await ky
          .post(this.hotelEndpoint + "mobileCI/checkValidation", {
            json: {
              request: {
                rsvNumber: this.currDataPrepare["resnr"],
                rsvlineNumber: this.currDataPrepare["reslinnr"],
                caseType: caseType,
              },
            },
          })
          .json();
        // console.log(parsed);
        switch (caseType) {
          case "1":
            const responses = parsed.response["resStatus"].split(" - ");
            const responseStatus = {
              statusNumber: "",
              statusMessage: "",
            };
            responseStatus.statusNumber = responses[0];
            responseStatus.statusMessage = responses[1];
            if (responseStatus.statusNumber == "1") {
              //Reservation Already Check-In!
              // Go To Success Checkin
              Object.assign(this.currDataPrepare, { roomReady: true });
              // Session Storage Set
              sessionStorage.setItem(
                "guestData",
                JSON.stringify(this.currDataPrepare)
              );
              sessionStorage.setItem(
                "settings",
                JSON.stringify(this.currDataSetting)
              );
              router.push({
                name: "SuccessCheckIn",
                params: {
                  Data: this.currDataPrepare,
                  setting: this.currDataSetting,
                },
              });
            } else if (responseStatus.statusNumber == "0") {
              //Reservation Not Check-In Yet!
              this.handleResCi();
            }
            break;
          case "2":
            const responsess = parsed.response["paymentFlag"].split(" - ");
            if (parseInt(responsess[0]) == 0) {
              //this.payDeposit();
              this.payDeposit();
            } else {
              this.paid = true;
            }
            break;
          case "3":
            break;
          default:
            break;
        }
      })();
    },
    handleResCi() {
      // console.log('handleResCi');
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
        // console.log(parsed);
        const responses = parsed.response["resultMessage"].split(" - ");
        this.responseStatus.statusNumber = responses[0];
        this.responseStatus.statusMessage = responses[1];
        if (
          this.responseStatus.statusNumber == "99" ||
          this.responseStatus.statusNumber == "1" ||
          this.responseStatus.statusNumber == "2" ||
          this.responseStatus.statusNumber == "3" ||
          this.responseStatus.statusNumber == "4" ||
          this.responseStatus.statusNumber == "5"
        ) {
          // Showing Modal Cannot MCI -> mci_error_not_avail
        } else if (
          this.responseStatus.statusNumber == "6" ||
          this.responseStatus.statusNumber == "7"
        ) {
          this.confirmMailModal = true;
          this.roomReady = false;
        } else {
          Object.assign(this.currDataPrepare, { roomReady: true });
          // Session Storage Set
          sessionStorage.setItem(
            "guestData",
            JSON.stringify(this.currDataPrepare)
          );
          sessionStorage.setItem(
            "settings",
            JSON.stringify(this.currDataSetting)
          );
          router.push({
            name: "SuccessCheckIn",
            params: {
              Data: this.currDataPrepare,
              setting: this.currDataSetting,
            },
          });
        }
      })();
    },
    save() {
      // console.log('save');
      const rmStatus = this.currDataPrepare["room-status"].split(" ")[0];
      if (parseInt(rmStatus) == 1) {
        /* Overlapping */
        this.overlappingModal = true;
      } else {
        /* Room is Ready to Check in */
        this.checkValidation("1");
      }
    },
    handleYes() {
      // console.log('handleYes');
      this.loadingConfirmEmail = true;
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
        // Handling Interface WA atau SMS
        // console.log(data);
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
          // console.log(responses);
          if (this.responseStatus.statusNumber == 0) {
            Object.assign(this.currDataPrepare, { roomReady: false });
            // Session Storage Set
            sessionStorage.setItem(
              "guestData",
              JSON.stringify(this.currDataPrepare)
            );
            sessionStorage.setItem(
              "settings",
              JSON.stringify(this.currDataSetting)
            );
            router.push({
              name: "SuccessCheckIn",
              params: {
                Data: this.currDataPrepare,
                setting: this.currDataSetting,
              },
            });
          } else {
            // Handling Apabila Gagal Simpan ke Table Interface
            this.interfacingModal = true;
          }
          this.loadingConfirmEmail = false;
        })();
      }
    },
    back() {
      // console.log('back');
      if (this.counter == this.id.length) {
        return false;
      }
      this.counter -= 1;
      this.currDataPrepare = this.id[this.counter];
    },
    handleOk(e) {
      // console.log(this.stepTerm);
      if (this.stepTerm < 2) {
        this.stepTerm = this.stepTerm + 1;
      } else {
        // console.log('handleOk');
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
      }
    },
    disagree() {
      // console.log('disagree');
      window.open(this.location, "_self");
    },
    formatDate(datum) {
      // console.log('formatDate');
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
      // console.log('handleBack');
      window.open(this.location, "_self");
    },
    checkPayment() {
      // console.log('checkPayment');
      this.checkValidation("2");
    },
  },
  watch: {
    isIdle(newIdle, oldIdle) {
      if (newIdle == true || newIdle == "true") {
        window.open(this.location, "_self");
      }
      // console.log(`NewIdle ${newIdle}`,`OldIdle ${oldIdle}`);
    },
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
          // console.log('thishexa');
          return (
            "rgba(" +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
            ",1)"
          );
        }
        throw new Error("Bad Hex");
      };
    },
    isIdle() {
      return store.state.idleVue.isIdle;
    },
  },
};
</script>
