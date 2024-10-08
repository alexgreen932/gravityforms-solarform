<?php
if (!defined('ABSPATH'))
    exit;


/**
 * For development only - it displays any data in var_dump in red bordered div
 *
 * @param string $var
 * @param boolean $die
 * @return void
 */
function d($var = 'test', $die = true)
{
    echo '<div style="border: red solid 1px; padding:20px; margin:20px; background:#fff">';
    echo '<h3>Func var_dump for development and debugging only!</h3>';
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
    echo '</div>';
    if ($die) {
        wp_die();
    }
}



/**
 * Details view hook
 */
add_action('gform_entry_detail', 'add_to_details', 10, 2);
function add_to_details($form, $entry)
{
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
}

/**
 * replaces json with data via foreach
 */
add_filter('gform_entries_primary_column_filter', function ($column_value, $form_id, $field_id, $entry, $query_string, $edit_url, $field_value) {
    $data = json_decode($entry[1]);
    $html = '';
    $html .= '<div class="j-inline-field">';
    $html .= '<label>Name:</label>';
    $html .= $data->Vorname . ' ' . $data->Name;
    $html .= '</div>';

    $html .= '<div class="j-inline-field">';
    $html .= '<label>Dachfläche:</label>';
    $html .= $data->Dachfläche . 'm²';
    $html .= '</div>';

    $html .= '<div class="j-inline-field">';
    $html .= '<label>Min/Max:</label>' . $data->Min . '/' .$data->Max;
    $html .= '</div>';

    // $html .= get_current_screen()->base;
    return $html;
}, 10, 7);

// Heizung: arr[6].value,
// Jahresverbrauch: arr[7].value,
// Min: this.form.min,
// Max: this.form.max,
// : this.form.name,
// : this.form.last_name,
// Telefon: this.form.tel,
// Mail: this.form.email,
// Total: this.form.count_total,
// Ort: this.form.town,
// Straße: this.form.street,
// Hausnummer: this.form.house,
// PLZ: this.form.post_code,
// Nachricht: this.form.message,

