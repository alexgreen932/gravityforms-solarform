<?php

namespace Sicom\GFSF;
use GFForms;
use GFAddOn;

class Bootstrap {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'gform_loaded', array( $this, 'load' ), 5 );

	}

	/**
	 * Bootstrap the GF Addon
	 */
	public function load() {
		if ( ! method_exists( 'GFForms', 'include_addon_framework' ) ) {
			return;
		}

		GFForms::include_addon_framework();
		GFAddOn::register( Solar_Form::class );
	}
}