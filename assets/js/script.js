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
    if(screen.width < 500 ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i)) {
       	var w = $(window).width();
        console.log('w', w);
        w = w - 100;
       	$('#map_canvas2').width(w);
       }
});

