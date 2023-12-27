<?php
/**
 * Core functions for theme.
 *
 * @package WordPress
 * @subpackage PineparksIdpsTheme
 */

namespace Sicom\GFSF;

use Exception;
use Symfony\Component\Yaml\Yaml;

/**
 * Core class. Implements common functionality for a theme.
 */
final class Core {

	/**
	 * Base path for classes within package.
	 *
	 * @var string[]
	 */
	public array $classes_base_path;

	/**
	 * Base path for configuration files within package.
	 *
	 * @var string
	 */
	public string $config_base_path;

	/**
	 * Core class instance (singleton).
	 *
	 * @var ?Core
	 */
	protected static ?Core $instance = null;

	/**
	 * Project config.
	 *
	 * @var array
	 */
	protected array $config = [];

	/**
	 * Classes registry.
	 *
	 * @var array
	 */
	protected array $registry = [];

	/**
	 * Hooks namespace prefix.
	 *
	 * @var string
	 */
	protected string $hooks_namespace;

	/**
	 * Blocks namespace prefix.
	 *
	 * @var string
	 */
	protected string $blocks_namespace;

	/**
	 * Base theme URI.
	 *
	 * @var string
	 */
	public string $theme_base_uri;

	/**
	 * Constructor. Initializes class autoload.
	 */
	private function __construct() {

		$this->hooks_namespace   = strtolower( str_replace( '\\', '/', __NAMESPACE__ ) );
		$this->blocks_namespace  = strtolower( str_replace( '/', '-', $this->hooks_namespace ) );
		$this->classes_base_path = [ rtrim( dirname( __FILE__ ), '/\\' ) . '/classes' ];
		$this->config_base_path  = rtrim( dirname( __FILE__ ), '/\\' );
		$this->theme_base_uri    = get_stylesheet_directory_uri();

		spl_autoload_register( [ $this, 'autoload' ] );
		$this->recursive_include( __DIR__ . '/interfaces' );
		$this->recursive_include( __DIR__ . '/traits' );
	}

	/**
	 * Process configuration JSON file.
	 *
	 * @param  string $config_name Filename path.
	 * @return Core   Class instance.
	 */
	public function configure( string $config_name ) : Core {

		$config = $this->config_base_path . "/config.$config_name.yaml";
		if ( ! file_exists( $config ) ) {
			return self::$instance;
		}
		$config_data = Yaml::parseFile( $config );

		if ( ! is_array( $config_data ) ) {
			return self::$instance;
		}

		foreach ( $config_data as $name => $data ) {
			// phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores
			do_action( $this->get_hooks_ns() . '/config/' . $name, $data );
		}

		return self::$instance;
	}

	/**
	 * Get class instance. Ensure there can be only one.
	 *
	 * @return Core
	 */
	public static function instance() : Core {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Autoload handler.
	 *
	 * @param  string $class_name - name of the class to load.
	 * @throws Exception  If class can't be loaded.
	 * @return void
	 */
	public function autoload( string $class_name ) : void {
		if ( 0 !== strpos( $class_name, __NAMESPACE__ ) ) {
			return;
		}

		$class_name = str_replace( __NAMESPACE__ . '\\', '', $class_name );
		$class      = explode( '\\', $class_name );

		$not_found  = true;
		$class_file = str_replace( '_', '-', strtolower( array_pop( $class ) ) ) . '.php';
		$class_path = implode( DIRECTORY_SEPARATOR, $class );

		if ( ! empty( $class_path ) ) {
			$class_path .= DIRECTORY_SEPARATOR;
		}
		foreach ( $this->classes_base_path as $base_path ) {
			$file_location = $base_path . DIRECTORY_SEPARATOR . $class_path . "class-$class_file";
			if ( file_exists( $file_location ) ) {
				require_once $file_location;
				$not_found = false;
				break;
			}
		}

		if ( $not_found ) {
			throw new Exception( sprintf( "\n\n\nCould not load %s from %s.\n\n\n", $class_name, implode( ', ', $this->classes_base_path ) ) );
		}

	}

	/**
	 * Add another base path to autoload classes from.
	 *
	 * @param string $path Base path.
	 * @return void
	 */
	public function add_autoload_path( string $path ) : void {
		$this->classes_base_path[] = $path;
	}

	/**
	 * Get prefix namespace for used hooks.
	 *
	 * @return string
	 */
	public function get_hooks_ns() : string {
		return $this->hooks_namespace;
	}

	/**
	 * Get prefix namespace for content blocks.
	 *
	 * @return string
	 */
	public function get_blocks_ns() : string {
		return $this->blocks_namespace;
	}

	/**
	 * Recursively include all files from specified directory (and it's subdirectories).
	 *
	 * @param string $dir       Directory to include all files from.
	 * @param int    $max_depth Maximum depth allowed.
	 * @param int    $depth     Number of levels below specified directory current recursive call is on.
	 */
	public function recursive_include( string $dir, int $max_depth = 5, int $depth = 0 ) : void {
		if ( $depth > $max_depth ) {
			return;
		}

		$scan = glob( $dir . DIRECTORY_SEPARATOR . '*' );
		foreach ( $scan as $path ) {
			if ( preg_match( '/\.php$/', $path ) ) {
				include_once $path;
			} elseif ( is_dir( $path ) ) {
				$this->recursive_include( $path, $max_depth, $depth + 1 );
			}
		}
	}

	/**
	 * Cloning is forbidden.
	 */
	public function __clone() {}

	/**
	 * Deserializing instance is forbidden.
	 */
	public function __wakeup() {}

}
