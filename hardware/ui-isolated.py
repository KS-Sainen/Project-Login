from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import face_recognition
import requests
from time import sleep
from datetime import datetime
from guizero import App, Text, PushButton, Drawing, Box, Picture
from picamera2 import Picamera2
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

#Serverwork
def getRoom(g,r):
    return "M"+str(g)+str(r)
room = 1
student = 0
em = 0
sz = [0,0,0,0]
updateArr = []
encodings = []
client = PocketBase('https://sadtsdatamanage.pockethost.io')
collection = "M64"
resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
#get picture 0 of every student in every room
for i in range(4):
    resultList = client.collection("M6"+str(room)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
    for j in resultList.items:
        encodings.append([])
        try:
            url = "http://sadtsdatamanage.pockethost.io/api/files/"+getRoom(6,room)+"/"+j.id+"/"+j.pictures[0]
            r = requests.get(url, allow_redirects=True)
            open('s'+str(student)+'.png', 'wb').write(r.content)
            updateArr.append(student)
        except:
            #print("No Image?")
            em += 1
        student += 1
    sz[room-1]=student
    room += 1
print("Students Image Checked\nEmpty Count : " + str(em) + "\nTotal Count : " + str(student))
indx = 0
#Load Encodings
for i in updateArr:
    try:
        f = open("e"+str(i)+".txt","r")
        raw_text = f.read()
        raw_arr = raw_text.split(",")
        for j in raw_arr:
            encodings[i].append(float(j))
        # for j in encodings:
        #     print(i)
        print("E"+str(i))
        f.close()
    except:
        print("FRE"+str(i))
    indx+=1
print("Loaded Encodings")

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
#pictureDisplay = Box(pictureGrid,border=5,width=pictureW-dM,height=mainH-dM,grid=[0,0],align="left")
#pictureDisplay.bg = bgW
pictureDisplay = Picture(pictureGrid,width=pictureW-dM,height=mainH-dM,grid=[0,0],align="left",image="/home/sainen/Downloads/Project-Login/hardware/fillerbg.png")

camera = Picamera2()
config = camera.create_preview_configuration({"size":(pictureW-dM,mainH-dM)})
camera.configure(config)
camera.start()
sleep(1)
#Callbacks
def updateTime():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    timeText.value = current_time
def updateImg():
    camera.capture_file("dispimage.png")
    pictureDisplay.image = "/home/sainen/Downloads/Project-Login/hardware/dispimage.png"
timeText.repeat(1000,updateTime)
pictureDisplay.repeat(100,updateImg)
#camera.capture_file("fillerbg.png")

#Await Server login

#Main Loop
updateTime()
app.display()
