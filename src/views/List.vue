<template>
  <div>
    <div class="ml-3 mt-3 mr-3">
      <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }" :data-source="data">
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
            <p class="pl-3">From: {{item.arrival}} Until: {{item.departure}}</p>
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
        class="mr-3 float-right"
        type="primary"
        :size="size"
        :disabled="selectedData == 0"
      >Next</a-button>
    </router-link>
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
      // console.log(client);
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
