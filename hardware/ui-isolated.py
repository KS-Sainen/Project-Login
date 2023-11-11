from time import sleep
from datetime import datetime
from guizero import App, Text, PushButton, Drawing, Box, Picture
freq = 30
margin = 15
dM = margin * 2
aH = 420
aW = 800
clockH = 80
clockW = 450
mainH = aH-dM-clockH
mainW = 400
pictureW = aW-dM-mainW
UIfont="Helvetica"
textB = "#232323"
textW = "#f9fcff"
bgW = "#d9d9d9"
bgC = "#242528"
isButtonPress = False
def dummyFunc():
    return 0

# Build the UI
# Masters, [x,y]
# Grids
app = App(height=aH,width=aW,title="SADTS",layout="grid",bg=bgC)
marginR = Box(app,border=0,width=margin,height=margin,grid=[0,0],align="left")
clockGrid = Box(app,border=0,width=aW,height=clockH,grid=[1,1],layout="grid",align="left")
mainGrid = Box(app,border=0,width=aW,height=mainH,grid=[1,2],layout="grid",align="top")

# Clock + Admin Menu
clockMargin = Box(clockGrid,border=0,width=margin,height=margin,grid=[0,0],align="left")
clockMargin.bg = bgC
clockBox = Box(clockGrid,border=5,width=200,height=clockH,grid=[1,1],align="left")
clockBox.bg = bgW
timeText = Text(clockBox,size=24,font=UIfont,color=textB,align="left")

# More Grids
#picture = Picture(app, image="input.jpg",grid=[3,0],width=200,height=aH-dM)
mainMargin = Box(mainGrid,border=0,width=margin,height=margin,grid=[0,0],align="left")
mainMargin.bg = bgC
studentGrid = Box(mainGrid,border=5,width=mainW,height=mainH,grid=[1,1],layout="grid",align="top")
studentGrid.bg = bgW
mainMBox = Box(mainGrid,border=0,width=margin,height=mainH,grid=[2,1],layout="grid",align="left")
pictureGrid = Box(mainGrid,border=0,width=pictureW,height=mainH,grid=[3,1],layout="grid",align="left")

# Two Buttons
studentMargin = Box(studentGrid,border=0,width=margin,height=margin,grid=[0,0],align="left")
textCBox = Box(studentGrid,border=0,width=mainW-dM,height=40,grid=[1,1],align="left")
textConfr = Text(textCBox,size=18,font=UIfont,color=textB,text="Student Name : ")
fillerBox = Box(studentGrid,border=0,width=mainW-dM,height=margin,grid=[1,2],align="left")
fillerBox.bg = bgW
buttonBox = Box(studentGrid,border=0,width=mainW-dM,height=50,grid=[1,3],align="left",layout="grid")
buttonConfirm = PushButton(buttonBox,command=dummyFunc,text="Confirm",width=10,height=1,padx=5,pady=5,grid=[0,0])
buttonConfirm.bg = "#59a3f9"
buttonConfirm.font = UIfont
buttonConfirm.text_color = textW
buttonConfirm.text_size	= 16
fillerBox = Box(buttonBox,border=0,width=margin*2,height=50,grid=[1,0],align="left")
buttonReject = PushButton(buttonBox,command=dummyFunc,text="Reject",width=10,height=1,padx=5,pady=5,grid=[2,0])
buttonReject.bg = "#f95959"
buttonReject.font = UIfont
buttonReject.text_color = textW
buttonReject.text_size	= 16
studentGrid.height = mainH - dM
# Image Display and Overlay
pictureDisplay = Box(pictureGrid,border=5,width=pictureW-dM,height=mainH-dM,grid=[0,0],align="left")
pictureDisplay.bg = bgW

#Callbacks
def updateTime():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    timeText.value = current_time
timeText.repeat(1000,updateTime)

#Await Server login

#Main Loop
updateTime()
app.display()
