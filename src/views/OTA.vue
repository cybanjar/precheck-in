<template>
  <div class="container">
    <img class="img-hero" src="https://source.unsplash.com/1366x786/?hotel" alt="Loading image" />
    <div class="overlay-bg"></div>
    <a-card class="login-card ilustrasi-top">
      <a-form layout="vertical" :form="form">
        <a-row gutter="8">
          <a-col :span="24" :xl="24" :xs="24">
            <a-form-item label="Choose">
              <a-select :default-value="option" v-model="option">
                <a-select-option value="bookigcode">Booking Code</a-select-option>
                <a-select-option value="guestname">Guest Name & Checkout Date</a-select-option>
                <a-select-option value="email">Email</a-select-option>
                <a-select-option value="membership">Membership & Checkout Date</a-select-option>
              </a-select>
            </a-form-item>
            <div v-if="option === 'bookigcode'">
              <a-form-item label="Booking Code">
                <a-input placeholder="Input your booking code" />
              </a-form-item>
            </div>
            <div v-else-if="option === 'guestname'">
              <a-form-item label="Guest name">
                <a-input placeholder="Ex: Indra Wijaya" />
              </a-form-item>
              <a-form-item label="Checkout Date">
                <a-date-picker @change="onChange" />
              </a-form-item>
            </div>
            <div v-else-if="option === 'email'">
              <a-form-item label="Email">
                <a-input placeholder="Ex: indra@domain.com" />
              </a-form-item>
            </div>
            <div v-else>
              <a-form-item label="Membership">
                <a-input placeholder="Input your membership" />
              </a-form-item>
              <a-form-item label="Checkout Date">
                <a-date-picker @change="onChange" />
              </a-form-item>
            </div>
            <div>
              <a-button href="about" class="mb-3" type="primary" block>Next</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
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

<<<<<<< HEAD
<style lang="scss" scoped>
@media screen and (max-width: 576px) {
  .ilustrasi-top {
    width: 85%;
  }
}
.float-right {
  float: right !important;
}
.img-hero {
  width: 100%;
  height: auto;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  // display: none;
  // background-color: rgba(0, 0, 0, 0.9);
  // z-index: 2;
}
.overlay-bg {
  background-color: rgba(0, 0, 0, 0.37);
  position: fixed;
  widows: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.login-card {
  position: absolute;
  width: 420px;
  // height: 550px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  padding: 5px 20px;
  left: 50%;
  top: 10%;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  border: 0px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.37);
  z-index: 2;
}
</style>
// <style scoped lang="scss" src="../css/style.scss">
// </style>
=======
<style scoped lang="scss" src="../css/style.scss">
</style>
>>>>>>> 6e095b129c257e5ae81b2722216e13738ac38d0b
