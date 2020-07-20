<template>
  <div class="example" v-if="loading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 100px" spin />
    </a-spin>
  </div>
  <div v-else>
    <div>
      <a-row type="flex" justify="start" align="top">
        <a-col>
          <img
            v-if="information.backgroundColor == '#E8505B'"
            class="responsive"
            :src="require('../assets/gradient-red.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#FBDB81'"
            class="responsive"
            :src="require('../assets/gradientTop-Yellow.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#D42A83'"
            class="responsive"
            :src="require('../assets/gradientTop-Magenta.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#901f90'"
            class="responsive"
            :src="require('../assets/gradientTop-Purple.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#FA7D09'"
            class="responsive"
            :src="require('../assets/gradientTop-Orange.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#E4E3E3'"
            class="responsive"
            :src="require('../assets/gradientTop-Grey.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#FFBF00'"
            class="responsive"
            :src="require('../assets/gradientTop-Gold.svg')"
          />
          <img
            v-else-if="information.backgroundColor == 'green'"
            class="responsive"
            :src="require('../assets/GradientTop.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#00D7FF'"
            class="responsive"
            :src="require('../assets/gradientTop-BlueSky.svg')"
          />
          <img
            v-else-if="information.backgroundColor == '#1B262C'"
            class="responsive"
            :src="require('../assets/gradientTop-Black.svg')"
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
              v-else-if="information.backgroundColor == '#FBDB81'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Yellow.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#D42A83'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Magenta.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#901f90'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Purple.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#FA7D09'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Orange.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#E4E3E3'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Grey.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#FFBF00'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Gold.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#FFBF00'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-BlueSky.svg"
            />
            <img
              v-else-if="information.backgroundColor == 'green'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/CardOnlineCheck-in.svg"
            />
            <img
              v-else-if="information.backgroundColor == '#1B262C'"
              class="card-online"
              slot="cover"
              :xl="24"
              :xs="24"
              alt="example"
              src="../assets/onlineCheckin-Black.svg"
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
          <div class="mt-3 ml-3 guest-name text-left">
            <h1 class="mb-3 main-guest-title font-weight-bold">{{currDataPrepare.name}}</h1>
            <h4 class="mb-3 main-guest-title font-weight-bold">{{currDataPrepare.description}}</h4>
            <p class="ant-card-meta-description">
              Reservation from {{currDataPrepare.arrival}} until {{currDataPrepare.departure}}
              <br />Reservation number
              <a-tag color="green">11020133</a-tag>
            </p>
          </div>
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
            <a-card-meta title="Grand Visual Hotel Jakarta">
              <template
                slot="description"
              >Jl. Bukit Gading Raya, Perkantoran Gading Bukit Indah blok O No. 3-5, Kelapa Gading, Jakarta 14240, Indonesia, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14240</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-modal
        v-model="keluar"
        title="Color and Image Setting"
        :visible="keluar"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Background Color">
            <p>Standart Color</p>
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#1890ff')">Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#E8505B')">Red</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FBDB81')">Yellow</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('green')">Green</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('white')">White</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#D42A83')">Magenta</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#1B262C')">Black</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FA7D09')">Orange</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#901f90')">Purple</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#00D7FF')">Sky Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#E4E3E3')">Grey</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiHeaderClass('#FFBF00')">Gold</a>

            <p>Custom Back Color</p>
            <slider-picker
              class="vc-slider"
              v-model="information.backgroundColor"
              @input="customHeaderClass"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Font Color" force-render>
            <p>Standart Color</p>
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#1890ff')">Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#E8505B')">Red</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FBDB81')">Yellow</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('green')">Green</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('white')">White</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#D42A83')">Magenta</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#1B262C')">Black</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FA7D09')">Orange</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#901f90')">Purple</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#00D7FF')">Sky Blue</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#E4E3E3')">Grey</a>
            <br />
            <a href="#" onclick="return false;" @mouseenter="gantiFontClass('#FFBF00')">Gold</a>

            <p>Custom Back Color</p>
            <slider-picker class="vc-slider" v-model="information.color" @input="customFontClass" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Change Image" force-render>
            <label>URL Image</label>
            <a-input v-model="gambar" @input="masukinFoto" />
            <p
              :style="{ color: '#E8505B', fontStyle: 'italic', fontSize: '0.75rem'}"
            >* Recommended resolution 1366 x 768 atau HD</p>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
      <!-- <a-row>
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
      </a-row>-->
      <!-- <a-modal
        v-model="visible"
        title="Theme Color Setting"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        
      </a-modal>-->
      <div>
        <a-form layout="vertical" :form="form">
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
            <p v-if="nilai != 3">
              <label>Pickup Rate :</label>
              <a-input-group compact>
                <a-select
                  :disabled="!showPickupRequest"
                  :default-value="currency"
                  v-model="currency"
                >
                  <a-select-option value="Rp.">Rp.</a-select-option>
                  <a-select-option value="$">$</a-select-option>
                  <a-select-option value="€">€</a-select-option>
                </a-select>
                <a-input-number
                  :disabled="!showPickupRequest"
                  :default-value="money"
                  v-model="money"
                  :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                  @input="masukinUang"
                />
              </a-input-group>
            </p>
            <p>
              <label class="ml-2" for="checkbox">Room Preferences :</label>
            </p>
            <p>
              <a-checkbox :checked="showFloor" v-model="showFloor">Lower Floor & Higher Floor</a-checkbox>
            </p>
            <p>
              <a-checkbox :checked="showSmoking" v-model="showSmoking">Smoking & Non Smoking</a-checkbox>
            </p>
            <p>
              <a-checkbox :checked="showBed" v-model="showBed">One Big Bed & Two Single Bed</a-checkbox>
            </p>
          </a-modal>
          <a-row class="ml-3" gutter="16">
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
                <label
                  class="font-weight-bold"
                >{{nilai === 3 ? "" : currency}} {{nilai === 3 ? " " : `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " "}}</label>
                <span v-if="nilai === 1">/ Pax</span>
                <span v-else-if="nilai === 2">/ Car</span>
                <span v-else>Free of Charge</span>
              </a-form-item>
            </a-col>

            <a-col v-show="showPrice && showPickupRequest" :span="8" :xl="8" :xs="24">
              <a-form-item label="Flight Details">
                <a-input placeholder="Please input flight details" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="ml-3" gutter="16">
            <a-col>
              <p v-show="showSmoking || showFloor || showBed">Room Preferences</p>
              <a-form-item label v-show="showSmoking">
                <a-radio-group name="radioGroup">
                  <a-radio :value="1">Non Smoking</a-radio>
                  <a-radio :value="2">Smoking</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label v-show="showFloor">
                <a-radio-group name="radioGroup">
                  <a-radio :value="1">Lower Floor</a-radio>
                  <a-radio :value="2">Higher Floor</a-radio>
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
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="12" :xl="12" :xs="24">
              <a-form-item label="Special Request">
                <a-textarea
                  placeholder="Ex: Connecting Wifi"
                  :rows="4"
                  :maxlength="max"
                  v-model="text"
                />
                <span v-text="(text.length) + '/' + (max)"></span>
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
                    @click="guestModal"
                  />
                </a-col>
              </a-row>
            </a-card>
          </a-row>
          <a-modal
            v-model="guest"
            title="Guest Preference Setup"
            :visible="guest"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
          >
            <label>Document ID Setup</label>
            <br />
            <a-checkbox-group @change="onID">
              <a-checkbox value="id_card">ID Card</a-checkbox>

              <a-checkbox value="paspor">Paspor</a-checkbox>

              <a-checkbox value="driver_lisence">Driver Lisence</a-checkbox>

              <a-checkbox value="other">Other</a-checkbox>
            </a-checkbox-group>
            <!-- <input v-model="message"  />
            {{dataID[0] || dataID[1] || dataID[2] || dataID[3] == other}}-->
            <br />
            <br />

            <label>Term and Condition</label>
            <a-textarea v-model="term" @input="masukinTerm" :rows="3" />
          </a-modal>
          <a-row class="ml-3" :gutter="[16,8]">
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Nationality">
                <a-select default-value="Indonesia">
                  <a-select-option value="indonesia">Indonesia</a-select-option>
                  <a-select-option value="america">America</a-select-option>
                  <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Document ID">
                <a-select default-value="ID Card">
                  <a-select-option value="id_card">ID Card</a-select-option>
                  <a-select-option value="paspor">Paspor</a-select-option>
                  <a-select-option value="driver_lisence">Driver Lisence</a-select-option>
                  <a-select-option value="kitas">KITAS</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="ID Number">
                <a-input placeholder="Please input " />
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
          <a-row class="ml-3" :gutter="[16, 8]">
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Country">
                <a-select :default-value="country" v-model="country">
                  <a-select-option value="indonesia">Indonesia</a-select-option>
                  <a-select-option value="america">America</a-select-option>
                  <a-select-option value="arabsaudi">Arab Saudi</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <div v-if="country === 'indonesia'">
                <a-form-item label="Region">
                  <a-select default-value="DKI Jakarta">
                    <a-select-option value="jakarta">DKI Jakarta</a-select-option>
                    <a-select-option value="west_java">West Java</a-select-option>
                    <a-select-option value="central_java">Central Java</a-select-option>
                    <a-select-option value="east_java">East Java</a-select-option>
                    <a-select-option value="banten">Banten</a-select-option>
                  </a-select>
                </a-form-item>
              </div>
              <div v-else>
                <a-form-item label="State">
                  <a-input
                    initial-value="Willy Wanta"
                    v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '' }] },
                ]"
                  />
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24" v-if="country === 'indonesia'">
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
            <a-col :span="5" :xl="5" :xs="24" v-else>
              <a-form-item label="City">
                <a-input
                  initial-value="Willy Wanta"
                  v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '' }] },
                ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="12">
              <a-form-item label="Postal Code">
                <a-input placeholder="Ex : 12750" />
              </a-form-item>
            </a-col>

            <a-col :span="10" :xl="10" :xs="24">
              <a-form-item label="Address">
                <a-textarea placeholder="Input Address" :rows="4" />
              </a-form-item>
            </a-col>
            <!--<a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Sharing Guest">
                <a-input
                  placeholder="Please input"
                  disabled
                  :defaultValue="currDataPrepare.description"
                />
              </a-form-item>
            </a-col>-->
          </a-row>

          <!-- Address -->
          <a-row class="ml-3" gutter="8">
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Email">
                <a-input
                  v-decorator="[
                      'email',
                      { rules: [{ required: checkNick, message: 'Please input your email' }] },
                    ]"
                  :placeholder="currDataPrepare.email"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="5" :xl="5" :xs="24">
              <a-form-item label="Phone Number">
                <a-input
                  v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          },
        ]"
                  style="width: 100%"
                >
                  <a-select
                    slot="addonBefore"
                    v-decorator="['prefix', { initialValue: '62' }]"
                    style="width: 70px"
                  >
                    <a-select-option value="62">+62</a-select-option>
                    <a-select-option value="1">+1</a-select-option>
                    <a-select-option value="966">+966</a-select-option>
                  </a-select>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="3" :xl="3" :xs="24">
              <a-form-item label="Purpose of Stay">
                <a-select default-value="Bussiness">
                  <a-select-option value="bussiness">Bussiness</a-select-option>
                  <a-select-option value="leisure">Leisure</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="ml-3 mb-3" gutter="8">
            <a-col :span="12" :xl="12" :xs="24">
              <a-checkbox v-model="agree">{{term}}</a-checkbox>
            </a-col>
          </a-row>
        </a-form>
        <a-row>
          <a-col :span="4" :xl="4" :xs="24">
            <!--<a-button
              :xl="12"
              class="font-weight-bold mt-3"
              type="primary"
              block
              :size="size"
              @click="back"
              :disabled="id == 0"
            >Back</a-button>-->
            <a-button
              :xl="12"
              class="font-weight-bold mt-3"
              type="primary"
              block
              :size="size"
              @click="save();scrollToTop();"
              :disabled="!agree"
            >Check-In Now</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import Vue from "vue";
import { Slider } from 'vue-color'
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
      id: [],
      currDataPrepare: {},
      counter: 0,
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
      dataID: [],
      max: 100,
      agree:false,
      text: '',
      money: 100000,
      showSmoking: true,
      showBed: true,
      showFloor: true,
      showPickupRequest: true,
      showPrice:  true,
      form: this.$form.createForm(this, { name: "dynamic_rule" }),
      activeKey: ["1"],
      title: ["Mr", "Mrs"],
      expandIconPosition: "left",
      visible: false,
      confirmLoading: false,
      muncul: false,
      guest: false,
      keluar: false,
      currency: 'Rp.',
      country: 'indonesia',          
      loading: true,
      term: 'I agree with the Terms and Conditions of Visual Grand Hotel Web Check-in.',
      gambar:"https://source.unsplash.com/1366x786/?hotel",
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
      key
    }
  },
   created() {
       this.loading = false

     if(this.$route.params.id != undefined){

    this.id = this.$route.params.id;
    // this.counter = this.id.length;

    this.currDataPrepare = this.id[this.counter];
    this.counter += 1;
     }
    else{
      router.push('guest-list')
    }
  },
  methods: {
    scrollToTop() {
                window.scrollTo(0,0);
           },
    save() {
      if (this.counter == this.id.length) {
      return false
      }
      this.currDataPrepare = this.id[this.counter];
      this.counter += 1;
    },
    back() {
      if (this.counter == this.id.length) {
      return false
      }
      this.counter -= 1;
      this.currDataPrepare = this.id[this.counter];
    },
    onID(checkedValues) {
      console.log('checked = ', checkedValues);
      this.dataID = checkedValues;
    },
    berubah(e) {
      this.nilai = e.target.value
    },
    masukinFoto(foto) {
      this.gambar = foto.target.value;
    },
    masukinTerm(tulisan) {
      this.term = tulisan.target.value;
    },
    masukinUang(uang){
      this.money =   uang.target.value;
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
    guestModal() {
      this.guest = true;
    },
    gantiHeaderClass(warna) {
      this.information.backgroundColor = warna;
    },
    gantiFontClass(colours) {
      this.information.color = colours;
    },
    customHeaderClass(color) {
      this.information.backgroundColor = color.hex;
    },
    customFontClass(colour) {
      this.information.color = colour.hex;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.muncul = false;
        this.keluar = false;
        this.guest = false;
        this.confirmLoading = false;
      }, 300);
    },
    handleCancel(e) {
      this.visible = false;
      this.muncul = false;
    },
    onChange(date, dateString) {
      data =0 
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

<style scoped lang="scss" src="../css/style.scss"/>
