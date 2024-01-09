
export function calc() {

    // Assuming the calculation logic directly within the Vue app
    const roofTypeMod = {
      Satteldach: 0,
      Zeltdach: 0.1,
      Flachdach: -0.05,
      Pultdach: 0.15,
      Walmdach: 0.2,
      "Anderes Dach": 0.5,
    };

    const roofAngleMod = {
      "0-20 Grad": 0,
      "20-40 Grad": 0.1,
      ">40 Grad": 0.3,
    };

    const moduleSize = 2.35;
    const moduleBaseCost = 120;
    const moduleAssemblyCost = 80;
    const modulePower = 0.44;
    const kwpMontageCost = 300;
    const costsSpread = 3000;

    //using array
    const roofArea = this.screens[1].value;
    const roofType = this.screens[2].value;
    const roofAngle = this.screens[3].value;

        //dev
        console.log("roofArea:", roofArea);
        console.log("roofType:", roofType);
        console.log("roofAngle:", roofAngle);

    const roofTypeModValue = roofTypeMod[roofType] || 0;
    const roofAngleModValue = roofAngleMod[roofAngle] || 0;

    const numberOfModules = Math.floor(roofArea / moduleSize);

    const baseModuleCosts = moduleBaseCost * numberOfModules;
    const baseAssemblyCosts = moduleAssemblyCost * numberOfModules;
    const modulesCosts =
      (baseModuleCosts + baseAssemblyCosts) *
      (1 + roofTypeModValue + roofAngleModValue);

    const power = modulePower * numberOfModules;
    const baseMontageCosts = kwpMontageCost * power;
    const montageCosts =
      baseMontageCosts * (1 + roofTypeModValue + roofAngleModValue);

    const converterCosts = this.selectInRange(power, {
      5: 1000,
      8: 1300,
      10: 1500,
      15: 2200,
      20: 2500,
      30: 3000,
    });

    const batteryCosts = this.selectInRange(power, {
      10: 5000,
      15: 6000,
      30: 7000,
    });

    const totalCosts = modulesCosts + montageCosts + converterCosts + batteryCosts;
    
    //old calc
    const totalCostsMin = totalCosts - costsSpread;
    console.log('costsSpread:', costsSpread)
    console.log('totalCosts:', totalCosts)
    const totalCostsMax = totalCosts + costsSpread;

    //new calc
    // const totalCostsMin = totalCosts - costsSpread;
    // const totalCostsMax = totalCosts + costsSpread;

    // Update Vue data properties
    this.form.min = totalCostsMin;
    this.form.max = totalCostsMax;

    this.show_result = true;
  }