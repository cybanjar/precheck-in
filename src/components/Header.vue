<template>
  <div class="info-title pt-2 row">
    <div class="col-xs-4"></div>
    <div class="col-xs-4">
      <img :src="hotelLogo" alt="Hotel Logo" width="100" />
    </div>
    <div class="col-xs-4"></div>
    <div class="mci-hotel col-xs-12">
      {{ hotelName }}
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, props } from "@vue/composition-api";
export default {
  props: ["hotelInfo"],
  setup(props) {
    const hotelInfo = props.hotelInfo;

    return {
      ...toRefs(hotelInfo),
    };
  },
};
</script>
