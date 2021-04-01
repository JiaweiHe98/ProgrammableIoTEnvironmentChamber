import serial
import time
ser = serial.Serial('/dev/cu.usbserial-1412240', 9600)
ser.flushInput()

while True:
    try:
        ser_bytes = ser.readline()
        print(ser_bytes)
        with open("index.txt","w") as f:
            ser_bytes = ser_bytes.decode('utf-8')
            print(ser_bytes)
            f.write(ser_bytes)
    except:
        print("Failed to read")
        break

