
import preview from "./preview.js";
import gmap from "./gmap.js";
const template = `
<div v-if="screen!==42">
<transition name="custom-classes-transition" enter-active-class="fade-in" leave-active-class="fade-out">
    <div v-if="screen!==0" class="j-reset" @click.prevent="screen=0">{{lang.reset}}</div>
</transition>
    <div class="j-grid">
        <div class="j-map">
            <template v-if="screen==0 && screens">
                <h3>{{screens[0].title}}</h3>
                <p>{{screens[0].des}}</p>
                <select v-model="lang_current" @change="langCurrent()">
                    <option value="0">Deutsch</option>
                    <option value="1">English</option>
                </select>
            </template>

            <g-map :scr="screen" :lang="lang" @newel="screen=$event"></g-map>
        </div>

        <template v-if="screen!==0">
            <div class="j-data">
                <j-preview v-if="screen!==0" :els="screens" :ind="screen" :lang="lang"
                    @newel="screen=$event"></j-preview>
                <div class="data-sell" v-for="(el, index) in screens" :key="el">
                    <transition name="custom-classes-transition" enter-active-class="fade-in-bottom">
                        <div v-if="screen==index">
                            <h3>{{el.title}} <span class="step">{{index}}/7</span></h3>
                            <p>{{el.des}}</p>
                            <template v-if="index==1">
                                <input type="text" v-model="el.value" :placeholder="el.name" />
                            </template>
                            <template v-if="index==2">
                                <select v-model="el.value">
                                    <option v-for="op in roof_types">{{op}}</option>
                                </select>
                                <template v-if="el.value=='Gable'">
                                    <label><input type="checkbox" v-model="form.sides_2">Use 2 sides of the
                                        roof</label>
                                </template>
                            </template>
                            <template v-if="index==3">
                                <select v-model="el.value">
                                    <option v-for="op in angle">{{op}}</option>
                                </select>
                                <div class="inline">
                                    <label>{{el.title2}}</label>
                                    <input type="number" v-model="el.value">
                                </div>
                            </template>
                            <template v-if="index==4">
                                <select v-model="el.value">
                                    <option v-for="op in angle">{{op}}</option>
                                </select>
                                Здесь не совсем понятно и надо подумать как сделать
                            </template>
                            <template v-if="index==5">
                                <select v-model="el.value">
                                    <option v-for="op in hot_water">{{op}}</option>
                                </select>
                            </template>
                            <template v-if="index==6">

                                <select v-model="el.value">
                                    <option v-for="op in heating">{{op}}</option>
                                </select>

                            </template>
                            <template v-if="index==7">
                                <div class="inline">
                                    <label>{{el.title2}}</label>
                                    <input type="text" v-model="form.count">
                                </div>

                                {{el.title3}}
                                <select v-model="el.value">
                                    <option v-for="op in price">{{op}}</option>
                                </select>
                                <button class="j-but" :disabled="!el.value" @click.prevent="screen=42">
                                    <i class="fas fa-chart-line"></i></i>
                                    {{el.title5}}
                                    <i class="fas fa-angle-double-right"></i>
                                </button>

                            </template>
                            <button v-if="index!==7" class="j-but" :disabled="!el.value"
                                @click.prevent="screen=index+1">{{lang.further}}</button>
                        </div>
                    </transition>
                </div>

            </div>
        </template>
        <!-- nest_comment_start~<g-result :el="screens" :res="result" @newel="result=$event"></g-result>~nest_comment_end -->
    </div>
</div>
`;
export default {
    components: {
        "j-preview": preview,
        "g-map": gmap,
    },
    template,
    props: ['el', 'res'],
    emits: ['nv'],
    data: function () {
        return {
            screen: 7,
            result: false,
            done: [],
            finish: false,
            form: {
                address: null,
                size: null,
                type: null,
                sides_2: false,
                angle: null,
                orientation: null,
                hot_water: null,
                heating: null,
                count: null,
                price: null,
            },
            roof_types: [
                "One-slope",
                "Gable",
                "Four slopes",
                "Flat",
                "Option 1",
                "Option 2"
            ],
            angle: [0, 30, 45],
            hot_water: [
                "Electric boiler",
                "Boiler with heat pump",
                "Oil, gas, wood, district heating",
            ],
            heating: [
                "Electric heating",
                "Heat pump",
                "Oil, gas, wood, district heating",
            ],
            price: [5.9, 6.0, 6.1, 6.2],

            screens: [
                {
                    "title": "Is a photovoltaic system worth it?",
                    "des": "With just a few details, simulate the production, profitability and costs of a photovoltaic system with or without battery storage.",
                    "value": ""
                },
                {
                    "title": "Roof surface ",
                    "des": "Please highlight the entire roof surface of your house.",
                    "value": "80",
                    "title2": "New building or manual input?",
                    "value2": false
                },
                {
                    "title": "House type",
                    "des": "Please select your house type.",
                    "value": "Gable",
                    "title2": "Use 2 sides of the roof",
                    "value2": "",
                    "title3": "",
                    "value3": "",
                    "title4": "",
                    "value4": ""
                },
                {
                    "title": "Roof inclination",
                    "des": "Select or manually enter your roof inclination.",
                    "value": "30",
                    "title2": "Manual input"
                },
                {
                    "title": "Orientation",
                    "des": "Please align your house exactly as shown on the map.",
                    "value": "45"
                },
                {
                    "title": "Hot water",
                    "des": "How do you heat your service water?",
                    "value": "Electric boiler"
                },
                {
                    "title": "Heating",
                    "des": "How do you heat your building",
                    "value": "Electric heating"
                },
                {
                    "title": "Annual consumption",
                    "des": "How high is your annual electricity consumption?",
                    "value": 6,
                    "title2": "Total:",
                    "title3": "How much is your electricity price?",
                    "title4": "Electricity price:",
                    "title5": "Calculate solar system"
                }

            ],
            screens_en: [
                {
                    "title": "Is a photovoltaic system worth it?",
                    "des": "With just a few details, simulate the production, profitability and costs of a photovoltaic system with or without battery storage.",
                    "value": ""
                },
                {
                    "title": "Roof surface ",
                    "des": "Please highlight the entire roof surface of your house.",
                    "value": "80",
                    "title2": "New building or manual input?",
                    "value2": false
                },
                {
                    "title": "House type",
                    "des": "Please select your house type.",
                    "value": "Gable",
                    "title2": "Use 2 sides of the roof",
                    "value2": "",
                    "title3": "",
                    "value3": "",
                    "title4": "",
                    "value4": ""
                },
                {
                    "title": "Roof inclination",
                    "des": "Select or manually enter your roof inclination.",
                    "value": "30",
                    "title2": "Manual input"
                },
                {
                    "title": "Orientation",
                    "des": "Please align your house exactly as shown on the map.",
                    "value": "45"
                },
                {
                    "title": "Hot water",
                    "des": "How do you heat your service water?",
                    "value": "Electric boiler"
                },
                {
                    "title": "Heating",
                    "des": "How do you heat your building",
                    "value": "Electric heating"
                },
                {
                    "title": "Annual consumption",
                    "des": "How high is your annual electricity consumption?",
                    "value": 6,
                    "title2": "Total:",
                    "title3": "How much is your electricity price?",
                    "title4": "Electricity price:",
                    "title5": "Calculate solar system"
                }

            ],
            screens_de: [
                {
                    title: "Lohnt sich eine Photovoltaikanlage?",
                    des: "Simulieren Sie mit wenigen Angaben die Produktion, Wirtschaftlichkeit und Kosten einer Photovoltaikanlage mit oder ohne Batteriespeicher.",
                    value: "",
                },
                {
                    title: "Dachfläche",
                    des: "Markieren Sie die gesamte Dachfläche Ihres Hauses.",
                    value: null,
                    title2: "Neubau oder manuelle Eingabe?",
                    value2: false,
                },
                {
                    title: "Haustyp",
                    des: "Wählen Sie Ihren Haustyp.",
                    value: null,
                    title2: "2 Dachseiten belegen",
                    value2: "",
                    title3: "",
                    value3: "",
                    title4: "",
                    value4: "",
                },
                {
                    title: "Dachneigung",
                    des: "Wählen Sie Ihre Dachneigung oder geben Sie diese manuell ein.",
                    value: null,
                    title2: "Manuelle Eingabe",
                },
                {
                    title: "Ausrichtung",
                    des: "Richten Sie Ihr Haus gleich aus wie auf dem Satellitenbild.",
                    title: "Ausrichtung",
                    value: null,
                },
                {
                    title: "Warmwasser",
                    des: "Wie erwärmen Sie Ihr Warmwasser?",
                    value: null,
                },
                {
                    title: "Heizung",
                    des: "Wie heizen Sie Ihr Gebäude?",
                    value: null,
                },
                {
                    title: "Jahresverbrauch",
                    des: "Wie hoch ist Ihr Jahresstromverbrauch?",
                    value: null,
                    title2: "Total:",
                    title3: "Wie hoch ist Ihr Strompreis?",
                    title4: "Strompreis:",
                    title5: "Solaranlage berechnen:",
                }
            ],
            lang_current: 1,
            lang: {
                show: 'Show',
                further: 'ZWeiter',
                reset: 'Reset',
                change: 'Change',
            },
            lang_en: {
                show: 'Show',
                further: 'Further',
                reset: 'Reset',
                change: 'Change',
            },
            lang_de: {
                show: 'Zeigen',
                further: 'Zurücksetzen',
                reset: 'Zurücksetzen',
                change: 'Ändern',
            },
        }
    },
    methods: {
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
    },
    mounted() {
        // this.getRes();
        // this.sendRes();
    },
}