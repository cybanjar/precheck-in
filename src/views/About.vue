<template>
  <div class="spin-load-table" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin />
    </a-spin>
  </div>
  <div v-else>
    <div class="home">
      <h3 class="text-center font-weight-bold visible">Grand Visual Hotel Jakarta</h3>
      <a-row class="header-branding" :style="information" type="flex" justify="space-between">
        <a-col class="pl-3 pt-3 invisible" :span="15" :md="15" :xl="15" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold" :style="information">ONLINE CHECK-IN</h1>
          <h2
            v-if="
              currDataPrepare['guest-member-name'] !== '' 
            "
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare['guest-member-name'] }}
          </h2>
          <h2 v-else class="main-guest-title font-white font-weight-bold" :style="information">
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h2>
          <!-- <h4
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >{{currDataPrepare.description}}</h4>-->
          <p class="ant-card-meta-description font-white" :style="information">
            Arrival:
            <strong>{{formatDate(currDataPrepare.arrive) }}</strong> Departure:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />Booking Code:
            <strong>{{ currDataPrepare['rsv-number'] }}</strong>
          </p>
        </a-col>
        <a-col class="container" :span="9" :md="9" :xl="9" :lg="9" :xs="24">
          <img class="img-hotel" src="../assets/GrandVisualHotel.png" alt="Image Loading" />
          <div class="overlay invisible">
            <div class="text">Grand Visual Hotel Jakarta</div>
          </div>
          <div class="invisible">
            <div class="gear-setting">
              <!-- <a-icon
                type="setting"
                :style="{ fontSize: '1.5rem' }"
                class="float-right align-self-center"
                theme="filled"
                @click="imageModal"
              />-->
            </div>
          </div>
        </a-col>
        <a-col class="pl-3 pt-3 visible" :span="12" :md="12" :xs="24">
          <h1 class="mb-3 font-white font-weight-bold">ONLINE CHECK-IN</h1>
          <h2
            v-if="
              currDataPrepare['guest-member-name'] !== '' 
            "
            class="main-guest-title font-white font-weight-bold"
            :style="information"
          >
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }} |
            {{ currDataPrepare['guest-member-name'] }}
          </h2>
          <h2 v-else class="main-guest-title font-white font-weight-bold" :style="information">
            {{ currDataPrepare["guest-lname"] }},
            {{ currDataPrepare["guest-pname"] }}
          </h2>
          <!-- <h4 class="main-guest-title font-white font-weight-bold">{{currDataPrepare.description}}</h4> -->
          <p class="ant-card-meta-description font-white" :style="information">
            Arrival:
            <strong>{{formatDate(currDataPrepare.arrive) }}</strong> Departure:
            <strong>{{ formatDate(currDataPrepare.depart) }}</strong>
            <br />Booking Code:
            <strong>{{ currDataPrepare['rsv-number'] }}</strong>
          </p>
        </a-col>
      </a-row>
      <a-modal
        v-model="keluar"
        title="Color and Image Setting"
        :visible="keluar"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Background Color">
            <p>Standard Color</p>
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#1890ff')">Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#E8505B')">Red</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FBDB81')">Yellow</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('green')">Green</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('white')">White</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#D42A83')">Magenta</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#1B262C')">Black</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FA7D09')">Orange</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#901f90')">Purple</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#00D7FF')">Sky Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#E4E3E3')">Grey</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FFBF00')">Gold</a>

            <p>Custom Back Color</p>
            <slider-picker
              class="vc-slider"
              v-model="information.backgroundColor"
              @input="customHeaderClass"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Font Color" force-render>
            <p>Standard Color</p>
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#1890ff')">Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#E8505B')">Red</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FBDB81')">Yellow</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('green')">Green</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('white')">White</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#D42A83')">Magenta</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#1B262C')">Black</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FA7D09')">Orange</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#901f90')">Purple</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#00D7FF')">Sky Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#E4E3E3')">Grey</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FFBF00')">Gold</a>

            <p>Custom Back Color</p>
            <slider-picker class="vc-slider" v-model="information.color" @input="customFontClass" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Change Image" force-render>
            <label>URL Image</label>
            <a-input v-model="gambar" @input="masukinFoto" />
            <p
              :style="{
                color: '#E8505B',
                fontStyle: 'italic',
                fontSize: '0.75rem',
              }"
            >* Recommended resolution 1366 x 768 atau HD</p>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
      <div>
        <a-form layout="vertical" :form="form" @submit="handleSubmit">
          <a-row class="ml-4 mr-3 mt-3 mb-3" gutter="16">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">Arrival</p>
                </a-col>
                <!-- <a-col :span="1" :xl="1" :xs="1">
                  <a-icon
                    type="setting"
                    :style="{ fontSize: '1.5rem' }"
                    class="float-right align-self-center"
                    theme="filled"
                    @click="munculModal"
                  />
                </a-col>-->
              </a-row>
            </a-card>
          </a-row>
          <a-modal
            v-model="muncul"
            title="Arrival Preference Setup"
            :visible="muncul"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            centered
          >
            <p>
              <a-checkbox
                :checked="showPickupRequest"
                v-model="showPickupRequest"
              >Use Pickup Request</a-checkbox>
            </p>
            <p>
              <label>Pickup Request Type :</label>
              <a-radio-group
                name="radioGroup"
                :default-value="nilai"
                @change="berubah"
                :disabled="!showPickupRequest"
              >
                <a-radio :value="1">Per Pax</a-radio>
                <a-radio :value="2">Per Car</a-radio>
                <a-radio :value="3">Free</a-radio>
              </a-radio-group>
            </p>
            <p v-if="nilai != 3">
              <label>Pickup Rate :</label>
              <a-input-group compact>
                <a-select
                  :disabled="!showPickupRequest"
                  :default-value="currency"
                  v-model="currency"
                >
                  <a-select-option value="Rp.">Rp.</a-select-option>
                  <a-select-option value="$">$</a-select-option>
                  <a-select-option value="€">€</a-select-option>
                </a-select>
                <a-input-number
                  :disabled="!showPickupRequest"
                  :default-value="money"
                  v-model="money"
                  :formatter="
                    (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                  @input="masukinUang"
                />
              </a-input-group>
            </p>
            <p>
              <label class="ml-2 font-weight-bold" for="checkbox">Room Preferences :</label>
            </p>
            <p>
              <a-checkbox :checked="showFloor" v-model="showFloor">Lower Floor & Higher Floor</a-checkbox>
            </p>
            <p>
              <a-checkbox :checked="showSmoking" v-model="showSmoking">Smoking & Non Smoking</a-checkbox>
            </p>
            <p>
              <a-checkbox :checked="showBed" v-model="showBed">One Big Bed & Two Single Bed</a-checkbox>
            </p>
          </a-modal>
          <a-row class="ml-3" gutter="16">
            <a-col :span="4" :xl="4" :lg="5" :md="6" :xs="24">
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
            </a-col>
            <a-col :span="4" :xl="4" :lg="5" :md="6" :xs="24" v-show="showPickupRequest">
              <a-form-item label="Request">
                <a-checkbox
                  :checked="showPrice"
                  v-model="showPrice"
                  @change="onChange"
                >Pickup Required</a-checkbox>
              </a-form-item>
            </a-col>
            <a-col :span="4" :xl="4" :lg="5" :md="5" :xs="24">
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
            </a-col>
            <a-col
              v-show="showPrice && showPickupRequest"
              :span="8"
              :xl="8"
              :lg="8"
              :md="7"
              :xs="24"
            >
              <a-form-item label="Flight Details">
                <a-input placeholder="Please input flight details" v-decorator="['flight']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" gutter="16">
            <a-col>
              <a-form-item label="Room Preferences">
                <a-radio-group name="radioGroup">
                  <a-radio value="NonSmoking">
                    <span class="font-weight-normal">Non Smoking</span>
                  </a-radio>
                  <a-radio value="Smoking">
                    <span class="font-weight-normal">Smoking</span>
                  </a-radio>
                </a-radio-group>

                <!-- <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showFloor" @change="Floor">
                  <a-radio value="LowerFloor">
                    <span class="font-weight-normal">Lower Floor</span>
                  </a-radio>
                  <a-radio value="HigherFloor">
                    <span class="font-weight-normal">Higher Floor</span>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label>
                <a-radio-group name="radioGroup" v-show="showBed" @change="Bed">
                  <a-radio value="OneBigBed">
                    <span class="font-weight-normal">One Big Bed</span>
                  </a-radio>
                  <a-radio value="TwoSingleBeds">
                    <span class="font-weight-normal">Two Single Beds</span>
                  </a-radio>
                </a-radio-group>-->
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="9" :xl="9" :lg="9" :md="12" :xs="18">
              <a-form-item label="Special Request">
                <a-textarea
                  v-decorator="['Request']"
                  placeholder="Ex: Connecting Wifi"
                  :rows="4"
                  :maxlength="max"
                />
              </a-form-item>
            </a-col>
            <a-col class="max-breaker" :span="3" :xl="3" :xs="6">
              <span v-text="text.length + '/' + max"></span>
              <!-- <a-progress
                type="circle"
                :percent="max-text.length"   
                :width="30"             
              >
                <template #format="percent">
                  <span style="color: red">{{ percent }}</span>
                </template>
              </a-progress>-->
            </a-col>
          </a-row>

          <a-row class="ml-4 mr-3 mb-3">
            <a-card class="header-card">
              <a-row>
                <a-col :span="23" :xl="23" :xs="23">
                  <p class="header-group">Guest Details</p>
                </a-col>
                <!-- <a-col :span="1" :xl="1" :xs="1">
                  <a-icon
                    type="setting"
                    :style="{ fontSize: '1.5rem' }"
                    class="float-right align-self-center"
                    theme="filled"
                    @click="guestModal"
                  />
                </a-col>-->
              </a-row>
            </a-card>
          </a-row>
          <a-modal
            v-model="guest"
            title="Guest Preference Setup"
            :visible="guest"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <label>Term and Condition</label>
            <p>
              <a-radio-group v-model="value">
                <a-radio value="terma">Current language</a-radio>
                <a-textarea v-model="term1" @input="masukinTerm" :rows="3" />
                <a-radio value="termb">Other language</a-radio>
                <a-textarea v-model="term2" @input="masukinTerm" :rows="3" />
              </a-radio-group>
            </p>
          </a-modal>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Email">
                <a-input
                  v-decorator="[
                    'email',
                    {
                      initialValue: currDataPrepare['guest-email'],
                      rules: [
                        { required: true, message: 'Please input your email' },
                      ],
                    },
                  ]"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Phone Number">
                <vue-tel-input
                  v-decorator="[
                    'phone',
                    {
                      initialValue:currDataPrepare['guest-phone'],
                      rules: [{ required: true }],
                    },
                  ]"
                  @input="phoneInput"
                ></vue-tel-input>
                <!-- <vue-tel-input v-model="phone"></vue-tel-input> -->
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="3" :xl="3" :lg="7" :md="10" :xs="24">
              <a-form-item label="Purpose of Stay">
                <a-select
                  @change="Kuy"
                  v-decorator="[
                    'purpose',
                    { initialValue: purpose,rules: [{ required: true }] },
                  ]"
                >
                  <a-select-option
                    v-for="item in FilterPurposeofStay"
                    :key="item"
                    :value="item.setupvalue"
                  >{{ item.setupvalue }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Nationality">
                <a-select
                  v-decorator="[
                    'nationality',
                    { initialValue: nationality, rules: [{ required: true }] },
                  ]"
                  @change="Nationality"
                >
                  <a-select-option value="Indonesia">Indonesia</a-select-option>
                  <a-select-option value="America">America</a-select-option>
                  <a-select-option value="ArabSaudi">Arab Saudi</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Choose of Document ID">
                <a-select default-value="E-KTP">
                  <a-select-option value="id_card">E-KTP</a-select-option>
                  <a-select-option value="passport">Passport</a-select-option>
                  <a-select-option value="driving_license">Driving License</a-select-option>
                  <a-select-option value="kitas">KITAS</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="ID Number">
                <a-input placeholder="Please input " />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="24">
              <a-form-item label="Expiry Date">
                <a-date-picker @change="onChange" />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="24">
              <a-form-item label="Date of Birth">
                <a-date-picker @change="onChange" />
              </a-form-item>
            </a-col>-->
          </a-row>
          <!-- Country -->
          <!-- <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="10" :xl="10" :xs="24">
              <a-form-item label="Address">
                <a-textarea placeholder="Input Address" :rows="4" />
              </a-form-item>
            </a-col>
          </a-row>-->
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <a-form-item label="Country">
                <a-select
                  v-model="country"
                  v-decorator="[
                    'country',
                    { initialValue: country, rules: [{ required: true }] },
                  ]"
                >
                  <a-select-option value="Indonesia">Indonesia</a-select-option>
                  <a-select-option value="America">America</a-select-option>
                  <a-select-option value="ArabSaudi">Arab Saudi</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="5" :xl="5" :lg="7" :md="10" :xs="24">
              <div v-if="country === 'Indonesia'">
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
            </a-col>
            <!-- <a-col :span="5" :xl="5" :xs="24" v-if="country === 'indonesia'">
              <a-form-item label="City">
                <a-select
                  show-search
                  v-model="city"
                  v-decorator="[
                    'city',
                    { initialValue: city, rules: [{ required: true }] },]"
                >
                  <a-select-option
                    v-for="(item, key) in filteredCities"
                    :key="key"
                    :value="filteredCities[key].city_name"
                  >{{ filteredCities[key].city_name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24" v-else>
              <a-form-item label="City">
                <a-input
                  initial-value="Willy Wanta"
                  v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '' }] },
                ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="12">
              <a-form-item label="Postal Code">
                <a-input placeholder="Ex : 12750" @keydown="onKeydown" />
              </a-form-item>
            </a-col>-->
          </a-row>

          <!-- Address -->
          <a-row class="ml-3 mb-3" :gutter="[16, 8]">
            <a-col :span="12" :xl="12" :xs="24">
              <a-checkbox v-model="agree">{{(value == 'terma' ? term1 : term2)}}</a-checkbox>
            </a-col>
          </a-row>
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="4" :xl="4" :lg="7" :xs="24">
              <a-form-item>
                <a-button
                  :xl="12"
                  class="font-weight-bold mt-3"
                  type="primary"
                  block
                  :size="size"
                  :disabled="!agree"
                  html-type="submit"
                  @click=" save();scrollToTop();"
                >Check-In Now</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <!-- {{groupby(3, 0)}} -->
        {{tempRoomPreference}}
      </div>
    </div>
  </div>
