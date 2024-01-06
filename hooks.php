h<?php
if (!defined('ABSPATH'))
    exit;

    
    /**
     * For development only - it displays any data in var_dump in red bordered div
     *
     * @param string $var
     * @param boolean $die
     * @return void
     */
    function d( $var = 'test', $die = true  ) {
		echo '<div style="border: red solid 1px; padding:20px; margin:20px; background:#fff">';
		echo '<h3>Func var_dump for development and debugging only!</h3>';
		echo '<pre>';
		var_dump($var);
		echo '</pre>';
		echo '</div>';
		if ( $die ) {
			wp_die();
		}
	}


// this works ! ---
/**
 * Details view hook
 */
add_action( 'gform_entry_detail', 'add_to_details', 10, 2 );
function add_to_details( $form, $entry ) {
    // d($entry);//dev
    // if ( $form['id'] == 1 ) {
        // echo '<div>This hook is used to add additional information to the details page for an entry.</div>';
    // }
    $data = json_decode($entry[1]);
    echo '<div class="j-admin-block">';
    echo '<h2>Solar Form Data</h2>';
    foreach ($data as $key => $value) {
        echo '<div class="j-inline-field">';
        echo '<label>' . $key . '</label>';
        echo $value;
        echo '</div>';
    }
    echo '</div>';
    // $html = '';
    // $html .= '<div class="j-inline-field">';
    // $html .= '<div class="j-inline-field"><label>Any Label:</label>Here can be any field which is important ex Name, Email</div>';
    // $html .= '<div class="j-inline-field"><label>Dachfläche:</label>' . $data->Dachfläche .'</div>';
    // $html .= '<div class="j-inline-field">ETC</div>';
    // $html .= '<div class="j-inline-field">ETC</div>';
    // // $html .= get_current_screen()->base;
    // echo $html;
}


// add_filter('gform_entries_column_values', 'change_column_data', 10, 4);
// function change_column_data($value, $form, $field, $entry) {
//     return '9999';
// }

/**
 * replaces json with data via foreach
 */
add_filter( 'gform_entries_primary_column_filter', function( $column_value, $form_id, $field_id, $entry, $query_string, $edit_url, $field_value ) {
    $data = json_decode($entry[1]);
    $html = '';
    $html .= '<div class="j-inline-field"><label>Any Label:</label>Here can be any field which is important ex Name, Email</div>';
    $html .= '<div class="j-inline-field"><label>Dachfläche:</label>' . $data->Dachfläche .'</div>';
    $html .= '<div class="j-inline-field">ETC</div>';
    // $html .= get_current_screen()->base;
    return $html;
}, 10, 7 );

