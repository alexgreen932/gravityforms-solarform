<?php
use Sicom\GFSF\Bootstrap;

/**
 * Initialize plugin core.
 *
 * @package WordPress
 * @subpackage GF_Solarform
 */

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

require_once __DIR__ . '/class-core.php';

use Sicom\GFSF\Core;

/**
 * Returns instance of theme's main class.
 *
 * @return Core
 */
function Core() { //phpcs:ignore
	return Core::instance();
}
Core();
new Bootstrap();