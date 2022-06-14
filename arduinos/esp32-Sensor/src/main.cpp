/***************************************************************************
  This is a library for the BMP280 humidity, temperature & pressure sensor

  Designed specifically to work with the Adafruit BMP280 Breakout
  ----> http://www.adafruit.com/products/2651

  These sensors use I2C or SPI to communicate, 2 or 4 pins are required
  to interface.

  Adafruit invests time and resources providing this open source code,
  please support Adafruit andopen-source hardware by purchasing products
  from Adafruit!

  Written by Limor Fried & Kevin Townsend for Adafruit Industries.
  BSD license, all text above must be included in any redistribution
 ***************************************************************************/
#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BMP280.h>
#include <WiFi.h>
#include <PubSubClient.h>

#define BMP_SCK (13)
#define BMP_MISO (12)
#define BMP_MOSI (11)
#define BMP_CS (10)

//**************************************
//*********** MQTT CONFIG **************
//**************************************
const char *mqtt_server = "";//Insertar IP del servidor MQTT
const int mqtt_port = 1883; 
const char *mqtt_user = "";
const char *mqtt_pass = "";
const char *root_topic_publish = "mimqtt/test";



//**************************************
//*********** MQTT WIFI **************
//**************************************
WiFiClient espClient;
PubSubClient client(espClient);
long count = 0;
int Led = 26;
String strTmp;
char chrTmp[5];
// float temperatura = 0;
// strTmp += temperatura;               // concatenando
String hostname = "ESP32"; // Nombre al hostname

Adafruit_BMP280 bmp; 


const char *ssid = "";// INSERTE SU SSID
const char *pass = "";// INSERTE SU PASSWORD



//************************
//** F U N C I O N E S ***
//************************
void callback(char *topic, byte *payload, unsigned int length);
void reconnect();
void setup_wifi();

void setup()
{
  Serial.begin(115200);
  // pinMode(LED_BUILTIN, OUTPUT); // LED azul del ESP32 //esta es la lucecita azulita
  pinMode(4, OUTPUT);  // Se pone una vez y está en el Setup el primer número es el numero GPIO del esquema de pines
  pinMode(15, OUTPUT); // Se pone una vez y está en el Setup
  pinMode(17, OUTPUT); // Se pone una vez y está en el Setup
  pinMode(16, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  while (!Serial)
    delay(100); // wait for native usb
  Serial.println(F("BMP280 test"));
  unsigned status;
  // status = bmp.begin(BMP280_ADDRESS_ALT, BMP280_CHIPID);
  status = bmp.begin(0x76);
  if (!status)
  {
    Serial.println(F("Could not find a valid BMP280 sensor, check wiring or "
                     "try a different address!"));
    Serial.print("SensorID was: 0x");
    Serial.println(bmp.sensorID(), 16);
    Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
    Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
    Serial.print("        ID of 0x60 represents a BME 280.\n");
    Serial.print("        ID of 0x61 represents a BME 680.\n");
    while (1)
      delay(10);
  }

  /* Configuración por defecto del sensor BMP280. */
  bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
                  Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
                  Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
                  Adafruit_BMP280::FILTER_X16,      /* Filtering. */
                  Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */

  WiFi.begin(ssid, pass);
  delay(2000);
  /*En el terminal Serial, indicamos que se está realizando la conexión*/
  Serial.print("Se está conectando a la red WiFi denominada ");
  Serial.println(ssid);
  /*Mientras se realiza la conexión a la red, aparecerán puntos, hasta que se realice la conexión*/
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  /*Con la conexión ya realizada, se pasa a imprimir algunos datos importantes, como la dirección IP asignada a nuestro dispositivo*/
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // setup_wifi();
  delay(2000);
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop()
{
  float temperatura = bmp.readTemperature(); // leed datos de t° y humedad
  float presion = bmp.readPressure();        // Lee la presión
  float altitud = bmp.readAltitude(1013.25); // lee altitud

  if (WiFi.status() == WL_CONNECTED)
  {
    digitalWrite(17, HIGH);
  }
  else
  {
    digitalWrite(17, LOW);
  }

  Serial.print(F("Temperature = "));
  Serial.print(temperatura);
  Serial.println(" *C");

  Serial.print(F("Pressure = "));
  Serial.print(presion);
  Serial.println(" Pa");

  Serial.print(F("Approx altitude = "));
  Serial.print(altitud); /* Adjusted to local forecast! */
  Serial.println(" m");

  if (bmp.readTemperature() <= 33.0)
  {
    digitalWrite(15, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(16, LOW);
  }
  if (bmp.readTemperature() > 33.0 && bmp.readTemperature() < 35.0)
  {
    digitalWrite(4, HIGH);
    digitalWrite(16, LOW);
    digitalWrite(15, LOW);
  }
  if (bmp.readTemperature() >= 35.0)
  {
    digitalWrite(16, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(15, LOW);
  }

  if (!client.connected())
  {
    reconnect();
  }
  if (client.connected())
  {
    String payload;

    payload = String(temperatura, 1);
    payload += " ";
    strTmp += temperatura;
    strTmp.toCharArray(chrTmp, 5);
    Serial.println("esto parece que avanza");
    client.publish(root_topic_publish, (char *)payload.c_str());
    count++;
    Serial.print("se envio los datos al broker ");
    Serial.println(payload);
  }
  client.loop();

  

  Serial.println();
  delay(2000);
}
//*****************************
//***    CONEXION WIFI     ***
//*****************************
void setup_wifi()
{
  delay(10);
  // Nos conectamos a nuestra red Wifi
  WiFi.config(INADDR_NONE, INADDR_NONE, INADDR_NONE, INADDR_NONE);
  WiFi.setHostname(hostname.c_str()); // define hostname
  Serial.println();
  Serial.print("Conectando a ssid: ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Conectado a red WiFi!");
  Serial.println("Dirección IP: ");
  Serial.println(WiFi.localIP());
}

//*****************************
//***    CONEXION MQTT      ***
//*****************************
void reconnect()
{

  while (!client.connected())
  {
    Serial.print("Intentando conexión Mqtt...");
    // Creamos un cliente ID
    String clientId = "mqtt06";
    // Intentamos conectar
    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass))
    {
      Serial.println("Conectado!");
      digitalWrite(LED_BUILTIN, HIGH);

      // Nos suscribimos
    }
    else
    {
      digitalWrite(LED_BUILTIN, LOW);
      Serial.print("falló :( con error -> ");
      Serial.print(client.state());
      Serial.println(" Intentamos de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

//*****************************
//***       CALLBACK        ***
//*****************************

void callback(char *topic, byte *payload, unsigned int length)
{
  String incoming = "";
  Serial.print("Mensaje recibido desde -> ");
  Serial.print(topic);
  Serial.println("");
  for (int i = 0; i < length; i++)
  {
    incoming += (char)payload[i];
  }
  if (incoming == "1")
  {
    Serial.println("Encender Foco");
    digitalWrite(Led, HIGH);
  }
  else if (incoming == "0")
  {
    Serial.println("Apagar Foco");
    digitalWrite(Led, LOW);
  }
  incoming.trim();
  Serial.println("Mensaje -> " + incoming);
}