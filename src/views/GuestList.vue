<template>
  <div>
    <div>
      <h1 class="text-center">Guest Lists</h1>
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
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p>
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
      columns: [
          // { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'expandedRowRender' } },
        { title: "Guest Name", dataIndex: "name", key: "name" },
        { title: "Arrival Date", dataIndex: "arrival", key: "arrival" },
        { title: "Departure Date", dataIndex: "departure", key: "departure" },
        { title: "Adult", dataIndex: "adult", key: "adult" },
        { title: "Room Type", dataIndex: "tags", key: "tags", scopedSlots: { customRender: 'tags' },},
      ],data
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