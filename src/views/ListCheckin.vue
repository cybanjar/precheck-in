<template>
  <div>
    <div class="home">
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

      <h5 class="text-black text-center font-weight-bold visible">
        ONLINE CHECK-IN
      </h5>
      <div class="row justify-between" :style="information">
        <div class="q-ma-md col-md col-md-5 col-xs-12 invisibles">
          <h5 class="text-white font-weight-bold">ONLINE CHECK-IN</h5>
        </div>
        <div class="col-md col-md-3 col-xs-12">
          <q-card flat>
            <q-img :src="gambar">
              <div
                class="absolute-bottom font-weight-bold text-subtitle2 text-center"
              >
                {{ hotelname }}
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
      <div>
        <h1 class="mt-3 text-center">
          {{ weblabel.guestList }}
        </h1>
      </div>
      <div class="ml-3 mt-3 mr-3">
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 3, xxl: 3 }"
          :data-source="guestData"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <div :class="handleClass(item, 'status')" v-if="handleStatus(item)">
              {{ item.guestStatus }}
            </div>
            <a-card :class="handleClass(item, 'card')" @click="select(item)">
              <h2 :class="handleClass(item, 'h2')">
                {{ item["gast"].toUpperCase() }}
                <q-icon
                  name="people"
                  v-if="item['rmshare'].length !== 0"
                  @click="
                    visible == true ? (visible = false) : (visible = true)
                  "
                />
              </h2>
              <h2>{{ item["shortname"] }}</h2>
              <div v-if="item['rmshare'].length !== 0">
                <q-tooltip v-model="visible">
                  <div v-for="item in item['rmshare']" :key="item">
                    <p>
                      {{ item.toUpperCase() }}
                    </p>
                  </div></q-tooltip
                >

                <!-- <div v-show="visible">
                  <a-modal
                    :title="weblabel.information"
                    :visible="visible"
                    :closable="false"
                  >
                    <template slot="footer">
                      <a-button key="submit" type="primary" @click="handleOk">{{
                        weblabel.okMessage
                      }}</a-button>
                    </template>
                    <div v-for="item in item['rmshare']" :key="item">
                      <p>
                        {{ item.toUpperCase() }}
                      </p>
                    </div>
                  </a-modal>
                </div> -->
              </div>
              <p class="pl-3">{{ weblabel.bookCode }}: {{ item["resnr"] }}</p>
              <p v-if="item.description != ''" class="pl-3">
                {{ item.description }}
              </p>
              <p v-else class="pl-3">
                <br />
              </p>
              <p class="pl-3">
                {{ weblabel.arrival }}:
                {{ formatDate(item.ci) }}
                {{ weblabel.departure }}:
                {{ formatDate(item.co) }}
              </p>
              <p class="pl-3">{{ weblabel.roomNumber }}: {{ item.zinr }}</p>
              <p class="pl-3">
                {{ item.adult }} {{ weblabel.adult }}
                <a-tag color="green">{{ item["rmtype-str"] }}</a-tag>
              </p>
              <p class="pl-3">{{ item["argt-str"] }}</p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <a-button
        class="ml-3 float-left"
        type="default"
        size="large"
        style="margin-bottom: 20px !important;"
        @click="back"
        >{{ weblabel.back }}</a-button
      >
      <a-button
        class="mr-3 float-right"
        type="primary"
        size="large"
        style="margin-bottom: 20px !important;"
        :disabled="selectedData == 0 || selectedData == undefined"
        @click="send"
        >{{ weblabel.next }}</a-button
      >
    </div>
  </div>
</template>
<script>
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
      },
      visible: false,
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
      }
      if (sessionStorage.getItem("settings") != null) {
        setting = JSON.parse(sessionStorage.getItem("settings"));
      }
    } else {
      tempData = this.$route.params.guestData;
      setting = this.$route.params.setting;
    }
    console.log(this.$route.params);
    /* Assign ispopup property for tempData */
    console.log(tempData, "dataa");
    tempData.forEach((item) => {
      // if ((isMobile = true)) {
      const Name = item["gast"].substring(0, 5) + "...";
      Object.assign(item, { shortname: Name });
      // }
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
    console.log("Guest Not MCI", guestNotMCI);
    console.log("Guest Waiting", guestWaiting);
    console.log("Guest Checkin", guestCheckedIn);
    console.log(this.guestData);
    // console.log(this.guestData, this.setup);
    if (this.setup.successCheckin != undefined) {
      this.successCheckin = this.setup.successCheckin;
      this.setup.TotalData =
        this.setup.TotalData - this.setup.successCheckin.length;
    }
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
  },
  methods: {
    handleStatus(item) {
      if (item["res-status"] == "1 - Guest Already Checkin") {
        item["guestStatus"] = this.weblabel.statusCi;
        return true;
      } else if (item["ifdata-sent"] == true) {
        item["guestStatus"] = this.weblabel.statusQueue;
        return true;
      } else {
        return false;
      }
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
      if (
        this.selectedData["ifdata-sent"] == true &&
        this.selectedData["res-status"] != "1 - Guest Already Checkin"
      ) {
        // Show Pop Up Message
        this.informationQueue = true;
      } else {
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
