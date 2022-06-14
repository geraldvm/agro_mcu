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
 *  Created by Gerald V. Mc kenzie
 * 
 */
//USING ESP8266 WEMOS D1 Mini & R2

#include <Wire.h>

const int16_t I2C_MASTER = 0x42;
const int16_t I2C_SLAVE = 0x08;

#include "EspMQTTClient.h"


/**
 * 
 * NODDE RED
 */
 //MQTT SET_UP
EspMQTTClient client(
  "Apartamentos Blanco.com",
  "Tigo1234",
  "192.168.0.6");

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(115200);
}

// This function is called once everything is connected (Wifi and MQTT)
void onConnectionEstablished()
{
  client.subscribe("test/topic", [](const String & message){
	  if(message){
		  Serial.println(message);
	  }
  });
}

void loop()
{
  client.loop(); // must be called once per loop.
  delay(300);
}
