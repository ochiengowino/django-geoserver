
var map = L.map('map', {
    zoom: 7,
    center: [1.2921, 36.8219],
    // layers: [osm_layer, google_hybrid],
    // maxBounds: bounds,
    maxZoom: 20,
    minZoom: 2
});

var osm_layer= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var google_hybrid = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=y\u0026x={x}\u0026y={y}\u0026z={z}",
    { "attribution": "Google", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false }
);


var baseLayers = {
    "OSM": osm_layer,
    "Hybrid": google_hybrid
};

L.control.layers(baseLayers).addTo(map);

// var b1 = L.latLng(-33.382131, -13.271524);
// var b2 = L.latLng(44.678009, 58.172128);
// var bounds = L.latLngBounds(b1, b2);

// // var map1 = L.map('map').setView([1.2921, 36.8219], 8);

// map.fitBounds([
//     [-33.382131, -13.271524],
//     [44.678009, 58.172128]
// ]);
// var geojson1 = '{{view.shop|safe}}'
// var geojson_valid = JSON.parse(geojson1)
// var shops = L.geoJson(geojson_valid,{
//     pointToLayer: function(feature, latlong){
//         return L.marker(latlong)
//     }
// });
var shops = L.geoJson(null,{
    pointToLayer: function(feature, latlong){
        return L.marker(latlong)
    }
});
map.addLayer(shops)
var url = 'shop/api'
var url2 = "{% url 'shop_api' %}"

$.getJSON(url, function(data){
    shops.addData(data)
});


L.control.fullscreen(
    { "forceSeparateButton": false, "position": "topleft", "title": "Full Screen", "titleCancel": "Exit Full Screen" }
).addTo(map);

var locate_control = L.control.locate(
    {}
).addTo(map);


var mouse_position = new L.Control.MousePosition(
    { "emptyString": "Unavailable", "lngFirst": false, "numDigits": 5, "position": "topright", "prefix": "Mouse:", "separator": " | " }
);
mouse_position.options["latFormatter"] =
    function (num) { return L.Util.formatNum(num, 3) + ' º '; };;
mouse_position.options["lngFormatter"] =
    function (num) { return L.Util.formatNum(num, 3) + ' º '; };;
map.addControl(mouse_position);


var options = {
    position: "topleft",
    draw: {},
    edit: {},
}
// FeatureGroup is to store editable layers.
var drawnItems = new L.featureGroup().addTo(
    map
);
options.edit.featureGroup = drawnItems;
var draw_control = new L.Control.Draw(
    options
).addTo(map);
map.on(L.Draw.Event.CREATED, function (e) {
    var layer = e.layer,
        type = e.layerType;
    var coords = JSON.stringify(layer.toGeoJSON());
    layer.on('click', function () {
        alert(coords);
        console.log(coords);
    });
    drawnItems.addLayer(layer);
});
map.on('draw:created', function (e) {
    drawnItems.addLayer(e.layer);
});

var measure_control = new L.Control.Measure(
    { "position": "topright", "primaryAreaUnit": "sqmeters", "primaryLengthUnit": "meters", "secondaryAreaUnit": "acres", "secondaryLengthUnit": "miles" });
map.addControl(measure_control);

document.getElementById('export').onclick = function (e) {
    var data = drawnItems.toGeoJSON();
    var convertedData = 'text/json;charset=utf-8,'
        + encodeURIComponent(JSON.stringify(data));
    document.getElementById('export').setAttribute(
        'href', 'data:' + convertedData
    );
    document.getElementById('export').setAttribute(
        'download', "data.geojson"
    );
}



