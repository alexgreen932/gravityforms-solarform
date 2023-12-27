<?php

require_once 'class-solar-calcs.php';

// ajax-handler
if (isset($_POST['calc'])) {
    $roof_area = $_POST['roof_area'];
    $roof_type = $_POST['roof_type'];
    $roof_angle = $_POST['roof_angle'];

    $gravityFormData = array(
        'roof_area' => $roof_area,
        'roof_type' => $roof_type,
        'roof_angle' => $roof_angle,
    );

    // Create an instance of the Solar_Calcs class
    $calc = new Sicom\GFSF\Solar_Calcs($gravityFormData);

    // Perform the calculation and return the result
    $result = $calc->do_calculation($gravityFormData);

    // You can echo or return the result
    echo json_encode($result);
}
