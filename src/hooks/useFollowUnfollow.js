import { useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import AxiosInstance from "../axios";

const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", `Please login to follow`, "error");
      return;
    }

    if (updating) return;
    setUpdating(true);
    try {
      const res = await AxiosInstance.post(`/api/v1/users/follow/${user._id}`);

      const data = await res.data;

      if (data.status === "error") {
        showToast("Error", data.message, "error");
        return;
      }

      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop(); // simulate remove from followers list
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id); // simulate adding to followers list
      }

      setFollowing(!following);
    } catch (error) {
      showToast("Error", error.response.data.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
