from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import face_recognition
import requests
def getRoom(g,r):
    return "M"+str(g)+str(r)
room = 1
student = 0
em = 0
client = PocketBase('https://sadtsdatamanage.pockethost.io')
updateArr = []
collection = "M64"
# authenticate as regular user
#authData = client.collection('users').auth_with_password('sadtsdatamanage@gmail.com', 'sadts@acsp');
#print(client.auth_store.token)
#print(client.auth_store.model.id)
resultList = client.collection("M64").get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
print(resultList.items[0].pictures[3])
#print(client.auth_store.is_valid)

#get picture 0 of every student in every room
for i in range(4):
    resultList = client.collection("M6"+str(room)).get_list(1, 50, {"filter": 'created >= "2022-01-01 00:00:00"'})
    for j in resultList.items:
        try:
            url = "http://sadtsdatamanage.pockethost.io/api/files/"+collection+"/"+j.id+"/"+j.pictures[0]
            r = requests.get(url, allow_redirects=True)
            open('s'+str(student)+'.png', 'wb').write(r.content)
            updateArr.append(student)
        except:
            print("No Image?")
            em += 1
        student += 1
    room += 1
print("Picture Retrieved\nEmpty Count : " + str(em) + "\nStudent Count : " + str(student))
print("Table to update : " + str(updateArr))
client.auth_store.clear()
encoding = []

for i in updateArr:
    image = face_recognition.load_image_file('s'+str(i)+'.png')
    encoding.append(face_recognition.face_encodings(image))
open("encodings.txt", 'w').write(str(encoding))
print("Updated Pictures")