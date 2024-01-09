jQuery(document).ready(function ($) {
    // Use the form ID to bind the submit event
    $('#gform_submit_button_1').appendTo('#final-form');
    $('#gform_submit_button_1').attr('disabled', true);
    $('#gform_submit_button_1').attr('disabled', false);//TODO validation in vue
    //fix gmap width
    if(screen.width < 500 ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i)) {
       	var w = $(window).width();
        console.log('w', w);
        w = w - 100;
        console.log("w", w);
       	$('#map_canvas2').width(w);
       }
});

