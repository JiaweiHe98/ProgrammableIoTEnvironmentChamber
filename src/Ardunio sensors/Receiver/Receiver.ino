#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7,8);
const byte address[6] = "123456"; 

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MIN);//Power Amplifier level
  radio.startListening();
}

void loop() {
  if (radio.available())
  {
    float trans[4] = {};
    for (int i=0; i<4; i++)
    {
      radio.read(&trans[i], sizeof(trans[i]));
      delay(600);
    }
    Serial.print(trans[0]);
    Serial.print(",");
    Serial.print(trans[1]);
    Serial.print(",");
    Serial.print(trans[2]);
    Serial.print(",");
    Serial.print(trans[3]);
    Serial.print("\n");
  }

}
