<?php

namespace ifteam\CustomPacket\Event;

use ifteam\CustomPacket\Packet\CustomJSONPacket;
use pocketmine\event\Cancellable;

class SendJSONPacketEvent extends SendPacketEvent implements Cancellable{
	public function __construct(CustomJSONPacket $packet, $ip, $port) {
		parent::__construct ($packet, $ip, $port );
	}
    public function setPacket($packet){
        if(is_numeric($packet)) return;
        $this->packet = $packet;
    }
    
}

?>
