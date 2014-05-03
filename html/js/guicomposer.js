Number.prototype.printHex = function(bits)
{
	var zeros = '';
	var len = bits/4;
	for(var i=0;i<len;i++)
		zeros+='0';	
	return (""+zeros + this.toString(16)).substr(-1*len).toUpperCase();
}

function guicomposer(websocket)
{
	this.ws = websocket;
	this.cb = function(msg){};
	this.onDebug = function(msg){};
	var _self = this;
	
	this.ws.onopen = function(evt){
		_self.debug("Connected");
 
   };

  this.ws.onclose = function(evt){
	  _self.debug("Disconnected");
    
  };

  this.ws.onmessage = function(evt){
	  var msg = evt.data;
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

/*
 * Read Memory Command
 * 	adr: 32bit address value | hexstring | (e.g. "00002C01")
 * 	len: len of bytes to read  (max. 63)
 *		callback: function cb for controller response
*/
guicomposer.prototype.ReadMem = function(adr,len,callback)
{
	this.cb = callback;
	var ilen = parseInt(len);
	if(ilen>63)
		ilen=63;
	var cmdByte=0xC0 + ilen;
	var str=cmdByte.toString(16)+adr;
	this.ws.send(str);	
};

/*
 * Read Memory Command
 * 	adr: 32bit address value | hexstring | (e.g. "00002C01")
 * 	val: values to write | hexstring
 *		callback: function cb for controller response
*/
guicomposer.prototype.WriteMem = function(adr,val,callback)
{
	this.cb = callback;
	var len = val.length/2;
	if(len>63)
	{
		len=63;
		val = val.substr(0,2*len);	
	}
	var cmdByte = 0x80 +  len;
	var str=cmdByte.toString(16)+adr+val;
	this.ws.send(str);	
};
