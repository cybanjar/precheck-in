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
              alt="example"
              src="../assets/CardOnlineCheck-in.svg"
            />
          </a-card>
        </a-col>
        <a-col :span="8" :md="12" :xs="24">
          <a-card :bordered="false">
            <img slot="cover" alt="example" :src="gambar" @click="imageModal" />
            <a-card-meta class="font-weight-bold" title="Grand Visual Hotel">
              <template slot="description">Cardingstron Street, 1St - London</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-modal
        v-model="keluar"
        title="Image Setting"
        :visible="keluar"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-input v-model="gambar" @input="masukinFoto" />
      </a-modal>
      <a-row>
        <a-card :style="information">
          <a-row>
            <a-col :span="1" :xl="1" :xs="4">
              <a-icon
                type="check-circle"
                :style="{ fontSize: '2rem' }"
                theme="twoTone"
                :two-tone-color="information.backgroundColor"
              />
            </a-col>
            <a-col :span="22" :xl="22" :xs="19">
              <p>
                From
                <span class="font-weight-bold">12/06/2020</span> until
                <span class="font-weight-bold">14/06/2020</span>
              </p>
              <p>
                Reservation number:
                <strong>333251</strong>
              </p>
            </a-col>
            <a-col :span="1" :xl="1" :xs="1">
              <a-icon
                type="setting"
                :style="{ fontSize: '1.5rem' }"
                class="float-right align-self-center"
                theme="filled"
                @click="showModal"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-row>
      <a-modal
        v-model="visible"
        title="Color Setting"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p>Standart Back Color</p>
        <a href="#" onclick="return false;" @mouseover="gantiHeaderClass('red')">Red</a>
        <br />
        <a href="#" onclick="return false;" @mouseover="gantiHeaderClass('green')">Green</a>

        <p>Custom Back Color</p>
        <slider-picker
          class="vc-slider"
          v-model="information.backgroundColor"
          @input="customHeaderClass"
        />
      </a-modal>
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Tab Willy">
            <a-form layout="vertical" :form="form">
              <a-row :gutter="16">
                <!-- Col Title 3-->
                <a-col :span="3" :xl="3" :xs="6">
                  <a-form-item label="Title">
                    <a-select default-value="MR">
                      <a-select-option value="MR">MR</a-select-option>
                      <a-select-option value="MRS">MRS</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- Col name 6 -->
                <a-col :span="6" :xl="6" :xs="18">
                  <a-form-item label="Name">
                    <a-input
                      initial-value="Willy Wanta"
                      v-decorator="[
                  'username',
                  { rules: [{ required: true, message: 'Please input your name' }] },
                ]"
                      placeholder="Willy Wanta"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <!-- Col email 6 -->
                <a-col :span="6" :xl="6" :xs="24">
                  <a-form-item label="Email">
                    <a-input
                      v-decorator="[
                      'email',
                      { rules: [{ required: checkNick, message: 'Please input your email' }] },
                    ]"
                      placeholder="willywanta@gmail.com"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="3" :xl="3" :xs="6">
                  <a-form-item label="Code">
                    <a-select default-value="+62">
                      <a-select-option value="62">+62</a-select-option>
                      <a-select-option value="1">+1</a-select-option>
                      <a-select-option value="966">+966</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6" :xl="6" :xs="18">
                  <a-form-item label="Phone Number">
                    <a-input
                      v-decorator="[
                      'nickname',
                      { rules: [{ required: true, message: 'Please input your phone number' }] },
                    ]"
                      placeholder="81220002020"
                      disabled
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="9" :xl="9" :xs="24">
                  <a-form-item label="Sharing Room">
                    <a-input defaultValue="Josep" disabled />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-card :style="information">
                  <a-row>
                    <a-col :span="23" :xl="23" :xs="23">
                      <p class="header-group">Arrival</p>
                    </a-col>
                    <a-col :span="1" :xl="1" :xs="1">
                      <a-icon
                        type="setting"
                        :style="{ fontSize: '1.5rem' }"
                        class="float-right align-self-center"
                        theme="filled"
                        @click="munculModal"
                      />
                    </a-col>
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
                  <input
                    type="checkbox"
                    id="checkbox"
                    :default-value="showPickupRequest"
                    v-model="showPickupRequest"
                  />
                  <label class="ml-2" for="checkbox">Use Pickup Request</label>
                </p>
                <p>
                  <label>Pickup Request Type : </label>
                  <a-radio-group name="radioGroup" :default-value="nilai" @change="berubah">
                    <a-radio :value="1">Per Pax</a-radio>
                    <a-radio :value="2">Per Car</a-radio>
                    <a-radio :value="3">Free</a-radio>
                  </a-radio-group>
                </p>
                <p>
                  <label>Pickup Rate :</label>
                  <a-input v-model="money" @input="masukinUang" />
                </p>
                <p>
                  <label class="ml-2" for="checkbox">Room Preferences :</label>
                </p>
                <p>
                  <input
                    type="checkbox"
                    id="checkbox"
                    :default-value="showFloor"
                    v-model="showFloor"
                  />
                  <label class="ml-2" for="checkbox">Lower Floor & High Floor</label>
                </p>
                <p>
                  <input
                    type="checkbox"
                    id="checkbox"
                    :default-value="showSmoking"
                    v-model="showSmoking"
                  />
                  <label class="ml-2" for="checkbox">Smoking & Non Smoking</label>
                </p>
                <p>
                  <input
                    type="checkbox"
                    id="checkbox"
                    :default-value="showBed"
                    v-model="showBed"
                  />
                  <label class="ml-2" for="checkbox">One Big Bed & Two Single Bed</label>
                </p>
              </a-modal>
              <a-row class="height-5" gutter="16">
                <a-col :span="4" :xl="4" :xs="24">
                  <a-form-item layout="vertical" label="Estimated Arrival Time">
                    <a-time-picker :default-value="moment('12:00', 'HH A')" format="HH A" />
                  </a-form-item>
                </a-col>
                <a-col :span="4" :xl="4" :xs="24">
                  <a-form-item label="Request" v-show="showPickupRequest">
                    <a-checkbox v-model="showPrice">Pickup Required</a-checkbox>
                  </a-form-item>
                </a-col>
                <a-col v-if="showPrice" :span="10" :xl="10" :xs="24">
                  <a-form-item label="Price">
                    <label class="font-weight-bold">Rp. {{ money + " "}}</label>
                    <span v-if="nilai === 1">/ Pax</span>
                    <span v-else-if="nilai === 2">/ Car</span>
                    <span v-else>/ Free</span>
                  </a-form-item>
                  <a-form-item label="Flight Details">
                    <a-input placeholder="Please input flight details" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <a-form-item label v-show="showSmoking">
                    <a-radio-group name="radioGroup">
                      <a-radio :value="1">Non Smoking</a-radio>
                      <a-radio :value="2">Smoking</a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item label v-show="showFloor">
                    <a-radio-group name="radioGroup">
                      <a-radio :value="1">Lower Floor</a-radio>
                      <a-radio :value="2">High Floor</a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-form-item label v-show="showBed">
                    <a-radio-group name="radioGroup">
                      <a-radio :value="1">One Big Bed</a-radio>
                      <a-radio :value="2">Two Single Bed</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
                <a-col :span="12" :xl="12" :xs="24">
                  <a-form-item label="Room Preference">
                    <a-textarea placeholder="Input Room Preferences" :rows="4" />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-row>
                <a-card :style="information">
                  <a-row>
                    <a-col :span="23" :xl="23" :xs="23">
                      <p class="header-group">Guest Details</p>
                    </a-col>
                    <a-col :span="1" :xl="1" :xs="1">
                      <a-icon
                        type="setting"
                        :style="{ fontSize: '1.5rem' }"
                        class="float-right align-self-center"
                        theme="filled"
                        @click="munculModal"
                      />
                    </a-col>
                  </a-row>
                </a-card>
              </a-row>
              <a-row :gutter="[16,8]">
                <a-col :span="6" :xl="6" :xs="24">
                  <a-form-item label="Nationality">
                    <a-select default-value="Indonesia">
                      <a-select-option value="indonesia">Indonesia</a-select-option>
                      <a-select-option value="america">America</a-select-option>
                      <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="3" :xl="3" :xs="24">
                  <a-form-item label="Date of Birth">
                    <a-date-picker @change="onChange" />
                  </a-form-item>
                </a-col>
                <a-col :span="6" :xl="6" :xs="24">
                  <a-form-item label="Document Id">
                    <a-select default-value="Id Card">
                      <a-select-option value="id_card">Id Card</a-select-option>
                      <a-select-option value="paspor">Paspor</a-select-option>
                      <a-select-option value="driver_lisence">Driver Lisence</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="6" :xl="6" :xs="24">
                  <a-form-item label="Id Number">
                    <a-input placeholder="Please input your phone number" />
                  </a-form-item>
                </a-col>
                <a-col :span="3" :xl="3" :xs="24">
                  <a-form-item label="Expiry Date">
                    <a-date-picker @change="onChange" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" :xl="12" :xs="24">
                  <a-form-item label="Address">
                    <a-textarea placeholder="Input Address" :rows="4" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="[16, 8]">
                <a-col :span="5" :xl="5" :xs="24">
                  <a-form-item label="Country">
                    <a-select default-value="Indonesia">
                      <a-select-option value="indonesia">Indonesia</a-select-option>
                      <a-select-option value="america">America</a-select-option>
                      <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="5" :xl="5" :xs="24">
                  <a-form-item label="Region">
                    <a-select default-value="DKI Jakarta">
                      <a-select-option value="jakarta">DKI Jakarta</a-select-option>
                      <a-select-option value="west_java">West Java</a-select-option>
                      <a-select-option value="central_java">Central Java</a-select-option>
                      <a-select-option value="east_java">East Java</a-select-option>
                      <a-select-option value="banten">Banten</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="5" :xl="5" :xs="24">
                  <a-form-item label="City">
                    <a-select default-value="South Jakarta">
                      <a-select-option value="south">South Jakarta</a-select-option>
                      <a-select-option value="west">West Jakarta</a-select-option>
                      <a-select-option value="east">East Jakarta</a-select-option>
                      <a-select-option value="north">North Jakata</a-select-option>
                      <a-select-option value="central">Central Jakata</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="4" :xl="4" :xs="12">
                  <a-form-item label="Postal Code">
                    <a-input placeholder="Ex : 12750" />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tab 2">Content Tab 2</a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">Content Tab 3</a-tab-pane>
          <a-tab-pane key="4" tab="Tab 4">Content Tab 4</a-tab-pane>
          <a-tab-pane key="5" tab="Tab 5">Content Tab 5</a-tab-pane>
        </a-tabs>
        <a-row>
          <a-col :span="12" :xl="12" :xs="24">
            <a-checkbox>I agree with the Terms and Conditions of Visual Grand Hotel Web Check-in.</a-checkbox>
          </a-col>
        </a-row>
        <a-button class="mt-3" type="primary" :size="size">Check-In Now</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import  {Slider}   from 'vue-color'
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
  Modal
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import moment from "moment";
Vue.use(Antd);


