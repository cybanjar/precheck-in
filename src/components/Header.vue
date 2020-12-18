<template>
  <div class="info-title pt-2 row">
    <div class="col-xs-12">
      <img :src="hotelLogo" alt="Hotel Logo" width="100" />
    </div>
    <div class="mci-hotel col-xs-12 q-mb-lg q-mt-sm">
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
