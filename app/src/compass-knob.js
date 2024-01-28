export default {
    template: `
            --{{angle}}  
        --{{side}}
        <div id="wrap">
            <div id="labRat">
                <div id="knobTr"></div>
            </div>
            <input id="angle-value" type="hidden" v-model="angle" @input="calcSide">
            <span :class="classActive(1)" class="n">Nord</span>
            <span :class="classActive(2)" class="n-o">Nord-Ost</span>
            <span :class="classActive(3)" class="o">Ost</span>
            <span :class="classActive(4)" class="s-o">Süd-Ost</span>
            <span :class="classActive(5)" class="s">Süd</span>
            <span :class="classActive(6)" class="s-w">Süd-Ost</span>
            <span :class="classActive(7)" class="w">West</span>
            <span :class="classActive(8)" class="n-w">Nord-West</span>
        </div>

        <!-- <div id="compass-wrap-alt">

            <div id="compass-alt" v-on="{ mouseover: fallowMouse, mouseleave:fallowSto, click:clickClosest }" @click="rotateByClick">
                <div class="side-top-left"></div>
                <div class="side-bottom-right"></div>
                <div class="center">
                    <span class="arr"></span>
                    <span class="roof"></span>
                </div>                    
                    <span class="n" @click=selectSide('Nord')>Nord</span>
                    <span class="n-o" @click=selectSide('Nord-Ost')>Nord-Ost</span>
                    <span class="o" @click=selectSide('Ost')>Ost</span>
                    <span class="s-o" @click=selectSide('Süd-Ost')>Süd-Ost</span>
                    <span class="s" @click=selectSide('Süd')>Süd</span>
                    <span class="s-w" @click=selectSide('Süd-West')>Süd-Ost</span>
                    <span class="w" @click=selectSide('West')>West</span>
                    <span class="n-w" @click=selectSide('Nord-West')>Nord-West</span>
            </div>           
        </div>
        <div id="info">
            <transition name="fade">
                <div v-if="move">Move compass arrow same as your house according to cardinal directions and CLICK</div>
            </transition>
            <transition name="fade">
                <div v-if="selected">Selected Side: {{selected}}</div>
            </transition>
        </div> -->
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            side: null,
            angle: null,
            s:null,
        };
    },
    methods: {
        classActive(n){
            if (this.s == n) {
                return 'active';
            } else {
                return ''; 
            }
        },
        calcSide() {
            console.log(`gggggggggggggg`);
            var d = this.angle;
            switch (true) {
                case d > 330 && d < 300:
                    this.side = "Nord-West";
                    this.s = 8;
                    break;
                case d > 240 && d < 300:
                    this.side = "West";
                    this.s = 7;
                    break;
                case d > 210 && d < 240:
                    this.side = "Süd-West";
                    this.s = 6;
                    break;

                case d > 150 && d < 210:
                    this.side = "Süd";
                    this.s = 5;
                    break;
                case d > 120 && d < 150:
                    this.side = "Süd-Ost";
                    this.s = 4;
                    break;
                case d > 60 && d < 120:
                    this.side = "Ost";
                    this.s = 3;
                    break;
                case d > 30 && d < 60:
                    this.side = 'Nord-Ost';
                    this.s = 2;
                    break;
                case d > 30 && d < 330:
                    this.side = "Nord";
                    this.s = 1;
                    break;
                default:
                    this.side = null;
                    break;
            }
        },
    },
};
