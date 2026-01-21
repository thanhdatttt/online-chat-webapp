import { useFriendStore } from "@/stores/friend.store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FriendRequestItem from "@/components/request/FriendRequestItem";

const SentRequests = () => {
  const { loading, sentList, cancelRequest } = useFriendStore();

  const handleCancel = async (requestId: string) => {
    try {
      await cancelRequest(requestId);
      toast.info("Cancel request sucessfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!sentList || sentList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You have no friend requests
      </p>
    );
  }

  return (
    <div className="space-y-3 mt-4">
      <>
        {sentList.map((req) => (
          <FriendRequestItem
            key={req._id}
            requestInfo={req}
            type="sent"
            actions={
              <div className="flex gap-2">
                <p className="text-muted-foreground text-sm">Pending...</p>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleCancel(req._id)}
                  disabled={loading}
                >
                  Cancel
              </Button>
              </div>
            }
          />
        ))}
      </>
    </div>
  );
};

export default SentRequests;