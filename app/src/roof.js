export default {
    template: `
    <div class="j-roof">
        <div v-for="(e, index) in imgs" :class="'sector'+index" @click="sel(e.val)">
            <img :src="addImg(e)" @mouseover="changeImg(e, true)" @mouseleave="changeImg(e, false)" :alt="e.val"/>
        </div>
    </div>
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            imgs:[
                {img:'flat-150x150.png', img_h:'flat-150x150_h.png', val:'Flachdach', isHovered: false},
                {img:'gable-150x150.png', img_h:'gable-150x150_h.png', val:'Gambrel', isHovered: false},
                {img:'gambrel-150x150.png', img_h:'gambrel-150x150_h.png', val:'Satteldach', isHovered: false},
                {img:'hipped-150x150.png', img_h:'hipped-150x150_h.png', val:'Walmdach', isHovered: false},
                {img:'pitched-150x150.png', img_h:'pitched-150x150_h.png', val:'Pultdach', isHovered: false},
                {img:'tent-150x150.png', img_h:'tent-150x150_h.png', val:'Satteldach', isHovered: false},
            ],
        };
    },
    methods: {
        sel(e){},
        addImg(e){
            return '../../assets/images/' + (e.isHovered ? e.img_h : e.img);
        },
        changeImg(e, isHovered) {
            e.isHovered = isHovered;
        }
    },
};
