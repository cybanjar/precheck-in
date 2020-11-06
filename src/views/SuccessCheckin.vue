<template>
  <div>
    <div :style="ota" class="row justify-between pt-2">
      <div class="text-center col-xs-12">
        <img class="logo_hotel" :src="hotelLogo" />
      </div>
      <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
        <p :style="textOta" class="mci-hotel">{{ hotelName }}</p>
      </div>
    </div>
    <div class="row justify-around bg-white self-checkin">
      <div class="text-center">
        <canvas v-show="roomReady && QRshow" id="canvas"></canvas>
        <div v-if="roomReady">
          <p>{{ getLabels("room_number", `titleCase`) }} : {{ roomNumber }}</p>
          <p>
            {{ getLabels("wifi_address", `titleCase`) }} : {{ wifiAddress }}
          </p>
          <p>
            {{ getLabels("wifi_password", `sentenceCase`) }} :
            {{ wifiPassword }}
          </p>
          <p>
            {{ getLabels("arrangement", `sentenceCase`) }} : {{ arrangement }}
          </p>

          <!-- <p>Thank you for using our online check-in. Please save the QR code above for your check-in in the hotel.</p> -->
          <div class="row justify-center q-mt-xl">
            <div class="col-md-6 col-xs-11">
              <p v-if="!QRshow">
                {{ getLabels("mci_success_with_max_keycard", `sentenceCase`) }}
              </p>
              <p v-else>
                {{ getLabels("mci_success", `sentenceCase`) }}
              </p>
            </div>
          </div>

          <a-button @click="goBack">{{
            getLabels("done", `titleCase`)
          }}</a-button>
        </div>
        <div v-else>
          <div class="row justify-center q-mt-xl">
            <div class="col-md-6 col-xs-11">
              <p>{{ getLabels("phone_number", `titleCase`) }} : {{ phone }}</p>
              <p>{{ getLabels("email", `titleCase`) }} : {{ email }}</p>
              <p>
                {{ getLabels("mci_success_not_ready", `sentenceCase`) }}
              </p>
            </div>
          </div>

          <a-button @click="goBack">{{
            getLabels("done", `titleCase`)
          }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import ky from "ky";
import moment from "moment";
import router from "../router";
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
    };
  },
  mounted() {
    this.setup = this.$route.params.setting;
    this.guestData = this.$route.params.Data;
    if (this.setup == null || this.guestData == null) {
      if (sessionStorage.getItem("guestData") != null) {
        this.guestData = JSON.parse(sessionStorage.getItem("guestData"));
      }
      if (sessionStorage.getItem("settings") != null) {
        this.setup = JSON.parse(sessionStorage.getItem("settings"));
      }
    }
    // Get Label From LocalStorage
    this.labels = JSON.parse(localStorage.getItem("labels"));
    // Get Parsing Web Setting
    this.hotelLogo = this.setup.hotelLogo;
    this.hotelEndpoint = this.setup.hotelEndpoint;
    this.langID = this.setup.langID;
    this.ota.backgroundColor = this.setup.BackgroundColor;
    this.textOta.color = this.setup.FontColor;
    this.hotelImage = this.setup.hotelImage;
    this.hotelName = this.setup.hotelname;
    this.ciTime = this.setup.defaultCI;
    this.TotalData = this.setup.TotalData;
    this.location = this.setup.location;
    this.serverTime = this.setup.serverTime;
    const tempParam = this.location.slice(this.location.lastIndexOf("?") + 1);
    this.hotelParams = decodeURIComponent(tempParam);
    this.wifiAddress = this.setup.wifiAddress;
    this.wifiPassword = this.setup.wifiPassword;
    // Get Parsing Guest Data
    this.coDate = this.formatDateFind(this.guestData["co"]);
    this.bookingcode = this.guestData["resnr"];
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
    (async () => {
      const parsed = await ky
        .post(this.hotelEndpoint + "mobileCI/checkValidation", {
          json: {
            request: {
              rsvNumber: this.bookingcode,
              rsvlineNumber: this.reslinnr,
              caseType: "3", // 1 = check res status; 2 = check payment; 3 = check keycard
            },
          },
        })
        .json();
      this.data = parsed.response.keyString;
      if (parsed.response.keyMaked >= parsed.response.keyAvail) {
        this.QRshow = false;
      } else {
        this.QRshow = true;
      }
    })();
    // Generate QRCode
    const success = btoa(this.data);
    QRCode.toCanvas(
      document.getElementById("canvas"),
      success,
      { errorCorrectionLevel: "H" },
      { width: "76", height: "76" }
    );
    QRCode.toDataURL(success, { errorCorrectionLevel: "H" }).then((url) => {
      this.url = url.split(",")[1];
    });
  },
  methods: {
    formatDate(datum) {
      const dDate = String(moment(datum, "MM/DD/YYYY").date()).padStart(2, "0");
      const dMonth = String(moment(datum, "MM/DD/YYYY").month() + 1).padStart(
        2,
        "0"
      );
      const dYear = String(moment(datum, "MM/DD/YYYY").year());
      const fixDate = moment(`${dDate}/${dMonth}/${dYear}`, "DD/MM/YYYY")._i;
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
    goBack() {
      console.log(this.TotalData);
      if (this.TotalData == undefined) {
        window.open(this.location, "_self");
      } else {
        if (parseInt(this.TotalData) > 1) {
          (async () => {
            const data = await ky
              .post(this.hotelEndpoint + "mobileCI/findReservation", {
                json: {
                  request: {
                    coDate: this.coDate,
                    bookCode: this.bookingcode,
                    chName: " ",
                    earlyCI: "false",
                    maxRoom: "1",
                    citime: this.serverTime,
                    groupFlag: "false",
                  },
                },
              })
              .json();
            this.message = data.response["messResult"];
            const messResult = this.message.split("-");
            const messMessage = messResult[1].split(",");
            switch (messResult[0].trim()) {
              case "0":
                // Reservation is Found
                const reservation = [];
                /* Handling Multiple Guest to ListCheckin.vue */
                reservation.push(
                  data["response"]["arrivalGuestlist"]["arrival-guestlist"]
                );
                // // Get Total Guest
                // const tempTotal = reservation[0].filter((item, index) => {
                //   return (
                //     item["room-status"] !==
                //     "1 Room Already assign or Overlapping"
                //   );
                // });
                // this.setup.TotalData = tempTotal.length;
                // console.log("SuccessCheckin", {
                //   guestData: reservation[0],
                //   setting: this.setup,
                // });
                // Get Total Guest
                const rsvFix = reservation[0].filter((item, index) => {
                  if (item["room-sharer"] === true) {
                  } else {
                    return item;
                  }
                });
                const tempTotal = rsvFix.filter((item, index) => {
                  if (
                    item["room-status"] ==
                    "1 Room Already assign or Overlapping"
                  ) {
                  } else {
                    return item;
                  }
                });
                const roomShare = reservation[0].filter((item, index) => {
                  return item["room-sharer"] === true;
                });

                rsvFix.forEach((item, index) => {
                  Object.assign(item, { rmshare: [] });

                  roomShare.forEach((guest, index) => {
                    if (item["zinr"] == guest["zinr"]) {
                      item["rmshare"].push(guest["gast"]);
                    }
                  });
                  //console.log(item);
                });
                //console.log(rsvFix);

                this.setup.TotalData = tempTotal.length;

                if (tempTotal.length > 1) {
                  router.push({
                    name: "ListCheckIn",
                    params: {
                      guestData: rsvFix,
                      setting: this.setup,
                    },
                  });
                } else {
                  window.open(this.location, "_self");
                }
                break;
              default:
                break;
            }
          })();
        } else {
          window.open(this.location, "_self");
        }
      }
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

<style scoped lang="scss" src="../css/style.scss" />
