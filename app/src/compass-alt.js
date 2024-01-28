export default {
    template: `
        <div id="compass-wrap-alt">

            <div id="compass-alt" v-on="{ mouseover: fallowMouse, mouseleave:fallowSto, click:clickClosest }" @click="rotateByClick">
            <!-- <div id="compass-alt" v-on="{ mouseover: fallowMouse, mouseleave:fallowSto }" @click="rotateByClick"> -->
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
        </div>
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            move: false,
            selected: null,
        };
    },
    methods: {
        fallowMouse() {
            this.move = true;

            //i need to fix and convert jquery to vanilla js
            var c = jQuery("#compass-alt");
            var x = c.offset().left + c.innerWidth() / 2 - event.pageX;
            var y = c.offset().top + c.innerHeight() / 2 - event.pageY;

            // Use the atan function to get the angle back
            var angle = (Math.atan(y / x) * 180) / Math.PI;

            // Correct for radians by adding one radian when we are further to the right
            // Also, correct for the angle's wrong quadrant
            angle =
                event.pageX > c.offset().left + c.innerWidth() / 2
                    ? angle + 90
                    : angle - 90;

            var arrow = jQuery(".center").css({
                transform: "rotate(" + angle + "deg)",
            });
        },
        fallowStop() {
            this.move = false;
        },
        clickClosest() {
            // var arr = [jQuery('.n'), jQuery('.n-o'), jQuery('.o'), jQuery('.s-o'), jQuery('.s'), jQuery('.s-w') ,jQuery('.w'), jQuery('.n-w')];

            var array = [".n", ".n-o", ".o", ".s-o", ".s", ".s-w", ".w", ".n-w"];
            console.log("arr: ", array);
            // var array = [2, 42, 82, 122, 162, 202, 242, 282, 322, 362];
            var a = jQuery(".arr").offset();
            console.log("a: ", a);
            var num = a.top + a.left;
            console.log("num: ", num);

            var i = 0;
            var minDiff = 1000;
            var ans;
            for (i in array) {
                var sel = array[i];
                sel = jQuery(array[i]).offset();
                sel = sel.top + sel.left;

                console.log("sel: ", sel);
                var m = Math.abs(num - sel);
                if (m < minDiff) {
                    minDiff = m;
                    ans = array[i];
                    
                }
            }
            console.log('ans: ', ans);
        },
        selectSide(v) {
            this.$emit("nv", v);
            this.selected = v;
        },
    },
};
