<template>
  <!-- <div class="q-pa-md doc-container"> -->
  <div
    style="
      display: flex;
      width: 100% !important;
      height: 100vh;
      overflow: hidden;
      text-align: center;
      align-items: center;
      justify-content: center;
    "
  >
    <q-spinner-ball color="red" size="8em" style="" />
    <!-- </div> -->
  </div>
</template>
<script>
import router from "../router";
import api from "../api/Endpoint";
import moment from "moment";
export default {
  data() {
    return {
      currDataPrepare: {},
      counter: 0,
      province: [],
      money: 10,
      showSmoking: false,
      showBed: false,
      showFloor: false,
      showPrice: false,
      showPickupRequest: false,
      guests: "",
      currency: "Rp.",
      purpose: "",
      term: "",
      gambar: "",
      backgroundColor: "$green",
      color: "$white",
      tempsetup: [],
      per: "",
      hour: "",
      FilterPurposeofStay: [],
      countries: [],
      hotelname: "",
      labels: [],
      flagKiosk: false,
      langID: "",
      hotelEndpoint: "",
      hotelParams: "",
      State: "",
      checkInTIme: "",
      tempHour: "",
      hotelLogo: "",
      setting: [],
      location: "",
      defaultCountry: "",
      serverTime: "",
      serverDate: "14/01/2019",
      systemDate: "14/01/2019",
      maxPCITime: "08:00:00",
    };
  },
  async created() {
    if (location.search.substring(1).length > 0) {
      this.location = `${window.location.protocol}//${window.location.host}`;
      sessionStorage.setItem("PCI", false);
      const tempParam = location.search.substring(1);
      const tempParams = {};
      let objValue = "";
      objValue = decodeURIComponent(tempParam);
      objValue = objValue.replace(" ", "+");
      Object.assign(tempParams, { hotelParams: objValue });
      this.location += `/precheckin?${tempParam}`;

      const parsed = await api.getParam("retrieveReservation", {
        encryptedText: tempParams.hotelParams,
      });

      // Handling null Response
      if (parsed.response.messResult == null) {
        router.push({
          name: "NotFound",
        });
      }
      sessionStorage.removeItem("labels");
      sessionStorage.setItem(
        "labels",
        JSON.stringify(parsed.response.languagesList["languages-list"])
      );
      this.labels = JSON.parse(sessionStorage.getItem("labels"));
      this.langID =
        parsed.response.languagesList["languages-list"]["0"]["lang-id"];
      const tempMessResult = parsed.response.messResult;
      this.guests = parsed.response.arrivalGuest["arrival-guest"].length;
      if (tempMessResult == "99 - Pre Checkin Not Allowed!") {
        router.push("notfound");
      } else if (tempMessResult == "2 - Guest Already Checkin.") {
        router.push("done");
      }
      this.tempsetup = parsed.response.pciSetup["pci-setup"];
      const tempbC = this.tempsetup.filter((item, index) => {
        return item.number1 === 4;
      });
      const bC = tempbC.filter((item, index) => {
        return item.setupflag === true;
      });
      this.backgroundColor = bC[0].setupvalue;
      const tempfC = this.tempsetup.filter((item, index) => {
        return item.number1 === 5;
      });
      const fC = tempfC.filter((item, index) => {
        return item.setupflag === true;
      });
      this.color = fC[0].setupvalue;
      const tempGambar = this.tempsetup.filter((item, index) => {
        return item.number1 === 7 && item.number2 === 1;
      });
      this.gambar = tempGambar[0].setupvalue;
      const tempTerm = this.tempsetup.filter((item, index) => {
        return item.number1 === 6 && item.setupflag === true;
      });
      this.term = tempTerm[0]["setupvalue"].trim();
      const temRequest = this.tempsetup.filter((item, index) => {
        return item.number1 === 2 && item.setupflag === true;
      });
      this.showPickupRequest = temRequest[0].setupflag;
      this.money = temRequest[0]["price"];
      this.currency = temRequest[0]["remarks"];
      const tempPer = temRequest[0]["setupvalue"].split("PER")[1];
      this.per = this.getLabels(tempPer.toLowerCase().trim(), `sentenceCase`);
      this.tempHour = this.tempsetup.filter((item, index) => {
        return item.number1 === 8 && item.number2 === 2;
      });
      this.hour = moment(this.tempHour[0]["setupvalue"], "HH:mm")._i;
      this.checkInTIme = moment(this.tempHour[0]["setupvalue"], "HH:mm")._i;
      const tempBed = this.tempsetup.filter((item, index) => {
        return item.number1 === 3 && item.number2 === 1;
      });
      this.showBed = tempBed[0].setupflag;
      const tempSmoking = this.tempsetup.filter((item, index) => {
        return item.number1 === 3 && item.number2 === 2;
      });
      this.showSmoking = tempSmoking[0].setupflag;
      const tempFloor = this.tempsetup.filter((item, index) => {
        return item.number1 === 3 && item.number2 === 3;
      });
      this.showFloor = tempFloor[0].setupflag;
      const tempHotel = this.tempsetup.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 1;
      });
      this.hotelname = tempHotel[0]["setupvalue"];
      const tempKios = this.tempsetup.filter((item, index) => {
        return item.number1 === 8 && item.number2 === 10;
      });
      this.flagKiosk = tempKios[0]["setupflag"];
      const tempLogo = this.tempsetup.filter((item, index) => {
        //  Logo Hotel
        return item.number1 === 7 && item.number2 === 6;
      });
      this.hotelLogo = tempLogo[0]["setupvalue"];
      const tempEndpoint = this.tempsetup.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 2;
      });
      this.hotelEndpoint = tempEndpoint[0]["setupvalue"];
      const tempHOTELENCRIPTIONPARAMS = this.tempsetup.filter((item, index) => {
        return item.number1 === 99 && item.number2 === 4;
      });
      this.hotelParams = tempHOTELENCRIPTIONPARAMS[0]["setupvalue"];

      /* Handling Server Time and System Date */
      const tempServerTime = this.tempsetup.filter((item, index) => {
        return item.number1 === 9 && item.number2 === 7;
      });
      const tempServerDate = this.tempsetup.filter((item, index) => {
        return item.number1 === 9 && item.number2 === 9;
      });
      this.serverDate = tempServerDate[0]["setupvalue"];
      this.serverTime = moment(
        `${this.serverDate} ${tempServerTime[0]["setupvalue"]}`,
        "DD/MM/YY HH:mm:ss"
      );
      const serverTimeValue = this.serverTime.valueOf();

      const tempSystemDate = this.tempsetup.filter((item, index) => {
        return item.number1 === 9 && item.number2 === 4;
      });
      this.systemDate = moment(
        `${tempSystemDate[0]["setupvalue"]} ${this.maxPCITime}`,
        "DD/MM/YYYY HH:mm:ss"
      );
      const systemTimeValue = this.systemDate.valueOf();

      const defCountry = this.tempsetup.filter((item, index) => {
        //  Default Country Code
        return item.number1 === 9 && item.number2 === 1;
      });
      this.defaultCountry = defCountry[0]["setupvalue"];
      if (this.defaultCountry.toLowerCase() == "idn") {
        this.defaultCountry = "INA";
      }

      const jatah = [];
      for (const i in this.tempsetup) {
        if (this.tempsetup[i]["number1"] == 1) {
          this.FilterPurposeofStay.push(this.tempsetup[i]);
          if (this.tempsetup[i].setupflag == true) {
            this.purpose = this.tempsetup[i].setupvalue;
          }
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 2
        ) {
          const tempCountry = {};
          tempCountry["descr"] = this.tempsetup[i]["descr"];
          tempCountry["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.countries.push(tempCountry);
        } else if (
          this.tempsetup[i]["number1"] == 9 &&
          this.tempsetup[i]["number2"] == 3 &&
          this.tempsetup[i].descr != "SERVER TIME"
        ) {
          const air = {};
          air["descr"] = this.tempsetup[i]["descr"];
          air["setupvalue"] = this.tempsetup[i]["setupvalue"];
          this.province.push(air);
        }
      }
      const obj = {};
      obj["gambar"] = this.gambar;
      obj["Background"] = this.backgroundColor;
      obj["Font"] = this.color;
      obj["money"] = this.money;
      obj["currency"] = this.currency;
      obj["per"] = this.per;
      obj["purpose"] = this.purpose;
      obj["FilterPurposeofStay"] = this.FilterPurposeofStay;
      obj["showBed"] = this.showBed;
      obj["showSmoking"] = this.showSmoking;
      obj["showFloor"] = this.showFloor;
      obj["hour"] = this.hour;
      obj["term"] = this.term;
      obj["hotelname"] = this.hotelname;
      obj["showPickupRequest"] = this.showPickupRequest;
      obj["countries"] = this.countries;
      obj["defaultCountry"] = this.defaultCountry;
      obj["province"] = this.province;
      obj["hotelEndpoint"] = this.hotelEndpoint;
      obj["hotelParams"] = this.hotelParams;
      obj["langID"] = this.langID;
      obj["checkInTIme"] = this.checkInTIme;
      obj["hotelLogo"] = this.hotelLogo;
      obj["flagKiosk"] = this.flagKiosk;
      obj["location"] = this.location;
      obj["serverTime"] = serverTimeValue;
      obj["systemTime"] = systemTimeValue;
      this.setting.push(obj);
      if (parsed.response.arrivalGuest["arrival-guest"].length > 1) {
        const dataGuest = parsed.response.arrivalGuest["arrival-guest"];
        sessionStorage.setItem("saveData", JSON.stringify(dataGuest));
        sessionStorage.setItem("saveSetting", JSON.stringify(this.setting[0]));
        router.push({
          name: "List",
          params: {
            Data: dataGuest,
            Param: this.setting[0],
          },
        });
      } else if (
        parsed.response.arrivalGuest["arrival-guest"]["0"]["gcomment-desc"] ==
        "GUEST ALREADY PCI"
      ) {
        const ciDate = moment(
          `${parsed.response.arrivalGuest["arrival-guest"]["0"]["arrive"]}`,
          "YYYY-MM-DD"
        );
        const dDate = ciDate.date();
        const dMonth = ciDate.month() + 1;
        const dYear = ciDate.year();

        this.systemDate = moment(
          `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
          "DD/MM/YYYY HH:mm:ss"
        );
        systemTimeValue = this.systemDate.valueOf();

        if (serverTimeValue > systemTimeValue) {
          /* Go To Could Not PCI Screen */
          router.push({
            name: "Info",
            params: {
              Param: this.setting[0],
            },
          });
        } else {
          /* If Single Guest Already PCI */
          this.currDataPrepare =
            parsed.response.arrivalGuest["arrival-guest"][0];
          const Data =
            "{" +
            this.currDataPrepare["rsv-number"] +
            ";" +
            moment(this.currDataPrepare.depart).format("MM/DD/YYYY") +
            "," +
            this.checkInTIme +
            "}";
          router.push({
            name: "Success",
            params: {
              Data: Data,
              Param: this.setting[0],
            },
          });
        }
      } else {
        /* If Single Guest PCI */
        const dataGuest = parsed.response.arrivalGuest["arrival-guest"];

        const ciDate = moment(`${dataGuest["0"]["arrive"]}`, "YYYY-MM-DD");
        const dDate = ciDate.date();
        const dMonth = ciDate.month() + 1;
        const dYear = ciDate.year();

        this.systemDate = moment(
          `${dDate}/${dMonth}/${dYear} ${this.maxPCITime}`,
          "DD/MM/YYYY HH:mm:ss"
        );
        systemTimeValue = this.systemDate.valueOf();

        /* Check Time */
        if (serverTimeValue > systemTimeValue) {
          /* Go To Could Not PCI Screen */
          router.push({
            name: "Info",
            params: {
              Param: this.setting[0],
            },
          });
        } else {
          dataGuest[0].rmshare = [];
          if (dataGuest[0]["room-sharer"] != "") {
            dataGuest[0].rmshare.push(dataGuest[0]["room-sharer"]);
          }
          if (dataGuest[0]["accompaying-guest"] != "") {
            dataGuest[0].rmshare.push(dataGuest[0]["accompaying-guest"]);
          }
          router.push({
            name: "Home",
            params: {
              Data: dataGuest,
              Param: this.setting[0],
            },
          });
        }
      }
    } else {
      router.push({
        name: "404",
      });
    }
  },
  computed: {
    getLabels() {
      let fixLabel = "";
      return (nameKey, used) => {
        const label = this.labels.find((el) => {
          return el["lang-variable"].trim() == nameKey.trim();
        });
        if (label === undefined) {
          fixLabel = "";
        } else {
          if (used === "titleCase") {
            fixLabel = label["lang-value"].replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
          } else if (used === "sentenceCase") {
            fixLabel =
              label["lang-value"].charAt(0).toUpperCase() +
              label["lang-value"].slice(1);
          } else if (used === "upperCase") {
            fixLabel = label["lang-value"].toUpperCase();
          } else {
            fixLabel = label["lang-value"];
          }
        }
        return fixLabel;
      };
    },
  },
};
</script>
