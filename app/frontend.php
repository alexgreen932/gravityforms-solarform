<?php
if (!defined('ABSPATH'))
    exit;
//note in admin panel
if (is_admin()) {
    echo '<br/><strong>' . esc_html__('Fields are not editable', 'gf-solarform') . '</strong>';
}
?>

<div id="app">
    <!-- <form id="calc-data" action="<?php echo admin_url('admin-ajax.php'); ?>"> -->
    <form id="calc-data" action="test_ajax_action">
        <input name="roof_area" type="text" value="100" />
        <input name="roof_type" type="text" value="Satteldach" />
        <input name="roof_angle" type="text" value="30" />
        <button id="calc" type="submit" name="calc">Calculate</button>
    </form>

    <!-- <input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" value="lorem ipsum" /> -->
    <input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" :value="outDev()" />
    <?php if (!is_admin()): ?>
        <!-- <div v-if="!ready" class="preloader">
            <div class="custom-loader"></div>
        </div> -->
        <div v-if="screen==42">
            <h3>Finish Form</h3>
        </div>
        <j-form></j-form>
    </div>
<?php endif; ?>



<script type="application/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6kg86tNbggcIdZ7yCJ5zqWzVVLfeQeug&libraries=places,geometry"></script>
<script src="<?php echo GFSFI_ASSETS ?>js/vue.js"></script>
<script src="<?php echo GFSFI_APP_URL ?>app.js" type="module"></script>
<script>
    // jQuery(document).ready(function ($) {
    //     // Use the form ID to bind the submit event
    //     $('#calc-data').on('submit', function (event) {
    //         event.preventDefault();
    //         console.log('click works');

    //         $.ajax({
    //             type: 'POST',
    //             url: '<?php echo admin_url('admin-ajax.php'); ?>',
    //             // data: $('#calc-data').serialize(),
    //             // dataType: 'json', // Expect JSON response
    //             data: {
    //                 action: 'test_ajax_action',
    //                 roof_area: $('#calc-data input[name=roof_area]').val(),
    //                 roof_type: $('#calc-data input[name=roof_type]').val(),
    //                 roof_angle: $('#calc-data input[name=roof_angle]').val(),
    //                 calc: 1
    //             },
    //             success: function (response) {
    //                 console.log(response);
    //             }
    //         });
    //     });
    // });

</script>