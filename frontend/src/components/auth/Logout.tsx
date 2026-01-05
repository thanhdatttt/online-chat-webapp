import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Logout = () => {
  // navigate function
  const navigate = useNavigate();
  // store function
  const {signOut} = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;