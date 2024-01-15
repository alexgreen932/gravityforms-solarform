class solarCalc {

	#data; 
	#calcs;

	constructor(data) {
		this.prepareData(data);
		this.doCalculation();
	}


	prepareData(data) {
		const DATA_TEMPLATE = ['roofType', 'roofAngle', 'roofArea'];
		const defaults = {};
		DATA_TEMPLATE.forEach((key) => {
			defaults[key] = null;
		});
		const input = Object.assign({}, defaults, data);
		console.log(input, defaults, data);

		if (Object.values(input).includes(null)) {
			console.error('Missing required data. Must have following keys: ' + DATA_TEMPLATE.join(', '));
			this.#data = null;
			return;
		}

		this.#data = input;
	}

	doCalculation() {
		this.#calcs = {};
		if ( ! this.#data ) {
			return;
		}

		const { roofType, roofAngle, roofArea } = this.#data;

		this.#calcs.roofTypeMod = this.roofTypeTable[roofType];
		this.#calcs.roofAngleMod = this.selectInRange(roofAngle, this.roofAngleTable);

		this.#calcs.numberOfModules = Math.floor(roofArea / this.moduleSize);
		this.#calcs.baseModuleCosts = this.moduleBaseCost * this.#calcs.numberOfModules;

		this.#calcs.baseAssemblyCosts = this.moduleAssemblyCost * this.#calcs.numberOfModules;
		this.#calcs.modulesCosts = (this.#calcs.baseModuleCosts + this.#calcs.baseAssemblyCosts) * (1 + this.#calcs.roofTypeMod + this.#calcs.roofAngleMod);


		this.#calcs.power = this.modulePower * this.#calcs.numberOfModules;
		this.#calcs.baseMontageCosts = this.kwpMontageCost * this.#calcs.power;
		this.#calcs.montageCosts = this.#calcs.baseMontageCosts * (1 + this.#calcs.roofTypeMod + this.#calcs.roofAngleMod);


		this.#calcs.converterCosts = this.selectInRange(this.#calcs.power, this.powerConverterCostsTable);
		this.#calcs.batteryCosts = this.selectInRange(this.#calcs.power, this.batteryCostsTable);

		this.#calcs.totalCosts = this.#calcs.modulesCosts + this.#calcs.montageCosts + this.#calcs.converterCosts + this.#calcs.batteryCosts;
		this.#calcs.totalCostsMin = this.#calcs.totalCosts - this.costsSpread;
		this.#calcs.totalCostsMax = this.#calcs.totalCosts + this.costsSpread;

	}


	/**
	 * Helper functions
	 * -----------------------------
	 */

	getCalcs() {
		return this.#calcs;
	}

	getData() {
		return this.#data;
	}

	get(key, format = null) {
		if (format === '%') {
			return `${this.#calcs[key] * 100}%`;
		}

		if (format === 'num') {
			return this.#calcs[key].toFixed(2);
		}

		return this.#calcs[key];
	}

	selectInRange(value, data) {
		const rightSide = Object.keys(data)
			.filter((val) => val >= value)
			.reduce((obj, key) => {
				obj[key] = data[key];
				return obj;
			}, {});
		const key = Object.keys(rightSide)[0];
		return data[key];
	}

	/**
	 * Constants Section.
	 * ----------------------------
	 */
	get moduleSize() {
		return 2.35; // m2
	}
	
	get modulePower() {
		return 0.44; // kWp
	}

	get moduleBaseCost() {
		return 120; // EUR
	}

	get moduleAssemblyCost() {
		return 80; // EUR
	}

	get kwpMontageCost() {
		return 300; // EUR per kWp
	}

	get roofTypeTable() {
		return {
			sattelDach : 0,
			zeltDach : 0.1,
			flachDach : -0.05,
			pultDach : 0.15,
			walmDach : 0.20,
			anderesDach : 0.5
		}
	}

	get roofAngleTable() {
		return {
			20: 0,
			40: 0.1,
			999: 0.3,
		}
	}

	get powerConverterCostsTable() {
		return {
			5: 1000,
			8: 1300,
			10: 1500,
			15: 2200,
			20: 2500,
			999: 3000,
		}
	}

	get batteryCostsTable() {
		return {
			10: 5000,
			15: 6000,
			30: 7000,
		}
	}

	get costsSpread() {
		return 3000;
	}
}

x = new solarCalc({
roofType: 'pultDach',
roofAngle: 20,
roofArea: 20
});

