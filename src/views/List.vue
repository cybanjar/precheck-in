<template>
  <div>
    <div class="home">
      <a-row class="header-brandings" :style="information" type="flex" justify="space-between">
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">ONLINE CHECK-IN</h1>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img class="img-hotel float-right image" :src="gambar" alt="Image Loading" />
          <div class="overlay">
            <div class="text">Grand Visual Hotel Jakarta</div>
          </div>
          <div class="visible">
            <div class="online-checkin-mobile">
              <p class="text-center" :style="information">Online Check-In</p>
            </div>
          </div>
        </a-col>
      </a-row>
      <div>
        <h1 class="mt-3 text-center">Guest List</h1>
      </div>
      <div class="ml-3 mt-3 mr-3">
        <a-list
          :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
          :data-source="data"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card
              :class="item.isSelected == true ? 'selected' : 'notselected'"
              @click="select(item)"
            >
              <h2
                :class="
                  item.isSelected == true
                    ? 'selected pl-3 font-weight-bold'
                    : 'notselected pl-3 font-weight-bold'
                "
              >
                {{ item["guest-lname"] }},
                {{ item["guest-pname"] }}
              </h2>
              <p v-if="item['guest-member-name'] != ''" class="pl-3">{{ item['guest-member-name'] }}</p>
              <p v-else class="pl-3">
                <br />
              </p>
              <p class="pl-3">
                Arrival:
                <span class="font-weight-bold">{{ formatDate(item.arrive) }}</span>
                Departure:
                <span
                  class="font-weight-bold"
                >{{ formatDate(item.depart) }}</span>
              </p>
              <p class="pl-3">
                {{ item.rmqty }} Adult
                <a-tag color="green">{{ item['rate-desc'] }}</a-tag>
              </p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <!-- <router-link :to="{ name: 'Home', params: { id: selectedData } }"> -->
      <a-button
        class="fixed-bottom-right mr-3 float-right"
        type="primary"
        :size="size"
        :disabled="selectedData == 0 || selectedData == undefined"
        @click="send"
      >Next</a-button>
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
      information: {},
      lemparsetup: [],
      fairy: {},
    };
  },
  created() {
    this.data = this.$route.params.foo[0];
    this.setup = this.$route.params.foo[1];
    this.lemparsetup = this.$route.params.foo[1];
    this.gambar = this.setup["01"];
    this.information = this.setup["02"];

    for (const i in this.data) {
      this.data[i].isSelected = false;
      // console.log(i);
      this.data[i].key = Number(i) + 1;
    }
    return this.data;
    // console.log(this.data, "berubah");
  },
  methods: {
    send() {
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
      return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(datum));
    },
  },
};
</script>
