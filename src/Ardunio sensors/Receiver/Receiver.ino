#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7,8);
//Four channel for transmitters
const byte address[6] = "00001"; 
const byte address1[6] = "00002"; 
const byte address2[6] = "00003"; 
const byte address3[6] = "00004"; 

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.openReadingPipe(1, address1);
  radio.openReadingPipe(2, address2);
  radio.openReadingPipe(3, address3);
  radio.setPALevel(RF24_PA_MIN);//Power Amplifier level
  radio.startListening();
}

void loop() {
  //Channel 1
  if (radio.available(address))
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
  //Channel 2
  if (radio.available(address1))
  {
    float trans1[4] = {};
    for (int i=0; i<4; i++)
    {
      radio.read(&trans1[i], sizeof(trans1[i]));
      delay(600);
    }
    Serial.print(trans1[0]);
    Serial.print(",");
    Serial.print(trans1[1]);
    Serial.print(",");
    Serial.print(trans1[2]);
    Serial.print(",");
    Serial.print(trans1[3]);
    Serial.print("\n");
  }
  //Channel 3
  if (radio.available(address2))
  {
    float trans2[4] = {};
    for (int i=0; i<4; i++)
    {
      radio.read(&trans2[i], sizeof(trans2[i]));
      delay(600);
    }
    Serial.print(trans2[0]);
    Serial.print(",");
    Serial.print(trans2[1]);
    Serial.print(",");
    Serial.print(trans2[2]);
    Serial.print(",");
    Serial.print(trans2[3]);
    Serial.print("\n");
  }
  //Channel 4
  if (radio.available(address3))
  {
    float trans3[4] = {};
    for (int i=0; i<4; i++)
    {
      radio.read(&trans3[i], sizeof(trans3[i]));
      delay(600);
    }
    Serial.print(trans3[0]);
    Serial.print(",");
    Serial.print(trans3[1]);
    Serial.print(",");
    Serial.print(trans3[2]);
    Serial.print(",");
    Serial.print(trans3[3]);
    Serial.print("\n");
  }
}
