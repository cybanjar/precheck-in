<template>
  <div>
    <a-row class="ml-3">
      <a-col :span="12">
        <a-form-item label="Background Color Mode">
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
            <a-icon slot="prefix" type="bg-colors" style="color: #1890ff" />
          </a-input>
        </a-form-item>
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
        <a-form-item layout="vertical" label="CheckIn Time">
          <a-time-picker
            v-decorator="[
              'time',
            {
                initialValue: moment('14:00', 'HH:mm'),
                rules: [{ required: true }],
              },
            ]"
            :minute-step="30"
            format="HH:mm"
          />
        </a-form-item>
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
        <a-form-item label="Pickup Type">
          <a-radio-group v-decoration="['radio-group']">
            <a-radio value="pax">
              <span class="font-weight-normal">Per Pax</span>
            </a-radio>
            <a-radio value="car">
              <span class="font-weight-normal">Per Car</span>
            </a-radio>
            <a-radio value="free">
              <span class="font-weight-normal">Free</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Pickup Rate">
          <a-input-number v-decorator="['input-number', { initialValue: 3 }]" :min="1" :max="10" />
        </a-form-item>
        <a-checkbox-group
          v-model="value"
          name="checkboxgroup"
          :options="plainOptions"
          @change="onChange"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from "moment";

const plainOptions = ['Lower Floor/ Higher Floor', 'Smooking/ Non Smoking', 'One Big Bed/ Two Single Bed'];

export default {
  data() {
    return {
      colorss: true,
      plainOptions,
    }
  },
  methods: {
    moment,
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(["nickname"], { force: true });
      });
    }
  }
}
</script>