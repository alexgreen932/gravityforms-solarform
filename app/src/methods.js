import { solarCalc } from './class-solar.js'
import { calc } from './calc.js'

export default {

  setDefault() {
    this.screens[4].value = 'Süd';
  },
  calcSide() {
    var d = this.compass_degree;
    switch (true) {
      case d > 0 && d < 30:
      case d > 330 && d < 360:
        this.screens[4].value = 'Süd';
        this.s = 1;
        break;
      case d > 300 && d < 330:
        this.screens[4].value = 'Süd-Ost';
        this.s = 8;
        break;
      case d > 240 && d < 300:
        this.screens[4].value = 'Ost';
        this.s = 7;
        break;
      case d > 210 && d < 240:
        this.screens[4].value = 'Nord-Ost';
        this.s = 6;
        break;

      case d > 150 && d < 210:
        this.screens[4].value = 'Nord';
        this.s = 5;
        break;
      case d > 120 && d < 150:
        this.screens[4].value = 'Nord-West';
        this.s = 4;
        break;
      case d > 60 && d < 120:
        this.screens[4].value = 'West';
        this.s = 3;
        break;
      case d > 30 && d < 60:
        this.screens[4].value = 'Süd-West';
        this.s = 2;
        break;

      default:
        this.side = null;
        break;
    }
  },

  drag(event) {
    console.log('dragging')
    // document.addEventListener("DOMContentLoaded", function () {
    // Your script here
    var knobPositionX;
    var knobPositionY;
    var mouseX;
    var mouseY;
    var knobCenterX;
    var knobCenterY;
    var adjacentSide;
    var oppositeSide;
    var currentRadiansAngle;
    var getRadiansInDegrees;
    var finalAngleInDegrees;
    var compassDedree;
    var volumeKnob = document.getElementById("knob");
    var boundingRectangle = volumeKnob.getBoundingClientRect(); //get rectangular geometric data of knob (x, y, width, height)
    if (this.isDragging) {
      knobPositionX = boundingRectangle.left; //get knob's global x position
      knobPositionY = boundingRectangle.top; //get knob's global y position

      if (this.detectMobile() == "desktop") {
        mouseX = event.pageX; //get mouse's x global position
        mouseY = event.pageY; //get mouse's y global position
      } else {
        mouseX = event.touches[0].pageX; //get finger's x global position
        mouseY = event.touches[0].pageY; //get finger's y global position
      }

      knobCenterX = boundingRectangle.width / 2 + knobPositionX; //get global horizontal center position of knob relative to mouse position
      knobCenterY = boundingRectangle.height / 2 + knobPositionY; //get global vertical center position of knob relative to mouse position

      adjacentSide = knobCenterX - mouseX; //compute adjacent value of imaginary right angle triangle
      oppositeSide = knobCenterY - mouseY; //compute opposite value of imaginary right angle triangle

      //arc-tangent function returns circular angle in radians
      //use atan2() instead of atan() because atan() returns only 180 degree max (PI radians) but atan2() returns four quadrant's 360 degree max (2PI radians)
      currentRadiansAngle = Math.atan2(adjacentSide, oppositeSide);

      getRadiansInDegrees = currentRadiansAngle * 180 / Math.PI; //convert radians into degrees

      finalAngleInDegrees = -(getRadiansInDegrees - 180); //knob is already starting at -135 degrees due to visual design so 135 degrees needs to be subtracted to compensate for the angle offset, negative value represents clockwise direction

      //only allow rotate if greater than zero degrees or lesser than 270 degrees
      if (finalAngleInDegrees >= 0 && finalAngleInDegrees <= 360) {
        volumeKnob.style.transform = "rotate(" + finalAngleInDegrees + "deg)"; //use dynamic CSS transform to rotate volume knob

        //270 degrees maximum freedom of rotation / 100% volume = 1% of volume difference per 2.7 degrees of rotation
        compassDedree = Math.floor(finalAngleInDegrees / (360 / 360));

        // Set the value of the input field -----------------
        let vueInput = document.getElementById("azimut");
        vueInput.value = compassDedree;

        // Trigger a simulated input event
        let inputEvent = new InputEvent('input', { bubbles: true });
        vueInput.dispatchEvent(inputEvent);
      }


    }
  },

  detectMobile() {
    var result = (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i));
    if (result !== null) {
      return "mobile";
    } else {
      return "desktop";
    }
  },
  //TODO //rm
  updateDirection(direction) {
    this.dir = direction;
    var side = null
    var d = this.dir;
    switch (true) {//rm //TODO
      case d > -30 && d < 30:
        side = 'Süd';
        break;
      case d > 30 && d < 60:
        side = 'Süd-West';
        break;
      case d > 60 && d < 120:
        side = 'West';
        break;
      case d > 120 && d < 150:
        side = 'Nord-West';
        break;
      case d > 150 && d < -150:
        side = 'Nord';
        break;
      case d > -150 && d < -120:
        side = 'Nord-Ost';
        break;
      case d > -120 && d < -60:
        side = 'Ost';
        break;
      case d > -60 && d < -30:
        side = 'Süd-Ost';
        break;
      default:
        side = null;
        break;

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
