<?php

namespace Sicom\GFSF;

use GFForms;	
use GF_Field;

class Solar_Field extends GF_Field {

	/**
	 * Field type.
	 *
	 * @since 1.0
	 * @var string
	 */
	public $type = 'solarfield';

	/**
	 * Decoded field data.
	 *
	 * @since 1.0
	 * @var object
	 */
	private $data;

	/**
	 * Return empty array to prevent the field from showing up in the form editor.
	 *
	 * @since 1.0
	 * @return array
	 */
	public function get_form_editor_button() {
		return array(
			'group' => 'advanced_fields',
			'text'  => $this->get_form_editor_field_title()
		);
	}

	public function get_form_editor_field_title() {
		return esc_attr__( 'Solar Form', 'gf-solarform' );
	}

	/**
	 * Returns the class names of the settings which should be available on the field in the form editor.
	 *
	 * @return array
	 */
	function get_form_editor_field_settings() {
		return array(
				'conditional_logic_field_setting',
				'prepopulate_field_setting',
				'error_message_setting',
				'label_setting',
				'label_placement_setting',
				'admin_label_setting',
				'size_setting',
				'rules_setting',
				'visibility_setting',
				'duplicate_setting',
				'default_value_setting',
				'placeholder_setting',
				'description_setting',
				'phone_format_setting',
				'css_class_setting',
		);
	}

	/**
	 * Returns the field inner markup.
	 *
	 * @param array        $form  The Form Object currently being processed.
	 * @param string|array $value The field value. From default/dynamic population, $_POST, or a resumed incomplete submission.
	 * @param null|array   $entry Null or the Entry Object currently being edited.
	 *
	 * @return string
	 */
	public function get_field_input( $form, $value = '', $entry = null ) {
		$form_id         = $form['id'];
		$is_entry_detail = $this->is_entry_detail();
		$is_form_editor  = $this->is_form_editor();
		$id              = (int) $this->id;
		// $input           = '';
	
		// if ( $is_entry_detail ) {
		// 	$input .= "<pre>{$value}</pre>";
	
		// 	return $input . '<br/>' . esc_html__( 'Fields are not editable', 'gf-solarform' );
		// }

		// if ( $is_form_editor ) {
		// 	$input .= '<br><hr><br>';
		// }
	
		// $input .= "<input type='textarea' id='input_{$id}' name='input_{$id}' value='{$value}' />";
		// $input .= '<div id="gfsf-app"></div>';
		
		// return $input;
		
		//app form
		ob_start();
		include GFSFI_APP . 'frontend.php';
		return ob_get_clean();
	}

}