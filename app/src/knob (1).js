export default {
    template: `
    <div class="cd__main">
        <span><i class="fas fa-globe"></i>N<i class="fas fa-globe"></i></span>

            <input id="azimut" type="hidden" v-model="angle" @input="calcSide()">
            <!-- --{{angle}}
            --{{side}} -->
            <div class="knob-surround">

                <div id="knob" class="knob">
                    <div class="ver"></div>
                    <div class="hor"></div>
                    <div class="center">
                        <span class="roof"></span>
                    </div>
                    <div class="dot"></div>
                    <i class="fas fa-caret-left"></i>
                    <i class="fas fa-caret-right"></i>
                </div>
            </div>
            {{knob()}}
    </div>

    `,
    // props: ["el"],
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
                return "active";
            } else {
                return "";
            }
        },
        calcSide() {
            var d = this.angle;
            switch (true) {
                case d > 0 && d < 30:
                case d > 330 && d < 360:
                    this.$emit('nv', 'Süd');
                    this.s = 1;
                    break;
                case d > 300 && d < 330:
                    this.$emit('nv', 'Süd-Ost');
                    this.s = 8;
                    break;
                case d > 240 && d < 300:
                    this.$emit('nv', 'Ost');
                    this.s = 7;
                    break;
                case d > 210 && d < 240:
                    this.$emit('nv', 'Nord-Ost');
                    this.s = 6;
                    break;

                case d > 150 && d < 210:
                    this.$emit('nv', 'Nord');
                    this.s = 5;
                    break;
                case d > 120 && d < 150:
                    this.$emit('nv', 'Nord-West');
                    this.s = 4;
                    break;
                case d > 60 && d < 120:
                    this.$emit('nv', 'West');
                    this.s = 3;
                    break;
                case d > 30 && d < 60:
                    this.$emit('nv', 'Süd-West');
                    this.s = 2;
                    break;

                default:
                    this.side = null;
                    break;
            }
        },
        knob(){
            document.addEventListener("DOMContentLoaded", function () {
                // Your script here
                var knobPositionX;
                var knobPositionY;
                var mouseX;
                var mouseY;
                var knobCenterX;
                var knobCenterY;
                var adjacentSide;
                var oppositeSide;
                var currentRadiansAngle;
                var getRadiansInDegrees;
                var finalAngleInDegrees;
                var compassDedree;
                var volumeKnob = document.getElementById("knob");
                var boundingRectangle = volumeKnob.getBoundingClientRect(); //get rectangular geometric data of knob (x, y, width, height)
            
            
                function main() {            
                    volumeKnob.addEventListener(getMouseDown(), onMouseDown); //listen for mouse button click
                    document.addEventListener(getMouseUp(), onMouseUp); //listen for mouse button release
            
                }
            
                //on mouse button down
                function onMouseDown() {
                    document.addEventListener(getMouseMove(), onMouseMove); //start drag
                }
            
                //on mouse button release
                function onMouseUp() {
                    document.removeEventListener(getMouseMove(), onMouseMove); //stop drag
                }
            
                //compute mouse angle relative to center of volume knob
                //For clarification, see my basic trig explanation at:
                //https://www.quora.com/What-is-the-significance-of-the-number-pi-to-the-universe/answer/Kevin-Lam-15
                function onMouseMove(event) {
                    knobPositionX = boundingRectangle.left; //get knob's global x position
                    knobPositionY = boundingRectangle.top; //get knob's global y position
            
                    if (detectMobile() == "desktop") {
                        mouseX = event.pageX; //get mouse's x global position
                        mouseY = event.pageY; //get mouse's y global position
                    } else {
                        mouseX = event.touches[0].pageX; //get finger's x global position
                        mouseY = event.touches[0].pageY; //get finger's y global position
                    }
            
                    knobCenterX = boundingRectangle.width / 2 + knobPositionX; //get global horizontal center position of knob relative to mouse position
                    knobCenterY = boundingRectangle.height / 2 + knobPositionY; //get global vertical center position of knob relative to mouse position
            
                    adjacentSide = knobCenterX - mouseX; //compute adjacent value of imaginary right angle triangle
                    oppositeSide = knobCenterY - mouseY; //compute opposite value of imaginary right angle triangle
            
                    //arc-tangent function returns circular angle in radians
                    //use atan2() instead of atan() because atan() returns only 180 degree max (PI radians) but atan2() returns four quadrant's 360 degree max (2PI radians)
                    currentRadiansAngle = Math.atan2(adjacentSide, oppositeSide);
            
                    getRadiansInDegrees = currentRadiansAngle * 180 / Math.PI; //convert radians into degrees
            
                    finalAngleInDegrees = -(getRadiansInDegrees - 180); //knob is already starting at -135 degrees due to visual design so 135 degrees needs to be subtracted to compensate for the angle offset, negative value represents clockwise direction
            
                    //only allow rotate if greater than zero degrees or lesser than 270 degrees
                    if (finalAngleInDegrees >= 0 && finalAngleInDegrees <= 360) {
                        volumeKnob.style.transform = "rotate(" + finalAngleInDegrees + "deg)"; //use dynamic CSS transform to rotate volume knob
            
                        //270 degrees maximum freedom of rotation / 100% volume = 1% of volume difference per 2.7 degrees of rotation
                        compassDedree = Math.floor(finalAngleInDegrees / (360 / 360));
            
                        // Set the value of the input field -----------------
                        let vueInput = document.getElementById("azimut");
                        vueInput.value = compassDedree;
            
                        // Trigger a simulated input event
                        let inputEvent = new InputEvent('input', { bubbles: true });
                        vueInput.dispatchEvent(inputEvent);
            
                    }
                }
            
                //detect for mobile devices from https://www.sitepoint.com/navigator-useragent-mobiles-including-ipad/
                function detectMobile() {
                    var result = (navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i));
            
                    if (result !== null) {
                        return "mobile";
                    } else {
                        return "desktop";
                    }
                }
            
                function getMouseDown() {
                    if (detectMobile() == "desktop") {
                        return "mousedown";
                    } else {
                        return "touchstart";
                    }
                }
            
                function getMouseUp() {
                    if (detectMobile() == "desktop") {
                        return "mouseup";
                    } else {
                        return "touchend";
                    }
                }
            
                function getMouseMove() {
                    if (detectMobile() == "desktop") {
                        return "mousemove";
                    } else {
                        return "touchmove";
                    }
                }
            
                main();
            });
        }
    },
    mounted() {
        
    },
};

