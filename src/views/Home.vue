<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <div>
    <a-row>
      <a-col :span="12">
        <a-card style="width: 300px">
          <p>ONLINE</p>
          <p>PRE-CHECKIN</p>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card hoverable style="width: 240px">
          <img
            slot="cover"
            alt="example"
            height="200"
            width="200"
            src="https://www.rwsentosa.com/-/media/project/non-gaming/rwsentosa/hotels/hard-rock-hotel-singapore/hardrockhotelsg-exterior.jpg"
          />
          <a-card-meta title="VISUAL HOTEL">
            <template slot="description">VISUAL SINDATA HOTEL</template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-card style="width: 800px">
        <a-row>
          <a-col :span="12">
            <a-icon type="check-circle" :style="{ fontSize: '60px' }" theme="twoTone" />
          </a-col>
          <a-col :span="12">
            <p>Reservation from 12/06/2020 until 14/06/2020 - Willy wanta</p>
            <p>Reservation number: 333251</p>
          </a-col>
        </a-row>
      </a-card>
    </a-row>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Title"
      >
        <a-select default-value="lucy" >
      <a-select-option value="jack">
        Jack
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Country Code"
      >
        <a-select default-value="lucy" >
      <a-select-option value="jack">
        Jack
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option value="Yiminghe">
        yiminghe
      </a-select-option>
    </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Name"
      >
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
          placeholder="Please input your name"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Phone Number"
      >
        <a-input
          v-decorator="[
          'nickname',
          { rules: [{ required: true, message: 'Please input your phone number' }] },
        ]"
          placeholder="Please input your phone number"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Email"
      >
        <a-input
          v-decorator="[
          'nickname',
          { rules: [{ required: checkNick, message: 'Please input your email' }] },
        ]"
          placeholder="Please input your phone email"
        />
      </a-form-item>
      <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
        <a-button type="primary" @click="check">Check</a-button>
      </a-form-item>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="1 Arrival">
 <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Name"
      >
      <a-time-picker :default-value="moment('12:00', 'HH A')" format="HH A" />
      </a-form-item>
 <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=""
      >
 <a-checkbox >
    Pickup Required
  </a-checkbox>
  </a-form-item>
 <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label=""
      >
<a-radio-group name="radioGroup" :default-value="1">
    <a-radio :value="1">
      Smoking
    </a-radio>
    <a-radio :value="2">
      Non Smoking
    </a-radio>
  </a-radio-group>
  </a-form-item>
    </a-collapse-panel>
        </a-collapse>
            </a-form>
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
  Radio
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
  Radio
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
      activeKey: ['1']
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
