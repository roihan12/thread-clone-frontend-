import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import postsAtom from "../atoms/postsAtom";
import { useRecoilState } from "recoil";
import SuggesstedUsers from "../components/SuggesstedUsers";
import { BackendURL } from "../constans";

const HomePage = () => {
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch(
          `${BackendURL}/api/v1/posts/feed?page=1&limit=20`
        );

        const allFeedPost = await res.json();

        if (allFeedPost.status === "error") {
          showToast("Error", allFeedPost.message, "error");
          return;
        }

        setPosts(allFeedPost.data.feedPosts);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <Flex gap={10} alignItems={"flex-start"}>
      {" "}
      {/* <Box flex={20}>Tranding Users</Box> */}
      <Box flex={70}>
        {" "}
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}
        {loading && (
          <Flex justify={"center"}>
            <Spinner size={"xl"} />
          </Flex>
        )}
        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggesstedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
