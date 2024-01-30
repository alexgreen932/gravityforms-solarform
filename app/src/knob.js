export default {
    template: `
    <div class="cd__main">
        <span><i class="fas fa-globe"></i>N<i class="fas fa-globe"></i></span>
        <input id="azimut" type="hidden" v-model="angle" @input="calcSide">
        <div class="knob-surround" @mousedown="startDrag"  @mousemove="drag" @mouseup="stopDrag"  :style="cursor">
            <!-- <div id="knob" class="knob" @mousedown="startDrag" @touchstart="startDrag" @mousemove="drag" @touchmove="drag" @mouseup="stopDrag" @touchend="stopDrag" :style="rotateStyle"> -->
            <!-- <div id="knob" class="knob" @mousedown="startDrag"  @mousemove="drag" @mouseup="stopDrag"  :style="rotateStyle"> -->
            <div class="knob-wrap">
            <div id="knob" class="knob" :style="rotateStyle">
                <div class="ver"></div>
                <div class="hor"></div>
                <div class="center">
                    <span class="roof"></span>
                </div>
                <div v-if="!manually" class="dot"></div>
                <i v-if="!manually" class="fas fa-caret-left"></i>
                <i v-if="!manually" class="fas fa-caret-right"></i>
            </div>
                <div class="manual-wrap" v-if="manually">
                    <span class="n" @click=selectSide('Nord')>N</span>
                    <span class="n-o" @click=selectSide('Nord-Ost')>N-O</span>
                    <span class="o" @click=selectSide('Ost')>Ost</span>
                    <span class="s-o" @click=selectSide('Süd-Ost')>S-O</span>
                    <span class="s" @click=selectSide('Süd')>Süd</span>
                    <span class="s-w" @click=selectSide('Süd-West')>S-W</span>
                    <span class="w" @click=selectSide('West')>West</span>
                    <span class="n-w" @click=selectSide('Nord-West')>N-W</span>
                </div>
            </div>
        </div>
        <template v-if="el">Selected: {{ el }}</template> 
        <!-- <template v-if="el">Selected: {{ angle }}</template>  -->
        <div class="manually" @click="manually=!manually"><span>Select Manually</span></div>
    </div>
    `,
    props: ["el"],
    emits: ["nv"],
    data() {
        return {
            isDragging: false,
            angle: 0,
            rotateStyle: null,
            cursor: "none",
            firstTough: true,
            manually: false,
            manually: true,
        };
    },
    computed: {
        compassDirection() {
            // Calculate compass direction based on angle
            // You can customize this logic based on your requirements
            // This is just a simplified example
            const directions = [
                "N",
                "Nord-Ost",
                "Ost",
                "Süd-Ost",
                "Süd",
                "Süd-West",
                "West",
                "Nord-West",
            ];
            const index = Math.round(this.angle / 45) % 8;
            //set style
            var deg = Math.floor(this.angle);
            this.rotateStyle = "transform: rotate(" + deg + "deg)";
            return directions[index];
        },
    },
    methods: {
        selectSide(e) {
            this.$emit("nv", e);
            var d = 0;
            switch (e) {
                case 'Süd':
                    d = 0;
                    break;
                case 'Süd-Ost':
                    d = 315;
                    break;
                case 'Ost':
                    d = 270;
                    break;
                case 'Nord-Ost':
                    d = 225;
                    break;
                case 'Nord':
                    d = 180;
                    break;
                case 'Nord-West':
                    d = 135;
                    break;
                case 'West':
                    d = 90;
                    break;
                case 'Süd-West':
                    d = 45;
                    break;
                default:
                    this.side = null;
                    break;
            }
            this.rotateStyle = "transform: rotate(" + d + "deg)";
        },
        startDrag(event) {
            // console.log('start');
            this.isDragging = true;
            this.drag(event);
        },
        stopDrag() {
            // console.log('stop');
            this.cursor = "cursor: none;";
            this.isDragging = false;
        },
        drag(event) {
            this.cursor = "cursor: crosshair;";
            if (this.isDragging && !this.manually) {
                // console.log('dragging');
                console.log("this.firstTough: ", this.firstTough);
                this.cursor = "cursor: move;";
                const boundingRect = event.target.getBoundingClientRect();
                const centerX = boundingRect.left + boundingRect.width / 2;
                const centerY = boundingRect.top + boundingRect.height / 2;
                let mouseX, mouseY;
                if (event.type.startsWith("mouse")) {
                    mouseX = event.pageX;
                    mouseY = event.pageY;
                    console.log("1st touch");
                } else if (event.touches.length > 0) {
                    mouseX = event.touches[0].pageX;
                    mouseY = event.touches[0].pageY;
                    console.log("taches length: ");
                }
                console.log("mouseX: ", mouseX);
                console.log("mouseY: ", mouseY);
                const deltaX = mouseX - centerX;
                const deltaY = mouseY - centerY;

                // calculation degrees
                const sensitivity = 0.5; // You can adjust this value
                const angle =
                    Math.atan2(deltaY, deltaX) * (180 / Math.PI) * sensitivity;
                // const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

                // const angle = Math.atan2(y2-y1,x2-x1);

                let num = 0;
                if (!this.firstTough) {
                    num = (angle + 360) % 360; // Ensure angle is within [0, 360)
                }
                this.angle = Math.floor(num);
                this.angle = num;
                // console.log('this.angle: ', this.angle);
                this.calcSide();
                this.firstTough = false;
                console.log("this.firstTough: ", this.firstTough);
            }
        },
        calcSide() {
            this.$emit("nv", this.compassDirection);
        },
    },
};
