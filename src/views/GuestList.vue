<template>
  <div>
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
            <img class="img-hotel shadow rounded" slot="cover" alt="example" :src="gambar" />
            <a-card-meta class="font-weight-bold" title="Grand Visual Hotel Jakarta">
              <template
                slot="description"
              >Jl. Bukit Gading Raya, Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240, Indonesia, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14240</template>
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
        :scroll="{ x: 'calc(700px + 50%)', y: 350 }"
      >
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" :key="tag" :color="'green'">{{ tag }}</a-tag>
        </span>
        <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p> -->
      </a-table>
    </div>
    <a-button href="about" class="mr-3 float-right" type="primary" :size="size">Next</a-button>
  </div>
</template>
<script>

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    arrival: '12/06/2020',
    departure: '14/06/2020',
    adult: '2',
    tags: ['Suites'],
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',

  });
}

export default {
  data() {
    return {
      gambar:"https://source.unsplash.com/1366x786/?hotel",
      columns: [
          // { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'expandedRowRender' } },
        { title: "Guest Name", dataIndex: "name", key: "name" },
        { title: "Arrival Date", dataIndex: "arrival", key: "arrival" },
        { title: "Departure Date", dataIndex: "departure", key: "departure" },
        { title: "Adult", dataIndex: "adult", key: "adult" },
        { title: "Room Type", dataIndex: "tags", key: "tags", scopedSlots: { customRender: 'tags' },},
      ],
      data,
    };
  },
   computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
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
  font-weight: bold !important;
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
</style>