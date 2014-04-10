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
            if(SerialPortSingleton.IsRunning)
                SerialPortSingleton.GetInstance().OnReceive += new EventHandler<MessageEventArgs>(UARTBridgeService_OnReceive);
        }

        void UARTBridgeService_OnReceive(object sender, MessageEventArgs e)
        {
            Console.WriteLine("COM=>WS:" + e.Message);
            Send(e.Message);
        }



        protected override void OnMessage(WebSocketSharp.MessageEventArgs e)
        {
            base.OnMessage(e);
//            if (e.Type == WebSocketSharp.Opcode.TEXT)
            {
                Console.WriteLine("WS=>COM:" + e.Data);
                SerialPortSingleton.GetInstance().Write(e.Data);
            }
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
