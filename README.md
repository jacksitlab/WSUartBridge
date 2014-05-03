#WSUartBridge

programming language: C#(.Net/Mono), javascript, C(TI Code Composer Studio)

This is a simple Websocket-Uart-Bridge to communicate with a MCU through Javascript.
This Project is baseed on https://github.com/sta/websocket-sharp .

AIM:Opportunity to create a webbased Control for MSP430 and Stellaris MCUs.

start parameters:(all optional)
wsuartbridge.exe <port> <baudrate>

e.g. mono wsuartbridge.exe /dev/ttyACM0 115200

known issues:
LINUX:if device is not accessable its a user-right problem


works with windows(.NET 3.5) and linux (MONO 2.10.8.1)

