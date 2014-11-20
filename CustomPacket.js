var CustomPacket = {
	PORT: 19131,
	
	enabled: false,
	
	channel: null,
	receiveBuffer: java.nio.ByteBuffer.allocate(65507),
	decoder: java.nio.charset.Charset.defaultCharset().newDecoder(),
	
	out: clientMessage,
	
	init: function(){
		try{
			CustomPacket.channel = java.nio.channels.DatagramChannel.open();
			th(CustomPacket.startPacketReceiver);
			
			CustomPacket.enabled = true;
		}catch(e){
			CustomPacket.out("CHANNEL CREATE FAILED - " + e);
			CustomPacket.out(e.name + " - line " + e.lineNumber + "\n" + e.stack);
			
			CustomPacket.enabled = false;
		}
	},
	
	finalize: function(){
	    if(CustomPacket.channel != null){
	    	CustomPacket.enabled = false;
	    	
	    	CustomPacket.channel.close();
	    	CustomPacket.channel = null;
	    }
	},
	
	sendPacket: function(ip, port, message){
		new java.lang.Thread(){run: function(){
	        try{
	        	if(ip == null) throw new Error("IP ADDRESS IS NULL");
	        	
	            var sentBytes = CustomPacket.channel.send(java.nio.ByteBuffer.wrap(new java.lang.String(message).getBytes()),
	            		new java.net.InetSocketAddress(ip, port));
	            
	            CustomPacket.out("SENT SUCCESSFULLY - BYTES: " + sentBytes);
	        }catch(e){
	        	CustomPacket.out("SEND FAILED - " + e);
				CustomPacket.out(e.name + " - line " + e.lineNumber + "\n" + e.stack);
	        }
	    }}.start();
	},
	
	startPacketReceiver: function(){
		new java.lang.Thread(){run: function(){
		    while(true){
		        if(CustomPacket.enabled == false) continue;
		        
		        try{
		            var receivedBytes = CustomPacket.channel.receive(CustomPacket.receiveBuffer);
		            CustomPacket.receiveBuffer.flip();
		            
		            var data = CustomPacket.decoder.decode(CustomPacket.receiveBuffer).toString() + "";
		            CustomPacket.receiveBuffer.clear();
		            
		            if(data != null && data.length > 0){
		            	CustomPacket.out("RECIEVED FROM PMMP - BYTES: " + receivedBytes);
		            	CustomPacket.Callback.onPacketReceive(JSON.parse(data), data);
		            }
		        }catch(e){
		        	CustomPacket.out("RECEIVE FAILED - " + e);
					CustomPacket.out(e.name + " - line " + e.lineNumber + "\n" + e.stack);
		        }
		    }
		}}.start();
	},
	
	Callback: {
		onPacketReceive: function(result, raw){
			//TODO: Implement behavior when packet received
			CustomPacket.out("RECIEVED DATA - " + raw);
		}
	}
};