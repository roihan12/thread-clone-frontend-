import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/v1/users/profile/${username}`, {
          method: "GET",
        });

        const data = await res.json();
        if (data.status === "error") {
          showToast("Error", data.message, "error");
          return;
        }

        setUser(data.data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />;
      </Flex>
    );
  }
  if (!user && !loading) {
    return <h1>User not found</h1>;
  }
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Let's talk about threads."
      />
      <UserPost
        likes={400}
        replies={221}
        postImg="/post2.png"
        postTitle="Do you liked threads ?"
      />
      <UserPost
        likes={150}
        replies={231}
        postImg="/post3.png"
        postTitle="let test threads"
      />
      <UserPost likes={1110} replies={281} postTitle="I love threads" />
    </>
  );
};

export default UserPage;
