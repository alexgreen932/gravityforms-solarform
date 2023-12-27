import methods from "./src/methods.js";
// import preview from "./src/preview.js";
// import gmap from "./src/gmap.js";
import form from "./src/form.js";

let app = Vue.createApp({
    components: {
        // "j-preview": preview,
        // "j-question": question,
        // "g-map": gmap,
        "j-form": form,
    },
    data() {
        return {
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

app.mount("#app");
