<?php if (!defined('ABSPATH'))
    exit ?>

        <div id="final-form" class="j-grid-col">
            <h1>PDF-Zusammenfassung</h1>
            <j-preview v-if="screen!==0" :els="screens" :ind="screen" :lang="lang" @newel="screen=$event"></j-preview>

            <div class="j-grid-final">
                <input id="name" type="text" placeholder="Vorname*" v-model="form.name"/>
                <input id="last-name" type="text" placeholder="Nachname*" v-model="form.last_name"/>
                <input id="phone" type="tel" placeholder="Telefon*" v-model="form.tel"/>
                <input id="email" type="email" placeholder="Emailadresse*" v-model="form.email"/>
                <input id="address" type="input" placeholder="Adresse*" v-model="form.address"/>
                <div class="j-final-price">      
                    <div><span>Min Price</span> {{form.min}}</div>
                    <div><span>Max Price</span> {{form.max}}</div>
                    </div>
                <textarea name="" id="" cols="30" rows="10" placeholder="Ihre Nachricht" v-model="form.message"></textarea>
                <div class="but_wrap"></div>
                <!-- <textarea rows="10">{{textareaData()}}</textarea> 
                <textarea rows="10">{{finalData()}}</textarea>    -->
                
            </div>
        </div>
