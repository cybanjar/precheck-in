<template>
  <div>
    <div class="home">
      <div v-show="informationModal">
        <a-modal
          :title="getLabels('information', `titleCase`)"
          :visible="informationModal"
          :closable="false"
        >
          <template slot="footer">
            <a-button key="submit" type="primary" @click="handleYes"
              >OK</a-button
            >
          </template>
          <p>
            Sorry, your room is not ready. Please proceed to the Reception for
            further information.
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
          {{ getLabels("guest_list", `titleCase`) }}
        </h1>
      </div>
      <div class="ml-3 mt-3 mr-3">
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
          :data-source="guestData"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card :class="handleClass(item, 'card')" @click="select(item)">
              <h2 :class="handleClass(item, 'h2')">
                {{ item["gast"].toUpperCase() }}
              </h2>
              <p class="pl-3">
                {{ getLabels("book_code", `titleCase`) }}: {{ item["resnr"] }}
              </p>
              <p v-if="item.description != ''" class="pl-3">
                {{ item.description }}
              </p>
              <p v-else class="pl-3">
                <br />
              </p>
              <p class="pl-3">
                {{ getLabels("arrival", `titleCase`) }}:
                {{ formatDate(item.ci) }}
                {{ getLabels("departure", `titleCase`) }}:
                {{ formatDate(item.co) }}
              </p>
              <p class="pl-3">
                {{ getLabels("room_number", `titleCase`) }}: {{ item.zinr }}
              </p>
              <p class="pl-3">
                {{ item.adult }} {{ getLabels("adult", `titleCase`) }}
                <a-tag color="green">{{ item["rmtype-str"] }}</a-tag>
              </p>
              <p class="pl-3">{{ item["argt-str"] }}</p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <a-button
        class="mr-3 float-right mb-3"
        type="primary"
        size="large"
        :disabled="selectedData == 0 || selectedData == undefined"
        @click="send"
        >{{ getLabels("next", `titleCase`) }}</a-button
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
      hotelEndpoint: "",
      hotelCode: "",
      guestData: [],
      license: false,
      location: "",
      programLabel: "",
    };
  },
  created() {
    //console.log(this.$route.params, "nyampe bro");
    const tempData = this.$route.params.guestData;
    /* Assign ispopup property for tempData */
    tempData.forEach((item) => {
      Object.assign(item, { ispopup: false });
    });
    const tempTotal = tempData.filter((item, index) => {
      return item["room-status"] !== "1 Room Already assign or Overlapping";
    });
    // console.log(tempTotal.length);
    this.guestData = tempData;
    this.setup = this.$route.params.setting[0];
    this.lemparsetup = this.$route.params.setting[0];
    Object.assign(this.lemparsetup, { TotalData: tempTotal.length });
    // console.log(this.lemparsetup, "masuk?");
    this.gambar = this.setup["hotelImage"];
    this.location = this.setup["location"];
    this.license = this.setup["LICENSE"];
    this.information.backgroundColor = this.setup["BackgroundColor"];
    this.information.color = this.setup["FontColor"];
    this.hotelname = this.setup["hotelName"];
    this.langID = this.setup["langID"];
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
  },
  mounted() {
    this.labels = JSON.parse(localStorage.getItem("labels"));
  },
  methods: {
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
        } else {
          returnedClass = "notselected pl-3 font-weight-bold";
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
    send() {
      router.replace({
        name: "Step",
        params: {
          guestData: this.selectedData,
          setting: this.lemparsetup,
        },
      });
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