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
            <a-button href="about" class="mb-3" type="primary" block>Next</a-button>
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

<style scoped lang="scss" src="../css/style.scss">
</style>
