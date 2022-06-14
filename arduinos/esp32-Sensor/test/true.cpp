// /***************************************************************************
//   This is a library for the BMP280 humidity, temperature & pressure sensor

//   Designed specifically to work with the Adafruit BMP280 Breakout
//   ----> http://www.adafruit.com/products/2651

//   These sensors use I2C or SPI to communicate, 2 or 4 pins are required
//   to interface.

//   Adafruit invests time and resources providing this open source code,
//   please support Adafruit andopen-source hardware by purchasing products
//   from Adafruit!

//   Written by Limor Fried & Kevin Townsend for Adafruit Industries.
//   BSD license, all text above must be included in any redistribution
//  ***************************************************************************/
// #include <Arduino.h>
// #include <Wire.h>
// #include <Adafruit_BMP280.h>
// #include <WiFi.h>
// #include <SPI.h>
// #include <Adafruit_GFX.h>
// #include <Adafruit_SSD1306.h>
// #include <Adafruit_I2CDevice.h>

// #define BMP_SCK (13)
// #define BMP_MISO (12)
// #define BMP_MOSI (11)
// #define BMP_CS (10)

// #define SCREEN_WIDTH 128 // OLED display width, in pixels
// #define SCREEN_HEIGHT 64 // OLED display height, in pixels

// // Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
// #define OLED_RESET -1 // Reset pin # (or -1 if sharing Arduino reset pin)
// Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Adafruit_BMP280 bmp; // I2C
// // Adafruit_BMP280 bmp(BMP_CS); // hardware SPI
// // Adafruit_BMP280 bmp(BMP_CS, BMP_MOSI, BMP_MISO,  BMP_SCK);

// const char *ssid = "Jozze";
// const char *pass = "Bmxarnete531";

// // LOGO INICIO
// #define LOGO_HEIGHT 44 //Altura del logo
// #define LOGO_WIDTH 20 //Anchura del logo

// // 'Logo', 44x20px
// const unsigned char epd_bitmap_Logo[] PROGMEM = {
//     0x20, 0x00, 0x00, 0x03, 0xe0, 0x00, 0x07, 0xf8, 0x00, 0x0f, 0xf8, 0x00, 0x0f, 0xfc, 0x00, 0x07,
//     0xfe, 0x00, 0x03, 0xfe, 0x00, 0x07, 0xfe, 0x00, 0x0f, 0xfe, 0x00, 0x1f, 0xfe, 0x00, 0x3f, 0xfe,
//     0x00, 0x3f, 0xfe, 0x00, 0x3f, 0xfc, 0x00, 0x3f, 0xf1, 0x00, 0x3f, 0xf0, 0x00, 0x3f, 0xf3, 0xc0,
//     0x3f, 0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x7f, 0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x1f, 0xff, 0xc0, 0x0f,
//     0xff, 0xc0, 0x0f, 0xff, 0x80, 0x07, 0xff, 0xc0, 0x03, 0xff, 0xc0, 0x01, 0xff, 0xc0, 0x00, 0xff,
//     0xc0, 0x00, 0xff, 0x80, 0x00, 0x7f, 0x80, 0x00, 0x7f, 0x80, 0x00, 0x7f, 0x80, 0x00, 0xff, 0x80,
//     0x00, 0xff, 0x80, 0x00, 0xff, 0x80, 0x01, 0xff, 0x80, 0x07, 0xff, 0x80, 0x1f, 0xff, 0xc0, 0x3f,
//     0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x3f, 0xff, 0xc0, 0x0f, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
//     0x00, 0x00, 0x00, 0x00};

// // Array of all bitmaps for convenience. (Total bytes used to store images in PROGMEM = 160)
// const int epd_bitmap_allArray_LEN = 1;
// const unsigned char *epd_bitmap_allArray[1] = {
//     epd_bitmap_Logo};

// int pixelX = 0;  // Valor de las "X" en el canvas de la pantalla (empieza arriba a la izquierda), al aumentar va a la derecha
// int pixelY = 20; // Valor de las "Y" en el canvas de la pantalla (empieza arriba a la izquierda), al aumentar va hacia abajo

// // Millis para no bloquear con delay
// String pantalla = "temp"; //Variable que indicará que parte de los datos se mostrarán por pantalla
// unsigned long interval = 2000; //Intervalo de tiempo entre cambios de pantalla
// unsigned long previousTime = 0; //Inicializar a 0 el tiempo previo para las condiciones de los millis para no bloquear procesos evitando delay

