<template>
  <div>
    <div class="ota text-center">
      <a-row :gutter="[8, 32]" class="mb-3">
        <a-col class="text-center" :span="4" :xs="24">
          <h1 class="text-white">Find Your Reservation</h1>
          <p class="text-white text-secondary">Search by One Option Below</p>
        </a-col>
      </a-row>
      <a-row :gutter="[8, 32]" class="mt-3" type="flex" justify="center">
        <a-col :span="4" :xl="4" :xs="12">
          <img @click="showModalBookingCode" class="img-ota" src="../assets/booking-code.svg" />
          <a-modal v-model="modalBookingCode" title="Booking Code" @ok="handleOk">
            <a-form-item label="Booking Code">
              <a-input v-model="bookingcode" placeholder="Input your booking code" />
            </a-form-item>
            <a-form-item label="Checkout Date">
              <a-date-picker @change="onChange" :format="dateFormat" />
            </a-form-item>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img @click="showModalGuestName" class="img-ota" src="../assets/Name.svg" />
          <a-modal v-model="modalGuestName" title="Last Name" @ok="handleOk">
            <a-form-item label="Last Name">
              <a-input placeholder="Input your last name" />
            </a-form-item>
            <a-form-item label="Checkout Date">
              <a-date-picker @change="onChange" />
            </a-form-item>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img class="img-ota" @click="showModalEmailAddress" src="../assets/EmailAddress.svg" />
          <a-modal v-model="modalEmailAddress" title="Email Address" @ok="handleOk">
            <a-form-item label="Email Address">
              <a-input placeholder="Input your email address" />
            </a-form-item>
            <a-form-item label="Checkout Date">
              <a-date-picker @change="onChange" />
            </a-form-item>
          </a-modal>
        </a-col>
        <a-col :span="4" :xl="4" :xs="12">
          <img class="img-ota" @click="showModalMembershipID" src="../assets/membership.svg" />
          <a-modal v-model="modalMembershipID" title="Membership ID" @ok="handleOk">
            <a-form-item label="Membership ID">
              <a-input placeholder="Input your Membership ID" />
            </a-form-item>
            <a-form-item label="Checkout Date">
              <a-date-picker @change="onChange" />
            </a-form-item>
          </a-modal>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import router from "../router";
import moment from "moment";

export default {
  data() {
    return {
      modalBookingCode: false,
      modalGuestName: false,
      modalEmailAddress: false,
      modalMembershipID: false,
      bookingcode: "",
      dateFormat: "MM/DD/YY",
      date: "",
      hour: "",
    };
  },
  methods: {
    onChange(date, dateString) {
      // console.log(date, dateString);
      this.date = dateString;
    },
    showModalBookingCode() {
      this.modalBookingCode = true;
    },
    showModalGuestName() {
      this.modalGuestName = true;
    },
    showModalEmailAddress() {
      this.modalEmailAddress = true;
    },
    showModalMembershipID() {
      this.modalMembershipID = true;
    },
    errorbo() {
      this.$message.error("Booking Code Cannot Empty");
    },
    errorco() {
      this.$message.error("Check Out Date Cannot Empty");
    },
    error() {
      this.$message.error("Cannot Empty");
    },
    handleOk() {
      // console.log(e);
      const reservation = [];
      console.log(this.bookingcode, "bo");
      console.log(this.date, "co");
      this.hour = moment(new Date()).format("hh:mm");
      console.log(this.hour, "jam");

      if (!this.bookingcode && !this.date) {
        this.error();
      } else if (!this.bookingcode) {
        this.errorbo();
      } else if (!this.date) {
        this.errorco();
      } else {
        reservation.push.apply(reservation, [
          this.bookingcode,
          this.date,
          this.hour,
        ]);

        console.log(reservation, "reservation");
        router.push({ name: "Step", params: { foo: reservation } });

        this.modalBookingCode = false;
        this.modalGuestName = false;
        this.modalEmailAddress = false;
        this.modalMembershipID = false;
      }
    },
  },
};
</script>
