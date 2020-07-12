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
        title="Theme Color Setting"
        :visible="visible"
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
        </a-tabs>
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
                    <a-input
                      :disabled="!showPickupRequest"
                      style="width: 50%"
                      v-model="money"
                      @input="masukinUang"
                    />
                  </a-input-group>
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
                    >{{currency}} {{nilai === 3 ? 0 + " " : money + " "}}</label>
                    <span v-if="nilai === 1">/ Pax</span>
                    <span v-else-if="nilai === 2">/ Car</span>
                    <span v-else>Free</span>
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
              <a-row class="ml-3" :gutter="[16, 8]">
                <a-col :span="12" :xl="12" :xs="24">
                  <a-form-item label="Special Request">
                    <a-textarea placeholder="Ex: Connecting Wifi" :rows="4" />
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
              <a-row class="ml-3" :gutter="[16, 8]">
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
                <a-col :span="3" :xl="3" :xs="12">
                  <a-form-item label="Postal Code">
                    <a-input placeholder="Ex : 12750" />
                  </a-form-item>
                </a-col>
                <a-col :span="3" :xl="3" :xs="24">
                  <a-form-item label="Purpose of Stay">
                    <a-select default-value="Bussiness (BS)">
                      <a-select-option value="bussiness">Bussiness (BS)</a-select-option>
                      <a-select-option value="leisure">Leisure (LS)</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- Address -->
              <a-row class="ml-3" gutter="8">
                <a-col :span="10" :xl="10" :xs="24">
                  <a-form-item label="Address">
                    <a-textarea placeholder="Input Address" :rows="4" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row class="ml-3 mb-3" gutter="8">
                <a-col :span="10" :xl="10" :xs="24">
                  <a-card title="Health Declaration">
                    <a slot="extra">
                      <a-icon :style="{fontSize: '1.25rem'}" type="safety-certificate" />
                    </a>
                    <!-- <a slot="extra" href="#">more</a> -->
                    <ol>
                      <li>
                        Have you come into close contact (within 6 feet) with someone who has a laboratory confirmed COVID – 19 diagnosis in the past 14 days?
                        <br />
                        <p>
                          <a-radio-group name="radioGroup">
                            <a-radio :value="1">No</a-radio>
                            <a-radio :value="2">Yes</a-radio>
                          </a-radio-group>
                        </p>
                      </li>
                      <li>
                        Do you have any of the following: fever or chills, cough, shortness of breath or difficulty breathing, body aches, headache, new loss of taste or smell, sore throat?
                        <br />
                        <p>
                          <a-radio-group name="radioGroup">
                            <a-radio :value="1">No</a-radio>
                            <a-radio :value="2">Yes</a-radio>
                          </a-radio-group>
                        </p>
                      </li>
                      <li>
                        Have you ever traveled into another country the past 3 month's?
                        <br />
                        <p>
                          <a-radio-group name="radioGroup">
                            <a-radio :value="1">No</a-radio>
                            <a-radio :value="2">Yes</a-radio>
                          </a-radio-group>
                        </p>
                      </li>
                    </ol>
                  </a-card>
                </a-col>
              </a-row>
              <a-row class="ml-3 mb-3" gutter="8">
                <a-col :span="5" :xl="5" :xs="24">
                  <a-checkbox>Save your information detail</a-checkbox>
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
            <a-checkbox>{{term}}</a-checkbox>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" :xl="4" :xs="24">
            <a-button
              :xl="12"
              class="font-weight-bold mt-3"
              type="primary"
              block
              :size="size"
            >Check-In Now</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
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
      guest: false,
      keluar: false,
      currency: 'Rp.',
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
    masukinTerm(tulisan) {
      this.term = tulisan.target.value;
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
.ant-form {
  color: rgba(0, 0, 0, 0.85);
}
h3 {
  margin: 40px 0 0;
}
.ant-card-meta-detail {
  font-size: 1.375rem;
  font-weight: bold !important;
  text-transform: uppercase;
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
.ant-card-head-title {
  text-align: center;
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
