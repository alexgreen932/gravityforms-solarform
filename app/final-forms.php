<?php if (!defined('ABSPATH')) exit ?>

<div class="j-grid-col">
    <h1>PDF-Zusammenfassung</h1>
    <div class="j-grid">
            <div class="j-cell-50">
    <h3>Nessary or required fieds</h3>
    <input type="text" placeholder="Vorname*" />
    <input type="text" placeholder="Telefon*" />
    <div class="j-inline-field">
        <label>Min Price</label>
        <input type="text" :value="form.min"/>
    </div>
    </div>
    <div class="j-cell-50">
    <h3>Nessary or required fieds</h3>
    <input type="text" placeholder="Nachname*" />
    <input type="text" placeholder="Emailadresse*" />
    <div class="j-inline-field">
        <label>Max Price</label>
        <input type="text" :value="form.max"/>
    </div>
    </div>
    </div>

    <div class="j-cell-100">
    <textarea name="" id="" cols="30" rows="10" placeholder="Ihre Nachricht"></textarea>
    <button>Absenden</button>
    </div>
</div>
