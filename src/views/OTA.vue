<template>
  <div class="container">
    <a-card class="login-card" style="width: 300px">
      <label>Choose</label>

      <a-select :default-value="option" style="width: 250px" v-model="option">
        <a-select-option value="bookigcode">Booking Code</a-select-option>
        <a-select-option value="guestname">Guest Name & Checkout Date</a-select-option>
        <a-select-option value="email">Email</a-select-option>
        <a-select-option value="membership">Membership & Checkout Date</a-select-option>
      </a-select>
      <div class="mt-1" v-if="option === 'bookigcode'">
        <label>Booking Code</label>
        <a-input />
      </div>
      <div class="mt-1" v-else-if="option === 'guestname'">
        <label>Guest Name</label>
        <a-input />

        <br />
        <br />
        <label>Checkout Date</label>
        <a-date-picker @change="onChange" />
      </div>
      <div class="mt-1" v-else-if="option === 'email'">
        <label>Email</label>
        <a-input />
      </div>
      <div class="mt-1" v-else>
        <label>Membership</label>
        <a-input />

        <br />
        <br />
        <label>Checkout Date</label>
        <a-date-picker @change="onChange" />
      </div>
      <a-button href="about" class="mt-1 mr-3 float-right" type="primary">Next</a-button>
    </a-card>
  </div>
</template>

<script>
export default {
data() {
    return {
      option: "bookigcode",
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
</script>

<style lang="scss" scoped>
.float-right {
  float: right !important;
}
.mr-3,
.mx-3 {
  margin-right: 0rem !important;
}
.mt-1 {
  margin-top: 1rem !important;
}
.login-card {
  position: absolute;
  width: 420px;
  height: 550px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  padding: 5px 30px;
  left: 50%;
  top: 5%;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  border: 0px;
}
.container {
  height: 100%;
  width: 100%;
  background-image: url("https://i.pinimg.com/originals/16/d0/88/16d0881109f34ff8761cdebfdc040fab.jpg") !important;
}
</style>