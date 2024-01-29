import { Avatar, Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";
// import { formatDistanceToNow } from "date-fns";
const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);

  const currentUser = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);

  function formatTimestampToHHMM(timestamp) {
    const date = new Date(timestamp);
    // Get the user's time zone from the browser
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Set the time zone
    const options = {
      timeZone: userTimeZone,
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedTime = date.toLocaleString("en-US", options);

    return formattedTime.replace(/ AM| PM/g, "");
  }

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {message.text && (
            <Flex
              bg={"green.800"}
              maxW={"350px"}
              p={1}
              borderRadius={"md"}
              flexDirection={"column"}
            >
              <Text color={"white"}>{message.text}</Text>

              <Flex alignSelf={"flex-end"}>
                <Text fontSize={"10px"}>
                  {formatTimestampToHHMM(message.createdAt)}
                </Text>
                <Box
                  alignSelf={"flex-end"}
                  ml={1}
                  color={message.seen ? "blue.400" : ""}
                  fontWeight={"bold"}
                >
                  <BsCheck2All size={16} />
                </Box>
              </Flex>
            </Flex>
          )}

          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="message image"
                borderRadius={4}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}

          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"} flexDirection={"column"}>
              <Image src={message.img} alt="message image" borderRadius={4} />
              <Flex alignSelf={"flex-end"}>
                <Text fontSize={"10px"}>
                  {formatTimestampToHHMM(message.createdAt)}
                </Text>
                <Box
                  alignSelf={"flex-end"}
                  ml={1}
                  color={message.seen ? "blue.400" : ""}
                  fontWeight={"bold"}
                >
                  <BsCheck2All size={16} />
                </Box>
              </Flex>
            </Flex>
          )}

          <Avatar src={currentUser.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          {message.text && (
            <Flex
              bg={"gray.400"}
              maxW={"350px"}
              p={1}
              borderRadius={"md"}
              flexDirection={"column"}
            >
              <Text color={"black"}>{message.text}</Text>

              <Flex alignSelf={"flex-end"}>
                <Text color={"black"} fontSize={"10px"}>
                  {formatTimestampToHHMM(message.createdAt)}
                </Text>
              </Flex>
            </Flex>
          )}

          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                src={message.img}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="message image"
                borderRadius={4}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}

          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"} flexDirection={"column"}>
              <Image src={message.img} alt="message image" borderRadius={4} />
              <Flex alignSelf={"flex-end"}>
                <Text fontSize={"10px"}>
                  {formatTimestampToHHMM(message.createdAt)}
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
