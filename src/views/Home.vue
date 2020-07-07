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
            <img slot="cover" alt="example" src="../assets/GrandVisualHotel.png" />
            <a-card-meta class="font-weight-bold" title="Grand Visual Hotel">
              <template slot="description">Cardingstron Street, 1St - London</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-card class="infomation mb-3 rounded-pill">
          <a-row>
            <a-col :span="1" :xl="1" :xs="4">
              <a-icon type="check-circle" :style="{ fontSize: '2rem' }" theme="twoTone" />
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
        centered
      >
        <a href="#" onclick="return false;" @mouseover="gantiHeaderClass('red')">Header Class Red</a>
        <br />
        <a
          href="#"
          onclick="return false;"
          @mouseover="gantiHeaderClass('green')"
        >Header Class Green</a>
      </a-modal>
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Willy Wanta">
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
                      defaultValue="Willy Wanta"
                      v-decorator="[
                        'username',
                        {
                          rules: [
                            {
                              required: true,
                            },
                          ],
                        },
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
                        {
                          rules: [
                            {
                              required: checkNick,
                              message: 'Please input your email',
                            },
                          ],
                        },
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
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your phone number',
                            },
                          ],
                        },
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
              <a-collapse
                class="ml-3"
                v-model="activeKey"
                :expand-icon-position="expandIconPosition"
              >
                <a-collapse-panel key="1" header="Arrival">
                  <a-icon slot="extra" type="setting" @click="showModal" />
                  <a-row gutter="16">
                    <a-col :span="4" :xl="4" :xs="24">
                      <a-form-item layout="vertical" label="Estimated Arrival Time">
                        <a-time-picker :default-value="moment('12:00', 'HH A')" format="HH A" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="4" :xl="4" :xs="24">
                      <a-form-item label="Request">
                        <a-checkbox v-model="showPrice">Pickup Required</a-checkbox>
                      </a-form-item>
                    </a-col>
                    <a-col v-if="showPrice" :span="10" :xl="10" :xs="24">
                      <a-form-item label="Price">
                        <label class="font-weight-bold">Rp. 100.000</label>
                        <span>/Pax</span>
                      </a-form-item>
                      <a-form-item label="Flight Details">
                        <a-input placeholder="Please input flight details" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-col>
                    <a-form-item label>
                      <a-radio-group name="radioGroup">
                        <a-radio :value="1">Non Smoking</a-radio>
                        <a-radio :value="2">Smoking</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label>
                      <a-radio-group name="radioGroup">
                        <a-radio :value="1">Lower Floor</a-radio>
                        <a-radio :value="2">High Floor</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" :xl="12" :xs="24">
                    <a-form-item label="Room Preference">
                      <a-textarea placeholder="Input Room Preferences" :rows="4" />
                    </a-form-item>
                  </a-col>
                </a-collapse-panel>
              </a-collapse>
              <a-collapse
                class="mt-3"
                v-model="activeKey"
                :expand-icon-position="expandIconPosition"
              >
                <a-collapse-panel key="1" header="Guest Details">
                  <a-icon slot="extra" type="setting" />
                  <a-row :gutter="[16, 8]">
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
                  </a-row>
                  <a-row>
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
                </a-collapse-panel>
              </a-collapse>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Guest 2">Content Tab 2</a-tab-pane>
          <a-tab-pane key="3" tab="Guest 3">Content Tab 3</a-tab-pane>
          <a-tab-pane key="4" tab="Guest 4">Content Tab 4</a-tab-pane>
          <a-tab-pane key="5" tab="Guest 5">Content Tab 5</a-tab-pane>
        </a-tabs>
        <a-button class="mt-3" type="primary">Pre Check-In</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
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
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import moment from "moment";
Vue.config.productionTip = false;
Vue.component(
  Row.name,
  Row,
  Col.name,
  Col,
  Card.name,
  Card,
  Icon.name,
  Icon,
  FormModel.name,
  FormModel,
  Button.name,
  Button,
  Checkbox.name,
  Checkbox,
  Input.name,
  Input,
  Collapse.name,
  Collapse,
  Radio.name,
  Radio,
  DatePicker.name,
  DatePicker
);

Vue.use(Antd);
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
export default {
  data() {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      muncul:false,
      showPrice: false,
      information: {
        backgroundColor: "#1890ff",
        borderRadius: "0.25rem",
        lineHeight: "0.625rem",
        color: "#fff",
        padding: 0,
        height: "5rem",
        marginBottom: "1rem !important",
        borderRadius: "50rem !important",
        show: true,
      },
    };
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
  methods: {
    check() {
      this.form.validateFields((err) => {
        if (!err) {
          console.info("success");
        }
      });
    },
    showModal() {
      this.visible = true;
    },
    munculModal() {
      this.muncul = true;
    },
    gantiHeaderClass(warna) {
      console.log(warna);
      console.log(this.information.backgroundColor);
      this.information.backgroundColor = warna;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.muncul = false;
        this.confirmLoading = false;
      }, 700);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
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
    },
  },
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
.infomation {
  background-color: #1890ff;
  border-radius: 0.25rem;
  line-height: 0.625rem;
  color: #fff;
  padding: 0;
  height: 5rem;
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
.ml-3,
.mx-3 {
  margin-left: 1rem !important;
}
</style>
