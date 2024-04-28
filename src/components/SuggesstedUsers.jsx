import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";
import AxiosInstance from "../axios";

const SuggesstedUsers = () => {
  const [loading, setLoading] = useState(true);

  const [suggesstedUsers, setSuggesstedUsers] = useState([]);

  const showToast = useShowToast();

  useEffect(() => {
    const getSuggesstedUsers = async () => {
      setLoading(true);
      try {
        const res = await AxiosInstance.get("/api/v1/users/suggested");

        const data = await res.data;

        if (data.status === "error") {
          showToast("Error", data.message, "error");
          return;
        }

        setSuggesstedUsers(data.data);

        console.log(data);
      } catch (error) {
        showToast("Error", error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggesstedUsers();
  }, [showToast]);

  return (
    <>
      <Text mb={4} fontWeight={"bold"}>
        Suggested Users
      </Text>
      <Flex flexDirection={"column"} gap={4}>
        {loading &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
            >
              {/* Avatar Skeleton */}
              <Box>
                <SkeletonCircle size={10} />
              </Box>
              {/* Username an d fullname skeleton */}

              <Flex w={"full"} flexDirection={"column"} gap={2}>
                <Skeleton h={"8px"} w={"80px"} />
                <Skeleton h={"8px"} w={"90px"} />
              </Flex>

              {/* follow button skeleton */}

              <Flex>
                <Skeleton h={"20px"} w={"60px"} />
              </Flex>
            </Flex>
          ))}

        {!loading &&
        suggesstedUsers.map((user, i) => <SuggestedUser key={i} user={user} />)}
      </Flex>
    </>
  );
};

export default SuggesstedUsers;
