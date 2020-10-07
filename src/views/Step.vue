<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <!-- <div v-show="term"> -->
      <a-modal
        :title="getLabels('t_c')"
        :visible="termcondition"
        :confirm-loading="confirmLoading"
      >
        <template slot="footer">
          <a-button key="back" @click="disagree">
            {{ getLabels("disagree") }}
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >{{ getLabels("agree") }}</a-button
          >
        </template>
        <p>{{ terms }}</p>
        <!--<p v-if="langID == 'ENG'">{{term1}}</p>
        <p v-else>{{term}}</p>-->
      </a-modal>
      <!-- <a-modal title="Information" :visible="informationmodal" :confirm-loading="confirmLoading">
        <template slot="footer">
          <a-button key="submit" type="primary" :loading="loading" @click="goOTA">Close</a-button>
        </template>
        <p>{{informationterm}}</p>
      </a-modal>-->
      <!-- </div> -->
      <!-- test -->
      <!-- <h3 class="text-center font-weight-bold visible">Grand Visual Hotel Jakarta</h3> -->
      <a-row
        class="header-branding mb-3"
        :style="information"
        type="flex"
        justify="space-between"
      >
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">
            ONLINE CHECK-IN
          </h1>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img
            class="img-hotel float-right image"
            :src="gambar"
            alt="Image Loading"
          />
          <div class="overlay visible">
            <div class="text">{{ hotelname }}</div>
          </div>
          <div class="visible">
            <div class="online-checkin-mobile">
              <p class="text-center">Online Check-In</p>
            </div>
          </div>
          <!-- <div class="invisible">
            <div class="gear-setting">
              <a-icon
                type="setting"
                :style="{ fontSize: '1.5rem' }"
                class="float-right align-self-center"
                theme="filled"
                @click="imageModal"
              />
            </div>
          </div>-->
        </a-col>
        <!-- <a-col class="pl-3 pt-3 visible" :span="12" :md="12" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold">ONLINE CHECK-IN</h1>
        </a-col>-->
      </a-row>
      <!-- precheckin: {{precheckin}}
      scandID: {{scanid}}-->
      <div>
        <a-form layout="vertical" :form="form">
          <h2 v-show="current === 0">{{ getLabels("guest_detail") }}</h2>
          <h2 v-show="current === 1">{{ getLabels("guest_detail") }}</h2>
          <h2 v-show="current === 2">{{ getLabels("scan_id") }}</h2>
          <h2 v-show="current === 3">{{ getLabels("deposit_payment") }}</h2>
          <!-- <h2 class="main-guest-title font-weight-bold">
            R. Andito Rizky Pratama
            <br />
            <small>Ariella Calista Ichwan</small>
          </h2>-->
          <a-alert
            :message="this.currDataPrepare['gast']"
            :description="this.currDataPrepare.description"
            type="info"
            show-icon
            class="mb-3"
          />
          <!-- <h4 class="main-guest-title font-white font-weight-bold">{{currDataPrepare.description}}</h4> -->
          <p>
            {{ getLabels("arrival") }}:
            <strong>{{ formatDate(this.currDataPrepare.ci) }}</strong>
            {{ getLabels("departure") }}:
            <strong>{{ formatDate(this.currDataPrepare.co) }}</strong>
            <br />
            {{ getLabels("book_code") }}:
            <strong>{{ this.currDataPrepare.resnr }}</strong>
            <br />
            {{ getLabels("room_number") }} :
            <strong>{{ this.currDataPrepare.zinr }}</strong>
          </p>

          <div class="steps-content" v-show="current === 0">
            <a-row class :gutter="[16, 8]">
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item :label="getLabels('email')">
                  <a-input
                    v-decorator="[
                      'email',
                      {
                        initialValue: currDataPrepare['guest-email'],
                        rules: [
                          {
                            required: true,
                            message: getLabels('required_email'),
                          },
                          {
                            type: 'email',
                            message: getLabels('not_valid_email'),
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item :label="getLabels('phone_number')">
                  <a-input
                    v-decorator="[
                      'phone',
                      {
                        initialValue: currDataPrepare['guest-phnumber'],
                        rules: [
                          {
                            required: true,
                            message: getLabels('required_phone'),
                          },
                        ],
                      },
                    ]"
                    style="width: 100%;"
                    @keypress="isNumber($event)"
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class :gutter="[16, 8]">
              <a-col :span="3" :xl="3" :xs="24">
                <a-form-item :label="getLabels('purpose_stay')">
                  <a-select
                    v-decorator="[
                      'purpose',
                      { initialValue: purpose, rules: [{ required: true }] },
                    ]"
                  >
                    <a-select-option
                      v-for="item in FilterPurposeofStay"
                      :key="item"
                      :value="item.setupvalue"
                      >{{ item.setupvalue }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <!-- <a-row class gutter="16">
              <a-col>
                <p
                  class="font-weight-bold"
                  v-show="showSmoking || showFloor || showBed"
                >Room Preferences</p>
                <ul>
                  <li>Non Smoking</li>
                  <li>Lower Floor</li>
                  <li>One Big Bed</li>
                </ul>
              </a-col>
            </a-row>-->
          </div>
          <div class="steps-content" v-show="current === 1">
            <a-row class :gutter="[16, 8]">
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item :label="getLabels('nationality')">
                  <a-select
                    v-decorator="[
                      'nationality',
                      {
                        initialValue: currDataPrepare['guest-nation'],
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
                  <!-- <a-select-option value="Indonesia">Indonesia</a-select-option>
                  <a-select-option value="America">America</a-select-option>
                  <a-select-option value="ArabSaudi">Arab Saudi</a-select-option>-->
                  <!-- </a-select> -->
                </a-form-item>
              </a-col>
              <!-- <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Choose of Document ID">
                <a-select default-value="E-KTP">
                  <a-select-option value="id_card">E-KTP</a-select-option>
                  <a-select-option value="passport">Passport</a-select-option>
                  <a-select-option value="driving_license">Driving License</a-select-option>
                  <a-select-option value="kitas">KITAS</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="ID Number">
                <a-input placeholder="Please input " />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="24">
              <a-form-item label="Expiry Date">
                <a-date-picker @change="onChange" />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="24">
              <a-form-item label="Date of Birth">
                <a-date-picker @change="onChange" />
              </a-form-item>
              </a-col>-->
            </a-row>
            <a-row class :gutter="[16, 8]">
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item :label="getLabels('country')">
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
                  <a-form-item :label="getLabels('region')">
                    <a-select
                      @change="handleChangeRegion"
                      v-decorator="[
                        'region',
                        {
                          initialValue: currDataPrepare['guest-prov'],
                          rules: [
                            {
                              required: true,
                              message: getLabels('required_province'),
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
                <div v-else>
                  <a-form-item :label="getLabels('state')">
                    <a-input
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
              <!-- <a-col :span="5" :xl="5" :xs="24" v-if="country === 'indonesia'">
              <a-form-item label="City">
                <a-select
                  show-search
                  v-model="city"
                  v-decorator="[
                    'city',
                    { initialValue: city, rules: [{ required: true }] },]"
                >
                  <a-select-option
                    v-for="(item, key) in filteredCities"
                    :key="key"
                    :value="filteredCities[key].city_name"
                  >{{ filteredCities[key].city_name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24" v-else>
              <a-form-item label="City">
                <a-input
                  initial-value="Willy Wanta"
                  v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '' }] },
                ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="12">
              <a-form-item label="Postal Code">
                <a-input placeholder="Ex : 12750" @keydown="onKeydown" />
              </a-form-item>
              </a-col>-->
            </a-row>
          </div>
          <div class="steps-content" v-show="current === 2">
            <a-row class :gutter="[16, 8]">
              <a-col :span="12" :xl="12" :xs="12">
                <a-form-item :label="getLabels('upload_id')">
                  <input
                    class
                    type="file"
                    @change="onFileChange"
                    v-decorator="[
                      'url',
                      {
                        initialValue: '',
                        rules: [
                          { required: true, message: getLabels('required_id') },
                        ],
                      },
                    ]"
                  />
                </a-form-item>

                <img class="preview" v-if="url" :src="url" />
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-show="current === 3">
            <a-row :gutter="[16, 8]" v-if="pay == false">
              <a-col :span="12" :xl="12" :xs="12">
                <a-form-item :label="getLabels('deposit_payment')">
                  <h2>
                    <strong>
                      {{ this.currDataPrepare["currency-usage"] }}
                      {{
                        `${minimumDeposit}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      }}
                    </strong>
                  </h2>
                </a-form-item>
                <!--<a-modal :title="getLabels('information')" :visible="paymentModal" :confirm-loading="confirmLoading">
                  <template slot="footer">
                    <a-button key="submit" type="primary" @click="closeModal">{{getLabels('close')}}</a-button>
                  </template>
                  <p>{{getLabels('payment_error')}}</p>
                </a-modal>-->
              </a-col>
              <a-col :span="10" :xl="10" :xs="12">
                <a-button
                  class="font-weight-bold mt-3 mr-3"
                  type="primary"
                  @click="search()"
                  >{{ getLabels("pay") }}</a-button
                >
                <!-- <img
                  class="rounded float-right"
                  src="https://docs.nicepay.co.id/images/nicepay-ac8e989d.jpg"
                  style="height:50px;width:50px; opacity: .65;"
                />-->
              </a-col>
            </a-row>
            <a-row :gutter="[16, 8]" v-else>
              <a-col :span="12" :xl="12" :xs="12">
                <a-form-item :label="getLabels('deposit')">
                  <h2>
                    <strong>{{ getLabels("cash_basis") }}</strong>
                  </h2>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 8]" v-show="(skipDeposit = true)">
              <a-col :span="12" :xl="12" :xs="24">
                <p>
                  <a-checkbox v-model="pay">
                    {{ getLabels("term_cash_basis") }}
                  </a-checkbox>
                </p>
              </a-col>
            </a-row>
          </div>
          <div class="steps-action">
            <div v-if="y">
              <a-button v-if="current > 0" @click="prev">{{
                getLabels("prev")
              }}</a-button>
            </div>

            <a-button
              v-if="current < steps.length - 1"
              style="margin-left: 8px;"
              type="primary"
              @click="next"
              >{{ getLabels("next") }}</a-button
            >
          </div>

          <!-- <a-button
              v-if="current == steps.length - 1"
              type="primary"
              @click="$message.success('Processing complete!')"
            >Done</a-button>-->
          <!-- <a-row :gutter="[16,8]">
            <a-col :span="12" :xl="12" :xs="24">
              <a-checkbox v-model="agree">{{(value == 'terma' ? term1 : term2)}}</a-checkbox>
            </a-col>
          </a-row>-->
          <a-row class :gutter="[16, 8]">
            <a-col :span="4" :xl="4" :xs="24">
              <a-form-item>
                <a-button
                  :xl="12"
                  class="font-weight-bold mt-3"
                  type="primary"
                  block
                  :size="size"
                  @click="
                    save();
                    scrollToTop();
                  "
                  v-if="current == steps.length - 1"
                  html-type="submit"
                  :disabled="!pay"
                >{{ getLabels("ci_now") }}</a-button>
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
// import data from "../components/json/indonesia";
// import countries from "../components/json/country";
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
      nilai: 2,
      setRegion: "Bali",
      cek: "",
      cities: "",
      // filteredCity: [],
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
      gambar: "https://source.unsplash.com/1366x786/?hotel",
      termcondition: false,
      information: {
        backgroundColor: "$green",
        // border: "none",
        // borderBottom: "3px solid black",
        color: "$white",
        // padding: "24px 0 0px 0",
        // lineHeight: "0.625rem",
        // padding: 0,
        // height: "5rem",
        // marginBottom: "1rem !important",
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
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  // created() {
  //   const urlParams = new URLSearchParams(window.location.search);

  //   this.bookingcode = urlParams.get("bookingcode");
  //   this.loading = false;
  //   this.termcondition = true;
  //   // console.log(this.$route.params.id, "lempar");
  //   if (this.bookingcode === "982010") {
  //     router.push("listcheckin");
  //   } else {
  //     this.currDataPrepare = {
  //       key: 1,
  //       name: "R. Andito Rizky Pratama, Mr",
  //       arrival: "12/12/2020",
  //       departure: "15/12/2020",
  //       adult: "2",
  //       booking: "11020133",
  //       email: "randitorizky@gmail.com",
  //       tags: "Suites",
  //       rs: 0,
  //       description: "Ariella Calista Ichwan",
  //       isSelected: false,
  //     };
  //     term;
  //   }
  //   if (this.$route.params.id != undefined) {
  //     this.id = this.$route.params.id;
  //     // this.counter = this.id.length;

  //     this.currDataPrepare = this.id[this.counter];
  //     this.counter += 1;
  //   }
  //    }
  // },
  created() {
    this.currData = this.$route.params.foo;
    this.langID = this.$route.params.fighter;
    this.labels = JSON.parse(localStorage.getItem("labels"));
    // console.log(this.$route.params.id, "nyamtuh");
    if (this.$route.params.foo != undefined) {
      (async () => {
        const parsed = await ky
          .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/loadSetup", {
            json: {
              request: {
                icase: 1,
              },
            },
          })
          .json();

        this.tempsetup = parsed.response.pciSetup["pci-setup"];
        const jatah = [];

        for (const i in this.tempsetup) {
          if (this.tempsetup[i]["number1"] == 4) {
            jatah.push(this.tempsetup[i]);

            for (const heaven in jatah) {
              // console.log(jatah, "msk");
              if (jatah[heaven].setupflag == true) {
                this.information.backgroundColor = jatah[heaven]["setupvalue"];
              }
            }
          } else if (this.tempsetup[i]["number1"] == 5) {
            jatah.push(this.tempsetup[i]);

            for (const hell in jatah) {
              if (jatah[hell].setupflag == true) {
                this.information.color = jatah[hell]["setupvalue"];
              }
            }
          } else if (
            this.tempsetup[i]["number1"] == 7 &&
            this.tempsetup[i]["number2"] == 1
          ) {
            const lagi = this.tempsetup[i]["setupvalue"].substring(
              this.tempsetup[i]["setupvalue"].lastIndexOf("<img src=") + 10,
              this.tempsetup[i]["setupvalue"].lastIndexOf('g"') + 1
            );
            this.gambar = lagi;
          } else if (
            this.tempsetup[i]["number1"] == 6 &&
            this.tempsetup[i]["number2"] == 1
          ) {
            this.term = this.tempsetup[i]["setupvalue"];
          } else if (
            this.tempsetup[i]["number1"] == 6 &&
            this.tempsetup[i]["number2"] == 2
          ) {
            this.term1 = this.tempsetup[i]["setupvalue"];
          } else if (this.tempsetup[i]["number1"] == 2) {
            if (this.tempsetup[i].setupflag == true) {
              this.money = this.tempsetup[i]["price"];
              this.currency = this.tempsetup[i]["remarks"];
              this.per = this.tempsetup[i]["setupvalue"].split("PER")[1];
            }
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 2
          ) {
            this.hour = this.tempsetup[i]["setupvalue"];
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 1
          ) {
            this.scanid = !this.tempsetup[i]["setupflag"];
            // console.log(this.scanid, "scandid");
          } else if (this.tempsetup[i]["number1"] == 1) {
            this.tempsetup[i].setupvalue = this.getLabels(
              this.tempsetup[i].setupvalue.toLowerCase()
            );
            this.FilterPurposeofStay.push(this.tempsetup[i]);
            if (this.tempsetup[i].setupflag == true) {
              this.purpose = this.tempsetup[i].setupvalue;
            }
          } else if (this.tempsetup[i]["number1"] == 3) {
            if (this.tempsetup[i].number2 == 1) {
              this.showBed = this.tempsetup[i].setupflag;
            } else if (this.tempsetup[i].number2 == 2) {
              this.showSmoking = this.tempsetup[i].setupflag;
            } else if (this.tempsetup[i].number2 == 3) {
              this.showFloor = this.tempsetup[i].setupflag;
            }
          } else if (
            this.tempsetup[i]["number1"] == 99 &&
            this.tempsetup[i]["number2"] == 1
          ) {
            this.hotelname = this.tempsetup[i]["setupvalue"];
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 8
          ) {
            this.wifiAddress = this.tempsetup[i]["setupvalue"];
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 9
          ) {
            this.wifiPassword = this.tempsetup[i]["setupvalue"];
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 4
          ) {
            this.skipDeposit = this.tempsetup[i]["setupvalue"];
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 5
          ) {
            this.minimumDeposit = this.tempsetup[i]["price"];
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
            this.region.push(air);
          }
        }

        // console.log(this.currData, "anjay");
        // console.log(this.currData["0"], "anjay");
        if (this.currData["0"].length > 1) {
          const nietos = [];
          const obj = {};
          this.dataGuest = this.currData["0"];
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
          obj["15"] = this.wifiAddress;
          obj["16"] = this.wifiPassword;
          obj["17"] = this.skipDeposit;
          obj["18"] = this.minimumDeposit;
          obj["19"] = this.countries;
          obj["20"] = this.region;
          obj["21"] = this.term1;
          nietos.push(this.dataGuest);
          nietos.push(obj);
          // console.log(nietos, "tuwiiinnggg");
          router.push({
            name: "ListCheckIn",
            params: { foo: nietos, fighter: this.langID },
          });
        } else {
          this.currDataPrepare = this.currData["0"]["0"];
          this.precheckin = this.currDataPrepare["pre-checkin"];
          if (this.langID == "ENG" || this.langID == "eng") {
            this.terms = this.term;
          } else {
            this.terms = this.term1;
          }

          this.country = this.currDataPrepare["guest-country"];
        }
        this.termcondition = true;
        if (this.precheckin == true) {
          this.current = 2;
          this.y = false;
        }
        this.loading = false;
      })();
    } else if (this.$route.params.id != undefined) {
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
      this.wifiAddress = this.$route.params.id["setup"]["15"];
      this.wifiPassword = this.$route.params.id["setup"]["16"];
      this.skipDeposit = this.$route.params.id["setup"]["17"];
      this.minimumDeposit = this.$route.params.id["setup"]["18"];
      this.countries = this.$route.params.id["setup"]["19"];
      this.region = this.$route.params.id["setup"]["20"];
      this.term1 = this.$route.params.id["setup"]["21"];
      this.currDataPrepare = this.$route.params.id["data"];
      this.precheckin = this.currDataPrepare["pre-checkin"];

      this.country = this.currDataPrepare["guest-country"];
      this.email = this.currDataPrepare["guest-email"];
      if (this.langID == "ENG" || this.langID == "eng") {
        this.terms = this.term;
      } else {
        this.terms = this.term1;
      }
      this.termcondition = true;
      if (this.langID == "ENG" || this.langID == "eng") {
        this.terms = this.term;
      } else {
        this.terms = this.term1;
      }
      this.loading = false;
    } else {
      router.push("notfound");
    }
  },
  mounted() {
    this.filteredRegion = this.region;
    this.FilterCountry = this.countries;
  },
  methods: {
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
      if (
        (this.form.getFieldValue(["email"][0]) &&
          this.form.getFieldValue(["phone"][0])) ||
        this.form.getFieldValue(["region"][0]) &&
        this.url
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
        } else if (this.form.getFieldValue(["region"][0]) == "") {
          this.form.validateFields(["region"]);
        } else if (this.url == "") {
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
      this.current--;
    },
    search() {
      const token = CryptoJS.SHA256(
        "IONPAYTESTTRX2020090700000002" +
          this.minimumDeposit +
          "33F49GnCMS1mFYlGXisbUDzVf2ATWCl9k3R++d5hDd3Frmuos/XLx8XhXpe+LDYAbpGKZYSwtlyyLOtS/8aD7A=="
      );
      const params =
        "timeStamp=" +
        moment().format("YYYYMMDDHHmmss") +
        "&iMid=IONPAYTEST&payMethod=01&currency=IDR&amt=" +
        this.minimumDeposit +
        "&referenceNo=TRX2020090700000002&goodsNm=Deposit&billingNm=" +
        this.form.getFieldValue(["gast"]) +
        "&billingPhone=" +
        this.form.getFieldValue(["phone"][0]) +
        "&billingEmail=" +
        this.form.getFieldValue(["email"][0]) +
        "&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" +
        token.toString() +
        "&userIP=202.135.55.101&cartData={}&callBackUrl=http://vhp-online.com/mobilecheckin?hotelcode=vhpweb&lang=" +
        this.langID +
        "&instmntType=1&instmntMon=1&reccurOpt=0";
      const datas = {
        book: this.currDataPrepare.resnr,
        codate: this.formatDate(this.currDataPrepare.co),
        payment: "success",
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
          if (this.resReg.data["resultCd"] == "0000") {
            const urlInq =
              "https://dev.nicepay.co.id/nicepay/api/orderInquiry.do?tXid=" +
              this.resReg.data["tXid"] +
              "&optDisplayCB=1&optDisplayBL=0";
            window.open(urlInq, "_self");
          } else {
          }
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
          } else {
            this.paymentStatus = false;
          }
        });
    },
    closeModal() {
      this.paymentModal = false;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);

      let tmpImgb64 = "";
      const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });

      async function Main() {
        tmpImgb64 = await toBase64(file);
        return tmpImgb64.substring(tmpImgb64.indexOf(',') + 1, tmpImgb64.length)
      };
      (async () => {
        this.imgb64 = await Main();
        const uploadResult = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/mobileCI/saveIDCard",
            {
              json: {
                request: {
                  inpResnr: this.currDataPrepare.resnr,
                  inpReslinnr: this.currDataPrepare.reslinnr,
                  guestno: this.currDataPrepare.gastno,
                  imagedata: this.imgb64,
                  userinit: "01",
                },
              },
            }
          )
          .json();
          if (uploadResult.response.resultMessage == '') {
            this.hasUpload = true;
          } else {
            this.hasUpload = false;
          };
      })();
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
    save() {
      if (this.counter == this.id.length) {
      (async () => {
        const parsed = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/mobileCI/resCI",
            {
              json: {
                request: {
                  rsvNumber: this.currDataPrepare.resnr,
                  rsvlineNumber: this.currDataPrepare.reslinnr,
                  userInit: "01",
                  newRoomno: this.currDataPrepare.zinr,
                  purposeOfStay: this.form.getFieldValue('purpose'),
                  email: this.form.getFieldValue('email'),
                  guestPhnumber: this.form.getFieldValue('phone'),
                  guestNation: this.form.getFieldValue('nationality'),
                  guestCountry: this.form.getFieldValue('country'),
                  guestRegion: this.form.getFieldValue('region'),
                  base64image: this.imgb64, 
                },
              },
            }
          )
          .json();
      })();
        const mori =
          "{" +
          this.currDataPrepare.zinr +
          ";" +
          moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
          "," +
          this.wifiAddress +
          "!" +
          this.wifiPassword +
          "?" +
          this.currDataPrepare["argt-str"] +
          "}";
        //this.check();
        //if (this.paymentStatus) {
        //console.log(this.paymentStatus);
        router.push({ name: "SuccessCheckIn", params: { jin: mori } });
        //} else {
        //this.paymentModal = true;
        // }
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
    onID(checkedValues) {
      this.dataID = checkedValues;
    },
    berubah(e) {
      this.nilai = e.target.value;
    },
    masukinFoto(foto) {
      this.gambar = foto.target.value;
    },
    masukinUang(uang) {
      this.money = uang.target.value;
    },
    showModal() {
      this.visible = true;
    },
    imageModal() {
      this.keluar = true;
    },
    munculModal() {
      this.muncul = true;
    },
    guestModal() {
      this.guest = true;
    },
    gantiHeaderClass(warna) {
      this.information.backgroundColor = warna;
    },
    gantiFontClass(colours) {
      this.information.color = colours;
    },
    customHeaderClass(color) {
      this.information.backgroundColor = color.hex;
    },
    customFontClass(colour) {
      this.information.color = colour.hex;
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
    handleCancel(e) {
      this.visible = false;
      this.muncul = false;
    },
    onChange(date, dateString) {
      data = 0;
    },
    moment,
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
    disagree() {
      router.push({ path: "mobilecheckin", query: { lang: this.langID } });
      // router.push("mobilecheckin");
    },
    handleBlur() {
      // console.log("blur");
    },
    handleFocus() {
      // console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    formatDate(datum) {
      return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(datum));
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
      /*for (let x = 0; x < this.labels.length; x++) {
        if (this.labels[x]["program-variable"] === nameKey) {
          const splitStr = this.labels[x]["program-label1"]
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
  computed: {
    filteredCities() {
      const filteredCity = [];
      const set = this.setRegion;

      for (let i = 0; i < this.City.length; i++) {
        const regionID = set;
        const dataRow = this.City[i];
        const regionIDinCity = dataRow["province"];

        if (regionID === regionIDinCity) {
          filteredCity.push(dataRow);
        }
      }
      return filteredCity;
    },
  },
};
</script>
