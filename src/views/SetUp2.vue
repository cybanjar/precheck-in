<template>
  <div class="mt-3">
    <h1 class="text-center mb-3 text-uppercase font-weight-bold">
      VHP Online Configuration
    </h1>
    <a-row class="ml-3 mr-3" :gutter="[16, 8]">
      <a-col :span="8" :lg="8" :xs="24">
        <a-card hoverable title="Features" style="width: 100%">
          <a slot="extra">
            <a-icon type="snippets" />
          </a>
          <div class="ml-3 mr-3">
            <a-form-item layout="vertical" label="CheckIn Time">
              <a-time-picker
                :default-value="moment('13:00', 'HH:mm')"
                v-decorator="[
                  'time',
                  {
                    rules: [{ required: true }],
                  },
                ]"
                :minute-step="30"
                format="HH:mm"
              />
            </a-form-item>
            <a-form-item label="Enable Upload ID">
              <a-switch
                v-model="uploadID"
                checked-children="Yes"
                un-checked-children="No"
              />
            </a-form-item>
            <a-form-item label="Default Purpose of Stay">
              <a-select
                default-value="leisure"
                style="width: 100%"
                @change="handlePurpose"
              >
                <a-select-option value="leisure">Leisure</a-select-option>
                <a-select-option value="bussiness">Bussiness</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="Using KIOSK Check-In">
              <a-switch
                v-model="kiosk"
                checked-children="Yes"
                un-checked-children="No"
              />
            </a-form-item>
          </div>
        </a-card>
      </a-col>
      <a-modal
        title="Select Standart Color"
        :visible="visibleBC"
        :confirm-loading="confirmLoading"
        @ok="handleOkBC"
        @cancel="handleCancelBC"
      >
        <a-row>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#1890FF')" class="card-color blue">
              Blue
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#E85058')" class="card-color red">
              Red
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FBDB81')" class="card-color yellow">
              Yellow
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#008800')" class="card-color green">
              Green
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FFFFFF')" class="card-color white">
              White
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#D42A83')" class="card-color magenta">
              Magenta
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#1B262C')" class="card-color black">
              Black
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FA7D09')" class="card-color orange">
              Orange
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#901F90')" class="card-color purple">
              Purple
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#1488CC')" class="card-color bluesky">
              Blue Sky
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#E4E3E3')" class="card-color grey">
              Grey
            </div>
          </a-col>
          <a-col :span="8" :lg="8">
            <div @click="mouseClicks('#FFBF00')" class="card-color gold">
              Gold
            </div>
          </a-col>
        </a-row>
      </a-modal>
      <a-col :span="8" :lg="8" :xs="24">
        <a-card hoverable title="Request" style="width: 100%">
          <a slot="extra">
            <a-icon type="lock" />
          </a>
          <div class="ml-3 mr-3">
            <a-form-model-item label="Room Preferences">
              <a-checkbox-group
                v-for="datarow in dataPreferences"
                :key="datarow.number2"
                v-model="form.type"
              >
                <!-- {{datarow.setupvalue}} -->
                <!-- <template v-for="datarow in dataPreferences">
                  <a-checkbox v-model="floor" value="1" name="type">
                  <span class="font-weight-normal">Lower Floor/ Higher Floor</span>
                </a-checkbox>
                </template>-->

                <a-checkbox
                  checked="datarow.setupflag"
                  value="['datarow.number2']"
                  name="type"
                >
                  <span class="font-weight-normal">{{
                    datarow.setupvalue
                  }}</span>
                </a-checkbox>
                <br />
                <!-- 
                <a-checkbox value="2" name="type">
                  <span class="font-weight-normal">Smoking/ Non Smoking</span>
                </a-checkbox>
                <br />
                <a-checkbox value="3" name="type">
                  <span class="font-weight-normal">One Big Bed/ Two Big Bed</span>
                </a-checkbox>-->
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-item label="Pickup">
              <a-switch
                v-model="pickupRequest"
                checked-children="Yes"
                un-checked-children="No"
              />
            </a-form-item>
            <div v-if="pickupRequest">
              <a-form-item label="Pickup Type">
                <a-radio-group>
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
              <a-form-item label="Pickup Rate">
                <a-input-number
                  style="width: 100%"
                  v-model="perPax"
                  :formatter="
                    (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                  :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                  :max="1000000"
                />
              </a-form-item>
            </div>
            <a-form-item label="Keycard Qty">
              <a-input-number
                v-model="keyCard"
                id="inputNumber"
                :min="1"
                :max="10"
              />
            </a-form-item>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8" :lg="8" :xs="24">
        <a-card
          style="width: 100%"
          title="Theme"
          :tab-list="tabList"
          hoverable
          :active-tab-key="key"
          @tabChange="(key) => onTabChange(key, 'key')"
        >
          <span slot="customRender" slot-scope="item">{{ item.key }}</span>
          <a slot="extra" href="#">
            <a-icon type="bg-colors" />
          </a>
          <div class="ml-3 mr-3" v-if="key === 'tab1'">
            <a-form-item>
              <a-radio-group :default-value="colorPicker" @change="onChangeBC">
                <a-radio value="1">
                  <span class="font-weight-normal">Default</span>
                </a-radio>
                <a-radio value="2">
                  <span class="font-weight-normal">Custom</span>
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item v-if="colorPicker == '1'">
              <a-input v-model="bgColor" @click="showModalBC">
                <a-icon
                  slot="prefix"
                  type="bg-colors"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item v-else>
              <slider-picker
                style="width: 300px"
                class="vc-slider"
                v-model="info.backgroundColor"
              />
            </a-form-item>
          </div>
          <div class="ml-3 mr-3" v-if="key === 'tab2'">
            <a-form-item>
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
              <a-input v-model="fgColor" @click="showModalFC">
                <a-icon
                  slot="prefix"
                  type="bg-colors"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item v-else>
              <slider-picker
                style="width: 300px"
                class="vc-slider"
                v-model="info.foregroundColor"
              />
            </a-form-item>
          </div>
        </a-card>
        <br />
      </a-col>
    </a-row>

    <a-row class="ml-3 mr-3" :gutter="[16, 8]">
      <a-col :span="8" :lg="8" :xs="24">
        <a-card hoverable title="Deposit" style="width: 100%">
          <a slot="extra">
            <a-icon type="wallet" />
          </a>
          <div class="ml-3 mr-3">
            <a-form-item label="Deposit Parameters">
              <a-row>
                <a-col :span="2">
                  <a-checkbox
                    v-model="allowDepositChecklist"
                    @change="changeDeposit"
                  />
                </a-col>
                <a-col :span="22">
                  <p>{{ this.allowDepositDescr }}</p>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label="Min Deposit Per Night">
              <a-input-number
                style="width: 100%"
                v-model="minDeposit"
                :formatter="
                  (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                :max="1000000"
              />
            </a-form-item>
            <a-form-item label="Over One Night">
              <a-input-number
                style="width: 100%"
                v-model="overDeposit"
                :formatter="
                  (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                :max="1000000"
              />
            </a-form-item>
            <a-form-item label="Over One Night">
              <a-input-number
                style="width: 100%"
                v-model="maxDeposit"
                :formatter="
                  (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                :max="1000000"
              />
            </a-form-item>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8" :lg="8" :xs="24">
        <a-card hoverable title="Wifi Access" style="width: 100%">
          <a slot="extra">
            <a-icon type="wifi" />
          </a>
          <div class="ml-3 mr-3">
            <a-form-item label="Wifi Name/ SSID">
              <a-input
                v-model="ssid"
                v-decorator="[
                  'ssid',
                  {
                    rules: [{ required: false }],
                  },
                ]"
              >
                <a-icon slot="prefix" type="wifi" />
              </a-input>
            </a-form-item>
            <a-form-item label="Wifi Password">
              <a-input
                v-model="wifipass"
                v-decorator="['wifipass', { rules: [{ required: false }] }]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8" :lg="8" :xs="24">
        <a-card hoverable title="Setup URL" style="width: 100%">
          <a slot="extra">
            <a-icon type="deployment-unit" />
          </a>
          <div class="ml-3 mr-3">
            <a-form-item label="URL Image Hotel">
              <a-input v-model="urlhotelimage" />
            </a-form-item>
            <a-form-item label="URL Header Image">
              <a-input v-model="urliamgeheader" />
            </a-form-item>
            <a-form-item label="URL Footer">
              <a-input v-model="urliamgefooter" />
            </a-form-item>
            <a-form-item label="Website Hotel">
              <a-input v-model="urlwebsite" />
            </a-form-item>
            <a-form-item label="URL Precheck-In Website">
              <a-input v-model="urlprecheckin" />
            </a-form-item>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-row class="ml-3 mr-3" :gutter="[16, 8]">
      <a-col :span="24" :lg="24" :xs="24">
        <a-card hoverable title="Term and Condition" style="width: 100%">
          <a slot="extra">
            <a-icon type="safety-certificate" />
          </a>
          <div class="ml-3 mr-3">
            <a-row :gutter="[16, 8]">
              <a-col :span="8" :xl="8" :xs="24">
                <a-form-item label="Default Language [English]">
                  <a-textarea v-model="tempEng" :rows="6" />
                </a-form-item>
              </a-col>
              <a-col :span="8" :xl="8" :xs="24">
                <a-form-item label="Other Language [Local Language]">
                  <a-textarea v-model="tempOther" :rows="6" />
                </a-form-item>
              </a-col>
              <a-col :span="8" :xl="8" :xs="24">
                <a-form-item label="Other Term & Condition">
                  <a-textarea v-model="tempLocal" :rows="6" />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <a-modal
      title="Select Standart Color"
      :visible="visibleFC"
      :confirm-loading="confirmLoading"
      @ok="handleOkFC"
      @cancel="handleCancelFC"
    >
      <a-row>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#1890FF')" class="card-color blue">
            Blue
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#E85058')" class="card-color red">Red</div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FBDB81')" class="card-color yellow">
            Yellow
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#008800')" class="card-color green">
            Green
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FFFFFF')" class="card-color white">
            White
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#D42A83')" class="card-color magenta">
            Magenta
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#1B262C')" class="card-color black">
            Black
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FA7D09')" class="card-color orange">
            Orange
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#901F90')" class="card-color purple">
            Purple
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#1488CC')" class="card-color bluesky">
            Blue Sky
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#E4E3E3')" class="card-color grey">
            Grey
          </div>
        </a-col>
        <a-col :span="8" :lg="8">
          <div @click="mouseClicksx('#FFBF00')" class="card-color gold">
            Gold
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <a-row class="ml-3 mr-3" :gutter="[16, 8]">
      <a-col :span="6" :lg="6" :xs="24">
        <a-button>Cancel</a-button>
        <a-button class="ml-2" type="primary">Save</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from "moment";
import ky from "ky";
import { Slider } from "vue-color";

export default {
  components: {
    "slider-picker": Slider,
  },
  data() {
    return {
      pickuprate: 100000,
      minDeposit: "",
      overDeposit: "",
      maxDeposit: "",
      value: [],
      form: {
        type: [],
        pickupType: "1",
        Pickup: "1",
        TermEnglish: "1",
        desc: "",
      },
      ModalText: "Standart Colors",
      visibleBC: false,
      visibleFC: false,
      confirmLoading: false,
      response: [],
      colorPicker: "1",
      fontColor: "3",
      info: {
        backgroundColor: "$green",
        color: "$white",
        foregroundColor: "$green",
      },
      mouseClick: null,
      ssid: "",
      wifipass: "",
      tempsetup: [],
      dataPreferences: [],
      tabList: [
        {
          key: "tab1",
          tab: "Background Color",
          scopedSlots: { tab: "customRender" },
        },
        {
          key: "tab2",
          tab: "Font Color",
        },
      ],
      contentList: {
        tab1: "content1",
        tab2: "content2",
      },
      key: "tab1",
      noTitleKey: "app",
      disabled: true,
      showPickup: false,
      checkinTime: "",
      urlwebsite: "",
      urlhotelimage: "",
      urliamgefooter: "",
      urliamgeheader: "",
      urlprecheckin: "",
      tempEng: "",
      tempLocal: "",
      tempOther: "",
      allowDepositChecklist: "",
      allowDepositDescr: "",
      uploadID: "",
      kiosk: "",
      floor: "",
      pickupRequest: "",
      perPax: "",
      keyCard: "",
      bgColor: "",
      fgColor: "",
    };
  },
  created() {
    (async () => {
      const parsed = await ky
        .post("http://ws1.e1-vhp.com/VHPWebBased/rest/preCI/loadSetup", {
          json: {
            request: {
              icase: 1,
            },
          },
        })
        .json();
      this.response = parsed;

      this.tempsetup = parsed.response.pciSetup["pci-setup"];

      // --
      for (let i = 0; i < this.tempsetup.length; i++) {
        const datarow = this.tempsetup[i];
        const tempNumber1 = datarow["number1"];
        const tempNumber2 = datarow["number2"];

        if (tempNumber1 === 8 && tempNumber2 === 2) {
          // FIXME: checktime & purpose blm bisa
          this.checkinTime = datarow["setupvalue"];
        } else if (tempNumber1 === 8 && tempNumber2 === 1) {
          this.uploadID = datarow["setupflag"];
        } else if (tempNumber1 === 8 && tempNumber2 === 10) {
          this.kiosk = datarow["setupflag"];
        }

        if (tempNumber1 === 3) {
          // FIXME: Room preference blm berdasarkan API
          this.dataPreferences.push(datarow);
          this.floor = datarow["setupflag"];
        } else if (tempNumber1 === 2 && tempNumber2 === 1) {
          this.pickupRequest = datarow["setupflag"];
          // TODO: Pickup Type Descr masih hardcore
        } else if (tempNumber1 === 2 && tempNumber2 === 1) {
          this.perPax = datarow["price"];
        } else if (tempNumber1 === 8 && tempNumber2 === 3) {
          this.keyCard = datarow["setupvalue"];
        }

        if (tempNumber1 === 4 && tempNumber2 === 1) {
          this.bgColor = datarow["setupvalue"];
        } else if (tempNumber1 === 5 && tempNumber2 === 1) {
          this.fgColor = datarow["setupvalue"];
        }

        if (tempNumber1 === 8 && tempNumber2 === 8) {
          this.ssid = datarow["setupvalue"];
        } else if (tempNumber1 === 8 && tempNumber2 === 9) {
          this.wifipass = datarow["setupvalue"];
        }

        if (tempNumber1 === 7 && tempNumber2 === 1) {
          this.urlhotelimage = datarow["setupvalue"];
        } else if (tempNumber1 === 7 && tempNumber2 === 3) {
          this.urliamgeheader = datarow["setupvalue"];
        } else if (tempNumber1 === 7 && tempNumber2 === 4) {
          this.urliamgefooter = datarow["setupvalue"];
        } else if (tempNumber1 === 7 && tempNumber2 === 2) {
          this.urlwebsite = datarow["setupvalue"];
        } else if (tempNumber1 === 7 && tempNumber2 === 5) {
          this.urlprecheckin = datarow["setupvalue"];
        }

        if (tempNumber1 === 6 && tempNumber2 === 1) {
          this.tempEng = datarow["setupvalue"];
        } else if (tempNumber1 === 6 && tempNumber2 === 3) {
          this.tempLocal = datarow["setupvalue"];
        } else if (tempNumber1 === 6 && tempNumber2 === 2) {
          this.tempOther = datarow["setupvalue"];
        }

        if (tempNumber1 === 8 && tempNumber2 === 4) {
          this.allowDepositChecklist = datarow["setupflag"];
          this.allowDepositDescr = datarow["descr"];
        } else if (tempNumber1 === 8 && tempNumber2 === 5) {
          this.minDeposit = datarow["price"];
        } else if (tempNumber1 === 8 && tempNumber2 === 6) {
          this.overDeposit = datarow["price"];
        } else if (tempNumber1 === 8 && tempNumber2 === 7) {
          this.maxDeposit = datarow["price"];
        }
      }
    })();
  },
  methods: {
    onChangeBC(e) {
      this.colorPicker = e.target.value;
    },
    onChangeFC(e) {
      this.fontColor = e.target.value;
    },
    showModalBC() {
      this.visibleBC = true;
    },
    showModalFC() {
      this.visibleFC = true;
    },
    handleOkBC(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleBC = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancelBC(e) {
      this.bgColor = "#1890FF";
      this.visibleBC = false;
    },
    handleOkFC(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visibleFC = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancelFC(e) {
      this.defaultFC = "#1890FF";
      this.visibleFC = false;
    },
    mouseClicks(color) {
      this.bgColor = color;
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
    onTabChange(key, type) {
      this[type] = key;
    },
    onToggle() {
      this.disabled = !this.disabled;
    },
  },
};
</script>
