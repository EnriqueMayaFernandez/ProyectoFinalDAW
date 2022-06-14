//  if ((unsigned long)(currentMillis - previousMillis) >= interval)
//   {
//     if (WiFi.status() == WL_CONNECTED)
//     {
//       digitalWrite(17, HIGH);
//       display.clearDisplay();
//       display.setTextSize(1);
//       display.setTextColor(WHITE);
//       display.setCursor(0, 0);
//       display.println("WIFI");
//       display.display();
//       display.drawLine(0, 10, 128, 10, WHITE);
//       display.display();
//       display.setTextSize(2);
//       display.setTextColor(WHITE);
//       display.setCursor(5, 30);
//       display.println(ssid);
//       display.display();
//       delay(1000);
//       display.clearDisplay();
//       display.setTextSize(1);
//       display.setTextColor(WHITE);
//       display.setCursor(0, 0);
//       display.println("Direccion IP");
//       display.display();
//       display.drawLine(0, 10, 128, 10, WHITE);
//       display.display();
//       display.setTextSize(1);
//       display.setTextColor(WHITE);
//       display.setCursor(0, 30);
//       display.println(WiFi.localIP());
//       display.display();
//       delay(1000);
//     }
//     else
//     {
//       digitalWrite(17, LOW);
//       display.clearDisplay();
//     }

//     display.clearDisplay();
//     display.setTextSize(1);
//     display.setTextColor(WHITE);
//     display.setCursor(0, 0);
//     display.println("Temperatura");
//     display.display();

//     display.drawLine(0, 10, 128, 10, WHITE);
//     display.display();

//     display.setTextSize(3);
//     display.setTextColor(WHITE);
//     display.setCursor(30, 30);
//     display.println(tempera);
//     display.display();

//     previousMillis = millis();