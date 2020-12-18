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
    <div class="row justify-around bg-white self-checkin">
      <div class="text-center col-12">
        <h1 class="mt-3 text-center">
          {{ getLabels("guest_list", `titleCase`) }}
        </h1>
      </div>
      <div class="listGuest row items-center q-col-gutter-md col-12">
        <div
          v-for="item in data"
          :key="item['guest-lname']"
          class="col-lg-4 col-md-4 col-sm-6 col-xs-12 guestItem"
        >
          <q-card
            flat
            bordered
            :class="handleClass(item, 'card')"
            @click="select(item)"
          >
            <q-card-section class="row">
              <div class="col-12 row" style="margin-bottom: 5px">
                <div class="col-4 label-guestname">
                  {{ getLabels("guest_name", `titleCase`) }}
                </div>
                <div class="col-8">
                  <q-chip
                    size="18px"
                    outline
                    :color="handleStatusColor(item)"
                    text-color="white"
                    class="float-right"
                  >
                    {{ handleStatus(item) }}
                  </q-chip>
                </div>
              </div>
              <div :class="guestNameClass">
                {{ item["fullName"].toUpperCase() }}
              </div>
            </q-card-section>
            <q-separator inset />
            <q-card-section class="guestcard-item">
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ getLabels("book_code", `titleCase`) }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ item["uid"] }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ getLabels("stay_period", `titleCase`) }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ formatDate(item["arrive"]) }} -
                  {{ formatDate(item["depart"]) }}
                </div>
              </div>
              <div class="row guestcard-peritem" style="min-height: 1.6rem">
                <div class="col-4">
                  {{ getLabels("room_number", `titleCase`) }}
                </div>
                <div :class="zinrClass" v-show="item['rmno'] != ''">
                  {{ item["rmno"] }}
                  <a-tag color="green" style="font-weight: normal !important">{{
                    item["rmdesc"]
                  }}</a-tag>
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ getLabels("guests", `titleCase`) }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ item["rmqty"] }} {{ getLabels("adult", `titleCase`) }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ getLabels("package", `titleCase`) }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ item["argt-code"] }}
                </div>
              </div>
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ getLabels("room_share", `titleCase`) }}
                </div>
                <div class="col-8 guestcard-item-text">
                  <q-chip
                    color="primary"
                    clickable
                    square
                    style="
                      background: white !important;
                      color: #262728 !important;
                      font-size: 0.6rem !important;
                      border: 1px solid gray;
                    "
                    v-if="item['rmshare'].length != 0"
                  >
                    {{ getLabels("mci_show", `titleCase`) }}
                    <q-menu>
                      <q-banner>
                        <template v-slot:avatar>
                          <q-icon name="supervisor_account" color="primary" />
                        </template>
                        <p
                          v-for="rmShare in item['rmshare']"
                          :key="rmShare"
                          style="margin: 0 !important; text-size: 12px"
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
      <!-- <router-link :to="{ name: 'Home', params: { id: selectedData } }"> -->
      <div class="row guest-list-button">
        <div class="col-6 button-item-right">
          <a-button
            class="fixed-bottom-right mr-3 float-right"
            type="primary"
            size="large"
            :disabled="selectedData.length == 0 || selectedData == undefined"
            @click="send"
            >{{ getLabels("next", `titleCase`) }}</a-button
          >
        </div>
      </div>
      <!-- <a-button
        class="fixed-bottom-right mr-3 float-right"
        type="primary"
        size="large"
        :disabled="selectedData == 0 || selectedData == undefined"
        @click="send"
        >{{ getLabels("next", `titleCase`) }}</a-button
      > -->
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script>
import router from "../router";
import moment from "moment";
import { Alert } from "ant-design-vue";
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
      labels: [],
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
      serverTime: "",
      systemTime: "",
      systemDate: undefined,
      maxPCITime: "08:00:00",
      serverDate: undefined,
      guestNameClass: "col-12 content-guestname",
      zinrClass: "col-8 guestcard-item-text",
      isMobile: false,
    };
  },
  created() {
    this.data = this.$route.params.Data;
    this.setup = this.$route.params.Param;
    if (this.data == null || this.setup == null) {
      this.data = JSON.parse(sessionStorage.getItem("saveData"));
      this.setup = JSON.parse(sessionStorage.getItem("saveSetting"));
    }
    if (
      sessionStorage.getItem("PCI") == "true" ||
      sessionStorage.getItem("PCIForm") == "true"
    ) {
      sessionStorage.setItem("PCI", false);
      sessionStorage.setItem("PCIForm", false);
      window.location = this.setup.location;
    }
    this.lemparsetup = this.setup;

    this.gambar = this.setup["gambar"];
    this.information.backgroundColor = this.setup["Background"];
    this.information.color = this.setup["Font"];
    this.hotelname = this.setup["hotelname"];
    this.textOta.color = this.setup["Font"];
    this.ota.backgroundColor = this.setup["Background"];
    this.hotelLogo = this.setup["hotelLogo"];
    this.serverTime = this.setup["serverTime"];
    this.systemTime = this.setup["systemTime"];
    this.maxPCITime = this.setup["maxPCITime"];
    this.serverDate = this.setup["serverDate"];

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

    this.data.forEach((item) => {
      Object.assign(item, { isSelected: false });
      Object.assign(item, { fullName: "" });
      Object.assign(item, { guestStatus: "" });
      Object.assign(item, { rmshare: [] });

      if (item["room-sharer"] != "") {
        item.rmshare.push(item["room-sharer"]);
      }
      if (item["accompaying-guest"] != "") {
        item.rmshare.push(item["accompaying-guest"]);
      }

      if (item["guest-fname"].length >= 0) {
        item.fullName = `${item["guest-lname"]}, ${item["guest-fname"]} ${item["guest-pname"]}`;
      } else {
        item.fullName = `${item["guest-lname"]}, ${item["guest-pname"]}`;
      }

      if (item["fullName"].length >= 36) {
        this.guestNameClass =
          "col-12 content-guestname content-guestname-space";
      }
      const joinZinr = item["rmno"] + item["rmdesc"];

      if (joinZinr.length >= 25 && this.isMobile) {
        this.zinrClass = "col-8 guestcard-item-text zinrMinHeight";
      }
    });
  },
  mounted() {
    this.labels = JSON.parse(sessionStorage.getItem("labels"));
  },
  methods: {
    send() {
      if (this.selectedData.length > 1) {
        // for (const i in this.selectedData) {
        router.push({
          name: "Home",
          params: { Data: this.selectedData, Param: this.lemparsetup },
        });
      } else {
        const ciDate = moment(
          `${this.selectedData[0]["arrive"]}`,
          "YYYY-MM-DD"
        );
        const dDate = ciDate.date();
        const dMonth = ciDate.month() + 1;
        const dYear = ciDate.year();

        const systemDate = moment(
          `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
          "DD/MM/YYYY HH:mm:ss"
        );
        const systemTimeValue = systemDate.valueOf();
        if (parseInt(this.setup["serverTime"]) > systemTimeValue) {
          router.push({
            name: "Info",
            params: {
              Param: this.lemparsetup,
            },
          });
        } else {
          if (this.selectedData[0]["gcomment-desc"] == "GUEST ALREADY PCI") {
            const Data =
              "{" +
              this.selectedData[0]["rsv-number"] +
              ";" +
              moment(this.selectedData[0].depart).format("MM/DD/YYYY") +
              "," +
              this.setup["checkInTIme"] +
              "}";

            router.push({
              name: "Success",
              params: {
                Data: Data,
                Param: this.lemparsetup,
              },
            });
          } else {
            const data = this.selectedData;
            router.push({
              name: "Home",
              params: { Data: data, Param: this.lemparsetup },
            });
          }
        }
      }
    },
    select(client) {
      const ciDate = moment(`${client["arrive"]}`, "YYYY-MM-DD");
      const dDate = ciDate.date();
      const dMonth = ciDate.month() + 1;
      const dYear = ciDate.year();

      const systemDate = moment(
        `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
        "DD/MM/YYYY HH:mm:ss"
      );
      const systemTimeValue = systemDate.valueOf();

      if (
        parseInt(this.setup["serverTime"]) > systemTimeValue ||
        client["gcomment-desc"] == "GUEST ALREADY PCI"
      ) {
        this.data.forEach((guest, index) => {
          if (
            guest["rsv-number"] == client["rsv-number"] &&
            guest["rsvline-number"] == client["rsvline-number"]
          ) {
            guest.isSelected = true;
            this.selectedData = [];
            this.selectedData.push(client);
          } else {
            guest.isSelected = false;
          }
        });
      } else {
        if (client.isSelected == false) {
          this.data.forEach((guest) => {
            if (
              guest["rsv-number"] == client["rsv-number"] &&
              guest["rsvline-number"] == client["rsvline-number"]
            ) {
              guest.isSelected = true;
              this.selectedData.push(guest);
              const index = this.selectedData.indexOf(guest);
            }

            if (guest["gcomment-desc"] == "GUEST ALREADY PCI") {
              guest.isSelected = false;
              const index = this.selectedData.indexOf(guest);
              if (index >= 0) {
                this.selectedData.splice(index, 1);
              }
            }

            /* Remove Expired Link */
            const ciDate = moment(`${guest["arrive"]}`, "YYYY-MM-DD");
            const dDate = ciDate.date();
            const dMonth = ciDate.month() + 1;
            const dYear = ciDate.year();

            const systemDate = moment(
              `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
              "DD/MM/YYYY HH:mm:ss"
            );
            const systemTimeValue = systemDate.valueOf();
            if (parseInt(this.setup["serverTime"]) > systemTimeValue) {
              guest.isSelected = false;
              const index = this.selectedData.indexOf(guest);
              if (index >= 0) {
                this.selectedData.splice(index, 1);
              }
            }
          });
        } else {
          this.data.forEach((guest) => {
            if (
              guest["rsv-number"] == client["rsv-number"] &&
              guest["rsvline-number"] == client["rsvline-number"]
            ) {
              guest.isSelected = false;
            }
          });
          this.selectedData.forEach((guest, index) => {
            if (
              guest["rsv-number"] == client["rsv-number"] &&
              guest["rsvline-number"] == client["rsvline-number"]
            ) {
              this.selectedData.splice(index, 1);
            }
          });
        }
      }
    },
    handleClass(item, used) {
      let returnedClass = "";
      if (used == "card") {
        if (item["isSelected"] == true) {
          returnedClass = "selected";
        } else if (
          item["isSelected"] == false &&
          item["gcomment-desc"] == "GUEST ALREADY PCI"
        ) {
          returnedClass = "checkin";
        } else if (
          item["isSelected"] == true &&
          item["gcomment-desc"] == "GUEST ALREADY PCI"
        ) {
          returnedClass = "selected";
        } else {
          returnedClass = "notselected";
        }
      } else if (used == "h2") {
        if (item["isSelected"] == true) {
          returnedClass = "disabled pl-3 font-weight-bold";
        } else if (item["isSelected"] == true) {
          returnedClass = "selected pl-3 font-weight-bold";
        } else if (item["isSelected"] == false) {
          returnedClass = "disabled pl-3 font-weight-bold";
        } else if (
          item["isSelected"] == false &&
          item["gcomment-desc"] == "GUEST ALREADY PCI"
        ) {
          returnedClass = "checkin pl-3 font-weight-bold";
        } else {
          returnedClass = "notselected pl-3 font-weight-bold";
        }
      } else if (used == "status") {
        const locale = sessionStorage.getItem("locale");
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
    handleStatus(item) {
      const ciDate = moment(`${item["arrive"]}`, "YYYY-MM-DD");
      const dDate = ciDate.date();
      const dMonth = ciDate.month() + 1;
      const dYear = ciDate.year();

      const systemDate = moment(
        `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
        "DD/MM/YYYY HH:mm:ss"
      );
      const systemTimeValue = systemDate.valueOf();

      if (item["gcomment-desc"] == "GUEST ALREADY PCI") {
        item["guestStatus"] = this.getLabels(
          "status_already_pci",
          "sentenceCase"
        );
        return item["guestStatus"];
      } else if (this.setup["serverTime"] > systemTimeValue) {
        item["guestStatus"] = this.getLabels(
          "status_pci_expired",
          "sentenceCase"
        );
      } else {
        item["guestStatus"] = this.getLabels("status_not_pci", "sentenceCase");
      }
      return item["guestStatus"];
    },
    handleStatusColor(item) {
      const ciDate = moment(`${item["arrive"]}`, "YYYY-MM-DD");
      const dDate = ciDate.date();
      const dMonth = ciDate.month() + 1;
      const dYear = ciDate.year();

      const systemDate = moment(
        `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
        "DD/MM/YYYY HH:mm:ss"
      );
      const systemTimeValue = systemDate.valueOf();

      let returnedColor = "";
      if (item["gcomment-desc"] == "GUEST ALREADY PCI") {
        returnedColor = "teal";
      } else if (this.setup["serverTime"] > systemTimeValue) {
        returnedColor = "orange";
      } else {
        returnedColor = "gray";
      }
      return returnedColor;
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
<style scoped lang="scss" src="../css/listcheckin.scss" />
