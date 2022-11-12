#include <OneWire.h>
#include <DallasTemperature.h>
/* Change these values based on your calibration values */
#define soilWet 500   // Define max value we consider soil 'wet'
#define soilDry 750   // Define min value we consider soil 'dry'

// Temperature Sensor Pin
#define tempPin 9

// Sensor pins
#define sensorPower 7
#define moisturePin A0
#define relayPin 13
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
  pinMode(sensorPower, OUTPUT);
  pinMode(relayPin, OUTPUT);
  // Initially keep the sensor OFF
  digitalWrite(sensorPower, LOW);
  
  Serial.begin(9600);
  
}


void loop() {
  float temp = getTemperature();
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println(" C");
  moistureConditions();
  digitalWrite(relayPin, HIGH);
  delay(500);
  digitalWrite(relayPin, LOW);
  delay(500);
}

float getTemperature(){
  if(sensorDS18B20.isConnected(tempSensor)){
    sensorDS18B20.requestTemperaturesByAddress(tempSensor);
    return sensorDS18B20.getTempC(tempSensor);
  }
  
 }

 
void moistureConditions(){
  //get the reading from the function below and print it
  float moisture = readSensor();
  Serial.print("Analog Output: ");
  Serial.println(moisture);

  // Determine status of our soil
  if (moisture < soilWet) {
    Serial.println("Status: Soil is too wet");
  } else if (moisture >= soilWet && moisture < soilDry) {
    Serial.println("Status: Soil moisture is perfect");
  } else {
    Serial.println("Status: Soil is too dry - time to water!");
  }
  
  delay(1000);  // Take a reading every second for testing
          // Normally you should take reading perhaps once or twice a day
  Serial.println();
}

//  This function returns the analog soil moisture measurement
float readSensor() {
  digitalWrite(sensorPower, HIGH);  // Turn the sensor ON
  delay(10);              // Allow power to settle
  float val = analogRead(moisturePin);  // Read the analog value form sensor
  digitalWrite(sensorPower, LOW);   // Turn the sensor OFF
  return val;             // Return analog moisture value
}
