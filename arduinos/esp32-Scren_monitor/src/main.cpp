#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_I2CDevice.h>
// #include <Adafruit_BMP280.h>
#include <PubSubClient.h>

#define BMP_SCK (13)
#define BMP_MISO (12)
#define BMP_MOSI (11)
#define BMP_CS (10)

//**************************************
//****** Medidas de la pantalla ********
//**************************************
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
#define OLED_RESET -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// LOGO INICIO
#define LOGO_HEIGHT 44
#define LOGO_WIDTH 20
// 'Logo', 20x44px
const unsigned char epd_bitmap_Logo[] PROGMEM = {
    0x20, 0x00, 0x00, 0x03, 0xe0, 0x00, 0x07, 0xf8, 0x00, 0x0f, 0xf8, 0x00, 0x0f, 0xfc, 0x00, 0x07,
    0xfe, 0x00, 0x03, 0xfe, 0x00, 0x07, 0xfe, 0x00, 0x0f, 0xfe, 0x00, 0x1f, 0xfe, 0x00, 0x3f, 0xfe,
    0x00, 0x3f, 0xfe, 0x00, 0x3f, 0xfc, 0x00, 0x3f, 0xf1, 0x00, 0x3f, 0xf0, 0x00, 0x3f, 0xf3, 0xc0,
    0x3f, 0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x7f, 0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x1f, 0xff, 0xc0, 0x0f,
    0xff, 0xc0, 0x0f, 0xff, 0x80, 0x07, 0xff, 0xc0, 0x03, 0xff, 0xc0, 0x01, 0xff, 0xc0, 0x00, 0xff,
    0xc0, 0x00, 0xff, 0x80, 0x00, 0x7f, 0x80, 0x00, 0x7f, 0x80, 0x00, 0x7f, 0x80, 0x00, 0xff, 0x80,
    0x00, 0xff, 0x80, 0x00, 0xff, 0x80, 0x01, 0xff, 0x80, 0x07, 0xff, 0x80, 0x1f, 0xff, 0xc0, 0x3f,
    0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x0f, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00};

// Array of all bitmaps for convenience. (Total bytes used to store images in PROGMEM = 160)
const int epd_bitmap_allArray_LEN = 1;
const unsigned char *epd_bitmap_allArray[1] = {
    epd_bitmap_Logo};

int pixelX = 0;
int pixelY = 20;

//**************************************
//*********** WIFI CONFIG **************
//**************************************
 const char *ssid = "";//Insert your wifi SSID here
 const char *pass = "";//Insert your wifi password here
WiFiClient espClient;

//**************************************
//*********** MQTT CONFIG **************
//**************************************
PubSubClient client(espClient);
const char *mqtt_server = "";//Insert your MQTT server here
const int mqtt_port = 1883;
const char *mqtt_user = "";
const char *mqtt_pass = "";
const char *root_topic_subscribe = "mimqtt/sub";
String tempera = "";
boolean climatizacion;

//************************
//** F U N C I O N E S ***
//************************
void callback(char *topic, byte *payload, unsigned int length);
void reconnect();
void SubscribeMqtt();
void setup_Sceen();
void setup_wifi();
void screen();

unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE (50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

unsigned long interval = 2000;
unsigned long previousMillis;
unsigned long previousTime = 0;
String pantalla = "temp";

void setup_Screen()
{
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C))
  {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;)
      ; // Don't proceed, loop forever
  }     // Sin esto no funciona la pantalla

  display.clearDisplay();                   // LLamo a la función para limpiar la pantalla por si acaso
  display.setTextSize(1);                   // El número entre paréntesis es el tamaño del texto (Pero la escala se multiplica a medida que lo aumentas)
  display.setTextColor(WHITE);              // Aunque tenemos 2 colores en la pantalla, en realidad la detecta como blanco y negro, así qeu pintamos en blanco para qeu aparezcan las cosas
  display.setCursor(0, 0);                  // Arriba a la izquierda empiezan las coordenadas 0,0
  display.println("Enrique Tierno Galvan"); // Con println escribes lo que quieras, un println normal
  display.display();                        // .display hace que todo lo escrito anteriormente se pase a la pantalla

  display.drawLine(0, 10, 128, 10, WHITE); // esta función hace una línea horizontal (eje x, eje y, tamaño, no me acuerdo xd pero pon 10, color)
  display.display();

  display.drawBitmap((display.width() - LOGO_WIDTH) / 2, ((display.height() - LOGO_HEIGHT) + 7 / 2), epd_bitmap_Logo, LOGO_WIDTH, LOGO_HEIGHT, WHITE); // Centramos el logo
  display.display();
  delay(2000); // Hacemos delay para que se mantenga esto antes de empezar nada
}

void setup_wifi()
{
  WiFi.begin(ssid, pass);
  Serial.print("Se está conectando a la red WiFi  ");
  Serial.println(ssid);
  display.clearDisplay();
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);

    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.setCursor(0, 0);
    display.println("Conectando al WIFI");
    display.display();

    display.drawLine(0, 10, 128, 10, WHITE);
    display.display();

    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.setCursor(pixelX, pixelY);
    display.println(".");
    display.display();
    Serial.print(".");
    pixelX += 4;
    if (pixelX == 128)
    {
      pixelX = 0;
      pixelY = pixelY + 10;
    }
    if (pixelY > 50)
    {
      display.clearDisplay();
      pixelY = 20;
    }

    Serial.print(".");
  }
  Serial.println("Wifi conectado");
}

