<?php if (!defined('ABSPATH'))
    exit;
//note in admin panel
if (is_admin()) {
    echo '<br/><strong>' . esc_html__('Fields are not editable', 'gf-solarform') . '</strong>';
}
?>

<div id="app">
    <input type="hidden" id="input_<?php echo $id ?>" name="input_<?php echo $id ?>" :value="finalData()"/>
    <?php if (!is_admin()): ?>
                        <div v-if="!ready" class="preloader">
                            <div class="custom-loader"></div>
                        </div>
                        <div v-show="screen==10">
                            <?php
                            include 'final-forms.php'
                                ?>
                        </div>
                        <template v-if="screen!==10">
                            <transition name="custom-classes-transition" enter-active-class="fade-in" leave-active-class="fade-out">
                                <div v-if="screen!==0" class="j-reset" @click.prevent="screen=0">{{lang.reset}}</div>
                            </transition>
                            <div class="j-grid">
                                <div class="j-map">
                                    <template v-if="screen==0 && screens">
                                        <h3>{{screens[0].title}}</h3>
                                        <p>{{screens[0].des}}</p>
                                    </template>
    
                                    <g-map :scr="screen" :lang="lang" :ind="screen" @newel="screen=$event"></g-map>
                                </div>
    
                                <template v-if="screen!==0">
                                    <div class="j-data">
                                        <j-preview v-if="screen!==0" :els="screens" :ind="screen" :lang="lang" @newel="screen=$event"></j-preview>
                                        <template v-for="(el, index) in screens" :key="el">
                                            <transition name="custom-classes-transition" enter-active-class="fade-in-bottom">
                                                <div class="data-block" v-if="screen==index">
                                                    <h3>{{el.title}} <span class="step">{{index}}/7</span></h3>
                                                    <div class="j-desc">{{el.des}}</div>
                                                    <template v-if="index==1">
                                                        <input type="number" v-model="el.value" :placeholder="el.name" />
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
                                                        <input type="range" min="0" max="90" v-model="el.value">
                                                    </template>
                                                    <template v-if="index==4">
                                                        <select v-model="el.value">
                                                            <option v-for="op in angle">{{op}}</option>
                                                        </select>
                                                        <!-- Здесь не совсем понятно и надо подумать как сделать -->
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
                                                        {{el.title3}}

                                                    <select v-model="el.value">
                                                        <option v-for="price in priceOptions" :key="price" :value="price">
                                                            {{ price }} cents
                                                        </option>
                                                    </select>
                                            
                                                        <!-- <button class="j-but" :disabled="!el.value" @click.prevent="screen=10; calc()"> -->
                                                        <button class="j-but" :disabled="!el.value" @click.prevent="screen=10; updateCalculation()">
                                                            <i class="fas fa-chart-line"></i></i>
                                                            {{el.title5}}
                                                            <i class="fas fa-angle-double-right"></i>
                                                        </button>
    
                                                    </template>
                                                    <div class="but_wrap">
                                                        <button v-if="index!==7" class="j-but" :disabled="!el.value"
                                                        @click.prevent="screen=index+1; calc_approximate_cost(index)">{{lang.further}}</button>
                                                    </div>
                                        
                                                </div>
                                            </transition>
                                        </template>
    
                                    </div>
                                </template>
                            </div>
                        </template>
                        </div>
    <?php endif; ?>


<script type="application/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD6kg86tNbggcIdZ7yCJ5zqWzVVLfeQeug&libraries=places,geometry"></script>
<script src="<?php echo GFSFI_ASSETS . 'js/vue.js' ?>"></script><!-- dev mode -->  
<script src="<?php echo GFSFI_APP_URL . 'app.js' ?>" type="module"></script>