export default {
  components: {
    "slider-picker": Slider,
  },
  data() {
    return {
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
      nilai: 2,
      money: 100000 ,
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      showPrice: false,
      muncul: false,
      keluar: false,
      gambar:
        "https://lh3.googleusercontent.com/g8BMvqK3zxmL4a7gwnPswHXsN1FUcIxghEVf2JE9aKMZmBM6AM63tjgINF6QPB244_lCdvUG4ByluYY9XIV0Qe0CKi8eLX0QxXslXWkhId7Kk4G-ON8byy85_gU0clWeWqaEgVJtcsOf5P3h_VqlZthh3i2uNj6yABig3KRSEAYNaKOz0C5m7kMEqR3Q0PR6-hlbaryl_eo39wqEdM1cO74GPvHrew0bk0jmfCA4nmLMTHzcTTJaSjXxfyBV6ILYEK6bJ9MYGUWjilevoI43Rihg0yZ-gedd-CLaCrSIRSKbMXCqfRNK-LNmApAKj7hu5YvJhG4Z4WHxe9BJKRkQQwPhZBknd0ctpqTcTNk21hrSHBLpdb4ESWqNe8tAimIkfRo3Ws7jH4yfL8nWip1D-4wDHWbcy7Aq3-gE0FCMI9LP8FYUMZoK9nmezflsKUY7buDTMGdWHDnne2EPI2JXJyRqhNrUDiPPVTWNGjY7a3xYnEeI-SYKIwBqQ662SXv6Df-jyb8YG4sy_rNuWgofQEaRWlyDafT-HKScgjwHVeRXpNWMqwRuBmJruSmTs49bQdZEaG3jJwuDPMAoWzSFGkKNbxs0qK0hcPK4OszyJEY6JilxPBklEY5GtGDolfWph2WufVQJ09psGLGwlGwc3IqjjvrBZzqEfJ9Zep6LMuZqeRixRtSn79rAG9ug=w641-h331-no?authuser=0",
      information: {
        backgroundColor: "#1890ff",
        borderRadius: "0.25rem",
        lineHeight: "0.625rem",
        color: "#fff",
        padding: 0,
        height: "5rem",
        marginBottom: "1rem !important",
        borderRadius: "50rem !important",
        showSmoking: false,
        showBed: false,
        showFloor: false,
        showPickupRequest: false,
      },
    };
  },
  watch: {
    activeKey(key) {
      console.log(key);
    }
  },
  methods: {
    berubah(e) {
      this.nilai = e.target.value
    },
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
        }
      });
    },
    masukinFoto(foto) {
      this.gambar = foto.target.value;
    },
    masukinUang(uang){
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
    gantiHeaderClass(warna) {
      this.information.backgroundColor = warna;
    },
    customHeaderClass(color) {
      console.log(color);
      this.information.backgroundColor = color.hex;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.muncul = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
      this.muncul = false;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    moment,
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  margin: 20px;
}
h3 {
  margin: 40px 0 0;
}
@media screen and (max-width: 576px) {
  .responsive {
    width: 100%;
  }
}
@media screen and (min-width: 1200px) {
  .card-online {
    width: 400px;
  }
}
// .infomation {
//   background-color: #1890ff;
//   border-radius: 0.25rem;
//   line-height: 0.625rem;
//   color: #fff;
//   padding: 0;
//   height: 5rem;
// }
.header-group {
  letter-spacing: 0.1rem;
  line-height: 1.925rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: bold !important;
}
.shadow-header {
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.16);
}
.vc-slider {
  width: 312px;
}
.ant-collapse-header {
  background-color: #1890ff;
  border-radius: 4px;
  color: #fff !important;
}
.mt-3 {
  margin-top: 0.75rem;
}
.grandvisual {
  line-height: 0.25rem;
  text-align: center;
  padding: 0.0625rem;
}
.text-center {
  text-align: center;
}
.mt-0,
.my-0 {
  margin-top: 0 !important;
}
.mt-1,
.my-1 {
  margin-top: 0.25rem !important;
}
.mt-2,
.my-2 {
  margin-top: 0.5rem !important;
}
.mt-3,
.my-3 {
  margin-top: 1rem !important;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}