// void setup()
// {
//   Serial.begin(115200); //Baudios

//   // Pantalla

//   if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) //Control por si la pantalla no inicia bien
//   {
//     Serial.println(F("SSD1306 allocation failed"));
//     for (;;)
//       ; // Don't proceed, loop forever
//   }

//   display.clearDisplay(); //aplicaremos las distintas funciones que nos ofrece el onejto display para modificar la pantalla. En este caso la limpiamos
//   display.setTextSize(1); //Pasamos el vvavlor 1 como parametro para indicar que usaremos el tamaño de texto más bajo
//   display.setTextColor(WHITE); //Aunque la pantalla tenga varios colores, es monocromática por lo que usaremos siempre WHITE para "pintar"
//   display.setCursor(0, 0);//setCursor nos permite elegir donde empezaremos, en este caso arriba a la izquierda
//   display.println("Enrique Tierno Galvan");//println nos permite escribir texto en pantalla
//   display.display();//Con display() ejecutaremos en pantalla todos los parametros anteriores

//   display.drawLine(0, 10, 128, 10, WHITE);//La funcion drawLine() permite elegir el comienzo y fin de una linea horizontal, el grosor y el color
//   display.display();

// //Centramos la imagen con estos parámetros
//   display.drawBitmap((display.width() - LOGO_WIDTH) / 2, ((display.height() - LOGO_HEIGHT) + 7 / 2), epd_bitmap_Logo, LOGO_WIDTH, LOGO_HEIGHT, WHITE);
//   display.display();
//   delay(1000);//Bloqueamos la ejecución del programa para que se muestre el logo durante 1 segundo

//   pinMode(LED_BUILTIN, OUTPUT); // LED azul del ESP32
//   pinMode(4, OUTPUT);           // Se pone una vez y está en el Setup el primer número es el numero GPIO del esquema de pines
//   pinMode(15, OUTPUT);          // Se pone una vez y está en el Setup
//   pinMode(17, OUTPUT);          // Se pone una vez y está en el Setup
//   pinMode(16, OUTPUT);          // Se pone una vez y está en el Setup
//   while (!Serial)
//     delay(100); // wait for native usb
//   Serial.println(F("BMP280 test"));
//   unsigned status;
//   // status = bmp.begin(BMP280_ADDRESS_ALT, BMP280_CHIPID);
//   status = bmp.begin(0x76); //Dirección del bus del sensor
//   if (!status)
//   {
//     Serial.println(F("Could not find a valid BMP280 sensor, check wiring or "
//                      "try a different address!"));
//     Serial.print("SensorID was: 0x");
//     Serial.println(bmp.sensorID(), 16);
//     Serial.print("        ID of 0xFF probably means a bad address, a BMP 180 or BMP 085\n");
//     Serial.print("   ID of 0x56-0x58 represents a BMP 280,\n");
//     Serial.print("        ID of 0x60 represents a BME 280.\n");
//     Serial.print("        ID of 0x61 represents a BME 680.\n");
//     while (1)
//       delay(10);
//   }

//   /* Default settings from datasheet. */
//   bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */
//                   Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */
//                   Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */
//                   Adafruit_BMP280::FILTER_X16,      /* Filtering. */
//                   Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */

//   WiFi.begin(ssid, pass); //iniciamos la conexión WiFi con los valores de ssid y contraseña que hemos declarado anteriormente
//   delay(2000);
//   /*En el terminal Serial, indicamos que se está realizando la conexión*/
//   Serial.print("Se está conectando a la red WiFi llamada ");
//   Serial.println(ssid);

//   display.clearDisplay();
//   /*Mientras se realiza la conexión a la red, aparecerán puntos, hasta que se realice la conexión*/
//   while (WiFi.status() != WL_CONNECTED)
//   {
//     delay(500);

//     display.setTextSize(1);
//     display.setTextColor(WHITE);
//     display.setCursor(0, 0);
//     display.println("Conectando al WIFI");
//     display.display();

//     display.drawLine(0, 10, 128, 10, WHITE);
//     display.display();

//     display.setTextSize(1);
//     display.setTextColor(WHITE);
//     display.setCursor(pixelX, pixelY);
//     display.println(".");
//     display.display();
//     Serial.print(".");
//     pixelX += 4;
//     if (pixelX == 128)
//     {
//       pixelX = 0;
//       pixelY = pixelY + 10;
//     }
//     if (pixelY > 50)
//     {
//       display.clearDisplay();
//       pixelY = 20;
//     }
//   }
//   // Con la conexión ya realizada, se pasa a imprimir algunos datos importantes, como la dirección IP asignada a nuestro dispositivo
//   Serial.println("");
//   Serial.println("WiFi connected");
//   Serial.println("IP address: ");
//   Serial.println(WiFi.localIP());
// }

