export default {
    template: `
        <div id="compass-wrap">
            <div id="compass" :style="rotate()" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @click="rotateByClick">
                <div class="side-top-left"></div>
                <div class="side-bottom-right"></div>
                <div class="center">
                    <span></span>
                </div>                    
                    <i class="fas fa-chevron-left"></i>
                    <i class="fas fa-chevron-right"></i>
                    <i class="fas fa-compass"></i>
            </div>
            <!-- nest_comment_start~--{{el}}
            ----{{degree}}~nest_comment_end -->
        </div>
    `,
    props: ["el", "degree"],
    emits: ["nv"],
    data() {
        return {
            isDragging: false,
            startX: 0,
            startDegree: 0,
        };
    },
    methods: {
        rotate() {
            return `transform: rotate(${this.el}deg);`;
        },
        startDrag(event) {
            this.isDragging = true;
            this.startX = event.clientX;
            this.startDegree = this.degree;
        },
        drag(event) {
            if (this.isDragging) {
                const deltaX = event.clientX - this.startX;
                // Adjust rotation direction based on mouse movement
                this.$emit("nv", this.startDegree - deltaX);
            }
        },
        endDrag() {
            this.isDragging = false;
        },
        rotateByClick(event) {
            // const rect = event.target.getBoundingClientRect();
            // const centerX = rect.left + rect.width / 2;
            // const centerY = rect.top + rect.height / 2;
            // const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
            // const degrees = angle * (180 / Math.PI);
            // this.$emit("nv", -degrees); // Negate degrees because atan2 returns angle in radians clockwise from positive x-axis
        },
    },
};