<template>
  <div class="info-body" :style="styleBody">
    <web-title :hotel-info="hotelInfo"></web-title>
    <div class="info-data self-checkin">
      <div>
        <img
          src="../assets/FrontDesk.svg"
          alt="gambarFO"
          style="height: 200px"
        />
      </div>
      <div class="info-message">
        <p class="info-msg-font">{{ msgMciRecommend }}</p>
      </div>
      <q-btn color="primary" :label="ciNow" @click="goToMCI" />
    </div>
  </div>
</template>
<script>
import WebTitle from "../components/Header";
import { reactive, toRefs } from "@vue/composition-api";

export default {
  components: { WebTitle },
  setup(props, { root }) {
    /* Get Setup Param */
    let setup = root.$route.params.Param;
    if (!setup) {
      setup = JSON.parse(sessionStorage.getItem("saveSetting"));
    }

    /* Style Binding */
    const styleBody = reactive({
      background: setup.Background,
      color: setup.Font,
      height: "100vh",
    });
    const hotelInfo = reactive({
      hotelName: setup.hotelname,
      hotelLogo: setup.hotelLogo,
    });

    /* Reactive Variable */
    const location = `${window.location.protocol}//${window.location.host}/mobilecheckin?${setup.hotelParams}`;
    const weblabel = reactive({
      msgMciRecommend: "",
      ciNow: "",
    });

    /* Defining Function */
    function findLabel(nameKey, used) {
      const labels = JSON.parse(sessionStorage.getItem("labels"));

      let fixLabel = "";
      const locale = sessionStorage.getItem("locale");

      const label = labels.find((el) => {
        return el["lang-variable"].trim() == nameKey.trim();
      });

      if (label === undefined) {
        fixLabel = "";
      } else {
        switch (locale) {
          case "EN":
            fixLabel = label["lang-value"].trim();
            break;
          case "ID":
            fixLabel = label["lang-value"].trim();
            break;
          default:
            fixLabel = label["lang-value"].trim();
            break;
        }
        switch (used) {
          case "titleCase":
            fixLabel = fixLabel.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1);
            });
            break;
          case "sentenceCase":
            fixLabel = fixLabel.charAt(0).toUpperCase() + fixLabel.slice(1);
            break;
          case "upperCase":
            fixLabel = fixLabel.toUpperCase();
            break;
          default:
            fixLabel = fixLabel;
            break;
        }
      }

      return fixLabel;
    }

    function goToMCI() {
      window.open(location, "_self");
    }

    /* Assign Label */
    weblabel.msgMciRecommend = findLabel("msg_mci_recommend", "sentenceCase");
    weblabel.ciNow = findLabel("ci_now", "titleCase");

    return { styleBody, hotelInfo, ...toRefs(weblabel), goToMCI };
  },
};
</script>
