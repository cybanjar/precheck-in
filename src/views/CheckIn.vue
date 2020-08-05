<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <h3 class="text-center font-weight-bold visible">Grand Visual Hotel Jakarta</h3>
      <a-row class="header-branding" :style="information" type="flex" justify="space-between">
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">ONLINE CHECK-IN</h1>
          <h2
            v-if="currDataPrepare.description !== ''"
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >{{currDataPrepare.name}} | {{currDataPrepare.description}}</h2>
          <h2
            v-else
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >{{currDataPrepare.name}}</h2>
          <!-- <h4
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >{{currDataPrepare.description}}</h4>-->
          <p class="ant-card-meta-description font-white" :style="information">
            Arrival
            <strong>{{currDataPrepare.arrival}}</strong> Departure
            <strong>{{currDataPrepare.departure}}</strong>
            <br />Reservation number
            <strong>11020133</strong>
          </p>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img
            class="img-hotel float-right image"
            src="https://source.unsplash.com/1366x786/?hotel"
            alt="Image Loading"
          />
          <div class="overlay invisible">
            <div class="text">Grand Visual Hotel Jakarta</div>
          </div>
          <div class="invisible">
            <div class="gear-setting">
              <a-icon
                type="setting"
                :style="{ fontSize: '1.5rem' }"
                class="float-right align-self-center"
                theme="filled"
                @click="imageModal"
              />
            </div>
          </div>
        </a-col>
        <a-col class="pl-3 pt-3 visible" :span="12" :md="12" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold">ONLINE CHECK-IN</h1>
          <h2
            class="main-guest-title font-white font-weight-bold"
          >{{currDataPrepare.name}} | {{currDataPrepare.description}}</h2>
          <!-- <h4 class="main-guest-title font-white font-weight-bold">{{currDataPrepare.description}}</h4> -->
          <p class="ant-card-meta-description font-white">
            Reservation from
            <strong>{{currDataPrepare.arrival}}</strong> until
            <strong>{{currDataPrepare.departure}}</strong>
            <br />Reservation number
            <strong>11020133</strong>
          </p>
        </a-col>
      </a-row>
      <a-modal
        v-model="keluar"
        title="Color and Image Setting"
        :visible="keluar"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Background Color">
            <p>Standard Color</p>
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#1890ff')">Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#E8505B')">Red</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FBDB81')">Yellow</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('green')">Green</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('white')">White</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#D42A83')">Magenta</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#1B262C')">Black</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FA7D09')">Orange</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#901f90')">Purple</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#00D7FF')">Sky Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#E4E3E3')">Grey</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FFBF00')">Gold</a>

            <p>Custom Back Color</p>
            <slider-picker
              class="vc-slider"
              v-model="information.backgroundColor"
              @input="customHeaderClass"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Font Color" force-render>
            <p>Standard Color</p>
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#1890ff')">Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#E8505B')">Red</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FBDB81')">Yellow</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('green')">Green</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('white')">White</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#D42A83')">Magenta</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#1B262C')">Black</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FA7D09')">Orange</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#901f90')">Purple</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#00D7FF')">Sky Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#E4E3E3')">Grey</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FFBF00')">Gold</a>

            <p>Custom Back Color</p>
            <slider-picker class="vc-slider" v-model="information.color" @input="customFontClass" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Change Image" force-render>
            <label>URL Image</label>
            <a-input v-model="gambar" @input="masukinFoto" />
            <p
              :style="{ color: '#E8505B', fontStyle: 'italic', fontSize: '0.75rem'}"
            >* Recommended resolution 1366 x 768 atau HD</p>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
      <div>
        <a-form layout="vertical" :form="form">
          <a-row class="ml-4 mr-3 mb-3">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">Guest Details</p>
                </a-col>
                <a-col :span="1" :xl="1" :xs="1">
                  <a-icon
                    type="setting"
                    :style="{ fontSize: '1.5rem' }"
                    class="float-right align-self-center"
                    theme="filled"
                    @click="guestModal"
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-row>
          <a-modal
            v-model="guest"
            title="Guest Preference Setup"
            :visible="guest"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <label>Document ID Setup</label>
            <br />
            <a-checkbox-group @change="onID">
              <a-checkbox value="id_card">ID Card</a-checkbox>

              <a-checkbox value="passport">Passport</a-checkbox>

              <a-checkbox value="driving_license">Driving License</a-checkbox>

              <a-checkbox value="other">Other</a-checkbox>
            </a-checkbox-group>
            <!-- <input v-model="message"  />
            {{dataID[0] || dataID[1] || dataID[2] || dataID[3] == other}}-->
            <br />
            <br />

            <label>Term and Condition</label>
            <p>
              <a-radio-group v-model="value">
                <a-radio value="terma">Local language</a-radio>
                <a-textarea v-model="term1" @input="masukinTerm" :rows="3" />
                <a-radio value="termb">Other language</a-radio>
                <a-textarea v-model="term2" @input="masukinTerm" :rows="3" />
              </a-radio-group>
            </p>
          </a-modal>
          <a-row class="ml-3" :gutter="[16,8]">
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Nationality">
                <a-select
                  v-decorator="[
                  'nationality',
          { initialValue: nationality,rules: [{ required: true }] },
        ]"
                >
                  <a-select-option value="indonesia">Indonesia</a-select-option>
                  <a-select-option value="america">America</a-select-option>
                  <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Document ID">
                <a-select default-value="ID Card">
                  <a-select-option value="id_card">ID Card</a-select-option>
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
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="10" :xl="10" :xs="24">
              <a-form-item label="Address">
                <a-textarea placeholder="Input Address" :rows="4" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Country">
                <a-select
                  v-model="country"
                  v-decorator="[
          'country',
          { initialValue: country,
          rules: [{ required: true }] },
        ]"
                >
                  <a-select-option value="indonesia">Indonesia</a-select-option>
                  <a-select-option value="america">America</a-select-option>
                  <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="5" :xl="5" :xs="24">
              <div v-if="country === 'indonesia'">
                <a-form-item label="Region">
                  <a-select
                    v-model="setRegion"
                    show-search
                    @change="handleChangeProvince"
                    v-decorator="[
                      'region',
                      { initialValue: region, rules: [{ required: true }] },
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
              <div v-else>
                <a-form-item label="State">
                  <a-input
                    initial-value="Willy Wanta"
                    v-decorator="[
                  'username',
                  { rules: [{ required: false, message: '' }] },
                ]"
                  />
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24" v-if="country === 'indonesia'">
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
            </a-col>
          </a-row>

          <!-- Address -->
          <a-row class="ml-3" :gutter="[16,8]">
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Email">
                <a-input
                  v-decorator="[
                      'email',
                      { rules: [{ required: true, message: 'Please input your email' }] },
                    ]"
                  :placeholder="currDataPrepare.email"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Phone Number">
                <vue-tel-input
                  v-model="phone"
                  v-decorator="[
          'phone',
          {
            rules: [{ required: true}],
          },
        ]"
                  @input="phoneInput"
                ></vue-tel-input>
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="24">
              <a-form-item label="Purpose of Stay">
                <a-select
                  v-decorator="[
          'purpose',
          { initialValue:purpose,rules: [{ required: true }] },
        ]"
                >
                  <a-select-option value="bussiness">Bussiness</a-select-option>
                  <a-select-option value="leisure">Leisure</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <input type="file" @change="onFileChange" />
            <img class="preview" v-if="url" :src="url" />
          </a-row>
          <br />
          <a-row class="ml-3" gutter="16">
            <a-col>
              <p
                class="font-weight-bold"
                v-show="showSmoking || showFloor || showBed"
              >Room Preferences</p>
              <a-form-item label v-show="showSmoking">
                <a-radio-group name="radioGroup">
                  <a-radio :value="1">
                    <span class="font-weight-normal">Non Smoking</span>
                  </a-radio>
                  <a-radio :value="2">
                    <span class="font-weight-normal">Smoking</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label v-show="showFloor">
                <a-radio-group name="radioGroup">
                  <a-radio :value="1">
                    <span class="font-weight-normal">Lower Floor</span>
                  </a-radio>
                  <a-radio :value="2">
                    <span class="font-weight-normal">Higher Floor</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label v-show="showBed">
                <a-radio-group name="radioGroup">
                  <a-radio :value="1">
                    <span class="font-weight-normal">One Big Bed</span>
                  </a-radio>
                  <a-radio :value="2">
                    <span class="font-weight-normal">Two Single Bed</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3 mb-3" :gutter="[16,8]">
            <a-col :span="12" :xl="12" :xs="24">
              <a-checkbox v-model="agree">{{(value == 'terma' ? term1 : term2)}}</a-checkbox>
            </a-col>
          </a-row>
        </a-form>
        <a-row class="ml-3" :gutter="[16,8]">
          <a-col :span="4" :xl="4" :xs="24">
            <a-button
              :xl="12"
              class="font-weight-bold mt-3"
              type="primary"
              block
              :size="size"
              @click="search"
              :disabled="!agree"
            >Check-In Now</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script>
