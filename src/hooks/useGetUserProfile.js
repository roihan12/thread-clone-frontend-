import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { useParams } from "react-router-dom";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

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
        if (data.data.isFrozen) {
          setUser(null);
          return;
        }

        setUser(data.data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);

  return { loading, user };
};

export default useGetUserProfile;
