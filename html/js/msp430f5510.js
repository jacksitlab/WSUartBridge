function Register(name,adr)
{
	this.Name = name;
	this.Address = adr;	
	this.Value =0;
}
function Port(name,pin,pdir,pout,psel,ppur)
{
	this.Name=name;
	this.InputAdr = new Register("PIN",pin);
	this.OutputAdr = new Register("POUT",pout);
	this.DirAdr  = new Register("PDIR",pdir);
	this.SFSelAdr = new Register("PSEL",psel);
	this.PURAdr = new Register("PREN",ppur);
}

function Peripheral(name,registers)
{
	this.Name = name;
	this.Registers = registers;
}
function msp430f5510()
{
	
	this.Ports = [
		new Port("Port1",0x00000200+0x00,0x00000200+0x02,0x00000200+0x04,0x00000200+0x0A,0x00000200+0x06),
		new Port("Port2",0x00000200+0x01,0x00000200+0x03,0x00000200+0x05,0x00000200+0x0B,0x00000200+0x07),
		new Port("Port3",0x00000220+0x00,0x00000220+0x02,0x00000220+0x04,0x00000220+0x0A,0x00000220+0x06),
		new Port("Port4",0x00000220+0x01,0x00000220+0x03,0x00000220+0x05,0x00000220+0x0B,0x00000220+0x07),
		new Port("Port5",0x00000240+0x00,0x00000240+0x02,0x00000240+0x04,0x00000240+0x0A,0x00000240+0x06),
		new Port("Port6",0x00000240+0x01,0x00000240+0x03,0x00000240+0x05,0x00000240+0x0B,0x00000240+0x07)
		
	];
	this.Peripherals = [
		new Peripheral("TA0",[
			new Register("TA0CTL",0x00000340+0x00),
			new Register("TA0CCTL0",0x00000340+0x02),
			new Register("TA0CCTL1",0x00000340+0x04),
			new Register("TA0CCTL2",0x00000340+0x06),
			new Register("TA0CCTL3",0x00000340+0x08),
			new Register("TA0CCTL4",0x00000340+0x0A),
			new Register("TA0R",0x00000340+0x10),
			new Register("TA0CCR0",0x00000340+0x12),
			new Register("TA0CCR1",0x00000340+0x14),
			new Register("TA0CCR2",0x00000340+0x16),
			new Register("TA0CCR3",0x00000340+0x18),
			new Register("TA0CCR4",0x00000340+0x1A),
			new Register("TA0EX0",0x00000340+0x20),
			new Register("TA0IV",0x00000340+0x2E),
			]),
		new Peripheral("TA1",[]),
		new Peripheral("TB0",[]),
		new Peripheral("TA2",[]),
		new Peripheral("RTC",[]),
		
	
	];	
	var _self = this;	
	
}