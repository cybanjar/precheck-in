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
                {{ item["guest-lname"].toUpperCase() }}
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
              <div class="row guestcard-peritem">
                <div class="col-4">
                  {{ getLabels("room_number", `titleCase`) }}
                </div>
                <div class="col-8 guestcard-item-text">
                  {{ item["rsv-number"] }}
                  <a-tag color="green" style="font-weight: normal !important">{{
                    item["argt-code"]
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
            :disabled="selectedData == 0 || selectedData == undefined"
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
      guestNameClass: "col-12 content-guestname",
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

    for (const i in this.data) {
      this.data[i].isSelected = false;
      this.data[i].guestStatus = "";
      this.data[i].rmshare = [];
      if (this.data[i]["room-sharer"] != "") {
        this.data[i].rmshare.push(this.data[i]["room-sharer"]);
      }
      if (this.data[i]["accompaying-guest"] != "") {
        this.data[i].rmshare.push(this.data[i]["accompaying-guest"]);
      }

      this.data[i].key = Number(i) + 1;
    }
    return this.data;
  },

  mounted() {
    this.labels = JSON.parse(localStorage.getItem("labels"));
  },
  methods: {
    send() {
      if (this.selectedData.length > 1) {
        // for (const i in this.selectedData) {
        const jumlah = this.selectedData.filter((item, index) => {
          return item["gcomment-desc"] == "GUEST ALREADY PCI";
        });
        if (this.selectedData.length == jumlah.length) {
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
          const asli = this.selectedData.filter((item, index) => {
            return item["gcomment-desc"] != "GUEST ALREADY PCI";
          });
          const data = asli;
          router.push({
            name: "Home",
            params: { Data: data, Param: this.lemparsetup },
          });
        }
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
    },
    select(client) {
      if (client.isSelected == false) {
        this.selectedData.push(client);
        for (const i in this.data) {
          if (this.data[i].key == client.key) {
            this.data[i].isSelected = true;
          }
        }
      } else {
        for (const i in this.data) {
          if (this.data[i].key == client.key) {
            this.data[i].isSelected = false;
          }
        }
        for (const x in this.selectedData) {
          if (this.selectedData[x].key == client.key) {
            this.selectedData.splice(x, 1);
          }
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
    handleStatus(item) {
      if (item["gcomment-desc"] == "GUEST ALREADY PCI") {
        item["guestStatus"] = this.getLabels(
          "status_already_pci",
          "sentenceCase"
        );
        return item["guestStatus"];
      } else {
        item["guestStatus"] = this.getLabels("status_not_pci", "sentenceCase");
        return item["guestStatus"];
      }
    },
    handleStatusColor(item) {
      let returnedColor = "";
      if (item["gcomment-desc"] == "GUEST ALREADY PCI") {
        returnedColor = "teal";
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
