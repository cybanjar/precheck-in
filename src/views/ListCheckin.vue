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
            <a-button key="back" @click="handleNo">
              {{ getLabels("no", `titleCase`) }}
            </a-button>
            <a-button key="submit" type="primary" @click="handleYes">{{
              getLabels("yes", `titleCase`)
            }}</a-button>
          </template>
          <p>{{ getLabels("mci_error_not_ready", "sentenceCase") }}</p>
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
          :data-source="data"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :class="item['l-selected'] == true ? 'selected' : 'notselected'"
              @click="select(item)"
            >
              <h2
                :class="
                  item['l-selected'] == true
                    ? 'selected pl-3 font-weight-bold'
                    : 'notselected pl-3 font-weight-bold'
                "
              >
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
              <!-- <p
                v-if="item['room-status'] != '0 Ready To Checkin'"
                class="pl-3"
              >
                {{ getLabels("mci_error_not_ready") }} -->
              <!--{{ item["room-status"].substr(2, item["room-status"].length) }}-->
              <!-- </p>
              <p v-else></p> -->
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <a-button class="mr-3" type="primary" size="large" @click="handleBack">{{
        getLabels("back", `titleCase`)
      }}</a-button>
      <a-button
        class="mr-3 float-right"
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
      information: {},
      lemparsetup: [],
      fairy: [],
      labels: [],
      langID: "",
      informationModal: false,
      roomNotReady: false,
      hotelEndpoint: "",
      hotelCode: "",
    };
  },
  created() {
    // console.log(this.$route.params.foo[0], "goks");
    const tempData = this.$route.params.foo[0];
    // console.log(tempData.sort(this.sorting));
    this.data = tempData;
    this.setup = this.$route.params.foo[1];
    this.lemparsetup = this.$route.params.foo[1];
    this.langID = this.$route.params.fighter;
    this.gambar = this.setup["01"];
    this.information = this.setup["02"];
    this.hotelname = this.setup["13"];
    this.hotelEndpoint = this.$route.params.endpoint;
    this.hotelCode = this.$route.params.hotelcode;
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
    select(client) {
      this.selectedData = client;
      if (client["l-selected"] == false) {
        for (const i in this.data) {
          if (this.data[i]["i-counter"] == client["i-counter"]) {
            this.data[i]["l-selected"] = true;
          } else {
            this.data[i]["l-selected"] = false;
          }
        }
      }
      // else {
      //   for (const i in this.data) {
      //     if (this.data[i]["i-counter"] == client["i-counter"]) {
      //       this.data[i]["l-selected"] = false;
      //     }
      //   }
      // }
      // console.log(client["l-selected"], "awal");
      // if (client["l-selected"] == false) {
      //   console.log(client["l-selected"], "kedua");
      //   for (const i in this.data) {
      //     console.log(client["l-selected"], "ketiga");
      //     console.log(client["i-counter"], "aneh");
      //     if (this.data[i]["i-counter"] != client["i-counter"]) {
      //       console.log(client["i-counter"], "aneh2");
      //       console.log(this.data[i]["i-counter"], "aneh2");

      //       this.data[i]["l-selected"] = false;
      //       console.log(this.data[i]["l-selected"], "datagagal");
      //       this.selectedData = [];
      //       console.log("msk1");
      //     } else {
      //       this.data[i]["l-selected"] = true;
      //       console.log(this.data[i]["l-selected"], "databener");
      //       this.selectedData.push(client);
      //       console.log("msk2");
      //       console.log(client, "client");
      //     }
      //   }
      // } else {
      //   for (const i in this.data) {
      //     // if (this.data[i]["i-counter"] == client["i-counter"]) {
      //     this.data[i]["l-selected"] = false;
      //     this.selectedData = [];
      //     console.log("msk3");
      //     // }
      //   }
      // }
    },
    send() {
      // this.fairy["data"] = this.selectedData;
      // this.fairy["setup"] = this.lemparsetup;
      this.fairy.push(this.selectedData);
      if (this.selectedData["room-status"] == "0 Ready To Checkin") {
        this.informationModal = false;
        this.roomNotReady = false;
        router.push({
          name: "Step",
          params: {
            foo: this.fairy,
            fighter: this.langID,
            endpoint: this.hotelEndpoint,
            hotelcode: this.hotelCode,
            notready: this.roomNotReady,
          },
        });
      } else {
        this.informationModal = true;
        this.roomNotReady = true;
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
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["program-variable"] == nameKey
      );

      let fixLabel = "";

      if (label["program-label1"] == "undefined") {
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
    handleYes() {
      this.informationModal = false;
      router.push({
        name: "Step",
        params: {
          foo: this.fairy,
          fighter: this.langID,
          endpoint: this.hotelEndpoint,
          hotelcode: this.hotelCode,
          notready: this.roomNotReady,
        },
      });
    },
    handleNo() {
      this.informationModal = false;
    },
    handleBack() {
      window.open(
        "http://localhost:8080/mobilecheckin?" + this.hotelCode,
        "_self"
      );
    },
  },
};
</script>
