from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
import face_recognition
import requests

f = open("e2.txt","r")
encodings = []
try:
    raw_text = f.read()
    raw_arr = raw_text.split(",")
    for i in raw_arr:
        encodings.append(float(i))
    for i in encodings:
        print(i)
    print("Test Pass")
except:
    print("File Reading Failed")