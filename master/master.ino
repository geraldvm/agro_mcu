/*  Node-RED and ESP32 MQTT Snoezelen Room
 * 
 * This code is property of Mckode Development
 * For information, please see
 * 
 * https://mckode.com
 * 
 * For information on hardware components and the wiring needed to 
 * run this sketch, please see our wiki on https://github.com/geraldvm/Snoezelen_project/
 * 
 *  
 *  Created by Kevin Zeledon, Gerald V. Mc kenzie
 * 
 */
//USING ESP8266 WEMOS D1 Mini & R2

#include "EspMQTTClient.h"
#include <Wire.h>

// I2C Variables
byte rcvData;
const int16_t I2C_SLAVE = 0x14;

// Defining MQTT Topics
const String topicTemperature = "Temperature";
const String topicHumidity = "Humidity";
const String topicIrrigation = "Irrigation";

// Defining interruptions
unsigned long previousInterruption = 0;
const int TIMER_INTERRUPT_FREQ = 10000;

// MQTT setup
EspMQTTClient client(
  "Apartamentos Blanco.com",
  "Tigo1234",
  "3.84.5.159",
  "mcu",
  "Rb63H7T8KMmi",
  "MCU",
  1883
);

void setup()
{
  Wire.begin(); // Join I2C as master
  Serial.begin(115200); // For debugging purposes
}

// This function is called once everything is connected (Wifi and MQTT)
void onConnectionEstablished()
{
  client.subscribe(topicIrrigation, [](const String & message){
    processMQTTMessage(message);
  });
}

void processMQTTMessage(String message){
  Serial.println("MQTT Incoming");
  if(message=="true"){
    sendI2CMessage(1);
  }else{
    sendI2CMessage(0);  
  }  
}

void sendI2CMessage(int message){
  Wire.beginTransmission(I2C_SLAVE);
  Serial.println("Sending I2C");
  Wire.write(message);
  Wire.endTransmission();
}

void loop()
{
  client.loop(); // must be called once per loop.
  delay(300);

  if(doTimerInterrupt()){
    readMeasuresFromSlave(topicTemperature);
    readMeasuresFromSlave(topicHumidity);
  }
}

bool doTimerInterrupt(){
  unsigned long currentTime = millis();
  if(currentTime-previousInterruption >= TIMER_INTERRUPT_FREQ){
    previousInterruption = currentTime;
    return true;
  }
  return false;
}

void readMeasuresFromSlave(String measure){
  Serial.println("I2C Request");
  Wire.requestFrom(I2C_SLAVE, 1);
  if(Wire.available()){
    rcvData = Wire.read();
    Serial.println("Sending measure to topic: " + measure);
    client.publish(measure, String(rcvData));
  }
  return;
}