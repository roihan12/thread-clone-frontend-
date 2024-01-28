import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const showToast = useShowToast();

  const setConversation = useSetRecoilState(conversationsAtom);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;

    try {
      const res = await fetch(`/api/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: selectedConversation.userId,
          message: messageText,
        }),
      });

      const data = await res.json();

      if (data.status === "error") {
        showToast("Error", data.message, "error");
        return;
      }

      // console.log("data message", data.data);

      setMessages((messages) => [...messages, data.data]);
      setConversation((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.data.sender,
              },
            };
          }
          return conversation;
        });

        return updatedConversations;
      });

      setMessageText("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
