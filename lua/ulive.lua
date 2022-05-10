-- define the protocol name

ulive_protocol = Proto("ulive", "Service State Protocol")

-- MessageType: It show if the packet is a request/question or response/answer.
-- Question: It shows the question type.
-- Answer: It shows the answer type.

msg_type = ProtoField.uint8("ulive.MessageType", "MessageType", base.DEC)
question_type = ProtoField.uint8("ulive.Question", "Question", base.DEC)
answer_type = ProtoField.uint8("ulive.Answer", "Answer", base.DEC)

-- The dissector must register its data fields with Wireshark so that Wireshark knows how to display them. 
-- If you do not register the fields, you will get the error above.

ulive_protocol.fields = {msg_type, question_type, answer_type}

-- buffer: It is the data on the top of TCP. The dissector will walk through the buffer of bytes.
-- pinfo: It contains the data about the packet.
-- tree: The tree on which we append our subtree.

function ulive_protocol.dissector(buffer, pinfo, tree)
	-- set the protocol column
	pinfo.cols.protocol = ulive_protocol.name; 
	-- create the protocol item tree
	subtree = tree:add(ulive_protocol,buffer())
	-- get the first byte for distinguishing the message type
	mtype = buffer(0,1):le_uint() 
	-- now, do the comparisons
	if mtype == 1 then  -- if the packet is a question
	mtype_str = "Question" 
	subtree:add_le(msg_type,buffer(0,1)):append_text(" (" .. mtype_str .. ")")
	qtype = buffer(1,1):le_uint()
	-- find the question type
		if qtype == 1 then
			mtype_str = "Is the service up?" 
			subtree:add_le(question_type,buffer(1,1)):append_text(" (" .. mtype_str .. ")")
		else 
			mtype_str = "Other question?" 
			subtree:add_le(question_type,buffer(1,1)):append_text(" (" .. mtype_str .. ")")
		end
	end
	if mtype == 2 then -- if the packet is an answer
		mtype_str = "Answer" 
		subtree:add_le(msg_type,buffer(0,1)):append_text(" (" .. mtype_str .. ")")
		atype = buffer(1,1):le_uint()
		-- find the answer type
		if atype == 1 then
			mtype_str = "Yes, the service is up" 
			subtree:add_le(answer_type,buffer(1,1)):append_text(" (" .. mtype_str .. ")")
		else 
			mtype_str = "No, the service is down" 
			subtree:add_le(answer_type,buffer(1,1)):append_text(" (" .. mtype_str .. ")")
		end
	end	
end

-- specify which port and protocol to dissect

local tcp_port = DissectorTable.get("tcp.port")
tcp_port:add(12345,ulive_protocol)

