<template>
  <div>
    <div class="home">
      <a-row class="header-brandings" type="flex" justify="space-between">
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold">ONLINE CHECK-IN</h1>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xs="24">
          <img
            class="img-hotel float-right image"
            src="https://source.unsplash.com/1366x786/?hotel"
            alt="Image Loading"
          />
          <div class="overlay">
            <div class="text">Grand Visual Hotel Jakarta</div>
          </div>
          <div class="visible">
            <div class="online-checkin-mobile">
              <p class="text-center">Online Check-In</p>
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
                :class="item.isSelected == true ? 'selected pl-3 font-weight-bold' : 'notselected pl-3 font-weight-bold'"
              >{{item.name}}</h2>
              <p v-if="item.description != ''" class="pl-3">{{item.description}}</p>
              <p v-else class="pl-3">
                <br />
              </p>
              <p class="pl-3">Arrival: <span class="font-weight-bold">{{item.arrival}}</span> Departure: <span class="font-weight-bold">{{item.departure}}</span></p>
              <p class="pl-3">
                {{item.adult}} Adult
                <a-tag color="green">{{ item.tags}}</a-tag>
              </p>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <router-link :to="{ name: 'Home', params: { id: selectedData } }">
        <a-button
          class="fixed-bottom-right mr-3 float-right"
          type="primary"
          :size="size"
          :disabled="selectedData == 0"
        >Next</a-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import { Alert } from "ant-design-vue";
const data = [
  {
    key: 1,
    name: "Hanevi Djasri, Mr",
    arrival: "14/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "h.djasri@gmail.com",
    tags: "Suites",
    rs: 0,
    description: "",
    isSelected: false,
    booking: "11423133",
  },
  {
    key: 2,
    name: "Haiying Li, Mrs",
    arrival: "12/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "li.haiying@gmail.com",
    tags: "Suites",
    rs: 1,
    description: "Chao Bao, Mr",
    isSelected: false,
    booking: "1120133",
  },
  {
    key: 3,
    name: "Yeoh Hui Jin, Mrs",
    arrival: "13/01/2019",
    departure: "14/01/2019",
    adult: "1",
    email: "jin.yeoh@gmail.com",
    tags: "Suites",
    rs: 0,
    description: "",
    isSelected: false,
    booking: "11022453",
  },
  {
    key: 4,
    name: "Saki Sato, Ms",
    arrival: "12/01/2019",
    departure: "14/01/2019",
    adult: "1",
    email: "saki.kato@gmail.com",
    tags: "Suites",
    rs: 0,
    description: "",
    isSelected: false,
    booking: "110201",
  },
  {
    key: 5,
    name: "Rahmat, Mr",
    arrival: "13/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "m.imdadun@gmail.com",
    tags: "Suites",
    rs: 0,
    description: "",
    isSelected: false,
    booking: "11034124",
  },
  {
    key: 6,
    name: "Sri Rahaju, Ms",
    arrival: "14/01/2019",
    departure: "15/01/2019",
    adult: "1",
    email: "s.sutji@gmail.com",
    tags: "Suites",
    rs: 0,
    description: "",
    isSelected: false,
    booking: "1101423",
  },
];

export default {
  data() {
    return {
      data,
      selectedData: [],
    };
  },
  methods: {
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
};
</script>
