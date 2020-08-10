<template>
    <div>
        <input type="file" name="image" accept="image/*">
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
    </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
    };
  },
  watch: {
    activeKey(key) {
      key
    }
  },
  created() {
    console.log('BLAH');
  },
  methods: {
    scrollToTop() {
        window.scrollTo(0,0);
    },
  }
};
</script>
