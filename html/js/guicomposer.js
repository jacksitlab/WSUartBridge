function guicomposer(websocket)
{
	this.ws = websocket;
	this.cb = function(msg){};
	this.onDebug = function(msg){};
	var _self = this;
	
	this.ws.onopen = function(evt){
		_self.debug("Connected");
    //onOpen(evt)
   };

  this.ws.onclose = function(evt){
	  _self.debug("Disconnected");
    //onClose(evt)
  };

  this.ws.onmessage = function(evt){
	  var msg = evt.data;//_self.string2hex(evt.data);
       _self.cb(msg);
  };

  this.ws.onerror = function(evt){
    _self.debug("Error("+evt+")");
  };
  this.debug = function(msg)
  {
	this.onDebug("GUIComposer: "+msg);  
  }
}


			

guicomposer.prototype.ws=null;

guicomposer.prototype.ReadMem = function(adr,len,callback)
	{
		this.cb = callback;
		var str="C1"+adr;//this.hex2String("C1"+adr);
		this.ws.send(str);	
	};
guicomposer.prototype.WriteMem = function(adr,val)
	{
		var str="81"+adr+val;//this.hex2String("81"+adr+val);;
		this.ws.send(str);	
	};
/*
 * =========convert hex-string into string==========
 * input: hex-string(e.g.: FE02AC48)
 * output: string with charcodes (e.g.: 0xFE,0x02,0xAC,0x48)
 */
guicomposer.prototype.hex2String = function(array) {
  var result = "";
  for (var i = 0; i < array.length; i=i+2) {
  		var x=parseInt(array[i], 16);
		if(i+1<array.length)
		{
			x=x*16;
			x+=parseInt(array[i+1], 16);
    	}  	 	
  	 	result += String.fromCharCode(x);
	}
  return result;
};
guicomposer.prototype.string2hex = function(s){
	
	var result ="";
	for(var i=0;i<s.length;i++)
	{
		var x =parseInt(s[i]);	
		result+=" 0x"+x.toString(16);
		
	}
	return result;
};