var osm_layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map('map', {
    zoom: 7,
    center: [1.2921, 36.8219],
    layers: [osm_layer],
    maxZoom: 20,
    minZoom: 2
});

// WMS Request
var wmsLayer = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
    layers: "Nzoia:Kenya_SRTM_layer",
    transparent: true
})
wmsLayer.addTo(map);
var wfsLayer = L.Geoserver.wfs("http://localhost:8080/geoserver/wfs", {
    layers: "Nzoia:Counties",
    style: {
        color: "black",
        fillOpacity: "0",
        opacity: "0.5",
    },
    onEachFeature: function (feature, layer) {
        // console.log(feature.properties)
        layer.bindPopup("this is popuped"+ feature.properties.fid);
    },
});
// wfsLayer.addTo(map);

var layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/wms", {
    layers: "Nzoia:Kenya_SRTM_layer",
    // style: `stylefile`,
});

layerLegend.addTo(map);