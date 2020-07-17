<template>
  <div class="example" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <div>
      <a-row type="flex" justify="start" align="top">
        <a-col>
          <img class="responsive" :src="require('../assets/GradientTop.svg')" />
        </a-col>
      </a-row>
    </div>
    <div class="home">
      <a-row class="grandvisual">
        <a-col :span="8" :md="12" :xs="24">
          <a-card :bordered="false">
            <img
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/CardOnlineCheck-in.svg"
            />
          </a-card>
        </a-col>
        <a-col class="text-center" :span="8" :md="12" :xs="24">
          <a-card :bordered="false">
            <img class="img-hotel shadow rounded" slot="cover" alt="Loading image" :src="gambar" />
            <a-card-meta title="Grand Visual Hotel Jakarta">
              <template
                slot="description"
              >Jl. Bukit Gading Raya, Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240, Indonesia, RT.18/RW.8, Klp. Gading Bar, Kec. Klp. Gading, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14240</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div>
      <h1 class="text-center">Guest List</h1>
    </div>
    <div class="sa-table">
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        :pagination="false"
        size="middle"
        default-expand-all-rows="true"
        :scroll="{ x: 'calc(700px + 50%)', y: 350 }"
      >
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" :key="tag" :color="'green'">{{ tag }}</a-tag>
        </span>
        <p v-if="!record.description == ''" slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p>
      </a-table>
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



const data = [];
const bookingCode = '123';
/*for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'Willy Wanta'+ i,
    arrival: '12/06/2020',
    departure: '14/06/2020',
    adult: '2',
    tags: ['Suites'],
    description: 'John Brown' + i,
  });
}*/
if (bookingCode == '123') {
  data.push({
    key: 1,
    name: 'Hanevi Djasri, Mr',
    arrival: '14/01/2019',
    departure: '14/01/2019',
    adult: '2',
    email: 'h.djasri@gmail.com',
    tags: ['Suites'],
    description: '',
  });
  data.push({
    key: 2,
    name: 'Haiying Li, Mrs',
    arrival: '12/01/2019',
    departure: '14/01/2019',
    adult: '2',
    email: 'li.haiying@gmail.com',
    tags: ['Suites'],
    description: 'Chao Bao, Mr',
  });
  data.push({
    key: 3,
    name: 'Yeoh Hui Jin, Mrs',
    arrival: '13/01/2019',
    departure: '14/01/2019',
    adult: '1',
    email: 'jin.yeoh@gmail.com',
    tags: ['Suites'],
    description: '',
  });
  data.push({
    key: 4,
    name: 'Saki Sato, Ms',
    arrival: '12/01/2019',
    departure: '14/01/2019',
    adult: '1',
    email: 'saki.kato@gmail.com',
    tags: ['Suites'],
    description: '',
  });
  data.push({
    key: 5,
    name: 'Muhammad Imdadun Rahmat, Mr',
    arrival: '13/01/2019',
    departure: '14/01/2019',
    adult: '2',
    email: 'm.imdadun@gmail.com',
    tags: ['Suites'],
    description: '',
  });
} else if (bookingCode == '456') {
  data.push({
    key: 1,
    name: 'Sri Sutji Rahaju, Ms',
    arrival: '14/01/2019',
    departure: '15/01/2019',
    adult: '1',
    email: 's.sutji@gmail.com',
    tags: ['Suites'],
    description: '',
  });
}

export default {
  data() {
    return {
      gambar:"https://source.unsplash.com/1366x786/?hotel",
      columns: [
       
        { title: "Guest Name", dataIndex: "name", key: "name" },
        { title: "Arrival Date", dataIndex: "arrival", key: "arrival" },
        { title: "Departure Date", dataIndex: "departure", key: "departure" },
        { title: "Adult", dataIndex: "adult", key: "adult" },
        {
          title: "Room Type",
          dataIndex: "tags",
          key: "tags",
          scopedSlots: { customRender: "tags" },
        },
],
      data,
      loading: true,
      selectedRowKeys: "",
      selectedData: [],
    };
  },
  created(){
    this.loading = false;
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedData = selectedRows;
          
          // selectedRows['index'] = selectedRowKeys; 

          // const tempDataSelected = selectedRows;
          // tempDataSelected['index'] = selectedRowKeys; 
          
          // this.selectedData = tempDataSelected;
        },
      };
    },
    },
};
</script>

<style scoped lang="scss">
.home {
  margin: 20px;
}
.rounded {
  border-radius: 0.25rem !important;
}
@media screen and (max-width: 576px) {
  .responsive {
    width: 100%;
  }
  .img-hotel {
    // width: 333px;
    height: 171.95px;
  }
}
@media screen and (min-width: 1200px) {
  .card-online {
    width: 400px;
  }
  .img-hotel {
    // width: 662px;
    height: 341.85px;
  }
}
.shadow {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
}
.text-center {
  text-align: center;
}
.sa-table {
  margin: 1rem;
}
.float-right {
  float: right !important;
}
.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}

.ant-table-row-expand-icon {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  display: inline-block;
  width: 17px;
  height: 17px;
  color: inherit;
  line-height: 13px;
  text-align: center;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  outline: none;
  transition: all 0.3s;
  user-select: none;
}
.ant-table-row-expand-icon:focus,
.ant-table-row-expand-icon:hover {
  color: #40a9ff;
}
.ant-table-row-expand-icon:active {
  color: #096dd9;
}
.ant-table-row-expand-icon:focus,
.ant-table-row-expand-icon:hover,
.ant-table-row-expand-icon:active {
  border-color: currentColor;
}
.ant-table-row-expanded::after {
  content: "\25B2";
}
.ant-table-row-collapsed::after {
  content: "\25BC";
}

.ant-table-row-collapsed::after {
  font-size: 12px;
  content: "\25BC";
  color: #bfbfbf;
}
.ant-table-row-expanded::after {
  content: "\25B2";
  font-size: 12px;
  color: #bfbfbf;
}
.example {
  text-align: center;
  background: white;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>