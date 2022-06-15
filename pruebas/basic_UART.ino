/*
  Tutorial from : https://www.circuitbasics.com/how-to-set-up-uart-communication-for-arduino/
*/


void setup() {
  // put your setup code here, to run once:
  pinMode(8, INPUT_PULLUP); // set push button pin as inputy
  pinMode(13, OUTPUT); // set LED pin as output
  digitalWrite(13, LOW); // switch off LED pin

  Serial.begin(9600); // Inicializamos UART con un baud rate de 9600 bits per second
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){ // Hay datos por leer en el serial?
    char data_rcvd = Serial.read(); // Leemos un byte

    if(data_rcvd == '1') digitalWrite(13 , HIGH); // Encendemos el LED
    if(data_rcvd == '0') digitalWrite(13, LOW); // Apagamos el LED
  }

  if(digitalRead(8)==HIGH) Serial.write('0'); // Enviamos 0 al serial si el boton no esta presionado
  else Serial.write('1'); // Enviamos 1 al serial si el boton esta presionado

}