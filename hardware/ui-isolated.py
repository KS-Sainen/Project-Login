from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import numpy as np
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
#auth
try:
    authData = client.collection('users').auth_with_password('sadtsdatamanage@gmail.com', '12345');
    print(client.auth_store.token)
    print(client.auth_store.model.id)
except:
    print("Authentication Error")
collection = "M64"
resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
#get picture 0 of every student in every room
for i in range(4):
    resultList = client.collection("M6"+str(room)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
    for j in resultList.items:
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

#Camera
camera = Picamera2()
config = camera.create_preview_configuration({"size":(pictureW-dM,mainH-dM)})
camera.configure(config)
camera.start()
sleep(1)
#Callbacks
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
def updateTime():
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    timeText.value = current_time
def updateImg():
    camera.capture_file("dispimage.png")
    pictureDisplay.image = "/home/sainen/Downloads/Project-Login/hardware/dispimage.png"
def updateDispText():
    global detectR
    faceReg()
    detectR = client.collection(getRoom(6,roomAns)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
    detectR = (detectR.items)[indexAns]
    if isDetect:
        print("saa! saa! mikkoku da! " + str(indexAns) + "/" +  str(roomAns))
        textConfr.value = ("Student Name : " + detectR.name + " " + detectR.surname)
    else:
        textConfr.value = "Student Name : N/A"
timeText.repeat(1000,updateTime)
pictureDisplay.repeat(100,updateImg)
textConfr.repeat(2500,updateDispText)
buttonConfirm.update_command(confirmSelection)
buttonReject.update_command(invalidateSelection)
#camera.capture_file("fillerbg.png")

#Await Server login

#Main Loop
updateTime()
app.display()
