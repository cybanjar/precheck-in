<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
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
            {{ currDataPrepare["gast"] }}
            {{ currDataPrepare["guest-member-name"] }}
          </h6>
          <h6 v-else class="text-white font-weight-bold" :style="information">
            {{ currDataPrepare["gast"] }}
          </h6>
          <p class="ant-card-meta-description text-white" :style="information">
            {{ getLabels("arrival", `titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.ci) }}</strong>
            {{ getLabels("departure", `titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.co) }}</strong>
            <br />
            {{ getLabels("book_code", `titleCase`) }}:
            <strong>{{ currDataPrepare.resnr }}</strong>
            {{ getLabels("room_number", `titleCase`) }}:
            <strong>{{ currDataPrepare.zinr }}</strong>
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
            {{ currDataPrepare["gast"] }}
            {{ currDataPrepare["guest-member-name"] }}
          </h6>
          <h6 v-else class="text-white font-weight-bold">
            {{ currDataPrepare["gast"] }},
          </h6>
          <p class="ant-card-meta-description text-white">
            {{ getLabels("arrival", `titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.ci) }}</strong>
            {{ getLabels("departure", `titleCase`) }}:
            <strong>{{ formatDate(currDataPrepare.co) }}</strong>
            <br />
            {{ getLabels("book_code", `titleCase`) }}:
            <strong>{{ currDataPrepare.resnr }}</strong>
            {{ getLabels("room_number", `titleCase`) }}:
            <strong>{{ currDataPrepare.zinr }}</strong>
          </p>
        </div>
      </div>
      <div>
        <a-form layout="vertical" :form="form">
          <h2>
            {{ getLabels("guest_detail", `titleCase`) }}
          </h2>
            <a-row class :gutter="[16, 8]">
              <a-col :span="5" :xl="5" :xs="24">
                <a-form-item :label="getLabels('email', `titleCase`)">
                  <a-input
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
                <a-form-item :label="getLabels('phone_number', `titleCase`)">
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
                    v-model="phone"
                    mask="##############"
                  ></q-input>
                </a-form-item>
              </a-col>
            </a-row>
          <a-row class :gutter="[16, 8]">
            <a-col :span="4" :xl="4" :xs="24">
              <a-form-item>
                <a-button
                  :xl="12"
                  class="font-weight-bold mt-3"
                  type="primary"
                  block
                  :size="size"
                  @click="save"
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
      roomNotReady: false,
      freeParking: false,
      vRegident: "",
      paid: false,
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  created() {
    const tmpParam = CookieS.get("data");
    this.currData.push(tmpParam);
    this.currDataPrepare = this.currData["0"]["0"];
    this.langID = this.currDataPrepare.lang;
    this.hotelcode = this.currDataPrepare.hotelcode;
    this.gambar = this.currDataPrepare.gambar;
    this.hotelname = this.currDataPrepare.hotelname;
    this.labels = JSON.parse(localStorage.getItem("labels"));
    if (this.currDataPrepare) {this.loading = false;}
  },
  methods: {
    next() {
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
          } else if(!this.form.getFieldValue(["email"][0]).match(mailformat)) {
            this.form.validateFields(["email"]);
          }
        }
      } else if (this.current == 1) {
        if (
          this.form.getFieldValue(["country"][0]) == "INA" ||
          this.form.getFieldValue(["country"][0]) == "ina"
        ) {
          if (this.form.getFieldValue(["region"][0])) {
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
    search() {
      const datas = {
        0: {
          gast: this.currDataPrepare["gast"],
          ci: this.currDataPrepare.ci,
          co: this.currDataPrepare.co,
          resnr: this.currDataPrepare.resnr,
          reslinnr: this.currDataPrepare.reslinnr,
          zinr: this.currDataPrepare.zinr,
          "guest-email": this.form.getFieldValue("email"),
          "guest-phnumber": this.form.getFieldValue("phone"),
          purposeofstay: this.form.getFieldValue("purpose"),
          "guest-nation": this.form.getFieldValue("nationality"),
          "guest-country": this.form.getFieldValue("country"),
          "guest-region": this.form.getFieldValue("region"),
          "pre-checkin": this.currDataPrepare["pre-checkin"],
          "image-flag": "0 image id already exist",
          vreg: this.vRegident,
          hotelcode: this.hotelcode,
        }
      };
      CookieS.set("data", datas);

      async function getIP(){
        const response = await fetch('http://api.ipify.org/?format=json');
        const data = await response.json();
        return data.ip;
      }
      getIP().then((ip) => {
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
          this.currDataPrepare["gast"].replace(/ /g, "%20").replace(/,/g, "%2C") +
          "&billingPhone=" +
          this.form.getFieldValue(["phone"][0]) +
          "&billingEmail=" +
          this.form.getFieldValue(["email"][0]) +
          "&billingCity=Jakarta&billingState=JakSel&billingPostCd=16413&billingCountry=Indonesia&dbProcessUrl=dbproc&merchantToken=" +
          token.toString() +
          "&userIP=" +
          ip +
          "&cartData={}&callBackUrl=http://localhost:8080/mobilecheckin?param=" +
          this.hotelcode +
          "&instmntType=1&instmntMon=1&reccurOpt=0";

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
            // console.log("error payment");
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

          /*(async () => {
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
          })();*/
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
    save() {
      if (this.counter == this.id.length) {
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
        })();
        const mori =
          "{" +
          this.currDataPrepare.zinr +
          ";" +
          moment(this.currDataPrepare.co).format("MM/DD/YYYY") +
          "}";
        //this.check();
        //if (this.paymentStatus) {
        //console.log(this.paymentStatus);
        router.push({
          name: "SuccessCheckIn",
          params: {
            jin: mori,
            jun: this.wifiAddress,
            jen: this.wifiPassword,
            jon: this.currDataPrepare["argt-str"],
            jan: this.roomNotReady,
            email: this.form.getFieldValue(["email"][0]),
            phnum: this.form.getFieldValue(["phone"][0]),
            param: this.hotelcode,
          },
        });
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
      window.open("http://vhp-online.com/mobilecheckin?param=" + this.hotelcode, "_self")
      /*router.push({
        path: "mobilecheckin",
        query: { lang: this.langID, hotelcode: this.hotelcode },
      });*/
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
        (element) => element["program-variable"] == nameKey
      );
      let fixLabel = "";
      if (label["program-label1"] == undefined) {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["program-label1"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["program-label1"].charAt(0).toUpperCase() +
            label["program-label1"].slice(1);
        } else {
          fixLabel = label["program-label1"];
        }
      }
      return fixLabel;
    },
    setTitleCase(label) {
      return label.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    handleBack(){
      window.open("http://localhost:8080/mobilecheckin?param=" + this.hotelcode, "_self");
    },
  },
};
</script>