<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item layout="vertical" label="Estimated Arrival Time">
      <a-time-picker
        v-decorator="[
          'time',
          {
            initialValue: moment('14:00', 'HH:mm'),
            rules: [{ required: true }],
          },
        ]"
        :minute-step="30"
        format="HH:mm"
      />
    </a-form-item>
    <a-form-item label="Request">
      <a-checkbox :checked="showPrice" @change="onChange">Pickup Required</a-checkbox>
    </a-form-item>
    <a-form-item label="Price">
      <label v-decorator="['currency', { initialValue: money }]">
        {{ nilai === 3 ? "" : currency }}
        {{
        nilai === 3
        ? " "
        : `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " "
        }}
      </label>
      <span v-if="nilai === 1">/ Pax</span>
      <span v-else-if="nilai === 2">/ Car</span>
      <span v-else>Free of Charge</span>
    </a-form-item>
    <a-form-item label="Flight Details">
      <a-input placeholder="Please input flight details" v-decorator="['flight']" />
    </a-form-item>
    <a-form-item label="Room Preferences">
      <a-radio-group name="radioGroup" @change="Room">
        <a-radio value="NonSmoking">
          <span class="font-weight-normal">Non Smoking</span>
        </a-radio>
        <a-radio value="Smoking">
          <span class="font-weight-normal">Smoking</span>
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label>
      <a-radio-group name="radioGroup" @change="Floor">
        <a-radio value="LowerFloor">
          <span class="font-weight-normal">Lower Floor</span>
        </a-radio>
        <a-radio value="HigherFloor">
          <span class="font-weight-normal">Higher Floor</span>
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label>
      <a-radio-group name="radioGroup" @change="Bed">
        <a-radio value="OneBigBed">
          <span class="font-weight-normal">One Big Bed</span>
        </a-radio>
        <a-radio value="TwoSingleBeds">
          <span class="font-weight-normal">Two Single Beds</span>
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="Special Request">
      <a-textarea
        v-decorator="['Request']"
        placeholder="Ex: Connecting Wifi"
        :rows="4"
        :maxlength="max"
      />
    </a-form-item>
    <a-form-item label="Email">
      <a-input
        v-decorator="[
          'email',
                    {
            initialValue: 'randitorizky@gmail.com',
            rules: [{ required: true, message: 'Please input your email' }],
          },
                ]"
        disabled
      />
    </a-form-item>
    <a-form-item label="Phone Number">
      <vue-tel-input
        v-decorator="[
                    'phone',
                    {
                      initialValue: '087887627648',
                      rules: [{ required: true }],
                    },
                  ]"
        @input="phoneInput"
      ></vue-tel-input>
      <!-- <vue-tel-input v-model="phone"></vue-tel-input> -->
    </a-form-item>
    <a-form-item label="Purpose of Stay">
      <a-select
        @change="Kuy"
        v-decorator="[
                    'purpose',
                    { initialValue: purpose },
                  ]"
      >
        <a-select-option value="bussiness">Bussiness</a-select-option>
        <a-select-option value="leisure">Leisure</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Nationality">
      <a-select
        v-decorator="[
                    'nationality',
                    { initialValue: nationality },
                  ]"
        @change="Nationality"
      >
        <a-select-option value="indonesia">Indonesia</a-select-option>
        <a-select-option value="america">America</a-select-option>
        <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="Country">
      <a-select
        v-model="country"
        v-decorator="[
                    'country',
                    { initialValue: country, rules: [{ required: true }] },
                  ]"
      >
        <a-select-option value="indonesia">Indonesia</a-select-option>
        <a-select-option value="america">America</a-select-option>
        <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
      </a-select>
    </a-form-item>
    <div v-if="country === 'indonesia'">
      <a-form-item label="Region">
        <a-select
          show-search
          @change="handleChangeRegion"
          v-decorator="[
                      'region',
                      { initialValue: region, rules: [{ required: true }] },
                    ]"
        >
          <a-select-option
            v-for="(item, keys) in filteredRegion"
            :key="keys"
            :value="filteredRegion[keys]['province']"
          >{{ filteredRegion[keys].province }}</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div v-else>
      <a-form-item label="State">
        <a-input
          initial-value="Willy Wanta"
          v-decorator="[
                      'username',
                      { rules: [{ required: false, message: '' }] },
                    ]"
        />
      </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import { VueTelInput } from "vue-tel-input";
import data from "../components/json/indonesia";

export default {
  components: {
    "vue-tel-input": VueTelInput,
  },
  data() {
    return {
      filteredRegion: [],
      country: "indonesia",
      nationality: "Indonesia",
      money: 100000,
      currency: "Rp.",
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      nilai: 2,
      bed: "",
      floor: "",
      region: "",
      room: "",
      purpose: "bussiness",
      phone: {
        number: "",
        valid: "",
        country: "",
      },
      max: 100,
      text: "",
      kuy: "",
      Region: data.Indonesia.Region,
      showPrice: false,
    };
  },
  mounted() {
    this.filteredRegion = this.Region;
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
      this.showPrice = e.target.checked;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);

          console.log(
            {
              resNumber: "27972",
              reslineNumber: "1",
              estAT: values.time._i,
              pickrequest: this.showPrice,
              pickdetail: values.flight,
              roomPreferences: this.room + "$" + this.floor + "$" + this.bed,
              specialReq: values.Request,
              guestPhnumber: values.phone,
              guestNationality: values.nationality,
              guestCountry: values.country,
              guestRegion: values.region,
              agreedTerm: true,
              purposeOfStay: values.purpose,
            },
            "inputan"
          );
          // (async () => {
          //   const tempParam = location.search.substring(1);
          //   const parsed = await ky
          //     .post("http://54.251.169.160:8080/logserver/rest/preCI/updateData", {
          //       json: {
          //         request: {
          //           resNumber: "27972",
          //           reslineNumber: "1",
          //           estAT: "14:00",
          //           pickrequest: false,
          //           pickdetail: " ",
          //           roomPreferences: "NonSmoking$HigherFloor$OneBigBed",
          //           specialReq: " ",
          //           guestPhnumber: "0813-1104-1252",
          //           guestNationality: "Indonesia",
          //           guestCountry: "Indonesia",
          //           guestRegion: "Bali",
          //           agreedTerm: true,
          //           purposeOfStay: "business",
          //         },
          //       },
          //     })
          //     .json();

          //   const tempMessResult = parsed.response.messResult.split(" ");
          //   this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
          // })();
        }
      });
    },
    Room(e) {
      this.room = e.target.value;
      console.log(this.room);
    },
    Bed(e) {
      this.bed = e.target.value;
      console.log(this.bed);
    },
    Floor(e) {
      this.floor = e.target.value;
      console.log(this.floor);
    },
    Kuy(value) {
      this.kuy = value;
      console.log(this.kuy);
    },
    Nationality(value) {
      this.nationality = value;
      console.log(this.nationality);
    },
    handleChangeRegion(value) {
      this.region = value;
      console.log(this.region);
    },
    moment,
    phoneInput(formattedNumber, { number, valid, country }) {
      console.log(number.international);
      console.log(valid);
      console.log(country && country.name);
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
    },
  },
};
</script>