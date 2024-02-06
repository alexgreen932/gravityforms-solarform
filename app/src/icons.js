export default {
    template: `
    <div class="icon-wrap">
        <div :class="cls">
            <div v-for="(e, index) in arr" :class="'sector'+index" @click="sel(e.val)">
                <img v-if="!isActive(e.val)" :src="addImg(e)" @mouseover="changeImg(e, true)" @mouseleave="changeImg(e, false)" :alt="e.val"/>
                <img v-if="isActive(e.val)" :src="activeImg(e)" :alt="e.val"/>
                <span v-if="cls!=='j-roof'">{{e.val}}</span>
                <!-- --{{isActive(e.val)}} -->
            </div>
            <template v-if="cls=='j-roof'">
                <div class="c"></div>
                <div class="l1"></div>
                <div class="l2"></div>
                <div class="l3"></div>
            </template>
        </div>
    </div>
    `,
    props: ["el", "arr", "cls"],
    emits: ["nv"],
    data() {
        return {
        };
    },
    methods: {
        isActive(e){
            var rt = false;
            if (e == this.el) {
                rt = true;
            }
            return rt;
        },
        sel(e){
            this.$emit('nv', e);
            var array = this.arr;
            for (let index = 0; index < array.length; index++) {
                const el = array[index];
                el.isHovered = false;             
            }
        },
        addImg(e){
            var i = window.location.origin + '/wp-content/plugins/gravityforms-solarform/assets/images/';
            // var i = '../assets/images/';
            return i + (e.isHovered ? e.img_h : e.img);
        },
        activeImg(e){
            var i = window.location.origin + '/wp-content/plugins/gravityforms-solarform/assets/images/';
            // var i = '../assets/images/';
            return i + e.img_h;
        },
        changeImg(e, isHovered) {
            e.isHovered = isHovered;
            
        }
    },
};
