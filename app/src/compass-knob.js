
export default {
    template: `
            --{{angle}}  
        --{{side}}
        <div id="wrap">
            <div id="labRat">
                <div id="knobTr"></div>
            </div>
            <input id="angle-value" type="hidden" v-model="angle" @input="calcSide">
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
        };
    },
    methods: {
        calcSide() {
            console.log(`gggggggggggggg`);
            var d = this.angle;
            switch (true) {
                case d > 330 && d < 300:
                    this.side = 'Nord-West';
                    break;
                case d > 240 && d < 300:
                    this.side = 'West';
                    break;
                case d > 210 && d < 240:
                    this.side = 'Süd-West';
                    break;

                case d > 150 && d < 210:
                    this.side = 'Süd';
                    break;
                case d > 120 && d < 150:
                    this.side = 'Süd-Ost';
                    break;
                case d > 60&& d < 120:
                    this.side = 'Ost';
                    break;
                case d > 30 && d < 330:
                    this.side = 'Nord';
                    break;

                // case d > 150 && d < 210:
                //     this.side = 'Süd';
                //     break;
                // case d > 240 && d < 300:
                //     this.side = 'Süd-West';
                //     break;
                // case d > 300 && d < 330:
                //     this.side = 'West';
                //     break;
                // case d > 120 && d < 150:
                //     this.side = 'Nord-West';
                //     break;
                // case d > 0 && d < 330:
                //     this.side = 'Nord';
                //     break;
                // case d > 30 && d < 60:
                //     this.side = 'Nord-Ost';
                //     break;
                // case d > 60&& d < 120:
                //     this.side = 'Ost';
                //     break;
                // case d > 120 && d < 150:
                //     this.side = 'Süd-Ost';
                //     break;
                default:
                    this.side = null;
                    break;
                    
            }
            
        },
    }
}

