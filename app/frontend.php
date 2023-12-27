<?php if (!defined('ABSPATH')) exit;
//note in admin panel
if ( is_admin() ) {
    echo '<br/><strong>' .  esc_html__( 'Fields are not editable', 'gf-solarform' ) . '</strong>' ;
}
?>

<div id="app">
    <input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" :value="textareaData()"/>
    <?php if ( !is_admin() ): ?>
        <div v-if="!ready" class="preloader">
            <div class="custom-loader"></div>
        </div>
        <div v-if="screen==42">
            данные записались в скрытое поле, сюда по идеи надо что-то вывести, и я так понял ГФ поддерживает многостраничный
            режим, на демо пока одна потому если можно изменяем надпись на кнопке на дальше
        </div>
        <div v-if="screen!==42">
            <transition name="custom-classes-transition" enter-active-class="fade-in" leave-active-class="fade-out">
                <div v-if="screen!==0" class="j-reset" @click.prevent="screen=0">{{lang.reset}}</div>
            </transition>
            <div class="j-grid">
                <div class="j-map">
                    <template v-if="screen==0 && screens">
                        <h3>{{screens[0].title}}</h3>
                        <p>{{screens[0].des}}</p>
                        <select v-model="lang_current" @change="langCurrent()">
                            <option value="0">Deutsch</option>
                            <option value="1">English</option>
                        </select>
                    </template>
    
                    <g-map :scr="screen" :lang="lang" @newel="screen=$event"></g-map>
                </div>
    
                <template v-if="screen!==0">
                    <div class="j-data">
                        <j-preview v-if="screen!==0" :els="screens" :ind="screen" :lang="lang"
                            @newel="screen=$event"></j-preview>
                        <div class="data-sell" v-for="(el, index) in screens" :key="el">
                            <transition name="custom-classes-transition" enter-active-class="fade-in-bottom">
                                <div v-if="screen==index">
                                    <h3>{{el.title}} <span class="step">{{index}}/7</span></h3>
                                    <p>{{el.des}}</p>
                                    <template v-if="index==1">
                                        <input type="text" v-model="el.value" :placeholder="el.name" />
                                    </template>
                                    <template v-if="index==2">
                                        <select v-model="el.value">
                                            <option v-for="op in roof_types">{{op}}</option>
                                        </select>
                                        <template v-if="el.value=='Gable'">
                                            <label><input type="checkbox" v-model="form.sides_2">Use 2 sides of the
                                                roof</label>
                                        </template>
                                    </template>
                                    <template v-if="index==3">
                                        <select v-model="el.value">
                                            <option v-for="op in angle">{{op}}</option>
                                        </select>
                                        <div class="inline">
                                            <label>{{el.title2}}</label>
                                            <input type="number" v-model="el.value">
                                        </div>
                                    </template>
                                    <template v-if="index==4">
                                        <select v-model="el.value">
                                            <option v-for="op in angle">{{op}}</option>
                                        </select>
                                        Здесь не совсем понятно и надо подумать как сделать
                                    </template>
                                    <template v-if="index==5">
                                        <select v-model="el.value">
                                            <option v-for="op in hot_water">{{op}}</option>
                                        </select>
                                    </template>
                                    <template v-if="index==6">
    
                                        <select v-model="el.value">
                                            <option v-for="op in heating">{{op}}</option>
                                        </select>
    
                                    </template>
                                    <template v-if="index==7">
                                        <div class="inline">
                                            <label>{{el.title2}}</label>
                                            <input type="text" v-model="form.count">
                                        </div>
    
                                        {{el.title3}}
                                        <select v-model="el.value">
                                            <option v-for="op in price">{{op}}</option>
                                        </select>
                                        <button class="j-but" :disabled="!el.value" @click.prevent="screen=42">
                                            <i class="fas fa-chart-line"></i></i>
                                            {{el.title5}}
                                            <i class="fas fa-angle-double-right"></i>
                                        </button>
    
                                    </template>
                                    <button v-if="index!==7" class="j-but" :disabled="!el.value"
                                        @click.prevent="screen=index+1">{{lang.further}}</button>
                                </div>
                            </transition>
                        </div>
    
                    </div>
                </template>
                <g-result :el="screens" :res="result" @newel="result=$event"></g-result>
            </div>
        </div>
        </div>
    <?php endif; ?>





<script type="application/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=key_api&libraries=places,geometry"></script>
<script src="<?php echo GFSFI_ASSETS . 'js/vue.js' ?>"></script><!-- dev mode -->  
<script src="<?php echo GFSFI_APP_URL . 'app.js' ?>" type="module"></script>

