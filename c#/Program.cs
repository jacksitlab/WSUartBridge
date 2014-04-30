using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WSUartBridge
{
    class Program
    {
        private static WebSocketSharp.Server.WebSocketServer mServer;
        static void Main(string[] args)
        {
            int port=4649;
            string comPort="com1";
            int baudrate = 115200;
            if (args.Length > 0)
                comPort = args[0];
            if (args.Length > 1)
            {
                try
                {
                    baudrate = int.Parse(args[1]);
                }
                catch { }
            } 
            if (args.Length > 2)
                try
                {
                    port = int.Parse(args[2]);
                }
                catch { }

            initComPort(comPort, baudrate);
            initServer(port);
            Console.Read();
            close();

        }

        private static void close()
        {
            mServer.Stop();
        }

        private static void initComPort(string comPort,int baudrate)
        {
            Console.WriteLine("Starting Listening on SerialPort {0}",comPort);
            
            try
            {
                SerialPortSingleton.GetInstance(comPort, baudrate);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error:"+e.Message);
                return;
            }
            
        }

        private static void initServer(int port)
        {
            Console.WriteLine("Starting WSServer (http://localhost{0} ) on Port {1}", "/MSPUart", port);
            mServer = new WebSocketSharp.Server.WebSocketServer(port,false);
            mServer.AddWebSocketService<UARTBridgeService>("/MSPUart");
            mServer.Start();
        }
    }
}
