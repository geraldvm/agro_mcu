/*Arduino Slave I2C*/

#include <Wire.h>
#define ledPin 9
#define inPin A0

byte rcvData;
int potValue;

void setup()
{
  Serial.begin(115200);
  Wire.begin(0x14);

  /*Event Handlers*/
  Wire.onReceive(DataReceive);
  Wire.onRequest(DataRequest);
  
  rcvData = 255;
  pinMode(ledPin, OUTPUT);
}

void loop()
{
  potValue = analogRead(inPin);
  potValue = map(potValue, 0, 1023, 0, 255);\
}

void DataRequest(){
  Wire.write(potValue);
}

void DataReceive(int bitSize)
{
  while(Wire.available()) 
  {
    rcvData = Wire.read();
    Serial.println(rcvData);
    processIncomingMessage(rcvData);
  }
}

void processIncomingMessage(int message){
  if(message == 1){
    digitalWrite(ledPin, HIGH);
  }else if(message == 0){
    digitalWrite(ledPin, LOW);
  }
  
}