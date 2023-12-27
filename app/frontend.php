<?php if (!defined('ABSPATH'))
    exit;
//note in admin panel
if (is_admin()) {
    echo '<br/><strong>' . esc_html__('Fields are not editable', 'gf-solarform') . '</strong>';
}
?>

<div id="app">
    <input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" :value="textareaData()" />
    <?php if (!is_admin()): ?>
        <div v-if="!ready" class="preloader">
            <div class="custom-loader"></div>
        </div>
        <div v-if="screen==42">
            данные записались в скрытое поле, сюда по идеи надо что-то вывести, и я так понял ГФ поддерживает
            многостраничный
            режим, на демо пока одна потому если можно изменяем надпись на кнопке на дальше
        </div>
        <j-form></j-form>
    </div>
<?php endif; ?>





<script type="application/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6kg86tNbggcIdZ7yCJ5zqWzVVLfeQeug&libraries=places,geometry"></script>
<script src="<?php echo GFSFI_ASSETS . 'js/vue.js' ?>"></script><!-- dev mode -->
<script src="<?php echo GFSFI_APP_URL . 'app.js' ?>" type="module"></script>