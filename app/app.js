import methods from "./src/methods.js";
import preview from "./src/preview.js";
import gmap from "./src/gmap.js";
import angle from "./src/angle.js";
// import compass from "./src/compass.js";
// import compass from "./src/knob.js";
import compass from "./src/range.js";
import icons from '../app/src/icons.js'

let app = Vue.createApp({
    components: {
        "j-preview": preview,
        // "j-question": question,
        "g-map": gmap,
        "j-angle": angle,
        "j-compass": compass,
        "j-icons": icons,
    },
    data() {
        return {
            screen: 0,
            result: false,
            done: [],
            finish: false,
            counted_electric: 18930,
            min:null,//rm
            max:null,//rm
            compass_degree: 0,
            dir: null,
            area: null,
            area_alert: false,
            isDragging: false,
            s: null,
//             Satteldach - Gable
// Zeltdach - Tent
// Flachdach - Flat
// Pultdach - Pitched
// Walmdach - Hipped

// И добавил еще Gambrel
            arr_roof: [
                { img: 'flat-150x150.png', img_h: 'flat-150x150_h.png', val: 'Flachdach', isHovered: false },
                { img: 'gable-150x150.png', img_h: 'gable-150x150_h.png', val: 'Satteldach', isHovered: false },
                { img: 'gambrel-150x150.png', img_h: 'gambrel-150x150_h.png', val: 'Gambrel', isHovered: false },
                { img: 'hipped-150x150.png', img_h: 'hipped-150x150_h.png', val: 'Walmdach', isHovered: false },
                { img: 'pitched-150x150.png', img_h: 'pitched-150x150_h.png', val: 'Pultdach', isHovered: false },
                { img: 'tent-150x150.png', img_h: 'tent-150x150_h.png', val: 'Zeltdach', isHovered: false },
            ],
            arr_angle: [
                { img: '0.svg', img_h: '0h.svg', val: 0, isHovered: false },
                { img: '30.svg', img_h: '30h.svg', val: 30, isHovered: false },
                { img: '45.svg', img_h: '45h.svg', val: 45, isHovered: false },
            ],
            // arr_angle: [
            //     { img: 'icon-1.png', img_h: 'icon-1_h.png', val: 0, isHovered: false },
            //     { img: 'icon-2.png', img_h: 'icon-2_h.png', val: 30, isHovered: false },
            //     { img: 'icon-3.png', img_h: 'icon-3_h.png', val: 45, isHovered: false },
            // ],
            arr_water: [
                { img: 'icon-1.png', img_h: 'icon-1_h.png', val: 'Electric boiler', isHovered: false },
                { img: 'icon-2.png', img_h: 'icon-2_h.png', val: 'Wärmepumpen­boiler', isHovered: false },
                { img: 'icon-3.png', img_h: 'icon-3_h.png', val: 'Öl, Gas, Holz, Fernwärme', isHovered: false },
            ],
            arr_heating: [
                { img: 'icon-1.png', img_h: 'icon-1_h.png', val: 'Elektrische Heizung', isHovered: false },
                { img: 'icon-2.png', img_h: 'icon-2_h.png', val: 'Wärmepumpe', isHovered: false },
                { img: 'icon-3.png', img_h: 'icon-3_h.png', val: 'Öl, Gas, Holz, Fernwärme', isHovered: false },
            ],
            form: {
                address: null,
                // size: null,
                // type: null,
                // sides_2: false,
                // angle: null,
                // orientation: null,
                // hot_water: null,
                // heating: null,
                // count: null,
                count_total: null,
                price: null,
                min:null,
                max:null,
                name:null,
                last_name:null,
                tel:null,
                email:null,
                message:null,
                town:null,
                street:null,
                house:null,
                post_code:null,
                // :null,
                // :null,
            },
            roof_types: ["Satteldach", "Zeltdach", "Flachdach", "Pultdach", "Walmdach", "Anderes Dach"],
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
            // price: 18,
            priceOptions: Array.from({ length: 100 - 18 + 1 }, (_, index) => 18 + index),
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
            // FILLED test data for quicker filling and pass screens
            // screens_de: [
            //     {
            //         title: "Lohnt sich eine Photovoltaikanlage?",
            //         des: "Simulieren Sie mit wenigen Angaben die Produktion, Wirtschaftlichkeit und Kosten einer Photovoltaikanlage mit oder ohne Batteriespeicher.",
            //         value: '',
            //     },
            //     {
            //         title: "Dachfläche",
            //         des: "Markieren Sie die gesamte Dachfläche Ihres Hauses.",
            //         value: 100,
            //         title2: "Neubau oder manuelle Eingabe?",
            //         value2: false,
            //     },
            //     {
            //         title: "Haustyp",
            //         des: "Wählen Sie Ihren Haustyp.",
            //         value: 'Satteldach',
            //         title2: "2 Dachseiten belegen",
            //         value2: '',
            //         title3: "",
            //         value3: "",
            //         title4: "",
            //         value4: "",
            //     },
            //     {
            //         title: "Dachneigung",
            //         des: "Wählen Sie Ihre Dachneigung oder geben Sie diese manuell ein.",
            //         value: 30,
            //         title2: "Manuelle Eingabe",
            //     },
            //     {
            //         title: "Ausrichtung",
            //         des: "Richten Sie Ihr Haus gleich aus wie auf dem Satellitenbild.",
            //         title: "Ausrichtung",
            //         value: 45,
            //     },
            //     {
            //         title: "Warmwasser",
            //         des: "Wie erwärmen Sie Ihr Warmwasser?",
            //         value: 'lorem',
            //     },
            //     {
            //         title: "Heizung",
            //         des: "Wie heizen Sie Ihr Gebäude?",
            //         value: 'lorem',
            //     },
            //     {
            //         title: "Jahresverbrauch",
            //         des: "Wie hoch ist Ihr Jahresstromverbrauch?",
            //         value: 18930,
            //         title2: "Total:",
            //         title3: "Wie hoch ist Ihr Strompreis?",
            //         title4: "Strompreis:",
            //         title5: "Solaranlage berechnen:",
            //     }
            // ],
            //With null data for prod
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
            lang_current: 0,
            lang: {
                show: 'Show',
                further: 'Weiter',
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
                further: 'Weiter',
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
        this.calc();//dev mode //TODO REMOVE
    },
});

// app.use(GlobalComponents);
app.mount("#app");
