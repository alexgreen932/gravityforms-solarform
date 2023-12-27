jQuery(document).ready(function ($) {
    // $('#calc-data').submit(function () {
    $('#calc').click(function () {
        event.preventDefault();

        // var handler = window.location.origin +'/wp-content/plugins/gravityforms-solarform/core/classes/ajax-handler.php';
        //var handler = window.location.origin + '/wp-admin/admin-ajax.php';


        // Perform AJAX request
        $.ajax({
            type: 'POST',
            url: 'http://test.dev/wp-admin/admin-ajax.php',
            // action: 'my_solar_ajax_action',
            // url: ajaxurl,
            // data: $('#calc-data').serialize(),
            data: {
                action: 'my_solar_ajax_action', // Replace with your actual action hook
                roof_area: $('#calc-data input[name=roof_area]').val(),
                roof_type: $('#calc-data input[name=roof_type]').val(),
                roof_angle: $('#calc-data input[name=roof_angle]').val(),
                calc: 1 // Add a flag to indicate that it's a calculation request
            },
            success: function (response) {
                // Handle the response here
                console.log(response);
            }
        });
    });
});
