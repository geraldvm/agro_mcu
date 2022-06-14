/* 
**  Connect the ESP8266 unit to an existing WiFi access point
**  For more information see http://42bots.com
*/

#include <ESP8266WiFi.h>

// Replace these with your WiFi network settings
const char* ssid = "Apartamentos Blanco.com"; //replace this with your WiFi network name
const char* password = "Tigo1234"; //replace this with your WiFi network password

void setup()
{
  delay(1000);
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);

  Serial.println();
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("success!");
  Serial.print("IP Address is: ");
  Serial.println(WiFi.localIP());
}

void loop() {
}
