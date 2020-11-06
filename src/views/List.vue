<template>
  <div>
    <div class="home">
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
        <h4 class="mt-3 text-center">
          {{ getLabels("guest_list", `titleCase`) }}
        </h4>
      </div>
      <div class="ml-3 mt-3 mr-3">
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
          :data-source="data"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :class="
                item.isSelected == true
                  ? 'selected'
                  : item['gcomment-desc'] == 'GUEST ALREADY PCI'
                  ? 'notready'
                  : 'notselected'
              "
              @click="select(item)"
            >
              <h6
                :class="
                  item.isSelected == true
                    ? 'selected pl-3 font-weight-bold'
                    : item['gcomment-desc'] == 'GUEST ALREADY PCI'
                    ? 'notready pl-3 font-weight-bold'
                    : 'notselected pl-3 font-weight-bold'
                "
              >
                {{ item["guest-fname"] }} {{ item["guest-lname"] }},
                {{ item["guest-pname"] }}
              </h6>
              <p v-if="item['room-sharer'] != ''" class="pl-3">
                {{ item["room-sharer"] }}
              </p>
              <p v-else-if="item['accompaying-guest'] != ''" class="pl-3">
                {{ item["accompaying-guest"] }}
              </p>
              <p v-else class="pl-3">
                <br />
              </p>
              <p class="pl-3">
                {{ getLabels("arrival", `titleCase`) }}:
                <span class="font-weight-bold">
                  {{ formatDate(item.arrive) }}
                </span>
                {{ getLabels("departure", `titleCase`) }}:
                <span class="font-weight-bold">
                  {{ formatDate(item.depart) }}
                </span>
              </p>
              <p class="pl-3">
                {{ item.rmqty }} {{ getLabels("adult", `titleCase`) }}
                <a-tag color="green">{{ item["rate-desc"] }}</a-tag>
              </p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <!-- <router-link :to="{ name: 'Home', params: { id: selectedData } }"> -->
      <a-button
        class="fixed-bottom-right mr-3 float-right"
        type="primary"
        size="large"
        :disabled="selectedData == 0 || selectedData == undefined"
        @click="send"
        >{{ getLabels("next", `titleCase`) }}</a-button
      >
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
    };
  },
  created() {
    this.data = this.$route.params.Data;
    this.setup = this.$route.params.Param;
    if (this.data == null || this.setup == null) {
      this.data = JSON.parse(sessionStorage.getItem("saveData"));
      this.setup = JSON.parse(sessionStorage.getItem("saveSetting"));
    }
    if (sessionStorage.getItem("PCI") == "true") {
      sessionStorage.setItem("PCI", false);
    }
    this.lemparsetup = this.setup;

    this.gambar = this.setup["gambar"];
    this.information.backgroundColor = this.setup["Background"];
    this.information.color = this.setup["Font"];
    this.hotelname = this.setup["hotelname"];

    for (const i in this.data) {
      this.data[i].isSelected = false;
      // console.log(i);
      this.data[i].key = Number(i) + 1;
    }
    return this.data;
    // console.log(this.data, "berubah");
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
          this.selectedData.splice(jumlah, jumlah.length);
          const data = this.selectedData;
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
            // console.log("msk");
            this.selectedData.splice(x, 1);
          }
        }
      }
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
