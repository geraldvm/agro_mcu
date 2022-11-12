/*  Node-RED and ESP8266 MQTT
 * 
 * This code is property of Mckode Development
 * For information, please see
 * 
 * https://mckode.com
 * 
 * For information on hardware components and the wiring needed to 
 * run this sketch, please see our wiki on https://github.com/geraldvm/agro_mcu
 * 
 *  
 *  Created by Kevin Zeledon, Gerald V. Mc kenzie
 * 
 */
//USING ESP8266 WEMOS D1 Mini & R2

#include "EspMQTTClient.h"
#include <Wire.h>

// I2C Variables
const int16_t I2C_SLAVE = 0x14;

// Defining MQTT Topics
const String topicMeasures = "Measures";
const String topicIrrigation = "Irrigation";

// Defining interruptions
unsigned long previousInterruption = 0;
const int TIMER_INTERRUPT_FREQ = 10000;


// MQTT setup
EspMQTTClient client(
  SECRET_SSID,
  SECRET_PASS,
  BROKER_IP,         // MQTT Broker server ip
  BROKER_USERNAME,   // Can be omitted if not needed
  BROKER_PASSWORD,   // Can be omitted if not needed
  CLIENT_NAME,       // Client name that uniquely identify your device
  BROKER_PORT        // The MQTT port, default to 1883. this line can be omitted
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
  Serial.println(message);
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
  // Defining measures variables
  byte temperature;
  byte humidity;

  client.loop(); // must be called once per loop.
  delay(300);

  if(doTimerInterrupt()){
    Serial.println("Requesting 2 bytes from I2C Slave");
    Wire.requestFrom(I2C_SLAVE, 2);
    if(Wire.available() == 2){
      temperature = Wire.read();
      humidity = Wire.read();
      sendMQTTMeasures(temperature, humidity);
    }else if (Wire.available() == 1){
      Serial.println("Only received 1 byte back");
    }else{
      Serial.println("There has been an error");
    }
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

byte readMeasuresFromSlave(int byteQuantity=1){
  byte rcvData;
  Serial.println("I2C Request");
  Wire.requestFrom(I2C_SLAVE, byteQuantity);
  if(Wire.available()){
    rcvData = Wire.read();
  }
  return rcvData;
}

void sendMQTTMeasures(byte temp, byte humidity){
  const String messageToSend = "["+String(temp)+","+String(humidity)+"]";
  Serial.println("Sending measures to MQTT");
  Serial.println(messageToSend);
  client.publish(topicMeasures, messageToSend);
  return;
}