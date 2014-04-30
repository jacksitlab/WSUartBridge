using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WSUartBridge
{
    class UARTBridgeService : WebSocketSharp.Server.WebSocketService
    {
        public UARTBridgeService()
        {
            if (SerialPortSingleton.IsRunning)
                SerialPortSingleton.GetInstance().OnReceive += new EventHandler<MessageEventArgs>(UARTBridgeService_OnReceive);
        }

        void UARTBridgeService_OnReceive(object sender, MessageEventArgs e)
        {
            Console.WriteLine("\nCOM=>WS:");
            printHex(e.Message);
            Send(bytes2string(e.Message));
        }

       



        protected override void OnMessage(WebSocketSharp.MessageEventArgs e)
        {
            base.OnMessage(e);
            //            if (e.Type == WebSocketSharp.Opcode.TEXT)
            {
                Console.WriteLine("\nWS=>COM:");
                byte[] buffer = new byte[1024];
                buffer = string2bytes(e.Data);// Encoding.UTF8.GetBytes(e.Data);
                printHex(buffer);
                SerialPortSingleton.GetInstance().Write(buffer, buffer.Length);
            }
        }
        private string bytes2string(byte[] b)
        {
            string s = "";
            for(int i=0;i<b.Length;i++)
                s+=BitConverter.ToString(b,i,1);
            
            return s;
        }
        private byte[] string2bytes(string s)
        {
            byte[] b = new byte[s.Length / 2];
            for (int i = 0; i < s.Length / 2; i++)
            {
                b[i]=(byte)Convert.ToByte(s.Substring(2 * i, 2),16);
            }
            return b;
        }
        private void printHex(string s)
        {
            for (int i = 0; i < s.Length; i++)
                Console.Write("0x{0:X2} ", (int)s[i]);
        }
        private void printHex(byte[] p)
        {
            for (int i = 0; i < p.Length; i++)
                Console.Write("0x{0:X2} ", (int)p[i]);
        }
        protected override void OnOpen()
        {
            base.OnOpen();
        }
        protected override void OnClose(WebSocketSharp.CloseEventArgs e)
        {
            base.OnClose(e);
        }

    }
}