.pt-0,
.py-0 {
  padding-top: 0 !important;
}
.pt-1,
.py-1 {
  padding-top: 0.25rem !important;
}
.pt-2,
.py-2 {
  padding-top: 0.5rem !important;
}
.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}
.pb-1,
.py-1 {
  padding-bottom: 0.25rem !important;
}
.pb-2,
.py-2 {
  padding-bottom: 0.5rem !important;
}
.pt-3,
.py-3 {
  padding-top: 1rem !important;
}
.pb-3,
.py-3 {
  padding-bottom: 1rem !important;
}
.ml-1,
.mx-1 {
  margin-left: 0.125rem !important;
}
.ml-2,
.mx-2 {
  margin-left: 0.5rem !important;
}
.ml-3,
.mx-3 {
  margin-left: 1rem !important;
}
.ml-4,
.mx-4 {
  margin-left: 1.5rem !important;
}
.ml-5,
.mx-5 {
  margin-left: 3rem !important;
}
.rounded-pill {
  border-radius: 50rem !important;
}
.font-weight-bold {
  font-weight: 700 !important;
}
.label-hidden {
  visibility: hidden;
}
.color-white {
  color: #fff;
}
.ant-card-body {
  margin: 0;
}
.ant-card-meta-title {
  font-weight: bolder !important;
}
.float-right {
  float: right !important;
}
.align-self-center {
  -ms-flex-item-align: center !important;
  align-self: center !important;
}
</style>
