from time import sleep
from picamera import PiCamera
freq = 60
buttonPress = False
# Build UI

# Camera Setup
camera = PiCamera(resolution=(1280, 720), framerate=30)
# Set ISO to the desired value
camera.iso = 100
# Wait for the automatic gain control to settle
sleep(2)
# Now fix the values
camera.shutter_speed = camera.exposure_speed
camera.exposure_mode = 'off'
g = camera.awb_gains
camera.awb_mode = 'off'
camera.awb_gains = g

#Awaiting Login

while True:
    # UI Update Loop

    # Picture Taking
    if buttonPress:
        camera.capture('input.jpg')

    #Buffer
    sleep(1/freq)