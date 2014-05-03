function Register(name,adr)
{
	this.Name = name;
	this.Address = adr;	
	this.Value =0x00;
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
msp430f5510.prototype.GetValue = function(reg_adr)
{
	var i=0;
	for(i=0;i<this.Ports.length;i++)
	{
			if(this.Ports[i].InputAdr.Address==reg_adr)
				return this.Ports[i].InputAdr.Value;
			
			if(this.Ports[i].OutputAdr.Address==reg_adr)
				return this.Ports[i].OutputAdr.Value; 
			
			if(this.Ports[i].DirAdr.Address==reg_adr)
				return this.Ports[i].DirAdr.Value; 
				
			if(this.Ports[i].SFSelAdr.Address==reg_adr)
				return this.Ports[i].SFSelAdr.Value;
			
			if(this.Ports[i].PURAdr.Address==reg_adr)
				return this.Ports[i].PURAdr.Value;
	}
	for(i=0;i<this.Peripherals.length;i++)
	{
		for(var j=0;j<this.Peripherals[i].Registers.length;j++)
		{
			if(this.Peripherals[i].Registers[j].Address ==reg_adr)
				return this.Peripherals[i].Registers[j].Value;
		}	
		
	}		
	return -1;
}
msp430f5510.prototype.SetValue = function(reg_adr,value)
{
	var i=0;
	var set=false;
	for(i=0;i<this.Ports.length;i++)
	{
			if(this.Ports[i].InputAdr.Address==reg_adr)
			{
				this.Ports[i].InputAdr.Value = value;
				set = true;
				break;
			}
			if(this.Ports[i].OutputAdr.Address==reg_adr)
			{
				this.Ports[i].OutputAdr.Value = value;
				set = true;
			}
			if(this.Ports[i].DirAdr.Address==reg_adr)
			{
				this.Ports[i].DirAdr.Value = value;
				set = true;
			}
			if(this.Ports[i].SFSelAdr.Address==reg_adr)
			{
				this.Ports[i].SFSelAdr.Value = value;
				set = true;
			}
			if(this.Ports[i].PURAdr.Address==reg_adr)
			{
				this.Ports[i].PURAdr.Value = value;
				set = true;
			}	
	}
	for(i=0;i<this.Peripherals.length;i++)
	{
		for(var j=0;j<this.Peripherals[i].Registers.length;j++)
		{
			if(this.Peripherals[i].Registers[j].Address ==reg_adr)
			{
				this.Peripherals[i].Registers[j].Value = value;
				set = true;
			}
		}	
		
	}	
	return set;
}
msp430f5510.prototype.FillMenu = function(id)
{
	var html = '<li><a href="#">MSP430F5510</a><ul>';
	var i=0;	
	
	for(i=0;i<this.Ports.length;i++)
	{
		html+='<li><a href="#">';
		html+=this.Ports[i].Name;	
		html+='</a>';
		html+='  <ul>';
		html+='		<li><a href="#">'+this.Ports[i].InputAdr.Name+'</a>'+
			'<span class="reg_adr" style="display:none; visibility:hidden;">'+this.Ports[i].InputAdr.Address+'</span>'+
			'<span class="reg_val" style="display:none; visibility:hidden;">'+this.Ports[i].InputAdr.Value+'</span>'+
			'<span class="reg_name" style="display:none; visibility:hidden;">'+this.Ports[i].Name+':'+this.Ports[i].InputAdr.Name+'</span></li>';		
		html+='		<li><a href="#">'+this.Ports[i].OutputAdr.Name+'</a>'+
			'<span class="reg_adr" style="display:none; visibility:hidden;">'+this.Ports[i].OutputAdr.Address+'</span>'+
			'<span class="reg_val" style="display:none; visibility:hidden;">'+this.Ports[i].OutputAdr.Value+'</span>'+
			'<span class="reg_name" style="display:none; visibility:hidden;">'+this.Ports[i].Name+':'+this.Ports[i].OutputAdr.Name+'</span></li>';		
		html+='		<li><a href="#">'+this.Ports[i].DirAdr.Name+'</a>'+
			'<span class="reg_adr" style="display:none; visibility:hidden;">'+this.Ports[i].DirAdr.Address+'</span>'+
			'<span class="reg_val" style="display:none; visibility:hidden;">'+this.Ports[i].DirAdr.Value+'</span>'+
			'<span class="reg_name" style="display:none; visibility:hidden;">'+this.Ports[i].Name+':'+this.Ports[i].DirAdr.Name+'</span></li>';		
		html+='		<li><a href="#">'+this.Ports[i].SFSelAdr.Name+'</a>'+
			'<span class="reg_adr" style="display:none; visibility:hidden;">'+this.Ports[i].SFSelAdr.Address+'</span>'+
			'<span class="reg_val" style="display:none; visibility:hidden;">'+this.Ports[i].SFSelAdr.Value+'</span>'+
			'<span class="reg_name" style="display:none; visibility:hidden;">'+this.Ports[i].Name+':'+this.Ports[i].SFSelAdr.Name+'</span></li>';		
		html+='		<li><a href="#">'+this.Ports[i].PURAdr.Name+'</a>'+
			'<span class="reg_adr" style="display:none; visibility:hidden;">'+this.Ports[i].PURAdr.Address+'</span>'+
			'<span class="reg_val" style="display:none; visibility:hidden;">'+this.Ports[i].PURAdr.Value+'</span>'+
			'<span class="reg_name" style="display:none; visibility:hidden;">'+this.Ports[i].Name+':'+this.Ports[i].PURAdr.Name+'</span></li>';		
		html+='  </ul>';		
		html+='</li>';	
	}	
	for(i=0;i<this.Peripherals.length;i++)
	{
		html+='<li><a href="#">';
		html+=this.Peripherals[i].Name;	
		html+='</a>';
		html+='<ul>';
		for(var j=0;j<this.Peripherals[i].Registers.length;j++)
		{
			html+='	<li><a href="#">'+this.Peripherals[i].Registers[j].Name+'</a>'+
				'<span class="reg_adr" style="display:none; visibility:hidden;">'+this.Peripherals[i].Registers[j].Address+'</span>'+
				'<span class="reg_val" style="display:none; visibility:hidden;">'+this.Peripherals[i].Registers[j].Value+'</span>'+
				'<span class="reg_name" style="display:none; visibility:hidden;">'+this.Peripherals[i].Name+':'+this.Peripherals[i].Registers[j].Name+'</span></li>';
		}
		html+='</ul>';		
		html+='</li>';	
		
	}
	html+='</ul></li>';
	$(id).html(html);
	$(id).menu();
	
	
	
};