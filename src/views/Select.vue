<template>
  <div class="text-center">
    <h2>Products</h2>

    <a-select
      v-model="setRegion"
      default-value="DKI Jakarta"
      show-search
      style="width: 200px;"
      @change="handleChangeProvince"
    >
      <a-select-option
        v-for="(item, keys) in filteredRegion"
        :key="keys"
        :value="filteredRegion[keys]['province']"
        >{{ filteredRegion[keys].province }}</a-select-option
      >
    </a-select>

    <a-select show-search style="width: 200px;">
      <a-select-option
        v-for="(item, key) in filteredCities"
        :key="key"
        :value="filteredCities[key].city_name"
        >{{ filteredCities[key].city_name }}</a-select-option
      >
    </a-select>
    <!-- <a-select :options="filteredCity"></a-select> -->
  </div>
</template>

<script>
import data from "../components/json/indonesia";
import { Select } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

export default {
  data() {
    return {
      setRegion: "Bali",
      Region: data.Indonesia.Region,
      City: data.Indonesia.City,
      cek: "",
      cities: "",
      // filteredCity: [],
      filteredRegion: [],
    };
  },
  mounted() {
    this.filteredRegion = this.Region;
  },
  computed: {
    filteredCities() {
      const filteredCity = [];
      const set = this.setRegion;

      for (let i = 0; i < this.City.length; i++) {
        const regionID = set;
        const dataRow = this.City[i];
        const regionIDinCity = dataRow["province"];

        if (regionID === regionIDinCity) {
          filteredCity.push(dataRow);
        }
      }
      return filteredCity;
    },
  },
  methods: {
    // handleChangeProvince(isi) {
    //   console.log(isi, "isi");

    //   this.filteredCity = [];
    //   for (let i = 0; i < this.City.length; i++) {
    //     const regionID = isi;
    //     const dataRow = this.City[i];
    //     const regionIDinCity = dataRow["province"];

    //     if (regionID === regionIDinCity) {
    //       this.filteredCity.push(dataRow);
    //     }
    //   }

    //   console.log("filteredCity : ", this.filteredCity);
    // },
    // handleChangeCity(value) {
    //   console.log("City : ", value);
    // },
    handleBlur() {
      // console.log("blur");
    },
    handleFocus() {
      // console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>

<style scoped lang="scss" src="../css/style.scss" />
