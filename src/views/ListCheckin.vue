<template>
  <div>
    <div class="home">
      <a-row
        class="header-brandings"
        :style="information"
        type="flex"
        justify="space-between"
      >
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">
            ONLINE CHECK-IN
          </h1>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img
            class="img-hotel float-right image"
            :src="gambar"
            alt="Image Loading"
          />
          <div class="overlay">
            <div class="text">{{ hotelname }}</div>
          </div>
          <div class="visible">
            <div class="online-checkin-mobile">
              <p class="text-center">Online Check-In</p>
            </div>
          </div>
        </a-col>
      </a-row>
      <div>
        <h1 class="mt-3 text-center">{{ getLabels("guest_list") }}</h1>
      </div>
      <div class="ml-3 mt-3 mr-3">
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
          :data-source="data"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            {{ item["l-selected"] }}
            <a-card
              :class="
                item['l-selected'] == true
                  ? 'selected'
                  : item['room-status'] != '0 Ready To Checkin'
                  ? 'notready'
                  : 'notselected'
              "
              @click="
                item['room-status'] == '0 Ready To Checkin'
                  ? select(item)
                  : disabled
              "
            >
              <h2
                :class="
                  item['l-selected'] == true
                    ? 'selected pl-3 font-weight-bold'
                    : item['room-status'] != '0 Ready To Checkin'
                    ? 'notready pl-3 font-weight-bold'
                    : 'notselected pl-3 font-weight-bold'
                "
              >
                {{ item["gast"] }}
              </h2>
              <p v-if="item.description != ''" class="pl-3">
                {{ item.description }}
              </p>
              <p v-else class="pl-3">
                <br />
              </p>
              <p class="pl-3">
                {{ getLabels("arrival") }}: {{ formatDate(item.ci) }}
                {{ getLabels("departure") }}: {{ formatDate(item.co) }}
              </p>
              <p class="pl-3">
                {{ item.adult }} {{ getLabels("adult") }}
                <a-tag color="green">{{ item["rmtype-str"] }}</a-tag>
              </p>
              <p
                v-if="item['room-status'] != '0 Ready To Checkin'"
                class="pl-3"
              >
                {{ item["room-status"].substr(2, item["room-status"].length) }}
              </p>
              <p v-else></p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <a-button
        class="fixed-bottom-right mr-3 float-right"
        type="primary"
        :size="size"
        :disabled="selectedData == 0 || selectedData == undefined"
        @click="send"
        >{{ getLabels("next") }}</a-button
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
      fairy: {},
      labels: [],
    };
  },
  created() {
    // console.log(this.$route.params.foo[0], "goks");
    this.data = this.$route.params.foo[0];
    this.setup = this.$route.params.foo[1];
    this.lemparsetup = this.$route.params.foo[1];
    this.gambar = this.setup["01"];
    this.information = this.setup["02"];
    this.hotelname = this.setup["13"];
  },
  mounted() {
    this.labels = JSON.parse(localStorage.getItem("labels"));
  },
  methods: {
    select(client) {
      if (client["l-selected"] == false) {
        // console.log('BLAH', client);
        this.selectedData.push(client);
        for (const i in this.data) {
          if (this.data[i]["i-counter"] == client["i-counter"]) {
            this.data[i]["l-selected"] = true;
            console.log(this.data[i]);
          }
        }
      } else {
        for (const i in this.data) {
          if (this.data[i]["i-counter"] == client["i-counter"]) {
            this.data[i]["l-selected"] = false;
          }
        }
        for (const x in this.selectedData) {
          if (this.selectedData[x]["i-counter"] == client["i-counter"]) {
            // console.log("msk");
            this.selectedData.splice(x, 1);
          }
        }
      }
      // console.log(this.fairy);
    },
    send() {
      // console.log(this.selectedData['0']);
      this.fairy["data"] = this.selectedData["0"];
      this.fairy["setup"] = this.lemparsetup;
      // console.log(this.fairy);
      router.push({ name: "Step", params: { id: this.fairy } });
    },
    formatDate(datum) {
      return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(datum));
    },
    getLabels(nameKey) {
      for (let x = 0; x < this.labels.length; x++) {
        if (this.labels[x]["program-variable"] === nameKey) {
          const splitStr = this.labels[x]["program-label1"]
            .toLowerCase()
            .split(" ");
          for (let y = 0; y < splitStr.length; y++) {
            splitStr[y] =
              splitStr[y].charAt(0).toUpperCase() + splitStr[y].substring(1);
          }
          return splitStr.join(" ");
        }
      }
    },
  },
};
</script>
