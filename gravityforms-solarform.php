<?php
/**
 * Plugin Name: Gravity Forms 'Solar Form' Add-on
 * Description: ...
 * Version: 0.0.1
 */

define( 'GFSF_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GFSF_PLUGIN_URL', plugins_url( '/', __FILE__ ) );
define( 'GFSF_PLUGIN_ENTRY_FILE', __FILE__ );

$file_data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
define( 'GFSF_VERSION', $file_data['version'] );

require GFSF_PLUGIN_PATH . '/core/init.php';
