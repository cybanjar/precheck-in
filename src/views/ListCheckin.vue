<template>
  <div>
    <!-- Information Room Not Avail (For Overlapping) -->
    <div v-show="informationModal">
      <a-modal
        :title="weblabel.information"
        :visible="informationModal"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="handleYes">{{
            weblabel.okMessage
          }}</a-button>
        </template>
        <p>
          {{ weblabel.mciRoomNotAvail }}
        </p>
      </a-modal>
    </div>

    <!-- Information Room Not Ready Yet (For Status VacantDirty / Not Assigned) -->
    <div v-show="informationQueue">
      <a-modal
        :title="weblabel.information"
        :visible="informationQueue"
        :closable="false"
      >
        <template slot="footer">
          <a-button key="submit" type="primary" @click="refreshStatus">{{
            weblabel.okMessage
          }}</a-button>
        </template>
        <p>
          {{ weblabel.mciConfirmStatus }}
        </p>
      </a-modal>
    </div>

    <div :style="ota" class="row justify-between pt-2">
      <div class="text-center col-xs-12">
        <img class="logo_hotel" :src="hotelLogo" />
      </div>
      <div class="col-xs-12 text-center q-mb-lg q-mt-sm">
        <p :style="textOta" class="mci-hotel">{{ hotelname }}</p>
      </div>
    </div>
    <div class="row justify-around bg-white self-checkin">
      <div class="text-center">
        <h1 class="mt-3 text-center">
          {{ weblabel.guestList }}
        </h1>
      </div>
      <div class="listGuest row items-center q-col-gutter-md">
        <div
          v-for="guest in guestData"
          :key="guest['gast']"
          class="col-lg-4 col-md-4 col-sm-6 col-xs-12 guestItem"
        >
          <q-card flat bordered :class="handleClass(guest, 'card')" @click="select(guest)">
            <q-card-section class="row">
              <div class="col-12 row" style="margin-bottom: 5px;">
                <div class="col-4 label-guestname">{{ weblabel.guestName }}</div>
                <div class="col-8">
                  <q-chip
                    size="18px"
                    outline
                    :color="handleStatusColor(guest)"
                    text-color="white"
                    class="float-right"
                  >
                    {{ handleStatus(guest) }}
                  </q-chip>
                </div>
              </div>
              <div :class="guestNameClass">
                {{ guest["gast"].toUpperCase() }}
              </div>
            </q-card-section>
            <q-separator inset />
            <q-card-section class="guestcard-item">
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ weblabel.bookCode }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ guest["resnr"] }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ weblabel.stayPeriod }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ formatDate(guest["ci"]) }} - {{ formatDate(guest["co"]) }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ weblabel.roomNumber }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ guest["zinr"] }}
                  <a-tag
                    color="green"
                    style="font-weight: normal !important;"
                    >{{ guest["rmtype-str"] }}</a-tag
                  >
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ weblabel.guests }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ guest["adult"] }} {{ weblabel.adult }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ weblabel.package }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ guest["argt-str"] }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ weblabel.roomShare }}
                </div>
                <div class="col-8 guestcard-item-text">
                  <q-chip
                    color="primary"
                    clickable
                    square
                    style="background: white !important; color: #262728 !important; font-size: 0.6rem !important; border: 1px solid gray;"                    
                    v-if="guest['rmshare'].length > 0"
                  >
                    {{ weblabel.mciShow }}
                    <q-menu>
                      <q-banner>
                        <template v-slot:avatar>
                          <q-icon name="supervisor_account" color="primary" />
                        </template>
                        <p
                          v-for="rmShare in guest['rmshare']"
                          :key="rmShare"
                          style="margin: 0 !important; text-size: 12px;"
                        >
                          {{ rmShare }}
                        </p>
                      </q-banner>
                    </q-menu>
                  </q-chip>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>      
      <div class="row guest-list-button">
        <div class="col-6 button-item-left">
          <a-button
            type="default"
            size="large"
            @click="back"
            >{{ weblabel.back }}</a-button
          >
        </div>
        <div class="col-6 button-item-right">
          <a-button
            type="primary"
            size="large"
            :disabled="selectedData == 0 || selectedData == undefined"
            @click="send"
            >{{ weblabel.next }}</a-button
          >
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store/store";
import router from "../router";
import { Alert } from "ant-design-vue";
import moment from "moment";
export default {
  data() {
    return {
      selectedData: [],
      gambar: "",
      hotelname: "",
      information: {
        backgroundColor: "$green",
        color: "$white",
        borderRadius: "4px",
      },
      lemparsetup: [],
      data: [],
      labels: [],
      langID: "",
      informationModal: false,
      informationQueue: false,
      hotelEndpoint: "",
      hotelCode: "",
      guestData: [],
      license: false,
      location: "",
      programLabel: "",
      successCheckin: [],
      TotalData: "",
      weblabel: {
        information: "",
        okMessage: "",
        mciRoomNotAvail: "",
        guestList: "",
        bookCode: "",
        arrival: "",
        departure: "",
        roomNumber: "",
        adult: "",
        back: "",
        mciConfirmStatus: "",
        statusCi: "",
        statusQueue: "",
        notCheckedInYet: "",
        stayPeriod: "",
        guests: "",
        package: "",
        roomShare: "",
        guestName: "",
        notAvailableForCheckin: "",
        mciShow: "",
      },
      visible: false,
      isMobile: false,
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
      hotelLogo: "",
      guestNameClass: "col-12 content-guestname",
    };
  },
  created() {
    let tempData = undefined;
    let setting = undefined;
    if (
      this.$route.params.guestData == null ||
      this.$route.params.setting == null
    ) {
      if (sessionStorage.getItem("listData") != null) {
        tempData = JSON.parse(sessionStorage.getItem("listData"));
      } else {
        tempData = null;
      }
      if (sessionStorage.getItem("settings") != null) {
        setting = JSON.parse(sessionStorage.getItem("settings"));
      } else {
        setting = null;
      }
    } else {
      tempData = this.$route.params.guestData;
      setting = this.$route.params.setting;
    }
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
    /* Assign ispopup property for tempData */
    tempData.forEach((item) => {      
      if (item["gast"].length >= 36) {
        this.guestNameClass =
          "col-12 content-guestname content-guestname-space";
      }
      Object.assign(item, { ispopup: false });
      Object.assign(item, { guestStatus: "" });
    });
    this.guestData = tempData;
    this.setup = setting;
    /* Do Sorting For Guest Data */
    const guestNotMCI = [];
    const guestWaiting = [];
    const guestCheckedIn = [];
    this.guestData.forEach((item) => {
      if (item["res-status"] == "1 - Guest Already Checkin") {
        guestCheckedIn.push(item);
      } else if (item["ifdata-sent"] == true) {
        guestWaiting.push(item);
      } else {
        guestNotMCI.push(item);
      }
    });
    this.guestData = guestNotMCI.concat(guestWaiting.concat(guestCheckedIn));
    sessionStorage.setItem("listData", JSON.stringify(this.guestData));
    sessionStorage.setItem("settings", JSON.stringify(this.setup));
    // console.log("Guest Not MCI", guestNotMCI);
    // console.log("Guest Waiting", guestWaiting);
    // console.log("Guest Checkin", guestCheckedIn);
    // console.log(this.guestData);
    // console.log(this.guestData, this.setup);
    if (this.setup.successCheckin != undefined) {
      this.successCheckin = this.setup.successCheckin;
      this.setup.TotalData =
        this.setup.TotalData - this.setup.successCheckin.length;
    }
    this.textOta.color = this.setup["FontColor"];
    this.ota.backgroundColor = this.setup["BackgroundColor"];
    this.hotelLogo = this.setup["hotelLogo"];
    this.gambar = this.setup["hotelImage"];
    this.location = this.setup["location"];
    this.license = this.setup["LICENSE"];
    this.information.backgroundColor = this.setup["BackgroundColor"];
    this.information.color = this.setup["FontColor"];
    this.hotelname = this.setup["hotelName"];
    this.langID = this.setup["langID"];
    this.labels = JSON.parse(localStorage.getItem("labels"));
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
    this.hotelEndpoint = this.setup["hotelEndpoint"];
    this.hotelCode = this.setup["hotelCode"];
    /* Handle Labeling */
    this.weblabel.information = this.findLabel("information", "titleCase");
    this.weblabel.okMessage = this.findLabel("ok_message", "upperCase");
    this.weblabel.mciRoomNotAvail = this.findLabel(
      "mci_room_not_avail",
      "sentenceCase"
    );
    this.weblabel.guestList = this.findLabel("guest_list", "titleCase");
    this.weblabel.bookCode = this.findLabel("book_code", "titleCase");
    this.weblabel.arrival = this.findLabel("arrival", "titleCase");
    this.weblabel.departure = this.findLabel("departure", "titleCase");
    this.weblabel.roomNumber = this.findLabel("room_number", "titleCase");
    this.weblabel.adult = this.findLabel("adult", "titleCase");
    this.weblabel.back = this.findLabel("back", "titleCase");
    this.weblabel.next = this.findLabel("next", "titleCase");
    this.weblabel.mciConfirmStatus = this.findLabel(
      "mci_confirm_status",
      "sentenceCase"
    );
    this.weblabel.statusCi = this.findLabel("status_ci", "sentenceCase");
    this.weblabel.statusQueue = this.findLabel("status_queue", "sentenceCase");
    this.weblabel.notCheckedInYet = this.findLabel("not_checked_in_yet", "upperCase");
    this.weblabel.stayPeriod = this.findLabel("stay_period", "titleCase");
    this.weblabel.guests = this.findLabel("guests", "titleCase");
    this.weblabel.package = this.findLabel("package", "titleCase");
    this.weblabel.roomShare = this.findLabel("room_share", "titleCase");
    this.weblabel.guestName = this.findLabel("guest_name", "titleCase");
    this.weblabel.notAvailableForCheckin = this.findLabel("not_available_for_checkin", "titleCase");
    this.weblabel.mciShow = this.findLabel("show", "titleCase");
  },
  methods: {
    handleStatus(item) {
      if (item["res-status"] == "1 - Guest Already Checkin") {
        item["guestStatus"] = this.weblabel.statusCi;
        return item["guestStatus"];
      } else if (item["ifdata-sent"] == true) {
        item["guestStatus"] = this.weblabel.statusQueue;
        return item["guestStatus"];
      } else {
        item["guestStatus"] = this.weblabel.notCheckedInYet;
        return item["guestStatus"];
      }
    },
    handleStatusColor(item) {
      let returnedColor = "";
      if (item["res-status"] == "1 - Guest Already Checkin") {
        returnedColor = "teal";
      } else if (item["ifdata-sent"] == true) {
        returnedColor = "orange";
      } else {
        returnedColor = "gray";
      }
      return returnedColor;
    },
    findLabel(nameKey, used) {
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
    back() {
      window.open(this.setup.location, "_self");
    },
    sorting(a, b) {
      if (a.resnr < b.resnr) {
        return -1;
      } else if (a.resnr > b.resnr) {
        return 1;
      } else {
        return 0;
      }
    },
    handleClass(item, used) {
      let returnedClass = "";
      if (used == "card") {
        if (item["l-selected"] == true && item["ispopup"] == true) {
          returnedClass = "disabled";
        } else if (item["l-selected"] == true && item["ispopup"] == false) {
          returnedClass = "selected";
        } else if (item["l-selected"] == false && item["ispopup"] == true) {
          returnedClass = "disabled";
        } else if (
          item["l-selected"] == false &&
          item["res-status"] == "1 - Guest Already Checkin"
        ) {
          returnedClass = "checkin";
        } else if (
          item["l-selected"] == true &&
          item["res-status"] == "1 - Guest Already Checkin"
        ) {
          returnedClass = "selected";
        } else {
          returnedClass = "notselected";
        }
      } else if (used == "h2") {
        if (item["l-selected"] == true && item["ispopup"] == true) {
          returnedClass = "disabled pl-3 font-weight-bold";
        } else if (item["l-selected"] == true && item["ispopup"] == false) {
          returnedClass = "selected pl-3 font-weight-bold";
        } else if (item["l-selected"] == false && item["ispopup"] == true) {
          returnedClass = "disabled pl-3 font-weight-bold";
        } else if (
          item["l-selected"] == false &&
          item["res-status"] == "1 - Guest Already Checkin"
        ) {
          returnedClass = "checkin pl-3 font-weight-bold";
        } else {
          returnedClass = "notselected pl-3 font-weight-bold";
        }
      } else if (used == "status") {
        const locale = localStorage.getItem("locale");
        if (locale == "EN") {
          returnedClass = "infoCardEN";
        } else if (locale == "ID") {
          returnedClass = "infoCardID";
        } else {
          returnedClass = "infoCardEN";
        }
      }
      return returnedClass;
    },
    select(client) {
      /* Handle Client Data Modal */
      const rmStatus = client["room-status"].split(" ");
      if (parseInt(rmStatus[0]) == 1) {
        // RmStatus 1 Overlapping
        if (client["ispopup"] == false) {
          this.informationModal = true;
          for (const i in this.guestData) {
            if (this.guestData[i]["i-counter"] == client["i-counter"]) {
              this.guestData[i]["ispopup"] = true;
              this.guestData[i]["l-selected"] = false;
            } else {
              this.guestData[i]["l-selected"] = false;
            }
          }
        } else {
          // Do Nothing
        }
      } else if (parseInt(rmStatus[0]) > 1) {
        // RmStatus 2 (Not Ready to Checkin) && 3 (Type Selected Not Available)
        // Must Check License True = Selected || False = Disabled
        if (this.license == true) {
          this.selectedData = client;
          if (client["l-selected"] == false) {
            for (const i in this.guestData) {
              if (this.guestData[i]["i-counter"] == client["i-counter"]) {
                this.guestData[i]["l-selected"] = true;
              } else {
                this.guestData[i]["l-selected"] = false;
              }
            }
          }
        } else {
          if (client["ispopup"] == false) {
            this.informationModal = true;
            for (const i in this.guestData) {
              if (this.guestData[i]["i-counter"] == client["i-counter"]) {
                this.guestData[i]["ispopup"] = true;
                this.guestData[i]["l-selected"] = false;
              } else {
                this.guestData[i]["l-selected"] = false;
              }
            }
          } else {
            // Do Nothing
          }
        }
      } else {
        // Ready To Checkin
        this.selectedData = client;
        if (client["l-selected"] == false) {
          for (const i in this.guestData) {
            if (this.guestData[i]["i-counter"] == client["i-counter"]) {
              this.guestData[i]["l-selected"] = true;
            } else {
              this.guestData[i]["l-selected"] = false;
            }
          }
        }
      }
    },
    refreshStatus() {
      this.informationQueue = false;
    },
    send() {
      /*
      if (
        this.selectedData["ifdata-sent"] == true &&
        this.selectedData["res-status"] != "1 - Guest Already Checkin"
      ) {
        // Show Pop Up Message
        this.informationQueue = true;
      } else {
        
      }
      */
      const findData = this.successCheckin.find((item) => {
        return item == this.selectedData["reslinnr"];
      });
      if (findData == undefined) {
        this.successCheckin.push(this.selectedData["reslinnr"]);
      }
      Object.assign(this.setup, { successCheckin: this.successCheckin });
      sessionStorage.setItem("listData", JSON.stringify(this.guestData));
      sessionStorage.setItem("settings", JSON.stringify(this.setup));
      const resstatus = this.selectedData["res-status"].split(" - ");
      if (parseInt(resstatus[0]) == 1) {
        // Add RoomReady Variable
        Object.assign(this.selectedData, { roomReady: true });
        sessionStorage.setItem(
          "guestData",
          JSON.stringify(this.selectedData)
        );
        router.push({
          name: "SuccessCheckIn",
          params: {
            Data: this.selectedData,
            setting: this.setup,
          },
        });
      } else if (
        this.selectedData["ifdata-sent"] == true &&
        this.selectedData["res-status"] != "1 - Guest Already Checkin"
      ) {
        // Add RoomReady Variable
        Object.assign(this.selectedData, { roomReady: false });
        sessionStorage.setItem(
          "guestData",
          JSON.stringify(this.selectedData)
        );
        router.push({
          name: "SuccessCheckIn",
          params: {
            Data: this.selectedData,
            setting: this.setup,
          },
        });
      } else {
        sessionStorage.setItem(
          "guestData",
          JSON.stringify(this.selectedData)
        );
        router.push({
          name: "Step",
          params: {
            guestData: this.selectedData,
            setting: this.setup,
          },
        });
      }      
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
    handleYes() {
      this.informationModal = false;
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
    isIdle() {
      return store.state.idleVue.isIdle;
    },
  },
};
</script>
<style scoped>
.infoCardEN {
  position: absolute !important;
  top: 0;
  right: 20px;
  height: 30px !important;
  width: 100px !important;
  color: #606060 !important;
  background-color: white !important;
  border-radius: 0 0 5px 5px;
  -webkit-border-radius: 0 0 5px 5px;
  -moz-border-radius: 0 0 5px 5px;
  z-index: 999;
  text-align: center;
  padding-top: 3px;
  -webkit-transform: translate3d(0, 0, 0);
  border-top: 1px solid #e8e8e8;
}
.infoCardID {
  position: absolute !important;
  top: 0;
  right: 20px;
  height: 30px !important;
  width: 130px !important;
  color: #606060 !important;
  background-color: white !important;
  border-radius: 0 0 5px 5px;
  -webkit-border-radius: 0 0 5px 5px;
  -moz-border-radius: 0 0 5px 5px;
  z-index: 999;
  text-align: center;
  padding-top: 3px;
  -webkit-transform: translate3d(0, 0, 0);
  border-top: 1px solid #e8e8e8;
}
.ant-row {
  display: flex !important;
  flex-wrap: wrap !important;
}
</style>
<style scoped lang="scss" src="../css/listcheckin.scss" />