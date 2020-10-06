<template>
  <div>
    <h5 class="text-center text-uppercase">VHP Online Configuration</h5>
    <div class="row">
      <!-- Features -->
      <div class="col-4 col-md-4 col-xs-12">
        <q-card flat bordered class="text-center q-ma-md">
          <q-card-section>
            <div class="text-h6">Features</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-input
              outlined
              label="Checkin Time"
              v-model="checkinTime"
              mask="time"
              :rules="['time']"
            >
              <template v-slot:append>
                <q-icon name="access_time" color="primary" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="checkinTime">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="text-left">
              <q-toggle v-model="uploadID" label="Enable Upload ID" />
            </div>
            <q-select
              class="q-mt-md"
              outlined
              v-model="purposeOfStayValue"
              :options="FilterPurposeofStay"
              label="Default Purpose of Stay"
            />
            <div class="text-left q-mt-md">
              <q-toggle v-model="kiosk" label="Using KIOSK Check-in" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Request -->
      <div class="col-4 col-md-4 col-xs-12">
        <div class="col-4 col-md-4 col-xs-12">
          <q-card flat bordered class="text-center q-ma-md">
            <q-card-section>
              <div class="text-h6">Request</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="text-left q-pa-md">
                <p>Room Preferences</p>
                <q-option-group
                  class="text-capitalize"
                  :options="dataPreferences"
                  type="checkbox"
                  v-model="roomPreferenceValue"
                />
              </div>
              <div class="text-left">
                <q-toggle v-model="pickupRequest" label="Pickup Request" />
              </div>
              <div class="text-left" v-if="pickupRequest">
                <q-option-group
                  :options="selectPickupRequest"
                  label="Notifications"
                  type="radio"
                  v-model="pickupRequestValue"
                  inline
                />
                <q-input
                  outlined
                  type="number"
                  class="q-mt-md"
                  v-model="pickupRate"
                  label="Pickup Rate"
                />
              </div>
              <q-input
                outlined
                type="number"
                class="q-mt-md"
                v-model="keyCard"
                label="Keycard Qty"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!-- Theme -->
      <div class="col-4 col-md-4 col-xs-12">
        <div class="col-4 col-md-4 col-xs-12">
          <q-card flat bordered class="text-center q-ma-md">
            <q-card-section>
              <div class="text-h6">Theme</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="text-left">
                <p>Background Color</p>
                <q-radio v-model="bgColor" val="1" label="Default" />
                <q-radio v-model="bgColor" val="2" label="Custom" />

                <q-input v-if="bgColor == '1'" outlined class="q-mt-md" label="Default Color" />
                <q-input v-else outlined class="q-mt-md" label="Custom Color" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
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
      checkinTime: "",
      uploadID: "",
      purposeOfStay: [],
      FilterPurposeofStay: [],
      kiosk: "",
      purposeOfStayValue: null,
      roomPreferences: [],
      dataPreferences: [],
      checkboxRoomPref: [],
      pickupRequest: "",
      valuePickupRequest: null,
      selectPickupRequest: [
        { label: "Per Pax", value: "pax" },
        { label: "Per Car", value: "car" },
        { label: "Free", value: "free" },
      ],
      pickupRate: "",
      keyCard: "",
      bgColor: "",
      fgColor: "",
      roomPreferenceValue: [],
      pickupRequestValue: null,
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
      //   console.log(this.tempsetup, "tempsetup");

      for (let i = 0; i < this.tempsetup.length; i++) {
        const datarow = this.tempsetup[i];
        const tempNumber1 = datarow["number1"];
        const tempNumber2 = datarow["number2"];

        if (tempNumber1 === 8 && tempNumber2 === 2) {
          this.checkinTime = datarow["setupvalue"];
        } else if (tempNumber1 === 8 && tempNumber2 === 1) {
          this.uploadID = datarow["setupflag"];
        } else if (tempNumber1 === 1) {
          datarow["label"] = datarow["setupvalue"];
          datarow["value"] = datarow["setupvalue"];
          if (datarow["setupflag"]) {
            this.purposeOfStayValue = datarow;
          }
          this.FilterPurposeofStay.push(datarow);
        } else if (tempNumber1 === 8 && tempNumber2 === 10) {
          this.kiosk = datarow["setupflag"];
        }

        if (tempNumber1 === 3) {
          datarow["label"] = datarow["setupvalue"];
          datarow["value"] = datarow["setupvalue"];
          if (datarow["setupflag"]) {
            this.roomPreferenceValue.push(datarow["setupvalue"]);
          }
          this.dataPreferences.push(datarow);
        } else if (tempNumber1 === 2 && tempNumber2 === 1) {
          this.pickupRequest = datarow["setupflag"];
        } else if (tempNumber1 === 2) {
          this.pickupRequestValue = datarow["setupflag"];
          console.log(this.pickupRequest);
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
};
</script>