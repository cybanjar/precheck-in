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

       <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="Tab Willy">
            <a-form layout="vertical" :form="form">
              <a-row class="ml-3" gutter="16">
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

                <a-col :span="9" :xl="9" :xs="24">
                  <a-form-item label="Sharing Room">
                    <a-input defaultValue="Josep" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tab 2">Content Tab 2</a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">Content Tab 3</a-tab-pane>
          <a-tab-pane key="4" tab="Tab 4">Content Tab 4</a-tab-pane>
          <a-tab-pane key="5" tab="Tab 5">Content Tab 5</a-tab-pane>
        </a-tabs>