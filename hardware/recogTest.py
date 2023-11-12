from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import face_recognition
import numpy as np
import requests
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
# authenticate as regular user
#authData = client.collection('users').auth_with_password('sadtsdatamanage@gmail.com', 'sadts@acsp');
#print(client.auth_store.token)
#print(client.auth_store.model.id)
resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
# print(resultList.items[0].pictures[3])
#print(client.auth_store.is_valid)

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

studentAns = -1
f = face_recognition.load_image_file("dispimage.png")
face_locations = face_recognition.face_locations(f)
face_encodings = face_recognition.face_encodings(f, face_locations)
dist = 0.69420
for face_encoding in face_encodings:
    # See if the face is a match for the known face(s)
    matches = []
    face_distances = []
    matches.append(face_recognition.compare_faces(encodings, face_encoding))
    face_distances.append(face_recognition.face_distance(encodings, face_encoding))
    name = "None"
    if True in matches:
        studentAns = matches.index(True)
    else:
        studentAns = np.argmin(face_distances)
        #dist = face_distances[studentAns]
studentAns = updateArr[studentAns]
def getRoom(x):
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
roomAns = getRoom(studentAns)
indexAns = getIndex(studentAns,roomAns)
print("saa! saa! mikkoku da! sensei ni itte yaro!")
print("Student#"+str(studentAns))
print("Room : " + str(roomAns) + " DB Order : " + str(indexAns))
print("Nearness : " + str(dist))
print("horahora konna ni warui yatsura ga hi・fu・mi・yo")