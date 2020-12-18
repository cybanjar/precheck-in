<template>
  <div>
    <div :style="ota" class="row justify-between pt-2">
      <div class="text-center col-xs-12">
        <img class="logo_hotel" :src="hotelLogo" />
      </div>
      <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
        <p :style="textOta" class="mci-hotel">{{ hotelname }}</p>
      </div>
    </div>
    <div class="justify-around bg-white self-checkin precheckin-body">
      <div class="row">
        <div class="col-md-7 col-sm-6 col-xs-12">
          <div class="mt-3 row">
            <div class="col-md-12 col-xs-12 col-sm-12">
              <div class="col-4 label-guestname">
                {{ getLabels("guest_name", "titleCase") }}
              </div>
              <h6 class="font-weight-bold">
                {{ this.currDataPrepare["guest-fname"] || "" }}
                {{ this.currDataPrepare["guest-lname"] || "" }},
                {{ this.currDataPrepare["guest-pname"] || "" }}
              </h6>
            </div>
          </div>
        </div>
        <div class="col-md-5 col-sm-5 col-xs-12">
          <div class="mt-3 row pci-guest-info q-col-gutter-xs">
            <div class="col-xs-5 col-sm-5 col-md-5">
              <p>{{ getLabels("book_code", "titleCase") }}</p>
            </div>
            <div class="col-xs-7 col-sm-7 col-md-7">
              <p>
                <strong>{{ this.currDataPrepare["rsv-number"] }}</strong>
              </p>
            </div>
          </div>
          <div class="row pci-guest-info">
            <div class="col-xs-5 col-sm-5 col-md-5">
              <p>{{ getLabels("stay_period", "titleCase") }}</p>
            </div>
            <div class="col-xs-7 col-sm-7 col-md-7">
              <p>
                <strong
                  >{{ formatDate(currDataPrepare.arrive) }} -
                  {{ formatDate(currDataPrepare.depart) }}</strong
                >
              </p>
            </div>
          </div>
          <div class="row pci-guest-info">
            <div class="col-xs-5 col-sm-5 col-md-5">
              <p>{{ getLabels("package", "titleCase") }}</p>
            </div>
            <div class="col-xs-7 col-sm-7 col-md-7">
              <p>
                <!-- <strong>{{ this.currDataPrepare }}</strong> -->
                <a-tag color="green" style="font-weight: normal !important">{{
                  this.currDataPrepare["argt-code"]
                }}</a-tag>
              </p>
            </div>
          </div>
          <div class="row pci-guest-info">
            <div class="col-xs-5 col-sm-5 col-md-5">
              <p>{{ getLabels("room_share", "titleCase") }}</p>
            </div>
            <div class="col-xs-7 col-sm-7 col-md-7">
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
                    margin: 0 !important;
                  "
                  v-if="this.currDataPrepare['rmshare'].length > 0"
                >
                  {{ getLabels("mci_show", "titleCase") }}
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
      <div>
        <q-separator inset />
      </div>
      <div>
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <div class="row formChild">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <a-card class="header-card">
                <a-row>
                  <a-col :span="23" :xl="23" :xs="23">
                    <p class="header-group">
                      {{ getLabels("arrival", `titleCase`) }}
                    </p>
                  </a-col>
                </a-row>
              </a-card>
            </div>
          </div>
          <div class="row formChild q-col-gutter-lg">
            <div
              class="col-md-2 col-sm-3 col-xs-12"
              style="margin-bottom: -30px !important"
            >
              <a-form-item
                layout="vertical"
                :label="getLabels('eta', `titleCase`)"
              >
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
                          @input="$refs.qDateProxy.hide()"
                        >
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </a-form-item>
            </div>
            <div
              class="col-md-3 col-sm-3 col-xs-12"
              v-show="showPickupRequest"
              style="margin-bottom: -30px !important"
            >
              <a-form-item :label="getLabels('request', `titleCase`)">
                <a-checkbox :checked="showPrice" v-model="showPrice">{{
                  getLabels("pick_req", `titleCase`)
                }}</a-checkbox>
              </a-form-item>
            </div>
            <div
              class="col-md-2 col-sm-3 col-xs-12"
              v-show="showPickupRequest"
              style="margin-bottom: -30px !important"
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
            </div>
            <div
              class="col-md-5 col-sm-3 col-xs-12"
              v-show="showPrice && showPickupRequest"
              style="margin-bottom: -30px !important"
            >
              <a-form-item :label="getLabels('pick_detail', 'titleCase')">
                <a-input
                  class="ant-input-h"
                  v-decorator="[
                    'flight',
                    { rules: [{ required: showPrice == true ? true : false }] },
                  ]"
                />
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <a-form-item :label="getLabels('room_pref', 'titleCase')">
              <a-radio-group
                v-model="room"
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
          </div>
          <div class="row">
            <a-form-item label>
              <a-radio-group
                v-model="floor"
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
          </div>
          <div class="row">
            <a-form-item label>
              <a-radio-group
                name="radioGroup"
                v-model="bed"
                v-show="showBed"
                @change="Bed"
              >
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
          </div>
          <div class="row formChild q-col-gutter-md">
            <div class="col-md-6 col-sm-6 col-xs-10">
              <a-form-item
                :label="getLabels('special_request', `titleCase`)"
                style="margin-bottom: 0 !important"
              >
                <a-textarea
                  :rows="4"
                  :max-length="max"
                  v-model="text"
                  style="padding-bottom: 0 !important"
                />
              </a-form-item>
            </div>
            <div
              class="col-md-2 col-sm-2 col-xs-2"
              style="display: flex; align-items: flex-end"
            >
              <span v-text="text.length + '/' + max"></span>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12"></div>
          </div>
          <div class="row formChild">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <a-card class="header-card">
                <a-row>
                  <a-col :span="23" :xl="23" :xs="23">
                    <p class="header-group">
                      {{ getLabels("guest_detail", `titleCase`) }}
                    </p>
                  </a-col>
                </a-row>
              </a-card>
            </div>
          </div>
          <div class="row formChild q-col-gutter-md">
            <div class="col-md-3 col-sm-3 col-xs-12">
              <a-form-item
                :label="getLabels('email', `titleCase`)"
                style="margin-bottom: 0 !important"
                v-if="email != ''"
              >
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
              <a-form-item
                :label="getLabels('email', `titleCase`)"
                style="margin-bottom: 0 !important"
                v-else
              >
                <a-input
                  class="ant-input-h"
                  v-decorator="[
                    'email',
                    {
                      initialValue: currDataPrepare['guest-email'],
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
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
              <a-form-item
                :label="getLabels('phone_number', `titleCase`)"
                style="margin-bottom: 0 !important"
              >
                <q-input
                  v-decorator="[
                    'phone',
                    {
                      initialValue: phone,
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
                  mask="################"
                />
              </a-form-item>
            </div>
          </div>
          <div class="row formChild q-col-gutter-md">
            <div class="col-md-3 col-sm-3 col-xs-12">
              <a-form-item
                :label="getLabels('purpose_stay', `titleCase`)"
                style="margin-bottom: 0 !important"
              >
                <a-select
                  v-decorator="[
                    'purpose',
                    { initialValue: purpose, rules: [{ required: true }] },
                  ]"
                >
                  <a-select-option
                    v-for="item in FilterPurposeofStay"
                    :key="item.setupvalue"
                    :value="item.setupvalue"
                    >{{
                      getLabels(item.setupvalue.toLowerCase(), "titleCase")
                    }}</a-select-option
                  >
                </a-select>
              </a-form-item>
            </div>
          </div>
          <div class="row formChild q-col-gutter-md">
            <div class="col-md-3 col-sm-3 col-xs-12">
              <a-form-item
                :label="getLabels('nationality', `titleCase`)"
                style="margin-bottom: 0 !important"
              >
                <a-select
                  @focus="autoScrollNation"
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
            </div>
          </div>
          <div class="row formChild q-col-gutter-md">
            <div class="col-md-3 col-sm-3 col-xs-12">
              <a-form-item
                :label="getLabels('country_of_residence', `titleCase`)"
                style="margin-bottom: 0 !important"
              >
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
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
              <a-form-item
                :label="getLabels('region', `titleCase`)"
                style="margin-bottom: 0 !important"
                v-if="
                  country === 'INA' ||
                  country === 'ina' ||
                  country === '' ||
                  country === ' '
                "
              >
                <a-select
                  v-decorator="[
                    'region',
                    {
                      initialValue: currDataPrepare['guest-prov'],
                      rules: [{ required: true }],
                    },
                  ]"
                  @change="handleChangeRegion"
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
          </div>
          <div class="row formChild q-col-gutter-md">
            <div
              class="col-md-8 col-sm-8 col-xs-12"
              style="display: flex; flex-direction: row"
            >
              <span
                style="margin-right: 0.8rem; display: flex; align-items: center"
              >
                <a-checkbox v-model="agree" />
              </span>
              <span>
                {{ getLabels("pci_tc", `sentenceCase`) }}
                <a @click="showModalTerm">{{
                  getLabels("t_c", `sentenceCase`)
                }}</a>
                {{ hotelname }}.
              </span>
            </div>
          </div>
          <div class="row formChild q-col-gutter-md">
            <div class="col-md-3 col-sm-3 col-xs-12">
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
            </div>
          </div>

          <!-- MODAL -->
          <a-modal
            :title="getLabels('t_c', `titleCase`)"
            :visible="visibleTerm"
            :confirm-loading="confirmLoadingTerm"
            :closable="false"
          >
            <template slot="footer">
              <a-button key="submit" type="primary" @click="handleOkTerm">{{
                getLabels("close", `sentenceCase`)
              }}</a-button>
            </template>
            <q-card-section
              style="max-height: 50vh; padding: 5px 5px 5px 0px !important"
              class="scroll"
            >
              <p style="white-space: pre-wrap">{{ term }}</p>
            </q-card-section>
          </a-modal>
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
import api from "../api/Endpoint";
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
      currDataPrepare: {},
      counter: 0,
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
      Paramloading: true,
      term1: "I agree with the Terms and Conditions of Web Pre Check-in.",
      term: "",
      value: "terma",
      gambar: "",
      information: {
        backgroundColor: "$green",
        color: "$white",
        borderRadius: "4px",
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
      hotelParams: "",
      phone: "",
      State: "",
      checkInTIme: "",
      tempHour: "",
      hotelLogo: "",
      id: [],
      defaultCountry: "",
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
    };
  },
  created() {
    if (sessionStorage.getItem("PCI") == "true") {
      window.open(
        JSON.parse(sessionStorage.getItem("saveSetting")).location,
        "_self"
      );
    }
    sessionStorage.setItem("PCIForm", true);
    this.labels = JSON.parse(sessionStorage.getItem("labels"));
    this.gambar = this.$route.params.Param["gambar"];
    this.information.backgroundColor = this.$route.params.Param["Background"];
    this.information.color = this.$route.params.Param["Font"];
    this.money = this.$route.params.Param["money"];
    this.currency = this.$route.params.Param["currency"];
    this.per = this.$route.params.Param["per"];
    this.purpose = this.$route.params.Param["purpose"];
    this.FilterPurposeofStay = this.$route.params.Param["FilterPurposeofStay"];
    this.showBed = this.$route.params.Param["showBed"];
    this.showSmoking = this.$route.params.Param["showSmoking"];
    this.showFloor = this.$route.params.Param["showFloor"];
    this.hour = this.$route.params.Param["hour"];
    this.term = this.$route.params.Param["term"];
    this.hotelname = this.$route.params.Param["hotelname"];
    this.showPickupRequest = this.$route.params.Param["showPickupRequest"];
    this.countries = this.$route.params.Param["countries"];
    this.defaultCountry = this.$route.params.Param["defaultCountry"];
    this.province = this.$route.params.Param["province"];
    this.hotelEndpoint = this.$route.params.Param["hotelEndpoint"];
    this.hotelParams = this.$route.params.Param["hotelParams"];
    this.langID = this.$route.params.Param["langID"];
    this.checkInTIme = this.$route.params.Param["checkInTIme"];
    this.hotelLogo = this.$route.params.Param["hotelLogo"];
    this.textOta.color = this.$route.params.Param["Font"];
    this.ota.backgroundColor = this.$route.params.Param["Background"];
    this.flagKiosk = this.$route.params.Param["flagKiosk"];
    this.filteredRegion = this.Region;
    this.filteredProvince = this.province;
    this.FilterCountry = this.countries;
    if (this.$route.params.Data.length > 1) {
      this.id = this.$route.params.Data;

      this.currDataPrepare = this.id[this.counter];
    } else {
      this.id = this.$route.params.Data;

      this.currDataPrepare = this.id["0"];
    }
    this.country = this.currDataPrepare["guest-country"];
    this.email = this.currDataPrepare["guest-email"];
    this.phone = this.currDataPrepare["guest-phone"];
    this.currDataPrepare["guest-doc-nation"] = this.currDataPrepare[
      "guest-doc-nation"
    ].toUpperCase();
    this.currDataPrepare["guest-country"] = this.currDataPrepare[
      "guest-country"
    ].toUpperCase();
    this.counter += 1;
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
    Room(e) {
      this.room = e.target.value;
    },
    Bed(e) {
      this.bed = e.target.value;
    },
    Floor(e) {
      this.floor = e.target.value;
    },
    Nationality(value) {
      this.nationality = value;
    },
    handleChangeRegion(value) {
      this.region = value;
    },
    handleChangeCountry(value) {
      this.country = value;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
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
          //     specialReq: this.text,
          //     guestPhnumber: values.phone,
          //     guestNationality: values.nationality,
          //     guestCountry: values.country,
          //     guestRegion: values.country != "INA" ? " " : values.region,
          //     agreedTerm: true,
          //     purposeOfStay: values.purpose,
          //   },
          //   "inputan"
          // );
          const tempParam = location.search.substring(1);
          const parsed = await api.doFetch(
            this.hotelEndpoint + "preCI/updateData",
            {
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
              roomPreferences: this.room + "$" + this.floor + "$" + this.bed,
              specialReq: this.text,
              guestPhnumber: values.phone,
              guestNationality: values.nationality,
              guestCountry: values.country,
              guestRegion: values.country != "INA" ? " " : values.region,
              agreedTerm: true,
              purposeOfStay: values.purpose,
            }
          );
          console.log(parsed.response);
          const tempMessResult = parsed.response.messResult.split(" ");
          this.scrollToTop();
          this.save();
        }
      });
    },
    save() {
      if (this.counter == this.id.length) {
        const Data =
          "{" +
          this.currDataPrepare["rsv-number"] +
          ";" +
          moment(this.currDataPrepare.depart).format("MM/DD/YYYY") +
          "," +
          this.checkInTIme +
          "}";
        const Param = {};
        Param["langID"] = this.langID;
        Param["flagKiosk"] = this.flagKiosk;
        Param["hotelParams"] = this.hotelParams;
        Param["hotelEndpoint"] = this.hotelEndpoint;
        Param["hotelName"] = this.hotelname;
        Param["Background"] = this.information.backgroundColor;
        Param["hotelLogo"] = this.hotelLogo;
        Param["Font"] = this.information.color;
        router.push({
          name: "Success",
          params: {
            Data: Data,
            Param: Param,
          },
        });
        // router.push("success");
      }
      /* Use V-Decorator */
      this.currDataPrepare = this.id[this.counter];
      this.form.setFieldsValue({
        email: this.currDataPrepare["guest-email"],
      });
      this.form.setFieldsValue({
        phone: this.currDataPrepare["guest-phone"],
      });
      this.form.setFieldsValue({
        nationality: this.currDataPrepare["guest-doc-nation"],
      });
      this.form.setFieldsValue({
        country: this.currDataPrepare["guest-country"],
      });
      if (this.country.toLowerCase() == "ina") {
        this.form.setFieldsValue({
          region: this.currDataPrepare["guest-prov"],
        });
      }
      this.form.setFieldsValue({
        flight: "",
      });
      this.form.setFieldsValue({
        purpose: this.$route.params.Param["purpose"],
      });
      /* Doesnt Use V-Decorator */
      this.hour = this.$route.params.Param["hour"];
      this.showPrice = false;
      this.room = "";
      this.bed = "";
      this.floor = "";
      this.text = "";
      this.agree = false;
      this.country = this.currDataPrepare["guest-country"];
      /* Go To Next Guest */
      this.counter += 1;
    },
    async autoScrollNation() {
      await this.$nextTick();
      if (this.currDataPrepare["guest-doc-nation"] == "") {
        this.form.setFieldsValue({
          nationality: this.defaultCountry,
        });
        this.currDataPrepare["guest-doc-nation"] = this.defaultCountry;
      }
    },
    async autoScrollCountry() {
      await this.$nextTick();
      if (this.currDataPrepare["guest-country"] == "") {
        this.form.setFieldsValue({
          country: this.defaultCountry,
        });
        this.country = this.defaultCountry;
        this.currDataPrepare["guest-country"] = this.defaultCountry;
      }
    },
  },
  computed: {
    formatDate() {
      return (datum) => {
        const dDate = String(moment(datum, "YYYY-MM-DD").date()).padStart(
          2,
          "0"
        );
        const dMonth = String(moment(datum, "YYYY-MM-DD").month() + 1).padStart(
          2,
          "0"
        );
        const dYear = String(moment(datum, "YYYY-MM-DD").year());
        const fixDate = moment(`${dDate}/${dMonth}/${dYear}`, "DD-MM-YYYY")._i;
        return fixDate;
      };
    },
    getLabels() {
      let fixLabel = "";
      return (nameKey, used) => {
        const label = this.labels.find((el) => {
          return el["lang-variable"] == nameKey;
        });
        if (label === undefined) {
          fixLabel = "";
        } else {
          if (used === "titleCase") {
            fixLabel = label["lang-value"].replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          } else if (used === "sentenceCase") {
            fixLabel =
              label["lang-value"].charAt(0).toUpperCase() +
              label["lang-value"].slice(1);
          } else if (used === "upperCase") {
            fixLabel = label["lang-value"].toUpperCase();
          } else {
            fixLabel = label["lang-value"];
          }
        }
        return fixLabel;
      };
    },
  },
};
</script>
