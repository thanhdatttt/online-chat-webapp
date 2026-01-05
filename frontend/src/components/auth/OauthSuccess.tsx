import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import Loading from "@/components/utils/Loading";
import { useEffect } from "react";

const OauthSuccess = () => {
  // navigate function
  const navigate = useNavigate();
  // store function
  const {handleOauthSuccess} = useAuthStore();

  // handle oauth fucntion
  const handleOauth = async () => {
    try {
      // get access token from url ccallback
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("accessToken");
  
      if (!accessToken) {
        navigate("/login");
        return;
      }
  
      await handleOauthSuccess(accessToken);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    handleOauth();
  }, []);

  return (
    <Loading/>
  );
}

export default OauthSuccess;