/*  Node-RED and ESP8266 MQTT Light IoT
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
//USING ESP8266 LOLIN V3
#include "EspMQTTClient.h"
#include "esp8266_authentication.h"



/**
 * 
 * NODDE RED
 */
EspMQTTClient client(
  SECRET_SSID,
  SECRET_PASS,
  BROKER_IP,         // MQTT Broker server ip
  BROKER_USERNAME,   // Can be omitted if not needed
  BROKER_PASSWORD,   // Can be omitted if not needed
  CLIENT_NAME,       // Client name that uniquely identify your device
  BROKER_PORT        // The MQTT port, default to 1883. this line can be omitted
);


#define btn_one D1                        //switch pin
#define btn_second D2                     //switch pin
#define btn_third D3                      //switch pin
#define dimmer A0                         //potentiometer pin
#define ledPin D4     
int dim =0;
int sw_one= 0;
int sw_two= 0;
int sw_three= 0;
bool btn_state = false;
int pwm_value= 0;


// SUBSCRIBES TOPICS
String sub_btn_a= "iot/light/client/btn_c"; //ON-OFF DEVICE : Boolean
String sub_pwm_a= "iot/light/client/pwm/c"; //DIMMER VALUE : String
void setup() {
  Serial.begin(115200); 
  //Botones de selección de luces
  pinMode(btn_one,INPUT);
  pinMode(btn_second,INPUT);
  pinMode(btn_third,INPUT);
  pinMode(ledPin, OUTPUT);
  
  Serial.println("START");
  // Optionnal functionnalities of EspMQTTClient :
  client.enableDebuggingMessages(); // Enable debugging messages sent to serial output
  client.enableHTTPWebUpdater();    // Enable the web updater. 
                                    // User and password default to values of MQTTUsername 
                                    // and MQTTPassword. These can be overrited with 
                                    // enableHTTPWebUpdater("user", "password").
  
}


// This function is called once everything is connected (Wifi and MQTT)
// WARNING : YOU MUST IMPLEMENT IT IF YOU USE EspMQTTClient
void onConnectionEstablished()
{
  // Execute delayed instructions
  client.executeDelayed(5 * 1000, []() {
    //btn_reading();
    //Serial.println("TESTING!!");
  });
  client.subscribe(sub_btn_a, [](const String & btn_data) {
    setStatus(btn_data);
  });
  client.subscribe(sub_pwm_a, [](const String & pwm_data) {
    setPWM(pwm_data);
  });
}
void loop() {
  client.loop(); // must be called once per loop.
  delay(300);
}


/*

void loop() {
  selection();
  delay(100);
  publish_dimmer_value();
  delay(100);
  Serial.println("Analog read: ");
  dim= map(dimmer_read(), 0, 1024, 0, 255); //Map analogRead from range 0-1024 to 0-255
  Serial.print(dim);
  wifi_net(sel,dim);
  if(sel>3 and sel<8){//malo
    analogWrite(ledPin, dim); 
  }else{
    analogWrite(ledPin,0);
  }
  delay(100);
}
*/

void setStatus(String status_state){
  if(status_state.equals("false")){
      btn_state=false;
      analogWrite(ledPin, 0);
      //Serial.println("TEST FALSE");}
    }else{
      btn_state=true;
      //Serial.println("TEST TRUE");
    }
   Serial.println("STATUS: "+status_state);
   Serial.println(status_state ? "True" : "False");
}
void setPWM(String pwm_state){
  if(btn_state){
    pwm_value=pwm_state.toInt();
    analogWrite(ledPin, pwm_value);
  }else{
    analogWrite(ledPin, 0);
  }
}
