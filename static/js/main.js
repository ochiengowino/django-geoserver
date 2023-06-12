


var osm_layer= L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
var b1 = L.latLng(-33.382131, -13.271524);
var b2 = L.latLng(44.678009, 58.172128);
var bounds = L.latLngBounds(b1, b2);

// var map1 = L.map('map').setView([1.2921, 36.8219], 8);
var map = L.map('map',{
    zoom:8,
    center: [1.2921, 36.8219],
    layers: [osm_layer],
    maxBounds:bounds,
    maxZoom:20,
    minZoom:2
});
map.fitBounds([
    [-33.382131, -13.271524],
    [44.678009, 58.172128]
]);
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

