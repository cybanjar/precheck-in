<template>
  <div>
    <div class="ota text-center">
      <a-modal title="Information" :visible="informationmodal" :confirm-loading="confirmLoading">
        <template slot="footer">
          <a-button key="submit" type="primary" @click="goOTA">Close</a-button>
        </template>
        <p>{{informationterm}}</p>
      </a-modal>
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
import ky from "ky";

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
      informationmodal: false,
      informationterm: "",
      confirmLoading: false,
      message: "",
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
      this.$message.error("Please input your Booking Code");
    },
    errorco() {
      this.$message.error("Please input your Check Out Date");
    },
    error() {
      this.$message.error("Please input your Booking Code and Check Out Date");
    },
    goOTA() {
      this.informationmodal = false;
    },
    handleOk() {
      // console.log(e);
      const reservation = [];
      // console.log(this.bookingcode, "bo");
      // console.log(this.date, "co");
      this.hour = moment(new Date()).format("HH:MM");
      // console.log(this.hour, "jam");

      if (!this.bookingcode && !this.date) {
        this.error();
      } else if (!this.bookingcode) {
        this.errorbo();
      } else if (!this.date) {
        this.errorco();
      } else {
        // reservation.push.apply(reservation, [
        //   this.bookingcode,
        //   this.date,
        //   this.hour,
        // ]);

        (async () => {
          const data = await ky
            .post(
              "http://ws1.e1-vhp.com/VHPWebBased/rest/mobileCI/findReservation",
              {
                json: {
                  request: {
                    coDate: this.date,
                    bookCode: this.bookingcode,
                    chName: " ",
                    earlyCI: "false",
                    maxRoom: "1",
                    citime: this.hour,
                    groupFlag: "false",
                  },
                },
              }
            )
            .json();
          this.message = data["response"]["messResult"];
          // console.log(data["response"]["messResult"], "masuk2");
          this.informationterm = this.message.substring(
            this.message.lastIndexOf("- ") + 1,
            this.message.lastIndexOf("!")
          );

          if (this.message.substring(0, 2) == "9 ") {
            this.informationmodal = true;
          } else if (
            this.message.substring(0, 2) == "01" ||
            this.message.substring(0, 2) == "88" ||
            this.message.substring(0, 2) == "5 " ||
            this.message.substring(0, 2) == "2 " ||
            this.message.substring(0, 2) == "02"
          ) {
            this.informationmodal = true;
          } else {
            // console.log(
            //   data["response"]["arrivalGuestlist"]["arrival-guestlist"],
            //   "else1"
            // );
            // console.log(data["response"]["arrivalGuestlist"], "else2");
            reservation.push(
              data["response"]["arrivalGuestlist"]["arrival-guestlist"]
            );
            // console.log(reservation, "reservation");
            router.push({ name: "Step", params: { foo: reservation } });
          }
        })();

        this.modalBookingCode = false;
        this.modalGuestName = false;
        this.modalEmailAddress = false;
        this.modalMembershipID = false;
      }
    },
  },
};
</script>
