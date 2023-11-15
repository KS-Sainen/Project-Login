import face_recognition
import requests
import bcrypt
import numpy as np
import sadtsUpdateImg
from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
from time import sleep
from datetime import datetime
from guizero import App, Text, PushButton, Drawing, Box, Picture, TextBox
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
sz = []
updateArr = []
encodings = []
client = PocketBase('https://sadtsdatamanage.pockethost.io')
collection = "M64"
resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
#load updatearray and size array
indx=0
def readFiles():
    global updateArr
    global sz
    global encodings
    updateArr = []
    sz = []
    encodings = []
    f = open("updateArr.txt","r")
    try:
        raw_text = f.read()
        raw_arr = raw_text.split(",")
        for j in raw_arr:
            updateArr.append(int(j))
        print(str(updateArr))
    except:
        print("update array error")
    f.close()
    f = open("szArr.txt","r")
    try:
        raw_text = f.read()
        raw_arr = raw_text.split(",")
        for j in raw_arr:
            sz.append(int(j))
        print(str(updateArr))
    except:
        print("size array error")
    print("Loaded Arrays")
    f.close()
    #Load Encodings
    indx=0
    for i in updateArr:
        try:
            f = open("e"+str(i)+".npy","rb")
            encodings.append(np.load(f))
            # for j in encodings:
            #     print(i)
            print("E"+str(i))
            f.close()
        except:
            print("FRE"+str(i))
        indx+=1
    print("Loaded Encodings")
readFiles()
#Face Recognition
#Calculates the room and place in db of that room
def getRoomAns(x):
    if x == -1:
        return -1
    ret = 1
    for i in sz:
        if i > x:
            return ret
        ret += 1
    return 4
def getIndex(x,r):
    if x==-1:
        return -1
    if r==1:
        return x
    else:
        return abs(x-sz[r-2])
#Returns a record of the detected student
roomAns = 0
isDetect = False
detectR = {}
indexAns = 0
def faceReg():
    global roomAns
    global indexAns
    global isDetect
    studentAns = -1
    f = face_recognition.load_image_file("dispimage.png")
    face_locations = face_recognition.face_locations(f)
    face_encodings = face_recognition.face_encodings(f, face_locations)
    for face_encoding in face_encodings:
        # See if the face is a match for the known face(s)
        matches = []
        face_distances = []
        matches.append(face_recognition.compare_faces(encodings, face_encoding))
        face_distances.append(face_recognition.face_distance(encodings, face_encoding))
        if True in matches:
            studentAns = matches.index(True)
        else:
            studentAns = np.argmin(face_distances)
            #dist = face_distances[studentAns]
    if studentAns != -1:
        studentAns = updateArr[studentAns]
        roomAns = getRoomAns(studentAns)
        indexAns = getIndex(studentAns,roomAns)
        isDetect = True
    else:
        isDetect = False
        
#Returns a record of the detected student
roomAns = 0
isDetect = False
detectR = {}
indexAns = 0
def faceReg():
    global roomAns
    global indexAns
    global isDetect
    studentAns = -1
    f = face_recognition.load_image_file("dispimage.png")
    face_locations = face_recognition.face_locations(f)
    face_encodings = face_recognition.face_encodings(f, face_locations)
    for face_encoding in face_encodings:
        # See if the face is a match for the known face(s)
        matches = []
        face_distances = []
        matches.append(face_recognition.compare_faces(encodings, face_encoding))
        face_distances.append(face_recognition.face_distance(encodings, face_encoding))
        if True in matches:
            studentAns = matches.index(True)
        else:
            studentAns = np.argmin(face_distances)
            #dist = face_distances[studentAns]
    if studentAns != -1:
        studentAns = updateArr[studentAns]
        roomAns = getRoomAns(studentAns)
        indexAns = getIndex(studentAns,roomAns)
        isDetect = True
    else:
        isDetect = False
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
clockDiVBox = Box(clockGrid,border=0,width=margin*20,height=clockH,grid=[2,1],align="left")
clockMargin.bg = bgC
adminBox = Box(clockGrid,border=0,width=300,height=clockH,grid=[3,1],align="left",layout="grid")
adminBox.bg = bgC
adminButtonState = 0 #0 = open form, 1 = submit, 2 = close admin menu
passS = b'$2b$12$PAzoMIYWcJPTU4L8vVHfHO'
passH = b'$2b$12$PAzoMIYWcJPTU4L8vVHfHOr1APSL6Q7nUL4OLkQf41ijCONLSCGVq' #main password hash
adminButton = PushButton(adminBox,image="/home/sainen/Downloads/Project-Login/hardware/terminal.png",width=50,height=50,grid=[0,0])
adminButton.bg = bgW
adminInput = TextBox(adminBox,hide_text=True,width=15,grid=[1,0])
adminInput.bg = bgW
adminInput.text_size = 16
adminInput.hide()

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
buttonBox = Box(studentGrid,border=0,width=mainW-dM,height=180,grid=[1,3],align="left",layout="grid")
buttonConfirm = PushButton(buttonBox,command=dummyFunc,text="Confirm",width=10,height=1,padx=5,pady=5,grid=[0,0],align="left")
buttonConfirm.bg = "#59a3f9"
buttonConfirm.font = UIfont
buttonConfirm.text_color = textW
buttonConfirm.text_size	= 16
fillerBox = Box(buttonBox,border=0,width=margin*2,height=75-margin,grid=[1,0],align="left")
buttonReject = PushButton(buttonBox,command=dummyFunc,text="Reject",width=10,height=1,padx=5,pady=5,grid=[2,0],align="left")
buttonReject.bg = "#f95959"
buttonReject.font = UIfont
buttonReject.text_color = textW
buttonReject.text_size	= 16
studentGrid.height = mainH - dM
# Admin Controls
fillerBox = Box(buttonBox,border=0,width=margin,height=8,grid=[0,1],align="left")
dbRuleButton = PushButton(buttonBox,text="Apply DB Rules",width=15,height=1,padx=5,pady=5,grid=[0,2],align="left")
dbRuleButton.bg = "#59a3f9"
dbRuleButton.font = UIfont
dbRuleButton.text_color = textW
dbRuleButton.text_size	= 16
fillerBox = Box(buttonBox,border=0,width=margin,height=8,grid=[0,3],align="left")
imageUpdate = PushButton(buttonBox,text="Update Images",width=15,height=1,padx=5,pady=5,grid=[0,4],align="left")
imageUpdate.bg = "#59a3f9"
imageUpdate.font = UIfont
imageUpdate.text_color = textW
imageUpdate.text_size	= 16
imageUpdate.disable()
imageUpdate.hide()
dbRuleButton.disable()
dbRuleButton.hide()
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
def updateAdminButton():
    global adminButtonState
    global adminButton
    if adminButtonState==0:
        adminButton.image = "/home/sainen/Downloads/Project-Login/hardware/terminal.png"
        adminButton.color = bgW
    elif adminButtonState==1:
        adminButton.image = "/home/sainen/Downloads/Project-Login/hardware/check.png"
        adminButton.color="#59a3f9"
    else:
        adminButton.image = "/home/sainen/Downloads/Project-Login/hardware/close.png"
        adminButton.color="#f95959"
    adminButton.resize(50,50)
