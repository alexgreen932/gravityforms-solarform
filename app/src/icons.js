export default {
    template: `
    <div :class="cls">
        <div v-for="(e, index) in arr" :class="'sector'+index" @click="sel(e.val)">
            <img :src="addImg(e)" @mouseover="changeImg(e, true)" @mouseleave="changeImg(e, false)" :alt="e.val"/>
            <span v-if="cls=='j-icons'">{{e.val}}</span>
        </div>
        <template v-if="cls=='j-roof'">
            <div class="c"></div>
            <div class="l1"></div>
            <div class="l2"></div>
            <div class="l3"></div>
        </template>
    </div>
    `,
    props: ["el", "arr", "cls"],
    emits: ["nv"],
    data() {
        return {
        };
    },
    methods: {
        sel(e){
            this.$emit('nv', e);
        },
        addImg(e){
            return '../../assets/images/' + (e.isHovered ? e.img_h : e.img);
        },
        changeImg(e, isHovered) {
            e.isHovered = isHovered;
        }
    },
};
