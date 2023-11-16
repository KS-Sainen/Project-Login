from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import face_recognition
from datetime import datetime
import requests
import time
import numpy as np
def getStrList(arr):
    res = ""
    sz = 0
    for i in arr:
        sz += 1
        res += str(i)
        if sz < len(arr):
            res += ","
    return res
def updateImages():
    room = 1
    student = 0
    em = 0
    client = PocketBase('https://sadtsdatamanage.pockethost.io')
    updateArr = []
    sz = [0,0,0,0]
    collection = "M64"
    resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})

    #get picture 0 of every student in every room
    for i in range(4):
        resultList = client.collection("M6"+str(i+1)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
        for j in resultList.items:
            try:
                url = "http://sadtsdatamanage.pockethost.io/api/files/"+"M"+str(6)+str(i+1)+"/"+j.id+"/"+j.pictures[0]
                r = requests.get(url, allow_redirects=True)
                time.sleep(0.1)
                open('s'+str(student)+'.png', 'wb').write(r.content)
                print(j.pictures[0])
                updateArr.append(student)
            except:
                print("No Image?")
                em += 1
            student += 1
        sz[room-1]=student
        room += 1
    print("Picture Retrieved\nEmpty Count : " + str(em) + "\nStudent Count : " + str(student))
    print("Table to update : " + str(updateArr))
    client.auth_store.clear()

    f = open("updateArr.txt","w")
    f.write(getStrList(updateArr))
    f = open("szArr.txt","w")
    f.write(getStrList(sz))

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
def applyDBRules():
    client = PocketBase('https://sadtsdatamanage.pockethost.io')
    room = 1
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
                    #print(datestr)
                    dateNum = int(datestr[8:10])
                    monNum = int(datestr[5:7])
                    #print("Day = "+str(dateNum))
                    if dateNum != now.day or monNum != now.month:
                        j.arrival_status = "absent"
                        j.arrival_time = ""
                        j.departure_time = ""
                        client.collection("M6"+str(room)).update(j.id,j.__dict__)
            except:
                print("ERR")
        room += 1
    print("Applied database rules")
