<?php

namespace ifteam\CustomPacket\event;

use ifteam\CustomPacket\Packet\CustomJSONPacket;

class ReceiveJSONPacketEvent extends ReceivePacketEvent {
	public function __construct(CustomJSONPacket $packet, $ip, $port) {
		parent::__construct ($packet, $ip, $port );
	}
}

?>