// void loop()
// {

//   // Mediante millis, controlamos el tiempo que dura cada parte de la informanción en pantalla para no bloquar la recepción de datos
//   unsigned long currentTime = millis();

//   if (currentTime - previousTime >= interval)
//   {
//     if (pantalla == "temp") // Utilizamos la variable pantalla como bandera para controlar que se muestra en cada ejecución del loop
//     {
//       display.clearDisplay();
//       display.setTextSize(1);
//       display.setTextColor(WHITE);
//       display.setCursor(0, 0);
//       display.println("Temperatura");
//       display.display();

//       display.drawLine(0, 10, 128, 10, WHITE);
//       display.display();

//       display.setTextSize(3);
//       display.setTextColor(WHITE);
//       display.setCursor(15, 40);
      
//       display.println(bmp.readTemperature());
//       display.display();
//       pantalla = "wifi";
//     }
//     else if (WiFi.status() == WL_CONNECTED)
//     {
//       digitalWrite(17, HIGH);
//       if (pantalla == "wifi")
//       {
//         display.clearDisplay();
//         display.setTextSize(1);
//         display.setTextColor(WHITE);
//         display.setCursor(0, 0);
//         display.println("WIFI");
//         display.display();
//         display.drawLine(0, 10, 128, 10, WHITE);
//         display.display();
//         display.setTextSize(3);
//         display.setTextColor(WHITE);
//         display.setCursor(15, 40);
//         display.println(ssid);
//         display.display();
//         pantalla = "ip";
//       }
//       else if (pantalla == "ip")
//       {
//         display.clearDisplay();
//         display.setTextSize(1);
//         display.setTextColor(WHITE);
//         display.setCursor(0, 0);
//         display.println("Direccion IP");
//         display.display();
//         display.drawLine(0, 10, 128, 10, WHITE);
//         display.display();
//         display.setTextSize(2);
//         display.setTextColor(WHITE);
//         display.setCursor(0, 30);
//         display.println(WiFi.localIP());
//         display.display();
//         pantalla = "temp";
//       }
      
//     }
//     else // Si no está conectado a una red WiFi, el led blanco se apagará y solo mostrarça temperatura por pantalla
//     {
//       digitalWrite(17, LOW);
//       display.clearDisplay();
//       display.setTextSize(1);
//       display.setTextColor(WHITE);
//       display.setCursor(0, 0);
//       display.println("Temperatura");
//       display.display();

//       display.drawLine(0, 10, 128, 10, WHITE);
//       display.display();

//       display.setTextSize(3);
//       display.setTextColor(WHITE);
//       display.setCursor(15, 40);
//       display.println(bmp.readTemperature());
//       display.display();
//     }

//     //Datos para comprobar la temperatura, presión y altitud por la terminal
//     Serial.print(F("Temperature = "));
//     Serial.print(bmp.readTemperature());
//     Serial.println(" *C");

//     Serial.print(F("Pressure = "));
//     Serial.print(bmp.readPressure());
//     Serial.println(" Pa");

//     Serial.print(F("Approx altitude = "));
//     Serial.print(bmp.readAltitude(1013.25)); /* Adjusted to local forecast! */
//     Serial.println(" m");

//     if (bmp.readTemperature() <= 26.0) // Si la temperatura es menor de 26 grados, se encenderá el led verde y los demás se apagarán
//     {
//       digitalWrite(15, HIGH);
//       digitalWrite(4, LOW);
//       digitalWrite(16, LOW);
//     }
//     if (bmp.readTemperature() > 26.0 && bmp.readTemperature() < 27.0) // Si la temperatura está entre 26 y 27 grados, se encenderá el led amarillo y los demás se apagarán
//     {
//       digitalWrite(4, HIGH);
//       digitalWrite(16, LOW);
//       digitalWrite(15, LOW);
//     }
//     if (bmp.readTemperature() >= 27.0) // Si la temperatura es mayor de 27 grados, se encenderá el led rojo y los demás se apagarán
//     {
//       digitalWrite(16, HIGH);
//       digitalWrite(4, LOW);
//       digitalWrite(15, LOW);
//     }

//     Serial.println();
//     previousTime = millis(); // Actualizamos previous time para que la condición del if se cumpla
//   }
// }