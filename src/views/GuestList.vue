<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <div>
      <a-row type="flex" justify="start" align="top">
        <a-col>
          <img class="ilustrasi-top" :src="require('../assets/GradientTop.svg')" />
        </a-col>
      </a-row>
    </div>
    <div class="home">
      <a-row class="grandvisual" type="flex" justify="space-between">
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
        <a-col :span="10" :md="10" :xs="24">
          <a-card :bordered="false">
            <img class="img-hotel shadow rounded" slot="cover" alt="Loading image" :src="gambar" />
            <a-card-meta title="Grand Visual Hotel Jakarta">
              <template slot="description">{{ addessHotel }}</template>
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
        default-expand-all-rows="{ true }"
        :scroll="{ x: 'calc(700px + 50%)', y: 350 }"
      >
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" :key="tag" :color="'green'">{{ tag }}</a-tag>
        </span>
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p>
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
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'Willy Wanta'+ i,
    arrival: '12/06/2020',
    departure: '14/06/2020',
    adult: '2',
    tags: ['Suites'],
    description: 'John Brown' + i,

  });
}

export default {
  data() {
    return {
      addessHotel: "Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240",
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

<style scoped lang="scss" src="../css/style.scss">
</style>