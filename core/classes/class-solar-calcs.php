<?php
/**
 * Gravity Form Solar Form Add-On Calculaions.
 *
 * @package WordPress
 * @subpackage Gravity_Forms\Solar_Form
 */

namespace Sicom\GFSF;
use Exception;

class Solar_Calcs {

	/**
	 * Caclulation internals storage.
	 *
	 * @var array
	 */
	protected array $calcs;

	protected array $data;

	const MODULE_SIZE = 2.35; // m2
	const MODULE_BASE_COST = 120; // EUR
	const MODULE_ASSEMBLY_COST = 80; // EUR

	const MODULE_POWER = 0.44; // kWp
	const KWP_MONTAGE_COST = 300; // EUR	per kWp


	const ROOF_TYPE_MOD = array(
		'Satteldach'   => 0,
		'Zeltdach'     => 0.1,
		'Flachdach'    => -0.05,
		'Pultdach'     => 0.15,
		'Walmdach'     => 0.20,
		'Anderes Dach' => 0.5
	);

	const ROOF_ANGLE_MOD = array(
		'0-20 Grad'  => 0,
		'20-40 Grad' => 0.1,
		'>40 Grad'   => 0.3,
	);

	const COSTS_SPREAD = 3000;

	const POWER_CONVERTER_COST = array(
		5  => 1000,
		8  => 1300,
		10 => 1500,
		15 => 2200,
		20 => 2500,
		30 => 3000,
	);

	const BATTERY_COST = array(
		10 => 5000,
		15 => 6000,
		30 => 7000,
	);

	/**
	 * Required data keys for calculation.
	 */
	const DATA_TEMPLATE = array( 'roof_type', 'roof_angle', 'roof_area' );

	public function __construct( $data ) {
		$this->prepare_data( $data );
		$this->calcs = array();
		$this->do_calculation( $data );
	}


	/**
	 * Prepares the given data by setting default values and validating input.
	 *
	 * @param array $data The data to be prepared.
	 * @throws Exception If required data is missing.
	 */
	protected function prepare_data( $data ) {
		$defaults = array();
		foreach ( self::DATA_TEMPLATE as $key ) {
			$defaults[ $key ] = null;
		}
		$input = \wp_parse_args( $data, $defaults );

		if ( in_array( null, $input ) ) {
			throw new Exception( 'Missing required data. Must have following keys: ' . implode( ', ', self::DATA_TEMPLATE ) );
		}

		$this->data = $input;
	}

	/**
	 * Calculate the costs and power of a solar panel system based on input data.
	 *
	 * @param array $data An array containing the input data for the calculation.
	 *                    The array should have the following keys:
	 *                    - 'roof_type': The type of roof.
	 *                    - 'roof_angle': The angle of the roof.
	 *                    - 'roof_area': The area of the roof.
	 * @return void
	 */
	// protected function do_calculation( $data ) {
	public function do_calculation( $data ) {


		$this->calcs['roof_type_mod'] = self::ROOF_TYPE_MOD[ $data['roof_type'] ];
		$this->calcs['roof_angle_mod'] = self::ROOF_ANGLE_MOD[ $data['roof_angle'] ];

		$this->calcs['number_of_modules'] = floor( $data['roof_area'] / self::MODULE_SIZE );
		$this->calcs['base_module_costs'] = self::MODULE_BASE_COST * $this->calcs['number_of_modules'];
		$this->calcs['base_assembly_costs'] = self::MODULE_ASSEMBLY_COST * $this->calcs['number_of_modules'];
		$this->calcs['modules_costs'] = ( $this->calcs['base_module_costs'] + $this->calcs['base_assembly_costs'] ) * ( 1 + $this->calcs['roof_type_mod'] + $this->calcs['roof_angle_mod'] );


		$this->calcs['power'] = self::MODULE_POWER * $this->calcs['number_of_modules'];
		$this->calcs['base_montage_costs'] = self::KWP_MONTAGE_COST * $this->calcs['power'];
		$this->calcs['montage_costs'] = $this->calcs['base_montage_costs'] * ( 1 + $this->calcs['roof_type_mod'] + $this->calcs['roof_angle_mod'] );

		$this->calcs['converter_costs'] = $this->select_in_range( $this->calcs['power'], self::POWER_CONVERTER_COST );
		$this->calcs['battery_costs'] = $this->select_in_range( $this->calcs['power'], self::BATTERY_COST );

		$this->calcs['total_costs'] = $this->calcs['modules_costs'] + $this->calcs['montage_costs'] + $this->calcs['converter_costs'] + $this->calcs['battery_costs'];
		$this->calcs['total_costs_min'] = $this->calcs['total_costs'] - self::COSTS_SPREAD;
		$this->calcs['total_costs_max'] = $this->calcs['total_costs'] + self::COSTS_SPREAD;

	}

	protected function select_in_range( int $value, array $data ) {
		$right_side = array_flip(
			array_filter(
				array_flip( $data ),
				function( $val ) use ( $value ) {
					return $val >= $value;
				}
			)
		);
		return reset( $right_side );
	}

	/**
	 * Get the calc results.
	 *
	 * @return mixed The calcs.
	 */
	public function get_calcs() {
		return $this->calcs;
	}
	
	/**
	 * Retrieves the data.
	 *
	 * @return mixed The data.
	 */
	public function get_data() {
		return $this->data;
	}

	/**
	 * Retrieves the value of a specific key from the calcs array.
	 *
	 * The function takes a key as the first parameter and an optional format as the second parameter.
	 * If the format is '%' then the function returns the value in percentage format.
	 * If the format is 'num' then the function returns the value formatted as a number with 2 decimal places.
	 * If no format is provided, the function returns the raw value from the calcs array.
	 *
	 * @param mixed       $key    The key to retrieve the value for.
	 * @param string|null $format The format to apply to the value. Defaults to null.
	 * @return mixed The value retrieved from the calcs array.
	 */
	public function get( $key, $format = null ) {
		if ( '%' === $format ) {
			return ( $this->calcs[ $key ] * 100 ) . '%';
		}

		if ( 'num' === $format ) {
			return number_format( $this->calcs[ $key ], 2 );
		}

		return $this->calcs[ $key ];
	}

	public function __get( $key ) {
		return $this->get( $key );
	}

	/**
	 * DEV TEM METHOD - remove then - 
	 *
	 * @param [type] $key
	 * @return void
	 */

	public function d( $var= 'test', $die = false  ) {
		echo '<pre>';
		var_dump($var);
		echo '</pre>';
		if ( $die ) {
			die();
		}
	}
}
