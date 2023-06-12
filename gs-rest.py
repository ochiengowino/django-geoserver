# Import the library
from geo.Geoserver import Geoserver

# Initialize the library
geo = Geoserver('http://127.0.0.1:8080/geoserver', username='admin', password='geoserver')

# For creating workspace
# geo.create_workspace(workspace='demo')

# For uploading raster data to the geoserver
# geo.create_coveragestore(layer_name='kenya_lulc', path=r'data\kenya_lulc\Kenya_Sentinel2_LULC2016.tif', workspace='demo')

# For creating postGIS connection and publish postGIS table
geo.create_featurestore(store_name='counties1', workspace='demo', db='kenya_srtm', host='localhost', pg_user='postgres',
                        pg_password='geospatial')
geo.publish_featurestore(workspace='demo', store_name='counties1', pg_table='ken_counties')