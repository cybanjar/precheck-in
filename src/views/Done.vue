<template>
  <a-result :title="getLabels('already_ci', `titleCase`)">
    <template #icon>
      <a-icon type="smile" theme="twoTone" />
    </template>
    <!-- <template #extra>
      <a-button type="primary">
        Back
      </a-button>
    </template> -->
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["program-variable"] == nameKey
      );

      let fixLabel = "";

      if (label["program-label1"] == "undefined") {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["program-label1"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["program-label1"].charAt(0).toUpperCase() +
            label["program-label1"].slice(1);
        } else {
          fixLabel = label["program-label1"];
        }
      }

      return fixLabel;
    },
    setTitleCase(label) {
      return label.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
  },
};
</script>
