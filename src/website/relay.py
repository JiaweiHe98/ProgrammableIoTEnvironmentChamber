import serial
import time

Arduino = serial.Serial('/dev/cu.usbserial-141240', 115200)

states = [0, 0, 0, 0, 0, 0, 0, 0]

isChanged = False

while True:

    with open("relay.txt", "r") as relays:
        relay_states = relays.readlines()

        for line_number in range(8):

            try:
                relay_state = int(relay_states[line_number])

                if relay_state != states[line_number]:
                    states[line_number] = relay_state
                    isChanged = True

            except:
                print('input error!')

    if isChanged:

        data_to_write = ''

        for i in states:
            data_to_write += str(i) + ' '

        Arduino.write(data_to_write.encode('ascii'))

        isChanged = False

        print(data_to_write.encode('ascii'))

    time.sleep(0.5)