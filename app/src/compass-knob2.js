export default {
    template: `
        <div class="info">
            <div>
                --{{angle}} 
                <br> 
            --{{side}}
            </div>
            <div id="wrap">
                <div id="labRat">
                    <div id="knobTr"></div>
                    <div class="ver"></div>
                    <div class="hor"></div>
                    <div class="center">
                        <span class="arr"></span>
                        <span class="roof"></span>
                    </div> 
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
        </div>
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            side: null,
            angle: null,
            s: null,
        };
    },
    methods: {
        classActive(n) {
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
                case d > 0 && d < 30:
                case d > 330 && d < 360:
                    this.side = "Nord";
                    this.s = 1;
                    break;
                case d > 300 && d < 330:
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

                default:
                    this.side = null;
                    break;
            }
//n 260 - 0 - 30
//n0 30-60
//o 60-120
// so - 120-150
//s 150 - 210
//sw 210-240
// w 240-300 
// w 300-330
//
//180 -


        },
        // script() {
        //     let knobTrigger = document.querySelector("#knobTr"),
        //         knob = document.querySelector("#labRat"),
        //         wrap = document.querySelector("#wrap"),
        //         volumeBar = document.querySelector("#volumeBar"),
        //         fadeOut;

        //     function valBetween(v, min, max) {
        //         return Math.min(max, Math.max(min, v));
        //     }

        //     knobTrigger.addEventListener("mousedown", e => {
        //         let x0 = knob.getBoundingClientRect().left + knob.offsetWidth / 2,
        //             y0 = knob.getBoundingClientRect().top + knob.offsetHeight / 2;
        //         let p2 = {
        //             x: x0,
        //             y: y0
        //         };
        //         if (e.button === 0) {
        //             let rotateKnob = function (e) {
        //                 let p1 = {
        //                     x: e.clientX,
        //                     y: e.clientY
        //                 },
        //                     // angle in degrees
        //                     angleDeg = -Math.atan2(p1.x - p2.x, p1.y - p2.y) * 180 / Math.PI + 180;
        //                 let percentValue = parseInt((valBetween(angleDeg, 45, 315) - 315) / -2.7);
        //                 console.log(p2.x, p1.x);

        //                 // Set the value of the input field------------------------------------
        //                 var vueInput = document.getElementById("angle-value");
        //                 vueInput.value = JSON.stringify(valBetween(angleDeg, 0, 359));

        //                 // Trigger a simulated input event
        //                 var inputEvent = new InputEvent('input', { bubbles: true });
        //                 vueInput.dispatchEvent(inputEvent);
        //                 clearTimeout(fadeOut);
        //                 knob.style.transform =
        //                     "rotateZ(" + (valBetween(angleDeg, 45, 315) - 315) + "deg)";
        //                 console.log('knob.style.transform: ', knob.style.transform);
        //             };


        //         }
            },


}

