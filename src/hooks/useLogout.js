import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch("/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await res.json();

      if (user.status === "error") {
        showToast("Error", user.message, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/auth");
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return logout;
};

export default useLogout;