void reconnect()
{
  // Loop until we're reconnected
  while (!client.connected())
  {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str()))
    {
      digitalWrite(LED_BUILTIN, HIGH); // LED ON
      Serial.println("connected");
      SubscribeMqtt();
      // Once connected, publish an announcement...
      client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("mqtt/interruptor");
    }
    else
    {
      digitalWrite(LED_BUILTIN, LOW); // LED OFF
      Serial.print("Fallo en la conexión MQTT");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void callback(char *topic, byte *payload, unsigned int length)
{
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  if ((strcmp(topic, "mqtt/tempes") == 0))
  {
    tempera = "";
    for (int i = 0; i < length; i++)
    {
      tempera.concat((char)payload[i]);
    }
  }else 

  for (int i = 0; i < length; i++)
  {
    // tempera.concat((char)payload[i]);
    Serial.print((char)payload[i]);
  }
  Serial.println();
  Serial.print("Temmperatura es ");

  Serial.println(tempera);
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if (((char)payload[0] == '1') && (strcmp(topic, "mqtt/interruptor") == 0))
  {
    climatizacion = true;
    digitalWrite(16, HIGH); //

    // Turn the LED on (Note that LOW is the voltage level
    //  but actually the LED is on; this is because
    //  it is active low on the ESP-01)
  }
  else if (((char)payload[0] != '1') && (strcmp(topic, "mqtt/interruptor") == 0))
  {
    climatizacion = false;
    digitalWrite(16, LOW); // Turn the LED off by making the voltage HIGH
  }
}

void SubscribeMqtt()
{
  Serial.print("Intentando subscribirse...");
  if (client.subscribe("mqtt/interruptor") && client.subscribe("mqtt/tempes"))
  {
    Serial.println("Suscrito!!");
  }
  else
  {
    Serial.println("No Suscrito");
  }
  client.subscribe("mqtt/interruptor");
}

void screen()
{
  // unsigned long currentMillis = millis();
  unsigned long currentTime = millis();

  if (currentTime - previousTime >= interval)
  {
    if (pantalla == "temp") // Utilizamos la variable pantalla como bandera para controlar que se muestra en cada ejecución del loop
    {
      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      display.setCursor(0, 0);
      display.println("Temperatura");
      display.display();

      display.drawLine(0, 10, 128, 10, WHITE);
      display.display();
      if (tempera == "")
      {
        display.setTextSize(2);
        display.setTextColor(WHITE);
        display.setCursor(0, 20);
        display.println("No hay datos");
        display.display();
      }
      else
      {

        display.setTextSize(3);
        display.setTextColor(WHITE);
        display.setCursor(30, 30);
        display.println(tempera);
        display.display();
      }
      previousMillis = millis();
      pantalla = "wifi";
    }
    else if (WiFi.status() == WL_CONNECTED)
    {
      if (pantalla == "wifi")
      {
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(WHITE);
        display.setCursor(0, 0);
        display.println("WIFI");
        display.display();
        display.drawLine(0, 10, 128, 10, WHITE);
        display.display();
        display.setTextSize(2);
        display.setTextColor(WHITE);
        display.setCursor(5, 30);
        display.println(ssid);
        display.display();
        pantalla = "ip";
      }
      else if (pantalla == "ip")
      {
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(WHITE);
        display.setCursor(0, 0);
        display.println("Direccion IP");
        display.display();
        display.drawLine(0, 10, 128, 10, WHITE);
        display.display();
        display.setTextSize(2);
        display.setTextColor(WHITE);
        display.setCursor(0, 30);
        display.println(WiFi.localIP());
        display.display();
        pantalla = "temp";
      }
    }
    else // Si no está conectado a una red WiFi, el led blanco se apagará y solo mostrarça temperatura por pantalla
    {
      display.clearDisplay();
    }

    Serial.println();
    previousTime = millis(); // Actualizamos previous time para que la condición del if se cumpla
  }
}

void setup()
{
  Serial.begin(115200);
  pinMode(4, OUTPUT);           // Lucecita azul el aire acondicionado (enfriar)
  pinMode(15, OUTPUT);          // Lucecita roja el aire acondicionado (calentar)
  pinMode(16, OUTPUT);          // Lucecita blanca encendido apagado desde node-red, encendido manual
  pinMode(LED_BUILTIN, OUTPUT); // Lucecita azul

  while (!Serial)
  {
    delay(100); // wait for native usb
  }
  setup_Screen();
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();
  screen();
  unsigned long now = millis();
  if (now - lastMsg > 2000)
  {
    lastMsg = now;
    ++value;
    // snprintf(msg, MSG_BUFFER_SIZE, "hello world #%ld", value);
    // Serial.print("Publish message: ");
    // Serial.println(msg);
    // client.publish("outTopic", msg);
  }
  if (climatizacion == true)
  {
    if (tempera < "33")
    {
      digitalWrite(4, HIGH);
      digitalWrite(15, LOW);
    }
    else if (tempera > "35")
    {
      digitalWrite(4, LOW);
      digitalWrite(15, HIGH);
    }
    else
    {
      digitalWrite(4, LOW);
      digitalWrite(15, LOW);
    }
  }
  else
  {
    digitalWrite(4, LOW);
    digitalWrite(15, LOW);
  }
}
