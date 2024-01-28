jQuery(document).ready(function ($) {
    // Use the form ID to bind the submit event

    $('#gform_submit_button_1').appendTo('#final-form .but_wrap');
    $('#gform_submit_button_1').attr('disabled', true);

    // var n = $('#name').val();
    // var l = $('#last-name').val();
    // var t = $('#phone').val();
    // var e = $('#email').val();
    // if ( n.length && l.length && t.length && e.length ) {
    // 	$('#gform_submit_button_1').attr('disabled', false);
    // }
    $('#gform_submit_button_1').attr('disabled', false);//TODO validation in vue
    //fix gmap width
    // if(screen.width < 500 ||
    //     navigator.userAgent.match(/Android/i) ||
    //     navigator.userAgent.match(/webOS/i) ||
    //     navigator.userAgent.match(/iPhone/i) ||
    //     navigator.userAgent.match(/iPod/i)) {
    //    	var w = $(window).width();
    //     console.log('w', w);
    //     w = w - 100;
    //    	$('#map_canvas2').width(w);
    //    }
});


let knobTrigger = document.querySelector("#knobTr"),
    knob = document.querySelector("#labRat"),
    wrap = document.querySelector("#wrap"),
    volumeBar = document.querySelector("#volumeBar"),
    fadeOut;

function valBetween(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

knobTrigger.addEventListener("mousedown", e => {
    let x0 = knob.getBoundingClientRect().left + knob.offsetWidth / 2,
        y0 = knob.getBoundingClientRect().top + knob.offsetHeight / 2;
    let p2 = {
        x: x0,
        y: y0
    };
    if (e.button === 0) {
        let rotateKnob = function (e) {
            let p1 = {
                x: e.clientX,
                y: e.clientY
            },
                // angle in degrees
                angleDeg = -Math.atan2(p1.x - p2.x, p1.y - p2.y) * 180 / Math.PI + 180;
            let percentValue = parseInt((valBetween(angleDeg, 45, 315) - 315) / -2.7);
            console.log('percentValue: ', percentValue);
            // console.log(p2.x, p1.x);

            // Set the value of the input field------------------------------------
            var vueInput = document.getElementById("angle-value");
            vueInput.value = JSON.stringify(valBetween(angleDeg, 0, 359)-359);

            // Trigger a simulated input event
            var inputEvent = new InputEvent('input', { bubbles: true });
            vueInput.dispatchEvent(inputEvent);
            clearTimeout(fadeOut);
            knob.style.transform =
                "rotateZ(" + (valBetween(angleDeg, 0, 359) - 359) + "deg)";
                
            // console.log('knob.style.transform: ', knob.style.transform);
        };
        document.addEventListener("mousemove", rotateKnob, false);
        document.addEventListener("mouseup", e => {
            document.removeEventListener("mousemove", rotateKnob, false);
        });
    } else {
        return false;
    }
});

wrap.addEventListener("contextmenu", e => {
    e.preventDefault();
});