</template>


<script>
import router from "../router";
import data from "../components/json/indonesia";
import Vue from "vue";
import { Slider } from "vue-color";
import { VueTelInput } from "vue-tel-input";
import Antd, {
  Row,
  Col,
  Card,
  Icon,
  FormModel,
  Button,
  Checkbox,
  Input,
  Collapse,
  Radio,
  DatePicker,
  Modal,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import moment from "moment";
import ky from "ky";
Vue.use(Antd);

const groupby = (paramnumber1, paramnumber2) => {
  return [];
};

export default {
  components: {
    "slider-picker": Slider,
    "vue-tel-input": VueTelInput,
  },

  data() {
    return {
      addessHotel:
        "Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240",
      id: [],
      currDataPrepare: {},
      counter: 0,
      size: "large",
      checkNick: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
      },
      form: this.$form.createForm(this, { name: "coordinated" }),
      nilai: 2,
      bed: "",
      floor: "",
      region: "",
      room: "",
      setRegion: "Bali",
      Region: data.Indonesia.Region,
      City: data.Indonesia.City,
      cek: "",
      cities: "",
      // filteredCity: [],
      filteredRegion: [],
      nationality: "Indonesia",
      phone: {
        number: "",
        valid: "",
        country: "",
      },
      dataGuest: [],
      max: 100,
      agree: false,
      text: "",
      kuy: "",
      money: 100000,
      showSmoking: true,
      showBed: true,
      showFloor: true,
      showPickupRequest: true,
      showPrice: false,
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      muncul: false,
      guest: false,
      guests: "",
      keluar: false,
      currency: "Rp.",
      country: "Indonesia",
      purpose: "",
      loading: true,
      term1:
        "I agree with the Terms and Conditions of Visual Grand Hotel Web Check-in.",
      term2:
        "Saya setuju dengan Syarat dan Ketentuan dari Visual Grand Hotel Web Check-in.",
      value: "terma",
      gambar: "https://source.unsplash.com/1366x786/?hotel",
      information: {
        backgroundColor: "$green",
        // border: "none",
        // borderBottom: "3px solid black",
        color: "$white",
        // padding: "24px 0 0px 0",
        // lineHeight: "0.625rem",
        // padding: 0,
        // height: "5rem",
        // marginBottom: "1rem !important",
      },
      tempsetup: [],
      totalnumber1: 0,
      tempRoomPreferencelenght: [],
      tempRoomPreference: [],
    };
  },
  watch: {
    activeKey(key) {
      key;
    },
  },
  created() {
    if (this.$route.params.id != undefined) {
      this.id = this.$route.params.id;
      // this.counter = this.id.length;

      this.currDataPrepare = this.id[this.counter];
      this.counter += 1;
    } else {
      (async () => {
        const tempParam = location.search.substring(1);
        const parsed = await ky
          .post(
            "http://54.251.169.160:8080/logserver/rest/loginServer/retrieveReservation",
            {
              json: {
                request: {
                  encryptedText: tempParam
                    .replace(/%2F/g, "/")
                    .replace(/%20/g, "+"),
                },
              },
            }
          )
          .json();

        console.log(parsed.response.pciSetup["pci-setup"], "setup");
        this.tempsetup = parsed.response.pciSetup["pci-setup"];
        const tempMessResult = parsed.response.messResult.split(" ");
        this.guests = parsed.response.arrivalGuest["arrival-guest"].length;

        if (tempMessResult[0] == "99") {
          router.push("notfound");
        } else {
          if (parsed.response.arrivalGuest["arrival-guest"].length > 1) {
            this.dataGuest = parsed.response.arrivalGuest["arrival-guest"];
            // router.push("list");
            router.push({ name: "List", params: { foo: this.dataGuest } });
          }
          // else if (this.$route.params.id == undefined) {
          //   router.push("404");
          // }
          else {
            this.currDataPrepare =
              parsed.response.arrivalGuest["arrival-guest"][0];
          }
        }
      })();
    }
    this.loading = false;
  },
  mounted() {
    this.filteredRegion = this.Region;
  },
  methods: {
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
    phoneInput(formattedNumber, { number, valid, country }) {
      console.log(number.international, "inputan2");
      // console.log(valid);
      // console.log(country && country.name);
      this.phone.number = number.international;
      this.phone.valid = valid;
      this.phone.country = country && country.name;
    },
    onKeydown(event) {
      const char = String.fromCharCode(event.keyCode);
      if (!/[0-9]/.test(char)) {
        event.preventDefault();
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);

          console.log(
            {
              resNumber: this.currDataPrepare["rsv-number"],
              reslineNumber: this.currDataPrepare["rsvline-number"],
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
          (async () => {
            const tempParam = location.search.substring(1);
            const parsed = await ky
              .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/updateData", {
                json: {
                  request: {
                    resNumber: this.currDataPrepare["rsv-number"],
                    reslineNumber: this.currDataPrepare["rsvline-number"],
                    estAT: values.time._i,
                    pickrequest: this.showPrice,
                    pickdetail: values.flight,
                    roomPreferences:
                      this.room + "$" + this.floor + "$" + this.bed,
                    specialReq: values.Request,
                    guestPhnumber: values.phone,
                    guestNationality: values.nationality,
                    guestCountry: values.country,
                    guestRegion: values.region,
                    agreedTerm: true,
                    purposeOfStay: values.purpose,
                  },
                },
              })
              .json();
            console.log(parsed, "inputan3");
            // const tempMessResult = parsed.response.messResult.split(" ");
            // this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
          })();
        }
      });
    },
    save() {
      if (this.counter == this.id.length) {
        const mori =
          "{" +
          this.currDataPrepare["rsv-number"] +
          ";" +
          moment(this.currDataPrepare.depart).format("MM/DD/YYYY") +
          "}";
        // console.log(mori, "be the one");
        router.push({ name: "Success", params: { jin: mori } });

        // router.push("success");
      }
      this.currDataPrepare = this.id[this.counter];
      this.counter += 1;
      this.agree = false;
    },
    back() {
      if (this.counter == this.id.length) {
        return false;
      }
      this.counter -= 1;
      this.currDataPrepare = this.id[this.counter];
    },
    berubah(e) {
      this.nilai = e.target.value;
    },
    masukinFoto(foto) {
      this.gambar = foto.target.value;
    },
    masukinTerm(tulisan) {
      this.term = tulisan.target.value;
    },
    masukinUang(uang) {
      this.money = uang.target.value;
    },
    showModal() {
      this.visible = true;
    },
    imageModal() {
      this.keluar = true;
    },
    munculModal() {
      this.muncul = true;
    },
    guestModal() {
      this.guest = true;
    },
    gantiHeaderClass(warna) {
      this.information.backgroundColor = warna;
    },
    gantiFontClass(colours) {
      this.information.color = colours;
    },
    customHeaderClass(color) {
      this.information.backgroundColor = color.hex;
    },
    customFontClass(colour) {
      this.information.color = colour.hex;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.muncul = false;
        this.keluar = false;
        this.guest = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancel(e) {
      this.visible = false;
      this.muncul = false;
    },
    onChange(e) {
      // console.log(`checked = ${e.target.checked}`);
      this.showPrice = e.target.checked;
    },
    moment,
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
    handleBlur() {
      // console.log("blur");
    },
    handleFocus() {
      // console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    formatDate(datum) {
      return new Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(datum));
    },
    groupby(paramnumber1, paramnumber2) {
      let lastnumber1 = 0;
      let totalnumber1 = 0;
      for (let i = 0; i < this.tempsetup.length; i++) {
        const number1 = this.tempsetup[i]["number1"];
        if (lastnumber1 != number1) {
          totalnumber1 = totalnumber1 + 1;
          lastnumber1 = number1;
        }
      }
      // return totalnumber1;
      const tempdata = [];
      for (let i = 0; i < this.tempsetup.length; i++) {
        if (this.tempsetup[i]["number1"] == paramnumber1) {
          if (paramnumber2 != 0) {
            const datarow = this.tempsetup[i];
            if (datarow["number2"] == paramnumber2) {
              tempdata.push(this.tempsetup[i]);
            }
          } else if (paramnumber2 == 0) {
            tempdata.push(this.tempsetup[i]);
          }
        }
      }
      if (tempdata[0]["number1"] == 1) {
        for (const a in tempdata) {
          if (tempdata[a].setupflag == true) {
            this.purpose = tempdata[a].setupvalue;
          }
        }
      } else if (tempdata[0]["number1"] == 3) {
        this.tempRoomPreferencelenght = [];
        this.tempRoomPreference = [];
        for (const b in tempdata) {
          if (tempdata[b].setupflag == true) {
            // isi 3
            this.tempRoomPreferencelenght.push(tempdata[b]);
            const coba = tempdata[b]["setupvalue"];
            console.log(coba, "split1");
            const splitcoba = coba.split(" & ");
            console.log(splitcoba, "split2");

            // isi 6
            for (const c in splitcoba) {
              this.tempRoomPreference.push(splitcoba[c]);
            }
          }
        }
        return this.tempRoomPreferencelenght;
      }
      return tempdata;
    },
  },
  computed: {
    filteredCities() {
      const filteredCity = [];
      const set = this.setRegion;

      for (let i = 0; i < this.City.length; i++) {
        const regionID = set;
        const dataRow = this.City[i];
        const regionIDinCity = dataRow["province"];

        if (regionID === regionIDinCity) {
          filteredCity.push(dataRow);
        }
      }
      return filteredCity;
    },
    FilterPurposeofStay() {
      return this.groupby(1, 0);
    },
  },
  FilterRoomPreference() {
    return this.groupby(3, 0);
  },
  FilterEstimatedArrivalTime() {
    return this.groupby(8, 0);
  },
};
</script>
