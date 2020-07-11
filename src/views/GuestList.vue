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
          // { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
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


</style>