#import module 
import ee

#intialize the google earth api
ee.Initialize()

#create image object
image = ee.Image('srtm90_v4')

#get the information on the image
# print(image.getInfo())

geometry = ee.Geometry.Rectangle([80, 26, 82, 28]) 



# Get a download URL for an image.
imageCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
imageCollection = imageCollection.mosaic()
url = imageCollection.getDownloadUrl({
    'scale': 30,
    'crs': 'EPSG:4326',
    'region': geometry.geometry().bounds()
})
print(url)