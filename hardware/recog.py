import face_recognition
import time
#Load every known image of each student from the DB + Array for every of their encodings
known_image = face_recognition.load_image_file("s.jpg")
student_encoding = face_recognition.face_encodings(known_image)[0]

#main loop
while True:
    #receive image from the camera
    unknown_image = face_recognition.load_image_file("input.jpg")
    #loop to compare every known face - 1st face only used
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
    #get the results -
    results = face_recognition.compare_faces(student_encoding, unknown_encoding)
    face = False
    indx = -1
    for n in results:
        if(n):
            #Output success
            face = True
            indx = results.index(n)
    if face:
        #Send the data, anyhow 
        print(indx)
    #Wait such that new image has been spawned/replaced
    time.sleep(0.25)





