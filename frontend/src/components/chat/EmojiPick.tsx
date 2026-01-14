import { useThemeStore } from "@/stores/theme.store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";

// define type for props
interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const EmojiPick = ({onChange} : EmojiPickerProps) => {
  // get theme state
  const {isDark} = useThemeStore();
  return (
    <Popover>
      {/* open/close trigger */}
      <PopoverTrigger className="cursor-pointer">
        <Smile className="size-4"/>
      </PopoverTrigger>

      {/* content */}
      <PopoverContent side="right" sideOffset={40} className="bg-transparent border-none shadow-none drop-shadow-none mb-12">
        <EmojiPicker theme={isDark ? Theme.DARK : Theme.LIGHT} onEmojiClick={(emojiData) => onChange(emojiData.emoji)} />
      </PopoverContent>
    </Popover>
  );
}

export default EmojiPick;