import type { User } from "@/types/user";
import { useFriendStore } from "@/stores/friend.store";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SearchForm from "@/components/AddFriendModal/SearchForm";
import SendRequestForm from "@/components/AddFriendModal/SendRequestForm";

export interface IFormValues {
  q: string;
  message: string;
}

const AddFriendModal = () => {
  // search states
  const [isFound, setIsFound]= useState<boolean | null>(null);
  const [searchUser, setSearchUser] = useState<User>();
  const [searchedUsername, setSearchedUsername] = useState("");

  const {loading, searchUsers, sendFriendRequest} = useFriendStore();

  // handle form
  const {register, handleSubmit, watch, reset, formState: {errors}} = useForm<IFormValues>({
    defaultValues: {q: "", message: ""}
  });
  const usernameValue = watch("q");

  // search 
  const handleSearch = handleSubmit(async (data) => {
    const q = data.q.trim();
    if (!q) return;

    // reset state
    setIsFound(null);
    setSearchedUsername(q);

    try {
      const foundUser = await searchUsers(q);
      if (foundUser) {
        setIsFound(true);
        setSearchUser(foundUser);
      } else {
        setIsFound(false);
      }
    } catch (err) {
      console.log(err);
      setIsFound(false);
      throw err;
    }
  });

  // send request
  const handleSendRequest = handleSubmit(async (data) => {
    if (!searchUser) return;

    try {
      const message = await sendFriendRequest(searchUser._id, data.message.trim());
      if (!message.includes("successfully")) {
        toast.warning(message);
      } else {
        toast.success(message);
      }

      handleCancel();
    } catch (err) {
      console.log(err);
      throw err;
    }
  });

  // handle cancel
  const handleCancel = () => {
    reset();
    setSearchedUsername("");
    setIsFound(null);
  }

  return (
    <Dialog>
      {/* icon */}
      <DialogTrigger asChild>
        <div className="flex justify-center items-center size-5 rounded-full hover:bg-sidebar-accent cursor-pointer z-10">
          <UserPlus className="size-4"/>
          <span className="sr-only">Add Friend</span>
        </div>
      </DialogTrigger>

      {/* body */}
      <DialogContent className="sm:max-w-106.25 border-none">
        {/* title */}
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
        </DialogHeader>


        {!isFound && <>
          <SearchForm register={register} errors={errors} value={usernameValue} loading={loading} isFound={isFound} searchedValue={searchedUsername} onSubmit={handleSearch} onCancel={handleCancel}/>
        </>}

        {isFound && <>
          <SendRequestForm register={register} loading={loading} searchedValue={searchedUsername} onSubmit={handleSendRequest} onBack={() => setIsFound(null)}/>
        </>}
      </DialogContent>
    </Dialog>
  );
}

export default AddFriendModal;