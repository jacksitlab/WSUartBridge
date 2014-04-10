using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WSUartBridge
{
    public class SerialPortSingleton
    {
        protected string mComport = "com1";
        protected int mBaudrate = 115200;
        const int TIMEOUT = 400;
        private bool stopFlag = false;
        private System.IO.Ports.SerialPort mSerial;
        private System.Threading.Thread t;
        private System.Threading.ThreadStart tStart;
        private System.Threading.Timer tTimeOut;
        private string mStrBuffer = "";
        private int mLastReceivedByteTick = 0;
        public event EventHandler<MessageEventArgs> OnReceive;

        private static SerialPortSingleton mObj = null;
        public static bool IsRunning
        {
            get { return mObj != null; }
        }
        private SerialPortSingleton(string comPort, int baudrate)
        {
            mComport = comPort;
            mBaudrate = baudrate;
            mSerial = new System.IO.Ports.SerialPort(mComport, mBaudrate);
            mSerial.Open();
            Listen();
        }
        public void Listen()
        {
            tStart = new System.Threading.ThreadStart(_run);
            t = new System.Threading.Thread(tStart);
            t.Start();
            tTimeOut = new System.Threading.Timer(new System.Threading.TimerCallback(_onTick), this,
                300, 300);
            
        }
        private void _onTick(object state)
        {
            int now = Environment.TickCount;
            if (now - mLastReceivedByteTick > TIMEOUT)
                onReceive();
        }
        private void _run()
        {
            byte[] buffer = new byte[1024];
            int br = 0;
            int offset = 0;
            while (!stopFlag)
            {
                byte b=(byte)mSerial.ReadByte();
                mStrBuffer += (char)b;
                mLastReceivedByteTick = Environment.TickCount;
        //        _parse(buffer, offset);
            }
        }

        private int _parse(byte[] buffer, int maxIndex)
        {
            string s = ASCIIEncoding.UTF8.GetString(buffer, 0, maxIndex);
            int idxStart = s.IndexOf('{');
            int idxEnd = s.IndexOf('}');
            if (idxStart >= 0 && idxEnd > idxStart)
            {
                //send through websocket
                onReceive(s.Substring(idxStart, idxEnd - idxStart));
                
                s = s.Substring(idxEnd);
            }
            return 0;
        }
        private void onReceive()
        {
            if (mStrBuffer != string.Empty)
            {
                onReceive(mStrBuffer);
                mStrBuffer = "";
            }
        }
        protected virtual void onReceive(string p)
        {
            if (OnReceive != null)
                OnReceive(this, new MessageEventArgs(p));
        }
        public void StopListen()
        {
            stopFlag = true;
            if (t != null)
                t.Abort();
            if (mSerial.IsOpen)
                mSerial.Close();
        }
        public static SerialPortSingleton GetInstance()
        {
            if (mObj == null)
                throw new Exception("not initialized");
            return mObj;
        }
        public static SerialPortSingleton GetInstance(string comPort, int baudrate)
        {
            if (mObj == null)
                mObj = new SerialPortSingleton(comPort, baudrate);
            return mObj;
        }


        internal void Write(string p)
        {
            mSerial.Write(p+"\r");
        }
    }
    public class MessageEventArgs : EventArgs
    {
        protected string mMessage="";
        public string Message
        {get{return mMessage;}}
        public MessageEventArgs(string msg)
        {
            mMessage = msg;
        }
    }
}
