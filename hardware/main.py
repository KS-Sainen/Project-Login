import guizero
from time import sleep
from datetime import datetime
from picamera import PiCamera
from guizero import App, Text, PushButton, Drawing, Box, Picture
freq = 30
margin = 10
dM = margin * 2
aH = 480
aW = 800
UIfont="Helvetica"
textB = "#232323"
textW = "#f9fcff"
bgW = "#d9d9d9"
isButtonPress = false
def dummyFunc():
    return 0

# Build the UI
# Masters
app = App(height=aH,width=aW,title="SADTS",layout="grid",bg="#242528")
box = Box(app,border=5,width=600,height=400,grid=[0,1],layout="grid",bg=bgW)
clockBox = Box(app,border=5,width=125,height=80,grid=[0,0],bg=bgW)
#Components
timeText = Text(clockBox,size=16,align="middle",font=UIfont,text_color=textB)
picture = Picture(app, image="input.jpg",grid=[3,0],width=200,height=aH-dM)
confrText = Text(box,text="Student Name",size=16,grid=[0,0],align="center",font=UIfont,text_color=textB)
nameText = Text(box,size=14,grid=[0,1],font=UIfont,text_color=textB)
buttonConfirm = PushButton(box,command=dummyFunc,text="Confirm",grid=[0,2],bg="#59a3f9",font=UIfont,text_color=textW)
buttonReject = PushButton(box,command=dummyFunc,text="Reject",grid=[2,2],bg="#f95959",font=UIfont,text_color=textW)

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

#Await Server login

#Main Loop
while True:
    #Update UI
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    timeText.text = current_time
    #Update Name (if there's any)
    app.display()
    #Take Image and send it to Face Recognition
    if isButtonPress:
        camera.capture('input.jpg')
        
    #Update frequency
    sleep(1/freq)
