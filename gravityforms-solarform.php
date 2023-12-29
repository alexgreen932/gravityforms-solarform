<?php
/**
 * Plugin Name: Gravity Forms 'Solar Form' Add-on
 * Description: ...
 * Version: 0.0.1
 */

define('GFSF_PLUGIN_PATH', untrailingslashit(plugin_dir_path(__FILE__)));
define('GFSF_PLUGIN_URL', plugins_url('/', __FILE__));
define('GFSF_PLUGIN_ENTRY_FILE', __FILE__);

$file_data = get_file_data(__FILE__, array('version' => 'Version'));
define('GFSF_VERSION', $file_data['version']);

define('GFSFI_CLS', plugin_dir_path(__FILE__) . 'core/classes/');
define('GFSFI_APP', plugin_dir_path(__FILE__) . 'app/');
define('GFSFI_APP_URL', plugin_dir_url(__FILE__) . 'app/');
define('GFSFI_ASSETS', plugin_dir_url(__FILE__) . 'assets/');

require GFSF_PLUGIN_PATH . '/core/init.php';

add_action('wp_ajax_your_ajax_action', 'solar_calc_ajax_function');
add_action('wp_ajax_nopriv_your_ajax_action', 'solar_calc_ajax_function');

function solar_calc_ajax_function()
{
    if (isset($_POST['calc'])) {
        $response = array('message' => 'AJAX works!');
        echo json_encode($response);
        wp_die();
    }
}

add_action('wp_enqueue_scripts', 'gfsfi_public_scripts_and_styles');

function gfsfi_public_scripts_and_styles() {
    wp_enqueue_style('j-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', array(), '');
    wp_enqueue_script('jquery'); // Enqueue jQuery
    // wp_enqueue_script('j-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), '1.0');
}

