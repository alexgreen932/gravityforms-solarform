export default {
    template: `
    <div class="range__main">
        <input id="azimut" type="hidden" v-model="angle" @input="calcSide">
        <div class="knob-surround">
            <!-- <div class="knob-wrap"> -->
            <div id="knob" class="knob" @mouseover="tip=true" @mouseleave="tip=false" :style="rotateStyle()">
                <div class="ver"></div>
                <div class="hor"></div>
                <div class="center">
                    <span class="roof" :class="cls"><p>Sonnenseite</p></span>
                    
                </div>
            <!-- </div> -->

            </div>
                <div class="sides-wrap">
                    <span class="n">{{side_w}}</span>
                </div>         
            
        </div>
        <div class="j-range">
            <input class="custom-slider" type="range" min="0" max="360" v-model="angle"/>
            <span v-show="tip">Komm her</span>
            <!-- <span>Komm her</span> -->
        </div>
        
        <!-- <input type="text" v-model="angle"/> -->
        <!-- <div>Selected: {{ side_w }}</div> 
        <template>---{{ angle }}</template> 
        <div>---{{ rotateStyle() }}</div>  -->
    </div>
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            isDragging: false,
            angle: 180,
            cursor: "none",
            firstTough: true,
            manually: false,
            side_w:null,
            tip:false,
            cls:'north',
        };
    },
    methods: {

        // rotStyle(){
        //     return "transform: rotate(" + this.angle + "deg)";
        // },
        classActive(n) {
            if (this.s == n) {
                return "active";
            } else {
                return "";
            }
        },
        rotateStyle() {
            var d = this.angle;
            if (d > 90 && d < 270 ) {
                this.cls = 'south';
            } else {
                this.cls = 'north';
            }
            switch (true) {
                case d > 0 && d < 30:
                case d > 330 && d < 360:
                    this.side_w = "Nord";
                    this.s = 1;
                    break;
                case d > 300 && d < 330:
                    this.side_w = "Nord-West";
                    this.s = 8;
                    break;
                case d > 240 && d < 300:
                    this.side_w = "West";
                    this.s = 7;
                    break;
                case d > 210 && d < 240:
                    this.side_w = "Süd-West";
                    this.s = 6;
                    break;

                case d > 150 && d < 210:
                    this.side_w = "Süd";
                    this.s = 5;
                    break;
                case d > 120 && d < 150:
                    this.side_w = "Süd-Ost";
                    this.s = 4;
                    break;
                case d > 60 && d < 120:
                    this.side_w = "Ost";
                    this.s = 3;
                    break;
                case d > 30 && d < 60:
                    this.side_w = "Nord-Ost";
                    this.s = 2;
                    break;

                default:
                    this.side_w = "Nord";
                    this.s = 5;
                    break;
            }
            this.calcSide();
            return "transform: rotate(" + this.angle + "deg)";
        },
        calcSide() {
            this.$emit("nv", this.side_w);
        },

    },
};
