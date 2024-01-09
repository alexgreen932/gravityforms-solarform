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

include 'hooks.php';

//add styles
add_action('admin_enqueue_scripts', 'enqueue_admin_scripts_and_styles');
add_action('wp_enqueue_scripts', 'gfsfi_public_scripts_and_styles');

function enqueue_admin_scripts_and_styles()
{
    //calls if our pages
    if (get_current_screen()->id == 'forms_page_gf_entries') {
        wp_enqueue_style('j-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', array(), '');
    }
}
function gfsfi_public_scripts_and_styles() {
    wp_enqueue_style('j-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', array(), '');
    wp_enqueue_script('jquery'); // Enqueue jQuery
    wp_enqueue_script('j-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), '1.0');

}

