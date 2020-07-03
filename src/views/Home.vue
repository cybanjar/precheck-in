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
        <a-card class="infomation mb-3">
          <a-row >
            <a-col :span="1">
              <a-icon type="check-circle" :style="{ fontSize: '2rem' }" theme="twoTone" />
            </a-col>
            <a-col :span="23">
              <p class="font-weight-bold">Reservation from 12/06/2020 until 14/06/2020 - Willy wanta</p>
              <p class="font-weight-bold">Reservation number: 333251</p>
            </a-col>
          </a-row>
        </a-card>
      </a-row>
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
        </a-row>
        <a-collapse v-model="activeKey" :expand-icon-position="expandIconPosition">
          <a-collapse-panel class="sa_ant-collapse-header" key="1" header="1 Arrival">
            <a-icon slot="extra" type="setting" />
            <a-row gutter="16">
              <a-col :span="4">
                <a-form-item layout="vertical" label="Estimated Arrival Time">
                  <a-time-picker :default-value="moment('12:00', 'HH A')" format="HH A" />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item label="Request">
                  <a-checkbox>Pickup Required</a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="Flight Details">
                  <a-input
                    placeholder="Please input flight details"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item label="Price">
                  <a-input
                    v-decorator="[
                    'nickname',
                    { rules: [{ required: false, message: '' }] },
                  ]"
                    placeholder="100.000"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item label="Per">
                  <p>/Pax</p>
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
            <a-col :span="12">
              <a-form-item label="Room Preference">
                <a-textarea placeholder="Input Room Preferences" :rows="4" />
              </a-form-item>
            </a-col>
          </a-collapse-panel>
        </a-collapse>
        <a-collapse class="mt-3" v-model="activeKey" :expand-icon-position="expandIconPosition">
          <a-collapse-panel class="ant-collapse-header" key="1" header="Guest Details">
            <a-icon slot="extra" type="setting" />
            <a-row :gutter="[16,8]">
              <a-col :span="6">
                <a-form-item label="Nationality">
                  <a-select default-value="Indonesia">
                    <a-select-option value="indonesia">Indonesia</a-select-option>
                    <a-select-option value="america">America</a-select-option>
                    <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item label="Date of Birth">
                  <a-date-picker @change="onChange" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="Document Id">
                  <a-select default-value="Id Card">
                    <a-select-option value="id_card">Id Card</a-select-option>
                    <a-select-option value="paspor">Paspor</a-select-option>
                    <a-select-option value="driver_lisence">Driver Lisence</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="Id Number">
                  <a-input placeholder="Please input your phone number" />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item label="Expiry Date">
                  <a-date-picker @change="onChange" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-col :span="12">
              <a-form-item label="Address">
                <a-textarea placeholder="Input Address" :rows="4" />
              </a-form-item>
            </a-col>
          </a-collapse-panel>
        </a-collapse>
        <a-button class="mt-3" type="primary">Pre Check-In</a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
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
  DatePicker
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'
Vue.config.productionTip = false
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
)

Vue.use(Antd)
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}
export default {
  data () {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      activeKey: ['1'],
      title: ['Mr', 'Mrs'],
      expandIconPosition: 'left'
    }
  },
  watch: {
    activeKey (key) {
      console.log(key)
    }
  },
  methods: {
    check () {
      this.form.validateFields(err => {
        if (!err) {
          console.info('success')
        }
      })
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    moment,
    handleChange (e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    }
  }
}
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
  border-radius: 4px;
  line-height: 0.25rem;
  color: #fff;
  height: 4.2rem;
}
.ant-collapse-header {
  background-color: #1890ff;
  border-radius: 4px;
  color: #fff !important;
}
.mt-3 {
  margin-top: 0.75rem;
}
.grandvisual{
  line-height: 0.25rem;
  text-align: center;
  padding: .0625rem;
}
.text-center{
  text-align: center;
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
.font-weight-bold {
  font-weight: 700 !important;
}
.label-hidden {
  visibility: hidden;
}
</style>
