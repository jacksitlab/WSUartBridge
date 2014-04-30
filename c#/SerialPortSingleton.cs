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
        private List<byte> mByteBuffer = new List<byte>();
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
            mSerial = new System.IO.Ports.SerialPort(mComport, mBaudrate,
                System.IO.Ports.Parity.None, 
                8, 
                System.IO.Ports.StopBits.One);

            mSerial.Handshake = System.IO.Ports.Handshake.None;
            //mSerial.DataReceived += new System.IO.Ports.SerialDataReceivedEventHandler(mSerial_DataReceived);
            mSerial.Open();
            Listen();
        //    tTimeOut = new System.Threading.Timer(new System.Threading.TimerCallback(_onTick), this,     300, 300);
        }

        void mSerial_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            byte[] buffer = new byte[1024];
            int br = 0;
            br = mSerial.Read(buffer, offset, buffer.Length - offset);
            if (br > 0)
            {
                while (br-- > 0)
                {
                    mByteBuffer.Add(buffer[offset++]);
                }
            }
          //  mStrBuffer = Encoding.ASCII.GetString(mByteBuffer.ToArray());
            mLastReceivedByteTick = Environment.TickCount;
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
        int offset = 0;
            
        private void _run()
        {
            byte[] buffer = new byte[1024];
            int br = 0;
            while (!stopFlag)
            {
                //byte b=(byte)mSerial.ReadByte();
                br = mSerial.Read(buffer, offset, buffer.Length - offset);
                if (br > 0)
                {
                    while (br-->0)
                    {
                        mByteBuffer.Add(buffer[offset++]);
                    }
                }
                mStrBuffer = Encoding.ASCII.GetString(mByteBuffer.ToArray());
                mLastReceivedByteTick = Environment.TickCount;
            }
        }

        private void onReceive()
        {
            //if (mStrBuffer != string.Empty)
            if(mByteBuffer.Count>0)
            {
                //onReceive(mStrBuffer);
                onReceive(mByteBuffer);
                mByteBuffer.Clear();
                mStrBuffer = "";
                offset = 0;
            }
        }

        private void onReceive(List<byte> bb)
        {
            if (OnReceive != null)
            {
                OnReceive(this, new MessageEventArgs(bb.ToArray()));
            }
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
        public void Write(byte[] b, int len)
        {
            mSerial.Write(b, 0, len);
        }
    }
    public class MessageEventArgs : EventArgs
    {
        protected byte[] mMessage;
        public byte[] Message
        {get{return mMessage;}}
        public MessageEventArgs(byte[] msg)
        {
            mMessage = msg;
        }
    }
}
