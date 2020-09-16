<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <!-- {{currDataPrepare}} -->
      <h3 class="text-center font-weight-bold visible">{{ hotelname }}</h3>
      <a-row class="header-branding" :style="information" type="flex" justify="space-between">
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xl="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">ONLINE CHECK-IN</h1>
          <h2
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare["guest-member-name"] }}
          </h2>
          <h2 v-else class="main-guest-title font-white font-weight-bold" :style="information">
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h2>
          <!-- <h4
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >{{currDataPrepare.description}}</h4>-->
          <p class="ant-card-meta-description font-white" :style="information">
            Arrival:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong> Departure:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />Booking Code:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xl="9" :lg="9" :xs="24">
          <img class="img-hotel" :src="gambar" alt="Image Loading" />
          <div class="overlay invisible">
            <div class="text">{{ hotelname }}</div>
          </div>
          <div class="invisible">
            <div class="gear-setting">
              <!-- <a-icon
                type="setting"
                :style="{ fontSize: '1.5rem' }"
                class="float-right align-self-center"
                theme="filled"
                @click="imageModal"
              />-->
            </div>
          </div>
        </a-col>
        <a-col class="pl-3 pt-3 visible" :span="12" :md="12" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">ONLINE CHECK-IN</h1>
          <h2
            v-if="currDataPrepare['guest-member-name'] !== ''"
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare["guest-member-name"] }}
          </h2>
          <h2 v-else class="main-guest-title font-white font-weight-bold" :style="information">
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h2>
          <!-- <h4 class="main-guest-title font-white font-weight-bold">{{currDataPrepare.description}}</h4> -->
          <p class="ant-card-meta-description font-white" :style="information">
            Arrival:
            <strong>{{ formatDate(currDataPrepare.arrive) }}</strong> Departure:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />Booking Code:
            <strong>{{ currDataPrepare["rsv-number"] }}</strong>
          </p>
        </a-col>
      </a-row>
      <div>
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <a-row class="ml-4 mr-3 mt-3 mb-3" gutter="16">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">Arrival</p>
                </a-col>
                <!-- <a-col :span="1" :xl="1" :xs="1">
                  <a-icon
                    type="setting"
                    :style="{ fontSize: '1.5rem' }"
                    class="float-right align-self-center"
                    theme="filled"
                    @click="munculModal"
                  />
                </a-col>-->
              </a-row>
            </a-card>
          </a-row>
          <a-row class="ml-3" gutter="16">
            <a-col :span="4" :xl="4" :lg="5" :md="6" :xs="24">
              <a-form-item layout="vertical" label="Estimated Arrival Time">
                <a-time-picker
                  v-decorator="[
                    'time',
                    {
                      initialValue: moment(hour, 'HH:mm'),
                      rules: [{ required: true }],
                    },
                  ]"
                  :minute-step="30"
                  format="HH:mm"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :xl="4" :lg="5" :md="6" :xs="24" v-show="showPickupRequest">
              <a-form-item label="Request">
                <a-checkbox
                  :checked="showPrice"
                  v-model="showPrice"
                  @change="onChange"
                >Pickup Required</a-checkbox>
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
              <a-form-item label="Price">
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
              <a-form-item label="Flight Details">
                <a-input
                  placeholder="Please input flight details"
                  v-decorator="[
                    'flight',
                    {
                      rules: [{ message: 'Please input your flight details' }],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" gutter="16">
            <a-col>
              <a-form-item label="Room Preferences">
                <a-radio-group name="radioGroup" v-show="showSmoking" @change="Room">
                  <a-radio value="NonSmoking">
                    <span class="font-weight-normal">Non Smoking</span>
                  </a-radio>
                  <a-radio value="Smoking">
                    <span class="font-weight-normal">Smoking</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showFloor" @change="Floor">
                  <a-radio value="LowerFloor">
                    <span class="font-weight-normal">Lower Floor</span>
                  </a-radio>
                  <a-radio value="HigherFloor">
                    <span class="font-weight-normal">Higher Floor</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showBed" @change="Bed">
                  <a-radio value="OneBigBed">
                    <span class="font-weight-normal">One Big Bed</span>
                  </a-radio>
                  <a-radio value="TwoSingleBeds">
                    <span class="font-weight-normal">Two Single Beds</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <!-- isi: {{FilterRoomPreference.length}} 3
              gokil: {{tempRoomPreference}} 6-->
              <!-- <template v-for="index in FilterRoomPreference.length"> -->
              <!-- <a-radio-group
                  v-for="index in FilterRoomPreference.length"
                  :key="index"
                  :options="plainOptions"
                  @change="Room"
              />-->

              <!-- <template v-for="data in tempRoomPreference">
                      <a-radio
                        v-if="tempRoomPreference['key'] == index"
                        :value="item"
                        :key="data"
                      >{{ tempRoomPreference }}</a-radio>
              </template>-->
              <!-- <a-radio
                    :value="item"
                    :key="item"
                    v-for="(item) in 2"
              >{{ tempRoomPreference[indexStrs] }}</a-radio>-->
              <!-- micahel <a-radio :value="item" :key="item" v-for="item in apalah(index)">{{ item }}</a-radio> -->
              <!-- <a-radio :value="item" :key="item">{{ tempRoomPreference[indexStrs] }}</a-radio>
              <a-radio :value="item" :key="item">{{ tempRoomPreference[indexStrs + 1] }}</a-radio>-->
              <!-- </template>A -->
              <!-- <a-radio-group name="radioGroup">
                  <a-radio value="NonSmoking">
                    <span class="font-weight-normal">Non Smoking</span>
                  </a-radio>
                  <a-radio value="Smoking">
                    <span class="font-weight-normal">Smoking</span>
                  </a-radio>
              </a-radio-group>-->

              <!-- <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showFloor" @change="Floor">
                  <a-radio value="LowerFloor">
                    <span class="font-weight-normal">Lower Floor</span>
                  </a-radio>
                  <a-radio value="HigherFloor">
                    <span class="font-weight-normal">Higher Floor</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showBed" @change="Bed">
                  <a-radio value="OneBigBed">
                    <span class="font-weight-normal">One Big Bed</span>
                  </a-radio>
                  <a-radio value="TwoSingleBeds">
                    <span class="font-weight-normal">Two Single Beds</span>
                  </a-radio>
              </a-radio-group>-->
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="9" :xl="9" :lg="9" :md="12" :xs="18">
              <a-form-item label="Special Request">
                <a-textarea
                  v-decorator="[
                    'Request',
                    { rules: [{ message: 'Please input your Request' }] },
                  ]"
                  placeholder="Ex: Connecting Wifi"
                  :rows="4"
                  :maxlength="max"
                />
              </a-form-item>
            </a-col>
            <a-col class="max-breaker" :span="3" :xl="3" :xs="6">
              <span v-text="text.length + '/' + max"></span>
              <!-- <a-progress
                type="circle"
                :percent="max-text.length"   
                :width="30"             
              >
                <template #format="percent">
                  <span style="color: red">{{ percent }}</span>
                </template>
              </a-progress>-->
            </a-col>
          </a-row>

          <a-row class="ml-4 mr-3 mb-3">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">Guest Details</p>
                </a-col>
                <!-- <a-col :span="1" :xl="1" :xs="1">
                  <a-icon
                    type="setting"
                    :style="{ fontSize: '1.5rem' }"
                    class="float-right align-self-center"
                    theme="filled"
                    @click="guestModal"
                  />
                </a-col>-->
              </a-row>
            </a-card>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <!-- <span>{{currDataPrepare["guest-email"]}}</span> -->
              <a-form-item label="Email">
                <a-input
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
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Phone Number">
                <a-input
                  v-decorator="[
                    'phone',
                    {
                      initialValue: currDataPrepare['guest-phone'],
                      rules: [{ required: true }],
                    },
                  ]"
                  style="width: 100%;"
                  @keypress="isNumber($event)"
                ></a-input>
                <!-- <vue-tel-input v-model="phone"></vue-tel-input> -->
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="3" :xl="3" :lg="7" :md="10" :xs="24">
              <a-form-item label="Purpose of Stay">
                <a-select
                  @change="Kuy"
                  v-decorator="[
                    'purpose',
                    { initialValue: purpose, rules: [{ required: true }] },
                  ]"
                >
                  <a-select-option
                    v-for="item in FilterPurposeofStay"
                    :key="item"
                    :value="item.setupvalue"
                  >{{ item.setupvalue }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Nationality">
                <a-select
                  show-search
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
                    :key="item"
                    :value="item['alpha-3']"
                  >{{ item.name }}</a-select-option>
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
          <!-- Country -->
          <!-- <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="10" :xl="10" :xs="24">
              <a-form-item label="Address">
                <a-textarea placeholder="Input Address" :rows="4" />
              </a-form-item>
            </a-col>
          </a-row>-->
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Country">
                <a-select
                  show-search
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
                    :key="item"
                    :value="item['alpha-3']"
                  >{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <div
                v-show="
                  country === 'INA' ||
                  country === 'ina' 
                "
              >
                <a-form-item label="Region">
                  <a-select
                    show-search
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
                      v-for="(item, keys) in filteredRegion"
                      :key="keys"
                      :value="filteredRegion[keys]['province']"
                    >{{ filteredRegion[keys].province }}</a-select-option>
                  </a-select>
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

          <!-- Address -->
          <a-row class="ml-3 mb-3" :gutter="[16, 8]">
            <a-col :span="1" :xl="1" :xs="2">
              <a-checkbox v-model="agree" />
            </a-col>
            <a-col class="fix-agreement" :span="23" :xl="23" :xs="22">
              Check here to indicate that you have read and agree to the
              <a
                @click="showModalTerm"
              >Terms and Conditions</a>
              {{ hotelname }} Agreement.
            </a-col>
            <a-modal
              title="Term Of Condition"
              :visible="visibleTerm"
              :confirm-loading="confirmLoadingTerm"
            >
              <template slot="footer">
                <a-button key="submit" type="primary" :loading="loading" @click="handleOkTerm">Close</a-button>
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
                  :size="size"
                  :disabled="!agree"
                  html-type="submit"
                >Check-In Now</a-button>
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
import data from "../components/json/indonesia";
import countries from "../components/json/country";
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
Vue.use(Antd);

const groupby = (paramnumber1, paramnumber2) => {
  return [];
};

export default {
  data() {
    return {
      addessHotel:
        "Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240",
      id: [],
      plainOptions: ["Apple", "Pear", "Orange"],
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
      form: this.$form.createForm(this, { name: "coordinated" }),
      nilai: 2,
      bed: "",
      floor: "",
      region: "",
      room: "",
      setRegion: "Bali",
      Region: data.Indonesia.Region,
      City: data.Indonesia.City,
      cek: "",
      cities: "",
      // filteredCity: [],
      filteredRegion: [],
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
      gambar: "https://source.unsplash.com/1366x786/?hotel",
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
      countries: countries,
      hotelname: "",
      email: "",
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

        this.tempsetup = parsed.response.pciSetup["pci-setup"];
        const jatah = [];
        for (const i in this.tempsetup) {
          if (this.tempsetup[i]["number1"] == 4) {
            jatah.push(this.tempsetup[i]);

            for (const heaven in jatah) {
              console.log(jatah, "msk");
              if (jatah[heaven].setupflag == true) {
                this.information.backgroundColor = jatah[heaven]["setupvalue"];
              }
            }
          } else if (this.tempsetup[i]["number1"] == 5) {
            jatah.push(this.tempsetup[i]);

            for (const hell in jatah) {
              console.log(jatah, "msk");
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
          } else if (this.tempsetup[i]["number1"] == 2) {
            if (this.tempsetup[i].setupflag == true) {
              this.showPickupRequest = this.tempsetup[i].setupflag;
              this.money = this.tempsetup[i]["price"];
              this.currency = this.tempsetup[i]["remarks"];
              this.per = this.tempsetup[i]["setupvalue"].split("PER")[1];
            }
          } else if (
            this.tempsetup[i]["number1"] == 8 &&
            this.tempsetup[i]["number2"] == 2
          ) {
            this.hour = this.tempsetup[i]["setupvalue"];
          } else if (this.tempsetup[i]["number1"] == 1) {
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
          }
        }

        const tempMessResult = parsed.response.messResult.split(" ");
        this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
        console.log(this.guests, "guests");

        if (tempMessResult[0] == "99") {
          router.push("notfound");
        } else {
          if (parsed.response.arrivalGuest["arrival-guest"].length > 1) {
            const nietos = [];
            const obj = {};
            this.dataGuest = parsed.response.arrivalGuest["arrival-guest"];
            console.log(this.gambar, "gambar");
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
            nietos.push(this.dataGuest);
            nietos.push(obj);
            router.push({ name: "List", params: { foo: nietos } });
          } else {
            this.currDataPrepare =
              parsed.response.arrivalGuest["arrival-guest"][0];
            this.country = this.currDataPrepare["guest-country"];
            this.email = this.currDataPrepare["guest-email"];
            const string =
              '<a data-flickr-embed="true" href="https://www.flickr.com/photos/190073392@N05/50315498352/in/dateposted-public/" title="vhp"><img src="https://live.staticflickr.com/65535/50315498352_b946e526dd_c.jpg" width="800" height="425" alt="vhp"></a>';
            const lagi = string.substring(
              string.lastIndexOf("<img src=") + 10,
              string.lastIndexOf('g"') + 1
            );
            this.gambar = lagi;
          }
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
      this.id = this.$route.params.id["data"];

      this.currDataPrepare = this.id[this.counter];
      this.country = this.currDataPrepare["guest-country"];
      this.email = this.currDataPrepare["guest-email"];

      this.counter += 1;
    }
    this.loading = false;
  },
  mounted() {
    this.filteredRegion = this.Region;
    this.FilterCountry = this.countries;
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
    apalah(param) {
      this.acoPancenOye = [];
      for (let x = 0; x < this.tempRoomPreference.length; x++) {
        if (this.tempRoomPreference[x].key === param) {
          this.acoPancenOye.push(this.tempRoomPreference[x].descr);
        }
      }
      return this.acoPancenOye;
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
    onKeydown(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("inputan2 ", values);

          console.log(
            {
              resNumber: this.currDataPrepare["rsv-number"],
              reslineNumber: this.currDataPrepare["rsvline-number"],
              estAT: values.time._i,
              pickrequest: this.showPrice,
              pickdetail:
                this.showPrice == false ||
                values.flight == " " ||
                values.flight == undefined
                  ? ""
                  : values.flight,
              roomPreferences: this.room + "$" + this.floor + "$" + this.bed,
              specialReq:
                values.Request == " " || values.Request == undefined
                  ? ""
                  : values.Request,
              guestPhnumber: values.phone,
              guestNationality: values.nationality,
              guestCountry: values.country,
              guestRegion: values.country != "INA" ? " " : values.region,
              agreedTerm: true,
              purposeOfStay: values.purpose,
            },
            "inputan"
          );
          (async () => {
            const tempParam = location.search.substring(1);
            const parsed = await ky
              .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/updateData", {
                json: {
                  request: {
                    resNumber: this.currDataPrepare["rsv-number"],
                    reslineNumber: this.currDataPrepare["rsvline-number"],
                    estAT: values.time._i,
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
                    guestPhnumber: values.phone,
                    guestNationality: values.nationality,
                    guestCountry: values.country,
                    guestRegion: values.country != "INA" ? " " : values.region,
                    agreedTerm: true,
                    purposeOfStay: values.purpose,
                  },
                },
              })
              .json();
            console.log(parsed, "inputan3");
            // const tempMessResult = parsed.response.messResult.split(" ");
            // this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
          })();
          this.scrollToTop();
          this.save();
          this.form.reset();
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
          "}";
        // console.log(mori, "be the one");
        router.push({ name: "Success", params: { jin: mori } });

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
    berubah(e) {
      this.nilai = e.target.value;
    },
    masukinFoto(foto) {
      this.gambar = foto.target.value;
    },
    masukinTerm(tulisan) {
      this.term = tulisan.target.value;
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
    onChange(e) {
      // console.log(`checked = ${e.target.checked}`);
      this.showPrice = e.target.checked;
    },

    moment,
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
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
      return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(datum));
    },
    groupby(paramnumber1, paramnumber2) {
      let lastnumber1 = 0;
      let totalnumber1 = 0;
      for (let i = 0; i < this.tempsetup.length; i++) {
        const number1 = this.tempsetup[i]["number1"];
        if (lastnumber1 != number1) {
          totalnumber1 = totalnumber1 + 1;
          lastnumber1 = number1;
        }
      }
      // return totalnumber1;
      const tempdata = [];
      for (let i = 0; i < this.tempsetup.length; i++) {
        if (this.tempsetup[i]["number1"] == paramnumber1) {
          if (paramnumber2 != 0) {
            const datarow = this.tempsetup[i];
            if (datarow["number2"] == paramnumber2) {
              tempdata.push(this.tempsetup[i]);
            }
          } else if (paramnumber2 == 0) {
            tempdata.push(this.tempsetup[i]);
          }
        }
      }
      if (tempdata[0]["number1"] == 3) {
        this.tempRoomPreferencelenght = [];
        this.tempRoomPreference = [];
        for (const b in tempdata) {
          if (tempdata[b].setupflag == true) {
            // isi 3
            this.tempRoomPreferencelenght.push(tempdata[b]);
            const coba = tempdata[b]["setupvalue"];
            // coba[b].key = Number(b);

            const splitcoba = coba.split(" & ");

            // isi 6
            for (const c in splitcoba) {
              this.tempRoomPreference.push({
                key: Number(b) + 1,
                descr: splitcoba[c],
              });
            }
          }
        }
        return this.tempRoomPreferencelenght;
      } else if (tempdata[0]["number1"] == 6) {
        return tempdata[0]["setupvalue"];
      }
      return tempdata;
    },
    test() {
      return (this.indexStr = this.indexStr + 1);
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
    FilterRoomPreference() {
      return this.groupby(3, 0);
    },
    indexStrs() {
      // get: function () {
      //   return this.indexStr;
      //   console.log(this.indexStr, "be the one");
      // },
      // set: function (newIndex) {
      //   this.indexStr = this.indexStr + 1;
      //   console.log(this.indexStr, "be the one");
      // },
      return this.test();
    },
  },
};
</script>
