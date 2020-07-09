<template>
  <div>
    <div>
      <a-row type="flex" justify="start" align="top">
        <a-col>
          <img
            v-if="information.backgroundColor == '#E8505B'"
            class="responsive"
            :src="require('../assets/gradient-red.svg')"
          />
          <img v-else class="responsive" :src="require('../assets/GradientTop.svg')" />
        </a-col>
      </a-row>
    </div>
    <div class="home">
      <a-row class="grandvisual">
        <a-col :span="8" :md="12" :xs="24">
          <a-card :bordered="false">
            <img
              v-if="information.backgroundColor == '#E8505B'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/Card Online Check-in - Red.svg"
            />
            <img
              v-else
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/CardOnlineCheck-in.svg"
            />
          </a-card>
        </a-col>
        <a-col :span="8" :md="12" :xs="24">
          <a-card :bordered="false">
            <img class="img-hotel rounded" slot="cover" alt="example" :src="gambar" />
            <a-icon
              type="setting"
              :style="{ fontSize: '1.5rem' }"
              class="float-right"
              theme="filled"
              @click="imageModal"
            />
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
        <label>URL Image</label>
        <a-input v-model="gambar" @input="masukinFoto" />
        <p
          :style="{ color: '#E8505B', fontStyle: 'italic', fontSize: '0.75rem'}"
        >* Recommended resolution 1366 x 768 atau HD</p>
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
        <a href="#" onclick="return false;" @mouseover="gantiHeaderClass('#E8505B')">Red</a>
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
                  <a-checkbox
                    :checked="showPickupRequest"
                    v-model="showPickupRequest"
                  >Use Pickup Request</a-checkbox>
                  <!-- @change="onChange" -->
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
                <p>
                  <label>Pickup Rate :</label>
                  <a-input v-model="money" @input="masukinUang" :disabled="!showPickupRequest" />
                </p>
                <p>
                  <label class="ml-2" for="checkbox">Room Preferences :</label>
                </p>
                <p>
                  <a-checkbox :checked="showFloor" v-model="showFloor">Lower Floor & High Floor</a-checkbox>
                </p>
                <p>
                  <a-checkbox :checked="showSmoking" v-model="showSmoking">Smoking & Non Smoking</a-checkbox>
                </p>
                <p>
                  <a-checkbox :checked="showBed" v-model="showBed">One Big Bed & Two Single Bed</a-checkbox>
                </p>
              </a-modal>
              <a-row class="ml-4" gutter="16">
                <a-col :span="4" :xl="4" :xs="24">
                  <a-form-item layout="vertical" label="Estimated Arrival Time">
                    <a-time-picker :default-value="moment('12:00', 'HH A')" format="HH A" />
                  </a-form-item>
                </a-col>
                <a-col :span="4" :xl="4" :xs="24" v-show="showPickupRequest">
                  <a-form-item label="Request">
                    <a-checkbox :checked="showPrice" v-model="showPrice">Pickup Required</a-checkbox>
                  </a-form-item>
                </a-col>
                <a-col v-show="showPrice && showPickupRequest" :span="4" :xl="4" :xs="24">
                  <a-form-item label="Price">
                    <label class="font-weight-bold">Rp. {{nilai === 3 ? 0 + " " : money + " "}}</label>
                    <span v-if="nilai === 1">/ Pax</span>
                    <span v-else-if="nilai === 2">/ Car</span>
                    <span v-else>Free</span>
                  </a-form-item>
                </a-col>
                <a-col :span="8" :xl="8" :xs="24">
                  <a-form-item label="Flight Details">
                    <a-input placeholder="Please input flight details" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="ml-4">
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
              </a-row>
              <a-row class="ml-4" :gutter="[16, 8]">
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
              <a-row class="ml-4" :gutter="[16,8]">
                <a-col :span="6" :xl="6" :xs="24">
                  <a-form-item label="Nationality">
                    <a-select default-value="Indonesia">
                      <a-select-option value="indonesia">Indonesia</a-select-option>
                      <a-select-option value="america">America</a-select-option>
                      <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="5" :xl="5" :xs="24">
                  <a-form-item label="Document Id">
                    <a-select default-value="Id Card">
                      <a-select-option value="id_card">Id Card</a-select-option>
                      <a-select-option value="paspor">Paspor</a-select-option>
                      <a-select-option value="driver_lisence">Driver Lisence</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="5" :xl="5" :xs="24">
                  <a-form-item label="Id Number">
                    <a-input placeholder="Please input your phone number" />
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
                </a-col>
              </a-row>
              <!-- Country -->
              <a-row class="ml-4" :gutter="[16, 8]">
                <a-col :span="6" :xl="6" :xs="24">
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
                <a-col :span="3" :xl="3" :xs="12">
                  <a-form-item label="Postal Code">
                    <a-input placeholder="Ex : 12750" />
                  </a-form-item>
                </a-col>
                <a-col :span="5" :xl="5" :xs="24">
                  <a-checkbox :style="{ marginTop: '2rem' }">Save your information detail</a-checkbox>
                </a-col>
              </a-row>
              <!-- Address -->
              <a-row class="ml-4" :gutter="[16, 8]">
                <a-col :span="11" :xl="11" :xs="24">
                  <a-form-item label="Address">
                    <a-textarea placeholder="Input Address" :rows="4" />
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
      showSmoking: false,
      showBed: false,
      showFloor: false,
      showPickupRequest: false,
      showPrice:  false,
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      muncul: false,
      keluar: false,
      // gambar:"https://lh3.googleusercontent.com/5RgIt2osj6LKK1bazwUZw044F3DY15MhVWUPMK35RRT11f7Cq6Tm_9vlzoaxggJ-758Ty6K1j_qw_veY8N9aH0H2VkmgHV5Qe54NwsY5br-94ivHAX3L8YrzluGtCyI_nBVjBmt4Jtbl3yVAxAIz1aEFU4b0FImAPKGeXWSKSxFE8YdOeZXXfEevvel23HVBfU2DBd2yqkCT_RZBoaARFh11ny52OQ5MonMUGAdXPJ6YV10myEooBQxvRCD70qUtK9SsItZVOUnrMQlpmjh2olfTxv_7VP25KHYKz1GkLcHfKQEllEDlqMuVA3-itzXTEz-Mw3JkrYP2bqxQMx2u62htoSxYYdpLo_a1qgaDbXdoirSfNHgJGjoemA5eFUsf9-sYiqodglZeDPj7MdgWODevOwHAcMT5RZQwWzul2GtA4toXqyyt4P5_dlE1IekiSz3mLPq_bYQEknrD1cV4YIwXn7gxUOugMCaOo_5YS7llo6B1U7eRf_lyQwoxVGPjM2q5SbLNooabuY36Ft-SXTxc_KKgjxz4u1rAYoHE2x1oiBCgzuyH15D5_6TxpmpdOgnMJi_ZRvk1m4PU216ZiUuHdU4zxv3cWKjm3EGLTVxcIydfoFldqq9f5sIgBLJBsl1SYLU7uEmi27Tx3txXJ9fjFleHTUxlFxfX9YBYz88GFdbcEDutZUxSxSuI=w808-h429-no?authuser=0",
      gambar:"https://lh3.googleusercontent.com/4CZ_BWzzTZKVXWDcK9ner4dhLOizJKbYyBRUOwcHnuUf0oXajPbCkeQCBHiDKKOftDypkrnisJKCNM0JRSfzaF5qezV05HC70UMDvbdMVkI_xRYB6VxBReVNFlDR6glqbTRVLvjWj3-cbMqbolddcz-ijjw4AMM_Q32W1PkbRasZzX8eBeETkGanM4lwmgnOcZWF3EVxOIGjUUt_dnGdSFCEKSWzPqvLkdxpsRHCuXcIB2UJcDxxAws7yT4cCrfi2gHoDL1dDSYxhmgg5pEvHYiZWg8bv45Z3WjvCgj6XignOBGHaZkcdd-3V4vOCGpp5fBvfDn4n-EFAalcM9PMA2O6StOf2pTtqZE5EFzFBKWTQLxP8InaGDbucROHNKjIKtvNTU3BMgPV942xkB4VWtli1-_dNkQz6ZlSSAw3UFSp-vcBMV-JJLnvfCUQzImJyHXL7ksftONEUzBwFhYp3YOcjU-ejUyPc7mCzIUk_raeT0TRB4WRRkCjwO5JferS6YSaX2Wa5priuIFOSW_0I-TpP7lk9_gykXBEFsX-zv9ZQ8OMEnbY6Y9zy-4aZsRxW3ry0NeINdHK0G__Xr95vTlJCfr24EIqRaxJPxca_Cr_U88IJ9HXWCM7tp1sm8hk_rpowL-64aAaJW5mv09bu6cjrio1HVItOqTutX3CbACh9W5CrjxaxXwYrp9v=w641-h331-no?authuser=0",
      information: {
        backgroundColor: "#1890ff",
        borderRadius: "0.25rem",
        lineHeight: "0.625rem",
        color: "#fff",
        padding: 0,
        height: "5rem",
        marginBottom: "1rem !important",
        borderRadius: "50rem !important",
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
.rounded {
  border-radius: 0.25rem !important;
}
@media screen and (max-width: 576px) {
  .responsive {
    width: 100%;
  }
  .img-hotel {
    // width: 333px;
    height: 171.95px;
  }
}
@media screen and (min-width: 1200px) {
  .card-online {
    width: 400px;
  }
  .img-hotel {
    // width: 662px;
    height: 341.85px;
  }
}
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
