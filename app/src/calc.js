
export function calc() {
    let a, b, c, totalCosts = 100;

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
    console.log('roofAngle: ', roofAngle);

    //dev
    console.log("roofArea:", roofArea);
    console.log("roofType:", roofType);
    console.log("roofAngle:", roofAngle);

    const roofTypeModValue = roofTypeMod[roofType] || 0;
    const roofAngleModValue = roofAngleMod[roofAngle] || 0;
    console.log('roofAngleModValu: ', roofAngleModValue);

    const numberOfModules = Math.floor(roofArea / moduleSize);
    console.log('roofArea:', roofArea)
    console.log('moduleSize:', moduleSize)

    const baseModuleCosts = moduleBaseCost * numberOfModules;//!?
    const baseAssemblyCosts = moduleAssemblyCost * numberOfModules;
    const modulesCosts =
        (baseModuleCosts + baseAssemblyCosts) *
        (1 + roofTypeModValue + roofAngleModValue);

        //$this->calcs['modules_costs'] ==== ( $this->calcs['base_module_costs'] + $this->calcs['base_assembly_costs'] ) * ( 1 + $this->calcs['roof_type_mod'] + $this->calcs['roof_angle_mod'] );

    const power = modulePower * numberOfModules;
    const baseMontageCosts = kwpMontageCost * power;
    const montageCosts =
        baseMontageCosts * (1 + roofTypeModValue + roofAngleModValue);

    let converterCosts;     
    switch (true) {
        case power >= 5:
            converterCosts = 1000;
            break;
        case power >= 8:
            converterCosts = 1300;
            break;
        case power >= 10:
            converterCosts = 1500;
            break;
        case power >= 15:
            converterCosts = 2200;
            break;
        case power >= 20:
            converterCosts = 2500;
            break;
        case power >= 30:
            converterCosts = 3000;
            break;
        default:
            // Default if any
            break;
    }
    console.log('converterCosts:', converterCosts)

    let batteryCosts;     
    switch (true) {
        case power >= 30:
            batteryCosts = 7000;
            break;
        case power >= 15:
            batteryCosts = 6000;
            break;
        case power >= 10:
            batteryCosts = 5000;
            break;
        default:
            // Default if any
            break;
    }
    
    console.log(batteryCosts);
        
    totalCosts = modulesCosts + montageCosts + converterCosts + batteryCosts;
    console.log('batteryCosts:', batteryCosts)
    console.log('converterCosts:', converterCosts)
    console.log('montageCosts:', montageCosts)

    const totalCostsMin = totalCosts - costsSpread;

    console.log('costsSpread:', costsSpread);
    console.log('totalCosts:', totalCosts);//!???

    const totalCostsMax = totalCosts + costsSpread;

    // Update Vue data properties
    this.form.min = totalCostsMin;
    this.form.max = totalCostsMax;

}
