import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axios";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await AxiosInstance.post("/api/v1/users/logout");
      const user = await res.data;

      if (user.status === "error") {
        showToast("Error", user.message, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/auth");
    } catch (error) {
      showToast("Error", error.response.data.message, "error");
    }
  };

  return logout;
};

export default useLogout;
