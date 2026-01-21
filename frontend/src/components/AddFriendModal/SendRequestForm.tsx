import type { UseFormRegister } from "react-hook-form";
import type { IFormValues } from "@/components/chat/AddFriendModal";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

// define type for props
interface SendRequestFormProps {
  register: UseFormRegister<IFormValues>;
  loading: boolean;
  searchedValue: string; // found
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const SendRequestForm = ({register, loading, searchedValue, onSubmit, onBack} : SendRequestFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <span className="text-sm text-emerald-500">
          Found <span className="font-semibold">{searchedValue}</span>
          🎉
        </span>

        <div className="space-y-4">
          <Label
            htmlFor="message"
            className="text-sm font-semibold"
          >
            Introduce
          </Label>
          <Textarea
            id="message"
            rows={3}
            placeholder="Send something to this user ..."
            className="glass border-border/50 focus:border-primary/50 transition-smooth resize-none"
            {...register("message")}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="flex-1 glass hover:text-destructive"
            onClick={onBack}
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-chat text-white hover:opactity-90 transition-smooth"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <UserPlus className="size-4 mr-2" /> Add friend
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
}

export default SendRequestForm;