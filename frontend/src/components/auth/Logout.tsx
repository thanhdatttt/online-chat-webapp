import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

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
    <DropdownMenuItem className="cursor-pointer" variant="destructive" onClick={handleLogout}>
      <Button variant="completeGhost" className="cursor-pointer">
        <LogOut className="text-destructive"/>
        Logout
      </Button>
    </DropdownMenuItem>
  );
}

export default Logout;
