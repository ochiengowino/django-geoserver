
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



var kenya_srtm = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    layers: 'Nzoia:Kenya_SRTM_layer',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "SRTM layer"
});
kenya_srtm.addTo(map);

var kenya_counties = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs", {
    layers: "Nzoia:County",
});
// console.log(kenya_counties)
var root_url = 'http://localhost:8080/geoserver/wfs';

var defaultParameters = {

    service: 'WFS',
    version: '1.1.0',
    request: 'GetFeature',
    typeName: 'Nzoia:County',
    outputFormat: 'application/json',
    format_options: 'callback:getJson',
    SrsName: 'EPSG:4326'
};

var parametres = L.Util.extend(defaultParameters);

var URL = root_url + L.Util.getParamString(parametres);

var counties_layer = L.geoJson(null, {
    style: function (feature) {
        return {
            stroke: true,
            // fillColor: '#B04173',
            // fillOpacity: 2,
            color: '#000000',
            weight: 1,
        };
    },
    onEachFeature: function (feature, layer) {
    layer.bindPopup(`Name: ${feature.properties.COUNTY}`)
    // console.log(feature)
    }
});


$.ajax({
    type: 'GET',
    url: URL,
    // dataType: 'jsonp',
    dataType: 'json',
    jsonpCallback: 'getJson',
    success: function (response) {
        // console.log(response)
        counties_layer.addData(response)
        counties_layer.addTo(map)
    }
});
//  $.ajax('http://localhost:8080/geoserver/wfs', {
//     type: 'GET',
//     data: {
//         service: 'WFS',
//         version: '1.1.0',
//         request: 'GetFeature',
//         typename: 'Nzoia:County',
//         srsname: 'EPSG:4326',
//         outputFormat: 'text/javascript',
//     },
//     dataType: 'jsonp',
//     // jsonpCallback: 'callback:handleJson',
//     jsonp: 'format_options',
//     success: function(response){
//         selectedArea1.addData(response)
//         selectedArea1.addTo(map)
//     }
// });

//Geojson style file
// var myStyle = {
//     'color': 'red'
// }

// the ajax callback function
// function handleJson(data) {
//     selectedArea = new L.geoJson(data, {
//         style: myStyle,
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup(`Name: ${feature.properties.COUNTY}`)
//             // console.log(feature.properties)
//         }
//     }).addTo(map);
//     // map.fitBounds(selectedArea.getBounds());s
// }
// console.log(selectedArea)


var layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/wms", {
    layers: "Nzoia:Kenya_SRTM_layer",
    style: `Nzoia:srtm3`,
});

// layerLegend.addTo(map);
// var legend;

// $("#select-sld").change(function () {
//     var selectId = $("#select-sld option:selected").val();
//     var getSLD = [];

//     for (var i in data) {
//         if (data[i].id == selectId) {
//             getSLD += data[i].nom;
//             if (data[i].id != selectId) {
//                 return false;
//             }
//         }
//     };

//     secteur.setParams({ styles: getSLD });
//     console.log(secteur.wmsParams.styles);

//     $('#result-select-sld').html(getSLD);

//     if (legend instanceof L.Control) { map2.removeControl(legend); }


// });
var legend;
legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = [];
    div = L.DomUtil.create('div', 'info legend');
    var url = 'http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Nzoia:Kenya_SRTM_layer&STYLE=Nzoia:srtm3';
    div.innerHTML += '<img src=' + url + ' alt="legend" width="90" height="240">';

    return div;

};

legend.addTo(map);
var overlays = {
    "Kenya Counties": counties_layer,
    "kenya SRTM": kenya_srtm
}

L.control.layers(baseLayers, overlays).addTo(map);
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