def onAdminButtonPress():
    global adminButtonState
    global adminInput
    if adminButtonState==0:
        adminButtonState=1
        adminInput.show()
    elif adminButtonState==1:
        #take the text then do stuff with it
        inputTxt = str.encode(adminInput.value)
        if adminInput.value == "":
            adminButtonState=0
            adminInput.hide()
        else:
            passC = passS + inputTxt
            adminInput.value = ""
            if bcrypt.checkpw(passC, passH):
                print("You're In!")
                adminInput.hide()
                imageUpdate.enable()
                imageUpdate.show()
                dbRuleButton.enable()
                dbRuleButton.show()
                adminButtonState=2
            else:
                print("nuh uh")
    else:
        imageUpdate.disable()
        imageUpdate.hide()
        dbRuleButton.disable()
        dbRuleButton.hide()
        adminButtonState=0
    updateAdminButton()
def invalidateSelection():
    global isDetect
    global textConfr
    isDetect = False
    textConfr.value = "Student Name : N/A"
def confirmSelection():
    global detectR
    global isDetect
    if isDetect:
        now = datetime.now()
        current_time = str(now.strftime("%Y-%m-%d %H:%M:%S.123Z"))
        minutes = 60*now.hour + now.minute
        detectR.created = detectR.created.strftime("%Y-%m-%d %H:%M:%S.123Z")
        detectR.updated = detectR.updated.strftime("%Y-%m-%d %H:%M:%S.123Z")
        if minutes >= (15*60 + 15) and (detectR.arrival_status == "late" or detectR.arrival_status == "present"):
            detectR.departure_time = current_time
        elif minutes >= (7*60 + 50):
            detectR.arrival_status = "late"
            detectR.arrival_time = current_time
        else:
            detectR.arrival_status = "present"
            detectR.arrival_time = current_time
        print(detectR.__dict__)
        client.collection("M64").update(detectR.id,detectR.__dict__)
        print("Time checked!")
        isDetect = False
def updateDispText():
    global detectR
    faceReg()
    if isDetect:
        detectR = client.collection(getRoom(6,roomAns)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
        detectR = (detectR.items)[indexAns]
        print("saa! saa! mikkoku da! " + str(indexAns) + "/" +  str(roomAns))
        textConfr.value = ("Student Name : " + detectR.name + " " + detectR.surname)
    else:
        textConfr.value = "Student Name : N/A"
isItUpdate = False
isDBUpdate = False
def onImageUpdatePress():
    global isItUpdate
    isItUpdate = True
    imageUpdate.bg = bgC
    imageUpdate.text = "Updating..."
def onDBUpdatePress():
    global isDBUpdate
    isDBUpdate = True
    dbRuleButton.bg = bgC
    dbRuleButton.text = "Updating..."
def doImageUpdate():
    global isItUpdate
    global imageUpdate
    if isItUpdate:
        sadtsUpdateImg.updateImages()
        readFiles()
        imageUpdate.bg = "#59a3f9"
        imageUpdate.text = "Update Images"
        isItUpdate = False
def doDBUpdate():
    global isDBUpdate
    global dbRuleButton
    if isDBUpdate:
        sadtsUpdateImg.applyDBRules()
        dbRuleButton.bg = "#59a3f9"
        dbRuleButton.text = "Apply DB Rules"
        isDBUpdate = False
adminButton.update_command(onAdminButtonPress)
textConfr.repeat(2500,updateDispText)
timeText.repeat(1000,updateTime)
pictureDisplay.repeat(100,updateImg)
buttonBox.repeat(100,doImageUpdate)
textCBox.repeat(100,doDBUpdate)
buttonConfirm.update_command(confirmSelection)
buttonReject.update_command(invalidateSelection)
imageUpdate.update_command(onImageUpdatePress)
dbRuleButton.update_command(onDBUpdatePress)
#camera.capture_file("fillerbg.png")

#Await Server login

#Main Loop
updateTime()
app.display()
