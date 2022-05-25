#include <OneWire.h>
#include <DallasTemperature.h>

// Temperature Sensor Pin
const int tempPin = 9;

// Instance OneWire & DallasTemperature
OneWire oneWireObjeto(tempPin);
DallasTemperature sensorDS18B20(&oneWireObjeto);

// MAC ADDRESS DS18B20 sensor
//2887EA79A20103B2
DeviceAddress tempSensor = {0x28, 0x87, 0xEA, 0x79, 0xA2, 0x01, 0x03, 0xB2};

void setup() {
  // Iniciamos la comunicación serie
  Serial.begin(9600);
  // Iniciamos el bus 1-Wire
  sensorDS18B20.begin();
  // Sensor Resolution
  sensorDS18B20.setResolution(12);
  
}


void loop() {
  float temp = getTemperature();
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println(" C");

  delay(500);
}

float getTemperature(){
  if(sensorDS18B20.isConnected(tempSensor)){
    sensorDS18B20.requestTemperaturesByAddress(tempSensor);
    return sensorDS18B20.getTempC(tempSensor);
  }
  
 }
