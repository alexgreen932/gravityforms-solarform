import { solarCalc } from './class-solar.js'
import { calc } from './calc.js'

export default {
  updateDirection(direction) {
    this.dir = direction;
    var side = null
    //get compass side
    if (this.dir > -30 && this.dir < 30) {
      side = 'Süd';
    }
    if (this.dir > 30 && this.dir < 60) {
      side = 'Süd-West';
    }
    if (this.dir > 60 && this.dir < 120) {
      side = 'West';
    }
    if (this.dir > 120 && this.dir < 150) {
      side = 'Nord-West';
    }
    if (this.dir > 150 && this.dir < -150) {
      side = 'Nord';
    }
    if (this.dir > -150 && this.dir < -120) {
      side = 'Nord-Ost';
    }
    if (this.dir > -120 && this.dir < -60) {
      side = 'Ost';
    }
    if (this.dir > -60 && this.dir < -30) {
      side = 'Süd-Ost';
    }
    //add side value based on rotate
    this.screens[4].value = side;
  },
  formatArea(el) {
    const cursorPosition = this.area.selectionStart;
    let value = String(this.area).replace(/[^0-9]/g, '');

    // Add a comma for every three digits from the right
    // value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Add 'm²' to the end
    value = value + ',00 m²';

    // Update the data property
    setTimeout(() => {
      this.area = value;
      this.cleanData()
    }, 1500);
    // this.area = value;
    // this.area.setSelectionRange(cursorPosition, cursorPosition);
  },
  cleanData() {
    var rt = this.area.replace(',00 m²', '');
    this.screens[1].value = rt;
  },
  updateCalculation() {
    let x = new solarCalc({
      // roofType: this.roofType,
      // roofAngle: this.roofAngle,
      // roofArea: this.roofArea,

      roofArea: this.screens[1].value,
      roofType: this.screens[2].value,
      roofAngle: this.screens[3].value,
    });

    x.doCalculation();
    this.form.min = x.totalCostsMin;
    this.form.max = x.totalCostsMax;
  },
  calc_approximate_cost(i) {
    let area = this.screens[1].value;
    if (i == 6) {
      this.form.count = area * 50;
    }
  },
  calc,
  // calc() {


  //   // Assuming the calculation logic directly within the Vue app
  //   const roofTypeMod = {
  //     Satteldach: 0,
  //     Zeltdach: 0.1,
  //     Flachdach: -0.05,
  //     Pultdach: 0.15,
  //     Walmdach: 0.2,
  //     "Anderes Dach": 0.5,
  //   };

  //   const roofAngleMod = {
  //     "0-20 Grad": 0,
  //     "20-40 Grad": 0.1,
  //     ">40 Grad": 0.3,
  //   };

  //   const moduleSize = 2.35;
  //   const moduleBaseCost = 120;
  //   const moduleAssemblyCost = 80;
  //   const modulePower = 0.44;
  //   const kwpMontageCost = 300;
  //   const costsSpread = 3000;

  //   //using array
  //   const roofArea = this.screens[1].value;
  //   const roofType = this.screens[2].value;
  //   const roofAngle = this.screens[3].value;

  //       //dev
  //       
  //       
  //       

  //   const roofTypeModValue = roofTypeMod[roofType] || 0;
  //   const roofAngleModValue = roofAngleMod[roofAngle] || 0;

  //   const numberOfModules = Math.floor(roofArea / moduleSize);

  //   const baseModuleCosts = moduleBaseCost * numberOfModules;
  //   const baseAssemblyCosts = moduleAssemblyCost * numberOfModules;
  //   const modulesCosts =
  //     (baseModuleCosts + baseAssemblyCosts) *
  //     (1 + roofTypeModValue + roofAngleModValue);

  //   const power = modulePower * numberOfModules;
  //   const baseMontageCosts = kwpMontageCost * power;
  //   const montageCosts =
  //     baseMontageCosts * (1 + roofTypeModValue + roofAngleModValue);

  //   const converterCosts = this.selectInRange(power, {
  //     5: 1000,
  //     8: 1300,
  //     10: 1500,
  //     15: 2200,
  //     20: 2500,
  //     30: 3000,
  //   });

  //   const batteryCosts = this.selectInRange(power, {
  //     10: 5000,
  //     15: 6000,
  //     30: 7000,
  //   });

  //   const totalCosts = modulesCosts + montageCosts + converterCosts + batteryCosts;

  //   //old calc
  //   const totalCostsMin = totalCosts - costsSpread;
  //   
  //   
  //   const totalCostsMax = totalCosts + costsSpread;

  //   //new calc
  //   // const totalCostsMin = totalCosts - costsSpread;
  //   // const totalCostsMax = totalCosts + costsSpread;

  //   // Update Vue data properties
  //   this.form.min = totalCostsMin;
  //   this.form.max = totalCostsMax;

  //   this.show_result = true;
  // },





  selectInRange(value, data) {
    const rightSide = Object.keys(data)
      .filter((val) => val >= value)
      .sort((a, b) => a - b);

    return rightSide[0];
  },

  //check and remove not used
  langCurrent() {
    if (this.lang_current == 1) {
      this.screens = this.screens_en;
      this.lang = this.lang_en;
    } else {
      this.screens = this.screens_de;
      this.lang = this.lang_de;
    }
  },
  showScr(i) {
    if (this.screen == i) {
      return true;
    }
  },
  finishForm() { },//rm


  textareaData() {//old
    const array = this.screens;
    const obj = Object.fromEntries(
      array.map((item) => [item.title, item.value])
    );

    return JSON.stringify(obj);
  },

  //with new entries
  finalData() {
    var arr = this.screens;
    var obj = {
      Addresse: this.form.address,
      Dachfläche: arr[1].value,
      Haustyp: arr[2].value,
      Dachneigung: arr[3].value,
      Ausrichtung: arr[4].value,
      Warmwasser: arr[5].value,
      Heizung: arr[6].value,
      Jahresverbrauch: arr[7].value,
      Min: this.form.min,
      Max: this.form.max,
      Vorname: this.form.name,
      Name: this.form.last_name,
      Telefon: this.form.tel,
      Mail: this.form.email,
      Total: this.form.count_total,
      Ort: this.form.town,
      Straße: this.form.street,
      Hausnummer: this.form.house,
      PLZ: this.form.post_code,
      Nachricht: this.form.message,
      // : this.form.,
    }
    return JSON.stringify(obj);
  },





  output() {//rm
    //dev
    return JSON.stringify(this.final_obj);
  },
  outDev() {//rm
    //dev
    return JSON.stringify(this.screens);
  },
  outData() {
    return JSON.stringify(this.final_obj);
  },
  writeData() {
    this.finishForm();
  },
};
