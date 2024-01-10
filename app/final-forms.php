<?php if (!defined('ABSPATH'))
    exit ?>

    <div id="final-form" class="j-grid-col">
        <h1>PDF-Zusammenfassung</h1>

        <j-preview v-if="screen!==0" :els="screens" :ind="screen" :lang="lang" @newel="screen=$event"></j-preview>

        <div class="j-grid">
            <div class="j-cell-50">
                <input id="name" type="text" placeholder="Vorname*" />
                <input id="phone" type="text" placeholder="Telefon*" />
            </div>
            <div class="j-cell-50">

                <input id="last-name" type="text" placeholder="Nachname*" />
                <input id="email" type="text" placeholder="Emailadresse*" />
                
            </div>
        </div>

        <div class="j-cell-100">
            <div class="j-final-price">      
                <div><span>Min Price</span> {{form.min}}</div>
                <div><span>Max Price</span> {{form.max}}</div>
                </div>
            <textarea name="" id="" cols="30" rows="10" placeholder="Ihre Nachricht"></textarea>
            <div class="but_wrap"></div>
        </div>
    </div>
