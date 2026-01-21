import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { IFormValues } from "@/components/chat/AddFriendModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Error from "@/components/utils/Error";

// define type for props
interface SearchFormProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  loading: boolean;
  value: string; // input
  isFound: boolean | null;
  searchedValue: string; // found
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const SearchForm = ({register, errors, loading, value, isFound, searchedValue, onSubmit, onCancel} : SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-semibold">Search user</Label>

        <Input
        id="username" 
        placeholder="Enter username" 
        className="glass border-border/50 focus:border-primary/50 transition-smooth"
        {...register("q", {
          required: "Username is required"
        })} 
        />
        {errors.q && (
          <Error message={errors.q.message}/>
        )}

        {/* not found */}
        {isFound === false && (
          <span className="text-sm text-destructive">
            Not found
            <span className="font-semibold">{searchedValue}</span>
          </span>
        )}
      </div>
      
      {/* buttons */}
      <DialogFooter>
        <Button type="submit" disabled={loading || !value?.trim()} className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth">
          {loading ? 
          <span>Finding ...</span> : 
          <>
            <SearchIcon className="size-4 mr-2"/> search
          </>}
        </Button>

        <DialogClose asChild>
          <Button type="button" variant="outline" className="flex-1 glass hover:text-destructive" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}

export default SearchForm;