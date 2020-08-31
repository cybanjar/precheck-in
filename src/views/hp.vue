<template>
  <vue-tel-input :v-model="value" @input="acceptNumber"></vue-tel-input>
</template>
<script>
import { VueTelInput } from "vue-tel-input";

export default {
  components: {
    VueTelInput,
  },
  data() {
    return { value: "" };
  },
  methods: {
    acceptNumber() {
      const x = this.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },
  },
};
</script> 
