<?php if (!defined('ABSPATH'))
    exit ?>

    <div id="final-form" class="j-grid-col">
        <h1>PDF-Zusammenfassung</h1>

        <j-preview v-if="screen!==0" :els="screens" :ind="screen" :lang="lang" @newel="screen=$event"></j-preview>

        <div class="j-grid">
            <div class="j-cell-50">
                <input id="name" type="text" placeholder="Vorname*" />
                <input id="phone" type="text" placeholder="Telefon*" />
                <div class="j-inline-field">
                    <label>Min Price</label>
                    <input type="text" :value="form.min"/>
                </div>
            </div>
            <div class="j-cell-50">

                <input id="last-name" type="text" placeholder="Nachname*" />
                <input id="email" type="text" placeholder="Emailadresse*" />
                <div class="j-inline-field">
                    <label>Max Price</label>
                    <input type="text" :value="form.max"/>
                </div>
            </div>
        </div>

        <div class="j-cell-100">
            <textarea name="" id="" cols="30" rows="10" placeholder="Ihre Nachricht"></textarea>
            <div class="but_wrap"></div>
        </div>
    </div>
