import folium
from folium import plugins

#import module 
import ee

#intialize the google earth api
ee.Initialize()


m = folium.Map(location=[1.2921,36.8219],
               zoom_start=8
            #    tiles='Stamen Terrain'd
               )






# Add custom base maps to folium
basemaps = {
    'Google Maps': folium.TileLayer(
        tiles = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        attr = 'Google',
        name = 'Google Maps',
        overlay = True,
        control = True
    ),
    'Google Satellite': folium.TileLayer(
        tiles = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        attr = 'Google',
        name = 'Google Satellite',
        overlay = True,
        control = True
    ),
    'Google Terrain': folium.TileLayer(
        tiles = 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        attr = 'Google',
        name = 'Google Terrain',
        overlay = True,
        control = True
    ),
    'Google Satellite Hybrid': folium.TileLayer(
        tiles = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        attr = 'Google',
        name = 'Google Satellite',
        overlay = True,
        control = True
    ),
    'Esri Satellite': folium.TileLayer(
        tiles = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr = 'Esri',
        name = 'Esri Satellite',
        overlay = True,
        control = True
    )
}

# Add custom basemaps
# basemaps['Google Maps'].add_to(m)
basemaps['Google Satellite Hybrid'].add_to(m)


# Add a layer control panel to the map.
# m.add_child(folium.LayerControl())

#fullscreen
plugins.Fullscreen().add_to(m)

#GPS
plugins.LocateControl().add_to(m)

#mouse position
fmtr = "function(num) {return L.Util.formatNum(num, 3) + ' º ';};"
plugins.MousePosition(position='topright', separator=' | ', prefix="Mouse:",lat_formatter=fmtr, lng_formatter=fmtr).add_to(m)

#Add the draw 
plugins.Draw(export=True, filename='data.geojson', position='topleft', draw_options=None, edit_options=None).add_to(m)  

#Add measure tool 
plugins.MeasureControl(position='topright', primary_length_unit='meters', secondary_length_unit='miles', primary_area_unit='sqmeters', secondary_area_unit='acres').add_to(m)



# Define a method for displaying Earth Engine image tiles on a folium map.
# def add_ee_layer(self, ee_object, vis_params, name):
#     try:    
#         # display ee.Image()
#         if isinstance(ee_object, ee.image.Image):    
#             map_id_dict = ee.Image(ee_object).getMapId(vis_params)
#             folium.raster_layers.TileLayer(
#             tiles = map_id_dict['tile_fetcher'].url_format,
#             attr = 'Google Earth Engine',
#             name = name,
#             overlay = True,
#             control = True
#             ).add_to(self)



#     except:
#         print("Could not display {}".format(name))

m.save('fol1.html')