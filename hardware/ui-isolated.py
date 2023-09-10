from time import sleep
from datetime import datetime
from guizero import App, Text, PushButton, Drawing, Box, Picture
freq = 30
margin = 20
dM = margin * 2
aH = 480
aW = 800
UIfont="Helvetica"
textB = "#232323"
textW = "#f9fcff"
bgW = "#d9d9d9"
isButtonPress = False
def dummyFunc():
    return 0

# Build the UI
# Masters
app = App(height=aH,width=aW,title="SADTS",layout="grid",bg="#242528")
clockBlock = Box(app,border=0,width=margin,height=margin,grid=[0,0])
clockBlock.bg = "#242528"
clockBlock = Box(app,border=0,width=450,height=margin,grid=[1,0])
clockBlock.bg = "#242528"
clockBox = Box(app,border=5,width=200,height=80,grid=[1,1],align="left")
clockBox.bg=bgW
clockBlock = Box(app,border=0,width=450,height=margin,grid=[1,2])
clockBlock.bg = "#242528"
box = Box(app,border=5,width=450,height=300,grid=[1,3],layout="grid")
box.bg=bgW

#Components
timeText = Text(clockBox,size=24,font=UIfont,color=textB,align="left")
#picture = Picture(app, image="input.jpg",grid=[3,0],width=200,height=aH-dM)
confrText = Text(box,text="Student Name:",size=24,grid=[0,0],font=UIfont,color=textB)
clockBlock = Box(box,border=0,width=200,height=50,grid=[1,0])
clockBlock.bg = bgW
# clockBlock = Box(box,border=0,width=225,height=50,grid=[0,1])
# clockBlock.bg = bgW
nameText = Text(box,size=24,grid=[0,1],font=UIfont,color=textB,text="Sainen420",align="left")
clockBlock = Box(box,border=0,width=200,height=margin,grid=[0,2])
clockBlock.bg = bgW
buttonConfirm = PushButton(box,command=dummyFunc,text="Confirm",width=10,height=1,padx=5,pady=5,grid=[0,3])
buttonConfirm.bg = "#59a3f9"
buttonConfirm.font = UIfont
buttonConfirm.text_color = textW
buttonConfirm.text_size	= 16
buttonReject = PushButton(box,command=dummyFunc,text="Reject",width=10,height=1,padx=5,pady=5,grid=[1,3])
buttonReject.bg = "#f95959"
buttonReject.font = UIfont
buttonReject.text_color = textW
buttonReject.text_size	= 16

#Callbacks
def updateTime():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    timeText.value = current_time
timeText.repeat(1000,updateTime)

#Await Server login

#Main Loop
app.display()