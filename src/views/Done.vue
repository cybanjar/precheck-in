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
    return { labels: [] };
  },
  created() {
    this.labels = JSON.parse(localStorage.getItem("labels"));
  },
  methods: {
    getLabels(nameKey, used) {
      const label = this.labels.find(
        (element) => element["lang-variable"] == nameKey
      );

      let fixLabel = "";

      if (label["lang-value"] == "undefined") {
        fixLabel = "";
      } else {
        if (used === "titleCase") {
          fixLabel = this.setTitleCase(label["lang-value"]);
        } else if (used === "sentenceCase") {
          fixLabel =
            label["lang-value"].charAt(0).toUpperCase() +
            label["lang-value"].slice(1);
        } else {
          fixLabel = label["lang-value"];
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
