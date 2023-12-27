<?php 

namespace Sicom\GFSF;
use GFAddOn;
use GF_Fields;

class Solar_Form extends GFAddOn {
	protected $_min_gravityforms_version = '1.9';
	protected $_slug = 'gf-solarform';
	protected $_path = 'gravityforms-solarform/gravityforms-solarform.php';
	protected $_full_path = __FILE__;
	protected $_title = 'Gravity Forms Solar Form Add-On';
	protected $_short_title = 'Solar Form Add-On';

	private static $_instance = null;

	public function __construct() {
		parent::__construct();
	}

	/**
	 * Get an instance of this class.
	 *
	 * @return Solar_Form
	 */
	public static function get_instance() {
		if ( self::$_instance == null ) {
			self::$_instance = new Solar_Form();
		}

		return self::$_instance;
	}

	public function plugin_settings_fields() {
		return array(
			array(
				'title'  => esc_html__( 'Solar Form Add-On Settings', 'gf-solarform' ),
				'fields' => array(
					array(
						'name'              => 'gapikey',
						'tooltip'           => esc_html__( 'Enter Google Maps API key', 'gf-solarform' ),
						'label'             => esc_html__( 'Maps API key', 'gf-solarform' ),
						'type'              => 'text',
						'class'             => 'small',
						// 'feedback_callback' => array( $this, 'is_valid_setting' ),
					),
				)
			),
		);
	}

	public function pre_init() {
		// require_once( __DIR__ . '/class-gf-solarform-field.php');

		// $this->field = new GF_Field_Solarform();

		GF_Fields::register( new Solar_Field() );

		parent::pre_init();
	}

	/**
	 * Scripts to be enqueued.
	 * 
	 * @see GFAddon::scripts()
	 */
	public function scripts() {
		$scripts = array(
			array(
				'handle'  => 'gfsf-scripts',
				'src'     =>  GFSF_PLUGIN_URL  . '/assets/scripts/scripts.js',
				'version' => $this->_version,
				'deps'    => array( 'jquery' ),
				'enqueue' => array(
					array(
						'admin_page' => array( 'plugin_settings' ),
						'tab'        => 'gf-solarform'
					)
				)
			),

		);

		return array_merge( parent::scripts(), $scripts );
	}

	/**
	 * List of styles to be enqueued.
	 * 
	 * @see GFAddon::scripts()
	 */
	public function styles() {
		$styles = array(
			array(
				'handle'  => 'gfsf-styles',
				'src'     =>  GFSF_PLUGIN_URL  . '/assets/styles/style.css',
				'version' => $this->_version,
				'enqueue' => array(
					array(
						'admin_page' => array( 'plugin_settings' ),
						'tab'        => 'gf-solarform'
					)
				)
			)
		);

		return array_merge( parent::styles(), $styles );
	}
}