from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import face_recognition
from datetime import datetime
import requests
import time
import numpy as np
def getRoom(g,r):
    return "M"+str(g)+str(r)
room = 1
student = 0
em = 0
client = PocketBase('https://sadtsdatamanage.pockethost.io')
updateArr = []
collection = "M64"
# authenticate as regular user
try:
    authData = client.collection('users').auth_with_password('sadtsdatamanage@gmail.com', 'sadts@acsp');
    print(client.auth_store.token)
    print(client.auth_store.model.id)
except:
    print("Authentication Error")
resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
# print(resultList.items[0].pictures[3])
#print(client.auth_store.is_valid)

#get picture 0 of every student in every room
for i in range(4):
    resultList = client.collection("M6"+str(room)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
    for j in resultList.items:
        try:
            j.created = j.created.strftime("%Y-%m-%d %H:%M:%S.123Z")
            j.updated = j.updated.strftime("%Y-%m-%d %H:%M:%S.123Z")
            if j.arrival_status == "absent" or j.arrival_time=="":
                pass
            else:
                now = datetime.now()
                datestr = j.arrival_time
                print(datestr)
                dateNum = int(datestr[8:10])
                print("Day = "+str(dateNum))
                if dateNum != now.day:
                    j.arrival_status = "absent"
                    j.arrival_time = ""
                    client.collection("M64").update(j.id,j.__dict__)
        except:
            print("no date updating")
        try:
            url = "http://sadtsdatamanage.pockethost.io/api/files/"+getRoom(6,room)+"/"+j.id+"/"+j.pictures[0]
            r = requests.get(url, allow_redirects=True)
            time.sleep(0.1)
            open('s'+str(student)+'.png', 'wb').write(r.content)
            print(j.pictures[0])
            updateArr.append(student)
        except:
            print("No Image?")
            em += 1
        student += 1
    room += 1
print("Picture Retrieved\nEmpty Count : " + str(em) + "\nStudent Count : " + str(student))
print("Table to update : " + str(updateArr))
client.auth_store.clear()

for i in updateArr:
    try:
        image = face_recognition.load_image_file('s'+str(i)+'.png')
        encoding = face_recognition.face_encodings(image)[0]
        f = open("e"+str(i)+".npy", 'wb')
        np.save(f,encoding)
        f.close()
    except:
        print("Identification Error at student " + str(i))
print("Updated Pictures")