<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <!-- <div v-show="term"> -->
      <a-modal
        title="Term and Condition"
        :visible="termcondition"
        :confirm-loading="confirmLoading"
      >
        <template slot="footer">
          <a-button key="back" @click="disagree">Disagree</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Agree</a-button>
        </template>
        <p>{{term}}</p>
      </a-modal>
      <a-modal title="Information" :visible="informationmodal" :confirm-loading="confirmLoading">
        <template slot="footer">
          <a-button key="submit" type="primary" :loading="loading" @click="goOTA">Close</a-button>
        </template>
        <p>{{informationterm}}</p>
      </a-modal>
      <!-- </div> -->
      <!-- test -->
      <!-- <h3 class="text-center font-weight-bold visible">Grand Visual Hotel Jakarta</h3> -->
      <a-row class="header-branding mb-3" :style="information" type="flex" justify="space-between">
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">ONLINE CHECK-IN</h1>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img class="img-hotel float-right image" :src="gambar" alt="Image Loading" />
          <div class="overlay visible">
            <div class="text">Grand Visual Hotel Jakarta</div>
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

      <div>
        <a-form layout="vertical" :form="form">
          <h2 v-show="current === 0">Guest Detail</h2>
          <h2 v-show="current === 1">Address</h2>
          <h2 v-show="current === 2">Scan ID</h2>
          <h2 v-show="current === 3">Deposit Payment</h2>
          <!-- <h2 class="main-guest-title font-weight-bold">
            R. Andito Rizky Pratama
            <br />
            <small>Ariella Calista Ichwan</small>
          </h2>-->
          <a-alert
            :message="this.currDataPrepare.name"
            :description="this.currDataPrepare.description"
            type="info"
            show-icon
            class="mb-3"
          />
          <!-- <h4 class="main-guest-title font-white font-weight-bold">{{currDataPrepare.description}}</h4> -->
          <p>
            Arrival:
            <strong>{{this.currDataPrepare.arrival}}</strong>
            Departure:
            <strong>{{this.currDataPrepare.departure}}</strong>
            <br />Booking Code:
            <strong>{{this.currDataPrepare.booking}}</strong>
          </p>

          <div class="steps-content" v-show="current === 0">
            <a-row class :gutter="[16,8]">
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item label="Email">
                  <a-input
                    v-decorator="[
                      'email',
                      { rules: [{  message: 'Please input your email' }] },
                    ]"
                    :placeholder="currDataPrepare.email"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item label="Phone Number">
                  <a-input
                    v-decorator="[
                    'phone',
                    {
                      initialValue:currDataPrepare['guest-phone'],
                      rules: [{ required: true }],
                    },
                  ]"
                    style="width: 100%"
                    @keypress="isNumber($event)"
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row class :gutter="[16,8]">
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
            <a-row class gutter="16">
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
            </a-row>
          </div>
          <div class="steps-content" v-show="current === 1">
            <a-row class :gutter="[16,8]">
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
          <div class="steps-content" v-show="current === 2 ">
            <a-row class :gutter="[16, 8]">
              <a-col :span="12" :xl="12" :xs="12">
                <a-form-item label="Choose/Upload ID">
                  <input
                    class
                    type="file"
                    @change="onFileChange"
                    v-decorator="[
          'url',
          { initialValue: '',rules: [{ required: true }] },
        ]"
                  />
                </a-form-item>

                <img class="preview" v-if="url" :src="url" />
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-show="current === 3">
            <a-row :gutter="[16,8]" v-if="pay == false">
              <a-col :span="12" :xl="12" :xs="12">
                <a-form-item label="Deposit">
                  <h2>
                    <strong>Rp. 500,000</strong>
                  </h2>
                </a-form-item>
              </a-col>
              <a-col :span="10" :xl="10" :xs="12">
                <a-button class="font-weight-bold mt-3 mr-3" type="primary" @click="search()">Pay</a-button>
                <img
                  class="rounded float-right"
                  src="https://docs.nicepay.co.id/images/nicepay-ac8e989d.jpg"
                  style="height:50px;width:50px; opacity: .65;"
                />
              </a-col>
            </a-row>
            <a-row :gutter="[16,8]" v-else>
              <a-col :span="12" :xl="12" :xs="12">
                <a-form-item label="Deposit">
                  <h2>
                    <strong>Cash Basis</strong>
                  </h2>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="[16,8]">
              <a-col :span="12" :xl="12" :xs="24">
                <p>
                  <a-checkbox v-model="pay">
                    Skip deposit payment
                    If you skip deposit payment, all your transaction will be cash basis
                  </a-checkbox>
                </p>
              </a-col>
            </a-row>
          </div>
          <div class="steps-action">
            <a-button v-if="current > 0" @click="prev">Previous</a-button>
            <a-button
              v-if="current < steps.length - 1"
              style="margin-left: 8px"
              type="primary"
              @click="next"
            >Next</a-button>
            <!-- <a-button
              v-if="current == steps.length - 1"
              type="primary"
              @click="$message.success('Processing complete!')"
            >Done</a-button>-->
          </div>
          <!-- <a-row :gutter="[16,8]">
            <a-col :span="12" :xl="12" :xs="24">
              <a-checkbox v-model="agree">{{(value == 'terma' ? term1 : term2)}}</a-checkbox>
            </a-col>
          </a-row>-->
        </a-form>
        <a-row class :gutter="[16,8]">
          <a-col :span="4" :xl="4" :xs="24">
            <a-button
              :xl="12"
              class="font-weight-bold mt-3"
              type="primary"
              block
              :size="size"
              @click="save();scrollToTop();"
              v-if="current == steps.length - 1"
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
  data() {
    return {
      pay: false,
      scanid: false,
      informationmodal: false,
      informationterm: "",
      current: 0,
      bookingcode: "",
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
      purpose: "leisure",
      loading: true,
      term: "",
      term1:
        "I agree with the Terms and Conditions of Visual Grand Hotel Web Check-in.",
      term2:
        "Saya setuju dengan Syarat dan Ketentuan dari Visual Grand Hotel Web Check-in.",
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
      region: "",
      room: "",
      tempsetup: [],
      message: "",
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
    if (this.$route.params.id == undefined) {
      (async () => {
        const tempParam = location.search.substring(1);
        const parsed = await ky
          .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/loadSetup", {
            json: {
              request: {
                icase: 1,
              },
            },
          })
          .json();

        const data = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/mobileCI/findReservation",
            {
              json: {
                request: {
                  coDate: "01/15/19",
                  bookCode: "28249",
                  chName: " ",
                  earlyCI: "false",
                  maxRoom: "1",
                  citime: "14:00",
                  groupFlag: "false",
                },
              },
            }
          )
          .json();

        this.message = data["response"]["messResult"];
        this.informationterm = this.message.substring(
          this.message.lastIndexOf("- ") + 1,
          this.message.lastIndexOf("!")
        );
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
            this.scanid = this.tempsetup[i]["setupflag"];
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
          }
        }
        this.loading = false;
        // if (this.message.substring(0, 2) == "00" || this.message.substring(0, 2) == "88") {
        //   this.informationmodal = true;
        // } else {
          this.termcondition = true;
        // }
      })();
    }
  },
  mounted() {
    this.filteredRegion = this.Region;
  },
  methods: {
    goOTA(){
      router.push('ota')
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
      this.current++;
    },
    prev() {
      this.current--;
    },
    search() {
      (async () => {
        const parsed = await ky
          .post("https://dev.nicepay.co.id/nicepay/direct/v2/registration", {
            json: {
              request: {
                timeStamp: "{{timestampTrx}}",
                iMid: "{{iMid}}",
                payMethod: "02",
                currency: "IDR",
                amt: "{{amount}}",
                referenceNo: "{{refNo}}",
                goodsNm: "Test Transaction Nicepay",
                billingNm: "John Doe",
                billingPhone: "02110680000",
                billingEmail: "email@merchant.com",
                billingAddr: "Jalan Bukit Berbunga 22",
                billingCity: "Jakarta",
                billingState: "DKI Jakarta",
                billingPostCd: "12345",
                billingCountry: "Indonesia",
                deliveryNm: "dobleh@merchant.com",
                deliveryPhone: "12345678",
                deliveryAddr: "Jalan Bukit Berbunga 22",
                deliveryCity: "Jakarta",
                deliveryState: "DKI Jakarta",
                deliveryPostCd: "12345",
                deliveryCountry: "Indonesia",
                dbProcessUrl: "https://ptsv2.com/t/test-nicepay-v2",
                vat: "",
                fee: "",
                notaxAmt: "",
                description: "",
                merchantToken: "{{merTok}}",
                reqDt: "",
                reqTm: "",
                reqDomain: "merchant.com",
                reqServerIP: "127.0.0.1",
                reqClientVer: "",
                userIP: "127.0.0.1",
                userSessionID: "697D6922C961070967D3BA1BA5699C2C",
                userAgent:
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/60.0.3112.101 Safari/537.36",
                userLanguage: "ko-KR,en-US;q=0.8,ko;q=0.6,en;q=0.4",
                cartData:
                  '{"count":1,"item":[{"img_url":"https://images.ctfassets.net/od02wyo8cgm5/14Njym0dRLAHaVJywF8WFL/1910357dd0da0ae38b61bc8ad3db86e4/cloudflyer_2-fw19-grey_lime-m-g1.png","goods_name":"Shoe","goods_detail":"Shoe","goods_amt":{{amt}}}]}',
                instmntType: "2",
                instmntMon: "1",
                recurrOpt: "0",
                bankCd: "CENA",
                vacctValidDt: "",
                vacctValidTm: "",
                merFixAcctId: "",
                mitraCd: "",
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
      this.current = 0;
    },
    save() {
      if (this.counter == this.id.length) {
        router.push("successcheckin");
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
      router.push("ota");
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

