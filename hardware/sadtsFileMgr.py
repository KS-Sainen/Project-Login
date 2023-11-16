import time
import numpy as np
# Supported Commands :
# getEncodings() - reads encodings from a .npy file - requires an array to work
# getUpdateArr() - reads updateArr.txt
# getSZArr() - reads szArr.txt
# Note that updateImages() from sadtaUpdateImg will update all of the above

def getEncodings(arr):
    ret = []
    for i in arr:
        try:
            f = open("e"+str(i)+".npy","rb")
            ret.append(np.load(f))
            print("E"+str(i))
            f.close()
        except:
            print("FRE"+str(i))
    print("Loaded Encodings")
    return ret
def getUpdateArr():
    ret = []
    f = open("updateArr.txt","r")
    try:
        raw_text = f.read()
        raw_arr = raw_text.split(",")
        for j in raw_arr:
            ret.append(int(j))
        print(str(ret))
    except:
        print("update array error")
    f.close()
    return ret
def getSZArr():
    ret = []
    f = open("szArr.txt","r")
    try:
        raw_text = f.read()
        raw_arr = raw_text.split(",")
        for j in raw_arr:
            ret.append(int(j))
        print(str(ret))
    except:
        print("size array error")
    print("Loaded Arrays")
    f.close()
    return ret