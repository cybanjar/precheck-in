<template>
  <div class="mt-3">
    <h1 class="ml-3 font-weight-bold">Program Set Up</h1>
    <a-row class="ml-3 mr-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Background Color Mode">
          <a-radio-group :default-value="colorPicker" @change="onChangeBC">
            <a-radio value="1">
              <span class="font-weight-normal">Default</span>
            </a-radio>
            <a-radio value="2">
              <span class="font-weight-normal">Custom</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- {{ response }} -->
        <a-form-item v-if="colorPicker == '1'">
          <a-input v-model="defaultBC" @click="showModalBC">
            <a-icon slot="prefix" type="bg-colors" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item v-else>
          <slider-picker style="width: 300px" class="vc-slider" v-model="info.backgroundColor" />
        </a-form-item>
      </a-col>
      <a-modal
        title="Select Standart Color"
        :visible="visibleBC"
        :confirm-loading="confirmLoading"
        @ok="handleOkBC"
        @cancel="handleCancelBC"
      >
        <!-- <p>{{ ModalText }}</p> -->
        <a-row>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#1890FF')" class="card-color blue">Blue</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#E85058')" class="card-color red">Red</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FBDB81')" class="card-color yellow">Yellow</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#008800')" class="card-color green">Green</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FFFFFF')" class="card-color white">White</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#D42A83')" class="card-color magenta">Magenta</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#1B262C')" class="card-color black">Black</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FA7D09')" class="card-color orange">Orange</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#901F90')" class="card-color purple">Purple</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#1488CC')" class="card-color bluesky">Blue Sky</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#E4E3E3')" class="card-color grey">Grey</div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FFBF00')" class="card-color gold">Gold</div>
          </a-col>
        </a-row>
      </a-modal>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Foreground Color Mode">
          <a-radio-group :default-value="fontColor" @change="onChangeFC">
            <a-radio value="3">
              <span class="font-weight-normal">Default</span>
            </a-radio>
            <a-radio value="4">
              <span class="font-weight-normal">Custom</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-if="fontColor == '3'">
          <a-input v-model="defaultFC" @click="showModalFC">
            <a-icon slot="prefix" type="bg-colors" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item v-else>
          <slider-picker style="width: 300px" class="vc-slider" v-model="info.foregroundColor" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-modal
      title="Select Standart Color"
      :visible="visibleFC"
      :confirm-loading="confirmLoading"
      @ok="handleOkFC"
      @cancel="handleCancelFC"
    >
      <!-- <p>{{ ModalText }}</p> -->
      <a-row>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#1890FF')" class="card-color blue">Blue</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#E85058')" class="card-color red">Red</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FBDB81')" class="card-color yellow">Yellow</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#008800')" class="card-color green">Green</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FFFFFF')" class="card-color white">White</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#D42A83')" class="card-color magenta">Magenta</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#1B262C')" class="card-color black">Black</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FA7D09')" class="card-color orange">Orange</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#901F90')" class="card-color purple">Purple</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#1488CC')" class="card-color bluesky">Blue Sky</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#E4E3E3')" class="card-color grey">Grey</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FFBF00')" class="card-color gold">Gold</div>
        </a-col>
      </a-row>
    </a-modal>
    <!-- <a-divider style="width: 50px" /> -->
    <a-row class="ml-3" :gutter="[16,8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Enable Upload ID">
          <a-radio-group v-model="defaultUpload">
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
            :default-value="moment('13:00', 'HH:mm')"
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
          <a-radio-group v-model="form.Pickup">
            <a-radio value="1">
              <span class="font-weight-normal">Yes</span>
            </a-radio>
            <a-radio value="2">
              <span class="font-weight-normal">No</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="6" :lg="6" :xs="24">
        <a-form-item label="Pickup Type">
          <a-radio-group v-model="form.pickupType">
            <a-radio value="1">
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
            :default-value="pickuprate"
            v-model="pickuprate"
            :formatter="
                    (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            :max="1000000"
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
      <a-col :span="12" :lg="12" :xs="24">
        <a-form-item label="Term and Condition">
          <a-radio-group v-model="form.TermEnglish">
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
import { Slider } from "vue-color";

export default {
  components: {
    "slider-picker": Slider
  },
  data() {
    return {
      pickuprate: 100000,
      bgColor: '#1890ff',
      value: [],
      form: {
        type: [],
        pickupType: '1',
        Pickup: '1',
        TermEnglish: '1',
        desc: '',
      },
      ModalText: 'Standart Colors',
      visibleBC: false,
      visibleFC: false,
      confirmLoading: false,
      response: [],
      colorPicker: '1',
      fontColor: '3',
      info: {
        backgroundColor: "$green",
        color: "$white",
        foregroundColor: "$green",
      },
      mouseClick: null,
      defaultBC: '#1890FF',
      defaultFC: '#1B262C',
      defaultUpload: 'yes',
      tempsetup: [],      
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
    this.response = parsed;
  
    this.tempsetup = parsed.response.pciSetup["pci-setup"];
        // console.log(this.tempsetup, 'tempsetup');
    })();
  },
  methods: {
    onChangeBC(e) {
      // console.log('radio checked', e.target.value);
      this.colorPicker = e.target.value;
    },
    onChangeFC(e) {
      // console.log('radio checked', e.target.value);
      this.fontColor = e.target.value;
    },
    showModalBC() {
      this.visibleBC = true;
    },
    showModalFC() {
      this.visibleFC = true;
    },
    handleOkBC(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleBC = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancelBC(e) {
      // console.log('Clicked cancel button');
      this.defaultBC= '#1890FF';
      this.visibleBC = false;
    },
    handleOkFC(e) {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleFC = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancelFC(e) {
      // console.log('Clicked cancel button');
      this.defaultFC= '#1890FF';
      this.visibleFC = false;
    },
    mouseClicks(color) {
        this.defaultBC = color;
    },
    mouseClicksx(color) {
      this.defaultFC = color;
    },
    moment,
    handleChange(e) {
      this.checkNick = e.target.value;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    },
  }
}
</script>