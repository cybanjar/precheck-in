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
      <a-row>
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
            <a-card-meta title="Grand Visual Hotel">
              <template slot="description">Cardingstron Street, 1St - London</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-card class="infomation">
          <a-row type="flex" justify="start">
            <a-col :span="4">
              <a-icon type="check-circle" :style="{ fontSize: '32px' }" theme="twoTone" />
            </a-col>
            <a-col :span="20">
              <p>Reservation from 12/06/2020 until 14/06/2020 - Willy wanta</p>
              <p>Reservation number: 333251</p>
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
                v-decorator="[
            'username',
            { rules: [{ required: true, message: 'Please input your name' }] },
          ]"
                placeholder="Please input your name"
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
                placeholder="Please input your phone email"
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
                placeholder="Please input your phone number"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="start">
          <a-col :span="24">
            <a-collapse v-model="activeKey" :expand-icon-position="expandIconPosition">
              <a-collapse-panel key="1" header="1 Arrival">
                <a-icon slot="extra" type="setting" />
                <a-form-item layout="vertical" label="Estimated Arrival Time">
                  <a-time-picker :default-value="moment('12:00', 'HH A')" format="HH A" />
                </a-form-item>
                <a-form-item label>
                  <a-checkbox>Pickup Required</a-checkbox>
                </a-form-item>
                <a-form-item label>
                  <a-radio-group name="radioGroup">
                    <a-radio :value="1">Non Smoking</a-radio>
                    <a-radio :value="2">Smoking</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-collapse-panel>
            </a-collapse>
          </a-col>
        </a-row>
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
  margin: 30px;
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
}
</style>
