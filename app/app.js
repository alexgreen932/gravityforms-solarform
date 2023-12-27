import methods from "./src/methods.js";
import preview from "./src/preview.js";
import gmap from "./src/gmap.js";
// import result from "./src/result.js";

let app = Vue.createApp({
    components: {
        "j-preview": preview,
        // "j-question": question,
        "g-map": gmap,
        // "g-result": result,
    },
    data() {
        return {
            screen: 0,
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
                    title: "Is a photovoltaic system worth it?",
                    des: "With just a few details, simulate the production, profitability and costs of a photovoltaic system with or without battery storage.",
                    value: "",
                },
                {
                    title: "Roof surface ",
                    des: "Please highlight the entire roof surface of your house.",
                    value: null,
                    title2: "New building or manual input?",
                    value2: false,
                },
                {
                    title: "House type",
                    des: "Please select your house type.",
                    value: null,
                    title2: "Use 2 sides of the roof",
                    value2: "",
                    title3: "",
                    value3: "",
                    title4: "",
                    value4: "",
                },
                {
                    title: "Roof inclination",
                    des: "Select or manually enter your roof inclination.",
                    value: null,
                    title2: "Manual input",
                },
                {
                    title: "Orientation",
                    des: "Please align your house exactly as shown on the map.",
                    value: null,
                },
                {
                    title: "Hot water",
                    des: "How do you heat your service water?",
                    value: null,
                },
                {
                    title: "Heating",
                    des: "How do you heat your building",
                    value: null,
                },
                {
                    title: "Annual consumption",
                    des: "How high is your annual electricity consumption?",
                    value: null,
                    title2: "Total:",
                    title3: "How much is your electricity price?",
                    title4: "Electricity price:",
                    title5: "Calculate solar system",
                }
            ],
            screens_en: [
                {
                    title: "Is a photovoltaic system worth it?",
                    des: "With just a few details, simulate the production, profitability and costs of a photovoltaic system with or without battery storage.",
                    value: "",
                },
                {
                    title: "Roof surface ",
                    des: "Please highlight the entire roof surface of your house.",
                    value: null,
                    title2: "New building or manual input?",
                    value2: false,
                },
                {
                    title: "House type",
                    des: "Please select your house type.",
                    value: null,
                    title2: "Use 2 sides of the roof",
                    value2: "",
                    title3: "",
                    value3: "",
                    title4: "",
                    value4: "",
                },
                {
                    title: "Roof inclination",
                    des: "Select or manually enter your roof inclination.",
                    value: null,
                    title2: "Manual input",
                },
                {
                    title: "Orientation",
                    des: "Please align your house exactly as shown on the map.",
                    value: null,
                },
                {
                    title: "Hot water",
                    des: "How do you heat your service water?",
                    value: null,
                },
                {
                    title: "Heating",
                    des: "How do you heat your building",
                    value: 7,
                },
                {
                    title: "Annual consumption",
                    des: "How high is your annual electricity consumption?",
                    value: 6,
                    title2: "Total:",
                    title3: "How much is your electricity price?",
                    title4: "Electricity price:",
                    title5: "Calculate solar system",
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
            ready: true,
            final_obj: null,
            t: 2,
            debug: false, //! for dev debug only
        };
    },
    methods: methods,
    mounted() {
        this.langCurrent();
    },
});

// app.use(GlobalComponents);
app.mount("#app");
