<?php 
//if (!defined('ABSPATH')) exit;
//note in admin panel
if (is_admin()) {
    echo '<br/><strong>' . esc_html__('Fields are not editable', 'gf-solarform') . '</strong>';
}
?>



<div id="app">
    <form id="calc-data" action="my_solar_ajax_action">
        <!-- <input name="roof_area" type="text" :value="screens[1].value" />
        <input name="roof_type" type="text" :value="screens[2].value" />
        <input name="roof_angle" type="text" :value="screens[3].value" /> -->

        <input name="roof_area" type="text" value="100" />
        <input name="roof_type" type="text" value="Satteldach" />
        <input name="roof_angle" type="text" value="30" />
        <button id="calc" type="submit" name="calc" @click.prevent="calc()">Calculate</button>
    </form>
    <?php

    use Sicom\GFSF\Solar_Calcs;//not works
    // require_once GFSFI_CLS. 'class-solar-calcs.php';

    // ajax-handler
    if (isset($_POST['calc'])) {
        $roof_area = $_POST['roof_area'];
        $roof_type = $_POST['roof_type'];
        $roof_angle = $_POST['roof_angle'];

        $gravityFormData = array(
            'roof_area'   => $roof_area,
            'roof_type'   => $roof_type,
            'roof_angle'  => $roof_angle,
        );

        // Create an instance of the Solar_Calcs class
        $calc = new Sicom\GFSF\Solar_Calcs($gravityFormData);

        // Perform the calculation and return the result
        $result = $calc->do_calculation($gravityFormData);

        // You can echo or return the result
        echo json_encode($result);
    }


    ?>
    <input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" value="lorem ipsum" />
    <!-- nest_comment_start~<input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" :value="textareaData()" />~nest_comment_end -->
    <?php if (!is_admin()): ?>
        <div v-if="!ready" class="preloader">
            <div class="custom-loader"></div>
        </div>
        <div v-if="screen==42">
            <h3>Finish</h3>
        </div>
        <j-form></j-form>
    </div>
<?php endif; ?>





<script type="application/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6kg86tNbggcIdZ7yCJ5zqWzVVLfeQeug&libraries=places,geometry"></script>
<script src="<?php echo GFSFI_ASSETS . 'js/vue.js' ?>"></script><!-- dev mode -->
<script src="<?php echo GFSFI_APP_URL . 'app.js' ?>" type="module"></script>