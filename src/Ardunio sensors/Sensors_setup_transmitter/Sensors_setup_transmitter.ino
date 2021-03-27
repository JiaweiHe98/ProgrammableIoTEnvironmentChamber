#include <LowPower.h>

#include <DHT.h>

#include <Wire.h>
#include <BH1750.h>

#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

BH1750 lightMeter;

//Rev-p
const int OutPin = A0;
const int TempPin = A2;
float zerowindvolts = 1.46;

//nRF
RF24 radio(7,8);//CE, CSN
const byte address[6] = "123456";

void setup() {
  
  Serial.begin(19200);
  dht.begin();

  Wire.begin();
  lightMeter.begin();

  radio.begin();
  radio.openWritingPipe(address);//000002
  radio.setPALevel(RF24_PA_MIN);//Power Amplifier level
  radio.stopListening();
}

void loop() 
{
    //Array to store the temperature&humidity and light intensity and wind speed sensors' data
    //Ten seconds per time and maximum storage is six per sensor
    float s[4][6] = {};
    for (int j=0; j<6; j++)
    {      
      //Temperature&Humidity sensor
      float h = dht.readHumidity();
      float t = dht.readTemperature(true);
      if (isnan(h)||isnan(t))
      {
        Serial.println("Failed to read from Temperature&Humidiy sensor"); 
      }
    
      //Light Intensity sensor
      float lux = lightMeter.readLightLevel();
      if (isnan(lux))
      {
        Serial.println("Failed to read from Light Intensity sensor");
      }
      
      //Wind Speed sensor
      float Vout = analogRead(A0)*(5/1023.0);
      float tempRawAD = analogRead(A2);
      float tempC = ((((float)tempRawAD*5.0)/1023.0) - 0.400)/0.0195;
      float windMPH = pow(((Vout - zerowindvolts)/(3.038517*pow(tempC, 0.115157)))/0.087288, 3.009364);
      if (isnan(Vout)||isnan(tempRawAD))
      {
        Serial.println("Failed to read from Wind Speed sensor");
        break;
      }
   
      s[0][j] = (float)h;
      s[1][j] = (float)t;
      s[2][j] = (float)lux;
      s[3][j] = (float)windMPH;
      
      delay(10000);
    }

  //Average calculations for data per minute
  float sum = 0;
  for (int j=0; j<6; j++)
  {
    sum += s[0][j];
  }
  float mean_h = sum/6;

  float sum1 = 0;
  for (int j=0; j<6; j++)
  {
    sum1 += s[1][j];
  }
  float mean_t = sum1/6;

  float sum2 = 0;
  for (int j=0; j<6; j++)
  {
    sum2 += s[2][j];
  }
  float mean_lux = sum2/6;

  float sum3 = 0;
  for (int j=0; j<6; j++)
  {
    sum3 += s[3][j];
  }
  float mean_windMPH = sum3/6;
 
  //Send data to receiver
  float trans[4] = {};
  trans[0] = mean_h;
  trans[1] = mean_t;
  trans[2] = mean_lux;
  trans[3] = mean_windMPH;
  for (int i=0; i<4; i++)
  {
    radio.write(&trans[i], sizeof(trans[i]));
    delay(500);
  }

  //Sleep for 20 mins then wake up
  for (int i=0; i<150; i++)
  { 
    LowPower.idle(SLEEP_8S, ADC_OFF, TIMER2_OFF, TIMER1_OFF, TIMER0_OFF, SPI_OFF, USART0_OFF, TWI_OFF);
  }  

  //Serial output
  Serial.print("Humidity:");
  Serial.print(mean_h,2);
  Serial.print("%");
  Serial.print("  Temperature:");
  Serial.print(mean_t,2);
  Serial.print("F");

  Serial.print(" Light intensity:");
  Serial.print(mean_lux,2);
  Serial.print("lx");

  Serial.print(" WindSpeed:");
  Serial.print(mean_windMPH,2);
  Serial.print("MPH\n");
}
