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
              <p v-if="item['guest-member-name'] != ''" class="pl-3">
                {{ item["guest-member-name"] }}
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
      information: {},
      lemparsetup: [],
      fairy: {},
      labels: [],
    };
  },
  created() {
    this.data = this.$route.params.foo[0];
    this.setup = this.$route.params.foo[1];
    this.lemparsetup = this.$route.params.foo[1];
    this.gambar = this.setup["01"];
    this.information = this.setup["02"];
    this.hotelname = this.setup["13"];

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
      for (const i in this.selectedData) {
        if (this.selectedData[i]["gcomment-desc"] == "GUEST ALREADY PCI") {
          this.selectedData.splice(i, 1);
        }
      }
      this.fairy["data"] = this.selectedData;
      this.fairy["setup"] = this.lemparsetup;
      router.push({ name: "Home", params: { id: this.fairy } });
    },
    select(client) {
      if (client.isSelected == false) {
        // console.log('BLAH', client);
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
        (element) => element["lang-variable"] == nameKey
      );

      let fixLabel = "";

      if (label["lang-value"] == "undefined") {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["lang-value"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["lang-value"].charAt(0).toUpperCase() +
            label["lang-value"].slice(1);
        } else {
          fixLabel = label["lang-value"];
        }
      }

      return fixLabel;
    },
    setTitleCase(label) {
      return label.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
  },
};
</script>