import router from "../router";
import data from "../components/json/indonesia";
import Vue from "vue";
import { Slider } from "vue-color";
import { VueTelInput } from "vue-tel-input";
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

export default {
  components: {
    "slider-picker": Slider,
    "vue-tel-input": VueTelInput,
  },
  data() {
    return {
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
      Region: data.Indonesia.Region,
      City: data.Indonesia.City,
      cek: "",
      cities: "",
      // filteredCity: [],
      filteredRegion: [],
      nationality: "Indonesia",
      phone: {
        number: "",
        valid: "",
        country: "",
      },
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
      purpose: "bussiness",
      loading: true,
      term1:
        "I agree with the Terms and Conditions of Visual Grand Hotel Web Check-in.",
      term2:
        "Saya setuju dengan Syarat dan Ketentuan dari Visual Grand Hotel Web Check-in.",
      value: "terma",
      gambar: "https://source.unsplash.com/1366x786/?hotel",
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
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  created() {
    this.loading = false;

    if (this.$route.params.id != undefined) {
      this.id = this.$route.params.id;
      // this.counter = this.id.length;

      this.currDataPrepare = this.id[this.counter];
      this.counter += 1;
    }
    //  else {
    //   router.push("guest-list");
    // }
  },
  mounted() {
    this.filteredRegion = this.Region;
  },
  methods: {
    search() {
      (async () => {
        const parsed = await ky
          .post("https://dev.nicepay.co.id/nicepay/api/orderRegist.do	", {
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            json: {
              request: {
                iMid: "IONPAYTEST",
                merchantToken:
                  "6cfccfc0046773c1b589d8e98f8b596c284f3c70a4ecf86eba14c18944b74bcd",
                payMethod: "01",
                currency: "IDR",
                amt: "10000",
                instmntType: "1",
                instmntMon: "1",
                referenceNo: "MerchantReferenceNumber1",
                goodsNm: "Merchant Goods 1",
                billingNm: "Buyer Name",
                billingPhone: "02123456789",
                billingEmail: "buyer@merchant.com",
                billingAddr: "Billing Address",
                billingCity: "Jakarta Utara",
                billingState: "DKI Jakarta",
                billingPostCd: "10160",
                billingCountry: "Indonesia",
                deliveryNm: "Delivery name",
                deliveryPhone: "02123456789",
                deliveryAddr: "Delivery Address",
                deliveryCity: "Jakarta Utara",
                deliveryState: "DKI Jakarta",
                deliveryPostCd: "10160",
                deliveryCountry: "indonesia",
                callBackUrl: "https://merchant.com/callBackUrl",
                dbProcessUrl: "https://merchant.com/dbProcessUrl",
                vat: 0,
                fee: 0,
                notaxAmt: 0,
                description: "",
                reqDt: "20180303",
                reqTm: "135959",
                reqDomain: "www.merchant.com",
                reqServerIP: "127.0.0.1",
                reqClientVer: "1.0",
                userIP: "127.0.0.1",
                userSessionID: "userSessionID",
                userAgent: "Mozilla",
                userLanguage: "en-US",
                recurrOpt: "0",
                cartData: "{}",
                instmntType: "1",
                worker: "worker",
                merFixAcctId: "14015824",
                vacctValidDt: "20180404",
                vacctValidTm: "235959",
                paymentExpDt: "20180404",
                paymentExpTm: "235959",
                payValidTm: "235959",
                // tXid: "BM...315",
                // mitraCd: "ALMA",
                // mRefNo: "bankcd123456789",
                // timeStamp: "20180404165639",
                // version: "D2",
              },
            },
          })
          .json();
        console.log(parsed, "test");
      })();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    phoneInput(formattedNumber, { number, valid, country }) {
      //  console.log(number.international);
      //  console.log(valid);
      //  console.log(country && country.name);
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
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
    // save() {
    //   if (this.counter == this.id.length) {
    //     router.push("success");
    //   }
    //   this.currDataPrepare = this.id[this.counter];
    //   this.counter += 1;
    //   this.agree = false;
    // },
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
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.muncul = false;
        this.keluar = false;
        this.guest = false;
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
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
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

<style scoped lang="scss" src="../css/style.scss">
</style>

