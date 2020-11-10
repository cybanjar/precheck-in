<template>
  <div class="q-pa-md doc-container">
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
    </div>
  </div>
</template>
<script>
import router from "../router";
import ky from "ky";
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
    };
  },
  created() {
    if (location.search.substring(1) != "") {
      this.location = `${window.location.protocol}//${window.location.host}`;
      (async () => {
        sessionStorage.setItem("PCI", false);
        const tempParam = location.search.substring(1);
        const tempParams = {};
        let objValue = "";
        objValue = decodeURIComponent(tempParam);
        objValue = objValue.replace(" ", "+");
        Object.assign(tempParams, { hotelParams: objValue });
        this.location += `/precheckin?${tempParam}`;
        // console.log(this.location);
        const parsed = await ky
          .post(
            "http://login.e1-vhp.com:8080/logserver/rest/loginServer/retrieveReservation",
            {
              json: {
                request: {
                  encryptedText: tempParams.hotelParams,
                },
              },
            }
          )
          .json();
        // console.log(parsed);
        // Handling null Response
        if (parsed.response.messResult == null) {
          router.push({
            name: "NotFound",
          });
        }
        localStorage.removeItem("labels");
        localStorage.setItem(
          "labels",
          JSON.stringify(parsed.response.languagesList["languages-list"])
        );
        this.labels = JSON.parse(localStorage.getItem("labels"));
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
        this.term = tempTerm[0]["setupvalue"];
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
        const tempHOTELENCRIPTIONPARAMS = this.tempsetup.filter(
          (item, index) => {
            return item.number1 === 99 && item.number2 === 4;
          }
        );
        this.hotelParams = tempHOTELENCRIPTIONPARAMS[0]["setupvalue"];
        const defCountry = this.tempsetup.filter((item, index) => {
          //  Default Country Code
          return item.number1 === 9 && item.number2 === 1;
        });
        this.defaultCountry = defCountry[0]["setupvalue"];
        if (this.defaultCountry.toLowerCase() == "idn") {
          this.defaultCountry = "INA";
        }
        // console.log(this.hotelParams);
        const jatah = [];
        for (const i in this.tempsetup) {
          if (this.tempsetup[i]["number1"] == 1) {
            this.tempsetup[i].setupvalue = this.tempsetup[i].setupvalue;
            this.FilterPurposeofStay.push(this.tempsetup[i]);
            if (this.tempsetup[i].setupflag == true) {
              this.purpose = this.tempsetup[i].setupvalue;
            }
          } else if (
            this.tempsetup[i]["number1"] == 9 &&
            this.tempsetup[i]["number2"] == 2
          ) {
            const bulbasur = {};
            bulbasur["descr"] = this.tempsetup[i]["descr"];
            bulbasur["setupvalue"] = this.tempsetup[i]["setupvalue"];
            this.countries.push(bulbasur);
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
        this.setting.push(obj);
        if (parsed.response.arrivalGuest["arrival-guest"].length > 1) {
          // console.log("lebih dari 1");
          const dataGuest = parsed.response.arrivalGuest["arrival-guest"];
          sessionStorage.setItem("saveData", JSON.stringify(dataGuest));
          sessionStorage.setItem(
            "saveSetting",
            JSON.stringify(this.setting[0])
          );
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
          // console.log("sudah pci");
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
        } else {
          // console.log("akan pci");
          const dataGuest = parsed.response.arrivalGuest["arrival-guest"];
          router.push({
            name: "Home",
            params: {
              Data: dataGuest,
              Param: this.setting[0],
            },
          });
        }
      })();
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
          return el["lang-variable"] == nameKey;
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
