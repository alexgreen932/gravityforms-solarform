const template = `
    <div class="icons-angle">
        <div v-for="e in list" class="icon-wrapper" @click="sel(e)">
        <div :class="'angle-' + e"></div>
            <span>{{e}}</span>
        </div>
    </div>
    <div class="inline">
    <label>{{el.title2}}</label>
    <input type="number" v-model="el.value">
</div>
`;
export default {
    template,
    props: ["el", "lang"],
    emits: ["nv"],
    data: function () {
        return {
            list:[ 0, 30, 45],
        };
    },
    methods: {
        isActive(e){},
        sel(e){
            this.el.value = e;
            console.log('e: ', e);
        },
        path(e){
            var p = window.location.origin +'/wp-content/plugins/gravityforms-solarform/assets/images/';
            return p + e;
        },

        // goTo(n) {
        //     this.$emit("nv", n);
        // },
    },
};
