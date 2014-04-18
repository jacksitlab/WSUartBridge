function guicomposer(websocket)
{
	this.ws = websocket;
	
	this.ws.onopen = function(evt){
    //onOpen(evt)
   };

  this.ws.onclose = function(evt){
    //onClose(evt)
  };

  this.ws.onmessage = function(evt){
    //onMessage(evt)
	alert(evt);  
  };

  this.ws.onerror = function(evt){
    //onError(evt)
  };
}

function onOpen(evt){
  writeToScreen("CONNECTED");
}

function onClose(evt){
  writeToScreen("DISCONNECTED");
}

function onMessage(evt){
  writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
}

function onError(evt){
  writeToScreen('<span style="color: red;">ERROR: ' + evt.data + '</span>');
}

function doSend(message){
  writeToScreen("SENT: " + message);
  websocket.send(message);
}
			

guicomposer.prototype.ws=null;

guicomposer.prototype.ReadMem = function(adr,len)
	{
		var str=this.hex2String("C1"+adr);
		this.ws.send(str);	
	};
guicomposer.prototype.WriteMem = function(adr,val)
	{
		var str=this.hex2String("81"+adr+val);;
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
	
	
};