<template>
  <div>
    <div v-if="loading">
      <div
        style="
          display: flex;
          width: 100% !important;
          height: 100vh;
          overflow: hidden;
          text-align: center;
          align-items: center;
          justify-content: center;
          margin-top: -50px;
        "
      >
        <q-spinner-ball color="red" size="8em" style="" />
      </div>
    </div>
    <div v-else>
      <div :style="ota" class="row justify-between pt-2">
        <div class="text-center col-xs-12">
          <img class="logo_hotel" :src="hotelLogo" />
        </div>
        <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
          <p :style="textOta" class="mci-hotel">{{ hotelName }}</p>
        </div>
      </div>
      <div class="row justify-around bg-white self-checkin">
        <div class="row mci-success-body" v-if="setup.kiosCheckin == false">
          <div
            class="col-12 text-center mci-success-padding"
            style="word-wrap: break-word"
            v-show="smsParam == null"
          >
            <!-- Guest Complete Name -->
            <p>{{ weblabel.guestName }}</p>
            <h2 class="mci-success-data">
              {{ guestData["gast"].toUpperCase() }}
            </h2>
          </div>
          <div class="col-12 text-center mci-success-margin">
            <!-- Room Number -->
            <p>{{ weblabel.roomNumber }}</p>
            <h2 class="mci-success-data">{{ guestData["zinr"] }}</h2>
            <h4 class="mci-h3">{{ guestData["rmtype-str"].toUpperCase() }}</h4>
          </div>
          <div
            class="col-12 mci-success-margin"
            style="display: flex; justify-content: center"
          >
            <!-- Information -->
            <div
              class="mci-info"
              style="
                word-wrap: break-word;
                min-width: 20rem !important;
                padding-left: 2rem;
                padding-top: 0.5rem;
                padding-right: 0.5rem;
                padding-bottom: 0.5rem;
              "
            >
              <!-- Handle Kotak -->
              <div class="row" v-show="smsParam == null">
                <div class="col-6">{{ weblabel.guests }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ adult }} {{ weblabel.adult }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">{{ weblabel.wifiAddress }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ wifiAddress }}
                </div>
              </div>
              <div
                class="row"
                v-if="wifiUserByRoom && guestData['zinr'].length != 0"
              >
                <div class="col-6">{{ weblabel.wifiUsername }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ guestData["zinr"] }}
                </div>
              </div>
              <div
                class="row"
                v-else-if="!wifiUserByRoom && wifiUsername.length != 0"
              >
                <div class="col-6">{{ weblabel.wifiUsername }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ wifiUsername }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">{{ weblabel.wifiPassword }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ wifiPassword }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">{{ weblabel.package }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ arrangement }}
                </div>
              </div>
              <div class="row" v-show="smsParam == null">
                <div class="col-6">{{ weblabel.arrival }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ checkInDate }} {{ timeNow }}
                </div>
              </div>
              <div class="row" v-show="smsParam == null">
                <div class="col-6">{{ weblabel.departure }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ checkOutDate }}
                </div>
              </div>
              <div class="row" v-show="!roomReady">
                <div class="col-6">{{ weblabel.phoneNumber }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ phone }}
                </div>
              </div>
              <div class="row" v-show="!roomReady">
                <div class="col-6">{{ weblabel.email }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ email }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center; margin-top: 10px"
            v-show="imageID != ''"
          >
            <!-- Room Number -->
            <div>
              <div>
                <p style="margin-bottom: 0.5rem">
                  {{ weblabel.mciIdPassport }}
                </p>
              </div>
              <div class="mci-img">
                <img
                  alt="guestID"
                  :src="imageID"
                  width="280"
                  id="imgID"
                  @click="showImage()"
                />
              </div>
            </div>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center; padding: 0 2rem"
          >
            <span
              class="borderStyle"
              style="height: 50px; border-top: 0.5px solid lightgray"
            ></span>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center"
          >
            <img
              src="../assets/FrontDesk.svg"
              style="height: 250px"
              v-if="roomReady"
            />
            <img
              src="../assets/email_notify.svg"
              style="height: 250px"
              v-else
            />
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center; margin-top: 10px"
          >
            <!-- Message -->
            <div style="padding: 0 1rem !important" v-if="roomReady">
              <p style="font-size: 1.2em; font-weight: 400; margin-bottom: 1px">
                {{ weblabel.mciSuccessWoKeyMsg[0] }}
              </p>
              <p style="font-size: 1.3em; font-weight: 600">
                {{ weblabel.mciSuccessWoKeyMsg[1] }}
              </p>
            </div>
            <div style="padding: 0 1rem !important" v-else>
              <p style="font-size: 1.2em; font-weight: 400; margin-bottom: 1px">
                {{ weblabel.mciSuccessNotReadyMsg[0] }}
              </p>
              <p style="font-size: 1.3em; font-weight: 600; margin-bottom: 1px">
                {{ weblabel.mciSuccessNotReadyMsg[1] }}
              </p>
              <p style="font-size: 1.2em; font-weight: 400">
                {{ weblabel.mciSuccessNotReadyMsg[2] }}
              </p>
            </div>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center"
          >
            <q-btn
              @click="goBack"
              color="primary"
              :disabled="gobackLoading"
              style="width: 200px"
            >
              {{ weblabel.done }}
              <q-spinner-ball
                color="white"
                style="
                  margin-left: 10px;
                  float: right;
                  position: absolute;
                  right: 10px;
                "
                v-if="gobackLoading"
              />
            </q-btn>
          </div>
        </div>
        <!-- KeyStation True -->
        <div class="row mci-success-body" v-else>
          <div
            class="col-12 mci-success-margin"
            style="display: flex; justify-content: center"
          >
            <img v-show="QRshow == true && roomReady == true" :src="url" />
          </div>
          <div class="col-12 text-center mci-success-margin">
            <!-- Room Number -->
            <p>{{ weblabel.roomNumber }}</p>
            <h2 class="mci-success-data">{{ guestData["zinr"] }}</h2>
            <h4 class="mci-h3">{{ guestData["rmtype-str"].toUpperCase() }}</h4>
          </div>
          <div
            class="col-12 mci-success-margin"
            style="display: flex; justify-content: center"
          >
            <!-- Information -->
            <div
              class="mci-info"
              style="
                word-wrap: break-word;
                min-width: 20rem !important;
                padding-left: 2rem;
                padding-top: 0.5rem;
                padding-right: 0.5rem;
                padding-bottom: 0.5rem;
              "
            >
              <!-- Handle Kotak -->
              <div class="row" v-show="smsParam == null">
                <div class="col-6">{{ weblabel.guests }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ adult }} {{ weblabel.adult }}
                </div>
              </div>
              <div class="row" v-show="roomReady">
                <div class="col-6">{{ weblabel.wifiAddress }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ wifiAddress }}
                </div>
              </div>

              <div
                class="row"
                v-if="wifiUserByRoom && guestData['zinr'].length != 0"
                v-show="roomReady"
              >
                <div class="col-6">{{ weblabel.wifiUsername }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ guestData["zinr"] }}
                </div>
              </div>
              <div
                class="row"
                v-else-if="!wifiUserByRoom && wifiUsername.length != 0"
                v-show="roomReady"
              >
                <div class="col-6">{{ weblabel.wifiUsername }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ wifiUsername }}
                </div>
              </div>

              <div class="row" v-show="roomReady">
                <div class="col-6">{{ weblabel.wifiPassword }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ wifiPassword }}
                </div>
              </div>
              <div class="row" v-show="smsParam == null">
                <div class="col-6">{{ weblabel.arrival }}</div>
                <div class="col-6" style="font-weight: bold; padding: 0.2rem 0">
                  {{ checkInDate }} {{ timeNow }}
                </div>
              </div>
              <div class="row" v-show="smsParam == null">
                <div class="col-6">{{ weblabel.departure }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ checkOutDate }}
                </div>
              </div>
              <div class="row">
                <div class="col-6">{{ weblabel.package }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ arrangement }}
                </div>
              </div>
              <div class="row" v-show="!roomReady">
                <div class="col-6">{{ weblabel.phoneNumber }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ phone }}
                </div>
              </div>
              <div class="row" v-show="!roomReady">
                <div class="col-6">{{ weblabel.email }}</div>
                <div
                  class="col-6"
                  style="font-weight: bold; padding-top: 0.2rem"
                >
                  {{ email }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center; padding: 0 1rem"
          >
            <span
              class="borderStyle"
              style="height: 50px; border-top: 0.5px solid lightgray"
            ></span>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center"
          >
            <div v-if="!QRshow">
              <img
                src="../assets/reached_maximum_amount_of_keycard-03.svg"
                style="height: 250px"
                v-if="roomReady"
              />
              <img
                src="../assets/email_notify.svg"
                style="height: 250px"
                v-else
              />
            </div>
            <div v-else>
              <img
                src="../assets/ScanQRCode.svg"
                style="height: 250px"
                v-if="roomReady"
              />
              <img
                src="../assets/email_notify.svg"
                style="height: 250px"
                v-else
              />
            </div>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center; margin-top: 10px"
          >
            <!-- Message -->
            <div style="padding: 0 1rem !important" v-if="roomReady">
              <div v-if="QRshow == false" style="margin-top: 2rem">
                <p
                  style="font-size: 1.2em; font-weight: 400; margin-bottom: 1px"
                >
                  {{ weblabel.mciSuccessMaxKeyMsg[0] }}
                </p>
                <p
                  style="font-size: 1.3em; font-weight: 600; margin-bottom: 1px"
                >
                  {{ weblabel.mciSuccessMaxKeyMsg[1] }}
                </p>
                <p style="font-size: 1.2em; font-weight: 400">
                  {{ weblabel.mciSuccessMaxKeyMsg[2] }}
                </p>
              </div>
              <div v-else>
                <p
                  style="font-size: 1.2em; font-weight: 400; margin-bottom: 1px"
                >
                  {{ weblabel.mciSuccessMsg[0] }}
                </p>
                <p
                  style="font-size: 1.3em; font-weight: 600; margin-bottom: 1px"
                >
                  {{ weblabel.mciSuccessMsg[1] }}
                </p>
                <p style="font-size: 1.2em; font-weight: 400">
                  {{ weblabel.mciSuccessMsg[2] }}
                </p>
              </div>
            </div>
            <div style="padding: 0 1rem !important" v-else>
              <div class="row justify-center">
                <div>
                  <p
                    style="
                      font-size: 1.2em;
                      font-weight: 400;
                      margin-bottom: 1px;
                    "
                  >
                    {{ weblabel.mciSuccessNotReadyMsg[0] }}
                  </p>
                  <p
                    style="
                      font-size: 1.3em;
                      font-weight: 600;
                      margin-bottom: 1px;
                    "
                  >
                    {{ weblabel.mciSuccessNotReadyMsg[1] }}
                  </p>
                  <p style="font-size: 1.2em; font-weight: 400">
                    {{ weblabel.mciSuccessNotReadyMsg[2] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-12 text-center mci-success-margin"
            style="display: flex; justify-content: center; margin-top: 10px"
          >
            <q-btn
              @click="goBack"
              color="primary"
              :disabled="gobackLoading"
              style="width: 200px"
            >
              {{ weblabel.done }}
              <q-spinner-ball
                color="white"
                style="
                  margin-left: 10px;
                  float: right;
                  position: absolute;
                  right: 10px;
                "
                v-if="gobackLoading"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal MCI Confirm Check-in -->
    <a-modal
      :title="weblabel.information"
      :visible="infoMCIConfim"
      :closable="false"
    >
      <template slot="footer">
        <a-button @click="backToHome">{{ weblabel.no }}</a-button>
        <a-button type="primary" @click="backToList">{{
          weblabel.yes
        }}</a-button>
      </template>
      <p>{{ weblabel.mciConfirmCi }}</p>
    </a-modal>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import store from "@/store/store";
import QRCode from "qrcode";
import moment from "moment";
import router from "../router";
import Viewer from "viewerjs";
import api from "../api/Endpoint";
export default {
  data() {
    return {
      roomNumber: "",
      url: "",
      wifiAddress: "",
      wifiPassword: "",
      arrangement: "",
      labels: [],
      roomReady: false,
      email: "",
      phone: "",
      langID: "",
      location: "",
      ota: {
        backgroundColor: "",
        width: "100%",
        // height: "100vh",
        overflowX: "hidden",
        textAlign: "center",
      },
      textOta: {
        color: "",
        // opacity: "0.65",
      },
      hotelImage: "",
      hotelName: "",
      hotelParams: "",
      coDate: "",
      ciTime: "",
      bookingcode: "",
      TotalData: "",
      hotelLogo: "",
      setup: "",
      hotelEndpoint: "",
      QRshow: "false",
      reslinnr: "",
      serverTime: "",
      message: "",
      guestData: {},
      weblabel: {
        roomNumber: "",
        wifiAddress: "",
        wifiPassword: "",
        arrangement: "",
        mciSuccessWithMaxKeycard: "",
        mciSuccess: "",
        done: "",
        phoneNumber: "",
        email: "",
        mciSuccessNotReady: "",
        mciConfirmCi: "",
        no: "",
        yes: "",
        mciSuccessWoKeystation: "",
        guests: "",
        arrival: "",
        departure: "",
        mciIdPassport: "",
        guestName: "",
        adult: "",
        mciSuccessMsg: [],
        mciSuccessNotReadyMsg: [],
        mciSuccessMaxKeyMsg: [],
        mciSuccessWoKeyMsg: [],
        package: "",
        wifiUsername: "",
      },
      infoMCIConfim: false,
      loading: true,
      gobackLoading: false,
      imageID: "",
      Test: "",
      adult: "",
      checkOutDate: "",
      checkIntDate: "",
      timeNow: "",
      wifiUserByRoom: false,
      wifiUsername: "",
    };
  },
  async created() {
    this.setup = this.$route.params.setting;
    this.guestData = this.$route.params.Data;
    this.smsParam = this.$route.params.smsParam;
    if (this.smsParam != null || sessionStorage.getItem("smsParam") != null) {
      /* Handle SMS */
      if (this.smsParam == null) {
        this.smsParam = JSON.parse(sessionStorage.getItem("smsParam"));
      }
      if (sessionStorage.getItem("settings") != null) {
        this.setup = JSON.parse(sessionStorage.getItem("settings"));
      } else {
        window.open(
          `${window.location.protocol}//${window.location.host}`,
          "_self"
        );
      }
      if (sessionStorage.getItem("guestData") != null) {
        this.guestData = JSON.parse(sessionStorage.getItem("guestData"));
      } else {
        window.open(this.setup["location"], "_self");
      }

      this.guestData["resnr"] = this.smsParam.keyString.split("|")[1];
      this.guestData["reslinnr"] = this.smsParam.keyString.split("|")[2];
      this.guestData["zinr"] = this.smsParam.roomNumber;
      this.guestData["argt-str"] = this.smsParam.arrangement.trim();
      this.guestData["rmtype-str"] = this.smsParam.roomType;
    } else if (this.setup == null || this.guestData == null) {
      if (sessionStorage.getItem("settings") != null) {
        this.setup = JSON.parse(sessionStorage.getItem("settings"));
      } else {
        window.open(
          `${window.location.protocol}//${window.location.host}`,
          "_self"
        );
      }
      if (sessionStorage.getItem("guestData") != null) {
        this.guestData = JSON.parse(sessionStorage.getItem("guestData"));
      } else {
        window.open(this.setup["location"], "_self");
      }
    }
    // Get Label From LocalStorage
    this.labels = JSON.parse(sessionStorage.getItem("labels"));
    // Get Parsing Web Setting
    this.hotelLogo = this.setup.hotelLogo;
    this.hotelEndpoint = this.setup.hotelEndpoint;
    this.langID = this.setup.langID;
    this.ota.backgroundColor = this.setup.BackgroundColor;
    this.textOta.color = this.setup.FontColor;
    this.hotelImage = this.setup.hotelImage;
    this.hotelName = this.setup.hotelName;
    this.ciTime = this.setup.defaultCI;
    this.TotalData = this.setup.TotalData;
    this.location = this.setup.location;
    this.serverTime = this.setup.serverTime;
    this.wifiUserByRoom = this.setup.wifiUserByRoom;
    this.wifiUsername = this.setup.wifiUsername;
    const tempParam = this.location.slice(this.location.lastIndexOf("?") + 1);
    this.hotelParams = decodeURIComponent(tempParam);
    this.wifiAddress = this.setup.wifiAddress;
    if (
      this.guestData["wifi-password"] ||
      this.guestData["wifi-password"] != ""
    ) {
      this.wifiPassword = this.guestData["wifi-password"];
    } else {
      this.wifiPassword = this.setup.wifiPassword;
    }

    this.timeNow = moment().format("HH:mm");

    // Get Parsing Guest Data
    this.coDate = this.formatDateFind(this.guestData["co"]);
    this.checkOutDate = this.formatDate(this.guestData["co"]);
    this.checkInDate = this.formatDate(this.guestData["ci"]);
    this.bookingcode = this.guestData["resnr"];
    this.adult = this.guestData["adult"];
    this.reslinnr = this.guestData["reslinnr"];
    this.roomReady = this.guestData["roomReady"];
    this.roomNumber = this.guestData["zinr"];
    this.arrangement = this.guestData["argt-str"];
    this.email = this.guestData["guest-email"];
    this.phone = this.guestData["guest-phnumber"];
    // Selecting Language
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
    // Check Validation of Keycard
    const parsed = await api.doFetch(
      this.hotelEndpoint + "mobileCI/checkValidation",
      {
        rsvNumber: this.bookingcode,
        rsvlineNumber: this.reslinnr,
        caseType: "3", // 1 = check res status; 2 = check payment; 3 = check keycard
      }
    );

    this.data = parsed.response.keyString;
    if (parsed.response.keyAvail <= 0) {
      this.QRshow = false;
    } else {
      this.QRshow = true;
    }

    // Generate QRCode
    // Get Guest Image
    const giResponse = await api.doFetch(
      this.hotelEndpoint + "mobileCI/loadIDCard",
      {
        guestno: this.guestData["gastno"],
      }
    );
    if (giResponse.response.imagedata != "") {
      this.imageID = "data:image/png;base64," + giResponse.response.imagedata;
    } else {
      this.imageID = "";
    }

    // Labeling
    this.weblabel.roomNumber = this.findLabel("room_number", "titleCase");
    this.weblabel.adult = this.findLabel("adult", "titleCase");
    this.weblabel.wifiAddress = this.findLabel("wifi_address", "titleCase");
    this.weblabel.wifiPassword = this.findLabel("wifi_password", "titleCase");
    this.weblabel.arrangement = this.findLabel("arrangement", "sentenceCase");
    this.weblabel.mciSuccessWithMaxKeycard = this.findLabel(
      "mci_success_with_max_keycard",
      `sentenceCase`
    );
    this.weblabel.mciSuccess = this.findLabel("mci_success", "sentenceCase");
    this.weblabel.done = this.findLabel("done", "titleCase");
    this.weblabel.phoneNumber = this.findLabel("phone_number", "titleCase");
    this.weblabel.email = this.findLabel("email", "titleCase");
    this.weblabel.package = this.findLabel("package", "titleCase");
    this.weblabel.mciSuccessNotReady = this.findLabel(
      "mci_success_not_ready",
      "sentenceCase"
    );
    this.weblabel.mciConfirmCi = this.findLabel(
      "mci_confirm_ci",
      "sentenceCase"
    );
    this.weblabel.yes = this.findLabel("yes", "sentenceCase");
    this.weblabel.no = this.findLabel("no", "sentenceCase");
    this.weblabel.guests = this.findLabel("guests", "sentenceCase");
    this.weblabel.arrival = this.findLabel("arrival", "sentenceCase");
    this.weblabel.departure = this.findLabel("departure", "sentenceCase");
    this.weblabel.mciIdPassport = this.findLabel(
      "mci_id_passport",
      "sentenceCase"
    );
    this.weblabel.guestName = this.findLabel("guest_name", "titleCase");
    this.weblabel.wifiUsername = this.findLabel("wifi_username", "titleCase");
    this.weblabel.mciSuccessWoKeystation = this.findLabel(
      "mci_success_wo_keystation",
      "sentenceCase"
    );
    this.weblabel.mciSuccessWoKeyMsg.push(
      this.weblabel.mciSuccessWoKeystation.split(".")[0].trim()
    );
    this.weblabel.mciSuccessWoKeyMsg.push(
      this.weblabel.mciSuccessWoKeystation.split(".")[1].trim()
    );
    this.weblabel.mciSuccessNotReadyMsg.push(
      this.weblabel.mciSuccessNotReady.split(".")[0].trim()
    );
    this.weblabel.mciSuccessNotReadyMsg.push(
      this.weblabel.mciSuccessNotReady.split(".")[1].trim()
    );
    this.weblabel.mciSuccessNotReadyMsg.push(
      this.weblabel.mciSuccessNotReady.split(".")[2].trim()
    );
    this.weblabel.mciSuccessMaxKeyMsg.push(
      this.weblabel.mciSuccessWithMaxKeycard.split(".")[0].trim()
    );
    this.weblabel.mciSuccessMaxKeyMsg.push(
      this.weblabel.mciSuccessWithMaxKeycard.split(".")[1].trim()
    );
    this.weblabel.mciSuccessMaxKeyMsg.push(
      this.weblabel.mciSuccessWithMaxKeycard.split(".")[2].trim()
    );
    this.weblabel.mciSuccessMsg.push(
      this.weblabel.mciSuccess.split(".")[0].trim()
    );
    this.weblabel.mciSuccessMsg.push(
      this.weblabel.mciSuccess.split(".")[1].trim()
    );
  },
  methods: {
    findLabel(nameKey, used) {
      let labels = undefined;
      if (sessionStorage.getItem("labels") == null) {
        labels = sessionStorage.getItem("labels");
      } else {
        labels = this.labels;
      }
      let fixLabel = "";
      const locale = sessionStorage.getItem("locale");
      const label = labels.find((el) => {
        return el["program-variable"].trim() == nameKey.trim();
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
    showImage() {
      const viewer = new Viewer(document.getElementById("imgID"), {
        inline: false,
        viewed() {
          viewer.zoomTo(1);
        },
      });
      viewer.destroy();
      viewer.show();
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
    formatDateFind(datum) {
      const dDate = String(moment(datum, "YYYY-MM-DD").date()).padStart(2, "0");
      const dMonth = String(moment(datum, "YYYY-MM-DD").month() + 1).padStart(
        2,
        "0"
      );
      const dYear = String(moment(datum, "YYYY-MM-DD").year());
      const fixDate = moment(`${dMonth}/${dDate}/${dYear}`, "MM/DD/YYYY")._i;
      return fixDate;
    },
    backToHome() {
      window.open(this.location, "_self");
    },
    backToList() {
      const mainReservation = JSON.parse(sessionStorage.getItem("listData"));
      const settings = JSON.parse(sessionStorage.getItem("settings"));
      router.push({
        name: "ListCheckIn",
        params: {
          guestData: mainReservation,
          setting: settings,
        },
      });
    },
    async goBack() {
      if (this.smsParam != null) {
        this.backToHome();
      } else {
        this.gobackLoading = true;
        const data = await api.doFetch(
          this.hotelEndpoint + "mobileCI/findReservation",
          {
            coDate: this.setup.SearchCO,
            bookCode: this.setup.SearchValue,
            chName: " ",
            earlyCI: "false",
            maxRoom: "1",
            citime: this.serverTime,
            groupFlag: "false",
          }
        );

        this.message = data.response["messResult"];
        const messResult = this.message.split("-");
        //const messMessage = messResult[1].split(",");
        this.gobackLoading = false;
        switch (messResult[0].trim()) {
          case "0":
            // Reservation is Found
            const reservation = [];
            /* Get Temporary Total Reservation */
            reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            // Reservation Without Room Sharer (Main Guest Reservation)
            const mainReservation = reservation[0].filter((item) => {
              if (item["room-sharer"] === true) {
              } else {
                return item;
              }
            });
            if (mainReservation.length > 1) {
              // Reservation Without Room Sharer + Overlapping (Acceptable Reservation)
              const acceptRsv = mainReservation.filter((item) => {
                if (
                  item["room-status"] == "1 Room Already assign or Overlapping"
                ) {
                } else {
                  return item;
                }
              });
              this.setup.TotalData = acceptRsv.length;
              // Reservation Room Share Only
              const roomShare = reservation[0].filter((item) => {
                return item["room-sharer"] === true;
              });
              // Attach Room Share into Main Guest Reservation
              // Also counting Total Of Checked-in and Waiting List
              let countCheckedIn = 0;
              let countWaiting = 0;
              mainReservation.forEach((item) => {
                Object.assign(item, { rmshare: [] });
                roomShare.forEach((guest) => {
                  if (item["zinr"] == guest["zinr"]) {
                    item["rmshare"].push(guest["gast"]);
                  }
                });
                if (item["res-status"] == "1 - Guest Already Checkin") {
                  // Checked In Guest
                  countCheckedIn++;
                } else if (item["ifdata-sent"] == true) {
                  // Waiting List Guest
                  countWaiting++;
                }
              });
              if (acceptRsv.length - (countCheckedIn + countWaiting) >= 1) {
                // Open Modal Question
                sessionStorage.setItem(
                  "listData",
                  JSON.stringify(mainReservation)
                );
                sessionStorage.setItem("settings", JSON.stringify(this.setup));
                this.infoMCIConfim = true;
              } else {
                this.backToHome();
              }
            } else {
              this.backToHome();
            }
            break;
          default:
            break;
        }
      }
    },
    showAnimation() {
      setTimeout(() => {
        this.loading = false;
        /* Generate QR Code */
        QRCode.toDataURL(this.data, { errorCorrectionLevel: "H" }).then(
          (err, url) => {
            if (err) {
              this.url = err;
            } else {
              this.url = url.split(",")[1];
            }
          }
        );
      }, 2000);
    },
  },
  watch: {
    isIdle(newIdle) {
      if (newIdle == true || newIdle == "true") {
        window.open(this.location, "_self");
      }
    },
  },
  async mounted() {
    await this.$nextTick();

    this.showAnimation();
  },
  computed: {
    isIdle() {
      return store.state.idleVue.isIdle;
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss" />
