<template>
  <div>
    <div>
      <a-list
        :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
        :data-source="data"
        @click="select"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card>
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
const data = [];
const bookingCode = "123";
if (bookingCode == "123") {
  data.push({
    key: 1,
    name: "Hanevi Djasri, Mr",
    arrival: "14/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "h.djasri@gmail.com",
    tags: ["Suites"],
    rs: 0,
    description: "",
  });
  data.push({
    key: 2,
    name: "Haiying Li, Mrs",
    arrival: "12/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "li.haiying@gmail.com",
    tags: ["Suites"],
    rs: 1,
    description: "Chao Bao, Mr",
  });
  data.push({
    key: 3,
    name: "Yeoh Hui Jin, Mrs",
    arrival: "13/01/2019",
    departure: "14/01/2019",
    adult: "1",
    email: "jin.yeoh@gmail.com",
    tags: ["Suites"],
    rs: 0,
    description: "",
  });
  data.push({
    key: 4,
    name: "Saki Sato, Ms",
    arrival: "12/01/2019",
    departure: "14/01/2019",
    adult: "1",
    email: "saki.kato@gmail.com",
    tags: ["Suites"],
    rs: 0,
    description: "",
  });
  data.push({
    key: 5,
    name: "Muhammad Imdadun Rahmat, Mr",
    arrival: "13/01/2019",
    departure: "14/01/2019",
    adult: "2",
    email: "m.imdadun@gmail.com",
    tags: ["Suites"],
    rs: 0,
    description: "",
  });
} else if (bookingCode == "456") {
  data.push({
    key: 1,
    name: "Sri Sutji Rahaju, Ms",
    arrival: "14/01/2019",
    departure: "15/01/2019",
    adult: "1",
    email: "s.sutji@gmail.com",
    tags: ["Suites"],
    rs: 0,
    description: "",
  });
}

export default {
  data() {
    return {
      data,
      selectedData: [],
    };
  },
  methods: {
    select(client) {
      this.selectedData = client;
      console.log(client, "goks");
    },
  },
};
</script>
<style></style>
