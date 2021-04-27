import serial
import time

Arduino = serial.Serial('/dev/cu.usbserial-1412220', 115200)

power_set = [1, 1, 1, 1]

isChanged = False

while True:

    with open("light.txt", "r") as light_intensity:
        light_levels = light_intensity.readlines()

        for line_number in range(4):

            try:
                light_level = int(light_levels[line_number])

                if light_level != power_set[line_number]:
                    power_set[line_number] = light_level
                    isChanged = True
            except:
                print('input error!')


    if isChanged:

        data_to_write = ''

        for i in power_set:
            data_to_write += str(i) + ' '


        Arduino.write(data_to_write.encode('ascii'))

        isChanged = False

        print(data_to_write.encode('ascii'))

    time.sleep(0.5)



