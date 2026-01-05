import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

const ChatPage = () => {
  const user = useAuthStore(s => s.user);

  const handleClick = async () => {
    try {
      await api.get("/users/test");
      toast.success("ok");
    } catch (err) {
      toast.error("Error");
      console.log(err);
    }
  }

  return (
    <>
      <div>{user?.username}</div>
      <Logout/>
      <Button onClick={handleClick}>Click</Button>
    </>
  );
}

export default ChatPage;