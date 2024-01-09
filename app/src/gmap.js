const template = `
    <div class="inline">
        <input v-if="ind==0" id="autocompleteInput" type="text">
        <input v-if="ind!==0"  id="autocompleteInput" class="stand_alone" type="text">
        <button v-show="scr==0" class="j-but j-but-map" @click.prevent="goTo()">{{lang.show}}</button>
    </div> 
    
    <div v-show="scr!==0" id="map_canvas2"></div>

`

export default {
    template,
    props: ['el','scr', 'ind', 'lang'],
    emits: ['newel'],
    data() {
        return {
            ins:null,
            options: {
                zoom: 20,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                // center: '',
                center: new google.maps.LatLng(50.7170247,7.0911417,17)
            },
        }
    },
    methods: {
        goTo(){
            this.$emit('newel', 1);
        },
        initAutocomplete: function () {
            var self = this;
            var autocompleteInput = document.getElementById("autocompleteInput");
            var autocomplete = new google.maps.places.Autocomplete(autocompleteInput);
            autocomplete.setComponentRestrictions({
                country: ["de"],
            });
            //! map mobile resize
            // google.maps.event.addDomListener(window, "resize", function() {
            //     var center = map.getCenter();
            //     google.maps.event.trigger(map, "resize");
            //     map.setCenter(center); 
            // });

            autocomplete.addListener("place_changed", function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                } else {
                    if (self.currentLocation) {
                        self.currentLocation.setMap(null);
                        self.map.setZoom(20);
                    }
                    self.currentLocation = new google.maps.Marker({
                        position: place.geometry.location,
                        id: "currentLocation",
                       // icon: "https://mt.googleapis.com/vt/icon/name=icons/onion/SHARED-mymaps-pin-container_4x.png,icons/onion/1899-blank-shape_pin_4x.png&highlight=0288D1&scale=2.0",
                        map: self.map.setZoom(20)
                    });
                    self.map.setZoom(20);
                }
                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    self.map.fitBounds(place.geometry.viewport);
                    self.map.setZoom(20);
                } else {
                    self.map.setCenter(place.geometry.location);
                    self.map.setZoom(20); 
                }
            });
        },
        getCurrentZoom: function () {
            var self = this;
            google.maps.event.addListener(self.map, "idle", function () {
                self.currentZoom = self.map.zoom(20);
            });
        },
        centerMapToMarker: function (e) {
            var id = e.target.dataset.id;
            for (var i = 0; i < this.visibleMarkers.length; i++) {
                if (this.visibleMarkers[i].id == id) {
                    var thisMarker = this.visibleMarkers[i];
                    this.map.panTo(thisMarker.getPosition());
                    this.map.setZoom(20);
                    return false;
                }
            }
        }
    
    },
    mounted: function () {
        this.map = new google.maps.Map(
            document.getElementById("map_canvas2"),
            this.options
        );
        this.initAutocomplete();
    }


}