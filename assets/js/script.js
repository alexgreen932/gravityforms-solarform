jQuery(document).ready(function ($) {
    // Use the form ID to bind the submit event
    $('#calc-data').on('submit', function (event) {
        event.preventDefault();
        console.log('click works');

        $.ajax({
            type: 'POST',
            url: window.location.origin + '/wp-admin/admin-ajax.php',
            // data: $('#calc-data').serialize(),
            // dataType: 'json', // Expect JSON response
            data: {
                action: 'test_ajax_action',
                roof_area: $('#calc-data input[name=roof_area]').val(),
                roof_type: $('#calc-data input[name=roof_type]').val(),
                roof_angle: $('#calc-data input[name=roof_angle]').val(),
                calc: 1
            },
            success: function (response) {
                console.log(response);
            }
        });
    });
});