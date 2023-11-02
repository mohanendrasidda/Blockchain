pragma solidity ^0.5.0;


contract TodoList{

   uint public currentBlockTimestamp = block.timestamp;

    function getCurrentBlockTimestamp() public {
        currentBlockTimestamp = block.timestamp;
    }

    struct publishPacket{

        string buf;
        uint256 bulen;
        string dup;
        uint qos;
        string retained;
        uint packetid;
        string topicName;
        string payload;
        uint256 payloadlen;
    }
     
     mapping (address=> publishPacket) public packetinfo;

     function savePacket(address wallet,string memory _buf, uint256  _bulen, string memory _dup, uint _qos,
        string memory _retained,
        uint _packetid,
        string memory _topicName,
        string memory _payload,
        uint256 _payloadlen)public{
            packetinfo[wallet].buf =_buf;
            packetinfo[wallet].bulen=_bulen;
            packetinfo[wallet].dup=_dup;
            packetinfo[wallet].qos=_qos; 
            packetinfo[wallet].retained=_retained;
            packetinfo[wallet].packetid=_packetid;
            packetinfo[wallet].topicName=_topicName;
            packetinfo[wallet].payload=_payload;
            packetinfo[wallet].payloadlen=_payloadlen;
           
        }

    
} 


