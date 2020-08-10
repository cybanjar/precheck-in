<template>
  <div>
    <div>
      <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          {{item.isSelected}}
          <a-card
            :class="item.isSelected == true ? 'selected' : 'notselected'"
            @click="select(item)"
          >
            <p>Name: {{item.name}}</p>
            <p>arrival: {{item.arrival}}</p>
            <p>departure: {{item.departure}}</p>
            <p>adult: {{item.adult}}</p>
            <p>email: {{item.email}}</p>
            <p>tags: {{item.tags}}</p>
            <p>rs: {{item.rs}}</p>
            <p>description: {{item.description}}</p>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <div>{{ selectedData }}</div>
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
    tags: ["Suites"],
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
    tags: ["Suites"],
    rs: 1,
    description: "Chao Bao, Mr",
    isSelected: true,
  },
  {
    key: 3,
    name: "Yeoh Hui Jin, Mrs",
    arrival: "13/01/2019",
    departure: "14/01/2019",
    adult: "1",
    email: "jin.yeoh@gmail.com",
    tags: ["Suites"],
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
    tags: ["Suites"],
    rs: 0,
    description: "",
    isSelected: false,
  },
  {
    key: 5,
    name: "Muhammad Imdadun Rahmat, Mr",
    arrival: "13/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "m.imdadun@gmail.com",
    tags: ["Suites"],
    rs: 0,
    description: "",
    isSelected: false,
  },
  {
    key: 6,
    name: "Sri Sutji Rahaju, Ms",
    arrival: "14/01/2019",
    departure: "15/01/2019",
    adult: "1",
    email: "s.sutji@gmail.com",
    tags: ["Suites"],
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
      console.log(client);
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
            console.log("msk"); 
            this.selectedData.splice(x, 1);
          }
        }
      }
    },
  },
};
</script>
