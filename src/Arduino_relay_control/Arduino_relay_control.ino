// Channel number to pin
int ch1 = 5;
int ch2 = 6;
int ch3 = 7;
int ch4 = 8;
int ch5 = 9;
int ch6 = 10;
int ch7 = 11;
int ch8 = 12;


// Store the states of each channel
int states[8] = {false, false, false, false, false, false, false, false};

// Store the pins of each channel
int pins[8] = {ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8};


void setup() {
  // opens serial port, sets data rate to 115200 bps
  Serial.begin(115200); 

  // Initialize output pin
  pinMode(ch1, OUTPUT);
  pinMode(ch2, OUTPUT);
  pinMode(ch3, OUTPUT);
  pinMode(ch4, OUTPUT);
  pinMode(ch5, OUTPUT);
  pinMode(ch6, OUTPUT);
  pinMode(ch7, OUTPUT);
  pinMode(ch8, OUTPUT);

  digitalWrite(ch1, HIGH);
  digitalWrite(ch2, HIGH);
  digitalWrite(ch3, HIGH);
  digitalWrite(ch4, HIGH);
  digitalWrite(ch5, HIGH);
  digitalWrite(ch6, HIGH);
  digitalWrite(ch7, HIGH);
  digitalWrite(ch8, HIGH);

}

void loop() {
  // Updating states for each channel
  for (int i = 0; i < 8; i++) {
    if (states[i]) {
      digitalWrite(pins[i], LOW);
    } else {
      digitalWrite(pins[i], HIGH);
    }
  }

  //Receive settings
  if (Serial.available() > 0) {
    receiveStates();
  }
}

// For receiving new instructions from serial port
void receiveStates() {
  for (int i = 0; i < 8; i++) {
    if (Serial.parseInt()) {
      states[i] = true;
    } else {
      states[i] = false;
    }
  }

  // Flush out the remaining bytes in serial buffer
  bufferFlush();
}

//Flush the remaining garbage information in serial buffer
void bufferFlush() {
  while(Serial.available() > 0) {
    char t = Serial.read();
  }
}
