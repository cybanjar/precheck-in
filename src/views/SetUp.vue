<template>
  <div class="mt-3">
    <h1 class="ml-3 font-weight-bold">Program Set Up</h1>
    <a-row class="ml-3 mr-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Background Color Mode">
          <a-radio-group>
            <a-radio value="1">
              <span class="font-weight-normal">Default</span>
            </a-radio>
            <a-radio value="2">
              <span class="font-weight-normal">Custom</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-input
            @click="showModal"
            v-decorator="[
              { initialValue: bgColor, rules: [{ required: true, message: 'Input color hex' }] },
            ]"
            placeholder="Input colors hex code"
          >
            <a-icon slot="prefix" type="bg-colors" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-col>
      <a-modal
        title="Select Color"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p>{{ ModalText }}</p>
      </a-modal>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Foreground Color Mode">
          <a-radio-group v-decoration="['radio-group']">
            <a-radio value="default">
              <span class="font-weight-normal">Default</span>
            </a-radio>
            <a-radio value="custom">
              <span class="font-weight-normal">Custom</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: 'Input color hex' }] },
            ]"
            placeholder="Input colors hex code"
          >
            <a-icon slot="prefix" type="bg-colors" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-col>
    </a-row>
    <!-- <a-divider style="width: 50px" /> -->
    <a-row class="ml-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Enable Upload ID">
          <a-radio-group v-decoration="['radio-group']">
            <a-radio value="yes">
              <span class="font-weight-normal">Yes</span>
            </a-radio>
            <a-radio value="no">
              <span class="font-weight-normal">No</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item layout="vertical" label="CheckIn Time">
          <a-time-picker
            v-decorator="[
              'time',{
                initialValue: moment('14:00', 'HH:mm'),
                rules: [{ required: true }],
              },
            ]"
            :minute-step="30"
            format="HH:mm"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="ml-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Pickup">
          <a-radio-group v-decoration="['radio-group']">
            <a-radio value="yes">
              <span class="font-weight-normal">Yes</span>
            </a-radio>
            <a-radio value="no">
              <span class="font-weight-normal">No</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Pickup Type">
          <a-radio-group v-decoration="['radio-group']">
            <a-radio v-model="form.pickupType" value="1">
              <span class="font-weight-normal">Per Pax</span>
            </a-radio>
            <a-radio value="2">
              <span class="font-weight-normal">Per Car</span>
            </a-radio>
            <a-radio value="3">
              <span class="font-weight-normal">Free</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Pickup Rate">
          <a-input-number
            :default-value="money"
            v-model="pickuprate"
            :formatter="
                    (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            @input="masukinUang"
            :max="1000000"
            @change="onChange"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="ml-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-model-item label="Room Preferences">
          <a-checkbox-group v-model="form.type">
            <a-checkbox value="1" name="type">
              <span class="font-weight-normal">Lower Floor/ Higher Floor</span>
            </a-checkbox>
            <br />
            <a-checkbox value="2" name="type">
              <span class="font-weight-normal">Smoking/ Non Smoking</span>
            </a-checkbox>
            <br />
            <a-checkbox value="3" name="type">
              <span class="font-weight-normal">One Big Bed/ Two Big Bed</span>
            </a-checkbox>
            <br />
          </a-checkbox-group>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row class="ml-3 mr-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Term and Condition">
          <a-radio-group v-decoration="['radio-group']">
            <a-radio value="1">
              <span class="font-weight-normal">English</span>
            </a-radio>
            <a-radio value="2">
              <span class="font-weight-normal">Other</span>
            </a-radio>
            <a-radio value="3">
              <span class="font-weight-normal">SMK</span>
            </a-radio>
          </a-radio-group>
          <a-textarea placeholder="Input your Temp of condition" :rows="4" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="ml-3 mr-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="URL Image Hotel">
          <a-input placeholder="Input URL image hotel" />
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="URL Header Image Email PCI">
          <a-input placeholder="Input URL header image " />
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="URL Footer Image Email PCI">
          <a-input placeholder="Input URL footer image " />
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Hotel Website">
          <a-input placeholder="Input URL footer image " />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="ml-3 mr-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-button>Cancel</a-button>
        <a-button class="ml-2" type="primary">Save</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from "moment";
import ky from 'ky';
export default {
  data() {
    return {
      pickuprate: 100000,
      bgColor: '#1890ff',
      value: [],
      form: {
        type: [],
        pickupType: '1',
        desc: '',
      },
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  },
  created() {
    (async () => {
        const parsed = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/loadSetup",
            {
              json: {
                request: { 
                  		"icase": 1
                },
              },
            }
          )
          .json();
    console.log(parsed, "parse");
    })();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false;
    },
    moment,
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
  }
}
</script>