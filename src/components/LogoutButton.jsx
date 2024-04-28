import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import {FiLogOut} from "react-icons/fi"
import { BackendURL } from "../constans";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${BackendURL}/api/v1/users/logout`, {
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
    } catch (error) {
        showToast("Error", error, "error");
    }
  };
  return (
    <Button
      position={"fixed"}
      top={"15px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}

    >
    <FiLogOut size={20}/>
    </Button>
  );
};

export default LogoutButton;
