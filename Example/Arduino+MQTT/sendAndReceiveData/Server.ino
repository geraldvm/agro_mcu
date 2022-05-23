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
bool wifi_state = false;
int pwm_value= 0;
// PUBLISH TOPICS
String pub_btn_a= "iot/light/server/btn_a"; //ON-OFF DEVICE : Boolean
String pub_btn_b= "iot/light/server/btn_b"; //ON-OFF DEVICE : Boolean
String pub_btn_c= "iot/light/server/btn_c"; //ON-OFF DEVICE : Boolean
String pub_dimmer= "iot/light/server/pwm/all"; //PWM VALUE : PWM

// SUBSCRIBES TOPICS
String sub_btn_a= "iot/light/client/btn_a"; //ON-OFF DEVICE : Boolean
String sub_pwm_a= "iot/light/client/pwm/a"; //DIMMER VALUE : String
String sub_wifi= "iot/light/client/wifi_mode"; //DIMMER VALUE : String
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
    read_status();
    //Serial.println("TESTING!!");
  });
  client.subscribe(sub_btn_a, [](const String & btn_data) {
    setStatus(btn_data);
  });
  client.subscribe(sub_pwm_a, [](const String & pwm_data) {
    setPWM(pwm_data);
  });
  client.subscribe(sub_pwm_a, [](const String & wifi_status) {
    wifi_loop(wifi_status);
  });
}
void loop() {
  client.loop(); // must be called once per loop.
  delay(300);
  if(wifi_state){
    //selection();
    //publish_dimmer_value();
    delay(500);
  }
}

void publish_dimmer_value(){
  dim= map(dimmer_read(), 0, 1024, 0, 255); //Map analogRead from range 0-1024 to 0-255
  client.publish(pub_dimmer, String(dim));
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

void read_status(){
  int a= digitalRead(btn_one);
  int b= digitalRead(btn_second);
  int c= digitalRead(btn_third);
  if(a!=sw_one or b!= sw_two or c != sw_three){
    selection(a,b,c);
    Serial.print("selection!!!");
  }delay(500);
}
void selection(int a, int b, int c){
  
  sw_one= a;
  sw_two= b;
  sw_three= c;
  
  /* *
  * Cases of use sw_one, sw_two and sw_three 
  * is equal a binary number of 3 bits 
  * */
  //000
  if(sw_one==LOW and sw_two==LOW and sw_three==LOW){
    client.publish(pub_btn_a, "false");
    client.publish(pub_btn_b, "false");
    client.publish(pub_btn_c, "false");
  }
  //001
  if(sw_one==LOW and sw_two==LOW and sw_three==HIGH){
    client.publish(pub_btn_a, "false");
    client.publish(pub_btn_b, "false");
    client.publish(pub_btn_c, "true");
  }
  //010
  if(sw_one==LOW and sw_two==HIGH and sw_three==LOW){
    client.publish(pub_btn_a, "false");
    client.publish(pub_btn_b, "true");
    client.publish(pub_btn_c, "false");
  }
  //011
  if(sw_one==LOW and sw_two==HIGH and sw_three==HIGH){
    client.publish(pub_btn_a, "false");
    client.publish(pub_btn_b, "true");
    client.publish(pub_btn_c, "true");
  }
  //100
  if(sw_one==HIGH and sw_two==LOW and sw_three==LOW){
    client.publish(pub_btn_a, "true");
    client.publish(pub_btn_b, "false");
    client.publish(pub_btn_c, "false");
  }
  //101
  if(sw_one==HIGH and sw_two==LOW and sw_three==HIGH){
    client.publish(pub_btn_a, "true");
    client.publish(pub_btn_b, "false");
    client.publish(pub_btn_c, "true");
  }
  //110
  if(sw_one==HIGH and sw_two==HIGH and sw_three==LOW){
    client.publish(pub_btn_a, "true");
    client.publish(pub_btn_b, "true");
    client.publish(pub_btn_c, "false");
  }
  //111
  if(sw_one==HIGH and sw_two==HIGH and sw_three==HIGH){
    client.publish(pub_btn_a, "true");
    client.publish(pub_btn_b, "true");
    client.publish(pub_btn_c, "true");
  }delay(500);
}

void dimmer_r(){
  int value = analogRead(dimmer);
  Serial.print(value);
}
int dimmer_read(){
  int value = analogRead(dimmer);
  return value;
}

void wifi_loop(String wifi_status){
  if(wifi_status.equals("false")){
      wifi_state=false;
      //Serial.println("TEST FALSE");
    }else{
      wifi_state=true;
      //Serial.println("TEST TRUE");
    }
}

void setStatus(String status_state){
  if(status_state.equals("false")){
      btn_state=false;
      analogWrite(ledPin, 0);
      //Serial.println("TEST FALSE");
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
