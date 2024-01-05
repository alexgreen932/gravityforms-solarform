<?php
if (!defined('ABSPATH'))
    exit;

    //for dev
    function d( $var = 'test', $die = true  ) {
		echo '<div style="border: red solid 1px; padding:20px; margin:20px; background:#fff">';
		echo '<pre>';
		var_dump($var);
		echo '</pre>';
		echo '</div>';
		if ( $die ) {
			wp_die();
		}
	}

/**
 * hooks to display in backend in development, commented
 */
// Add custom column to entry list table
// add_filter('gform_entries_columns', 'add_custom_column');
// add_filter('gform_entries_column_values', 'populate_custom_column', 10, 3);
// add_action('gform_entry_detail', 'add_custom_section');

/**
 * Details view hook
 */
add_action( 'gform_entry_detail', 'add_to_details', 10, 3 );
function add_to_details( $form, $entry ) {
    d($entry);//dev
    // if ( $form['id'] == 1 ) {
        echo '<div>This hook is used to add additional information to the details page for an entry.</div>';
    // }
}

add_filter( 'gform_entries_column_filter', 'change_column_data', 10, 5 );
function change_column_data( $value, $form_id, $field_id, $entry, $query_string ) {
    d($entry);//dev
    //only change the data when form id is 1 and field id is 2
    // if ( $form_id != 1 && $field_id != 2 ) {
    //     return $value;
    // }
    // return "newdata";
}




function add_custom_column($columns)
{
    // d($columns);
    $columns['custom_json'] = 'Custom JSON';
    return $columns;
}

// Populate custom column with data

function populate_custom_column($value, $form, $field)
{
    if ($field['type'] === 'gf-solarform' && $field['id'] === 'your_field_id') {
        // Get JSON data from the entry
        $entry = GFAPI::get_entry($value['entry_id']);
        $json_data = isset($entry['your_field_id']) ? $entry['your_field_id'] : '';

        // Format JSON data for better readability
        $formatted_json = json_encode(json_decode($json_data), JSON_PRETTY_PRINT);

        return '<pre>' . esc_html($formatted_json) . '</pre>';
    }
    return $value;
}



// Add custom section to entry detail page

function add_custom_section($form_id, $entry)
{
    error_log('Entering add_custom_section function');
    ?>
        <div class="gform-entry-detail-section">
            <h3>Custom JSON Section</h3>
            <?php
            // Get JSON data from the entry
            $json_data = isset($entry['your_field_id']) ? $entry['your_field_id'] : '';

            // Format JSON data for better readability
            $formatted_json = json_encode(json_decode($json_data), JSON_PRETTY_PRINT);

            echo '<pre>' . esc_html($formatted_json) . '</pre>';
            ?>
        </div>
        <?php
        error_log('Exiting add_custom_section function');

}
